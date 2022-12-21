import * as three from "three";

class Measurement {
  constructor(viewer) {
    this.viewer = viewer;
    this.points = [];
  }

  addPoint(x, y) {
    const geometry = new three.CircleGeometry(3, 32);
    const material = new three.MeshBasicMaterial({ color: 0x0 });
    const point = new three.Mesh(geometry, material);
    point.position.x = x;
    point.position.y = y;
    this.points.push(point);
    this.viewer.scene.add(point);
    this.viewer.Render();
  }

  removePoint() {
    this.viewer.scene.remove(this.points.pop());
    this.viewer.Render();
  }
}

export default Measurement;
