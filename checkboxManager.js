//=================
// Checkboxes MAN
//=================

/**
 * this function checks the input element by ID
 */
function check(id) {
    document.getElementById(id).checked = true;
}

/**
 * this function unchecks the input elemnt by ID
 */
function uncheck(id) {
    document.getElementById(id).checked = false;
}

/**
 * this function takes as input the checked element an unchecks all the others
 */
function manageCheck(checkedId) {
  var x = document.getElementsByClassName("inCheck");
  var y = document.getElementsByClassName("outCheck");
  var i;
  for (i = 0; i < x.length; i++) {
      if(x[i].id != checkedId){
        uncheck(x[i].id);
      }
  }
  for (i = 0; i < y.length; i++) {
      if(y[i].id != checkedId){
        uncheck(y[i].id);
      }
  }
}

/**
 * this function checks whether a layer type is checked as input or not
 * in order to use addLayer() by choosing to add inservices or not
 */
function isInputLayer(id) {
  var x = document.getElementsByClassName("inCheck");
  var i;
  for (i = 0; i < x.length; i++) {
      var activation = x[i].id.slice(0, -1);
      if(activation == id && x[i].checked){
        return true;
      }
  }
  return false;
}

function isOutputLayer(id) {
  var x = document.getElementsByClassName("outCheck");
  var i;
  for (i = 0; i < x.length; i++) {
      var activation = x[i].id.slice(0, -1);
      if(activation == id && x[i].checked){
        return true;
      }
  }
  return false;
}
