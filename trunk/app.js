//=============MAIN MODULE==============
var app = angular.module('dnneApp', []);

//==============SERVICES================
//Angular Services : share vars between controllers
app.service('LayerService', function() {
  return {stack: ''};
});


//=============CONTROLLERS==============
//FORM CONTROLLER
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
    
    $scope.submit = function(form){
      $scope.layerStack.push(form);
      LayerService.stack = $scope.layerStack
    }
    
});

//CODE OUTPUT CONTROLLER
app.controller('CodeOutCtrl', function($scope, $http, LayerService, $timeout){
  
  //Extraction of the layerStack shared in LayerService
  $scope.layerStack = LayerService;
 
  $scope.code = [];
  
  $scope.pyWrap = function(stack){
    angular.forEach(stack, function(value, key){
      this.push(value + ':' + key);
    }, code);
  }
  
});
