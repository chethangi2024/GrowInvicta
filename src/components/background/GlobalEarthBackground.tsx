"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./GlobalEarthBackground.css";

// Longitude of India (Bengaluru / Central India ~78°E).
// In standard equirectangular sphere UV mapping with axial tilt,
// -1.35 rad initial rotation places the Indian subcontinent directly facing the viewer.
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

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5.0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Subtle Distant Twinkling Stars Background ---
    const starCount = 380;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starPhases = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      // Distribute stars in a wide, distant hemisphere behind the Earth
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 60 + Math.random() * 80;

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = -Math.abs(radius * Math.cos(phi)) - 10; // Placed far behind

      starSizes[i] = Math.random() * 1.8 + 0.8; // Tiny, delicate points
      starPhases[i] = Math.random() * Math.PI * 2; // For smooth asynchronous twinkle
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
          
          // Subtle, delicate twinkling brightness oscillation
          float twinkle = sin(uTime * 0.8 + aPhase) * 0.25 + 0.75;
          vAlpha = twinkle * 0.45; // Keep stars very faint and secondary
          
          gl_PointSize = aSize * (120.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying float vAlpha;

        void main() {
          // Circular star point with soft Gaussian glow falloff
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          
          float intensity = smoothstep(0.5, 0.05, dist);
          // Subtle blue-white deep space color
          vec3 starColor = mix(vec3(0.85, 0.92, 1.0), vec3(0.65, 0.78, 0.95), dist * 2.0);
          
          gl_FragColor = vec4(starColor, intensity * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // --- High-Resolution NASA Satellite Textures ---
    const textureLoader = new THREE.TextureLoader();

    const setupTexture = (tex: THREE.Texture) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy() || 8;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
    };

    const dayMap = textureLoader.load("/textures/earth/earth_atmos_2048.jpg", setupTexture);
    const lightsMap = textureLoader.load("/textures/earth/earth_lights_2048.png", setupTexture);
    const normalMap = textureLoader.load("/textures/earth/earth_normal_2048.jpg", setupTexture);
    const specularMap = textureLoader.load("/textures/earth/earth_specular_2048.jpg", setupTexture);

    // --- Earth Group (Positioning & Axial Inclination) ---
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Dynamic, responsive 3D positioning and scaling:
    // - On Mobile: Center the entire sphere horizontally behind the hero content (X = 0) with vertical breathing room and perfect scale
    // - On Tablet / Desktop: Flank gracefully on the right
    const updatePosition = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspect = width / height;

      if (width < 480) {
        // Narrow & Standard Mobile (320px, 375px, 390px, 414px, 430px)
        // Scaled to fit comfortably inside the mobile screen with breathing room so the complete round circular globe is visible without edge clipping.
        // At camera z=5, fov=40, visible half-width is aspect * 5 * tan(20 deg).
        // A scale between 0.60 - 0.76 ensures the entire circular sphere fits with safe margins.
        const mobileScale = Math.min(Math.max((width / 390) * 0.70, 0.58), 0.78);
        earthGroup.position.set(0.0, -0.05, -0.2);
        earthGroup.scale.setScalar(mobileScale);
      } else if (width < 768) {
        // Large Mobile & Phablets (480px - 767px)
        earthGroup.position.set(0.0, -0.05, -0.2);
        earthGroup.scale.setScalar(0.78);
      } else if (width < 1200) {
        // Tablet / Small Laptop (768px - 1199px) - UNCHANGED
        earthGroup.position.set(1.25, 0.05, -0.2);
        earthGroup.scale.setScalar(0.92);
      } else {
        // Desktop / Large screens (1200px+) - UNCHANGED
        earthGroup.position.set(1.85, 0.05, 0.0);
        earthGroup.scale.setScalar(1.02);
      }
    };
    updatePosition();

    // Earth's natural axial tilt (~23.4 degrees)
    earthGroup.rotation.z = -0.41;
    earthGroup.rotation.x = 0.12; // Slight natural orbital elevation tilt

    // --- Custom Photorealistic Blue Earth Shader ---
    const earthGeometry = new THREE.SphereGeometry(1.0, 64, 64);

    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: dayMap },
        uLightsMap: { value: lightsMap },
        uNormalMap: { value: normalMap },
        uSpecularMap: { value: specularMap },
        // Directional Sun lighting (cinematic glancing angle from left-top)
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
          // Normal mapping for natural mountain, plateau & rift elevation
          vec3 normalMapValue = texture2D(uNormalMap, vUv).rgb * 2.0 - 1.0;
          vec3 N = normalize(vNormal + normalMapValue * 0.07);

          // Specular ocean water mask (1.0 = water, 0.0 = land)
          float specMask = texture2D(uSpecularMap, vUv).r;

          // Directional Lighting & Day/Night Terminator Transition
          float NdotL = dot(N, uLightDir);
          float sunIntensity = smoothstep(-0.16, 0.35, NdotL);
          float nightFactor = 1.0 - smoothstep(-0.14, 0.20, NdotL);

          // Surface Terrain Grading (Cinematic Dark Ocean & Sapphire-Tinted Continents)
          vec3 dayTex = texture2D(uDayMap, vUv).rgb;
          float terrainLum = dot(dayTex, vec3(0.299, 0.587, 0.114));

          // Sophisticated deep navy ocean palette matching Hero visual language
          vec3 oceanDeep = vec3(0.012, 0.024, 0.048);
          vec3 oceanShallow = vec3(0.022, 0.045, 0.085);
          vec3 oceanColor = mix(oceanDeep, oceanShallow, sunIntensity * 0.6);

          // Natural landmass coloring (Restrained slate-graphite with subtle earthy tones)
          vec3 landColor = mix(
            vec3(0.045, 0.052, 0.062),
            vec3(0.085, 0.098, 0.115),
            terrainLum
          );

          // Base surface blending
          vec3 surfaceBase = mix(landColor, oceanColor, specMask);

          // Glancing illumination on illuminated hemisphere
          vec3 surfaceLit = surfaceBase * (0.32 + 1.15 * sunIntensity);

          // Ocean Specular Sunglint (Soft crisp reflection on water bodies)
          vec3 halfDir = normalize(uLightDir + vViewDir);
          float spec = pow(max(dot(N, halfDir), 0.0), 32.0) * specMask * sunIntensity;
          surfaceLit += vec3(0.25, 0.42, 0.68) * spec * 0.60;

          // NASA Black Marble City Lights (Dim, warm amber-gold pinpoint clusters on night hemisphere)
          vec3 lightsTex = texture2D(uLightsMap, vUv).rgb;
          float lightLum = dot(lightsTex, vec3(0.33, 0.33, 0.34));
          vec3 cityLights = vec3(0.85, 0.62, 0.32) * pow(lightLum, 1.4) * nightFactor * 2.2;

          // Subtle Blue Atmospheric Limb Scatter (Restrained sapphire glow along curve)
          float fresnel = pow(1.0 - max(0.0, dot(vNormal, vViewDir)), 3.8);
          float sunRimFactor = smoothstep(-0.25, 0.38, NdotL);
          vec3 atmosphericRim = vec3(0.14, 0.32, 0.62) * fresnel * sunRimFactor * 1.05;

          // Final Composite
          vec3 finalColor = surfaceLit + cityLights + atmosphericRim;
          float alpha = clamp(length(finalColor) * 1.6, 0.18, 0.90);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
    });

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.rotation.y = INITIAL_INDIA_ROTATION_Y;
    earthGroup.add(earthMesh);

    // --- Atmospheric Halo Shell ---
    const atmosGeometry = new THREE.SphereGeometry(1.028, 64, 64);
    const atmosMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uLightDir: { value: new THREE.Vector3(-0.75, 0.42, 0.52).normalize() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPosition.xyz);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform vec3 uLightDir;
        varying vec3 vNormal;
        varying vec3 vViewDir;

        void main() {
          float NdotL = dot(vNormal, uLightDir);
          float sunSide = smoothstep(-0.28, 0.48, NdotL);
          float fresnel = pow(1.0 - max(0.0, dot(vNormal, vViewDir)), 3.0);

          // Subtle cinematic sapphire blue atmospheric halo
          vec3 haloColor = vec3(0.12, 0.30, 0.58) * fresnel * sunSide * 0.92;
          float alpha = fresnel * sunSide * 0.70;

          gl_FragColor = vec4(haloColor, alpha);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const atmosMesh = new THREE.Mesh(atmosGeometry, atmosMaterial);
    earthGroup.add(atmosMesh);

    // --- Interactive Physics & Scroll Interpolation ---
    let targetRotationY = INITIAL_INDIA_ROTATION_Y;
    let currentRotationY = INITIAL_INDIA_ROTATION_Y;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    // Scroll progress handler: calculate exact scroll progress [0 -> 1]
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Total rotation over full page journey (approx 1.75 revolutions = 3.5π radians)
      // Smoothly reveals India -> Middle East/Europe/Africa -> Atlantic -> Americas -> Pacific -> East Asia/Australia
      // Scrolling up naturally reverses rotation.
      targetRotationY = INITIAL_INDIA_ROTATION_Y + scrollProgress * (Math.PI * 3.5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial computation

    const onMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      targetMouseX = normX * 0.22;
      targetMouseY = normY * 0.14;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // --- Responsive Resize Handler ---
    const onResize = () => {
      if (!renderer || !camera) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      updatePosition();
      handleScroll();
    };

    window.addEventListener("resize", onResize, { passive: true });

    // --- Render Loop (Lerped Scroll-Driven Rotation & Star Twinkle) ---
    let animationFrameId: number;

    const animate = (time: number) => {
      const timeSeconds = time * 0.001;

      // Update star twinkle animation time
      starMaterial.uniforms.uTime.value = timeSeconds;

      if (!prefersReducedMotion) {
        // Smooth lerping (interpolation) so scrolling feels buttery-smooth without jumping
        currentRotationY += (targetRotationY - currentRotationY) * 0.085;
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        earthMesh.rotation.y = currentRotationY + currentMouseX;
        earthMesh.rotation.x = currentMouseY;
      } else {
        earthMesh.rotation.y = targetRotationY;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // --- Cleanup on Unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
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
      atmosGeometry.dispose();
      atmosMaterial.dispose();
      dayMap.dispose();
      lightsMap.dispose();
      normalMap.dispose();
      specularMap.dispose();
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
