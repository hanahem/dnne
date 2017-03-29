/**
 * This script contains the necessary functions for the Inspector element.
 * The Inspector element is a form that shows and allows modification on
 * a selcted object from the Diagram.
 */
 
 
/**
 * this function takes an object (from the diagram: link or node ...)
 * and extracts its basic information, and returns it as a string
 * formatted like follows :
 * FOR A LINK: "link/from/fromPort/to/toPort"
 * FOR A NODE: "node/key/activation/input/output/layerType/color"
 * @return: a string formatted as shown above
 */
function infoString(obj) {
  var part = obj.part;
  if (part instanceof go.Adornment) part = part.adornedPart;
  var msg = "";
  if (part instanceof go.Link) { //if the object to inspect is an instance of the Link class
    var link = part;
    msg = "link/"+link.data.from+"/"+link.data.fromPort+"/"+link.data.to+"/"+link.data.toPort;
  } else if (part instanceof go.Node) { //if the object to inspect is an instance of the Node class
    var node = part;
    var link = node.linksConnected.first();
    if(node.data.inOut == 2){//Case if output layer only show inservices
      msg = "node/"+node.data.key+"/"+node.data.name+"/"+node.data.inservices[0].name+"/NONE/"+node.data.layer+"/"+node.data.color;
    }
    else if(node.data.inOut == 1){//Case if input layer onlyshow outservices
      msg = "node/"+node.data.key+"/"+node.data.name+"/NONE/"+node.data.outservices[0].name+"/"+node.data.layer+"/"+node.data.color;
    }
    else{//Case if hidden layer show inservices & outservices
      msg = "node/"+node.data.key+"/"+node.data.name+"/"+node.data.inservices[0].name+"/"+node.data.outservices[0].name+"/"+node.data.layer+"/"+node.data.color;
    }
  }
  return msg;
  }
  

/**
 * This functions, after taking the infoString(obj) from an object,
 * it provides a way to visualize and modify each node or link on the diagram
 * It creates DOM elements (buttons, textfields ...) to make this possible
 * IN:  e: a GraphObject.click event handler to show arrowhead information
 *      obj: an object from the diagram (link or node)
 */
function showArrowInfo(e, obj) {
  var msg = infoString(obj);
  if (msg) {
    var objectType = msg.split("/")[0]; //splits the formatted string and takes the 1st element which is the object type (link or node)
    //======WHEN NODE=======
    if(objectType == "node") {
      var node = msg.split("/"); //node here would be an array of this form ["node", key, activation, input, output, type, color]
      //GET ALL THE INPUT ELEMENTS
      var layerType = document.getElementById("inspectLayerType");
      var activation = document.getElementById("inspectActiv");
      var input = document.getElementById("inspectInput");
      var output = document.getElementById("inspectOutput");
      var color = document.getElementById("inspectColor");
      var key = document.getElementById("inspectKey");
      
      //ASSIGN EACH VALUE
      layerType.value = node[5];
      activation.value = node[2];
      input.value = node[3];
      output.value = node[4];
      color.value = node[6];
      key.value = node[1];
    }
    //======WHEN LINK=======
    else if(objectType == "link") {
      var link = msg.split("/"); //link here would be an array of this form ["link", from, fromPort, to, toPort]
    }
  }
}

function visibChange() {
  var ins1 = document.getElementById("inspectorNode");
  var ins2 = document.getElementById("inspectorLink");
  ins1.style.display = "none";
  ins2.style.display = "block";
}

//====================
//  CHANGE HANDLER
//====================

$( "#someInput" ).change(function() {
  //alert( "Handler for .change() called." + this.value );
});

