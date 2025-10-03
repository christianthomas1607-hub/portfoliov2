import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type GlowMaterialProps = {
  color?: number | string;
  side?: number;
};

// Custom Shader Material for Glow Effect
export default function GlowMaterial({ color = 0xff0000, side = THREE.DoubleSide }: GlowMaterialProps) {
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
      }}
      vertexShader={`
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vNormal;

        void main() {
          float intensity = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(uColor * intensity, 1.0);
        }
      `}
      transparent
      blending={THREE.AdditiveBlending}
      side={side}
    />
  );
};