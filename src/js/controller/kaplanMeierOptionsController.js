"use strict"

var App = App || {};

let KaplanMeierOptions = function(targetID){

  let self= {
    targetID: null
  }
  init();
  function init()
  {
    self.targetID=targetID;
    populateDropdown();
  }
  function populateDropdown()
  {
    let attributes=App.demographicAttributes;
    console.log(attributes);
    attributes.forEach(function(d){
      if(d!="Age at Diagnosis (Calculated)")
      {
        let id = d3.select(targetID)
                  .append("option")
                  .attr("value",d)
                  .text(d);
      }
    });

  }

  function selectOption(targetID)
  {
    let selectedID;
    d3.select(targetID)
      .on("change",function(d){
        selectedID = d3.select(this)
                            .node()
                            .value;
                            console.log(selectedID);
      App.models.kaplanMeierPatient.initPatients(App.models.patient.getPatients(),selectedID);
      });
  }
  return{
    init,
    populateDropdown,
    selectOption
  }
}
