import { Color, IFloorMapObject, Position, Size } from "../types";
import { Handle } from "./Handle";

export class MapObject implements IFloorMapObject {
    id: string;
    position: Position;
    size: Size;
    color: Color;

    rotation: number;
    isBeingDragged: boolean = false;
    isDragging: boolean = false;
    isResizing: boolean = false;
    isRotating: boolean = false;
    initialMouseX: number = 0;
    initialMouseY: number = 0;
    cornerRadius: number = 0;

    // Define handles
    resizeHandle: Handle;
    rotateHandle: Handle;
    canvas: HTMLCanvasElement;
    constructor(id: string, position: Position, size: Size, color: Color, canvas: HTMLCanvasElement, rotation: number = 0, cornerRadius: number = 0) {
        this.id = id;
        this.position = position;
        this.size = size;
        this.color = color;
        this.rotation = rotation;
        this.canvas = canvas;
        this.cornerRadius = cornerRadius;
        // Initialize handles
        this.resizeHandle = new Handle(this.position.x + this.size.width, this.position.y + this.size.height, 10);
        this.rotateHandle = new Handle(this.position.x, this.position.y, 5);

        // Bind mouse events to the canvas
        this.bindMouseEvents();
    }

    bindMouseEvents() {
        this.canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
        this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.canvas.addEventListener('mouseup', (event) => this.onMouseUp(event));
        this.canvas.addEventListener('mouseleave', () => this.onMouseUp(new MouseEvent("mouseup"))); // Stop on mouse leave
    }

    draw(context: CanvasRenderingContext2D): void {
        context.save();
        // Translate to object center and apply rotation
        context.translate(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
        context.rotate((this.rotation * Math.PI) / 180); // Convert degrees to radians

        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(-this.size.width / 2 + this.cornerRadius, -this.size.height / 2);
        context.arcTo(this.size.width / 2, -this.size.height / 2, this.size.width / 2, this.size.height / 2, this.cornerRadius);
        context.arcTo(this.size.width / 2, this.size.height / 2, -this.size.width / 2, this.size.height / 2, this.cornerRadius);
        context.arcTo(-this.size.width / 2, this.size.height / 2, -this.size.width / 2, -this.size.height / 2, this.cornerRadius);
        context.arcTo(-this.size.width / 2, -this.size.height / 2, this.size.width / 2, -this.size.height / 2, this.cornerRadius);
        context.closePath();
        context.fill();

        context.restore();
        // Draw the rotate handle
        context.beginPath();
        context.arc(this.rotateHandle.x, this.rotateHandle.y, this.rotateHandle.radius, 0, Math.PI * 2);
        context.fillStyle = "#ff5733";
        context.fill();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
        // Draw the resize handle
        context.beginPath();
        context.rect(this.resizeHandle.x - 5, this.resizeHandle.y - 5, this.rotateHandle.radius, this.rotateHandle.radius);
        context.fillStyle = "#33ff57";
        context.fill();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

    }

    move(newPosition: Position): void {
        this.position = newPosition;
        this.updateHandles();
    }

    updateHandles() {
        const centerX = this.position.x + this.size.width / 2;
        const centerY = this.position.y + this.size.height / 2;
        this.resizeHandle.updatePosition(centerX, centerY, this.size.width / 2, this.size.height / 2, this.rotation);
        this.rotateHandle.updatePosition(centerX, centerY, -this.size.width / 2, -this.size.height / 2, this.rotation);
    }


    // Mouse interactions
    isMouseOver(x: number, y: number): boolean {
        const withinX = x >= this.position.x && x <= this.position.x + this.size.width;
        const withinY = y >= this.position.y && y <= this.position.y + this.size.height;
        return withinX && withinY;
    }

    isMouseOverRotateHandle(x: number, y: number): boolean {
        return this.rotateHandle.isMouseOver(x, y);
    }

    isMouseOverResizeHandle(x: number, y: number): boolean {
        return this.resizeHandle.isMouseOver(x, y);
    }

    updateCursorStyle(x: number, y: number): void {
        if (this.isMouseOverResizeHandle(x, y)) {
            this.canvas.style.cursor = "se-resize"; // Cursor for resize
        } else if (this.isMouseOverRotateHandle(x, y)) {
            this.canvas.style.cursor = "crosshair"; // Cursor for rotate
        } else if (this.isMouseOver(x, y)) {
            this.canvas.style.cursor = "pointer"; // Cursor for dragging the object
            if (this.isDragging) {
                this.canvas.style.cursor = "grabbing";
            }
        } else {
            this.canvas.style.cursor = "default"; // Default cursor when not over object or handles
        }
    }

    onMouseMove(event: MouseEvent): void {
        event.preventDefault()
        const x = event.offsetX;
        const y = event.offsetY;

        this.updateCursorStyle(x, y); // Update cursor style as soon as mouse moves

        if (this.isDragging) {
            const dx = x - this.initialMouseX;
            const dy = y - this.initialMouseY;
            this.move({ x: this.position.x + dx, y: this.position.y + dy });
            this.initialMouseX = x;
            this.initialMouseY = y;
        } else if (this.isResizing) {
            this.resize(x - this.position.x, y - this.position.y);
            this.initialMouseX = x;
            this.initialMouseY = y;
        } else if (this.isRotating) {
            const centerX = this.position.x + this.size.width / 2;
            const centerY = this.position.y + this.size.height / 2;
            const angle = (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI;
            this.rotate(angle);
        }
    }

    onMouseDown(event: MouseEvent): void {
        const x = event.offsetX;
        const y = event.offsetY;

        if (this.isMouseOverRotateHandle(x, y)) {
            this.isRotating = true;
        } else if (this.isMouseOverResizeHandle(x, y)) {
            this.isResizing = true;
        } else if (this.isMouseOver(x, y)) {
            this.isDragging = true;
            this.initialMouseX = x;
            this.initialMouseY = y;
        }
    }

    onMouseUp(event: MouseEvent): void {
        this.isDragging = false;
        this.isResizing = false;
        this.isRotating = false;
    }
    rotate(angle: number): void {
        this.rotation = Math.round(angle / 15) * 15; // Snap rotation to 15-degree increments
        this.updateHandles();
    }
    resize(width: number, height: number): void {
        this.size.width = Math.max(10, width); // Prevent negative or too-small dimensions
        this.size.height = Math.max(10, height);
        this.updateHandles();
    }
    startDragging() {
        this.isDragging = true;
    }
    stopDragging() {
        this.isDragging = false;
    }

    stopResizing() {
        this.isResizing = false;
    }

    stopRotation() {
        this.isRotating = false;
    }


}