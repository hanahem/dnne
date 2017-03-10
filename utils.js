/**
 * addLayer : adds a layer to test on a button
 **/
function addLayer() {
    var n = "hello";
    var loca = "200 300";
    var elem = { key: 3, name: n, inservices: [{ name: "s1" }, { name: "s2" }], loc: loca };
    myDiagram.model.addNodeData(elem);
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
 * zoom: a function that zooms/unzooms on the model
 * IN: value
 * @return void: linked with entries from a zoom slider
 */
function zoom(value) {
  
}

