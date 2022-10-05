class TreeObject{

    #children;

    constructor(){
        this.#children = {};
    }

    addChild(name,node){

        if(!name || !node) return;
        

        if(this.#children[name]){
            console.warn(`Cannot register child with name '${name} : it is already registered'`);
            return;
        }

        let childNode = this.#children[name] = node;
        return childNode;

    }

    removeChild(name){

        if(!name) return;

        if(this.#children[name]){
            console.warn(`Cannot remove child with name '${name}', as it does not exist`);
            return; 
        }

        delete this.#children[name];

    }

    getChild(name){

        if(!name) return;

        if(!this.#children[name]){
            console.warn(`Cannot get child with name '${name} : it does not exist'`);
            return;
        }

        return this.#children[name];

    }

}