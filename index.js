let express = require('express');
let bodyParser = require('body-parser');
const app = express();
let mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
mongoose.connect(`mongodb://${process.env.MDB_USER}:${process.env.MDB_PWD}@${process.env.MDB_HOST}:${process.env.MDB_PORT}/${process.env.MDB_NAME}`, { useNewUrlParser: true });
console.log(`mongodb://${process.env.MDB_USER}:${process.env.MDB_PWD}@${process.env.MDB_HOST}:${process.env.MDB_PORT}/${process.env.MDB_NAME}`);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.redirect('/api/');
});

app.get('/api/', (req, res) => {
    res.status(200).json({
        success: 'true',
        message: 'API Server is up and running'
    });
});
let apiv1routes = require('./apiv1');
app.use('/api/v1', apiv1routes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`AFATS API server runing on port ${PORT}`);
});