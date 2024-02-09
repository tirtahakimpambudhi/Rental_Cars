class Response_Error extends Error {
    constructor(status,message){
        super(message)
        this.status = status
    }
}

module.exports=Response_Error