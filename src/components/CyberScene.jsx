import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose();
    }

    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => material.dispose());
    }
  });
}

export default function CyberScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.2, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    mainGroup.position.set(0.95, -0.08, 0);
    scene.add(mainGroup);

    scene.add(new THREE.AmbientLight(0x7dd3fc, 0.42));

    const cyanLight = new THREE.PointLight(0x34f5ff, 6.8, 16);
    cyanLight.position.set(3, 2.4, 4);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 4.4, 14);
    violetLight.position.set(-2.7, -1.8, 3);
    scene.add(violetLight);

    const coreGeometry = new THREE.IcosahedronGeometry(1.05, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x123a4f,
      emissiveIntensity: 0.56,
      metalness: 0.64,
      roughness: 0.32,
      transparent: true,
      opacity: 0.9,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(core);

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x34f5ff,
      transparent: true,
      opacity: 0.78,
    });
    const coreEdges = new THREE.LineSegments(new THREE.EdgesGeometry(coreGeometry), edgeMaterial);
    coreEdges.scale.setScalar(1.018);
    mainGroup.add(coreEdges);

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x34f5ff,
      emissive: 0x1f9bff,
      emissiveIntensity: 0.82,
      metalness: 0.48,
      roughness: 0.25,
      transparent: true,
      opacity: 0.36,
    });

    const rings = [
      new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.014, 12, 120), ringMaterial.clone()),
      new THREE.Mesh(new THREE.TorusGeometry(2.02, 0.012, 12, 132), ringMaterial.clone()),
      new THREE.Mesh(new THREE.TorusGeometry(2.42, 0.01, 12, 144), ringMaterial.clone()),
    ];

    rings[0].rotation.x = Math.PI / 2.8;
    rings[1].rotation.y = Math.PI / 2.5;
    rings[2].rotation.set(Math.PI / 2.15, 0.42, -0.18);
    rings.forEach((ring) => mainGroup.add(ring));

    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xecfeff,
      emissive: 0x34f5ff,
      emissiveIntensity: 1.6,
      metalness: 0.2,
      roughness: 0.2,
    });
    const nodeGeometry = new THREE.SphereGeometry(0.075, 18, 18);
    const nodePositions = [
      [-1.7, 1.05, 0.28],
      [1.75, 1.0, -0.35],
      [1.95, -0.85, 0.4],
      [-1.9, -0.86, -0.2],
      [0, 1.78, 0.22],
      [0.12, -1.78, -0.34],
    ];

    const linePoints = [];
    nodePositions.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      node.position.set(x, y, z);
      mainGroup.add(node);
      linePoints.push(0, 0, 0, x, y, z);
    });

    const linkGeometry = new THREE.BufferGeometry();
    linkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    const linkMaterial = new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.28,
    });
    const links = new THREE.LineSegments(linkGeometry, linkMaterial);
    mainGroup.add(links);

    const particleCount = 70;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const index = i * 3;
      particlePositions[index] = (Math.random() - 0.5) * 7;
      particlePositions[index + 1] = (Math.random() - 0.5) * 4.4;
      particlePositions[index + 2] = (Math.random() - 0.5) * 5;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: 0x9ffbff,
        size: 0.025,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
      }),
    );
    scene.add(particles);

    const pointer = { x: 0, y: 0 };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clock = new THREE.Clock();
    let animationFrame = 0;
    let isSceneVisible = true;

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (width === 0 || height === 0) {
        return;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const animate = () => {
      if (!isSceneVisible) {
        animationFrame = 0;
        return;
      }

      const elapsed = clock.getElapsedTime();

      mainGroup.rotation.y = elapsed * 0.2 + pointer.x * 0.2;
      mainGroup.rotation.x = Math.sin(elapsed * 0.55) * 0.08 + pointer.y * 0.16;
      core.rotation.y = elapsed * 0.38;
      core.rotation.x = elapsed * 0.17;
      coreEdges.rotation.copy(core.rotation);
      rings[0].rotation.z = elapsed * 0.35;
      rings[1].rotation.x = Math.PI / 2.5 + elapsed * 0.18;
      rings[2].rotation.y = elapsed * -0.24;
      particles.rotation.y = elapsed * 0.045;
      particles.rotation.x = Math.sin(elapsed * 0.18) * 0.05;

      renderer.render(scene, camera);

      if (!reducedMotion.matches) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = -(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isSceneVisible = entry.isIntersecting;
      if (isSceneVisible && !animationFrame && !reducedMotion.matches) {
        animate();
      }
    });
    resizeObserver.observe(mount);
    intersectionObserver.observe(mount);
    window.addEventListener('pointermove', onPointerMove);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      disposeObject(scene);
      ringMaterial.dispose();
      nodeMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-scene" ref={mountRef} aria-hidden="true" />;
}
