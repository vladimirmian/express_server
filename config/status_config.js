/*
    author:Chris.Chien
    define:This is for status config function
 */
const StatusInfo = {
    'success': 200,
    'Unauthorized': 401
}
let Statusfunc = class statusfunc {
    constructor(status, msg, datainfo) {
        this.status = status;
        this.msg = msg;
        this.datainfo = datainfo;
    }
    success() {
        let success = {
            status:this.status,
            data:this.datainfo
        }
        return success;
    }
    fail() {
        let fail = {
            status: this.status,
            msg: this.msg
        }
        return fail;
    }
}
module.exports = { Statusfunc,StatusInfo}