var imgcargada = false;
var dif = [[6,4],[9,6],[12,8]];
var n = 0;

function init(){
  let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let img = new Image();

	img.onload = function(){
		ctx.drawImage(img, 0, 0, cv.width, cv.height);
	};

	img.src = 'drop-here.png';

//DRAG&DROP
if(!document.querySelector('#botEmp').disabled){ // si empieza el juego no se puede cambiar NO VA
	console.log(document.querySelector('#botEmp').disabled);
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
				let img = new Image();
				img.onload = function(){
					let ctx = cv01.getContext('2d');
					ctx.drawImage(img, 0, 0, cv01.width, cv01.height);
				};
				img.src = fr.result;
			};
			fr.readAsDataURL(fichero);
		}
	
	}
}

function empezarJuego(){
  if(imgcargada==false){
    console.log("No has seleccionado ninguna imagen");
  }
   
    //zona imagen
    copiarCanvas();
    //zona puzzle
    dibujarCuadricula();
    //boton empezar
    tiempo();
    deshabilitaBotones();
}

function cambiarImagen(){

}
function deshabilitaBotones(){
	//he intenado poerlo como clase pero solo me coge el primero
	document.querySelector('#botEmp').disabled=true;
	document.querySelector('#botCol').disabled=true;
	document.querySelector('#botDif').disabled=true;
	document.querySelector('#botFin').disabled=false;
	document.querySelector('#botAyu').disabled=false;

	
}

function copiarCanvas(){
	let cv1 = document.querySelector('#cv01'),
	ctx1 = cv1.getContext('2d');
	let cv2 = document.querySelector('#cv02'),
	ctx2 = cv2.getContext('2d');
	
	//let img = new Image();
	//img.crossOrigin = "Anonymous";
	let imgData = ctx1.getImageData(0,0,cv1.width, cv1.height);
	ctx2.putImageData(imgData,0,0);

}


function tiempo(){
window.setInterval(function (){
  document.getElementById("number").innerHTML = n;
  n++;
},1000);
}
//Hay que cambiar valores aqui dependiendo de la dificultad elegida
/*
function dibujarCuadricula(){
	let cv = document.getElementById('cv02');
	let ctx = cv.getContext('2d');
	let dim = cv.width / 3;

	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#00a';
	for(let i=1; i<3; i++){
		//lineas verticales
		ctx.moveTo(i * dim, 0);
		ctx.lineTo(i * dim, cv.height);
		//lineas horizontales
		ctx.moveTo(0, i * dim);
		ctx.lineTo(cv.width, i * dim);
	}
	ctx.stroke();
}*/

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
	    d = document.querySelector('#botDif').value,
		fila = cv.width / dif[d][0],
		dimy = cv.height / dif[d][1];

	console.log(" Posicion: ${x} - ${y}");
	console.log(' Posicion: '+ x +' - '+ y);
	console.log('fila:'+fila+' columna:'+dimy);
}
/*
//Para seleccionar trozos de la cuadricula
function mouse_click(e){
	let cv = e.target,
		x = e.offsetX,
		y = e.offsetY,
		d = document.querySelector('#botDif').value,
		fila = cv.width / dif[d][0],
		dim = cv.width /  dif[d][0],
		columna = cv.height / dif[d][1];

		if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
			return;
		}

	console.log(" Posicion: ${x} - ${y}");
	console.log(' Posicion: '+ x +' - '+ y);
	console.log('fila:'+fila+' columna:'+columna);

	cv.width = cv.width;
	dibujarCuadricula();
	let ctx = cv.getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = '#a00';
	ctx.lineWidth = 5;
	ctx.strokeRect(columna * dim, fila * dim, dim, dim)
}
*/
function mouse_click(e){
	let cv = e.target,
		x = e.offsetX,
		y = e.offsetY,
		dim = cv.width / 4,
		d = document.querySelector('#botDif').value,
		fila = Math.floor( y / dif[d][1]),
		columna = Math.floor( x / dif[d][0]);

		if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
			return;
		}

	console.log(" Posicion: ${x} - ${y}");
	console.log(' Posicion: '+ x +' - '+ y);
	console.log('fila:'+fila+' columna:'+columna);

	cv.width = cv.width;
	dibujarCuadricula();
	let ctx = cv.getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = '#a00';
	ctx.lineWidth = 4;
	ctx.strokeRect(columna * dim, fila * dim, dim, dim)
}

//Limpiar canvas
function limpiar(e){
	let cv = e.target.parentNode.parentNode.querySelector('canvas');
	cv.width = cv.width;
}
