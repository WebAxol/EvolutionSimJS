class SummaryMaker extends Service{
    constructor(){
        super();
    }

    createSummary(){
        
        var summary  = {};
        var specieNames = Object.keys(ECOSYSTEM.species); 

        specieNames.forEach(specieName => {
            let specie = this.world.getCollection(specieName);
            summary[specieName] = {
                population : specie.length
            }; 
        });

        console.log('%c Summary Created ','background: #222; color: #bada55');
        console.table(summary);
        return summary;

    }

    

    // EVENTS

    ongenerationOver(){
        let summary = this.createSummary();
        ECOSYSTEM.history.push(summary);
        this.world.notifyEvent('summaryCreated');
    }

}