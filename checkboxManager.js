/**
 * This script contains various functions managing the input and output layers' checkboxes
 */
//=================
// Checkboxes MAN
//=================

/**
 * this function checks the input elemnt by ID
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
  for (i = 0; i < x.length; i++) { //finds checked element in x, and uncheks all the others
      if(x[i].id != checkedId){
        uncheck(x[i].id);
      }
  }
  for (i = 0; i < y.length; i++) { //finds checked element in y, and uncheks all the others
      if(y[i].id != checkedId){
        uncheck(y[i].id);
      }
  }
}

//=========================
// Input or Output checking
//=========================
/**
 * this function checks whether a layer type is checked as input or not
 * in order to use addLayer() by choosing to add inservices or not
 * @return: boolean, true if id is an checked as input layer, false otherwise
 */
function isInputLayer(id) {
  var x = document.getElementsByClassName("inCheck");//selct all the elements that represent input checkboxes
  var i;
  for (i = 0; i < x.length; i++) { //loop to find if there's a checkbox with the activation name =to id, and if this element is checked
      var activation = x[i].id.slice(0, -1);
      if(activation == id && x[i].checked){
        return true;
      }
  }
  return false;
}

/**
 * this function checks whether a layer type is checked as output or not
 * in order to use addLayer() by choosing to add inservices or not
 * @return: boolean, true if id is an checked as output layer, false otherwise
 */
function isOutputLayer(id) {
  var x = document.getElementsByClassName("outCheck");//selct all the elements that represent output checkboxes
  var i;
  for (i = 0; i < x.length; i++){ //loop to find if there's a checkbox with the activation name =to id, and if this element is checked
      var activation = x[i].id.slice(0, -1);
      if(activation == id && x[i].checked){
        return true;
      }
  }
  return false;
}
