"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import * as THREE from "three";
import CinematicChromeTitle from "./CinematicChromeTitle";

const SERVICES = [
  { name: "WEBSITE DESIGN" },
  { name: "SEO & AI SEARCH OPTIMIZATION" },
  { name: "BUSINESS GROWTH & SOCIAL MEDIA" },
  { name: "VIDEO EDITING" },
  { name: "CREATIVE & BRANDING" },
];

// Initial Longitude of India (Bengaluru ~77.6°E) facing the camera directly
const INITIAL_INDIA_ROT_Y = -1.35;

function ScrollToExplore({
  className = "absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2",
  innerRef,
}: {
  className?: string;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={innerRef}
      className={`flex flex-col items-center gap-2 z-30 pointer-events-auto select-none ${className}`}
    >
      <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--text-secondary)] uppercase font-semibold">
          SCROLL
        </span>
        <span className="text-[9px] font-mono tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gi-purple via-gi-magenta to-gi-orange uppercase font-bold">
          TO EXPLORE
        </span>
        <div className="w-[1px] h-7 bg-gradient-to-b from-gi-magenta via-gi-orange to-transparent animate-pulse" />
      </div>
    </div>
  );
}

export default function ScrollytellingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const phase0Ref = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);

  const capabilityRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);

  // Direct DOM Phase state updates to avoid React reconciliation during scroll
  const updatePhaseDOM = useCallback((progress: number) => {
    const p0 = phase0Ref.current;
    const p1 = phase1Ref.current;
    const p2 = phase2Ref.current;
    const p3 = phase3Ref.current;
    if (!p0 || !p1 || !p2 || !p3) return;

    let phase = 0;
    if (progress < 0.26) {
      phase = 0;
    } else if (progress < 0.54) {
      phase = 1;
    } else if (progress < 0.80) {
      phase = 2;
    } else {
      phase = 3;
    }

    // Phase 0: Brand Reveal & 5 Capabilities
    if (phase === 0) {
      p0.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else {
      p0.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-0 -translate-y-12 scale-95 pointer-events-none invisible";
    }

    // Phase 1: Core Value Proposition & CTAs
    if (phase === 1) {
      p1.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else if (phase < 1) {
      p1.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible";
    } else {
      p1.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-0 -translate-y-12 scale-95 pointer-events-none invisible";
    }

    // Phase 2: Built Around You & Asset Autonomy
    if (phase === 2) {
      p2.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else if (phase < 2) {
      p2.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible";
    } else {
      p2.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 -translate-y-12 scale-95 pointer-events-none invisible";
    }

    // Phase 3: Final Hero Transition & Sprint CTA
    if (phase === 3) {
      p3.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else {
      p3.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible";
    }
  }, []);

  // Three.js High-Performance Hero WebGL Scene & GSAP Scroll integration
  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;

    let isDisposed = false;
    let animationFrameId: number | null = null;
    let scrollTriggerInstance: any = null;

    // --- Scene & Camera Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
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

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x07080a, 0);
    canvasContainer.appendChild(renderer.domElement);

    // --- Starfield Background (Deep Space Ambience) ---
    const starCount = 320;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starPhases = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 50 + Math.random() * 70;

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = -Math.abs(radius * Math.cos(phi)) - 12;

      starSizes[i] = Math.random() * 1.6 + 0.8;
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
          float twinkle = sin(uTime * 1.8 + aPhase) * 0.5 + 0.5;
          vAlpha = twinkle * 0.45;
          gl_PointSize = aSize * (110.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying float vAlpha;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          float intensity = smoothstep(0.5, 0.05, dist);
          vec3 starColor = mix(vec3(0.9, 0.95, 1.0), vec3(0.7, 0.8, 0.98), dist * 2.0);
          gl_FragColor = vec4(starColor, intensity * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // --- Satellite Textures for High-Fidelity Earth ---
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

    // --- 3D Earth Pivot Group ---
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Initial positioning presets based on viewport width
    const getBaseTransform = (w: number) => {
      if (w < 480) {
        // Narrow & Standard Mobile (320px - 479px)
        const scale = Math.min(Math.max((w / 390) * 0.52, 0.44), 0.56);
        return { x: 0.0, y: -0.16, z: -0.2, scale };
      } else if (w < 768) {
        // Large Mobile / Phablets (480px - 767px)
        return { x: 0.0, y: -0.12, z: -0.15, scale: 0.62 };
      } else if (w < 1024) {
        // Tablet (768px - 1023px)
        return { x: 0.85, y: 0.05, z: 0.0, scale: 0.85 };
      } else {
        // Desktop / Large screens (1024px+)
        return { x: 1.45, y: 0.05, z: 0.2, scale: 1.02 };
      }
    };

    let baseTransform = getBaseTransform(window.innerWidth);
    earthGroup.position.set(baseTransform.x, baseTransform.y, baseTransform.z);
    earthGroup.scale.setScalar(baseTransform.scale);

    // Earth's natural axial tilt (~23.4 degrees)
    earthGroup.rotation.z = -0.41;
    earthGroup.rotation.x = 0.12;

    // --- Custom Photorealistic Earth Surface Shader ---
    const earthGeometry = new THREE.SphereGeometry(1.0, 64, 64);
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: dayMap },
        uLightsMap: { value: lightsMap },
        uNormalMap: { value: normalMap },
        uSpecularMap: { value: specularMap },
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
          vec3 normalMapValue = texture2D(uNormalMap, vUv).rgb * 2.0 - 1.0;
          vec3 N = normalize(vNormal + normalMapValue * 0.08);
          float specMask = texture2D(uSpecularMap, vUv).r;

          float NdotL = dot(N, uLightDir);
          float sunIntensity = smoothstep(-0.16, 0.35, NdotL);
          float nightFactor = 1.0 - smoothstep(-0.14, 0.20, NdotL);

          vec3 dayTex = texture2D(uDayMap, vUv).rgb;
          float terrainLum = dot(dayTex, vec3(0.299, 0.587, 0.114));

          vec3 oceanDeep = vec3(0.012, 0.024, 0.048);
          vec3 oceanShallow = vec3(0.022, 0.045, 0.085);
          vec3 oceanColor = mix(oceanDeep, oceanShallow, sunIntensity * 0.6);

          vec3 landColor = mix(
            vec3(0.045, 0.052, 0.062),
            vec3(0.085, 0.098, 0.115),
            terrainLum
          );

          vec3 surfaceBase = mix(landColor, oceanColor, specMask);
          vec3 surfaceLit = surfaceBase * (0.34 + 1.15 * sunIntensity);

          vec3 halfDir = normalize(uLightDir + vViewDir);
          float spec = pow(max(dot(N, halfDir), 0.0), 32.0) * specMask * sunIntensity;
          vec3 specColor = vec3(0.85, 0.92, 1.0) * spec * 0.65;

          vec3 cityLights = texture2D(uLightsMap, vUv).rgb;
          vec3 cityGlow = cityLights * vec3(1.0, 0.82, 0.50) * nightFactor * 1.5;

          float NdotV = dot(N, vViewDir);
          float limbFresnel = pow(1.0 - max(NdotV, 0.0), 3.2);
          vec3 limbAtmosphere = vec3(0.25, 0.55, 0.95) * limbFresnel * (0.25 + 0.8 * sunIntensity);

          vec3 finalColor = surfaceLit + specColor + cityGlow + limbAtmosphere;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.rotation.y = INITIAL_INDIA_ROT_Y;
    earthGroup.add(earthMesh);

    // --- Atmospheric Glow Rim Shell ---
    const atmosGeometry = new THREE.SphereGeometry(1.035, 64, 64);
    const atmosMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uLightDir: { value: new THREE.Vector3(-0.75, 0.42, 0.52).normalize() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewDir;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vPosition = mvPosition.xyz;
          vViewDir = normalize(-mvPosition.xyz);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform vec3 uLightDir;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewDir;

        void main() {
          float NdotV = max(dot(vNormal, vViewDir), 0.0);
          float rim = pow(1.0 - NdotV, 3.8);
          float sunSide = smoothstep(-0.25, 0.4, dot(vNormal, uLightDir));
          vec3 atmosphereColor = mix(
            vec3(0.08, 0.25, 0.65),
            vec3(0.35, 0.68, 1.0),
            sunSide
          );
          float alpha = rim * (0.3 + 0.7 * sunSide) * 0.85;
          gl_FragColor = vec4(atmosphereColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });

    const atmosMesh = new THREE.Mesh(atmosGeometry, atmosMaterial);
    earthGroup.add(atmosMesh);

    // --- Smooth Interactive Orbital Physics ---
    let scrollProgress = 0;
    const targetScrollProgress = { current: 0 };
    const mousePos = { x: 0, y: 0 };
    const targetMousePos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      targetMousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // --- Dynamic Resize Handler ---
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const newDpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(newDpr);
      renderer.setSize(width, height);

      baseTransform = getBaseTransform(width);
      earthGroup.position.set(baseTransform.x, baseTransform.y, baseTransform.z);
      earthGroup.scale.setScalar(baseTransform.scale);
    };
    window.addEventListener("resize", onResize);

    // --- GSAP ScrollTrigger Integration ---
    Promise.all([
      import("gsap"),
      import("gsap/dist/ScrollTrigger")
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (isDisposed) return;
      gsap.registerPlugin(ScrollTrigger);

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (isDisposed) return;
          const p = self.progress;
          targetScrollProgress.current = p;
          updatePhaseDOM(p);
        },
      });
    });

    // --- Main Render Loop ---
    let lastTime = performance.now();
    let earthAutoRotation = INITIAL_INDIA_ROT_Y;

    const animate = (currentTime: number) => {
      if (isDisposed) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Slow idle rotation + deterministic scroll rotation (advances down, reverses up)
      earthAutoRotation += delta * 0.035;
      scrollProgress += (targetScrollProgress.current - scrollProgress) * 0.1;

      // Smooth mouse parallax
      mousePos.x += (targetMousePos.x - mousePos.x) * 0.04;
      mousePos.y += (targetMousePos.y - mousePos.y) * 0.04;

      // Update Starfield twinkle
      starMaterial.uniforms.uTime.value = currentTime * 0.001;

      // Apply Earth rotation with scroll linkage
      const scrollRotationOffset = scrollProgress * 1.75;
      earthMesh.rotation.y = earthAutoRotation + scrollRotationOffset;

      // Subtle dynamic position & scale progression during scroll
      const progressScale = baseTransform.scale * (1.0 - scrollProgress * 0.18);
      earthGroup.scale.setScalar(progressScale);

      earthGroup.position.x = baseTransform.x + mousePos.x * 0.08;
      earthGroup.position.y = baseTransform.y + mousePos.y * 0.06 - scrollProgress * 0.15;
      earthGroup.position.z = baseTransform.z - scrollProgress * 0.4;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Entrance Animation for Header Elements
    import("gsap").then(({ gsap }) => {
      const masterTl = gsap.timeline();
      const validCapEls = capabilityRefs.current.filter(Boolean);
      if (validCapEls.length > 0) {
        masterTl.fromTo(
          validCapEls,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: "power2.out",
          },
          "+=0.1"
        );
      }

      if (scrollCueRef.current) {
        masterTl.fromTo(
          scrollCueRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
      }
    });

    return () => {
      isDisposed = true;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      if (canvasContainer && renderer.domElement && canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
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
  }, [updatePhaseDOM]);

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full min-h-[350vh] sm:min-h-[400vh] bg-[#07080A]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
        {/* Three.js Dedicated WebGL Scene Container */}
        <div
          ref={canvasContainerRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        />

        {/* Ambient Spatial Vignettes (Contrasting Backdrop) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-[#07080A]/80 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080A]/60 via-transparent to-[#07080A]/60 z-10 pointer-events-none" />

        {/* ========================================================================= */}
        {/* ACT 01: BRAND REVEAL & FIVE CAPABILITIES (Screen 1 / Phase 0)             */}
        {/* ========================================================================= */}
        <div
          ref={phase0Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
        >
          {/* Cinematic 3D Specular Chrome Wordmark */}
          <div className="w-full max-w-4xl sm:max-w-5xl mx-auto py-2 flex items-center justify-center overflow-hidden px-2">
            <h1 className="text-[clamp(1.85rem,8vw,5.5rem)] font-bold font-poppins tracking-tight uppercase select-none leading-none max-w-full">
              <CinematicChromeTitle text="GROW INVICTA" />
            </h1>
          </div>

          {/* Five Capability Items */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2.5 max-w-5xl select-none">
            {SERVICES.map((srv, idx) => (
              <div
                key={srv.name}
                ref={(el) => {
                  capabilityRefs.current[idx] = el;
                }}
                className="group inline-block cursor-default py-1 transition-all duration-300 ease-out hover:scale-105"
              >
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-200">
                  {srv.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 02: POSITIONING HEADLINE & CALL TO ACTIONS (Screen 2 / Phase 1)       */}
        {/* ========================================================================= */}
        <div
          ref={phase1Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.15rem] font-bold tracking-tight text-[var(--text-primary)] max-w-5xl leading-[1.12] text-balance">
            We build High-converting websites with digital growth solutions
          </h2>

          {/* Strict Monochrome CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Link
              href="/portfolio"
              className="btn-primary w-full sm:w-auto cursor-pointer font-mono text-xs"
            >
              <span>View Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/solutions"
              className="btn-secondary w-full sm:w-auto cursor-pointer font-mono text-xs"
            >
              <span>Explore Solutions</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 03: OWNERSHIP & SUPPORT (Screen 3 / Phase 2)                          */}
        {/* ========================================================================= */}
        <div
          ref={phase2Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible"
        >
          <div className="p-8 sm:p-12 bg-[#0a0a0a]/90 backdrop-blur-md border border-[var(--border)] max-w-3xl shadow-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-bold mb-3 block">
              BUILT AROUND YOU
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.15]">
              Built for you. <br />
              Owned by you. <br />
              <span className="text-brand-gradient">Supported by us.</span>
            </h3>
            <p className="mt-5 text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
              We build your digital presence without unnecessary lock-in. You retain ownership of your website and digital assets, while our subscription option keeps your website maintained, updated and backed up.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-4 bg-[var(--border-subtle)] border border-[var(--border)] hover:border-[#7C3AED]/50 transition-colors">
                <div className="text-[var(--text-primary)] font-mono text-base font-bold">100%</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">Client Ownership</div>
              </div>
              <div className="p-4 bg-[var(--border-subtle)] border border-[var(--border)] hover:border-[#7C3AED]/50 transition-colors">
                <div className="text-[#00D084] font-mono text-base font-bold">ONGOING</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">Maintenance &amp; Updates</div>
              </div>
              <div className="p-4 bg-[var(--border-subtle)] border border-[var(--border)] hover:border-[#7C3AED]/50 transition-colors">
                <div className="text-[#7C3AED] font-mono text-base font-bold">YOUR CHOICE</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">Subscription or One-Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 04: FINAL HERO CTA (Screen 4 / Phase 3)                               */}
        {/* ========================================================================= */}
        <div
          ref={phase3Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible"
        >
          <div className="p-8 sm:p-12 bg-[#0a0a0a]/90 backdrop-blur-md border border-[var(--border)] max-w-2xl shadow-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-bold mb-3 block">
              READY WHEN YOU ARE
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-snug">
              From idea to execution. <br />
              <span className="text-brand-gradient">Built to move your business forward.</span>
            </h3>
            <p className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
              Websites, AI Search &amp; SEO, social growth, video editing and digital solutions &mdash; built around what your business actually needs.
            </p>
            <div className="mt-8 flex items-center justify-center">
              <Link
                href="/contact?action=quote"
                className="btn-primary font-mono text-xs cursor-pointer shadow-lg"
              >
                <span>GET STARTED ↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Persistent Hero UI Overlay: Single Static SCROLL TO EXPLORE Indicator */}
        <ScrollToExplore innerRef={scrollCueRef} />

        {/* Bottom Pinned Hairline Trust Bar */}
        <div className="absolute bottom-6 left-0 right-0 z-20 px-4 pointer-events-none hidden md:block">
          <div className="max-w-5xl mx-auto flex items-center justify-between py-2.5 px-6 bg-[#0a0a0a]/80 backdrop-blur-md border border-[var(--border)] text-xs text-[var(--text-secondary)] font-mono">
            <div>3–7 Day Express Staging</div>
            <div className="text-zinc-600">/</div>
            <div>100% Asset Ownership</div>
            <div className="text-zinc-600">/</div>
            <div>Written Documentation</div>
            <div className="text-zinc-600">/</div>
            <div>30 Days Post-Launch QA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
