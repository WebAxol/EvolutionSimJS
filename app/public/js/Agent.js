class Agent {

    constructor(details){

        this.pos   = details.pos
        this.vel   = {x : 0, y : 0 } 
        this.maxSpeed = 5;
        this.sensitivity = details.sensitivity; 
        this.state  = 'SeekFood';
        this.energy = 100;

    }
}