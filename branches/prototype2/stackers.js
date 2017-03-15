/**
 * This script contains functions that JSON-string dictionnaries
 * as inputs, and return an ordered stack of layers in a JSON dict.
 * format according to the choosen neural network architecture
 * TODO: add functions for other architectures
 */


/**
 * stackMLP: creates a layer of stacks in JSON-dict format for a MLP
 * the layer stack will be ordered according to the linkages
 * IN: the MLP model in its JSON format
 * @return: an array representing the stack of MLP layers 
 */
function stackerMLP(model) {
  //TODO: architecture checking as MLP
  
  //Extracting the nodes and links
  nodes = model.nodeDataArray;
  links = model.linkDataArray;

  layerStack = [];
  
  //Pushing the Output node (always has the key 2)
  layerStack.push(nodes[1]);
  currentKey = 2;
  
  //The stacker loope
  for (var i = 1; i < nodes.length; i++) {
    currentLayer = {};
    //find the previous key
    for (var j = 0; j < links.length; j++) {
      if (links[j].to == currentKey) {
        currentKey = links[j].from;
        break;
      }
    }

    //find the previous node
    for (var j = 0; j < nodes.length; j++) {
      if (nodes[j].key == currentKey) {
        currentLayer = nodes[j];
        break;
      }
    }

    layerStack.push(currentLayer);

  }

  console.log(layerStack);
  return layerStack;

}


/**
 * archiCheck: checks wherther the created model is coordinate
 * with the user's choice
 * @return: boolean TRUE if the chosen model is correct FALSE else
 */
function archiCheck(model) {

}