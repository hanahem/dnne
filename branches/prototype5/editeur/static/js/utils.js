/**
 * Updates the number inside the "Port" fields of the links so they are coherent with adjacent layers
 * In/outservices fields of nodes are always given priority over link fields
 * If the link data is empty or there is a conflict, the value of the "port" fields are taken from the adjacent layers
 * Otherwise, ie, the inservice/outservice fields of the nodes are empty, throws an exception (this shouldn't happen)
 * IN: the model
 * OUT: void (model is updated directly)
 * TODO: make an update ports button in index.html ? 
 */
function updatePorts()
{
	var nodes = myDiagram.model.nodeDataArray;
	var links = myDiagram.model.linkDataArray;

	for (var i=0; i < links.length; i++)
	{
		var inKey = links[i].from;
		var outKey = links[i].to;
		
		var inNode = findInNodes(inKey, nodes);
		var outNode = findInNodes(outKey, nodes);

		myDiagram.model.linkDataArray[i].fromPort = inNode.outservices[0].name; //TODO does this work, or should links[i] be replaced by model.linkDataArray[i] ?
		myDiagram.model.linkDataArray[i].toPort = outNode.inservices[0].name;		
	}
	for (var i=0; i < links.length; i++)
	{
		if (links[i].fromPort !== links[i].toPort) 
		{
			alert("Conflict at link " + i + "; no link should have toPort and fromPort fields with different values" + 
				"\nPlease resolve conflict by appropriately changing layer inservice and outservice fields to fix code output" +
				"\nPlease retry to update ports after this correction, as other mistakes may be found");
		}
	}
}



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
	var codeOutput = "//The following is the model as a JSON string for debugging purposes\n\n";
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
 * Returns the string for the node.name field in the model
 * This is important because the node.name field is what shows up on the UI shapes
 */
function getNodeInfoStr(key)
{
	var node = findInNodes(key, myDiagram.model.nodeDataArray);
	var str = "" + node.activation;
	if (node.inOut === 0) str += "\n\nHIDDEN: " 		 + node.inservices[0].name;
	if (node.inOut === 1) str += " (ignored)\n\nINPUT: " + node.inservices[0].name;
	if (node.inOut === 2) str += "\n\nOUTPUT: " 		 + node.inservices[0].name;
	else str += "\nNextExpected: " + node.outservices[0].name;
	return str;
}

/**
 * Finds a node in an array of nodes given its key
 * IN : a node array, a primary key
 * OUT : the corresponding node
 */
function findInNodes(key, nodeArr)
{
	for (var i=0; i < nodeArr.length; i++)
	{
		if (nodeArr[i].key === key) return nodeArr[i];
	}
	console.log("Inexistant node");
	return null;
}




/**
 * zoom: a function that zooms/unzooms on the model, it should be binded with the zoom buttons
 * IN: value
 * @return void: linked with entries from a zoom slider
 */
function zoom(value) {
  
}
