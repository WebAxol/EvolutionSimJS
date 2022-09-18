class Agent {

    constructor(details){

        this.pos   = details.pos
        this.dir   = {x : 0, y : 0 } 
        this.speed = details.speed;
        this.sensitivity = details.sensitivity; 
        this.state  = 'seekFood';
        this.energy = 100;

    }
}