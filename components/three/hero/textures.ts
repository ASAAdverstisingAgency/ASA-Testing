import { useLayoutEffect, useState } from "react";
import * as THREE from "three";

const YELLOW = "#F5B400";
const BLACK = "#111111";
const WHITE = "#FFFFFF";

function makeTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
  srgb = true,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  draw(ctx);
  const texture = new THREE.CanvasTexture(canvas);
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}

function grain(ctx: CanvasRenderingContext2D) {
  const { width, height } = ctx.canvas;
  ctx.save();
  ctx.globalAlpha = 0.035;
  for (let i = 0; i < 9000; i += 1) {
    ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#000000";
    ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
  }
  ctx.restore();
}

export function drawBillboardPrint(ctx: CanvasRenderingContext2D) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = BLACK;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = YELLOW;
  ctx.fillRect(0, 0, 28, height);

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = WHITE;
  ctx.font = "800 320px Helvetica, Arial, sans-serif";
  ctx.fillText("BIG IDEAS.", 160, 720);
  ctx.fillStyle = YELLOW;
  ctx.fillText("BIGGER IMPACT.", 160, 1080);

  ctx.fillStyle = YELLOW;
  ctx.fillRect(160, 1280, 72, 18);
  ctx.fillStyle = WHITE;
  ctx.font = "700 64px Helvetica, Arial, sans-serif";
  ctx.fillText("ASA ADVERTISING", 160, 1420);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "600 38px Helvetica, Arial, sans-serif";
  ctx.fillText("Outdoor  •  Digital  •  Unmissable", 160, 1510);
  grain(ctx);
}

export function drawBillboardDigital(ctx: CanvasRenderingContext2D) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = "#070707";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(245,180,0,0.12)";
  for (let x = 0; x < width; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  ctx.textBaseline = "top";
  ctx.fillStyle = WHITE;
  ctx.font = "800 260px Helvetica, Arial, sans-serif";
  ctx.fillText("TURN ATTENTION", 140, 380);
  ctx.fillStyle = YELLOW;
  ctx.fillText("INTO ENGAGEMENT.", 140, 720);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "600 48px Helvetica, Arial, sans-serif";
  ctx.fillText("LIVE  ·  DOOH  ·  SOCIAL", 140, 1180);
}

function noiseFill(
  ctx: CanvasRenderingContext2D,
  dark: [number, number, number],
  light: [number, number, number],
) {
  const { width, height } = ctx.canvas;
  const img = ctx.createImageData(width, height);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = Math.random();
    img.data[i] = dark[0] + (light[0] - dark[0]) * n;
    img.data[i + 1] = dark[1] + (light[1] - dark[1]) * n;
    img.data[i + 2] = dark[2] + (light[2] - dark[2]) * n;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

export function useCampaignTexture(variant: "print" | "digital") {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useLayoutEffect(() => {
    const draw = variant === "print" ? drawBillboardPrint : drawBillboardDigital;
    const next = makeTexture(4096, 2048, draw);
    if (next) {
      next.wrapS = THREE.ClampToEdgeWrapping;
      next.wrapT = THREE.ClampToEdgeWrapping;
      next.minFilter = THREE.LinearMipmapLinearFilter;
      next.magFilter = THREE.LinearFilter;
      next.generateMipmaps = true;
      next.anisotropy = 16;
    }
    setTexture(next);
    return () => next?.dispose();
  }, [variant]);

  return texture;
}

export function useSurfaceTexture(kind: "asphalt" | "concrete" | "windows") {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useLayoutEffect(() => {
    const next = makeTexture(
      1024,
      1024,
      (ctx) => {
        if (kind === "asphalt") noiseFill(ctx, [18, 18, 20], [38, 38, 40]);
        else if (kind === "concrete") noiseFill(ctx, [92, 88, 82], [128, 122, 112]);
        else {
          ctx.fillStyle = "#0b0d12";
          ctx.fillRect(0, 0, 1024, 1024);
          for (let y = 8; y < 1024; y += 28) {
            for (let x = 8; x < 1024; x += 18) {
              if (Math.random() > 0.38) {
                ctx.fillStyle = Math.random() > 0.7 ? "#F5B400" : "#ffe7a8";
                ctx.globalAlpha = 0.35 + Math.random() * 0.45;
                ctx.fillRect(x, y, 10, 16);
              }
            }
          }
          ctx.globalAlpha = 1;
        }
      },
      kind !== "windows",
    );
    if (next) {
      next.wrapS = next.wrapT = THREE.RepeatWrapping;
      next.repeat.set(kind === "windows" ? 2 : 8, kind === "windows" ? 4 : 14);
    }
    setTexture(next);
    return () => next?.dispose();
  }, [kind]);

  return texture;
}
