// ------------------------------
// Coherence checker
// ------------------------------


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
		if (links[i].fromPort === "" || links[i].toPort === "")
		{
			alert("Some port fields are empty within the links, this might lead to incoherences in the code\n"+
				"Try fixing this by clicking on Ports, then refreshing the code output");
		}
		if (links[i].fromPort !== links[i].toPort) 
		{
			alert("Conflict at link " + i + "in linkDataArray"+ 
				"\nSee Debug (0 is first element in list) or click on Ports button"+
				"\nPlease resolve then refresh code output");
			return false;
		}
	}

	//check that input and output layers exist and are unique
	var eOut = false;
	var eIn = false;
	var outKey; //useful at the end
	var inKey;  //useful at the end
	
	for (i=0; i < nodes.length; i++)
	{
		if ((nodes[i].inOut === 2) && (eOut === true) ) {alert("Duplicate output layer"); return false;}
		if ((nodes[i].inOut === 2) && (eOut === false)) {eOut = true; outKey = nodes[i].key;}
		
		if ((nodes[i].inOut === 1) && (eIn === true) )  {alert("Duplicate input layer"); return false;}
		if ((nodes[i].inOut === 1) && (eIn === false))  {eIn  = true; inKey  = nodes[i].key;}
	}

	if(!(eOut && eIn)) 
	{
		alert("Missing input or output layer"+
			"\nSince these cannot be added, restart software or Undo previous commands"); 
		return false;
	}

	//check that all hidden layers are 1 in, 1 out, by checking the links array
	var linksTo = [];
	var linksFr = [];

	for (i=0; i < links.length; i++)
	{
		linksTo.push(links[i].to);
		linksFr.push(links[i].from);
	}

	for (i=0; i < links.length; i++)
	{
		for (var j=i+1; j < links.length; j++) //two by two comparison, any doubles signal an error
		{
			if (linksTo[i] === linksTo[j] || linksFr[i] === linksFr[j]) 
			{
				alert("Multiple links to, or from, a layer\nOnly MLP has been implemented");
				return false;
			}
		}
	}
	
	//check that there is a complete path from out to in and no path from out, no path to in
	//to avoid a while(true), we reason that the path is at most as big as the number of nodes. 

	if (linksFr.indexOf(outKey) !== -1) {alert("Output layer has outgoing link"); return false;}
	if (linksTo.indexOf(inKey)  !== -1) {alert("Input layer has incoming link"); return false;}

	var currNode = findInNodes(outKey, nodes); //backtrack from output layer

	for (i=0; i < nodes.length; i++)
	{
		var currKey = currNode.key;
		var pos = linksTo.indexOf(currKey);
		if (pos === -1)
		{
			alert("Broken path from Input layer to Output layer");
			return false;
		}
		var newKey = linksFr[pos];
		if (newKey === inKey) return true; //full path found
		else currNode = findInNodes(newKey, nodes);
	}
	alert("Unexpected error in MLPCheck");
	return false; 
}



// ------------------------------------
// 	Decoders
// ------------------------------------

//TODO: as of today, all decoders are only for MLP

/**
 * This script contains decoders for each target library
 * Each function decodes JSON dictionnaries stack from input, and
 * maps it into a list of strings formatted in the target library's syntax
 * The output list is a stack of command lines
 * TODO: test-cases to verify commands execution
 **/

/**
 * decoderKeras: transforms model to Keras syntax
 * IN: ANNmodel object
 * @return: stack list of strings (representing the command lines)
 * TODO: add architecture checking
 */
function decoderKeras(model)
{
	var code = "from keras.models import Sequential\n" +
			   "from keras.layers import Dense\n" +
			   "import numpy\n\n\n" +
			   "# creating the ANN model\n\n" +
			   "model = Sequential()\n\n";
  
	var nodes = model.nodeDataArray;
	var links = model.linkDataArray;

  	var inputLayer;
	var outputLayer;
	var hiddenLayers = [];
	
	for (var i=0; i < nodes.length; i++)
	{
		if 	    (nodes[i].inOut === 2) {outputLayer = nodes[i];}
		else if (nodes[i].inOut === 1) {inputLayer = nodes[i];}
		else                           {hiddenLayers.push(nodes[i]);}
	}

	var linksTo = [];
	var linksFr = [];
	for (i=0; i < links.length; i++)
	{
		linksTo.push(links[i].to);
		linksFr.push(links[i].from);
	}

	var sortedLayers = [];
	sortedLayers.push(inputLayer);

	for (i=0; i < hiddenLayers.length; i++) 
	{
		var currKey = sortedLayers[i].key;
		var pos = linksFr.indexOf(currKey);
		var newKey = linksTo[pos];
		if (newKey === outputLayer.key) break;
		var newLayer = findInNodes(newKey, hiddenLayers);
		sortedLayers.push(newLayer);
	}

	sortedLayers.push(outputLayer);
    console.log(sortedLayers);  

	for (i=0; i < sortedLayers.length-1; i++)
	{
		if (i===0)
		{
			code += "model.add(Dense(" + sortedLayers[i+1].inservices[0].name +
					", activation='" + sortedLayers[i+1].activation +
					"', input_shape=("+ sortedLayers[i].inservices[0].name + ",)))\n";
		}
		else
		{
			code += "model.add(Dense(units="+ sortedLayers[i+1].inservices[0].name+"))\n"+ 
					"model.add(Activation('"+ sortedLayers[i+1].activation +"'))\n"; 
		}
  	}

	code += "model.summary()"	

	return code;  
}

