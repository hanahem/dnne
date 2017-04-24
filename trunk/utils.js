/**
 * outputCodeKeras : updates the code output ; function called by Keras button
 */
function outputCodeKeras() 
{
	var codeOutput = "#Keras: Model is not an MLP or code not updated";
	if (MLPCheck(myDiagram.model))
	{
		codeOutput = "";
		codeOutput += "#Keras code :\n\n";
		codeOutput += decoderKeras(myDiagram.model);
	}
	document.getElementById("codeOutput").value = codeOutput;
}

/**
 * outputCodeTflow : updates the code output; function called by Tflow button
 */    

function outputCodeTflow()
{
	var codeOutput = "#TensorFlow: Model is not an MLP or code not updated";
	if (MLPCheck(myDiagram.model))
	{
		codeOutput = "";
		codeOutput += "#TensorFlow code :\n\n";
		codeOutput += decoderTflow(myDiagram.model);
	}
	document.getElementById("codeOutput").value = codeOutput;
}

/**
 *Debug function simply replaces codeOutput with the model in JSON format
 */

function outputCodeDebug()
{
	var codeOutput = "//The following is the model as a JSON string for debugging\n\n";
	codeOutput += myDiagram.model.toJSON();
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
	var nodes = myDiagram.model.nodeDataArray;
	var posArrX = [];
	var posArrY = [];
	for(var i=0; i < nodes.length; i++)
	{
		var splitStr = nodes[i].loc.split(" ");
		posArrX.push(parseInt(splitStr[0], 10));
		posArrY.push(parseInt(splitStr[1], 10));
	}

	var newX = Math.max.apply(Math, posArrX) + 100;

	var newY = 0;
	for(i=0; i<posArrY.length; i++) newY += posArrY[i];
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
