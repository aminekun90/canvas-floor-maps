import { FloorMap } from '../src/index'; // Import from src directly

const container = document.getElementById('container')!;
const map = new FloorMap(container, { width: 800, height: 600 });

// Draw some shapes
map.drawRectangle(50, 50, 200, 100, '#ff5722');
map.drawCircle(400, 300, 50, '#2196f3');
map.drawLine(100, 100, 700, 500, '#4caf50', 5);
