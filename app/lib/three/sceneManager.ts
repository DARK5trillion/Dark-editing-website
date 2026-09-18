// Scene Manager - Three.js Scene Lifecycle
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

export interface SceneConfig {
  antialias?: boolean;
  alpha?: boolean;
  shadows?: boolean;
  dpr?: [number, number];
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

export function createSceneManager(config: SceneConfig = {}) {
  const {
    antialias = true,
    alpha = true,
    shadows = false,
    dpr = [1, 2],
    cameraPosition = [0, 0, 5],
    cameraFov = 50,
  } = config;

  let renderer: THREE.WebGLRenderer | null = null;
  let scene: THREE.Scene | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let animationId: number | null = null;
  let canvas: HTMLCanvasElement | null = null;

  function init(canvasEl: HTMLCanvasElement) {
    canvas = canvasEl;
    
    renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias,
      alpha,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dpr[1]));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = shadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(cameraFov, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(...cameraPosition);

    return { renderer, scene, camera };
  }

  function resize() {
    if (!renderer || !camera || !canvas) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dpr[1]));
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function animate(callback: (delta: number, time: number) => void) {
    let lastTime = 0;
    
    function loop(time: number) {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      
      callback(delta, time / 1000);
      
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
      
      animationId = requestAnimationFrame(loop);
    }
    
    animationId = requestAnimationFrame(loop);
  }

  function dispose() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    if (renderer) {
      renderer.dispose();
      renderer = null;
    }
    
    if (scene) {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material?.dispose();
          }
        }
      });
      scene = null;
    }
    
    camera = null;
    canvas = null;
  }

  function getRenderer() { return renderer; }
  function getScene() { return scene; }
  function getCamera() { return camera; }

  return {
    init,
    resize,
    animate,
    dispose,
    getRenderer,
    getScene,
    getCamera,
  };
}

// React hook for scene management
export function useSceneManager(config: SceneConfig = {}) {
  const managerRef = useRef<ReturnType<typeof createSceneManager> | null>(null);
  const { gl, scene, camera, size, viewport } = useThree();

  useEffect(() => {
    managerRef.current = createSceneManager(config);
    return () => managerRef.current?.dispose();
  }, []);

  return managerRef.current;
}