
//TODO: change into module and use the UI elements already imported; for now, we will need to declare our elements again, which violates DRY

const _UI = {
    experimentSelectionContainer : $('#experimentSelectionContainer'),
    canvasContainer : $('#canvasContainer')
};

const  __experimentChosenHandler__ = (experiment) => {
    try{
        _UI.canvasContainer.show(500);
        _UI.experimentSelectionContainer.hide(500);
        console.log(experiment);

        let init = new Init();
        
        init.prepareAndRunSimulation(experiment);
 

    }catch(err){
        console.error(err);
        //throw Error('experimentChosenHandler failed');
    }
};
