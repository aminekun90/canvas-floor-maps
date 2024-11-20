import { Color, IFloorMapObject, Position, Size } from "../types";
import { Handle } from "./Handle";
import { MapObject } from "./MapObject";

export class Desk extends MapObject implements IFloorMapObject {
    chairColor: Color;
   
    constructor(id: string, position: Position, size: Size, color: Color, chairColor: Color, canvas: HTMLCanvasElement, rotation: number = 0,cornerRadius: number =10,editable:boolean = true) {
        super(id, position, size, color, canvas, rotation,cornerRadius,editable);
        this.chairColor = chairColor;
    }


    override draw(context: CanvasRenderingContext2D): void {
        super.draw(context);
        context.save();
        // Translate to object center and apply rotation
        context.translate(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
        context.rotate((this.rotation * Math.PI) / 180); // Convert degrees to radians
        // Draw chair below desk
        context.beginPath();
        context.arc(0, this.size.height / 3, (this.size.width + this.size.height) / 10, 0, Math.PI * 2);
        context.fillStyle = this.chairColor;
        context.fill();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
        context.stroke();

        context.restore(); // Restore the canvas to the original state

        // this.updateHandles();

    }

  
}
