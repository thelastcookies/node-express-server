class resResult{
    constructor(status, data, errMsg){
        this.status = status;
        this.data = data;
        this.errMsg = errMsg;
    }
    setStatus (argu) {
        this.status = argu;
    }
    setData (argu) {
        this.data = argu;
    }
    setErrMsg (argu) {
        this.errMsg = argu;
    }
}

module.exports  = resResult;
