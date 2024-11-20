import { Color, FloorMapObject, Position, Size } from "../types";

export class Toilet implements FloorMapObject {
    id: string;
    position: Position;
    size: Size;
    color: Color;
    isBeingDragged: boolean = false; 
    constructor(id: string, position: Position, size: Size, color: Color) {
      this.id = id;
      this.position = position;
      this.size = size;
      this.color = color;
    }
  
    draw(context: CanvasRenderingContext2D): void {
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2, this.size.width / 2, 0, Math.PI * 2);
      context.fill();
    }

    move(newPosition: Position): void {
      this.position = newPosition;
    }
  
    startDragging(): void {
      this.isBeingDragged = true;
    }
  
    stopDragging(): void {
      this.isBeingDragged = false;
    }
  }