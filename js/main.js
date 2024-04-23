const canvas=document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//Obtiene las dimenciones de la pantalla actual 
const window_height=window.innerHeight;
const window_width=window.innerWidth;

//El canvas tiene las mismas dimenciones que la pantalla 
canvas.height=window_height;
canvas.width=window_width;

canvas.style.background='#ff8';

class Circle{
    constructor(x, y, radius, color, text, speed){
        this.posX= x;
        this.posY= y;
        this.radius= radius;
        this.color= color;
        this.text=text;

        this.speed=speed;
        this.dx=1*this.speed;
        this.dy=1*this.speed;
    }

    draw(context){
        context.beginPath();

        context.strokeStyle=this.color; //para el color 
        context.textAlign = "center";
        context.textBaseLine="middle";
        context.font='18px Arial';
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth=5; //para el grosor del circulo 
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI*2, false);
        context.stroke();
        context.closePath();
    }

    update(context){
        //context.clearRect(0,0, window_width, window_height);

        this.draw(context);//dibuja el circulo
        
        //Si el circulo supera el margen derecho se mueve a la izquierda
        if(this.posX + this.radius>window_width){ 
            this.dx=-this.dx;
        }

        //Si el circulo supera el margen izquierdo se mueve a la derecha
        if(this.posX - this.radius<0){ 
            this.dx=-this.dx;
        }

        //Si el circulo supera el margen derecho se mueve a la izquierda
        if(this.posY - this.radius<0){ 
            this.dy=-this.dy;
        }

        //Si el circulo supera el margen izquierdo se mueve a la derecho
        if(this.posY + this.radius>window_height){ 
            this.dy=-this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

let arrayCircle=[];
/*
for(let i=0; i<10; i++){

    let randomX = Math.random() * window_width;//pocision en x
    let randomY = Math.random() * window_height;//posicion en y

    let randomRadius = Math.floor(Math.random() * 100 + 5);//Tamaño

    let miCirculo=new Circle(randomX, randomY, randomRadius, 'green', i+1);
    //Agrega el objeto al array 
    arrayCircle.push(miCirculo);
    arrayCircle[i].draw(ctx);

}*/


// Crear los círculos
for (let i = 0; i < 20; i++) {
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomRadius = Math.floor(Math.random() * 100 + 10);
    let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

    let newCircle = new Circle(randomX, randomY, randomRadius, randomColor, `Tec${i+1}`, 3);
    arrayCircle.push(newCircle);
    newCircle.draw(ctx);
}

// Función de actualización para animar los círculos
function updateCircle() {
    ctx.clearRect(0, 0, window_width, window_height);

    for (let i = 0; i < arrayCircle.length; i++) {
        arrayCircle[i].update(ctx);
    }

    requestAnimationFrame(updateCircle);
}

// Iniciar la animación
updateCircle();