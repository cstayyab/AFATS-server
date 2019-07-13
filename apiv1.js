let v1 = require('express').Router();
let user = require('./user');
let engine = require('./engine');

v1.get('/', (req, res) => {
    res.status(200).json({
        'version': 'v1'
    });
});

v1.route('/user')
    .get((req, res) => {
        user.getUser(req.body.hash).then((data) => {
            res.status(200).json(data);
        });
    });
v1.route('/user/defaultengine')
    .put((req,res) => {

    });
v1.route(('/user/quicklinks'))
    .get((req, res) => {

    }).post((req, res) => {

        user.addQuickLink(req.body.hash, req.body.url, req.body.title, req.body.description).then(data => {
            res.status(200).json(data);
        });
        
    }).delete((req, res) => {
        user.deleteQuickLink(req.body.hash, req.body.slug).then(data => {
            res.status(200).json(data);
        });

    }).put((req, res) => {
        user.updateQuickLink(req.body.hash, req.body.slug, req.body.title, req.body.description).then(data => {
            res.status(200).json(data);
        });
    }) ;
v1.route('/searchengine')
    .get((req, res) => {
        engine.getAllEngines().then((data) => {
            res.status(200).json(data);
        });
    });
module.exports = v1;