
//TODO : Unit Test 

class Renderer extends Service{

    constructor(context){

        super();

        if(!context) throw Error('No context given to Renderer contructor');
        this.context = context;
    }

    execute(){

        if(this.world.frame % 2 == 0) return;

        this.context.fillStyle = 'rgba(0,0,0,0.3)';
        this.context.fillRect(0,0,canvas.width,canvas.height);

        var renderables = this.world.getCollection('Renderables');

        renderables.forEach(element => {
            
            switch(element.shape){
                case 'Circle' : this.renderCircle(element);
                break;
                case 'Box' : this.renderBox(element);
                break;
            }

        });

    }

    renderCircle(circle){

        if((circle.pos.x && circle.pos.y) === undefined){
            throw Error('Invalid position vector given to the circle');
        }

        this.context.lineWidth = circle.lineWidth | 1;
        this.context.fillStyle = circle.background;

        this.context.beginPath();

        this.context.arc(
            circle.pos.x,
            circle.pos.y, 
            circle.radius, 
            0, 2 * Math.PI
        );

        if(circle.stroke){
            this.context.strokeStyle = circle.stroke;
            this.context.stroke();
        }

        this.context.fill();
    }

    renderBox(box){

        this.context.fillStyle = box.background || 'white';

        if((box.pos.x && box.pos.y) === undefined){
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