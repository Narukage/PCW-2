var dif = [[6,4],[9,6],[12,8]];
var tiempo = 0;
var imagen;
var imagen2;
var ef1,ec1,ef2,ec2;
var difx = dif[document.querySelector('#botDif').value][0];
var dify = dif[document.querySelector('#botDif').value][1];
var malcolocadas;
var movimientos;
var arrayPiezas = new Array();
var img = new Image();
var empezado = false;
var arrayRel = new Array();

//solo se ejecuta una vez al principio
function init(){
   movimientos = 0;
   tiempo = 0;
   
  let cv = document.getElementById('cv01'),
   cv2 = document.getElementById('cv02'),
   ctx2 = cv2.getContext('2d'),
   ctx = cv.getContext('2d'),
   img = new Image(),
   d = document.querySelector('#botDif').value;

   malcolocadas = difx*dify;

 
  deshabilitaBotones();
  document.querySelector('#uploadImage').disabled=false;
  document.querySelector("#botFin").disabled=true;
  document.querySelector("#botAyu").disabled=true;

  //limia el canvas
  ctx2.clearRect(0, 0, cv2.width, cv2.height);

	img.onload = function(){
		ctx.drawImage(img, 0, 0, cv.width, cv.height);
	};

	img.src = 'drop-here.png';

if(empezado){
	// EVENTOS DE RATÓN
		let cv02 = document.querySelector('#cv02');
		cv02.onmousemove = function(e){
			let x = e.offsetX,
			y = e.offsetY;
			let [col,fil] = getFilCol(e),
			dimx = cv02.width/dif[document.querySelector('#botDif').value][0];
			dimy = cv02.height/dif[document.querySelector('#botDif').value][1];
			var ctx1 = cv01.getContext('2d');
			var ctx02 = cv02.getContext('2d');
			let fc = cv02.getAttribute('data-FC');

			if(fc){
				fc = JSON.parse(fc);
				if(fc.fil == fil && fc.col == col){
					return;
				}
			}

			//console.log(`(${x},${y})`+`(${col},${fil})`+'tam=(${dimx},${dimy})')

			//Esto es como el verdadero main, aqui es donde no van a parar de ejecutarse
			cv02.width = cv02.width;
			copiarCanvas();
			dibujarCuadricula();

			fc = {'fil':fil, 'col':col};
			cv02.setAttribute('data-FC', JSON.stringify(fc));

		};

		cv02.onmouseleave = function(e){
			let x = e.offsetX,
			y = e.offsetY;
		}

		cv02.onmouseenter = function(e){
			let x = e.offsetX,
			y = e.offsetY;
		}

		cv02.onmousedown = function(e){
			let x = e.offsetX,
			y = e.offsetY;
		}

		cv02.onmouseup = function(e){
			let x = e.offsetX,
			y = e.offsetY;
		}
  }
}

//Destaca el draganddrop
function destacar(e){

  let cv = document.getElementById("cv01");
  ctx = cv.getContext('2d');

	ctx.strokeStyle = 'green';
	ctx.lineWidth = 6;

  ctx.strokeRect(0,0, cv.width, cv.height);
  dragdrop();
}

function dragdrop(){	
		//DRAG&DROP
	  let cv01 = document.querySelector('#cv01');
		cv01.ondragover = function(e) {
			if(!empezado){
			e.stopPropagation();
			e.preventDefault(); // return false;
			}
		};
		cv01.ondrop = function(e) {
			e.preventDefault(); // return false;
			let fichero = e.dataTransfer.files[0];
				fr = new FileReader();

			fr.onload = function(){
				img.onload = function(){
					let ctx = cv01.getContext('2d');
					ctx.drawImage(img, 0, 0, cv01.width, cv01.height);
					previsualizar(e);
					habilitarBotones();

				};
				img.src = fr.result;
			};
			fr.readAsDataURL(fichero);
		}
}
//coge la fila y columna para la deteccion de movimiento
function getFilCol(e){
	let d = document.querySelector('#botDif').value;
	let dim = e.target.width / dify;
	let dimx = e.target.width / difx;
	let fil = Math.floor(e.offsetY/dim),
	col = Math.floor(e.offsetX/dimx);

	return [col, fil];
}


