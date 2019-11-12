
var _BEList = [];
var _BEClasses = [];
var _BEClassesByNames = [];
var _currentBEClass;
var _parameterList;


var _dynamicPoints = [];
var _orthoMode = false;
var _currentRotation = 0;

var _selectedElement;
var _selectedID;
var _currentLevel;
var _backgroundColor2D;

var scene3D, camera3D, renderer, controls, light;
var meshArr = [];
var ang = 0.0;
var div3D;
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 300;

var WOOD=new THREE.TextureLoader().load("/static/assets/img/wood.jpg");



/* var CHAIR;
var mtl = new THREE.MTLLoader().load("/static/assets/model/chair1Unit.mtl", (mat) => {
    var obj = new THREE.OBJLoader().load("/static/assets/model/chair1Unit.obj", (object) => {
        object.traverse(function(node){
            if(node instanceof THREE.Mesh){
                node.material=mtl;
            }
        }); 
        CHAIR = object.clone();
    });
}); */

/* var MINI;
var mtl = new THREE.MTLLoader().load("/static/assets/model/mini.mtl", (mat) => {
    var obj = new THREE.OBJLoader().load("/static/assets/model/mini.obj", (object) => {
        object.traverse(function(node){
            if(node instanceof THREE.Mesh){
                node.material=mtl;
            }
        }
        );
        MINI = object.clone();
    });
}); */


var JSONARR = [];
var _BEModels = []; // list of all BE Class models by class.


