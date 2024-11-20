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
        this.redrawObjects();


    }
    getCanvas() {
        return this.canvas;
    }
    bindCanvasEvents() {
        // Add mouse events that trigger object interactions
        this.canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
        this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.canvas.addEventListener('mouseup', (event) => this.onMouseUp(event));
        this.canvas.addEventListener('mouseleave', () => this.onMouseUp(new MouseEvent("mouseup"))); // Stop on mouse leave
    }

    // Clear the canvas
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Redraw all objects
    redrawObjects() {
        this.clearCanvas();
        this.objects.forEach((object) => {
            object.draw(this.context); // Draw each object (like Desk)
        });
    }

    // Mouse event handlers (delegated to objects)
    onMouseDown(event: MouseEvent) {
        const x = event.offsetX;
        const y = event.offsetY;
    
        this.selectedObject = null; // Reset active object
        console.log(this.objects.length);
        
        // Iterate over objects from topmost to bottommost
        for (let i = this.objects.length - 1; i >= 0; i--) {
            const object = this.objects[i];
            if (object.isMouseOver(x, y)) {
                this.selectedObject = object;
                object.onMouseDown( event); // Trigger object-specific logic
                this.redrawObjects(); // Redraw canvas to reflect interaction
                break; // Stop propagation to lower objects
            }
        }
    }

    onMouseMove(event: MouseEvent) {
        this.selectedObject?.onMouseMove(event);
        this.redrawObjects();
    }

    onMouseUp(event: MouseEvent) {
        this.selectedObject?.onMouseUp(event);
        this.redrawObjects();
    }

    // Add objects to the map
    addObjects(...objects: IFloorMapObject[]) {
        this.objects.push(...objects);
        this.redrawObjects();
    }

}
