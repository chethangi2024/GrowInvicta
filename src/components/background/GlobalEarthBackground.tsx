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

    // --- Distant Subtle Stars (Sparse, Faint, Deep Space) ---
    const starCount = 300;
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

    // --- NASA Satellite Textures ---
    const textureLoader = new THREE.TextureLoader();

    const setupTexture = (tex: THREE.Texture) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy() || 8, 8);
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
    // - On Mobile: Center horizontally behind content, safely framed with margins
    // - On Tablet / Desktop: Flank gracefully to the right
    const updatePosition = () => {
      const width = window.innerWidth;

      if (width < 480) {
        // Mobile (320px - 479px)
        const mobileScale = Math.min(Math.max((width / 390) * 0.45, 0.38), 0.48);
        earthGroup.position.set(0.0, -0.05, -0.3);
        earthGroup.scale.setScalar(mobileScale);
      } else if (width < 768) {
        // Large Mobile & Phablets (480px - 767px)
        earthGroup.position.set(0.0, -0.05, -0.25);
        earthGroup.scale.setScalar(0.55);
      } else if (width < 1200) {
        // Tablet / Small Laptop (768px - 1199px)
        earthGroup.position.set(1.25, 0.05, -0.2);
        earthGroup.scale.setScalar(0.92);
      } else {
        // Desktop / Large screens (1200px+)
        earthGroup.position.set(1.85, 0.05, 0.0);
        earthGroup.scale.setScalar(1.02);
      }
    };
    updatePosition();

    // Natural Earth Axial Tilt (~23.4 degrees)
    earthGroup.rotation.z = -0.41;
    earthGroup.rotation.x = 0.12;

    // --- Realistic Earth Surface Shader (No Artificial Ring, Real Physics) ---
    const earthGeometry = new THREE.SphereGeometry(1.0, 64, 64);

    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: dayMap },
        uLightsMap: { value: lightsMap },
        uNormalMap: { value: normalMap },
        uSpecularMap: { value: specularMap },
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
          // (No glowing forcefield ring or back-side halo)
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

    // --- Smooth Interactive Physics & Scroll Interpolation ---
    let targetRotationY = INITIAL_INDIA_ROTATION_Y;
    let currentRotationY = INITIAL_INDIA_ROTATION_Y;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    // Scroll progress handler: smooth linear mapping [0 -> 1]
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Total rotation over full page journey (approx 1.5 revolutions = 3π radians)
      targetRotationY = INITIAL_INDIA_ROTATION_Y + scrollProgress * (Math.PI * 3.0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const onMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      targetMouseX = normX * 0.15;
      targetMouseY = normY * 0.10;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // --- Dynamic Resize Handler ---
    let lastKnownWidth = window.innerWidth;
    let lastKnownHeight = window.innerHeight;

    const onResize = () => {
      if (!renderer || !camera) return;
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      const widthChanged = Math.abs(currentWidth - lastKnownWidth) > 5;
      const orientationChanged = Math.abs(currentHeight - lastKnownHeight) > 150;

      if (widthChanged || orientationChanged) {
        lastKnownWidth = currentWidth;
        lastKnownHeight = currentHeight;

        camera.aspect = currentWidth / currentHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentWidth, currentHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        updatePosition();
      }
      handleScroll();
    };

    window.addEventListener("resize", onResize, { passive: true });

    // --- Visibility & Render Loop ---
    let animationFrameId: number | null = null;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && animationFrameId === null) {
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(container);

    const animate = (time: number) => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      const timeSeconds = time * 0.001;

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

    // --- Cleanup on Unmount ---
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
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
