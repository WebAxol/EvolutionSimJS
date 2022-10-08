class TreeObject{

    static addChild(tree,name,node){

        if(!name || !node) return;
        

        if(tree._children[name]){
            console.warn(`Cannot register child with name '${name} : it is already registered'`);
            return;
        }

        let childNode = tree._children[name] = node;
        return childNode;

    }

    static removeChild(tree,name){

        if(!name) return;

        if(tree._children[name]){
            console.warn(`Cannot remove child with name '${name}', as it does not exist`);
            return; 
        }

        delete tree._children[name];

    }

    static getChild(tree,name){

        if(!name) return;

        if(!tree._children[name]){
            console.warn(`Cannot get child with name '${name} : it does not exist'`);
            return;
        }

        return tree._children[name];

    }

}