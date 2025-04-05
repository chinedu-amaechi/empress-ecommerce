// src/components/3d/bracelet-viewer.js
import React, { useEffect, useRef } from "react";

export default function BraceletViewer() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamically import Three.js dependencies
    // This ensures they only load in the browser, not during SSR
    const initScene = async () => {
      // Import these from three
      const THREE = await import("three");
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );

      // Create scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf9f9f9);

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        45,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 10);

      // Create renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.outputEncoding = THREE.sRGBEncoding;
      containerRef.current.appendChild(renderer.domElement);

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
      backLight.position.set(-5, 5, -5);
      scene.add(backLight);

      // Add orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2;

      // Load the 3D Model
      const loader = new GLTFLoader();
      try {
        loader.load(
          "/Bracelet_01.glb", // Path to your model in the public folder
          (gltf) => {
            const model = gltf.scene;

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());

            model.position.x += model.position.x - center.x;
            model.position.y += model.position.y - center.y;
            model.position.z += model.position.z - center.z;

            const scale = 5 / size;
            model.scale.set(scale, scale, scale);

            scene.add(model);
          },
          (xhr) => {
            // Show loading progress if needed
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          (error) => {
            console.error("An error occurred loading the model:", error);
          }
        );
      } catch (error) {
        console.error("Error loading model:", error);
      }

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener("resize", handleResize);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        if (
          containerRef.current &&
          containerRef.current.contains(renderer.domElement)
        ) {
          containerRef.current.removeChild(renderer.domElement);
        }
        scene.dispose();
        renderer.dispose();
      };
    };

    initScene();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-lg"
      style={{ minHeight: "500px" }}
    />
  );
}
