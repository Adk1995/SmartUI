"use strict"

var App = {} || App;

let ApplicationStateModel = function() {
  let self = {
    numberOfNeighbors: 5,
    selectedPatientID: null,
    excludedAttributes: [],
    attributeFilters: {},
    selectedAttribute: null
  };

  function setNumberOfNeighbors(number) {
    self.numberOfNeighbors = numbers;
  }

  function getNumberOfNeighbors() {
    return self.numberOfNeighbors;
  }

  function setSelectedPatientID(subjectID) {
    self.selectedPatientID = subjectID;
  }

  function getSelectedPatientID() {
    return self.selectedPatientID;
  }

  return {
    setNumberOfNeighbors,
    getNumberOfNeighbors,
    setSelectedPatientID,
    getSelectedPatientID
  }
}
