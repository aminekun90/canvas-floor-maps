import { IFloorMapObject, FloorMapOptions, Position } from "./types";


export class FloorMap {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly objects: IFloorMapObject[];
    private selectedObject: IFloorMapObject | null = null;
    
    constructor(container: HTMLElement, options: FloorMapOptions) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = options.width;
        this.canvas.height = options.height;

        container.appendChild(this.canvas);

        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Failed to get 2D context');
        }
        this.context = context;
        this.objects = [];

        this.context.fillStyle = options.backgroundColor ?? '#ffffff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.bindCanvasEvents();
        this.startRedrawLoop();

    }
    getCanvas(){
        return this.canvas;
    }
    bindCanvasEvents() {
        // Add mouse events that trigger object interactions
        this.canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
        this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.canvas.addEventListener('mouseup', (event) => this.onMouseUp(event));
        this.canvas.addEventListener('mouseleave', () => this.onMouseUp(new MouseEvent("mouseup"))); // Stop on mouse leave
    }

    // Add a method to update and redraw everything
    startRedrawLoop() {
        const loop = () => {
            this.clearCanvas();
            this.redrawObjects();
            requestAnimationFrame(loop); // Redraw on the next animation frame
        };
        loop();
    }

    // Clear the canvas
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Redraw all objects
    redrawObjects() {
        this.objects.forEach((object) => {
            object.draw(this.context); // Draw each object (like Desk)
        });
    }

    // Mouse event handlers (delegated to objects)
    onMouseDown(event: MouseEvent) {
        this.objects.forEach((object) => {
            object.onMouseDown(event);
        });
    }

    onMouseMove(event: MouseEvent) {
        this.objects.forEach((object) => {
            object.onMouseMove(event);
        });
    }

    onMouseUp(event: MouseEvent) {
        this.objects.forEach((object) => {
            object.onMouseUp(event);
        });
    }

    // Add objects to the map
    addObject(object: IFloorMapObject) {
        this.objects.push(object);
    }

}
