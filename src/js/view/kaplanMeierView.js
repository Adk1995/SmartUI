"use strict"

var App = App || {};

let KaplanMeierView = function(targetID){

    let self = {
          targetElement: null,
          targetSvg: null,
          maxOS: null
      };

    init();

  function init() {
      self.targetElement = d3.select(targetID);

      self.targetSvg = self.targetElement.append("svg")
          .attr("width", self.targetElement.node().clientWidth)
          .attr("height", self.targetElement.node().clientHeight)
          .attr("viewBox", "0 0 120 100")
          .attr("preserveAspectRatio", "xMidYMin");

      drawXAxis();
      drawYAxis();
      drawXAxisLabels();
  }
  function drawXAxis() {
      self.targetSvg.append("line")
          .attr("x1", 10)
          .attr("y1", 90)
          .attr("x2", 110)
          .attr("y2", 90)
          .style("stroke", "black")
          .style("stroke-width", "0.6px");
  }
  function drawYAxis() {
      self.targetSvg.append("line")
          .attr("x1", 10)
          .attr("y1", 10)
          .attr("x2", 10)
          .attr("y2", 90)
          .style("stroke", "black")
          .style("stroke-width", "0.6px");
  }

  function drawXAxisLabels() {
      for (let i = 0; i <= 10; i++) {
          self.targetSvg.append("text")
              .attr("x", 2)
              .attr("y", 91 - 8 * i)
              .style("font-size", "4px")
              .text((0.1 * i).toFixed(1));
      }
  }

  function drawLegend(attrVal, attrValNum, color) {
        self.targetSvg.append("rect")
            .attr("class", "legend")
            .attr("x", 80)
            .attr("y", attrValNum * 5)
            .attr("width", 4)
            .attr("height", 4)
            .style("fill", color)
            .style("opacity", 0.5);

        self.targetSvg.append("text")
            .attr("class", "legend")
            .attr("x", 85)
            .attr("y", 4 + attrValNum * 5)
            .style("font-size", "4px")
            .text(attrVal);
    }

    function update(KMData)
    {
      d3.selectAll(".kmVar").remove();
      d3.selectAll(".kmPlots").remove();
      d3.selectAll(".legend").remove();
      d3.selectAll(".yAxisLabels").remove();

      let x = d3.scaleLinear()
                .domain([0, self.maxOS])
                .range([10, 110]);

      let y = d3.scaleLinear()
                .domain([0, 1])
                .range([90, 10]);

      let attrValNum = 0;
      for (let attrKey of Object.keys(KMData)) {
          if (KMData[attrKey].length > 0) {  // have patients in the group
              drawKMPlot(KMData[attrKey], x, y, App.attributeColors(attrKey));
              drawLegend(attrKey, attrValNum, App.attributeColors(attrKey));
              attrValNum++;
          }
      }

      let interval = Math.round(self.maxOS / 100) * 10;

      for (let i = 0; i < self.maxOS; i += interval) {
          self.targetSvg.append("text")
              .attr("class", "yAxisLabels")
              .attr("x", x(i))
              .attr("y", 95)
              .style("font-size", "4px")
              .style("text-anchor", "middle")
              .text(i);
      }

    }
  function setMaxOS(os)
  {
    self.maxOS = os;
  }
}