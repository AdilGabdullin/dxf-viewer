import * as THREE from "three";

class Measurement {
  constructor(viewer) {
    this.viewer = viewer;
    this.points = [];
    this.line = null;
    this.closed = false;
    this.initEvents();
  }

  initEvents() {
    const { viewer } = this;
    const canvas = viewer.GetCanvas();
    canvas.addEventListener("mousemove", (e) => {
      const { x, y } = this.getWorldCoordinates(e.layerX, e.layerY);
      const hovered = this.searchPoint(x, y);
      canvas.style.cursor = hovered ? "pointer" : "default";
    });
    viewer.Subscribe("pointerup", (e) => {
      const { x, y } = e.detail.position;
      this.onClick(x, y);
      this.render();
    });
  }

  onClick(x, y) {
    const clicked = this.searchPoint(x, y);
    if (clicked === null) {
      this.addPoint(x, y);
    } else if (this.points.length === 2) {
      this.removePoint(this.points[1]);
      this.removePoint(this.points[0]);
    } else if (clicked === this.points[0] && !this.closed) {
      this.closed = true;
    } else {
      this.removePoint(clicked);
    }
  }

  addPoint(x, y) {
    const { viewer, points } = this;
    const geometry = new THREE.CircleGeometry(3, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x0 });
    const point = new THREE.Mesh(geometry, material);
    point.position.x = x;
    point.position.y = y;
    points.push(point);
    viewer.scene.add(point);
  }

  removePoint(point) {
    this.viewer.scene.remove(point);
    this.points = this.points.filter((p) => p !== point);
    this.closed = false;
  }

  render() {
    this.updateColors();
    this.updateLine();
    this.viewer.Render();
  }

  updateColors() {
    const { points, closed } = this;
    for (const point of points) {
      point.material.color.set(0x0);
    }
    if (!closed && points.length > 0) {
      points[0].material.color.set(0x707070);
    }
  }

  updateLine() {
    const { viewer, points, line, closed } = this;
    const scene = viewer.scene;
    const material = new THREE.LineBasicMaterial({ color: 0x0 });
    const linePoints = [...points, ...(closed ? [points[0]] : [])];
    const geometry = new THREE.BufferGeometry().setFromPoints(
      linePoints.map((p) => p.position)
    );
    const nextLine = new THREE.Line(geometry, material);
    this.line = nextLine;
    if (line) scene.remove(line);
    scene.add(nextLine);
  }

  getWorldCoordinates(x, y) {
    const canvas = this.viewer.GetCanvas();
    return new THREE.Vector3(
      (x / canvas.width) * 2 - 1,
      -(y / canvas.height) * 2 + 1,
      0.999
    ).unproject(this.viewer.camera);
  }

  searchPoint(x, y) {
    const threshold = 4;
    for (const point of this.points) {
      const dx = x - point.position.x;
      const dy = y - point.position.y;
      if (dx * dx + dy * dy < threshold * threshold) {
        return point;
      }
    }
    return null;
  }
}

export default Measurement;
