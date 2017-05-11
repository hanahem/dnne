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
function addLayer(layerName, input, output, activ, location) {
    //alert(location);
    var elem = { key: lastKey, name: "", activation: activ, inservices: [{ name: input }], outservices : [{ name: output}], loc: location, layer:layerName, inOut:0, color:"#549fff"  };
    myDiagram.model.addNodeData(elem);
  	myDiagram.model.updateNames();
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

  //solved location string with inspiration from https://github.com/NorthwoodsSoftware/GoJS/blob/master/samples/htmlDragDrop.html
  var canvas = event.target;
  var pixelratio = myDiagram.computePixelRatio();
  // if the target is not the canvas, we may have trouble, so just quit:
  if (!(canvas instanceof HTMLCanvasElement)) return;
  var bbox = canvas.getBoundingClientRect();
  var mx = event.clientX - bbox.left + myDiagram.viewportBounds.x; 
  var my = event.clientY - bbox.top + myDiagram.viewportBounds.y;
  /*alert("clientX = " + event.clientX + "\nclientY = " + event.clientY + 
		"\nbbw = " + bbw + "\nbbh = " + bbh + "\npixelratio = " + pixelratio +
		"\ncanvas.width = " + canvas.width + "\ncanvas.height = " + canvas.height +
		"\nbbox.left = " + bbox.left + "\nbbox.top = " + bbox.top +
		"\nmyDiagram.viewportBounds = " + myDiagram.viewportBounds);*/
  var loc = mx + " " + my;

  var defaultInput = "80";
  var defaultOutput = "80";

  if(ev.dataTransfer.getData("text") == "sigmoid"){
    addLayer("Dense", defaultInput, defaultOutput, "sigmoid", loc);
  }
  if(ev.dataTransfer.getData("text") == "tanh"){
    addLayer("Dense", defaultInput, defaultOutput, "tanh", loc);
  }
  if(ev.dataTransfer.getData("text") == "softmax"){
    addLayer("Dense", defaultInput, defaultOutput, "softmax", loc);
  }
  if(ev.dataTransfer.getData("text") == "relu"){
    addLayer("Dense", defaultInput, defaultOutput, "relu", loc);
  }
  if(ev.dataTransfer.getData("text") == "softplus"){
    addLayer("Dense", defaultInput, defaultOutput, "softplus", loc);
  }
}
