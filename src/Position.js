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

  i() {
    return this.i;
  }

  addY(y) {
    const newY = this.y() + y;
    if (y < 0 || y > 7) {
      return null;
    }
    this.setI(getId(this.x(), newY));
    return this;
  }

  addX(x) {
    const newX = this.x() + x;
    if (x < 0 || x > 7) {
      return null;
    }
    this.setI(newX, this.y());
    return this;
  }
}

export default Position;
