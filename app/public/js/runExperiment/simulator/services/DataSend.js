class DataSend extends Service{

    constructor(ecosystem){
        super();
        this.ecosystem = ecosystem;
    }

    async sendData(){

        var data = this.ecosystem.history;

        var request = await fetch('/api/result' , {
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({

                // NOTE: there is coupling between the Datasend module and EXPERIMENT_DETAILS

                experimentID : EXPERIMENT_DETAILS.id,
                results : data,
                date : new Date()
            })
        });
    }

    onsimulationOver(){
        this.sendData();
    }
}