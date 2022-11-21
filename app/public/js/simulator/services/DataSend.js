class DataSend extends Service{

    constructor(ecosystem){
        super();
        this.ecosystem = ecosystem;
    }

    async sendData(){

        var data = this.ecosystem.history;

        var request = await fetch('/api/ecosystem' , {
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        });
    }
}