// src/FloorMap.ts

import { FloorMapOptions, FloorMapObject, Position } from "./types";

export class FloorMap {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly objects: FloorMapObject[];
    private selectedObject: FloorMapObject | null = null;
    private mouseStart: Position = { x: 0, y: 0 };  // Track the starting mouse position for dragging

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
        this.objects = [];
        // Set background color
        this.context.fillStyle = options.backgroundColor ?? '#ffffff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Set up event listeners for interactions
        this.setupEventListeners();
    }


    addObject(object: FloorMapObject): void {
        this.objects.push(object);
        this.draw(); // Redraw all objects after adding
    }
    draw(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas before redrawing
        for (const object of this.objects) {
            object.draw(this.context);
        }
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


    // Events 
    private setupEventListeners(): void {
        // Listen for mouse events on the canvas
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
        this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
        this.canvas.addEventListener('mousedown', (event) => this.handleMouseDown(event));
        this.canvas.addEventListener('mouseup', (event) => this.handleMouseUp(event));
    }

    // Check if the mouse is over any object
    private isMouseOverObject(x: number, y: number, obj: FloorMapObject): boolean {
        // Simple rectangle hit test (could be enhanced for more complex shapes)
        if (x >= obj.position.x && x <= obj.position.x + obj.size.width &&
            y >= obj.position.y && y <= obj.position.y + obj.size.height) {
            return true;
        }
        return false;
    }

    // Handle click event
    private handleClick(event: MouseEvent): void {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        // Check if the mouse is over any object and select it
        this.selectedObject = this.objects.find(obj => this.isMouseOverObject(mouseX, mouseY, obj)) || null;

        if (this.selectedObject) {
            console.log('Object clicked:', this.selectedObject);
        }

        // Redraw the floor map after handling the click
        this.draw();
    }

    // Handle mousemove event to highlight or show cursor
    private handleMouseMove(event: MouseEvent): void {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        const hoveredObject = this.objects.find(obj => this.isMouseOverObject(mouseX, mouseY, obj));

        if (hoveredObject) {
            this.canvas.style.cursor = 'pointer';  // Change cursor to indicate interactivity
        } else {
            this.canvas.style.cursor = 'default';  // Reset cursor
        }
        if (this.selectedObject?.isBeingDragged) {
            // Update the position of the desk when dragging
            const dx = mouseX - this.mouseStart.x;
            const dy = mouseY - this.mouseStart.y;

            // Move the desk based on mouse movement
            const newPosition = { x: this.selectedObject.position.x + dx, y: this.selectedObject.position.y + dy };
            this.selectedObject.move(newPosition);

            // Update the starting position for the next move
            this.mouseStart = { x: mouseX, y: mouseY };

            // Redraw the floor map
            this.draw();
        }
    }


    // Handle mousedown event (for dragging)
    private handleMouseDown(event: MouseEvent): void {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        // Check if the mouse is over any object and start dragging
        const object = this.objects.find(obj => this.isMouseOverObject(mouseX, mouseY, obj));
        if (object) {
            this.selectedObject = object;
            this.mouseStart = { x: mouseX, y: mouseY };  // Set the starting mouse position for dragging
            this.selectedObject.startDragging();  // Mark the desk as being dragged
        }
    }

    // Handle mouseup event (stop dragging)
    private handleMouseUp(event: MouseEvent): void {
        if (this.selectedObject) {
            this.selectedObject.stopDragging();  // Stop dragging the desk
            this.selectedObject = null;  // Clear the selected object
        }
    }
}
