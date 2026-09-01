/**
 * Pathfinding & Tile Grid Collision Manager
 * Mengatur pergerakan musuh mengikuti lintasan waypoint dan validasi penempatan tower.
 */

import { TILE_SIZE, MAP_COLS, MAP_ROWS } from '../config/chapters.js';

export class PathManager {
  constructor(waypoints = []) {
    this.setPath(waypoints);
  }

  setPath(waypoints) {
    this.waypoints = waypoints.map((pt) => ({
      x: pt.x * TILE_SIZE + TILE_SIZE / 2,
      y: pt.y * TILE_SIZE + TILE_SIZE / 2,
      gridX: pt.x,
      gridY: pt.y
    }));

    this.calculateSegmentLengths();
    this.buildPathGridMask();
  }

  calculateSegmentLengths() {
    this.segments = [];
    this.totalLength = 0;

    for (let i = 0; i < this.waypoints.length - 1; i++) {
      const p1 = this.waypoints[i];
      const p2 = this.waypoints[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const length = Math.hypot(dx, dy);

      this.segments.push({
        p1,
        p2,
        dx,
        dy,
        length,
        startDist: this.totalLength,
        endDist: this.totalLength + length
      });

      this.totalLength += length;
    }
  }

  /**
   * Membuat grid mask sel yang dilewati oleh jalur
   */
  buildPathGridMask() {
    this.pathGrid = Array(MAP_ROWS)
      .fill(null)
      .map(() => Array(MAP_COLS).fill(false));

    for (let i = 0; i < this.waypoints.length - 1; i++) {
      const p1 = this.waypoints[i];
      const p2 = this.waypoints[i + 1];

      const minX = Math.min(p1.gridX, p2.gridX);
      const maxX = Math.max(p1.gridX, p2.gridX);
      const minY = Math.min(p1.gridY, p2.gridY);
      const maxY = Math.max(p1.gridY, p2.gridY);

      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          if (y >= 0 && y < MAP_ROWS && x >= 0 && x < MAP_COLS) {
            this.pathGrid[y][x] = true;
          }
        }
      }
    }
  }

  /**
   * Memeriksa apakah koordinat grid (x, y) berada di atas jalan
   */
  isPathTile(gridX, gridY) {
    if (gridX < 0 || gridX >= MAP_COLS || gridY < 0 || gridY >= MAP_ROWS) {
      return true; // di luar map tidak valid
    }
    return !!this.pathGrid[gridY][gridX];
  }

  /**
   * Mengambil posisi koordinat (x, y) dan sudut rotasi berdasarkan jarak yang ditempuh
   */
  getPositionAtDistance(distance) {
    if (this.segments.length === 0) return { x: 0, y: 0, angle: 0, reachedEnd: true };
    if (distance >= this.totalLength) {
      const last = this.waypoints[this.waypoints.length - 1];
      return { x: last.x, y: last.y, angle: 0, reachedEnd: true };
    }

    for (const seg of this.segments) {
      if (distance >= seg.startDist && distance <= seg.endDist) {
        const segDist = distance - seg.startDist;
        const progress = seg.length > 0 ? segDist / seg.length : 0;
        const x = seg.p1.x + seg.dx * progress;
        const y = seg.p1.y + seg.dy * progress;
        const angle = Math.atan2(seg.dy, seg.dx);

        return { x, y, angle, reachedEnd: false };
      }
    }

    const first = this.waypoints[0];
    return { x: first.x, y: first.y, angle: 0, reachedEnd: false };
  }
}
