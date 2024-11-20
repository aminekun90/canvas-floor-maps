import { Color } from "./Color";
import { Position } from "./Position";
import { Size } from "./Size";

export interface FloorMapObject {
    id: string; // Unique identifier for each object
    position: Position;
    size: Size;
    color: Color;
    isBeingDragged: boolean; 
    draw(context: CanvasRenderingContext2D): void; // Method to render the object on the canvas
    move(newPosition: Position): void;
    startDragging(): void;
    stopDragging(): void;
  }
  