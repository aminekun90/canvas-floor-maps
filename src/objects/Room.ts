import { Color, FloorMapObject, Position, Size } from "../types";

export class Room implements FloorMapObject {
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
      context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
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