import { FloorMap } from '../src/index'; // Import from src directly
import { Desk, Room, Wall } from '../src/objects';

const container = document.getElementById('container')!;
const map = new FloorMap(container, { width: 800, height: 600 });
const canvas = map.getCanvas();
// Draw some shapes
// map.drawRectangle(50, 50, 200, 100, '#ff5722');
// map.drawCircle(400, 300, 50, '#2196f3');
// map.drawLine(100, 100, 700, 500, '#4caf50', 5);

// Create objects
const room1 = new Room('room1', { x: 50, y: 50 }, { width: 200, height: 150 }, '#FF5722', canvas);
const desk1 = new Desk('desk1', { x: 100, y: 250 }, { width: 150, height: 100 }, '#4CAF50', '#2196F3', canvas, 0, 10);
// const toilet1 = new Toilet('toilet1', { x: 500, y: 100 }, { width: 60, height: 60 }, '#2196F3');

// Add objects to floor map

map.addObject(room1);
map.addObject(desk1);
