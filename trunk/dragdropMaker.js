/**
 * This script contains the main functions to manage
 * the HTML drag and drop functionnality.
 * » for each layer type, there is a IMAGE tag in the index.html
 * when you drag any image, the html tag call one of the drop functions.
 * » each drop dunction calls the addLayer function with the needed parameters
 */
 
//static variable for hidden layers' keys
var lastKey = 3;

/**
 * addLayer: adds a layer w.r.t. the parameters
 * IN: all Strings: the layer name, the input size, the output size, its location, its activation function
 **/
function addLayer(layerName, input, output, activ) {
    var location = generateNewPosition();
    //alert(location);
    var elem = { key: lastKey, name: activ, inservices: [{ name: input }], outservices : [{ name: output}], loc: location, layer:layerName, inOut:2, color:"#549fff"  };
    myDiagram.model.addNodeData(elem);
    lastKey++;
    
}

//==================
//  DDROP FUNCTIONS
//==================
/**
 * this function takes an event as input and makes it droppable
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * this function allows dragging an element and saves its ID
 */
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

/**
 * this functions adds a layer w.r.t. the id's name, which is the activation type name
 */
function dropActivation(ev) {
  if(ev.dataTransfer.getData("text") == "sigmoid"){
    addLayer("Dense", "80", "18", "sigmoid");
  }
  if(ev.dataTransfer.getData("text") == "tanh"){
    addLayer("Dense", "80", "18", "tanh");
  }
  if(ev.dataTransfer.getData("text") == "softmax"){
    addLayer("Dense", "80", "18", "softmax");
  }
  if(ev.dataTransfer.getData("text") == "relu"){
    addLayer("Dense", "80", "18", "relu");
  }
  if(ev.dataTransfer.getData("text") == "softplus"){
    addLayer("Dense", "80", "18", "softplus");
  }
}
