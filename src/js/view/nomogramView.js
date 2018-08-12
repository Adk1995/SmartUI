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
    console.log(patients);
    let pat =[];
    for(let i=0;i<10;i++)
    {
      pat[i]=patients[i];

    }
    console.log(typeof(pat[0]["Age at Diagnosis (Calculated)"]));

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
                        .titleFontSize(10)
                        .tickFontSize(10)
                        .color(selectColor)
                        .opacity(0.7)
                        .filteredOpacity(0)
                        .strokeWidth(strokeWidth)
                        .brushable(true)
                        .onMouseOver("hide-other")
                        .onMouseOut("reset-paths");
                        console.log(self.nomogram);
                        self.nomogram.draw();


  }

  function selectColor(d)
  {
    let selectedPatientID = App.models.applicationState.getSelectedPatientID();
    let patients = App.models.patient.getPatients();

    console.log(patients[selectedPatientID]["Dummy ID"]);
    if(d["Dummy ID"]===patients[selectedPatientID]["Dummy ID"])
    {
        return "#000000";
    }

    else if(d["Gender"]=="Male"){
      return "#c9c95d";
    }
    else {
      return "#7f7f7f";
    }
  }

  function strokeWidth(d)
  {
    console.log("Hello");
    let patients = App.models.patient.getPatients();
    let selectedPatientID = App.models.applicationState.getSelectedPatientID();

  for(let i=0;i<15;i++)
  { console.log(patients[i]["Dummy ID"]);
    if(Number(d["Dummy ID"])===Number(patients[i]["Dummy ID"]))
    {
      if(d["Dummy ID"]===patients[selectedPatientID]["Dummy ID"])
        return 4;
        console.log("Good morning");
      return 2;
    }
  }
    return 0;

}
}
