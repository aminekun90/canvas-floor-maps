import { FloorMap } from '../src/FloorMap';

describe('FloorMap', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('should initialize a canvas with the specified dimensions', () => {
    const floorMap = new FloorMap(container, { width: 500, height: 300 });
    const canvas = container.querySelector('canvas');

    expect(canvas).not.toBeNull();
    expect(canvas!.width).toBe(500);
    expect(canvas!.height).toBe(300);
  });

  test('should draw a rectangle', () => {
    const floorMap = new FloorMap(container, { width: 500, height: 300 });
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Canvas context is null');

    jest.spyOn(context, 'fillRect');
    // floorMap.drawRectangle(10, 10, 50, 50, '#ff0000');

    expect(context.fillRect).toHaveBeenCalledWith(10, 10, 50, 50);
  });
});
