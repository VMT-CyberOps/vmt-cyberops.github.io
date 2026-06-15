window.VMT = window.VMT || {};

window.VMT.initBackground = function initBackground() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let mouseX = 0.5;
  let mouseY = 0.3;
  let time = 0;

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 1.5 + 0.3,
    a: Math.random() * 0.4 + 0.05,
    speed: Math.random() * 0.015 + 0.005,
    phase: Math.random() * Math.PI * 2,
  }));

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function drawGrid() {
    const gridSize = 52;
    ctx.strokeStyle = 'rgba(255,255,255,0.028)';
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height * 0.7);
      ctx.stroke();
    }

    for (let y = 0; y < height * 0.7; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  function drawOrbs() {
    const mainOrbX = width * (0.05 + mouseX * 0.15);
    const mainOrbY = height * (0.05 + mouseY * 0.15);
    const cyanGradient = ctx.createRadialGradient(mainOrbX, mainOrbY, 0, mainOrbX, mainOrbY, width * 0.45);
    cyanGradient.addColorStop(0, 'rgba(0,200,160,0.13)');
    cyanGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = cyanGradient;
    ctx.fillRect(0, 0, width, height);

    const blueOrbX = width * 0.85;
    const blueOrbY = height * 0.2;
    const blueGradient = ctx.createRadialGradient(blueOrbX, blueOrbY, 0, blueOrbX, blueOrbY, width * 0.3);
    blueGradient.addColorStop(0, 'rgba(0,148,255,0.08)');
    blueGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = blueGradient;
    ctx.fillRect(0, 0, width, height);
  }

  function drawParticles() {
    particles.forEach((particle) => {
      const x = (particle.x / 100) * width;
      const y = (particle.y / 100) * height;
      const pulse = Math.sin(time * particle.speed * 60 + particle.phase) * 0.5 + 0.5;

      ctx.beginPath();
      ctx.arc(x, y, particle.r * (0.7 + pulse * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,200,160,${particle.a * pulse})`;
      ctx.fill();
    });
  }

  function drawMouseGlow() {
    const glow = ctx.createRadialGradient(mouseX * width, mouseY * height, 0, mouseX * width, mouseY * height, 400);
    glow.addColorStop(0, 'rgba(0,200,160,0.08)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  function drawBackground() {
    ctx.clearRect(0, 0, width, height);

    const baseGradient = ctx.createLinearGradient(0, 0, width, height);
    baseGradient.addColorStop(0, '#020507');
    baseGradient.addColorStop(0.5, '#050c14');
    baseGradient.addColorStop(1, '#020507');
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, width, height);

    drawOrbs();
    drawGrid();
    drawParticles();
    drawMouseGlow();

    time += 0.016;
    requestAnimationFrame(drawBackground);
  }

  resize();
  drawBackground();

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth;
    mouseY = event.clientY / window.innerHeight;
  });
};
