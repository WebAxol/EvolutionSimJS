WORLD.registerAgentType('Organism', {
    info: {
        pos : {x : 0, y : 0},
        vel : {x : 0, y : 0}, 
        wander :  true,
        foodCount : 0,

        energy      : 30000,
        maxSpeed    : 0,
        sensitivity : 0
    }
})

WORLD.registerAgentType('Circle', {
    info: {
        pos : {x : 0, y : 0},
        radius : 10,
        background : 'red'
    },

    collections : ['Renderables']
});