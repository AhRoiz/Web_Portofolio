import React, { useEffect, useRef } from 'react';

const THREE_JS_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

const ThreeBackground = ({ season }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, particles, auroraPoints;
    let mouseX = 0, mouseY = 0;
    let scrollY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let animationFrameId;

    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      if (renderer) renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onPointerMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.4;
      mouseY = (event.clientY - windowHalfY) * 0.4;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const initThree = () => {
      const THREE = window.THREE;
      if (!THREE) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(0, 400, 1000);

      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); 
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
        mountRef.current.appendChild(renderer.domElement);
      }

      // --- LOGIKA SEASON ---
      if (season === 'winter') {
        const particleCount = 1500;
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array(particleCount * 3);
        const vel = new Float32Array(particleCount);

        for(let i=0; i<particleCount; i++) {
          pos[i*3] = (Math.random() - 0.5) * 4000;
          pos[i*3+1] = (Math.random() - 0.5) * 4000;
          pos[i*3+2] = (Math.random() - 0.5) * 4000;
          vel[i] = 1 + Math.random() * 3;
        }
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 4, transparent: true, opacity: 0.8 });
        particles = new THREE.Points(geom, mat);
        particles.userData = { velocities: vel, type: 'snow' };
        scene.add(particles);

      } else if (season === 'summer') {
        const particleCount = 500;
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array(particleCount * 3);
        const phases = new Float32Array(particleCount);

        for(let i=0; i<particleCount; i++) {
          pos[i*3] = (Math.random() - 0.5) * 3000;
          pos[i*3+1] = (Math.random() - 0.5) * 2000;
          pos[i*3+2] = (Math.random() - 0.5) * 3000;
          phases[i] = Math.random() * Math.PI * 2;
        }
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({ color: 0xffaa00, size: 6, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending });
        particles = new THREE.Points(geom, mat);
        particles.userData = { phases: phases, type: 'fireflies' };
        scene.add(particles);

      } else {
        // DEFAULT WAVE & AURORA
        const SEPARATION = 100, AMOUNTX = 45, AMOUNTY = 45;
        const numParticles = AMOUNTX * AMOUNTY;
        const wavePositions = new Float32Array(numParticles * 3);
        const waveScales = new Float32Array(numParticles);
        let i = 0, j = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            wavePositions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
            wavePositions[i + 1] = -200;
            wavePositions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
            waveScales[j] = 1;
            i += 3; j++;
          }
        }
        const waveGeometry = new THREE.BufferGeometry();
        waveGeometry.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
        waveGeometry.setAttribute('scale', new THREE.BufferAttribute(waveScales, 1));
        const waveMaterial = new THREE.PointsMaterial({ color: 0x3b82f6, size: 3, transparent: true, opacity: 0.5 });
        particles = new THREE.Points(waveGeometry, waveMaterial);
        particles.userData = { type: 'wave', amountX: AMOUNTX, amountY: AMOUNTY };
        scene.add(particles);

        // AURORA
        const auroraCount = 1200; 
        const auroraPos = new Float32Array(auroraCount * 3);
        const auroraColors = new Float32Array(auroraCount * 3);
        for (let a = 0; a < auroraCount; a++) {
          auroraPos[a * 3] = (Math.random() - 0.5) * 4000;
          auroraPos[a * 3 + 1] = 400 + Math.random() * 500;
          auroraPos[a * 3 + 2] = -1200 + Math.random() * 1800;
          const isGreen = Math.random() > 0.4;
          auroraColors[a * 3] = isGreen ? 0.1 : 0.5;
          auroraColors[a * 3 + 1] = isGreen ? 0.7 : 0.1;
          auroraColors[a * 3 + 2] = isGreen ? 0.3 : 0.7;
        }
        const auroraGeometry = new THREE.BufferGeometry();
        auroraGeometry.setAttribute('position', new THREE.BufferAttribute(auroraPos, 3));
        auroraGeometry.setAttribute('color', new THREE.BufferAttribute(auroraColors, 3));
        const auroraMaterial = new THREE.PointsMaterial({ size: 6, vertexColors: true, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending });
        auroraPoints = new THREE.Points(auroraGeometry, auroraMaterial);
        scene.add(auroraPoints);
      }

      window.addEventListener('resize', onWindowResize);
      document.addEventListener('pointermove', onPointerMove);
      window.addEventListener('scroll', onScroll);

      let count = 0;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        const targetY = -mouseY + 400 - (scrollY * 0.15);
        camera.position.y += (targetY - camera.position.y) * 0.05;
        
        if (season === 'default') {
            camera.lookAt(0, 100 - (scrollY * 0.05), 0);
        } else {
            camera.lookAt(0, 0, 0);
        }

        const positions = particles.geometry.attributes.position.array;
        
        if (season === 'winter') {
            const vels = particles.userData.velocities;
            for(let i=0; i<positions.length/3; i++) {
               positions[i*3+1] -= vels[i];
               if (positions[i*3+1] < -2000) positions[i*3+1] = 2000;
               positions[i*3] += Math.sin(count * 0.1 + i) * 0.5;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.y = count * 0.02;
        } else if (season === 'summer') {
            const phases = particles.userData.phases;
            for(let i=0; i<positions.length/3; i++) {
              positions[i*3+1] += Math.sin(count * 0.5 + phases[i]) * 2;
              positions[i*3] += Math.cos(count * 0.3 + phases[i]) * 2;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.y = count * 0.05;
        } else if (season === 'default') {
            let i = 0;
            const amountX = particles.userData.amountX;
            const amountY = particles.userData.amountY;
            for (let ix = 0; ix < amountX; ix++) {
                for (let iy = 0; iy < amountY; iy++) {
                const scrollInfluence = scrollY * 0.0005;
                positions[i + 1] = (Math.sin((ix + count + scrollInfluence) * 0.3) * 40) + (Math.sin((iy + count) * 0.5) * 40);
                i += 3;
                }
            }
            particles.geometry.attributes.position.needsUpdate = true;
            if (auroraPoints) {
                const aurPos = auroraPoints.geometry.attributes.position.array;
                const auroraCount = aurPos.length / 3;
                for (let a = 0; a < auroraCount; a++) {
                    aurPos[a * 3 + 1] += Math.sin(count * 0.4 + a) * 0.3;
                }
                auroraPoints.geometry.attributes.position.needsUpdate = true;
            }
        }
        renderer.render(scene, camera);
        count += 0.04; 
      };
      animate();
    };

    const script = document.createElement('script');
    script.src = THREE_JS_URL;
    script.async = true;
    script.onload = () => initThree();
    document.head.appendChild(script);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
      if (document.head.contains(script)) document.head.removeChild(script);
      if (mountRef.current) mountRef.current.innerHTML = '';
    };
  }, [season]);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
};

export default ThreeBackground;