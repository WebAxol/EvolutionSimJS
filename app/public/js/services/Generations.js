class Generations extends Service{

    constructor(){
        super();
        this.generation = 1;
    }

    ongenerationOver(details){
        console.log(`Generation ${this.generation} finished, starting generation ${this.generation + 1}`);
        this.generation++;
    }

}