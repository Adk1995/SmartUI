"use strict"

var App = App || {};

let CohortView = function(){

  let self = {

  }
  init();
  function init()
  {
    let cohort = d3.select("#cohortAnalysis").append("div");

    cohort.append("label")
          .text("Selected Patient : ")
          .append("label")
          .text(App.models.applicationState.getSelectedPatientID());


    cohort.append("div")
          .append("label")
          .text("Number of Patients : ")
          .append("label")
          .text(App.models.patient.getPatients().length);

    cohort.append("div")
          .append("label")
          .text("Current Cohort Size : ")
          .append("label")
          .text("20");

    cohort.append("div")
          .append("label")
          .text("Lymph Clusters : ")
          .append("label")
          .text();



    //////////////////////////////////
    let table=d3.select("#cohortAnalysis").append("table")
    .append("thead")
    .append("tr")
    table.selectAll("th")
    .data(App.cohortVariables).enter()
    .append("th")
    .text(function(d){
      console.log(d);
      return d;
    })
    .style("text-align","center")
    .style("font-size","15px");

    let newArray = App.models.patient.calculateSimilarPatients();
    newArray = transpose(App.models.patient.calculateSimilarPatients());
    var newestArray = [newArray[0],newArray[6],newArray[8],newArray[16],newArray[19],newArray[27]];
    console.log(newestArray);

    let similarPatients = App.models.patient.calculateSimilarPatients();
    console.log(similarPatients);
    for(let i=0;i<similarPatients.length;i++)
    {
        d3.select("#cohortAnalysis").select("table").append("tbody").selectAll("td")
        .data(newestArray).enter()
        .append("td")
        .text(function(d){
          console.log(d);
          return d[i];
        })
        .style("text-align","center");
      }
////////////////////////////////////////////////
          d3.select("#cohortAnalysis")
          .append("h5")
          .text("Dendogram");
  }
  function transpose(a) {
      return Object.keys(a[0]).map(function(c) {
          return a.map(function(r) { return r[c]; });
      });
    }
  return{
    init
  }
}
