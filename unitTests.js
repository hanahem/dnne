// ------------------------------------
// 	Units Test
// ------------------------------------

/**
 * This script contains unit tests
 **/

var model1 = 
{
	copiesArrays: true,
	copiesArrayObjects: true,
	linkFromPortIdProperty: "fromPort",
	linkToPortIdProperty: "toPort",
	nodeDataArray: 
	[
		{ key: 1, name: "sigmoid",inservices: [{ name: "125" }], outservices: [{name: "500"}], loc: "0 0", layer:"Dense", inOut:1, color:"#ffc86f" },
		{ key: 2, name: "tanh", inservices: [{ name: "500" }], outservices: [{name: "300"}], loc: "230 60", layer:"Dense", inOut:0, color:"#549fff"},
		{ key: 3, name: "relu", inservices: [{ name: "300" }], outservices: [{name: "10"}], loc: "360 80", layer:"Dense", inOut:0, color:"#549fff" },
		{ key: 4, name: "sigmoid", inservices: [{ name: "10" }], loc: "450 50", layer:"Dense", inOut:2, color:"#b3ff6f" }
	],
	linkDataArray: 
	[
		{ from: 1, fromPort: "500", to: 2, toPort: "500" },
		{ from: 2, fromPort: "300", to: 3, toPort: "300" },
		{ from: 3, fromPort: "10", to: 4, toPort: "10" }
	]
};


//TODO check for all various alerts by creating different model examples

function testCase_MLPCheck() 
{
	console.log("MLP Checker :\n");
	console.log("Example 1: expected true; received " + MLPCheck(model1));
}

//If making new string from copy paste, regex '\n' into '" + \n\t\t' then no regex of '" +' into '\n" +'
//This test seems a bit artificial; it should somehow be tested in a Python interpreter
//The most useful part of this test is that it has a small protocol at the end to see when
//the strings start to differ
function testCase_TFDecoder()
{
	console.log("TFDecoder :\n");
	var str1 = "import tensorflow as tf\n\n" +
		"#placeholders act as a way to remember the size of the input value and the output value, respectively\n" + 
		"x = tf.placeholder(tf.float32, shape=[None,125])\n" + 
		"y_ = tf.placeholder(tf.float32, shape=[None,10])\n" + 
		"#weights of synapses between each layer stocked as a matrix\n" + 
		"weights = {\n" + 
		"    'W0': tf.Variable(tf.random_normal([125,500])),\n" + 
		"    'W1': tf.Variable(tf.random_normal([500,300])),\n" + 
		"    'W2': tf.Variable(tf.random_normal([300,10]))\n" + 
		"}\n" + 
		"\n" + 
		"#biases of a neuron layer stocked as a vector\n" + 
		"biases = {\n" + 
		"    'b0': tf.Variable(tf.random_normal([500])),\n" + 
		"    'b1': tf.Variable(tf.random_normal([300])),\n" + 
		"    'b2': tf.Variable(tf.random_normal([10]))\n" + 
		"}\n" + 
		"\n" + 
		"\"\"\"\n" + 
		"We make our graph into a function that takes placeholder, weights and biases as input.\n" + 
		"The feedforward mechanism is classic: a layer is a vector, it passes through synapses by\n" + 
		"being multiplied by the weight matrix. Once at the next layer, the corresponding bias vector\n" + 
		"is added. Finally, the activation function is applied to each invidual coordinate.\n" + 
		"This repeats until the output layer is reached.\n" + 
		"\"\"\"\n" + 
		"\n" + 
		"def multilayer_perceptron(x, weights, biases):\n" + 
		"    layer_0 = tf.add(tf.matmul(x,weights['W0']), biases['b0'])\n" + 
		"    layer_0 = tf.nn.sigmoid(layer_0)\n" + 
		"    layer_1 = tf.add(tf.matmul(layer_0,weights['W1']), biases['b1'])\n" + 
		"    layer_1 = tf.nn.tanh(layer_1)\n" + 
		"    layer_2 = tf.add(tf.matmul(layer_1,weights['W2']), biases['b2'])\n" + 
		"    layer_2 = tf.nn.relu(layer_2)\n" + 
		"    return layer_2\n" + 
		"\n" + 
		"#Construction of the model\n" + 
		"pred = multilayer_perceptron(x, weights, biases)\n" + 
		"\n" + 
		"\"\"\"\n" + 
		"Following steps include:\n" + 
		"1) Defining loss function and optimizer\n" + 
		"2) Initializing global variables\n" + 
		"3) Running the training session with appropriate hyperparameters and datasets\n" + 
		"4) Testing the model and calculating its accuracy\n" + 
		"\"\"\"\n\n";

    var str1_ = decoderTflow(model1);

	console.log("Example1 TF : Correct ? " + (str1 === str1_));
  
	//finds the point where things start to differ 
	if (str1 !== str1_) 
	{
		console.log("Finding the point when the strings start to differ:\n");
		while (str1[0] === str1_[0])
		{
		    str1 = str1.substring(1,str1.length);
		    str1_ = str1_.substring(1,str1_.length);
		    if (str1[0] !== str1_[0]) console.log("First differing pair of characters: str1 = " + str1[0] + " ; str1_ = " + str1_[0]);
		}
		console.log(str1);
		console.log("\n\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n");
		console.log(str1_);
	}
}


/**
 * Function that runs all available tests to be called early and check the console
 */

function runTests()
{
	testCase_MLPCheck();
	testCase_TFDecoder();
}
