import { Color } from "./Color";
import { Position } from "./Position";
import { Size } from "./Size";

export interface IFloorMapObject {
    id: string; // Unique identifier for each object
    position: Position;
    size: Size;
    color: Color;
    isBeingDragged: boolean;
    rotation: number;
    isDragging: boolean;
    isResizing: boolean;
    isRotating: boolean;
    initialMouseX: number;
    initialMouseY: number;
    canvas: HTMLCanvasElement;
    editable:boolean;
    bindMouseEvents(): void;
    draw(context: CanvasRenderingContext2D): void;
    updateHandles():void;
    isMouseOver(x: number, y: number): boolean;
    isMouseOverRotateHandle(x: number, y: number): boolean;
    isMouseOverResizeHandle(x: number, y: number): boolean;
    updateCursorStyle(x: number, y: number): void;
    onMouseMove( event: MouseEvent): void;
    onMouseDown( event: MouseEvent): void;
    onMouseUp(event: MouseEvent): void;

    move(newPosition: Position): void;
    rotate(angle: number): void;
    resize(width: number, height: number): void;
    startDragging(): void;
    stopDragging(): void;
    stopRotation(): void;
    stopResizing(): void;




}
