                      // Nando 



const canvas = document.getElementById('main')
const ctx = canvas.getContext('2d')


//Para dibujar un cuadrado lleno
// ctx.fillRect(x, y, width, height)
ctx.fillStyle = 'purple'
ctx.globalAlpha = 0.2
ctx.fillRect(0, 40, 100, 100)

ctx.fillStyle = 'red'
ctx.fillRect(70, 40, 100, 100)
//Para dibujar un cuadrado (solo contornos)
// ctx.strokeRect(x, y, width, height)
ctx.strokeRect(100, 200, 100, 100)

//Para dibujar un cuadrado "invisible" 
ctx.clearRect(10, 50, 30, 30)

//TEXTO
ctx.globalAlpha = 1
ctx.fillStyle = 'black'
ctx.font = '50px serif'
ctx.textAlign = 'center'
// ctx.fillText('GAME OVER', 250, 250)


//IMAGENES

//1. Crear una instancia de la clase Image y guardarlo en una variable
// const img = new Image()

//2. Asignar el src a la imagen
// img.src = "./images/pumpkin.png"

//3. Ejecutar el contenido de la callback function cuando (y SOLO cuando) la imagen haya cargado
// img.onload = ()=>{
  //4. Dibujar imagen
  // ctx.drawImage(img, 0, 0, 100, 130)
// }

// const img2 = new Image()

// img2.src = './images/zenitsu.png'

// img2.onload = ()=>{
//   ctx.drawImage(img2, 200, 100, 100, 130)
// }

const loadedImages = {}

const imageLinks = [ //Array de objetos con los enlaces (y los nombres para identificarlos) de todas mis imagenes
  {link: "./images/pumpkin.png", name: 'pumpkin'},
  {link: "./images/zenitsu.png", name: 'zenitsu'},
  {link: "./images/apple.png", name: 'apple'},
]

let counterForLoadedImages = 0; //Contador de imagenes cargadas

imageLinks.forEach((imagen)=>{ //Itero sobre todos los enlaces dentro del array de imageLinks. Cada enlace lo voy a recibir dentro del loop en el parámetro de url
  const img = new Image() //Creo un objeto de una imagen (paso 1 para crear una imagen en canvas)
  img.src = imagen.link //Le asigno el url (paso 2 para crear una imagen en canvas)
  img.onload = ()=>{ //Ejecuto el callback function cuando la imagen haya cargado (paso 3)
    counterForLoadedImages++ //Le sumo uno a el contador de imagenes cargadas. Esta linea solo se va a ejecutar cuando la imagen haya cargado
    // loadedImages[imageLinks.name] = imagen.url
    loadedImages[imagen.name] = img
    if(imageLinks.length === counterForLoadedImages){ //reviso si el contador es igual a el numero de urls que tengo en el array de imageLinks. Si es igual, significa que todas mis imagenes han cargado, y por lo tanto, veré el console.log() de que todas mis imagenes han cargado
    }
  }
})

const pumpkinButton = document.getElementById('pumpkin')
const zenitsuButton = document.getElementById('zenitsu')

// pumpkin.onclick = ()=>{
//   ctx.drawImage(loadedImages.pumpkin, 200, 100, 100, 130)
// }

// zenitsu.onclick = ()=>{
//   ctx.drawImage(loadedImages.zenitsu, 100, 50, 100, 130)
// }






//CLASSES
class Pumpkin {
  constructor(){
    this.x = 0;
    this.y = 150;
    this.speedX = 0;
    this.speedY = 0;
    this.width = 100;
    this.height = 130;
  }
}

const pumpkin = new Pumpkin()

let score = 0;

class Apple {
  constructor(){
    this.eaten = false;
    this.x = Math.floor(Math.random() * 451);   // 0 y 450
    this.y = Math.floor(Math.random() * 451); ;    // 0 y 450
    this.width = 40;
    this.height = 40;
  }

  drawApple(){
    ctx.drawImage(loadedImages.apple, this.x, this.y, this.width, this.height)
  }

  checkForEatenApple(){

    const bothInX = (this.x - 50) < pumpkin.x && this.x > pumpkin.x
    const bothInY = (this.y - 70) < pumpkin.y && this.y > pumpkin.y
    
    if( bothInX && bothInY ){ 
      // appleSound.play()
      this.eaten = true
      score++;
      document.getElementById('score').innerText = score
    }
  }
}
let arrayOfApples = []

const createApples = ()=>{
  for(let i = 0; i < 5; i++){
    const apple = new Apple()
    arrayOfApples.push(apple)
  }
}

createApples()

const checkForEatenApples = ()=>{
  arrayOfApples.forEach((apple)=>{
    apple.checkForEatenApple()
  })
}

const drawApples = ()=>{
  arrayOfApples.forEach((apple)=>{
    ctx.drawImage(loadedImages.apple, apple.x, apple.y, apple.width, apple.height)
  })
}

const deleteApple = ()=>{
  arrayOfApples = arrayOfApples.filter((apple)=>{
    return !apple.eaten
  })
}


//EVENT LISTENERS

let appleSound = ''

window.addEventListener('load', ()=>{
  appleSound = new Audio('./sounds/apple-bite.mp3')
  appleSound.preload = 'auto'
  appleSound.load()
})

document.addEventListener('keydown', (event)=>{
  if(event.key === "ArrowRight"){
    pumpkin.speedX = 3
  } else if(event.key === "ArrowLeft"){
    pumpkin.speedX = -3
  } else if(event.key === "ArrowUp"){
    pumpkin.speedY = -3
  } else if(event.key === "ArrowDown"){
    pumpkin.speedY = 3
  }
})

document.addEventListener('keyup', (event)=>{
  if(event.key === "ArrowRight" || event.key === "ArrowLeft"){
    pumpkin.speedX = 0
  }
  if(event.key === "ArrowUp" || event.key === "ArrowDown"){
    pumpkin.speedY = 0
  }
})

//FUNCTIONS
const drawPumpkin = ()=>{
  ctx.drawImage(loadedImages.pumpkin, pumpkin.x, pumpkin.y, pumpkin.width, pumpkin.height)
}

const checkIfInBounds = ()=>{
  if(pumpkin.x > 410){
    pumpkin.x = 410
  }

  if(pumpkin.x < 0){
    pumpkin.x = 0
  }

  if(pumpkin.y < 0){
    pumpkin.y = 0
  }

  if(pumpkin.y > 370){
    pumpkin.y = 370
  }
}

const updatePumpkin = ()=>{
  pumpkin.x += pumpkin.speedX
  pumpkin.y += pumpkin.speedY
  checkIfInBounds()
}

const clearCanvas = ()=>{
  ctx.clearRect(0, 0, 600, 600)
}

const updateApples = ()=>{
  deleteApple()
  checkForEatenApples()
}

const updateCanvas = ()=>{ 
  if(imageLinks.length === counterForLoadedImages){
    clearCanvas()

    updatePumpkin()
    updateApples()

    drawApples()
    drawPumpkin()
  }
  requestAnimationFrame(updateCanvas) //Activa un loop infinito. Este loop va a la velocidad de la tasa de refresco de la pantalla en la que se está viendo el juego. Le vamos a pasar como argumento la función donde estamos llamando al requestAnimationFrame (en este caso, updateCanvas)
}

updateCanvas()