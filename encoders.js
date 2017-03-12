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
  var outputLayer = {};
  
  //Find and assign input and output layers
  for each (var layer in nodes){
    if (layer.key == 1){
      inputLayer = layer;
    }
    else if (layer.key == 2){
      outputLayer = layer;
    }
  }
  var currentLayer = outputLayer;
  
  //Find and assign linkage containing output layer
  var outputLink = {}; //The Link containing the output layer
  for each (var link in links){
    if (link.to == 2){
      outputLink = link;
    }
  }
  var currentLink = outputLink;
  
  //Unpacking and stacking the MLP
  while (!currentLayer.key == 1){
    layerStack.push(currentLayer);
    newKey = currentLink.from;
    for each (var node in nodes){
      if (node.key == newKey){
        currentLayer = node;
        break;
      }
    }
  }//At the end of this while-loop, the layerStack should be filled with the layers
  
  //Popping the MLP and transforming it to code lines
  var codeStack = [];
  
  
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