import { getX, getY, getId } from './util';

class Position {
  constructor(i) {
    this.i = i;
  }

  setI(i) {
    this.i = i;
  }

  x() {
    return getX(this.i);
  }

  y() {
    return getY(this.i);
  }

  addY(y) {
    const newY = this.y() + y;
    if (newY < 0 || newY > 7) {
      return null;
    }
    this.setI(getId(this.x(), newY));
    return this;
  }

  addX(x) {
    const newX = this.x() + x;
    if (newX < 0 || newX > 7) {
      return null;
    }
    this.setI(getId(newX, this.y()));
    return this;
  }

  addXY(x, y) {
    const newX = this.x() + x;
    const newY = this.y() + y;
    if (newX < 0 || newY < 0 || newX > 7 || newY > 7) {
      return null;
    }
    this.setI(getId(newX, newY));
    return this;
  }
}

export default Position;
