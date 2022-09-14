'use strict';

//TODO : Unit Test 

class MainLoop{

    constructor(callback){
        this.execute = callback;
    }

    start(){
        requestAnimationFrame(this.start);    
        this.execute();
    }
}
