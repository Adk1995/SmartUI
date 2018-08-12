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
                                "Smoking status (Packs/Year)"
                                ];

  App.cancerAttributes = ["Site",
                          "AJCC 7th edition",
                          "AJCC 8th edition",
                          "T-category",
                          "N-category",
                          "Pathological Grade",
                          "Tumor subsite (BOT/Tonsil/Soft Palate/Pharyngeal wall/GPS/NOS)",
                          "Affected Lymph node cleaned"
                          ];

  App.treatmentAttributes = ["Therapeutic combination",
                              "Local_Therapy",
                              "Treatment duration (Days)",
                              "Total dose",
                              "Total fractions",
                              "Dose/fraction (Gy)",
                              "Neck Dissection after IMRT (Y / levels)",
                              "Neck boost (Y/N)",
                              "OS (Calculated)"];

  App.nomogramAxes =[         {
                                name:"Age at Diagnosis (Calculated)",
                                rangeShrink: [0,1],
                                domain: [25,90],
                                label: "AgeAtTx"
                              },
                              {
                                name:"Gender",
                                rangeShrink: [0.2,0],
                                label: "Gender"
                              },
                              {
                                name:"Race",
                                rangeShrink: [0.6,0],
                                label: "Race"
                              },
                              {
                                name:"HPV/P16 status",
                                rangeShrink: [0.4,0],
                                //domain: ["IV","III","II","I"],
                                label: "HPV/P16"
                              },
                              {
                                name:"ecog",
                                rangeShrink: [0.4,0],
                                domain: ["0","1","2","3"],
                                label: "ecog"
                              },
                              {
                                name:"Smoking status at Diagnosis (Never/Former/Current)",
                                rangeShrink: [0.4,0],
                              //  domain: ["Tis","T1","T2","T3","T4","Tx"],
                                label: "Smoking Status"
                              },
                              {
                                name:"Smoking status (Packs/Year)",
                                rangeShrink: [0.5,0],
                              //  domain: [0,180],
                                label: "Packs/Year"
                              },
                              {
                                name:"Site",
                                rangeShrink: [0.3,0],
                                label: "Tumor Site"
                              },
                              {
                                name:"Tumor subsite (BOT/Tonsil/Soft Palate/Pharyngeal wall/GPS/NOS)",
                                rangeShrink: [0.6,0],
                                label: "Tumor Subsite"
                              },
                              {
                                name:"T-category",
                                rangeShrink: [0.4,0],
                                domain: ["Tis","T1","T2","T3","T4","Tx"],
                                label: "T-category"
                              },
                              {
                                name:"N-category",
                                rangeShrink: [0.5,0],
                                domain: ["N0","N1","N2","N3"],
                                label: "N-category"
                              },
                              {
                                name: "OS (Calculated)",
                                label: "OS",
                                rangeShrink: [0,1],
                                domain: [0,130]
                              }
                            ];

  App.models.patient=new PatientModel();
  App.models.applicationState = new ApplicationStateModel();

  App.controllers.patientSelector = new InputFillController();


  App.init=function() {
    App.models.patient.loadPatients().then(function(){

      App.controllers.patientSelector.populatePatientDropdown();
      App.controllers.patientSelector.selectPatient(".idSelect");
      App.views.nomogram = new NomogramView("#demoNomogram");
      App.controllers.nomogram = new NomogramOptions("#nomogramOptions");

    })
    .catch(function(err) {
              console.log("Promise Error", err);
          });

  };

})();
window.addEventListener("load",App.init,false);
