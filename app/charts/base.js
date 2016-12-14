'use strict';

const BREAKPOINT = 400;

export default class BaseChart {
  constructor(id, d3, element) {
    this.id = id;
    this.d3 = d3;
    this.element = element
  }

  /* 
   * take a configuration object of sizes and setup margins:
   * top: int,
   * bottom: int,
   * left: object { sm: int, lg: int }
   * right: object { sm: int, lg: int }
  */
  margins(sizes) {
    // set defaults if not present
    if (!sizes.right) sizes.right = {};
    if (!sizes.left) sizes.left = {};

    this.margin = {
      top: sizes.top || 0,
      right: this.width < BREAKPOINT ? sizes.right.sm || 0 : sizes.right.lg || 0,
      left: this.width < BREAKPOINT ? sizes.left.sm || 0 : sizes.left.lg || 0,
      bottom: sizes.bottom || 0
    };
  }

  size(sizes) {
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
