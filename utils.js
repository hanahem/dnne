/**
 * addLayer : adds a layer (to test with a button)
 **/
//static variable for hidden layers' keys
var lastKey = 3;
function addLayer() {
    var n = "hello";
    var loca = "200 300";
    var elem = { key: lastKey, name: n, inservices: [{ name: "s1" }], outservices : [{ name: "o1"}], loc: loca };
    myDiagram.model.addNodeData(elem);
    lastKey++;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  addLayer();
}

/**
 * outputCode : updates the code output (to test with a button)
 */
function outputCode(){
  codeOutput = jsonToKeras(stackerMLP(myDiagram.model));
  document.getElementById("codeOutput").value = codeOutput;
}
    
    
/**
 * layerMaker: wraps around the data provided from a creation FORM
 * Input: type(string, defining the layer's name)
 *        nIn(int, number of input units to print on the Port)
 *        nOut(int, number of output units to print on the Port)
 *        link(boolean, link all units with previously made layers)
 * @return void : modifies the diagram view according to the FORM entries
 * adds NodeData to the model's nodeDataArray, and LinkData to the model's linkDataArray
 * TODO : Could be extended to the drag and drop modifications
 * TODO : test cases for the FORM input
 */ 
function layerMaker(type, nIn, nOut, link) {
  
}

/**
 * generateNewPosition: generates pseudo-random coordinates according to the former elements
 * @return string: a position string as follows "x y", 
 * where x is the next free coordinate square in the canvas
 * and y is the average of the other elements' y coordinate
 * TODO: test-cases
 */
function generateNewPosition() {
   
}

/**
 * zoom: a function that zooms/unzooms on the model, it should be binded with the zoom buttons
 * IN: value
 * @return void: linked with entries from a zoom slider
 */
function zoom(value) {
  
}

