import * as THREE from "three";

const primaryColor = "green";
const secondaryColor = 0x98fb98;

class Measurement {
  constructor(viewer) {
    this.viewer = viewer;
    this.points = [];
    this.line = null;
    this.closed = false;
    this.data = {};
    this.pointerDown = {};
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
      const { x, y } = this.getWorldCoordinates(e.offsetX, e.offsetY);
      const hovered = this.searchPoint(x, y);
      canvas.style.cursor = hovered ? "pointer" : "default";
    });
    canvas.addEventListener("wheel", (e) => {
      this.render();
    });
    viewer.Subscribe("pointerdown", (e) => {
      const { offsetX, offsetY } = e.detail.domEvent;
      this.pointerDown = { x: offsetX, y: offsetY };
    });
    viewer.Subscribe("pointerup", (e) => {
      const { position, domEvent } = e.detail;
      const { x, y } = position;
      if (this.isDragged(domEvent)) return;
      const button = domEvent.button;
      if (button === 0) {
        this.onClick(x, y);
      } else if (button === 2) {
        this.removeAllPoints();
      }
      this.render();
    });
  }

  isDragged(domEvent) {
    const { offsetX, offsetY } = domEvent;
    const dx = offsetX - this.pointerDown.x;
    const dy = offsetY - this.pointerDown.y;
    return Math.abs(dx) + Math.abs(dy) > 10;
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

  getRadius() {
    return (
      this.viewer._CanvasToSceneCoord(5.0, 0).x -
      this.viewer._CanvasToSceneCoord(0, 0).x
    );
  }

  addPoint(x, y) {
    const { viewer, points } = this;
    const geometry = new THREE.CircleGeometry(this.getRadius(), 32);
    const material = new THREE.MeshBasicMaterial({ color: primaryColor });
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
      point.material.color.set(primaryColor);
      point.geometry = new THREE.CircleGeometry(this.getRadius(), 32);
    }
    if (!closed && points.length > 0) {
      points[0].material.color.set(secondaryColor);
    }
  }

  updateLine() {
    const { viewer, points, line, closed } = this;
    const scene = viewer.scene;
    const material = new THREE.LineBasicMaterial({
      color: primaryColor,
    });
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
    return this.viewer._CanvasToSceneCoord(x, y);
  }

  searchPoint(x, y) {
    const threshold = this.getRadius();
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
