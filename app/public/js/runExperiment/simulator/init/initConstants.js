const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const WORLD = new World();

/*
const ECOSYSTEM = new Ecosystem(WORLD, 
    {
        "species" :  {
            "ProducerA" : {
                "populationLimit": 1000,
                "lifespan": 3,
                "colorA" : "lawngreen",
                "maxSpeed" : 0,
                "minSpeed" : 0,
                "maxSense" : 0,
                "minSense" : 0,
                "foodFee"  : 0
            },
            "ProducerB": {
                "populationLimit": 1000,
                "lifespan": 3,
                "colorA" : "yellow",
                "maxSpeed" : 0,
                "minSpeed" : 0,
                "maxSense" : 0,
                "minSense" : 0,
                "foodFee"  : 0
            },
            "PrimaryConsumerA": {
                "lifespan" : 3,
                "colorA" : "skyblue",
                "colorB" : "rgba(0,0,255,0.1)",
                "maxSpeed" : 5,
                "minSpeed" : 5,
                "maxSense" : 100,
                "minSense" : 100,
                "foodFee"  : 1
            },
            "PrimaryConsumerB": {
                "lifespan" : 3,
                "colorA" : "violet",
                "colorB" : "rgba(255,0,255,0.1)",
                "maxSpeed" : 5,
                "minSpeed" : 5,
                "maxSense" : 100,
                "minSense" : 100,
                "foodFee"  : 1
            },
            "PrimaryConsumerC": {
                "lifespan" : 3,
                "colorA" : "orange",
                "colorB" : "rgba(255,100,0,0.1)",
                "maxSpeed" : 5,
                "minSpeed" : 5,
                "maxSense" : 100,
                "minSense" : 100,
                "foodFee"  : 1
            }
        },
    
        "mutations" : {}, 
    
        "foodWeb" :  {
            "PrimaryConsumerA" : { "ProducerA" : 1 },
            "PrimaryConsumerB" : { "ProducerB" : 1 },
            "PrimaryConsumerC" : { "ProducerB" : 1, "ProducerA" : 1 }
        },
    
    }
);
*/