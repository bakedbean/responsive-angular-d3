'use strict';

import BaseChart from './base';

export default class BarChart extends BaseChart {
  constructor(d3, element, data, id) {
    super('bar-chart-' + id || 'bar-chart', d3, element);

    this.size({
      left: {
        sm: 0,
        lg: 50
      }
    }).configure(data);
  }

  configure(data) {
    this.data = data
      .map(d => ({
        date: d.date,
        value: +d.value
      }));
  }

  get xAxis() {
    return this.d3.scaleBand()
      .rangeRound([0, this.width])
      .padding(0.1)
      .domain(this.data.map(d => d.date));
  }

  get yAxis() {
    return this.d3.scaleLinear()
      .rangeRound([this.height, 0])
      .domain([0, this.d3.max(this.data, d => d.value)]);
  }

  renderers() {
    return {
      x: () => this.g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.height + ")")
        .call(this.d3.axisBottom(this.xAxis))
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", d => "rotate(-65)"),

      y: () => this.g.append("g")
        .attr("class", "axis axis--y")
        .call(this.d3.axisLeft(this.yAxis)),

      yLabel: () => this.g.append('text')
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.75em")
        .attr("text-anchor", "end")
        .text("Values"),

      bar: () => this.g.selectAll(".bar")
        .data(this.data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", d => this.xAxis(d.date))
          .attr("y", d => this.yAxis(d.value))
          .attr("width", this.xAxis.bandwidth())
          .attr("height", d => this.height - this.yAxis(d.value))
    }
  }

  render() {
    this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.renderers().x();
    this.renderers().y();
    this.renderers().yLabel();
    this.renderers().bar();
  }
}


