//récupération d'un jsfiddle qui générait un mot de passe aléatoirement, 
//utilisé pour générer des définitions comme dans un petit wiki
$( document ).ready(function() {

	// length of the string
	var stringLength = 2;

	// list containing definitions for the random string
	var stringArray = ['Multilayer Perceptron (MLP) : a feedforward artificial neural network model that maps sets of input data onto a set of appropriate outputs. This is one of the simplest ANN models ; it has weights, biases, and is feedforward. The activation function of neurons can be either a binary map (perceptrons) or a sigmoid map (sigmoid neurons).','Feed-forward neural network (FFNN) : a neural network where calculations only go “one way”, they cascade down from one layer to one another and do not return to previously visited neurons (the neurons from one layer can only take the precedent layer’s output, as input). This is one of the simplest models of ANNs.','Perceptron : a model for neurons that is as simple as can be : outputs from a perceptron can only be 0 or 1, and depend on the weighted input to the neuron that is matched against a threshold value of the neuron called its bias (technically, the threshold is the opposite of the neuron’s bias).','Convolutional neural network (ConvNet or CNN) : a  feed-forward neural network where the connectivity pattern between neurons is inspired by the organization of the animal visual cortex.'];

	$("#generateToken").click(function (){

		var rndString = "";
	
		// build the string with a random definition
		for (var i = 1; i < stringLength; i++) { 
			var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
			rndString = rndString + stringArray[rndNum];
		};
		//des balises peuvent être ajoutées pour modifier le format de la definition comme <strong> après le <p>
		$("#showToken").html('<p>' + rndString + '</p>');

	});

});

