
class Organism extends Service{

     // subordinate modules

     #organismTargeter; // sets prey and predator targets of each participating organism (not counting inert organisms which dont interact: producers).
     #organismBehaviour // handles interactions between each organism: hunting, fleeing, etc.
     #organismPurger;   // removes organisms from their active lists once they are eliminated or saved. This is not done directly; the CollectionManager does it.
 
     constructor(ecosystem){
        super();

        this.#organismTargeter  = new OrganismTargeter(this); 
        this.#organismBehaviour = new OrganismBehaviour(this); 
        this.#organismPurger    = new OrganismPurger(this); 
     
        this.ecosystem = ecosystem;
        this.isGenerationOver = false;
        this.hasNotifiedGenOver = false;
    }

    execute(){

        if(this.isGenerationOver === true){
          
          if(this.hasNotifiedGenOver === false){
            this.hasNotifiedGenOver = true;
            this.world.notifyEvent('generationOver');
          } 
          
          return;
        }

        this.#organismTargeter.executeAsSubordinate(); 
        this.#organismBehaviour.executeAsSubordinate();
        this.#organismPurger.executeAsSubordinate();
    }

    generationEnded(){
      this.world.notifyEvent('generationOver');
    }

      // Events

    onorganismOutOfEnergy(details){
      this.#organismPurger.onorganismOutOfEnergy(details);
    }

    onorganismHunted(details){ 
      // submodules are not registered to world, just stored at their chief module, so they dont receive the event notifications directly
      this.#organismPurger.onorganismHunted(details);
    }

    onagentOutOfCanvas(details){
      this.#organismPurger.onagentOutOfCanvas(details);
    }

    onnewGenerationReady(){
        this.isGenerationOver = false;
        this.hasNotifiedGenOver = false;

        console.log('ready');
        console.log(this.hasNotifiedGenOver);
    }

}