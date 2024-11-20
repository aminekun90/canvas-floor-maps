import { Color, FloorMapObject, Position, Size } from "../types";

export class Desk implements FloorMapObject {
    id: string;
    position: Position;
    size: Size;
    color: Color;
    chairColor: Color;
    rotation: number;
    isBeingDragged: boolean = false;

    constructor(id: string, position: Position, size: Size, color: Color, chairColor: Color, rotation: number = 0) {
        this.id = id;
        this.position = position;
        this.size = size;
        this.color = color;
        this.chairColor = chairColor;
        this.rotation = rotation;
    }

    draw(context: CanvasRenderingContext2D): void {
        // Draw desk with rounded corners
        context.save();
        // Move the origin to the center of the desk (so rotation happens around its center)
        context.translate(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
        // Rotate the context
        context.rotate((this.rotation * Math.PI) / 180);  // Convert degrees to radians


        context.fillStyle = this.color;
        const cornerRadius = 10;  // Radius for the rounded corners

        context.beginPath();
        context.moveTo(-this.size.width / 2 + cornerRadius, -this.size.height / 2); // top-left corner
        context.arcTo(this.size.width / 2, -this.size.height / 2, this.size.width / 2, this.size.height / 2, cornerRadius); // top-right
        context.arcTo(this.size.width / 2, this.size.height / 2, -this.size.width / 2, this.size.height / 2, cornerRadius); // bottom-right
        context.arcTo(-this.size.width / 2, this.size.height / 2, -this.size.width / 2, -this.size.height / 2, cornerRadius); // bottom-left
        context.arcTo(-this.size.width / 2, -this.size.height / 2, this.size.width / 2, -this.size.height / 2, cornerRadius); // top-left again
        context.closePath();
        context.fill();

        // Draw the chair at the center of the desk
        context.beginPath();
        context.arc(0, this.size.height / 4, this.size.width / 4, 0, Math.PI * 2); // Position adjusted for chair below desk

        context.fillStyle = this.chairColor;  // Use the personalized chair color
        context.fill();
        context.stroke();
        context.strokeStyle = '#fff'; // Optional stroke color for the chair
        context.lineWidth = 2; // Optional line width for chair outline
        context.stroke();

        // Restore the context state (remove translation and rotation)
        context.restore();
    }
    move(newPosition: Position): void {
        this.position = newPosition;
    }
    // Start dragging the desk
    startDragging(): void {
        this.isBeingDragged = true;
    }

    // Stop dragging the desk
    stopDragging(): void {
        this.isBeingDragged = false;
    }
}
