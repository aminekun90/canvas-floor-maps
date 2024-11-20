// src/FloorMap.ts

export interface FloorMapOptions {
    width: number;
    height: number;
    backgroundColor?: string;
  }
  
  export class FloorMap {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
  
    constructor(container: HTMLElement, options: FloorMapOptions) {
      // Create canvas
      this.canvas = document.createElement('canvas');
      this.canvas.width = options.width;
      this.canvas.height = options.height;
      container.appendChild(this.canvas);
  
      // Get context
      const context = this.canvas.getContext('2d');
      if (!context) {
        throw new Error('Failed to get 2D context');
      }
      this.context = context;
  
      // Set background color
      this.context.fillStyle = options.backgroundColor || '#ffffff';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    drawRectangle(x: number, y: number, width: number, height: number, color: string) {
      this.context.fillStyle = color;
      this.context.fillRect(x, y, width, height);
    }
  
    drawCircle(x: number, y: number, radius: number, color: string) {
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, Math.PI * 2);
      this.context.fillStyle = color;
      this.context.fill();
    }
  
    drawLine(x1: number, y1: number, x2: number, y2: number, color: string, lineWidth: number) {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.strokeStyle = color;
      this.context.lineWidth = lineWidth;
      this.context.stroke();
    }
  }
  