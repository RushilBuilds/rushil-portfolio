'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NODE_COUNT = 120;
const PROXIMITY = 1.8;
const SPEED = 0.0012;
const PARALLAX_STRENGTH = 0.08;

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Nodes
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];
    const colors: number[] = [];

    const purple = new THREE.Color('#7c3aed');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < NODE_COUNT; i++) {
      positions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 4,
      ));
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * SPEED,
        (Math.random() - 0.5) * SPEED,
        (Math.random() - 0.5) * SPEED * 0.3,
      ));
      const c = Math.random() > 0.65 ? purple : white;
      colors.push(c.r, c.g, c.b);
    }

    // Node geometry
    const nodeGeo = new THREE.BufferGeometry();
    const posArr = new Float32Array(NODE_COUNT * 3);
    const colArr = new Float32Array(colors);

    positions.forEach((p, i) => {
      posArr[i * 3] = p.x;
      posArr[i * 3 + 1] = p.y;
      posArr[i * 3 + 2] = p.z;
    });

    nodeGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });

    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    // Edge geometry (pre-allocate max possible edges)
    const MAX_EDGES = NODE_COUNT * NODE_COUNT;
    const edgePositions = new Float32Array(MAX_EDGES * 6);
    const edgeColors = new Float32Array(MAX_EDGES * 6);

    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));
    edgeGeo.setAttribute('color', new THREE.BufferAttribute(edgeColors, 3));

    const edgeMat = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
    }));
    scene.add(edgeMat);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Scroll fade
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    const teal = new THREE.Color('#0d9488');
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Update node positions
      for (let i = 0; i < NODE_COUNT; i++) {
        positions[i].add(velocities[i]);
        // Wrap bounds
        if (positions[i].x > 7) positions[i].x = -7;
        if (positions[i].x < -7) positions[i].x = 7;
        if (positions[i].y > 4.5) positions[i].y = -4.5;
        if (positions[i].y < -4.5) positions[i].y = 4.5;

        posArr[i * 3] = positions[i].x;
        posArr[i * 3 + 1] = positions[i].y;
        posArr[i * 3 + 2] = positions[i].z;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      // Update edges
      let edgeCount = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dist = positions[i].distanceTo(positions[j]);
          if (dist < PROXIMITY) {
            const base = edgeCount * 6;
            edgePositions[base] = positions[i].x;
            edgePositions[base + 1] = positions[i].y;
            edgePositions[base + 2] = positions[i].z;
            edgePositions[base + 3] = positions[j].x;
            edgePositions[base + 4] = positions[j].y;
            edgePositions[base + 5] = positions[j].z;

            const alpha = 1 - dist / PROXIMITY;
            edgeColors[base] = teal.r * alpha;
            edgeColors[base + 1] = teal.g * alpha;
            edgeColors[base + 2] = teal.b * alpha;
            edgeColors[base + 3] = teal.r * alpha;
            edgeColors[base + 4] = teal.g * alpha;
            edgeColors[base + 5] = teal.b * alpha;

            edgeCount++;
          }
        }
      }

      edgeGeo.setDrawRange(0, edgeCount * 2);
      edgeGeo.attributes.position.needsUpdate = true;
      edgeGeo.attributes.color.needsUpdate = true;

      // Parallax
      scene.rotation.y = mouseX * PARALLAX_STRENGTH;
      scene.rotation.x = mouseY * PARALLAX_STRENGTH * 0.6;

      // Scroll fade
      const fadeStart = window.innerHeight * 0.3;
      const fadeEnd = window.innerHeight;
      const opacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      nodeMat.opacity = 0.85 * opacity;
      (edgeMat.material as THREE.LineBasicMaterial).opacity = 0.18 * opacity;
      mount.style.opacity = String(opacity);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      nodeGeo.dispose();
      edgeGeo.dispose();
      nodeMat.dispose();
      (edgeMat.material as THREE.LineBasicMaterial).dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
