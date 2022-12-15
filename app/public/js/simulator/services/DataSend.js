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
                experimentID : '1234',
                results : data,
                date : new Date()
            })
        });
    }

    onsimulationOver(){
        this.sendData();
    }
}