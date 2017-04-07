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
    code += " model.add(Dense(units="+ currNode.inservices[0].name+"))\
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
 * jsonToTflow: encodes JSON to Tensorflow syntax
 * IN: JSON-String model in stack
 * @return: stack list of strings (representing the command lines)
 */
function decoderTflow(layerStack) {

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