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
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;
    
    //===========================
    //  Creating the diagram
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
        });

    var UnselectedBrush = "#0d75fb";  // item appearance, if not "selected"
    var SelectedBrush = "#ff447f";   // item appearance, if "selected"
    
    
    //==========================
    //Item Template:Shape
    //==========================
    
    /*function makeItemTemplate(leftside) {
      return $(go.Panel, "Auto",
          { margin: new go.Margin(1, 0) },  // some space between ports
          $(go.Shape,
            {
              name: "SHAPE",
              fill: UnselectedBrush, stroke: "gray",
              geometryString: "F1 m 0,0 l 5,0 1,0 -1,0 -5,0 1,-2 -1,0 z",
              spot1: new go.Spot(0, 0, 5, 1),  // keep the text inside the shape
              spot2: new go.Spot(1, 1, -5, 0),
              // some port-related properties
              toSpot: go.Spot.Left,
              toLinkable: leftside,
              fromSpot: go.Spot.Right,
              fromLinkable: !leftside,
              cursor: "pointer"
            },
            new go.Binding("portId", "name")),
          $(go.TextBlock,
            new go.Binding("text", "name"),
            { // allow the user to select items -- the background color indicates whether "selected"
              isActionable: true,
              //?? maybe this should be more sophisticated than simple toggling of selection
              click: function(e, tb) {
                var shape = tb.panel.findObject("SHAPE");
                if (shape !== null) {
                  // don't record item selection changes
                  var oldskips = shape.diagram.skipsUndoManager;
                  shape.diagram.skipsUndoManager = true;
                  // toggle the Shape.fill
                  if (shape.fill === UnselectedBrush) {
                    shape.fill = SelectedBrush;
                  } else {
                    shape.fill = UnselectedBrush;
                  }
                  shape.diagram.skipsUndoManager = oldskips;
                }
              }
            })
        );*/
    //}
    
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
            { stroke: "grey", strokeWidth: 2, fill: "lightBlue", portId: "", cursor: "pointer",
            // the Shape is the port, not the whole Node
            // allow all kinds of links from and to this port
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true },
            new go.Binding("stroke", "isSelected", function(b) { return b ? SelectedBrush : UnselectedBrush; }).ofObject(),
            new go.Binding("fill", "color")),
            {click: showArrowInfo,  // defined in utils.js
            toolTip:  // define a tooltip for each link that displays its information
              $(go.Adornment, "Auto",
                $(go.Shape, { fill: "#EFEFCC" }),
                $(go.TextBlock, { margin: 4 },
                  new go.Binding("text", "", infoString).ofObject())
            )},
            
          $(go.Panel, "Vertical",
            { margin: 6 },
            $(go.TextBlock,
              new go.Binding("text", "name"),
              { alignment: go.Spot.Left }),
            $(go.Picture, "image", //add a "layer" image
              { width: 10, height: 50, margin: new go.Margin(0, 0) })
          )
        )/*,
        $(go.Panel, "Vertical",
          { name: "LEFTPORTS", alignment: new go.Spot(0, 0.5, 0, 7) },
          new go.Binding("itemArray", "inservices"),
          { itemTemplate: makeItemTemplate(true) }
        ),
        $(go.Panel, "Vertical",
          { name: "RIGHTPORTS", alignment: new go.Spot(1, 0.5, 0, 7) },
          new go.Binding("itemArray", "outservices"),
          { itemTemplate: makeItemTemplate(false) }
        )*/
      );
    
    //==========================
    //  Adding link template
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
          click: showArrowInfo,
          toolTip:  // define a tooltip for each link that displays its information
              $(go.Adornment, "Auto",
                $(go.Shape, { fill: "#EFEFCC" }),
                $(go.TextBlock, { margin: 4 },
                  new go.Binding("text", "", infoString).ofObject())
              )
        }
      );
      
    
    //=========================
    //   Selection handler
    //=========================

    function findAllSelectedItems() {
      var items = [];
      for (var nit = myDiagram.nodes; nit.next(); ) {
        var node = nit.value;
        //?? Maybe this should only return selected items that are within selected Nodes
        //if (!node.isSelected) continue;
        var table = node.findObject("LEFTPORTS");
        if (table !== null) {
          for (var iit = table.elements; iit.next(); ) {
            var itempanel = iit.value;
            var shape = itempanel.findObject("SHAPE");
            if (shape !== null && shape.fill === SelectedBrush) items.push(itempanel);
          }
        }
        table = node.findObject("RIGHTPORTS");
        if (table !== null) {
          for (var iit = table.elements; iit.next(); ) {
            var itempanel = iit.value;
            var shape = itempanel.findObject("SHAPE");
            if (shape !== null && shape.fill === SelectedBrush) items.push(itempanel);
          }
        }
      }
      return items;
    }


    //=========================
    // All the command handlers
    //=========================
    
    // Override the standard CommandHandler deleteSelection and canDeleteSelection behavior.
    // If there are any selected items, delete them instead of deleting any selected nodes or links.

    myDiagram.commandHandler.canDeleteSelection = function() {
      // true if there are any selected deletable nodes or links,
      // or if there are any selected items within nodes
      return go.CommandHandler.prototype.canDeleteSelection.call(myDiagram.commandHandler) ||
               findAllSelectedItems().length > 0;
    };

    myDiagram.commandHandler.deleteSelection = function() {
      var items = findAllSelectedItems();
      if (items.length > 0) {  // if there are any selected items, delete them
        myDiagram.startTransaction("delete items");
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var nodedata = item.part.data;
          var itemdata = item.data;
          // find the item array that the item data is in; try "inservices" first
          var itemarray = nodedata.inservices;
          var itemindex = itemarray.indexOf(itemdata);
          if (itemindex < 0) {  // otherwise try "outservices"
            itemarray = nodedata.outservices;
            itemindex = itemarray.indexOf(itemdata);
          }
          if (itemindex >= 0) {
            myDiagram.model.removeArrayItem(itemarray, itemindex);
          }
        }
        myDiagram.commitTransaction("delete items");
      } else {  // otherwise just delete nodes and/or links, as usual
        go.CommandHandler.prototype.deleteSelection.call(myDiagram.commandHandler);
      }
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
          nodeDataArray: [
              { key: 1, name: "sigmoid", outservices: [{name: "500"}], loc: "0 0", layer:"Dense", inOut:1, color:"#ffc86f" },
              { key: 2, name: "tanh", inservices: [{ name: "500" }],  outservices: [{name: "300"}], loc: "230 60", layer:"Dense", inOut:0, color:"#549fff"},
              { key: 3, name: "relu", inservices: [{ name: "300" }],  outservices: [{name: "10"}], loc: "360 80", layer:"Dense", inOut:0, color:"#549fff" },
              { key: 4, name: "sigmoid", inservices: [{ name: "10" }], loc: "450 50", layer:"Dense", inOut:2, color:"#b3ff6f" }
            ],
          linkDataArray: [
              { from: 1, fromPort: "500", to: 2, toPort: "500" },
              { from: 2, fromPort: "300", to: 3, toPort: "300" },
              { from: 3, fromPort: "10", to: 4, toPort: "10" },
            ]
        });
        
    //=========================
    //   Creating the Grid
    //=========================
    
    myDiagram.grid.visible = true;
    myDiagram.grid.gridCellSize = new go.Size(30, 30);
    myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;
    myDiagram.toolManager.resizingTool.isGridSnapEnabled = true;

    myDiagram.initialContentAlignment = go.Spot.Center;
    
    //=========================
    //  monitoring the model
    //=========================
  
    showModel();
    
    function showModel() {
      document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    }
    
}