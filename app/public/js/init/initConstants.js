const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const WORLD = new World();
const ECOSYSTEM = new Ecosystem(WORLD, 
    {
        species :  {
            'Producers': {
                populationLimit : 500,
                colorA : 'lawngreen',
                colorB : 'rgba(0,255,0,0.1)',
                maxSpeed : 0,
                minSpeed : 0,
                maxSense : 10,
                minSense : 0,
                foodFee  : 0
            },
            'SpecieA': {
                populationLimit : 500,
                colorA : 'skyblue',
                colorB : 'rgba(0,0,255,0.1)',
                maxSpeed : 5,
                minSpeed : 5,
                maxSense : 100,
                minSense : 100,
                foodFee  : 1
            },
            'SpecieB': {
                populationLimit : 500,
                colorA : 'red',
                colorB : 'rgba(255,0,0,0.1)',
                maxSpeed : 8,
                minSpeed : 7,
                maxSense : 100,
                minSense : 100,
                foodFee  : 1
            }
        },

        mutations: {
            'SpecieA' : {
                sensitivity : {
                    probability : 1,
                    minChange : - 20,
                    maxChange :   20
                },
    
                maxSpeed : {
                    probability : 0.5,
                    minChange   : -1,
                    maxChange   : 2
                }
            }
        }, 

        foodWeb :  {
            'SpecieA' : { 'Producers' : 1 },
            'SpecieB' : { 'SpecieA' : 1 }
        }
    }
);

console.log(ECOSYSTEM);