// ------------------------------
// Coherence checker
// ------------------------------


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
 * Updates the number inside the "Port" fields of the links so they are coherent with adjacent layers
 * In/outservices fields of nodes are always given priority over link fields
 * If the link data is empty or there is a conflict, the value of the "port" fields are taken from the adjacent layers
 * Otherwise, ie, the inservice/outservice fields of the nodes are empty, throws an exception (this shouldn't happen)
 * IN: the model
 * OUT: void (model is updated directly)
 */
function updatePorts(model)
{
	var nodes = model.nodeDataArray;
	var links = model.linkDataArray;

	for (var i=0; i < links.length; i++)
	{
		var inKey = links[i].from;
		var outKey = links[i].to;
		
		var inNode = findInNodes(inKey, nodes);
		var outNode = findInNodes(outKey, nodes);

		links[i].fromPort = inNode.outservices.name; //TODO does this work, or should links[i] be replaced by model.linkDataArray[i] ?
		links[i].toPort = outNode.inservices.name;		
	}
	for (var i=0; i < links.length; i++)
	{
		if (links[i].fromPort !== links[i].toPort) 
		{
			alert("Conflict at link " + i + "; no link should have toPort and fromPort fields with different values" + 
				"\nPlease resolve conflict by approriately changing layer inservice and outservice fields to fix code output");
		}
	}
}


/**
 * MultiLayer Perceptron coherence checker
 * Supposes all link ports are up to date and coherent
 * IN: our JSON Model
 * OUT: true if the model is an adequate MLP, false if it isn't
 */

function MLPCheck(model)
{
	var nodes = model.nodeDataArray;
	var links = model.linkDataArray;

	//check for conflict in links
	for (var i=0; i < links.length; i++)
	{
		if (links[i].fromPort !== links[i].toPort) 
		{
			alert("Conflict at link " + i + 
				"\nPlease resolve to fix code output");
		}
	}

	//check that input and output layers exist and are unique
	var eOut = false;
	var eIn = false;
	var outKey; //useful at the end
	var inKey;  //useful at the end
	
	for (var i=0; i < nodes.length; i++)
	{
		if ((nodes[i].inOut === 2) && (eOut = true) ) {alert("Duplicate output layer"); return false;}
		if ((nodes[i].inOut === 2) && (eOut = false)) {eOut = true; outKey = nodes[i].key;}
		
		if ((nodes[i].inOut === 1) && (eIn = true) )  {alert("Duplicate input layer"); return false;}
		if ((nodes[i].inOut === 1) && (eIn = false))  {eIn = true;	inKey = nodes[i].key;}
	}

	if(!(eOut && eIn)) {alert("Missing input or output layer"); return false;}

	//check that all hidden layers are 1 in, 1 out, by checking the links array
	var linksTo = [];
	var linksFr = [];

	for (var i=0; i < links.length; i++)
	{
		linksTo.push(links[i].to);
		linksFr.push(links[i].from);
	}

	for (var i=0; i < links.length; i++)
	{
		for (var j=i+1; j < links.length; j++) //two by two comparison, any doubles signal an error
		{
			if (linksTo[i] === linksTo[j] || linksFr[i] === linksFr[j]) 
			{
				alert("Multiple links to, or from, a layer");
				return false;
			}
		}
	}
	
	//check that there is a complete path from out to in and no path from out, no path to in
	//to avoid a while(true), we reason that the path is at most as big as the number of nodes. 

	if (linksFr.indexOf(outKey) !== -1) {alert("Output layer has outgoing link"); return false;}
	if (linksTo.indexOf(inKey)  !== -1) {alert("Input layer has incoming link"); return false;}

	var currNode = findInNodes(outKey, nodes); //backtrack from output layer

	for (var i=0; i < nodes.length; i++)
	{
		var currKey = currNode.key;
		var pos = linksTo.indexOf(currKey);
		var newKey = linksFr[pos];
		if (newKey === inKey) return true; //full path found
		else currNode = findInNodes(newKey, nodes);
	}
	alert("No path found from Input layer to Output layer");
	return false; 
}



// ------------------------------------
// 	Decoders
// ------------------------------------

/**
 * This script contains decoders for each target library
 * Each function decodes JSON dictionnaries stack from input, and
 * maps it into a list of strings formatted in the target library's syntax
 * The output list is a stack of command lines
 * TODO: test-cases to verify commands execution
 **/

/**
 * jsonToKeras: encodes JSON to Keras syntax
 * IN: JSON-String model in stack
 * @return: stack list of strings (representing the command lines)
 * TODO: add architecture checking
 */
function decoderKeras(model){
  var code = "\
 from keras.models import Sequential\n \
from keras.layers import Dense\n \
import numpy\n \
# create model\n \
model = Sequential() \n";
  
  var nodes = model.nodeDataArray;
  var links = model.linkDataArray;
  
  for(var i=0; i<links.length; i++){
    var currKey = links[i].from;
    var foundKey = 0;
    var currNode = {};
    //Look for node for key == FROM
    for (var j=0; nodes.length; j++){
      if(nodes[j].key == currKey){
        currNode = nodes[j];
        console.log(currNode);
        break;
      }
    }
    code += " model.add(Dense(units="+ currNode.outservices[0].name+"))\
\n model.add(Activation('"+ currNode.name +"'))\n"; 
  }
  //Look for node with key == TO
  var currKeyTo = links[i-1].to;
  var currNodeTo = {};
  for (var k=0; nodes.length; k++){
      if(nodes[k].key == currKeyTo){
        currNodeTo = nodes[k];
        break;
      }
  }
  code += " model.add(Dense(units="+ currNodeTo.inservices[0].name +"))\
\n model.add(Activation('"+ currNodeTo.name +"'))";
  
  return code;
  
}

/**
 * decoderTflow: encodes model into Tensorflow syntax; only constructs computational graph
 * Supposes (in this version) that the model in input has been validated as an MLP
 * IN: model for ANN graph
 * OUT: A single string containing the TF code of the ANN graph; training and usage are TODO in future versions
 */
function decoderTflow(model) 
{
	var code = "import tensorflow as tf\n\n";

 	var nodes = model.nodeDataArray;
	var links = model.linkDataArray;

	var inputLayer;
	var outputLayer;
	var hiddenLayers = [];
	
	for (var i=0; i < nodes.length; i++)
	{
		if 		(nodes[i].inOut === 2) outputLayer = nodes[i];
		else if (nodes[i].inOut === 1) inputLayer = nodes[i];
		else 						   hiddenLayers.push(nodes[i]);
	}

	var inputSizeStr = inputLayer.inservices[0].name;
	var outputSizeStr = outputLayer.inservices[0].name;

	code += "#placeholders act as a way to remember the size of the input value and the output value, respectively\n" +
			 "x = tf.placeholder(tf.float32, shape=[None," + inputSizeStr + "]) \n" +
			 "y_ = tf.placeholder(tf.float32, shape=[None," + outputSizeStr + "]) \n\n\n";

	var linksTo = [];
	var linksFr = [];
	for (var i=0; i < links.length; i++)
	{
		linksTo.push(links[i].to);
		linksFr.push(links[i].from);
	}

	var sortedLayers = [];
	sortedLayers.push(inputLayer);

	for (var i=0; i < hiddenLayers.length; i++) 
	{
		var currKey = sortedLayers[i].key;
		var pos = linksFr.indexOf(currKey);
		var newKey = linksTo[pos];
		if (newKey === outputLayer.key) break;
		var newLayer = findInNodes(newKey, hiddenLayers);
		sortedLayers.push(newLayer);
	}

	sortedLayers.push(outputLayer);
	
	var neuronNbArr = []; //stocks the number of neurons per layer where index 0 is input layer
	for (var i=0; i < sortedLayers.length; i++) neuronNbArr.push(parseInt(sortedLayers[i].inservices[0].name, 10));

	//making an index of weight matrices
	code += "#weights of synapses between each layer stocked as a matrix\nweights = {\n";
	for (var i=0; i < neuronNbArr.length - 1; i++)
	{
		code += "\t'W" + i + "': tf .Variable(tf.random_normal([" +
				neuronNbArr[i] + "," + neuronNbArr[i+1]+ "]))";
		if (i !== neuronNbArr.length - 2) {code += ",\n";}
		else							  {code += "\n}\n\n";}
	}
			 
	//making an index of bias vectors
	code += "#biases of a neuron layer stocked as a vector\nbiases = {\n";
	for (var i=1; i < neuronNbArr.length; i++)
	{
		code += "\t'b" + (i-1) + "': tf .Variable(tf.random_normal([" +
				neuronNbArr[i] + "]))";
		if (i !== neuronNbArr.length - 1) {code += ",\n";}
		else							  {code += "\n}\n\n";}
	}

	//constructing a function that will take both index and our placeholder x to give out the output of the network
	code += "\"\"\"\nWe make our graph into a function that takes placeholder, weights and biases as input.\n" +
			"The feedforward mechanism is classic: a layer is a vector, it passes through synapses by\n"+
			"being multiplied by the weight matrix. Once at the next layer, the corresponding bias vector\n"+
			"is added. Finally, the activation function is applied to each invidual coordinate.\n" +
			"This repeats until the output layer is reached.\n\"\"\"\n\n" +
			"def multilayer_perceptron(x, weights, biases):";

	for (var i=0; i < neuronNbArr.length-1; i++)
	{
		//shape
		code += "\tlayer_" + i + " = tf.add(tf.matmul(";
		if (i===0) code += "x,";
		else 	   code += "layer_" + (i-1) + ",";
		code += "weights['W" + i + "']), biases['b" + i + "']) \n";
		
		//activation
		//TODO, should the user be recommended to have the output layer be of linear activation ?
		code += "\tlayer_" + i + " = tf.nn." + sortedLayers[i].name +
				"(layer_" + i + ")\n";
	}
	code += "\treturn layer_" + (i-1) + "\n\n"; //i-1 because it's i === neuronNbArr.length that breaks the loop


	code += "#Construction of the model\npred = multilayer_perceptron(x, weights, biases)\n\n";
	
	code += "\"\"\"\nFollowing steps include:\n" +
			"1) Defining loss function and optimizer\n"+
			"2) Initializing global variables\n"+
			"3) Running the training session with appropriate hyperparameters and datasets\n" +
			"4) Testing the model and calculating its accuracy\n\"\"\"\n\n";		
	
	/*
	code += "init = tf.global_variables_initializer()\n";
	code += "with tf.Session() as sess:\n\tsess.run(init)\n";
	*/

	return code;
}

/**
 * jsonToTheano: encodes JSON to Theano syntax
 * IN: JSON-String model in stack
 * @return: stack list of strings (representing the command lines)
 */
function decoderTheano(layerStack) {

}

/**
 * jsonToTorch: encodes JSON to Torch syntax
 * IN: JSON-String model in stack
 * @return: stack list of strings (representing the command lines)
 */
function decoderTorch(layerStack) {

}