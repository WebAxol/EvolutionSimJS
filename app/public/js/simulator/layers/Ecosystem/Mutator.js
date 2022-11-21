// TODO: Test and refactor code

class Mutator {

    constructor(ecosystem){
        this.world = ecosystem.world;
        this.ecosystem = ecosystem;
        this.mutations;
    }

    init(mutationDetails){
        this.mutations = this.setUpMutations(mutationDetails);
    }

    setUpMutations(mutationDetails){

        if(!mutationDetails){
            return; // No mutations
        }
        
        var species = Object.keys(this.ecosystem.getAllSpecies());
        var mutations = {};

        species.forEach(specieName => {

            if(mutationDetails[specieName]){

                let sensitivity = mutationDetails[specieName].sensitivity || {};
                let maxSpeed    = mutationDetails[specieName].maxSpeed    || {};
    
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
            }
        });

        return mutations;
    }

    mutateOrganism(organism){

        if(!this.mutations || !this.mutations[organism.specie]) return;

        let sensitivityMutation = this.mutations[organism.specie].sensitivity || undefined;
        let maxSpeedMutation    = this.mutations[organism.specie].maxSpeed || undefined;


        if(sensitivityMutation && sensitivityMutation.probability && Math.random() < sensitivityMutation.probability){

            organism.sensitivity += Math.round(
                (sensitivityMutation.minChange || 0) + Math.random() * ((sensitivityMutation.maxChange || 0) - (sensitivityMutation.minChange || 0))
            );

            TreeObject.getChild(organism,'sensitivityRange').radius = organism.sensitivity;
        }

        if(maxSpeedMutation    && maxSpeedMutation.probability && Math.random() < maxSpeedMutation.probability){

            organism.maxSpeed += Math.round((maxSpeedMutation.minChange || 0) + Math.random() * ((maxSpeedMutation.maxChange || 0) - (maxSpeedMutation.minChange || 0)));
        }
    }
}