function empezarJuego(){
    deshabilitaBotones();
    caltiempo();
    deshabilitaBotones();
    empezado=true;
}

function desordenar(array){
  var currentIndex = array.length, temporaryValue, randomIndex ;

  var cont = 0;
  // Mientras haya elementos que barajar
  while (0 !== currentIndex) {

    // Cojo el elemento siguiente
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Y lo cambio con el elemento actual
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    //guarda posicion actual
    //arrayRel[cont]=randomIndex;
    cont++;
  }

  return array;
}

function finalizar(){
  let t = tiempo;
  let html = '';

  html+= '<div class="modal-content" id="modal-content">';
  html+= '<span class="close">&times;</span>';
  html+= '<h2>¡Partida finalizada!</h2>';
  html+= '<p>“Has dejado '+ malcolocadas +' piezas por colocar bien después de '+ movimientos/2 +' movimientos y has empleado '+ t +' segundos</p></div>';

  document.getElementById("myModal2").innerHTML += html;

  var modal = document.getElementById('myModal2'),
  btn = document.getElementById("myBtn"),
  span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  span.onclick = function() {
      modal.style.display = "none";
      init();
      limpiar();
      document.getElementById("myModal2").innerHTML = '';
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
          limpiar();
      }
  }
  movimientos=0;
  empezado=false;
  clearInterval(tiempo);
   tiempo=0;
   window.setInterval(function (){tiempo--;},1000);
return false;
}

//copia el primer canvas al segundo
function copiarCanvas(array){
  let c1 = document.getElementById("cv01"),
      ctx1 = c1.getContext('2d'),
      c2 = document.getElementById("cv02"),
      ctx2 = c2.getContext('2d'),
      d = document.querySelector('#botDif').value
      imagen;

      let cont = 0;
      for(let i=0; i<difx; i++){
        for(let j=0; j<dify; j++){
          let posx = Math.floor(arrayPiezas[cont]%difx);
          let posy = Math.floor(arrayPiezas[cont]/difx);
          let tamanyoX = Math.floor(ctx1.canvas.clientWidth/difx);
          let tamanyoY = Math.floor(ctx1.canvas.clientHeight/dify);

          imagen = ctx1.getImageData(posx*tamanyoX, posy*tamanyoY, tamanyoX, tamanyoY);
          ctx2.putImageData(imagen, i*tamanyoX, j*tamanyoY);
          cont++;
        }
      }
}

//muestra el tiempo por pantalla
function caltiempo(){
window.setInterval(function (){
  document.getElementById("number").innerHTML = "<p>Tiempo: "+tiempo+"<p>";
  tiempo++; },1000);
}

//Cambia la foto del canvas haciendo click sobre el
function cambiarFotoclick(){
  document.getElementById("uploadImage").click();
}

//crea un array del tamaño de la imagen y lo rellena
function arrays(){
  let tamanio = dif[document.querySelector('#botDif').value][0]*dif[document.querySelector('#botDif').value][1];
    //array de piezas
    let cont = 0;
    for(i=0; i<tamanio; i++){
        arrayPiezas[cont] = cont;
        cont++;
    }
}

