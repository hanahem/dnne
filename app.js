//=============MAIN MODULE==============
var app = angular.module('dnneApp', []);

//==============SERVICES================
/**
 * Angular Service : sharing scope between controllers
**/
app.service('LayerService', function() {
  return {stack: ''};
});


//=============CONTROLLERS==============
/**
 * FormCtrl Controller : manages the FORM DIV view
**/
app.controller('FormCtrl', function($scope, $http, LayerService) {
    
    //List of forms for each layer type name, and parameters
    $scope.forms = [{
      name: "Dense",
      params:[{ activation: '', size: ''}]
    },{
      name: "Conv2D",
      params:[{ activation: '', size: ''}]
    },{
      name: "Pool2D",
      params:[{ activation: '', size: ''}]
    },{
      name: "Flatten",
      params:[{ activation: '', size: ''}]
    }];
    
    //View monitoring and the stack of layers
    $scope.curr = {};
    $scope.layerStack = [];
    
    /**
     * submit : this functions pushes the current form values into the stack of layers
     * and updates the LayerService
     * input : form (a json-string object with attributes name, and params)
    **/
    $scope.submit = function(form){
      $scope.layerStack.push(form);
      LayerService.stack = $scope.layerStack
    }
    
});

/**
 * CodeOutCtrl Controller : manages the CODE OUTPUT DIV view
**/
app.controller('CodeOutCtrl', function($scope, $http, LayerService, $timeout){
  
  //Extraction of the layerStack shared in LayerService
  $scope.layerStack = LayerService;
 
  $scope.code = [];
  
   /**
    * pyWrap : this function wraps the layer stack around Keras
    * input : stack (attribute of layerStack object)
    * @return : the python code into a list of strings representing the code lines
   **/
   $scope.kerasWrap = function(stack){
    
  }
  
});
