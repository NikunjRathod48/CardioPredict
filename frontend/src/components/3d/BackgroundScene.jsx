import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingParticles = () => {
    const mesh = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (mesh.current) {
            mesh.current.rotation.x = Math.sin(time / 4);
            mesh.current.rotation.y = Math.sin(time / 2);
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <group ref={mesh}>
                {[...Array(20)].map((_, i) => (
                    <mesh
                        key={i}
                        position={[
                            (Math.random() - 0.5) * 15,
                            (Math.random() - 0.5) * 15,
                            (Math.random() - 0.5) * 15
                        ]}
                    >
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#06b6d4" : "#3b82f6"} // Cyan or Blue
                            emissive={i % 2 === 0 ? "#06b6d4" : "#3b82f6"}
                            emissiveIntensity={2}
                            toneMapped={false}
                        />
                    </mesh>
                ))}
            </group>
        </Float>
    );
};

const BackgroundScene = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-[#020617]"> {/* Background fallback */}
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <color attach="background" args={['#020617']} />
                <fog attach="fog" args={['#020617', 5, 20]} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <FloatingParticles />
            </Canvas>
        </div>
    );
};

export default BackgroundScene;