//Subir foto al canvas y cambiarla
function cambiarFoto() {
      arrays();
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
          desordenar(arrayPiezas);
          copiarCanvas(arrayPiezas);
          dibujarCuadricula();
          habilitarBotones();
      	};
      	img.src = url;
			}
        };
  document.querySelector('#botEmp').disabled=false;
  dragdrop();
 }

 function habilitarBotones(){
  document.querySelector('#botEmp').disabled=false;
 	document.querySelector('#botCol').disabled=false;
 	document.querySelector('#botDif').disabled=false;
 	document.querySelector('#grosor').disabled=false;
 	document.querySelector('#botFin').disabled=true;
 	document.querySelector('#botAyu').disabled=true;
 }

 function deshabilitaBotones(){
	document.querySelector('#botEmp').disabled=true;
	document.querySelector('#botCol').disabled=true;
	document.querySelector('#botDif').disabled=true;
	document.querySelector('#grosor').disabled=true;
    document.getElementById('uploadImage').disabled = true;
	document.querySelector('#botFin').disabled=false;
	document.querySelector('#botAyu').disabled=false;
}

//para visualizar antes de empezar
function previsualizar(e){
  //limpiar(e);
  arrays();
  copiarCanvas(arrayPiezas);
  dibujarCuadricula();
}

//dibuja cuadricula 
function dibujarCuadricula(){
	let cv = document.getElementById('cv02');
	let ctx = cv.getContext('2d');
	let d = document.querySelector('#botDif').value;

	ctx.beginPath();
	ctx.lineWidth = document.querySelector('#grosor').value;
	ctx.strokeStyle = document.querySelector('#botCol').value;

	let dimx = cv.width / difx;
	let dimy = cv.height / dify;

	//lineas verticales
	for(let i=1; i<difx; i++){

		ctx.moveTo(i * dimx, 0);
		ctx.lineTo(i * dimx, cv.height);
	}
	//lineas horizontales
	for(let i=1; i<dify; i++){

		ctx.moveTo(0, i * dimy);
		ctx.lineTo(cv.width, i * dimy);
	}
	ctx.stroke();
}

//Calcular posicion del raton dentro del copiar
function mouse_move(e){
  if(empezado){
    console.log("entro empezado");
    let d = document.querySelector('#botDif').value,
      cv = e.target,
  		x = e.offsetX,
  		y = e.offsetY,
  		dim = cv.width / difx,
      	dimy = cv.height / dify,
  		fila = Math.floor( y / dimy),
  		columna = Math.floor( x / dim);
  		 c2 = document.getElementById("cv02"),
       	 ctx2 = c2.getContext('2d');

  		if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
  			return;
  		}

      copiarCanvas();
      dibujarCuadricula();

      //Esto es el "hover"
      ctx2.strokeStyle = '#5858FA';
      ctx2.lineWidth = 4;
      ctx2.strokeRect(columna * dim, fila * dimy, dim, dimy);

      if(ef1!=null){
        //Esto es el "hover"
        ctx2.strokeStyle = 'green';
        ctx2.lineWidth = 4;
        ctx2.strokeRect(ec1 * dim, ef1 * dimy, dim, dimy);
      }

  	console.log(" Posicion: ${x} - ${y}");
  	console.log(' Posicion: '+ x +' - '+ y);
  	console.log('fila:'+fila+' columna:'+columna);
  }
}


function mouse_click(e){
  if(empezado){
    console.log(empezado);
  	let cv = e.target,
  		d = document.querySelector('#botDif').value,
  		x = e.offsetX,
  		y = e.offsetY,
  		dim = cv.width / difx,
      	dimy = cv.height / dify,
  		fila = Math.floor( y / dimy),
  		columna = Math.floor( x / dim),
  		 c2 = document.getElementById("cv02"),
       	 ctx2 = c2.getContext('2d');

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
  	ctx.strokeStyle = 'green';
  	ctx.lineWidth = 6;
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
          let tamanyoX = Math.floor(ctx2.canvas.clientWidth/difx);
          let tamanyoY = Math.floor(ctx2.canvas.clientHeight/dify);
           //intercambiamos las piezas:
  		//cogemos primer  trozo
  			imagen = ctx2.getImageData(ec1*tamanyoX, ef1*tamanyoY, tamanyoX,  tamanyoY);
  		//cogemos segundo trozo
  			imagen2 = ctx2.getImageData(ec2*tamanyoX, ef2*tamanyoY, tamanyoX,  tamanyoY);

  			//insertamos imagenes
  				variable=arrayPiezas[(dify*ec1)+ef1];
  				arrayPiezas[(dify*ec1)+ef1]=arrayPiezas[(dify*ec2)+ef2];
  				arrayPiezas[(dify*ec2)+ef2]=variable;

  			//esto sirver para que quede mejor, se queda el cambio ya hecho
  			//de otra manera, queda un poco raro
  				ctx2.putImageData(imagen, ec2*tamanyoX, ef2*tamanyoY);
  				ctx2.putImageData(imagen2, ec1*tamanyoX, ef1*tamanyoY);

  		//borramos coordenadas
  		ef1 = null;
  		ec1 = null;
  		ef2 = null;
  		ec2 = null;
  		variable = null;
  	}
  	if(comprobar()==0)
  		finalizar();
  }
}

