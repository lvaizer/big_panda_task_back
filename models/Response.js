class Response {
    constructor(status, data = {}) {
        this.status = status;
        this.data = data;
        if (!status) this.showLog();
    }

    showLog = () => {
        try {
            console.error('------------------- ERROR -------------------');
            console.error(new Date());
            console.trace();
            if (this.data) {
                console.error('Data: ');
                console.error(this.data);
            }
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = Response;
