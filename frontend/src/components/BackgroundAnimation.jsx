import { useEffect, useRef } from 'react';

function BackgroundAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles = [];
    const particleCount = window.innerWidth < 640 ? 50 : 100; // Fewer particles on mobile
    const colors = ['#22d3ee', '#a3e635', '#e0e7ff'];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
        this.isOrb = Math.random() < 0.2; // 20% chance to be a glowing orb
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.isOrb) {
          this.opacity = 0.3 + Math.sin(Date.now() * 0.002) * 0.2; // Pulsing effect
        }
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        if (this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        if (this.isOrb) {
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${parseInt(this.color.slice(1, 3), 16)}, ${parseInt(this.color.slice(3, 5), 16)}, ${parseInt(this.color.slice(5, 7), 16)}, ${this.opacity})`;
          ctx.shadowBlur = 20;
          ctx.shadowColor = this.color;
        } else {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="background-animation">
      <canvas ref={canvasRef}></canvas>
      <div className="wave"></div>
    </div>
  );
}

export default BackgroundAnimation;