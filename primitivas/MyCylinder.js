import * as THREE from '../libs/three.module.js'
 
class MyCylinder extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var CylinderGeometry = new THREE.CylinderGeometry (5, 5, 20, 32);
    // Como material se crea uno a partir de un color
    var cylinderMat = new THREE.MeshNormalMaterial();
    
    // Ya podemos construir el Mesh
    var cylinder = new THREE.Mesh (CylinderGeometry, cylinderMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (cylinder);

  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 0.2;
      this.sizeY = 0.2;
      this.sizeZ = 0.2;
      
      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;
      
      this.posX = 0;
      this.posY = 8.0;
      this.posZ = 0.0;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 0.2;
        this.sizeY = 0.2;
        this.sizeZ = 0.2;
        
        this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;
        
        this.posX = 0;
        this.posY = 8.0;
        this.posZ = 0.0;
      }
    }  
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 0.5, 0.01).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 0.5, 0.01).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 0.5, 0.01).name ('Tamaño Z : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
      this.rotateY(0.01);
      this.rotateZ(0.01);
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    
  }
}

export { MyCylinder };
