export const pointer = {
  x: 0,
  y: 0,
  nx: 0,
  ny: 0,
};

export function bindPointer() {
  const onMove = (event: PointerEvent) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.nx = event.clientX / window.innerWidth - 0.5;
    pointer.ny = event.clientY / window.innerHeight - 0.5;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  return () => window.removeEventListener("pointermove", onMove);
}
