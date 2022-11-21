const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const WORLD = new World();
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
            }
        },
    
        "mutations" : {
            "PrimaryConsumerA" : {
                "sensitivity" : {
                    "probability" : 0.3,
                    "minChange"   : -20,
                    "maxChange"   : 20
                },
                "maxSpeed" : {
                    "probability" : 0.3,
                    "minChange"   : -1,
                    "maxChange"   : 1
                }
            }
        }, 
    
        "foodWeb" :  {
            "PrimaryConsumerA" : { "ProducerA" : 1 },
            "PrimaryConsumerB" : { "ProducerA" : 1 },
        },
    
    }
);

console.log(ECOSYSTEM);