/**
 * decoderTflow: encodes model into Tensorflow syntax; only constructs computational graph
 * Supposes (in this version) that the model in input has already been validated as an MLP
 * Always use four spaces rather than a tab \t to be sure it works in python
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
		if      (nodes[i].inOut === 2) {outputLayer = nodes[i];}
		else if (nodes[i].inOut === 1) {inputLayer = nodes[i];}
		else                           {hiddenLayers.push(nodes[i]);}
	}
   
	
	var inputSizeStr = inputLayer.inservices[0].name;
	var outputSizeStr = outputLayer.inservices[0].name;

	code += "#placeholders act as a way to remember the size of the input value and the output value, respectively\n" +
			"x = tf.placeholder(tf.float32, shape=[None," + inputSizeStr + "])\n" +
			"y_ = tf.placeholder(tf.float32, shape=[None," + outputSizeStr + "])\n\n";
	
	var linksTo = [];
	var linksFr = [];
	for (i=0; i < links.length; i++)
	{
		linksTo.push(links[i].to);
		linksFr.push(links[i].from);
	}

	var sortedLayers = [];
	sortedLayers.push(inputLayer);

	for (i=0; i < hiddenLayers.length; i++) 
	{
		var currKey = sortedLayers[i].key;
		var pos = linksFr.indexOf(currKey);
		var newKey = linksTo[pos];
		if (newKey === outputLayer.key) break;
		var newLayer = findInNodes(newKey, hiddenLayers);
		sortedLayers.push(newLayer);
	}

	sortedLayers.push(outputLayer);
    console.log(sortedLayers);
 
	var neuronNbArr = []; //stocks the number of neurons per layer where index 0 is input layer
	for (i=0; i < sortedLayers.length; i++) 
    {
      console.log(sortedLayers[i].inservices[0].name);
      neuronNbArr.push(parseInt(sortedLayers[i].inservices[0].name, 10));
    }
    
    console.log(neuronNbArr + "   " + neuronNbArr.length);
	//making an index of weight matrices
	code += "#weights of synapses between each layer stocked as a matrix\nweights = {\n";
	for (i=0; i < neuronNbArr.length - 1; i++)
	{
		code += "    \'W" + i + "': tf.Variable(tf.random_normal([" +
				neuronNbArr[i] + "," + neuronNbArr[i+1]+ "]))";
		if (i !== neuronNbArr.length - 2) {code += ",\n";}
		else							  {code += "\n}\n\n";}
	}
			 
	//making an index of bias vectors
	code += "#biases of a neuron layer stocked as a vector\nbiases = {\n";
	for (i=1; i < neuronNbArr.length; i++)
	{
		code += "    \'b" + (i-1) + "': tf.Variable(tf.random_normal([" +
				neuronNbArr[i] + "]))";
		if (i !== neuronNbArr.length - 1) {code += ",\n";}
		else							  {code += "\n}\n\n";}
	}

	//constructing a function that will take both index and our placeholder x to give out the output of the network
	code += '"""\nWe make our graph into a function that takes placeholder, weights and biases as input.\n' +
			"The feedforward mechanism is classic: a layer is a vector, it passes through synapses by\n"+
			"being multiplied by the weight matrix. Once at the next layer, the corresponding bias vector\n"+
			"is added. Finally, the activation function is applied to each individual coordinate.\n" +
			'This repeats until the output layer is reached.\n"""\n\n' +
			"def multilayer_perceptron(x, weights, biases):\n";

	for (i=0; i < neuronNbArr.length-1; i++)
	{
		//shape
		code += "    layer_" + i + " = tf.add(tf.matmul(";
		if (i===0) {code += "x,";}
		else 	   {code += "layer_" + (i-1) + ",";}
		code += "weights['W" + i + "']), biases['b" + i + "'])\n";
		
		//activation, 0th is necessarily linear and ignored.
		if (sortedLayers[i+1].activation === "linear") continue; //This should send the value to the next tensor as is, just like "linear" in Keras
		code += "    layer_" + i + " = tf.nn." + sortedLayers[i+1].activation +
				"(layer_" + i + ")\n";
	}
	code += "    return layer_" + (i-1) + "\n\n"; //i-1 because it's i === neuronNbArr.length that breaks the loop


	code += "#Construction of the model\npred = multilayer_perceptron(x, weights, biases)\n\n";
	

    //TODO maybe provide a text framework for the with hyperparameters that are defined with "ENTER APPROPRIATE VALUE OF TYPE (#TYPE) HERE"; 
	code += "\"\"\"\nFollowing steps include:\n" +
			"1) Defining loss function and optimizer\n"+
			"2) Initializing global variables\n"+
			"3) Running the training session with appropriate hyperparameters and datasets\n" +
			"4) Testing the model and calculating its accuracy\n\"\"\"\n\n";		
	
	return code;
}
/**
 * decoderTheano: encodes JSON to Theano syntax
 * IN: model
 * @return: a long string (representing the command lines)
 */
function decoderTheano(model) {

}

/**
 * decoderTorch: transforms  to Torch syntax
 * IN: model object
 * @return: a long string (representing the command lines)
 */
function decoderTorch(model) {

}
