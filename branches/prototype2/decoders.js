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
  
}

/**
 * jsonToTflow: encodes JSON to Tensorflow syntax
 * IN: JSON-String model in stack
 * @return: stack list of strings (representing the command lines)
 */ 
function jsonToTflow(layerStack) {
  
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