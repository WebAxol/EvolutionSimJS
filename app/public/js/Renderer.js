
//TODO : Unit Test 

class Renderer {

    constructor(context){

        if(!context) throw Error('No context given to Renderer contructor');

        this.context = context;
    }

    renderCircle(circle){

        if(!(circle.pos.x && circle.pos.y)){
            throw Error('Invalid position vector given to the circle');
        }

        this.context.strokeStyle = 'white';
        this.context.fillStyle = circle.background;

        this.context.beginPath();

        this.context.arc(
            circle.pos.x,
            circle.pos.y, 
            circle.radius, 
            0, 2 * Math.PI
        );

        this.context.stroke();
        this.context.fill();
        //this.context.closePath(); 
    }

    renderBox(box){

        this.context.fillStyle = box.background || 'white';

        if(!(box.pos.x && box.pos.y)){
            throw Error('Invalid position vector given to box', box);
        }

        this.context.fillRect(
            box.pos.x,
            box.pos.y,
            box.width,
            box.height  
        );

        console.log('Box drawn')
    }
}