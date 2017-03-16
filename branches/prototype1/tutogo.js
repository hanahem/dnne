
/*javascript du cadre avec gojs tiré d'un tuto sur youtube à l'adresse suivante : https://www.youtube.com/watch?v=cRRV4GDc8OM&t=306s */
function goIntro() {
			var $ = go.GraphObject.make;

			var diagram = new go.Diagram("myDiagramDiv");
			diagram.initialContentAlignment = go.Spot.Center;

			diagram.nodeTemplate =
				$(go.Node, go.Panel.Auto,
					$(go.Shape,
						{ figure: "RoundedRectangle"},

						new go.Binding("fill", "color")),
					$(go.TextBlock,
						{ margin: 3 },

						new go.Binding("text", "key")));

			/* Les noeuds du diagrammes avec leurs couleurs*/
			var nodeDataArray = [
				{ key: "Alpha", color: "LightBlue" },
				{ key: "Beta", color: "Orange" },
				{ key: "Gamma", color: "LightGreen" },
				{ key: "Delta", color: "Pink" } 
			];
			/*Les flèches avec les liens entre les noeuds*/
			var linkDataArray = [
				{ from: "Alpha", to: "Beta" },
				{ from: "Alpha", to: "Gamma" },
				{ from: "Beta", to: "Beta"},
				{ from: "Gamma", to: "Delta" },
				{ from: "Delta", to: "Alpha"}
			];
			diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
		}

