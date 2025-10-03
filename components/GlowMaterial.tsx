import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type GlowMaterialProps = {
  color?: number | string;
  side?: THREE.Side;
  minIntensity?: number;
};

// Custom Shader Material for Glow Effect
export default function GlowMaterial({ color = 0xff0000, side = THREE.DoubleSide, minIntensity = 0.18 }: GlowMaterialProps) {
  const materialRef = useRef<any>(null);

  useFrame(({ clock }) => {
    // Animate the glow intensity over time
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      attach="material"
      uniforms={{
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) }, // Glow color
        uMinIntensity: { value: minIntensity },
      }}
      vertexShader={`
        varying vec3 vNormal;
        varying vec3 vViewDir;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          // view direction in view space: camera is at origin, so -mvPosition
          vec3 mvPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          vViewDir = normalize(-mvPosition);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uMinIntensity;
        varying vec3 vNormal;
        varying vec3 vViewDir;

        void main() {
          // Fresnel-like intensity based on angle between normal and view direction
          float ndotV = dot(normalize(vNormal), normalize(vViewDir));
          ndotV = clamp(ndotV, -1.0, 1.0);
          float fresnel = pow(1.0 - max(0.0, ndotV), 2.0);
          float intensity = uMinIntensity + (1.0 - uMinIntensity) * fresnel;
          gl_FragColor = vec4(uColor * intensity, 1.0);
        }
      `}
      transparent
      blending={THREE.AdditiveBlending}
      side={side}
    />
  );
};