"use strict"

var App = App || {};

let InputFillController = function () {

  let self = {
    patientDropdown: null,
    currentPatient: null
  };

  function populatePatientDropdown() {

    let patients = App.models.patient.getPatients();

    for(let patient in patients)
    {

      let id = d3.select(".idSelect")
                .append("option")
                .attr("value",patients[patient]["Dummy ID"])
                .text(patients[patient]["Dummy ID"]);
    }

  }

  function selectPatient(element)
  {
    self.patientDropdown = d3.select(element)
                              .on("change", function(d){
                                let selectedID = d3.select(this)
                                                    .node()
                                                    .value;
                                self.currentPatient = selectedID;
                                console.log(selectedID);
                              });
  }

  return{
    populatePatientDropdown,
    selectPatient
  }
}
