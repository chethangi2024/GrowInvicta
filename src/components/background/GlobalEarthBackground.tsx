"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./GlobalEarthBackground.css";

// Initial Longitude of India (Bengaluru / Central India ~78°E) facing viewer directly
const INITIAL_INDIA_ROTATION_Y = -1.35;

export default function GlobalEarthBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene & Camera Setup ---
    const scene = new THREE.Scene();

    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;
    const initialAspect = initialWidth / initialHeight;

    // Fixed horizontal FOV for mobile (~26.5 deg) keeps Earth width strictly proportional to viewport width
    // and 100% immune to viewport height / mobile address bar expansion/collapse
    const TARGET_MOBILE_HFOV_RAD = 0.463;

    const computeCameraFov = (w: number, h: number) => {
      if (w < 768) {
        const aspect = w / h;
        return 2 * Math.atan(Math.tan(TARGET_MOBILE_HFOV_RAD / 2) / aspect) * (180 / Math.PI);
      }
      return 40; // Desktop exact original FOV preserved
    };

    const camera = new THREE.PerspectiveCamera(
      computeCameraFov(initialWidth, initialHeight),
      initialAspect,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5.0);

    const isMobile = initialWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Distant Subtle Stars (Sparse, Faint, Deep Space) ---
    const starCount = isMobile ? 120 : 300;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starPhases = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 70 + Math.random() * 70;

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = -Math.abs(radius * Math.cos(phi)) - 15;

      starSizes[i] = Math.random() * 1.4 + 0.6;
      starPhases[i] = Math.random() * Math.PI * 2;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("aSize", new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute("aPhase", new THREE.BufferAttribute(starPhases, 1));

    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        uniform float uTime;
        varying float vAlpha;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          float twinkle = sin(uTime * 0.6 + aPhase) * 0.2 + 0.8;
          vAlpha = twinkle * 0.35;
          gl_PointSize = aSize * (100.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying float vAlpha;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          
          float intensity = smoothstep(0.5, 0.08, dist);
          vec3 starColor = mix(vec3(0.9, 0.94, 1.0), vec3(0.65, 0.75, 0.9), dist * 2.0);
          
          gl_FragColor = vec4(starColor, intensity * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // --- NASA Satellite Textures: Worker-Decoded & Staggered (Zero Main-Thread Freeze) ---
    const createPlaceholderTex = (r: number, g: number, b: number) => {
      const c = document.createElement("canvas");
      c.width = 1;
      c.height = 1;
      const ctx = c.getContext("2d");
      if (ctx) {
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, 0, 1, 1);
      }
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    };

    const dayPlaceholder = createPlaceholderTex(14, 30, 60);
    const lightsPlaceholder = createPlaceholderTex(0, 0, 0);
    const normalPlaceholder = createPlaceholderTex(128, 128, 255);
    const specularPlaceholder = createPlaceholderTex(128, 128, 128);

    const loadedTextures: THREE.Texture[] = [];
    let isDisposed = false;

    // Load textures with off-main-thread image decoding (ImageBitmapLoader)
    const loadBitmapTexture = (
      url: string,
      options: {
        isSRGB?: boolean;
        anisotropy?: number;
        generateMipmaps?: boolean;
        minFilter?: THREE.MinificationTextureFilter;
      } = {}
    ): Promise<THREE.Texture> => {
      return new Promise((resolve) => {
        if (typeof window !== "undefined" && "createImageBitmap" in window) {
          const bitmapLoader = new THREE.ImageBitmapLoader();
          bitmapLoader.setOptions({ imageOrientation: "flipY" });
          bitmapLoader.load(
            url,
            (imageBitmap) => {
              const tex = new THREE.Texture(imageBitmap);
              if (options.isSRGB) tex.colorSpace = THREE.SRGBColorSpace;
              tex.minFilter = options.minFilter || THREE.LinearFilter;
              tex.magFilter = THREE.LinearFilter;
              tex.generateMipmaps = options.generateMipmaps ?? false;
              if (options.anisotropy) {
                tex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy() || 1, options.anisotropy);
              }
              tex.needsUpdate = true;
              loadedTextures.push(tex);
              resolve(tex);
            },
            undefined,
            () => {
              // Fallback to standard TextureLoader if bitmap load encounters issue
              const texLoader = new THREE.TextureLoader();
              texLoader.load(url, (tex) => {
                if (options.isSRGB) tex.colorSpace = THREE.SRGBColorSpace;
                tex.minFilter = options.minFilter || THREE.LinearFilter;
                tex.magFilter = THREE.LinearFilter;
                tex.generateMipmaps = options.generateMipmaps ?? false;
                tex.needsUpdate = true;
                loadedTextures.push(tex);
                resolve(tex);
              });
            }
          );
        } else {
          const texLoader = new THREE.TextureLoader();
          texLoader.load(url, (tex) => {
            if (options.isSRGB) tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = options.minFilter || THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.generateMipmaps = options.generateMipmaps ?? false;
            tex.needsUpdate = true;
            loadedTextures.push(tex);
            resolve(tex);
          });
        }
      });
    };

    // --- Earth Group (Positioning & Axial Inclination) ---
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Dynamic, responsive 3D positioning and scaling:
    // - Desktop / Large screens (>= 1200px): Flanked gracefully to the right at scale 1.02, x = 1.85
    // - Tablet / Small Laptop (768px - 1199px): Flanked to right at scale 0.92, x = 1.25
    // - Mobile (< 768px): Centered horizontally (x = 0), sized strictly from viewport width
    const updatePosition = () => {
      const width = window.innerWidth;

      if (width < 768) {
        const mobileScale = Math.min(Math.max((width / 390) * 0.98, 0.88), 1.15);
        earthGroup.position.set(0.0, 0.0, -0.2);
        earthGroup.scale.setScalar(mobileScale);
      } else if (width < 1200) {
        earthGroup.position.set(1.25, 0.05, -0.2);
        earthGroup.scale.setScalar(0.92);
      } else {
        earthGroup.position.set(1.85, 0.05, 0.0);
        earthGroup.scale.setScalar(1.02);
      }
    };
    updatePosition();

    // Natural Earth Axial Tilt (~23.4 degrees)
    earthGroup.rotation.z = -0.41;
    earthGroup.rotation.x = 0.12;

    // --- Realistic Earth Surface Shader (No Artificial Ring, Real Physics) ---
    const sphereSegs = isMobile ? 36 : 48;
    const earthGeometry = new THREE.SphereGeometry(1.0, sphereSegs, sphereSegs);

    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: dayPlaceholder },
        uLightsMap: { value: lightsPlaceholder },
        uNormalMap: { value: normalPlaceholder },
        uSpecularMap: { value: specularPlaceholder },
        // Cinematic directional sun angle from top-left
        uLightDir: { value: new THREE.Vector3(-0.75, 0.42, 0.52).normalize() },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewDir;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vPosition = mvPosition.xyz;
          vViewDir = normalize(-mvPosition.xyz);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform sampler2D uDayMap;
        uniform sampler2D uLightsMap;
        uniform sampler2D uNormalMap;
        uniform sampler2D uSpecularMap;
        uniform vec3 uLightDir;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewDir;

        void main() {
          // Normal mapping for natural topographical relief
          vec3 normalMapValue = texture2D(uNormalMap, vUv).rgb * 2.0 - 1.0;
          vec3 N = normalize(vNormal + normalMapValue * 0.06);

          // Specular ocean water mask (1.0 = water, 0.0 = land)
          float specMask = texture2D(uSpecularMap, vUv).r;

          // Directional Sun lighting & natural smooth terminator transition
          float NdotL = dot(N, uLightDir);
          float sunIntensity = smoothstep(-0.15, 0.35, NdotL);
          float nightFactor = 1.0 - smoothstep(-0.12, 0.18, NdotL);

          // Sample natural NASA Satellite Daytime Surface
          vec3 dayTex = texture2D(uDayMap, vUv).rgb;

          // Believable ocean depth grading: natural dark blue / navy
          vec3 oceanDeep = vec3(0.015, 0.035, 0.08);
          vec3 oceanShallow = vec3(0.03, 0.07, 0.14);
          vec3 naturalOcean = mix(oceanDeep, oceanShallow, sunIntensity * 0.5);

          // Natural continents: blend NASA texture directly with subtle depth
          vec3 naturalLand = dayTex * 1.05;

          // Composite base surface
          vec3 surfaceBase = mix(naturalLand, naturalOcean, specMask * 0.75);

          // Physically-based diffuse sunlight on daytime side
          vec3 surfaceLit = surfaceBase * (0.18 + 1.25 * sunIntensity);

          // Realistic Ocean Specular Sunglint (Focused specular highlight on water)
          vec3 halfDir = normalize(uLightDir + vViewDir);
          float spec = pow(max(dot(N, halfDir), 0.0), 28.0) * specMask * sunIntensity;
          surfaceLit += vec3(0.35, 0.50, 0.75) * spec * 0.75;

          // Natural NASA Night City Lights (Warm amber-gold pinpoint clusters on night hemisphere)
          vec3 lightsTex = texture2D(uLightsMap, vUv).rgb;
          float lightLum = dot(lightsTex, vec3(0.333, 0.333, 0.334));
          vec3 cityLights = vec3(0.92, 0.68, 0.35) * pow(lightLum, 1.35) * nightFactor * 2.0;

          // Realistic, subtle atmospheric limb scattering on sunlit side ONLY
          float NdotV = max(0.0, dot(vNormal, vViewDir));
          float limbScatter = pow(1.0 - NdotV, 3.5) * sunIntensity;
          vec3 atmosphereLimb = vec3(0.12, 0.28, 0.55) * limbScatter * 0.65;

          // Final Photorealistic Composite
          vec3 finalColor = surfaceLit + cityLights + atmosphereLimb;
          float alpha = clamp(length(finalColor) * 1.5, 0.2, 0.95);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
    });

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.rotation.y = INITIAL_INDIA_ROTATION_Y;
    earthGroup.add(earthMesh);

    // Adaptive texture URLs: 1024x512 on mobile (253KB total vs 1.8MB) for instant Slow 4G loading
    const dayTexUrl = isMobile ? "/textures/earth/earth_atmos_1024.jpg" : "/textures/earth/earth_atmos_2048.jpg";
    const lightsTexUrl = isMobile ? "/textures/earth/earth_lights_1024.jpg" : "/textures/earth/earth_lights_2048.png";
    const normalTexUrl = isMobile ? "/textures/earth/earth_normal_1024.jpg" : "/textures/earth/earth_normal_2048.jpg";
    const specTexUrl = isMobile ? "/textures/earth/earth_specular_1024.jpg" : "/textures/earth/earth_specular_2048.jpg";

    // Progressive asynchronous texture loading pipeline:
    // Step 1: Load Day Map first (primary visible texture)
    loadBitmapTexture(dayTexUrl, {
      isSRGB: true,
      anisotropy: isMobile ? 1 : 4,
      generateMipmaps: !isMobile,
      minFilter: isMobile ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter,
    }).then((dayTex) => {
      if (isDisposed) return;
      earthMaterial.uniforms.uDayMap.value = dayTex;
      dayPlaceholder.dispose();

      // Step 2: Schedule secondary textures sequentially during idle time to prevent any main thread hitch
      const loadSecondaryTextures = async () => {
        if (isDisposed) return;

        try {
          // 1. Night city lights
          const lightsTex = await loadBitmapTexture(lightsTexUrl, {
            isSRGB: true,
            generateMipmaps: false,
            minFilter: THREE.LinearFilter,
          });
          if (isDisposed) return;
          earthMaterial.uniforms.uLightsMap.value = lightsTex;
          lightsPlaceholder.dispose();

          // Micro-yield to allow the GPU to process texture upload without blocking
          await new Promise((r) => setTimeout(r, isMobile ? 350 : 60));
          if (isDisposed) return;

          // 2. Specular ocean mask
          const specTex = await loadBitmapTexture(specTexUrl, {
            isSRGB: false,
            generateMipmaps: false,
            minFilter: THREE.LinearFilter,
          });
          if (isDisposed) return;
          earthMaterial.uniforms.uSpecularMap.value = specTex;
          specularPlaceholder.dispose();

          // Micro-yield before final texture
          await new Promise((r) => setTimeout(r, isMobile ? 350 : 60));
          if (isDisposed) return;

          // 3. Topographical relief normal map
          const normTex = await loadBitmapTexture(normalTexUrl, {
            isSRGB: false,
            generateMipmaps: false,
            minFilter: THREE.LinearFilter,
          });
          if (isDisposed) return;
          earthMaterial.uniforms.uNormalMap.value = normTex;
          normalPlaceholder.dispose();
        } catch {
          // Gracefully continue if interrupted
        }
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as any).requestIdleCallback(
          () => {
            setTimeout(loadSecondaryTextures, isMobile ? 1200 : 100);
          },
          { timeout: 3500 }
        );
      } else {
        setTimeout(loadSecondaryTextures, isMobile ? 2000 : 350);
      }
    });

    // --- Smooth Interactive Physics & Scroll Interpolation ---
    let targetRotationY = INITIAL_INDIA_ROTATION_Y;
    let currentRotationY = INITIAL_INDIA_ROTATION_Y;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    // Cached maxScroll to avoid forced synchronous layout recalculation on scroll
    let cachedMaxScroll = 1;
    const updateMaxScroll = () => {
      cachedMaxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
    };
    updateMaxScroll();

    // Track Earth visibility in viewport (pauses WebGL render loop when user scrolls into opaque body sections)
    let isEarthVisible = true;
    let animationFrameId: number | null = null;
    let isTicking = false;
    let lastRenderTime = 0;

    const checkVisibility = (scrollY: number) => {
      // Hero section ends around ~350vh-400vh. Beyond 420vh, opaque background sections completely cover the viewport.
      const heroThreshold = (window.innerHeight || 800) * 4.2;
      const visible = scrollY < heroThreshold;
      if (visible !== isEarthVisible) {
        isEarthVisible = visible;
        if (isEarthVisible && !isTicking) {
          isTicking = true;
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };

    let scrollRafId: number | null = null;
    const handleScroll = () => {
      if (scrollRafId !== null) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const scrollProgress = Math.min(Math.max(scrollY / cachedMaxScroll, 0), 1);
        targetRotationY = INITIAL_INDIA_ROTATION_Y + scrollProgress * (Math.PI * 3.0);
        checkVisibility(scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let mouseRafId: number | null = null;
    let rawMouseX = 0;
    let rawMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion || !isEarthVisible) return;
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
      if (mouseRafId !== null) return;
      mouseRafId = requestAnimationFrame(() => {
        mouseRafId = null;
        const normX = rawMouseX / window.innerWidth - 0.5;
        const normY = rawMouseY / window.innerHeight - 0.5;
        targetMouseX = normX * 0.15;
        targetMouseY = normY * 0.10;
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // --- Dynamic Resize Handler ---
    let lastKnownWidth = window.innerWidth;
    let lastKnownHeight = window.innerHeight;

    const onResize = () => {
      if (!renderer || !camera) return;
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      const widthChanged = Math.abs(currentWidth - lastKnownWidth) > 4;
      const isDesktop = currentWidth >= 768;
      const heightChanged = isDesktop && Math.abs(currentHeight - lastKnownHeight) > 100;

      if (widthChanged || heightChanged) {
        lastKnownWidth = currentWidth;
        lastKnownHeight = currentHeight;

        camera.aspect = currentWidth / currentHeight;
        camera.fov = computeCameraFov(currentWidth, currentHeight);
        camera.updateProjectionMatrix();

        renderer.setSize(currentWidth, currentHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isDesktop ? 1.5 : 1.0));
        updatePosition();
        updateMaxScroll();
      }
      handleScroll();
    };

    window.addEventListener("resize", onResize, { passive: true });

    // --- Intelligent Render Loop (60fps active motion, throttled idle twinkle, paused when off-screen) ---
    const animate = (time: number) => {
      if (isDisposed) return;
      if (!isEarthVisible) {
        isTicking = false;
        return;
      }

      isTicking = true;
      const timeSeconds = time * 0.001;

      // Determine whether rotation or mouse parallax lerp is actively progressing
      const diffRot = Math.abs(targetRotationY - currentRotationY);
      const diffMouseX = Math.abs(targetMouseX - currentMouseX);
      const diffMouseY = Math.abs(targetMouseY - currentMouseY);
      const isMotionActive = diffRot > 0.0001 || diffMouseX > 0.0001 || diffMouseY > 0.0001;

      // When Earth is completely stationary, throttle star twinkle to ~16fps (every 60ms) to spare main thread CPU
      const elapsedSinceLast = time - lastRenderTime;
      if (!isMotionActive && elapsedSinceLast < 60) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastRenderTime = time;

      // Update star twinkle
      starMaterial.uniforms.uTime.value = timeSeconds;

      if (!prefersReducedMotion) {
        // Buttery-smooth lerping for both scroll progression and mouse parallax
        currentRotationY += (targetRotationY - currentRotationY) * 0.075;
        currentMouseX += (targetMouseX - currentMouseX) * 0.04;
        currentMouseY += (targetMouseY - currentMouseY) * 0.04;

        earthMesh.rotation.y = currentRotationY + currentMouseX;
        earthMesh.rotation.x = currentMouseY;
      } else {
        earthMesh.rotation.y = targetRotationY;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    isTicking = true;

    // --- Cleanup on Unmount ---
    return () => {
      isDisposed = true;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      if (mouseRafId !== null) cancelAnimationFrame(mouseRafId);

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      starGeometry.dispose();
      starMaterial.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      dayPlaceholder.dispose();
      lightsPlaceholder.dispose();
      normalPlaceholder.dispose();
      specularPlaceholder.dispose();
      loadedTextures.forEach((t) => t.dispose());
      renderer.dispose();
    };

  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="global-earth-bg-layer"
      aria-hidden="true"
    />
  );
}
