class SummaryMaker extends Service{
    
    constructor(ecosystem){
        super();
        this.ecosystem = ecosystem;
    }

    createSummary(){
        
        var summary  = {};
        var specieNames = Object.keys(this.ecosystem.species); 

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
        this.ecosystem.history.push(summary);
        this.world.notifyEvent('summaryCreated');
    }

}