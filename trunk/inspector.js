/**
 * This script contains the necessary functions for the Inspector element.
 * The Inspector element is a form that shows and allows modification on
 * a selcted object from the Diagram.
 */

//Inspiration taken from https://github.com/NorthwoodsSoftware/GoJS/blob/master/samples/arrowheads.html 
 
/**
 * this function takes an object (from the diagram: link or node ...)
 * and extracts its basic information, and returns it as a string
 * formatted like follows :
 * FOR A LINK: "link/from/fromPort/to/toPort"
 * FOR A NODE: "node/key/activation/inservices/outservices/layerType/color"
 * @return: a string formatted as shown above
 *
 * NB: It is also where the inspector handlers are bound to the DOM inspector elements
 */
function infoString(obj) 
{
	var part = obj.part;
	if (part instanceof go.Adornment) part = part.adornedPart;
	var msg = "";
	if (part instanceof go.Link) 
	{ //if the object to inspect is an instance of the Link class
		var link = part;
		msg = 
			"link/"+
			link.data.from+"/"+
			link.data.fromPort+"/"+
			link.data.to+"/"+
			link.data.toPort;
	} 
	else if (part instanceof go.Node) 
	{ //if the object to inspect is an instance of the Node class
		var node = part;
		var link = node.linksConnected.first();
		if (node.data.inOut === 2)
		{ 	//Case if output layer: only show inservices
			msg = 
				"node/"+
				node.data.key+"/"+
				node.data.name+"/"+
				node.data.inservices[0].name+"/"+
				"0/"+
				node.data.layer+"/"+
				node.data.color;
		}
		else
		{	//Case if hidden layer or input layer: show inservices & outservices
			msg = 
				"node/"+
				node.data.key+"/"+
				node.data.name+"/"+
				node.data.inservices[0].name+"/"+
				node.data.outservices[0].name+"/"+
				node.data.layer+"/"+
				node.data.color;
		}
	}

	//========================
	//INSPECTOR CHANGE HANDLERS
	//========================


	//ACTIVATION HANDLER
	$( "#inspectActiv" ).change(function() { //captures changes on the identified HTML tag
		console.log( "Handler for .change() called." + this.value + "  " + obj.part.data);
		myDiagram.model.startTransaction("activation");
		myDiagram.model.setDataProperty(obj.part.data, "activation", this.value); // Binds the new input value (this) with the selected GoJs object
		myDiagram.model.updateNames();
		myDiagram.model.commitTransaction("activation");
	});

	//INPUT SIZE HANDLER (NODE)
	$( "#inspectInput" ).change(function() { //captures changes on the identified HTML tag
		console.log( "Handler for .change() called." + this.value );
		myDiagram.model.startTransaction("inservices_input");
		console.log(obj.part.data);
		myDiagram.model.setDataProperty(obj.part.data.inservices[0], "name", this.value); // Binds the new input value (this) with the selected GoJs object
		myDiagram.model.updateNames();
		myDiagram.model.commitTransaction("inservices_input");
	});

	//OUTPUT SIZE HANDLER (NODE)
	$( "#inspectOutput" ).change(function() { //captures changes on the identified HTML tag
		console.log( "Handler for .change() called." + this.value );
		myDiagram.model.startTransaction("outservices_output");
		console.log(obj.part.data.outservices);
		myDiagram.model.setDataProperty(obj.part.data.outservices[0], "name", this.value); // Binds the new input value (this) with the selected GoJs object
		myDiagram.model.updateNames();
		myDiagram.model.commitTransaction("outservices_output");
	});
	
	//INSPECT COLOR HANDLER
	$( "#inspectColor" ).change(function() { //captures changes on the identified HTML tag
		console.log( "Handler for .change() called." + this.value );
		myDiagram.model.startTransaction("color");
		myDiagram.model.setDataProperty(obj.part.data, "color", this.value); // Binds the new input value (this) with the selected GoJs object
		myDiagram.model.commitTransaction("color");
	});
	
	return msg;
}
	

/**
 *ACTIVATION CANCELLER
This function prevents the editing of multiple values, however it refreshes the editor appropriately
 */
function canceller()
{
	$( "#inspectActiv" ).off("change");
	$( "#inspectInput" ).off("change");
	$( "#inspectOutput" ).off("change");
	$( "#inspectColor" ).off("change");
}

/**
 * This function, after taking the infoString(obj) from an object,
 * provides a way to visualize and modify each node or link on the diagram
 * It creates DOM elements (buttons, textfields ...) to make this possible
 * IN:  e: a GraphObject.click event handler to show arrowhead information
 *      obj: an object from the diagram (link or node)
 */

function editorHandler(e, obj) 
{
	canceller(); //called here to refresh at each new item selection, and not after each edit. 
	var msg = infoString(obj);
	if (msg) 
	{
		var objectType = msg.split("/")[0]; //splits the formatted string and takes the 1st element which is the object type (link or node)
		//======WHEN NODE=======
		if(objectType == "node") 
		{
			//Display only the Node Inspector DIV
			document.getElementById("inspectorNode").style.display = "block";
			document.getElementById("inspectorLink").style.display = "none";
			
			var node = msg.split("/"); //node here would be an array of this form ["node", key, activation, input, output, type, color]
			//GET ALL THE INPUT ELEMENTS
			var layerType = document.getElementById("inspectLayerType");
			var activation = document.getElementById("inspectActiv");
			var input = document.getElementById("inspectInput");
			var output = document.getElementById("inspectOutput");
			var color = document.getElementById("inspectColor");
			var key = document.getElementById("inspectKey");
			
			//ASSIGN EACH VALUE
			key.value = node[1];
			activation.value = node[2];
			input.value = node[3];
			output.value = node[4];
			layerType.value = node[5];
			color.value = node[6];
		}

		//======WHEN LINK=======
		else if(objectType == "link") 
		{
			//Display only the Link Inspector DIV
			document.getElementById("inspectorNode").style.display = "none";
			document.getElementById("inspectorLink").style.display = "block";
			
			var link = msg.split("/"); //link here would be an array of this form ["link", from, fromPort, to, toPort]
			//GET ALL THE INPUT ELEMENTS
			var from = document.getElementById("inspectorFrom");
			var to = document.getElementById("inspectorTo");
			var inSize = document.getElementById("inspectorInSize");
			var outSize = document.getElementById("inspectorOutSize");
			
			//ASSIGN EACH VALUE
			from.value = link[1];
			inSize.value = link[2];
			to.value = link[3];
			outSize.value = link[4];
		}

		else 
		{
			console.log("error on editorHandler");
		}

	}
}