function comprobar(){
	let d = document.querySelector('#botDif').value;
      let html = '';
  	  let c1 = document.getElementById("cv01"),
      ctx1 = c1.getContext('2d'),
      c2 = document.getElementById("cv02"),
      ctx2 = c2.getContext('2d'),
      imagen;
      malcolocadas=0;
      movimientos++;

      let cont = 0;
      for(let i=0; i<difx; i++){
        for(let j=0; j<dify; j++){

          let posx = Math.floor(arrayPiezas[cont]%difx);
          let posy = Math.floor(arrayPiezas[cont]/difx);
          let tamanyoX = Math.floor(ctx1.canvas.clientWidth/difx);
          let tamanyoY = Math.floor(ctx1.canvas.clientHeight/dify);


          if(arrayPiezas[cont] != ((cont*difx)%(difx*dify)+Math.floor((cont*difx)/(difx*dify))))
             malcolocadas++;
             cont++;
        }
      }

      html = '<section id="marcador"><div id="movimientos">Movimientos: '+Math.floor(movimientos/2)+'</div><div id="piezasmal">Mal colocadas: '+malcolocadas+'</div><div id="number"><p>Tiempo: '+tiempo+'<p></div></section>';

      document.getElementById("marcador").outerHTML = html;
      console.log(malcolocadas);
      return malcolocadas;
}
function aiuda(){
      let d = document.querySelector('#botDif').value;
  	  let c1 = document.getElementById("cv01"),
      ctx1 = c1.getContext('2d'),
      c2 = document.getElementById("cv02"),
      ctx2 = c2.getContext('2d'),
      imagen;
      ctx2.fillStyle = "red";


         console.log(arrayPiezas);
    		
      let cont = 0;
      for(let i=0; i<difx; i++){
        for(let j=0; j<dify; j++){

          let posx = Math.floor(arrayPiezas[cont]%difx);
          let posy = Math.floor(arrayPiezas[cont]/difx);
          let tamanyoX = Math.floor(ctx1.canvas.clientWidth/difx);
          let tamanyoY = Math.floor(ctx1.canvas.clientHeight/dify);

         //console.log((cont*difx)%(difx*dify)+Math.floor((cont*difx)/(difx*dify)));
          if(arrayPiezas[cont] != ((cont*difx)%(difx*dify)+Math.floor((cont*difx)/(difx*dify))))
              ctx2.fillRect(i*tamanyoX,j*tamanyoY,tamanyoX,tamanyoY);


          cont++;
        }
      }

}

//Limpiar canvas
function limpiar(e){
  let cv2 = document.getElementById("cv02");
  let ctx2 = cv2.getContext('2d');

  document.getElementById("piezasmal").innerHTML = '';
  document.getElementById("movimientos").innerHTML = '';
  document.getElementById("number").innerHTML = '';

  tiempo = 0;

  ctx2.clearRect(0, 0, cv2.width, cv2.height);

  return false;

}
