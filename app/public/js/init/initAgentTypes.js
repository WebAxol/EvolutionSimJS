WORLD.registerAgentType('Organism', {
    info: {
        pos : {x : 0, y : 0},
        vel : {x : 0, y : 0},
        wander  :  true,
        foodFee   : 1,  
        foodCount : 0,

        energy      : 30000,
        maxSpeed    : 0,
        sensitivity : 0
    },

    collections : ['Kinetics']
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
