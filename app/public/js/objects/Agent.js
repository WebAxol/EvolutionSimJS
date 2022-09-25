class Agent extends TreeObject{

    constructor(details){

        super();


        this.pos   = details.pos
        this.vel   = {x : 0, y : 0 } 


        // Evolutive attributes

        this.energy = 100;
        this.maxSpeed = 5;
        this.sensitivity = details.sensitivity | 50; 
        this.state  = 'SeekFood';
    }
}