var App = App || {};

let NomogramOptions = function(targetID) {

  let self = {
    targetID: null,
    options: null
  }
  init();

  function init()
  {
    let selectedRadio;
    App.nomogramAxes.forEach(function(d){
      let radioButton = d3.select("#nomogramOptions").append("div")
      radioButton.append("input")
                  .attr("class","demoRadio")
                  .attr("type","radio")
                  .attr("name","toggleDemo")
                  .attr("value",d.label)
                  .attr("style","margin-left:30px; margin-right:15px;")
                  .on("change",function(d){
                    adjustAxes(this.value);
                  });
      radioButton.append("label").text(" - ");
      radioButton.append("input")
                  .attr("class","demoCheckbox")
                  .attr("type","checkbox")
                  .attr("name","filterDemo"+d.label)
                  .attr("value",d.label)
                  .attr("style","margin-left: 15px;margin-right:15px;")
                  .property("checked","true")
                  .on("change",function(d){
                    attributeFilter(this.name);
                  });
      radioButton.append("label").text(" "+d.label);

    });
  }

  function adjustAxes(axesSelected)
  {
    console.log(axesSelected);
  }
  function attributeFilter(filterAxes)
  {
    console.log(filterAxes);
  }
}
