const ERRORS = {
    'internalError' : {
        status  : 500, 
        message : 'Sorry, there has been an internal mistake'
    },
    'invalidDataSupplied' : {
        status  : 400,
        message : 'The information supplied is not valid, or is incomplete'
    },
    'dataStorageError' : {
        status  : 500,
        message : 'Sorry, we could not store your information'
    }
}

class ErrorHandler {

    static handleError(errorType, res){

        if(!res || !errorType) return false;

        try{
            var errors = this.prototype.errors;
    
            if(errors[errorType]){
    
                return res.status(errors[errorType].status).send({ 
                    error : errors[errorType].message
                });
            }
        }catch(err){
            res.status(500).send({ 
                error : 'Sorry, there has been an internal error'
             });
        }
    }
}

ErrorHandler.prototype.errors = ERRORS;

export default ErrorHandler;