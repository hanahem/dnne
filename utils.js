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
 * generateNewPosition: generates coordinates for a new layer according to the former elements in the model
 * Input : NDA(object, myDiagram.model.nodeDataArray)
 * @return string: a position string as follows "x y", 
 * where x is the next free coordinate square in the canvas
 * and y is the average of the other elements' y coordinate
 * TODO: test-cases
 */
function generateNewPosition(NDA) {
	var posXArr = [];
	var posYArr = [];
	for(var i=0; i < NDA.length; i++)
	{
		var splitStr = NDA[i].loc.split(" ");
		posArrX.add(parseInt(splitStr[0]));
		posArrY.add(parseInt(splitStr[1]));
	}

	var newX = Math.max.apply(Math, posArrX) + 100;

	var newY = 0;
	for(var i=0; i<posArrY.length; i++) newY += posArrY[i];
	newY /= posArrY.length;

	return newX + " " + newY;
}

/**
 * zoom: a function that zooms/unzooms on the model, it should be binded with the zoom buttons
 * IN: value
 * @return void: linked with entries from a zoom slider
 */
function zoom(value) {
  
}



