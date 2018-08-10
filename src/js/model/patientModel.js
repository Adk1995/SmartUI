"use strict"

var App = App || {};

let PatientModel = function() {

  let self = {
    patients: {},
    attributeDomains: {}
  };
  function loadPatients() {
    let dataFile = "data/AnonymousNewData1.csv";

    return new Promise(function(resolve, reject){
            let dataLoadQueue = d3.queue();

            dataLoadQueue
                      .defer(d3.csv, dataFile)
                      .await(loadAllFiles);

                      function loadAllFiles(error, probData)
                      {
                        _.forEach(probData, function(d,i){
                          self.patients[i] = d;
                          self.patients[i]["Age at Diagnosis (Calculated)"] = Number(self.patients[i]["Age at Diagnosis (Calculated)"]);
                          self.patients[i]["OS (Calculated)"] = Number(self.patients[i]["OS (Calculated)"]);
                        })
                        resolve();
                      }
            console.log("in Load Patients");
    });
  }

  function getPatients() {
    return self.patients;
  }

  function getNumberOfPatients() {
    return Object.keys(self.patients).length;
  }

  return {
    loadPatients,
    getPatients
  };
}
