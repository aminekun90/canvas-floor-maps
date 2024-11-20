export class Handle {
    x: number;
    y: number;
    radius: number;
    

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    isMouseOver(x: number, y: number): boolean {
        const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
        return distance <= this.radius;
    }
    updatePosition(centerX: number, centerY: number, offsetX: number, offsetY: number, rotation: number): void {
        const cosTheta = Math.cos((rotation * Math.PI) / 180);
        const sinTheta = Math.sin((rotation * Math.PI) / 180);

        // Apply rotation to the handle's offset and calculate the new position
        this.x = centerX + offsetX * cosTheta - offsetY * sinTheta;
        this.y = centerY + offsetX * sinTheta + offsetY * cosTheta;
    }
}