const prod = {
    URLS: {
        MONGO_URL: 'mongodb+srv://big_panda_user:B1gP@nda@cluster0.nyzdl.mongodb.net/big_panda_task?retryWrites=true&w=majority'
    },
    PORT: 8080
};

const stage = {
    URLS: {
        MONGO_URL: 'mongodb+srv://big_panda_user:B1gP@nda@cluster0.nyzdl.mongodb.net/big_panda_task?retryWrites=true&w=majority'
    },
    PORT: 8081
};

const dev = {
    URLS: {
        MONGO_URL: 'mongodb://localhost:27017/big_panda_task'
    },
    PORT: 8888
};

module.exports = (process.env.NODE_ENV === 'dev' ? dev : process.env.NODE_ENV === 'stage' ? stage : prod);
