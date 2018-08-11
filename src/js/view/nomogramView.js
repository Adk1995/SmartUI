"use strict"

var App = App || {};

let NomogramView = function(targetID) {

  let self = {
    targetID: null,
    targetElement: null,
    legendSVG: null,
    nomogram: null,
    axesLabel: {},
    axesRange: {},
    axesDomain: {},
    filteredAxes: [],
    strokewidth: {
      "knn":null,
      "filter" : null
    },
    data: {
      "knn": [],
      "filter": []
    },
    selectedPatientID: -1,
    mode: null
  };

  init();

  function init(){
    self.targetID = targetID;
    self.targetElement = d3.select(targetID);
    console.log(self.targetID + "Header");
    self.legendSVG = d3.select(self.targetID + "Header").append("svg")
                        .attr("width","100%")
                        .attr("height",50);

    App.nomogramAxes.forEach(function(axes,i){
      self.axesLabel[i]=axes.label;
      self.axesRange[i]=axes.rangeShrink;
      self.axesDomain[i]=axes.domain;
      self.filteredAxes[i]=axes.name;
    });
    console.log(self.axesDomain,self.filteredAxes);

    createNomogram();
  }

  function createNomogram()
  {
    let patients=App.models.patient.getPatients();
    let pat =[];
    for(let i=0;i<10;i++)
    {
      pat[i]=patients[i];
    }
    console.log(self.targetID);
    self.nomogram = new Nomogram()
                        .target(self.targetID)
                        .setAxes(App.nomogramAxes,"reduce","shrinkAxis")
                        .data(pat)
                        .margins({
                          top: 5,
                          left: 40,
                          right:60,
                          bottom: 60
                        })
                        .titlePosition("bottom")
                        .titleRotation(-10)
                        .titleFontSize(20)
                        .tickFontSize(10)
                        .color("black")
                        .opacity(0.7)
                        .filteredOpacity(0)
                        .strokeWidth(self.strokewidth)
                        .brushable(true)
                        .onMouseOver("hide-other")
                        .onMouseOut("reset-paths");
                        console.log(self.nomogram);
                        self.nomogram.draw();
  }
}
