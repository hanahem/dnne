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
 */
function jsonToKeras(layerStack) {
  //TODO: architecture checking (1st case : MLP)
  codeArray = [];
  codeArray[0] = "from keras.models import Sequential";
  codeArray[1] = "from keras.layers import Dense";
  codeArray[2] = "import numpy";
  codeArray[3] = "# create model";
  codeArray[4] = "model = Sequential()";

  //TODO: manage layers other than first, alone
  for (var i = 0; i < layerStack.length; i++) {
    codeLine = "";
    currentLayer = layerStack[i];
    codeLine = "model.add(" 
              + 'Dense' 
              + "(" + currentLayer.outservices[0].name 
              + ", activation = '"+
              currentLayer.name+
              "'))";
    codeArray[i+5] = codeLine;
  }

  console.log(codeArray);
  return codeArray;
  
}

/**
 * jsonToTflow: encodes JSON to Tensorflow syntax
 * IN: JSON-String model in stack
 * @return: stack list of strings (representing the command lines)
 */
function jsonToTflow(layerStack) {
	//TODO architecture check
	codeStrArr = [];
	codeStrArr[0] = "import tensorflow as tf\n";
	codeStrArr[1] = "sess = tf.InteractiveSession()";

	//TODO: manage layers other than first, alone
	for (var i = 0; i < layerStack.length; i++) {
		codeLine = "";
		currentLayer = layerStack[i];



		codeLine = "model.add(" 
							+ 'Dense' 
							+ "(" + currentLayer.outservices[0].name 
							+ ", activation = '"+
							currentLayer.name+
							"'))";
		codeArray[i+5] = codeLine;
	}

}

/**
 * jsonToTheano: encodes JSON to Theano syntax
 * IN: JSON-String model in stack
 * @return: stack list of strings (representing the command lines)
 */
function jsonToTheano(layerStack) {
	
}

/**
 * jsonToTorch: encodes JSON to Torch syntax
 * IN: JSON-String model in stack
 * @return: stack list of strings (representing the command lines)
 */
function jsonToTorch(layerStack) {

}
