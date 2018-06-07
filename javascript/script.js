var imgcargada = false;
var dif = [[6,4],[9,6],[12,8]];
var n = 0;
var imagen;
var imagen2;
var ef1,ec1,ef2,ec2;

var malcolocadas;
var movimientos;

var arrayPiezas = new Array();
var arrayOrdenado = new Array();
var img = new Image();

function init(){
  movimientos = 0;
  n = 0;
  let cv = document.getElementById('cv01');
  let cv2 = document.getElementById('cv02');
  let ctx2 = cv2.getContext('2d');
	let ctx = cv.getContext('2d');
	let img = new Image();

  habilitarBotones();
  ctx2.clearRect(0, 0, cv2.width, cv2.height);

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
    let d = document.querySelector('#botDif').value;
    let cont = 0;
    //array de piezas
    let tamanio = dif[d][0]*dif[d][1];
    malcolocadas = tamanio;
    for(var i=0; i<tamanio; i++){
        arrayPiezas[cont] = cont;
        cont++;
    }

    desordenar(arrayPiezas);
    copiarCanvas(arrayPiezas);
    //zona puzzle
    dibujarCuadricula();
    //boton empezar
    tiempo();
    deshabilitaBotones();
    //mierdas varias joder
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

function finalizar(){
  let t = n;
  let html = '';

  html+= '<div class="modal-content" id="modal-content">';
  html+= '<span class="close">&times;</span>';
  html+= '<h2>¡Partida finalizada!</h2>';
  html+= '<p>“Has dejado '+ malcolocadas +' piezas por colocar bien después de '+ movimientos +' movimientos y has empleado '+ t +' segundos</p></div>';

  document.getElementById("myModal2").innerHTML += html;

  var modal = document.getElementById('myModal2'),
  btn = document.getElementById("myBtn"),
  span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  span.onclick = function() {
      modal.style.display = "none";
      init();
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
return false;
}

function ordenarImagen(){
  let d = document.querySelector('#botDif').value;
  let c1 = document.getElementById("cv01"),
      ctx1 = c1.getContext('2d');
      let  c2 = document.getElementById("cv02"),
      ctx2 = c2.getContext('2d');
      var cont = 0;

      for(let i=0; i<dif[d][1]; i++){
        for(let j=0; j<dif[d][0]; j++){
          arrayOrdenado[cont] = ctx1.getImageData(j*ctx1.canvas.clientHeight/dif[d][0], i*ctx1.canvas.clientWidth/dif[d][1], ctx1.canvas.clientHeight/dif[d][0],  ctx1.canvas.clientWidth/dif[d][1]);
           cont++;
        }
      }
 }

function copiarCanvas(array){
  let d = document.querySelector('#botDif').value;
  let c1 = document.getElementById("cv01"),
      ctx1 = c1.getContext('2d'),
      c2 = document.getElementById("cv02"),
      ctx2 = c2.getContext('2d'),
      imagen;

      let cont = 0;
      for(let i=0; i<dif[d][0]; i++){
        for(let j=0; j<dif[d][1]; j++){
          let posx = Math.floor(array[cont]%dif[d][0]);
          let posy = Math.floor(array[cont]/dif[d][0]);
          let tamanyoX = Math.floor(ctx1.canvas.clientWidth/dif[d][0]);
          let tamanyoY = Math.floor(ctx1.canvas.clientHeight/dif[d][1]);

          imagen = ctx1.getImageData(posx*tamanyoX, posy*tamanyoY, tamanyoX, tamanyoY);
          ctx2.putImageData(imagen, i*tamanyoX, j*tamanyoY);
          cont++;
        }
      }
}

function tiempo(){
window.setInterval(function (){
  document.getElementById("number").innerHTML = n;
  n++; },1000);
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
  document.querySelector('#botEmp').disabled=false;
 }

 function habilitarBotones(){
   document.querySelector('#botEmp').disabled=false;
 	document.querySelector('#botCol').disabled=false;
 	document.querySelector('#botDif').disabled=false;
 	document.querySelector('#botFin').disabled=true;
 	document.querySelector('#botAyu').disabled=true;
 }

 function deshabilitaBotones(){
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
  		columna = Math.floor( x / dim),
  		 c2 = document.getElementById("cv02"),
       	 ctx2 = c2.getContext('2d');

  		if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
  			return;
  		}
    console.log("----");
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
  	var variable;

  	//Primero tenemos que conseguir el primer puntero
  	if(ef1==null){
  		ef1 = fila;
  		ec1 = columna;
  	}
  	else// una vez tenemos el puntero
  	{
  		//conseguimos el segundo puntero
  		ef2 = fila;
  		ec2 = columna;
  		//intercambiamos las piezas:
  			//cogemos primer  trozo

  				imagen = ctx2.getImageData(ec1*ctx2.canvas.clientHeight/dif[d][0], ef1*ctx2.canvas.clientWidth/dif[d][1], ctx2.canvas.clientHeight/dif[d][0],  ctx2.canvas.clientWidth/dif[d][1]);
  			//cogemos segundo trozo
  				imagen2 = ctx2.getImageData(ec2*ctx2.canvas.clientHeight/dif[d][0], ef2*ctx2.canvas.clientWidth/dif[d][1], ctx2.canvas.clientHeight/dif[d][0],  ctx2.canvas.clientWidth/dif[d][1]);
  					variable=arrayPiezas[(dif[d][0]*ef1)+ec1];
  					arrayPiezas[(dif[d][0]*ef1)+ec1]=arrayPiezas[(dif[d][0]*ef2)+ec2];
  					arrayPiezas[(dif[d][0]*ef2)+ec2]=variable;
  				//insertamos primera imagen
  					ctx2.putImageData(imagen, ec2*ctx2.canvas.clientHeight/dif[d][0], ef2*ctx2.canvas.clientWidth/dif[d][1]);
  				//insertamos primera imagen
  					ctx2.putImageData(imagen2, ec1*ctx2.canvas.clientHeight/dif[d][0], ef1*ctx2.canvas.clientWidth/dif[d][1]);

  		//borramos coordenadas
  		ef1 = null;
  		ec1 = null;
  		ef2 = null;
  		ec2 = null;
  	}
}

//Limpiar canvas
function limpiar(e){
	let cv = e.target.parentNode.parentNode.querySelector('canvas');
	cv.width = cv.width;
}
