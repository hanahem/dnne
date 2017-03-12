/**
 * This document contains encoders for each target library
 * Each function encodes the JSON-String input, and
 * maps it into a list of strings formatted in the target library's syntax
 * The output list is a stack of command lines
 * TODO: test-cases to verify commands execution
 **/

/**
 * jsonToKeras: encodes JSON to Keras syntax
 * IN: JSON-String model
 * @return: stack list of strings (representing the command lines)
 */ 
function jsonToKeras(jsonModel) {
  //TODO: architecture checking (1st case : MLP)
  //================
  //   Variables
  //================
  var layerStack = [];
  var nodes = jsonModel.nodeDataArray;
  var links = jsonModel.linkDataArray;
  var inputLayer = {};
  var outputLayer = {}
  
  for each (var layer in nodes){ //for loop to find and assign input and output layers
    if (layer.key == 1){
      inputLayer = layer;
    }
    else if (layer.key == 2){
      outputLayer = layer;
    }
  }
  
  var currentLayer = outputLayer;
  
}

/**
 * jsonToTflow: encodes JSON to Tensorflow syntax
 * IN: JSON-String model
 * @return: stack list of strings (representing the command lines)
 */ 
function jsonToTflow(jsonModel) {
  
}

/**
 * jsonToTheano: encodes JSON to Theano syntax
 * IN: JSON-String model
 * @return: stack list of strings (representing the command lines)
 */ 
function jsonToTheano(jsonModel) {
  
}

/**
 * jsonToTorch: encodes JSON to Torch syntax
 * IN: JSON-String model
 * @return: stack list of strings (representing the command lines)
 */ 
function jsonToTorch(jsonModel) {
  
}