"use strict"

var App = App || {};



(function() {
  App.models = {};
  App.controllers = {};
  App.views ={};

  App.demographicAttributes = ["Age at Diagnosis (Calculated)",
                                "Gender",
                                "Aspiration rate Pre-therapy",
                                "Smoking status at Diagnosis (Never/Former/Current)",
                                "Race",
                                "HPV/P16 status",
                                "ecog",
                                "Smoking status (Packs/Year)",
                                "OS (Calculated)"];

  App.cancerAttributes = ["Site",
                          "AJCC 7th edition",
                          "AJCC 8th edition",
                          "T-category",
                          "N-category",
                          "Pathological Grade",
                          "Tumor subsite (BOT/Tonsil/Soft Palate/Pharyngeal wall/GPS/NOS)",
                          "Affected Lymph node cleaned",
                          "OS (Calculated)"];

  App.treatmentAttributes = ["Therapeutic combination",
                              "Local_Therapy",
                              "Treatment duration (Days)",
                              "Total dose",
                              "Total fractions",
                              "Dose/fraction (Gy)",
                              "Neck Dissection after IMRT (Y / levels)",
                              "Neck boost (Y/N)",
                              "OS (Calculated)"];

  App.models.patient=new PatientModel();
  App.models.applicationState = new ApplicationStateModel();

  console.log(App.models.applicationState);

  App.init=function() {
    App.models.patient.loadPatients().then(function(){
      console.log(App.models.patient.getPatientAttributeDomains());
    })
    .catch(function(err) {
              console.log("Promise Error", err);
          });

  };

})();
window.addEventListener("load",App.init,false);
