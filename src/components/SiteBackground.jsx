import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function disposeScene(scene) {
  scene.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose();
    }

    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => material.dispose());
    }
  });
}

export default function SiteBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 70);
    camera.position.set(0, 1, 9.6);
    camera.lookAt(0, -0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const gridGroup = new THREE.Group();
    gridGroup.position.y = -2.25;
    gridGroup.rotation.x = -Math.PI / 2.58;
    scene.add(gridGroup);

    const gridPoints = [];
    for (let index = -14; index <= 14; index += 1) {
      gridPoints.push(index, -16, 0, index, 16, 0);
      gridPoints.push(-16, index, 0, 16, index, 0);
    }

    gridGroup.add(
      new THREE.LineSegments(
        new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(gridPoints, 3)),
        new THREE.LineBasicMaterial({
          color: 0x34f5ff,
          transparent: true,
          opacity: 0.14,
        }),
      ),
    );

    const ringGroup = new THREE.Group();
    ringGroup.position.set(3.6, 0.22, -4.4);
    scene.add(ringGroup);

    [1.0, 1.55, 2.15].forEach((radius, index) => {
      const points = new THREE.Path()
        .absellipse(0, 0, radius, radius, 0, Math.PI * 2)
        .getPoints(112)
        .map((point) => new THREE.Vector3(point.x, point.y, 0));
      const ring = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: index === 1 ? 0x4ade80 : 0x34f5ff,
          transparent: true,
          opacity: 0.16,
        }),
      );
      ring.rotation.set(index * 0.48, index * 0.35, index * 0.18);
      ringGroup.add(ring);
    });

    const ribbonPoints = [];
    for (let index = 0; index < 130; index += 1) {
      const t = index / 15;
      ribbonPoints.push(new THREE.Vector3(Math.sin(t) * 2.8 - 3.1, Math.cos(t * 0.68) * 0.78, index * 0.06 - 4.6));
    }

    const ribbon = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(ribbonPoints),
      new THREE.LineBasicMaterial({
        color: 0x5b8cff,
        transparent: true,
        opacity: 0.2,
      }),
    );
    scene.add(ribbon);

    const particleCount = 110;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const offset = index * 3;
      particlePositions[offset] = (Math.random() - 0.5) * 19;
      particlePositions[offset + 1] = (Math.random() - 0.5) * 10;
      particlePositions[offset + 2] = (Math.random() - 0.5) * 12;
    }

    const particles = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(particlePositions, 3)),
      new THREE.PointsMaterial({
        color: 0x9ffbff,
        size: 0.03,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
      }),
    );
    scene.add(particles);

    const pointer = { x: 0, y: 0 };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let lastFrame = 0;
    let startedAt = performance.now();

    const resize = () => {
      const width = window.innerWidth || mount.clientWidth;
      const height = window.innerHeight || mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const renderFrame = (time = performance.now()) => {
      if (time - lastFrame < 42) {
        animationFrame = requestAnimationFrame(renderFrame);
        return;
      }

      lastFrame = time;
      const elapsed = (time - startedAt) / 1000;

      camera.position.x = pointer.x * 0.18;
      camera.position.y = 1 + pointer.y * 0.1;
      camera.lookAt(pointer.x * 0.22, -0.2 + pointer.y * 0.06, 0);

      gridGroup.position.z = (elapsed * 0.28) % 1;
      ringGroup.rotation.x = elapsed * 0.035;
      ringGroup.rotation.y = elapsed * 0.075 + pointer.x * 0.03;
      ribbon.rotation.y = -0.24 + Math.sin(elapsed * 0.22) * 0.06;
      ribbon.position.y = Math.sin(elapsed * 0.34) * 0.16;
      particles.rotation.y = elapsed * 0.012 + pointer.x * 0.015;

      renderer.render(scene, camera);

      if (!reducedMotion.matches && !document.hidden) {
        animationFrame = requestAnimationFrame(renderFrame);
      }
    };

    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = -((event.clientY / window.innerHeight - 0.5) * 2);
    };

    const onVisibilityChange = () => {
      cancelAnimationFrame(animationFrame);
      if (!document.hidden) {
        startedAt = performance.now();
        lastFrame = 0;
        renderFrame();
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    resize();
    renderFrame();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      disposeScene(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="site-background" ref={mountRef} aria-hidden="true" />;
}
