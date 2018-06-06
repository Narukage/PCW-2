var imgcargada = false;
var dif = [[6,4],[9,6],[12,8]];
var n = 0;

var arrayPiezas = new Array();
var img = new Image();

function init(){
  let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let img = new Image();

	img.onload = function(){
		ctx.drawImage(img, 0, 0, cv.width, cv.height);
	};

	img.src = 'drop-here.png';

//DRAG&DROP
  let cv01 = document.querySelector('#cv01');
	cv01.ondragover = function(e) {
		e.stopPropagation();
		e.preventDefault(); // return false;
	};
	cv01.ondrop = function(e) {
		e.preventDefault(); // return false;
		let fichero = e.dataTransfer.files[0];
			fr = new FileReader();

		fr.onload = function(){
			img.onload = function(){
				let ctx = cv01.getContext('2d');
				ctx.drawImage(img, 0, 0, cv01.width, cv01.height);
			};
			img.src = fr.result;
		};
		fr.readAsDataURL(fichero);
	}
}

function empezarJuego(){
  if(imgcargada==false){
    console.log("No has seleccionado ninguna imagen");

    var modal = document.getElementById('myModal2'),
    btn = document.getElementById("myBtn"),
    span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
  }else{
    let d = document.querySelector('#botDif').value;
    let cont = 0;
    //zona imagen
    //zona puzzle
    //array de piezas
    let tamanio = dif[d][0]*dif[d][1];
    for(var i=0; i<tamanio; i++){
        arrayPiezas[cont] = cont;
        cont++;
    }
    desordenar(arrayPiezas);
    console.log(arrayPiezas);
    copiarCanvas(arrayPiezas);
    dibujarCuadricula();
    //desordenar baraja
    //boton empezar
    tiempo();
    deshabilitaBotones();
    //mierdas varias joder
  }
}

function desordenar(array){
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // Mientras haya elementos que barajar
  while (0 !== currentIndex) {

    // Cojo el elemento siguiente
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Y lo cambio con el elemento actual
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*function finalizar(){
  let t = n;

  t.style.display = "none";
}*/

function copiarCanvas(array){
  let d = document.querySelector('#botDif').value;
  let c1 = document.getElementById("cv01"),
      ctx1 = c1.getContext('2d'),
      c2 = document.getElementById("cv02"),
      ctx2 = c2.getContext('2d'),
      imagen;

      let cont = 0;
      for(let i=0; i<dif[d][1]; i++){
        for(let j=0; j<dif[d][0]; j++){
          imagen = ctx1.getImageData((array[cont]/dif[d][0])*ctx1.canvas.clientHeight/dif[d][0], (array[cont]%dif[d][1])*ctx1.canvas.clientWidth/dif[d][1], ctx1.canvas.clientHeight/dif[d][0],  ctx1.canvas.clientWidth/dif[d][1]);
          ctx2.putImageData(imagen, j*ctx2.canvas.clientHeight/dif[d][0], i*ctx2.canvas.clientWidth/dif[d][1]);
          cont++;
        }
      }
}

function tiempo(){
window.setInterval(function (){
  document.getElementById("number").innerHTML = n;
  n++;
},1000);
}

//Cambia la foto del canvas haciendo click sobre el
function cambiarFotoclick(){
  document.getElementById("uploadImage").click();
}

//Subir foto al canvas y cambiarla
function cambiarFoto() {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

      oFReader.onload = function (oFREvent) {
			var url=oFREvent.target.result;
			var url2=url.split(";");
			var url3=url2[0].split("/");
			console.log(url3[1]);
			if(url3[1]=="jpg" || url3[1]=="png" || url3[1]=="jpeg" || url3[1]=="bmp" || url3[1]=="gif"){

        let cv = document.getElementById('cv01');
      	let ctx = cv.getContext('2d');
        img.setAttribute('crossOrigin', '');

      	img.onload = function(){
      		ctx.drawImage(img, 0, 0, cv.width, cv.height);
      	};
      	img.src = url;
			}
        };
  imgcargada=true;
 }

 function deshabilitaBotones(){
	//he intenado poerlo como clase pero solo me coge el primero
	document.querySelector('#botEmp').disabled=true;
	document.querySelector('#botCol').disabled=true;
	document.querySelector('#botDif').disabled=true;
	document.querySelector('#botFin').disabled=false;
	document.querySelector('#botAyu').disabled=false;
}

function dibujarCuadricula(){
	let cv = document.getElementById('cv02');
	let ctx = cv.getContext('2d');
	let di = [60,40,30];
	let d = document.querySelector('#botDif').value;

	ctx.beginPath();
	ctx.lineWidth = document.querySelector('#grosor').value;
	ctx.strokeStyle = document.querySelector('#botCol').value;

	let dimx = cv.width / dif[d][0];
	let dimy = cv.height / dif[d][1];

	//lineas verticales
	for(let i=1; i<dif[d][0]; i++){

		ctx.moveTo(i * dimx, 0);
		ctx.lineTo(i * dimx, cv.height);
	}
	//lineas horizontales
	for(let i=1; i<dif[d][1]; i++){

		ctx.moveTo(0, i * dimy);
		ctx.lineTo(cv.width, i * dimy);
	}
	ctx.stroke();
}

//Calcular posicion del raton dentro del canvas
function mouse_move(e){
	return;
	let cv = e.target,
		x = e.offsetX,
		y = e.offsetY,
		dim = cv.width / 6,
    dimy = cv.height / 4,
		fila = Math.floor( y / dimy),
		columna = Math.floor( x / dim);

	console.log(" Posicion: ${x} - ${y}");
	console.log(' Posicion: '+ x +' - '+ y);
	console.log('fila:'+fila+' columna:'+columna);
}


function mouse_click(e){
	let cv = e.target,
		d = document.querySelector('#botDif').value,
		x = e.offsetX,
		y = e.offsetY,
		dim = cv.width / dif[d][0],
    	dimy = cv.height / dif[d][1],
		fila = Math.floor( y / dimy),
		columna = Math.floor( x / dim);

		if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
			return;
		}

	console.log(" Posicion: ${x} - ${y}");
	console.log(' Posicion: '+ x +' - '+ y);
	console.log('fila:'+fila+' columna:'+columna);

	cv.width = cv.width;
  copiarCanvas(arrayPiezas);
	dibujarCuadricula();
	let ctx = cv.getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = '#a00';
	ctx.lineWidth = 4;
	ctx.strokeRect(columna * dim, fila * dimy, dim, dimy);

}

//Limpiar canvas
function limpiar(e){
	let cv = e.target.parentNode.parentNode.querySelector('canvas');
	cv.width = cv.width;
}
