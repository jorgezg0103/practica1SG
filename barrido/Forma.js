import * as THREE from '../libs/three.module.js'
 
class Forma extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Creamos la forma del corazon
    const heartShape = new THREE.Shape();
    
    // Usamos curvas de Bezier para darle forma
    heartShape.moveTo( 0, 0 );
    // cp1x, cp1y, cp2x, cp2y, x, y
    heartShape.bezierCurveTo(  0, 0,  3, 2,  3, 4 );
    heartShape.bezierCurveTo(  3, 6,  0, 6,  0, 4 );
    heartShape.bezierCurveTo(  0, 6, -3, 6, -3, 4 );
    heartShape.bezierCurveTo( -3, 2,  0, 0,  0, 0 );
    
    // Opciones de extrusion
    const extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 20, steps: 1, bevelSize: 0.5, bevelThickness: 0.2 };

    // Geometría
    const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

    // Mesh
    const forma = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );

    // // Y añadirlo como hijo del Object3D (el this)
    this.add(forma);

  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición
    this.guiControls = new function () {
      

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        
      }
    } 

  }
  
  update () {

    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.rotateY(0.01);
    this.position.set(10, 0, 0);
  }
}

export { Forma };
