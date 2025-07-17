import React, { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

interface ConfettiParticle {
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  opacity: number;
}

type Season = "winter" | "spring" | "summer" | "autumn";

export const LoadingIndicator = () => {
  const { colorScheme } = useTheme();
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const [season, setSeason] = useState<Season>("winter");

  // Determine current season based on month
  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();

    // 0-11: Jan-Dec
    if ((month >= 0 && month <= 1) || month === 11) {
      setSeason("winter"); // Dec, Jan, Feb
    } else if (month >= 2 && month <= 4) {
      setSeason("spring"); // Mar, Apr, May
    } else if (month >= 5 && month <= 7) {
      setSeason("summer"); // Jun, Jul, Aug
    } else {
      setSeason("autumn"); // Sep, Oct, Nov
    }
  }, []);

  // Generate initial particles
  useEffect(() => {
    const newParticles: ConfettiParticle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: -Math.random() * 100, // Start above the screen
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    setParticles(newParticles);

    // Animation loop
    const animationFrame = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationFrame);
  }, [season]);

  // Animate particles falling
  const animateParticles = () => {
    setParticles((prevParticles) =>
      prevParticles.map((particle) => {
        // Move particle down
        const newY = particle.y + particle.speed;

        // Reset particle if it goes off screen
        if (newY > window.innerHeight) {
          return {
            ...particle,
            y: -particle.size,
            x: Math.random() * window.innerWidth,
            rotation: Math.random() * 360,
          };
        }

        // Update particle position and rotation
        return {
          ...particle,
          y: newY,
          rotation: particle.rotation + 1,
        };
      })
    );

    requestAnimationFrame(animateParticles);
  };

  // Get particle shape based on season
  const getParticleShape = (particle: ConfettiParticle, index: number) => {
    const style = {
      position: "absolute" as "absolute",
      left: `${particle.x}px`,
      top: `${particle.y}px`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      transform: `rotate(${particle.rotation}deg)`,
      opacity: particle.opacity,
      transition: "transform 0.1s ease",
    };

    switch (season) {
      case "winter":
        return (
          <div key={index} style={style} className="text-white">
            ❄️
          </div>
        );
      case "spring":
        return (
          <div key={index} style={style} className="text-pink-300">
            🌸
          </div>
        );
      case "summer":
        return (
          <div key={index} style={style} className="text-yellow-400">
            ☀️
          </div>
        );
      case "autumn":
        return (
          <div key={index} style={style} className="text-orange-500">
            🍂
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: `hsl(var(--primary)/0.8)`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Seasonal particles */}
        {particles.map((particle, index) => getParticleShape(particle, index))}

        {/* Loading spinner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
};
