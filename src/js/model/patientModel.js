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
                        });
                        calculatePatientAttributeDomains();
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

  function calculatePatientAttributeDomains()
  {
    let patientObjArray = Object.values(self.patients);

    for(let attribute of App.demographicAttributes) {
      let attribute_valueArray = patientObjArray.map(function(o){
                return o[attribute];
      });

      let uniqueValues = _.uniq(attribute_valueArray);
      self.attributeDomains[attribute] = uniqueValues.sort();
    }
    self.attributeDomains["Age at Diagnosis (Calculated)"] = [25,90];
    self.attributeDomains["OS (Calculated)"] =[0,140];
    self.attributeDomains["Smoking status (Packs/Year)"] = [0,150];
    self.attributeDomains["ecog"] = ["0","1","2","3"];
    console.log(self.attributeDomains);
  }

  function calculateSimilarPatients()
  {
    let otherPatients = [];
    let numberOfNeighbors = App.models.applicationState.getNumberOfNeighbors();
  }
  function getPatientAttributeDomains()
  {
    return self.attributeDomains;
  }
  return {
    loadPatients,
    getPatients,
    getPatientAttributeDomains,
    calculatePatientAttributeDomains
  };
}
