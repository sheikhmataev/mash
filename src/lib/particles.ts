interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDirection: number;
}

export function createParticleSystem(
  canvas: HTMLCanvasElement,
  options: {
    count?: number;
    color?: string;
    maxRadius?: number;
    speed?: number;
    connectDistance?: number;
    connectOpacity?: number;
  } = {}
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { destroy: () => {} };

  const {
    count = 60,
    color = '123, 97, 255',
    maxRadius = 2,
    speed = 0.3,
    connectDistance = 0,
    connectOpacity = 0.08,
  } = options;

  let animationId: number;
  let particles: Particle[] = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx!.scale(dpr, dpr);
  }

  function init() {
    const rect = canvas.getBoundingClientRect();
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: Math.random() * maxRadius + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      opacityDirection: Math.random() > 0.5 ? 1 : -1,
    }));
  }

  function draw() {
    const rect = canvas.getBoundingClientRect();
    ctx!.clearRect(0, 0, rect.width, rect.height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.opacity += p.opacityDirection * 0.003;

      if (p.opacity <= 0.05 || p.opacity >= 0.6) {
        p.opacityDirection *= -1;
      }

      if (p.x < 0) p.x = rect.width;
      if (p.x > rect.width) p.x = 0;
      if (p.y < 0) p.y = rect.height;
      if (p.y > rect.height) p.y = 0;

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(${color}, ${p.opacity})`;
      ctx!.fill();
    }

    if (connectDistance > 0) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDistance) {
            const alpha = (1 - dist / connectDistance) * connectOpacity;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();

  const resizeHandler = () => {
    resize();
    init();
  };
  window.addEventListener('resize', resizeHandler);

  return {
    destroy: () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeHandler);
    },
  };
}

export function createNeuralNetwork(
  canvas: HTMLCanvasElement,
  options: {
    nodeCount?: number;
    color?: string;
  } = {}
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { destroy: () => {} };

  const { nodeCount = 20, color = '123, 97, 255' } = options;

  let animationId: number;
  let time = 0;

  interface Node {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    phase: number;
  }

  let nodes: Node[] = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx!.scale(dpr, dpr);
  }

  function init() {
    const rect = canvas.getBoundingClientRect();
    nodes = Array.from({ length: nodeCount }, () => {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      return { x, y, baseX: x, baseY: y, phase: Math.random() * Math.PI * 2 };
    });
  }

  function draw() {
    const rect = canvas.getBoundingClientRect();
    ctx!.clearRect(0, 0, rect.width, rect.height);
    time += 0.008;

    for (const node of nodes) {
      node.x = node.baseX + Math.sin(time + node.phase) * 8;
      node.y = node.baseY + Math.cos(time * 0.7 + node.phase) * 6;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;
        if (dist < maxDist) {
          const pulse = (Math.sin(time * 2 + i + j) + 1) / 2;
          const alpha = (1 - dist / maxDist) * 0.15 * (0.5 + pulse * 0.5);
          ctx!.beginPath();
          ctx!.moveTo(nodes[i].x, nodes[i].y);
          ctx!.lineTo(nodes[j].x, nodes[j].y);
          ctx!.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx!.lineWidth = 0.8;
          ctx!.stroke();
        }
      }
    }

    for (const node of nodes) {
      const pulse = (Math.sin(time * 1.5 + node.phase) + 1) / 2;
      const r = 2 + pulse * 2;
      const alpha = 0.3 + pulse * 0.4;

      ctx!.beginPath();
      ctx!.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(${color}, ${alpha * 0.15})`;
      ctx!.fill();

      ctx!.beginPath();
      ctx!.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(${color}, ${alpha})`;
      ctx!.fill();
    }

    animationId = requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();

  const resizeHandler = () => { resize(); init(); };
  window.addEventListener('resize', resizeHandler);

  return {
    destroy: () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeHandler);
    },
  };
}
