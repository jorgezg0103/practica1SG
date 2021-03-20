import * as THREE from '../libs/three.module.js'
 
class MyRevolution extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Puntos
    this.points = new Array();
    // Se añaden puntos al array
    this.points.push(new THREE.Vector3(1.0, -1.4, 0));
    this.points.push(new THREE.Vector3(1.0, -1.1, 0));
    this.points.push(new THREE.Vector3(0.5, -0.7, 0));
    this. points.push(new THREE.Vector3(0.4, -0.4, 0));
    this. points.push(new THREE.Vector3(0.4, 0.5, 0));
    this. points.push(new THREE.Vector3(0.5, 0.6, 0));
    this. points.push(new THREE.Vector3(0.3, 0.6, 0));
    this. points.push(new THREE.Vector3(0.5, 0.8, 0));
    this. points.push(new THREE.Vector3(0.55, 1.0, 0));
    this. points.push(new THREE.Vector3(0.5, 1.2, 0));
    this. points.push(new THREE.Vector3(0.3, 1.4, 0));

    // Geometría
    var revGeometry = new THREE.LatheGeometry(this.points, 10, 1.5, 6);
    // Material
    var revMat = new THREE.MeshNormalMaterial();
    // Mesh
    this.latheObject = new THREE.Mesh(revGeometry, revMat);
    // // Y añadirlo como hijo del Object3D (el this)
    this.add(this.latheObject);


    // Para crear una línea visible
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices = this.points;

    //Objectos a construir
    this.Point = new THREE.Points(lineGeometry, revMat);
    this.Line = new THREE.Line(lineGeometry, revMat);

    this.add(this.Point);
    this.add(this.Line);

  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición
    this.guiControls = new function () {
      this.segmentos = 10;
      this.angulo = 6;
      this.verPuntos = true;
      this.verLineas = true;
      this.verObjeto = true;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.segmentos = 10;
        this.angulo = 6;
        this.verPuntos = true;
        this.verLineas = true;
        this.verObjeto = true;
      }
    } 

    var that = this;
    
    // Se crea una sección para los controles
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'segmentos', 1, 64, 1).name('Segmentos: ').onChange(function () {
      that.latheObject.geometry = new THREE.LatheGeometry(that.points, that.guiControls.segmentos, 1.5, that.guiControls.angulo);
    });

    folder.add(this.guiControls, 'angulo', 0.1, 2 * Math.PI, 0.1).name('Angulo: ').onChange(function () {
      that.latheObject.geometry = new THREE.LatheGeometry(that.points, that.guiControls.segmentos, 1.5, that.guiControls.angulo);
    });

    folder.add(this.guiControls, 'verPuntos').name('Ver Puntos: ');

    folder.add(this.guiControls, 'verLineas').name('Ver Lineas: ');

    folder.add(this.guiControls, 'verObjeto').name('Ver Objeto: ');

    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }
  
  update () {
    this.Point.visible = this.guiControls.verPuntos;
    this.Line.visible = this.guiControls.verLineas;
    this.latheObject.visible = this.guiControls.verObjeto;
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
  }
}

export { MyRevolution };
