Init.prototype.initAgentTypes = () => {

    //NOTE: It would be better to have explicit data types for each field, as that would make agents less prone to having fields with incorrect data 

    WORLD.registerAgentType('Consumer', {
        info: {
            pos       : new Vector2D(0,0),
            vel       : new Vector2D(0,0),
            age       : 0, 
            lifespan  : 3,
            active    :  true,
            wander    :  true,
            foodFee   : 1,  
            foodCount : 0,
            maxEnergy   : 30000,
            energy      : 30000,

            /* For movement algorithms */

            // used to choose which prey to chase

            targetPrey             : undefined,
            shortestDistanceToPrey : undefined,
            shortestVectorToPrey   : undefined,

            // used to choose which predator to escape from

             targetPredator             : undefined,
            shortestDistanceToPredator  : undefined,
            shortestVectorToPredator    : undefined,

            // inheritable traits

                maxSpeed    : 0,
                sensitivity : 0
        },
    })

    WORLD.registerAgentType('Producer', {
        info: {
            pos       : {x : 0, y : 0},
            age       : 0, 
            lifespan  : 3,
            active    :  true,

        },
    })

    WORLD.registerAgentType('Circle', {
        info: {
            shape : 'Circle',
            pos : {x : 0, y : 0},
            radius : 10,
            background : 'red'
        },

        collections : ['Renderables']
    });
}