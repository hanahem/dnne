/**
 * This script contains functions that takes JSON-string dictionnaries
 * as inputs, and return an ordered stack of layers in a JSON dict.
 * format according to the choosen neural network architecture
 * !!! MLP doesn't have a stacker it is decoded directly in the decoder.js file (the decoderKeras function)
 * TODO: add functions for other architectures
 */


/**
 * stackerCNN: creates a layer of stacks in JSON-dict format for a CNN
 * the layer stack will be ordered according to the linkages
 * IN: the CNN model in its JSON format
 * @return: an array representing the stack of CNN layers 
 */
function stackerCNN(model) {

}

/**
 * stackerRNN: creates a layer of stacks in JSON-dict format for a RNN
 * the layer stack will be ordered according to the linkages
 * IN: the RNN model in its JSON format
 * @return: an array representing the stack of RNN layers 
 */
function stackerRNN(model){
  
}


/**
 * archiCheck: checks if the created model is coherent 
 * (only one output layer, and only one input layer)
 * so the wizard prints an error if not.
 * @return: boolean TRUE if the created model is correct FALSE else
 */
function archiCheck(model) {

}