class Statistics extends Service{
    
    constructor(ecosystem){
        super();
        this.ecosystem = ecosystem;
    }

    createSummary(){
        
        var summary  = {};
        var specieNames = Object.keys(this.ecosystem.getAllSpecies()); 

        specieNames.forEach(specieName => {

            summary[specieName] = this.ecosystem.getPopulationOf(specieName);
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