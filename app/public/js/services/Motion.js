class Motion extends Service{

    constructor(){
        super();
    }

    execute(){
        var kinetic = this.world.getCollection('Kinetics');

        kinetic.forEach( object => {
            object.pos.add(object.vel);
        });
    }

}