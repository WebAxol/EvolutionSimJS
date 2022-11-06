class Mutator {

    constructor(ecosystem){
        this.world = ecosystem.world;
        this.ecosystem = ecosystem;
        this.mutations;
    }

    init(){
        this.mutations = this.setUpMutations();
    }

    setUpMutations(mutationDetails = false){

        if(!mutationDetails){
            return; // No mutations
        }
        
        var species = Object.keys(this.ecosystem.species);
        var mutations = {};

        species.forEach(specieName => {

            let sensitivity = mutationDetails[specieName] ? mutationDetails[specieName].sensitivity || undefined : undefined;
            let maxSpeed    = mutationDetails[specieName] ? mutationDetails[specieName].maxSpeed    || undefined : undefined;

            mutations[specieName] = {
                sensitivity : {
                    probability : sensitivity.probability || 0,
                    maxChange   : sensitivity.maxChange   || 0,
                    minChange   : sensitivity.minChange   || 0
                },
                maxSpeed : {
                    probability : maxSpeed.probability    || 0,
                    maxChange   : maxSpeed.maxChange      || 0,
                    minChange   : maxSpeed.minChange      || 0
                }
            }
        });

        return mutations;
    }

    mutateOrganism(organism){

        if(!this.mutations) return;

        let sensitivityMutation = this.mutations[organism.specie].sensitivity;
        let maxSpeedMutation    = this.mutations[organism.specie].maxSpeed;


        if(Math.random() < sensitivityMutation.probability){
            organism.sensitivity += sensitivityMutation.minChange + Math.random() * (sensitivityMutation.maxChange - sensitivityMutation.minChange);
        }
        if(Math.random() < maxSpeedMutation.probability){
            organism.sensitivity += maxSpeedMutation.minChange    + Math.random() * (maxSpeedMutation.maxChange - maxSpeedMutation.minChange);
        }
    }

}