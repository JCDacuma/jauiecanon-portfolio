import { useEffect } from "react";

export default function ParticlesBackground() {
  useEffect(() => {
    const scriptPath = "/particles.js-master/particles.min.js";

    const loadParticlesConfig = () => {
      if (window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 70, density: { enable: true, value_area: 800 } },
            color: { value: "#fff" }, // White particles
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#fff",
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              out_mode: "out",
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { particles_nb: 4 },
            },
          },
          retina_detect: true,
        });
      }
    };

    // If script isn't loaded yet on production CDN, dynamically load it
    if (!window.particlesJS) {
      const existingScript = document.querySelector(
        `script[src="${scriptPath}"]`,
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = scriptPath;
        script.async = true;
        script.onload = () => loadParticlesConfig();
        document.head.appendChild(script);
      } else {
        existingScript.addEventListener("load", loadParticlesConfig);
      }
    } else {
      loadParticlesConfig();
    }

    // Cleanup: destroy instances when component unmounts
    return () => {
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
    };
  }, []);

  return (
    <div
      id="particles-js"
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
    />
  );
}
