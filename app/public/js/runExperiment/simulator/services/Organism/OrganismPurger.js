class OrganismPurger extends Service{

    #chief;

    constructor(chiefModule){
        super();
        this.#chief = chiefModule;
    }

    eliminate(organism){
        organism.active = false;
        this.#chief.world.removeAgent(organism);
    }

    save(organism){

        this.#chief.world.removeFromCollection(`Active${organism.specie}`, organism);

        organism.active = false;
        organism.vel.x = 0;
        organism.vel.y = 0;
    }

    // called directly by the chief module, not by the EventManager

    onorganismOutOfEnergy(details){
        let organism = details.organism;
        this.eliminate(organism);
    }

    onorganismHunted(details){
        let hunter = details.hunter;
        let hunted = hunter.targetPrey;

        if(hunted.active){
            hunter.foodCount++;
            hunter.energy += 30000
            this.eliminate(hunted);
        }
    }

    onagentOutOfCanvas(details){
        let organism = details.agent;

        if(organism.foodCount >= organism.foodFee){
            this.save(organism);
        }
    }
}