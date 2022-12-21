import * as THREE from "three";

class Measurement {
  constructor(viewer) {
    this.viewer = viewer;
    this.points = [];
    this.line = null;
    this.closed = false;
    this.data = {
      distance: undefined,
      area: undefined,
    };
    this.observers = [];
    this.initEvents();
  }

  subscribe(callback) {
    this.observers.push(callback);
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
      const button = e.detail.domEvent.button;
      if (button === 0) {
        this.onClick(x, y);
      } else if (button === 2) {
        this.removeAllPoints();
      }
      this.render();
    });
  }

  onClick(x, y) {
    const clicked = this.searchPoint(x, y);
    if (clicked === null) {
      this.addPoint(x, y);
    } else if (this.points.length === 2) {
      this.removeAllPoints();
    } else if (clicked === this.points[0] && !this.closed) {
      this.closed = true;
    } else {
      this.removePoint(clicked);
    }
  }

  render() {
    this.updateColors();
    this.updateLine();
    this.updateData();
    this.viewer.Render();
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

  removeAllPoints() {
    this.points.map((p) => this.viewer.scene.remove(p));
    this.points = [];
    this.closed = false;
  }

  removePoint(point) {
    this.viewer.scene.remove(point);
    this.points = this.points.filter((p) => p !== point);
    this.closed = false;
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

  updateData() {
    const calcDistance = (points, closed) => {
      const getDistance = (p1, p2) => {
        const dx = p1.position.x - p2.position.x;
        const dy = p1.position.y - p2.position.y;
        return Math.sqrt(dx * dx + dy * dy);
      };
      let distance = 0.0;
      points.forEach((point, index) => {
        if (index === 0) return;
        distance += getDistance(point, points[index - 1]);
      });
      if (closed) {
        distance += getDistance(points.at(0), points.at(-1));
      }
      return distance;
    };
    const calcPolygonArea = (points) => {
      const vertices = points.map((p) => p.position);
      let total = 0;
      for (let i = 0, l = vertices.length; i < l; i++) {
        const addX = vertices[i].x;
        const addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
        const subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
        const subY = vertices[i].y;
        total += addX * addY * 0.5;
        total -= subX * subY * 0.5;
      }
      return Math.abs(total);
    };
    const { points, observers, closed } = this;
    const distance = calcDistance(points, closed);
    const area = closed ? calcPolygonArea(points) : 0.0;
    this.data = { distance, area };
    observers.forEach((callback) => callback(this.data));
  }

  getWorldCoordinates(x, y) {
    const viewer = this.viewer;
    const canvas = viewer.GetCanvas();
    const nx = (x / canvas.width) * 2 - 1;
    const ny = -(y / canvas.height) * 2 + 1;
    return new THREE.Vector3(nx, ny, 0.999).unproject(viewer.camera);
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
