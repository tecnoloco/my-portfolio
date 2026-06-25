"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const CELL = 16;
const SNAKE_COUNT = 5;
const TURN_CHANCE = 0.2;

type Dir = 0 | 1 | 2 | 3; // up, right, down, left
const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];

interface Segment {
  x: number;
  y: number;
}

interface Snake {
  body: Segment[];
  dir: Dir;
  maxLen: number;
  speed: number;
  acc: number;
}

function spawnSnake(cols: number, rows: number): Snake {
  const x = Math.floor(Math.random() * cols);
  const y = Math.floor(Math.random() * rows);
  const maxLen = 8 + Math.floor(Math.random() * 14);
  return {
    body: Array.from({ length: maxLen }, () => ({ x, y })),
    dir: Math.floor(Math.random() * 4) as Dir,
    maxLen,
    speed: 5 + Math.random() * 6,
    acc: Math.random() * 2,
  };
}

export default function SnakeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{ snakes: Snake[]; cols: number; rows: number }>({
    snakes: [],
    cols: 0,
    rows: 0,
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w;
      canvas.height = h;

      const cols = Math.floor(w / CELL);
      const rows = Math.floor(h / CELL);
      stateRef.current = {
        cols,
        rows,
        snakes: Array.from({ length: SNAKE_COUNT }, () =>
          spawnSnake(cols, rows),
        ),
      };
    };

    const ro = new ResizeObserver(init);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    init();

    const pad = 2;
    const size = CELL - pad * 2;

    const draw = (_time: number, deltaTime: number) => {
      const { snakes, cols, rows } = stateRef.current;
      if (!cols || !rows) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const snake of snakes) {
        snake.acc += deltaTime * 0.001;
        const step = 1 / snake.speed;

        if (snake.acc >= step) {
          snake.acc -= step;

          // Random turn — never reverse
          if (Math.random() < TURN_CHANCE) {
            const left = ((snake.dir + 3) % 4) as Dir;
            const right = ((snake.dir + 1) % 4) as Dir;
            snake.dir = Math.random() < 0.5 ? left : right;
          }

          const head = snake.body[0];
          const nx = ((head.x + DX[snake.dir]) % cols + cols) % cols;
          const ny = ((head.y + DY[snake.dir]) % rows + rows) % rows;

          snake.body.unshift({ x: nx, y: ny });
          if (snake.body.length > snake.maxLen) snake.body.pop();
        }

        snake.body.forEach((seg, i) => {
          const t = 1 - i / snake.body.length;
          if (i === 0) {
            ctx.fillStyle = `rgba(240, 204, 130, 0.9)`;
          } else {
            ctx.fillStyle = `rgba(212, 168, 83, ${t * 0.5})`;
          }
          ctx.fillRect(seg.x * CELL + pad, seg.y * CELL + pad, size, size);
        });
      }
    };

    gsap.ticker.add(draw, false, false);

    return () => {
      gsap.ticker.remove(draw);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
    />
  );
}
