import * as THREE from "three";

const PRIMARY_COLOR = "green";
const SECONDARY_COLOR = 0x98fb98;
const DRAG_THRESHOLD = 5;
const POINT_RADIUS = 5;
const LINE_MATERIAL = new THREE.LineBasicMaterial({ color: PRIMARY_COLOR });

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
    canvas.addEventListener("wheel", () => this.render());
    canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
      const { x, y } = viewer._CanvasToSceneCoord(offsetX, offsetY);
      canvas.style.cursor = this.searchPoint(x, y) ? "pointer" : "default";
    });
    viewer.Subscribe("pointerdown", (e) => {
      const { offsetX, offsetY } = e.detail.domEvent;
      this.pointerDown = { x: offsetX, y: offsetY };
    });
    viewer.Subscribe("pointerup", (e) => {
      if (this.isDragged(e.detail.domEvent)) return;
      const { x, y } = e.detail.position;
      const button = e.detail.domEvent.button;
      if (button === 0) this.onClick(x, y);
      if (button === 2) this.removeAllPoints();
      this.render();
    });
  }

  isDragged(domEvent) {
    const { offsetX, offsetY } = domEvent;
    const { x, y } = this.pointerDown;
    return Math.abs(offsetX - x) + Math.abs(offsetY - y) > DRAG_THRESHOLD;
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
    this.updatePoints();
    this.updateLine();
    this.updateData();
    this.viewer.Render();
  }

  getPointRadius() {
    const viewer = this.viewer;
    return (
      viewer._CanvasToSceneCoord(POINT_RADIUS, 0).x -
      viewer._CanvasToSceneCoord(0, 0).x
    );
  }

  addPoint(x, y) {
    const { viewer, points } = this;
    const pointMaterial = new THREE.MeshBasicMaterial({ color: PRIMARY_COLOR });
    const point = new THREE.Mesh(this.getPointGeometry(), pointMaterial);
    point.position.x = x;
    point.position.y = y;
    points.push(point);
    viewer.scene.add(point);
  }

  getPointGeometry() {
    return new THREE.CircleGeometry(this.getPointRadius(), 32);
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

  updatePoints() {
    const { points, closed } = this;
    for (const point of points) {
      point.material.color.set(PRIMARY_COLOR);
      point.geometry = this.getPointGeometry();
    }
    if (!closed && points.length > 0) {
      points[0].material.color.set(SECONDARY_COLOR);
    }
  }

  updateLine() {
    const { viewer, points, line, closed } = this;
    const scene = viewer.scene;
    const linePoints = [...points, ...(closed ? [points[0]] : [])];
    const geometry = new THREE.BufferGeometry().setFromPoints(
      linePoints.map((p) => p.position)
    );
    const nextLine = new THREE.Line(geometry, LINE_MATERIAL);
    this.line = nextLine;
    if (line) scene.remove(line);
    scene.add(nextLine);
  }

  updateData() {
    const getDistance = (p1, p2) => {
      const dx = p1.position.x - p2.position.x;
      const dy = p1.position.y - p2.position.y;
      return Math.sqrt(dx * dx + dy * dy);
    };
    const calcDistance = (points, closed) => {
      let distance = 0.0;
      points.forEach((point, index) => {
        if (index === 0 && !closed) return;
        distance += getDistance(point, points.at(index - 1));
      });
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

  searchPoint(x, y) {
    const threshold = this.getPointRadius();
    for (const point of this.points) {
      const dx = x - point.position.x;
      const dy = y - point.position.y;
      if (dx * dx + dy * dy < threshold * threshold) return point;
    }
    return null;
  }
}

export default Measurement;
