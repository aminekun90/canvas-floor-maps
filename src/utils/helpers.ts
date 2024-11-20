
export function snapToGrid(value: number, gridSize: number): number {
    return Math.round(value / gridSize) * gridSize;
  }
  
  export function toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }