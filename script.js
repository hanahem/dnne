/**
 * This script contains the init() function
 * The function sets up the initial model and diagram configurations
 * » it sets up the shapes
 * » the nodes and links
 * » the model & diagram
 * » the grid
 * It also manages monitoring the model through a JSON String dictionnary
 */ 
function init() {
	if (window.goSamples) goSamples();	// init for these samples -- you don't need to call this
	var $ = go.GraphObject.make;
	
	//===========================
	//	Creating the diagram
	//===========================
	
	myDiagram =
		$(go.Diagram, "myDiagramDiv", //The div's name to bind the diagram with
			{
				initialContentAlignment: go.Spot.Center,
				// For this sample, automatically show the state of the diagram's model on the page
				"ModelChanged": function(e) {
					if (e.isTransactionFinished) showModel();
				},
				"undoManager.isEnabled": true
			}
		);

	var UnselectedBrush = "#0d75fb";	// item appearance, if not "selected"
	var SelectedBrush = "#ff447f";	 // item appearance, if "selected"
	
	
	//==========================
	//Adding node template: Spot
	//==========================
		
	//TODO: modify this variable into a function that maps the colors w.r.t. the layer name
	//var color = "grey";
	
	myDiagram.nodeTemplate =
		$(go.Node, "Spot",
			{ selectionAdorned: false },
			{ locationSpot: go.Spot.Center, locationObjectName: "BODY" },
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			$(go.Panel, "Auto",
				{ name: "BODY" },
				$(go.Shape, "RoundedRectangle",
					{ 
						stroke: "grey", strokeWidth: 2, fill: "lightBlue", portId: "", cursor: "pointer",
						// the Shape is the port, not the whole Node
						// allow all kinds of links from and to this port
						fromLinkable: true, fromLinkableSelfNode: false, fromLinkableDuplicates: true,
						toLinkable: true, toLinkableSelfNode: false, toLinkableDuplicates: true 
					},
					new go.Binding("stroke", "isSelected", function(b) { return b ? SelectedBrush : UnselectedBrush; }).ofObject(),
					new go.Binding("fill", "color")),
					//Inspiration from https://github.com/NorthwoodsSoftware/GoJS/blob/master/samples/arrowheads.html
					{
						click: editorHandler,	// defined in inspector.js
						toolTip:	// define a tooltip for each link that displays its information
						$(go.Adornment, "Auto",
							$(go.Shape, { fill: "#EFEFCC" }),
							$(go.TextBlock, 
								{ margin: 4 },
								new go.Binding("text", "", infoString).ofObject()
							)
						)
					},
					
				$(go.Panel, "Vertical",
					{ margin: 6 },
					$(go.TextBlock,
						new go.Binding("text", "name"),
						{ alignment: go.Spot.Left }
					),
					$(go.Picture, "image", //add a "layer" image
						{ width: 10, height: 50, margin: new go.Margin(0, 0) }
					)
				)
			)
		);
	
	//==========================
	//	Adding link template
	//==========================
	
	myDiagram.linkTemplate =
		$(go.Link,
			{ routing: go.Link.Orthogonal, corner: 10, toShortLength: -3 },
			{ relinkableFrom: true, relinkableTo: true, reshapable: true, resegmentable: true },
			$(go.Shape, { stroke: "gray", strokeWidth: 2.5 },
			new go.Binding("strokeWidth", "size")),
			$(go.Shape,
				{ toArrow: "Standard", stroke: null }
				),
			{
				click: editorHandler,
				toolTip:	// define a tooltip for each link that displays its information
						$(go.Adornment, "Auto",
							$(go.Shape, { fill: "#EFEFCC" }),
							$(go.TextBlock, { margin: 4 },
								new go.Binding("text", "", infoString).ofObject())
						)
			}
		);
		
	

	//=========================
	// All the command handlers
	//=========================
	
	// Override the standard CommandHandler deleteSelection and canDeleteSelection behavior.
	// If there are any selected items, delete them instead of deleting any selected nodes or links.
	myDiagram.commandHandler.canDeleteSelection = function() 
	{
		return go.CommandHandler.prototype.canDeleteSelection.call(myDiagram.commandHandler);
	};
	myDiagram.commandHandler.deleteSelection = function() 
	{
		//console.log(myDiagram.model);
		//console.log(this);
		go.CommandHandler.prototype.deleteSelection.call(myDiagram.commandHandler);
	};
	
	//======================
	// Creating the model
	//======================
	//the inOut property is set to 0 1 or 2 to say respectively : hidden layer, input layer or output layer
	myDiagram.model =
		$(go.GraphLinksModel,
			{
				copiesArrays: true,
				copiesArrayObjects: true,
				linkFromPortIdProperty: "fromPort",
				linkToPortIdProperty: "toPort",
				nodeDataArray: 
				[
					{ 	key: 1, 
						name: "if this is displayed, updating the view at startup failed", 
						activation: "linear", //this is always linear (identity) and ignored. Changing it will not change the output
						inservices: [{ name: "1000"}], 
						outservices: [{name: "500"}], 
						loc: "0 0", 
						layer:"Dense", 
						inOut:1, 
						color:"#b3ff6f" 
					},
					{ 	key: 2, 
						name: "", 
						activation: "tanh", 
						inservices: [{ name: "500" }],	
						outservices: [{name: "300"}], 
						loc: "230 60", 
						layer:"Dense", 
						inOut:0, 
						color:"#549fff"
					},
					{ 
						key: 3, 
						name: "", 
						activation: "relu", 
						inservices: [{ name: "300" }],	
						outservices: [{name: "10"}], 
						loc: "400 100", 
						layer:"Dense", 
						inOut:0, 
						color:"#549fff" 
					},
					{ 
						key: 4, 
						name: "", 
						activation: "softmax", 
						inservices: [{ name: "10" }], 
						outservices: [{name: "0"}], //this should always be 0/readonly, and is ignored, as inOut 2 means outputlayer.
						loc: "600 50", 
						layer:"Dense", 
						inOut:2, 
						color:"#b3ff6f" 
					}
				],
				linkDataArray: 
				[
					{ 
						from: 1, 
						fromPort: "500", 
						to: 2, 
						toPort: "500" 
					},
					{ 
						from: 2, 
						fromPort: "300", 
						to: 3, 
						toPort: "300" 
					},
					{ 
						from: 3, 
						fromPort: "10", 
						to: 4, 
						toPort: "10" 
					},
				]
			}
		);
		
	//calls the getNodeInfoStr functions appropriately to update all node.name fields
	myDiagram.model.updateNames = function()
	{
		// all model changes should happen in a transaction (GoJS)
		var model = myDiagram.model;
		model.startTransaction("nameUpdate");
		for (var i=0; i < this.nodeDataArray.length; i++)
		{
			var data = model.nodeDataArray[i];
				model.setDataProperty(data, "name", getNodeInfoStr(data.key));
		}
		model.commitTransaction("nameUpdate");
	}

	myDiagram.model.updateNames();
		
	//=========================
	//	 Creating the Grid
	//=========================
		
	myDiagram.grid.visible = true;
	myDiagram.grid.gridCellSize = new go.Size(30, 30);
	myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;
	myDiagram.toolManager.resizingTool.isGridSnapEnabled = true;

	myDiagram.initialContentAlignment = go.Spot.Center;
		
	//=========================
	//	monitoring the model
	//=========================
	
	showModel();
		
	function showModel() 
	{
		document.getElementById("mySavedModel").value = myDiagram.model.toJson();
	}
		
	function getModel()
	{
		return myDiagram.model.toJson();
	}
		
}
