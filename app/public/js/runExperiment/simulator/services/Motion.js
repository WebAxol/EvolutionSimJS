class Motion extends Service{

    constructor(){
        super();
    }

    execute(){

        var kinetic = this.world.getCollection('Kinetics');
        var outOfCanvas;

        kinetic.forEach( object => {

            // Update object position

            object.pos.add(object.vel);
            // Check if object went out of canvas, if so, notify as event

            outOfCanvas = false;

            if(object.pos.y < 0){
                outOfCanvas = true;
                object.pos.y = canvas.height;
            }
    
            else if(object.pos.y > canvas.height){
                outOfCanvas = true;
                object.pos.y = 0;
            }
    
            if(object.pos.x < 0){
                outOfCanvas = true;
                object.pos.x = canvas.width;
            }
    
            else if(object.pos.x > canvas.width){
                outOfCanvas = true;
                object.pos.x= 0;
            }

            if(outOfCanvas){
                this.world.notifyEvent('agentOutOfCanvas',{ agent : object });
            }
        });
    }
}