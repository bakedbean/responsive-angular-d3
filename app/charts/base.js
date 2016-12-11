'use strict';

const BREAKPOINT = 400;

export default class BaseChart {
  constructor(id, d3, element) {
    this.id = id;
    this.d3 = d3;
    this.element = element
  }

  margins(sizes) {
    // destructure the sizes
    let [top, right, left, bottom] = sizes;

    if (!left) left = [];
    if (!right) right = [];

    // destructure left and right responsive arrays
    let [rightSm, rightLg] = right;
    let [leftSm, leftLg] = left;

    this.margin = {
      top: top || 20,
      right: this.width < BREAKPOINT ? rightSm || 0 : rightLg || 10,
      left: this.width < BREAKPOINT ? leftSm || 25 : leftLg || 110,
      bottom: bottom || 110
    };
  }

  size(...sizes) {
    this.margins(sizes);

    this.width = this.element[0].offsetWidth - this.margin.left - this.margin.right;
    this.height = .7 * this.width;

    this.svg = this.d3.select(this.element[0]).append('svg');
    this.svg
      .attr('id', this.id)
      .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    return this;
  }

  clean() {
    this.d3.select('#' + this.id).remove();
    return this;
  }
}
