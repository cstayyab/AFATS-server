let v1 = require('express').Router();
let user = require('./v1/user');
let engine = require('./v1/engine');

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
    .put((req, res) => {
        if(req.body.slug !== undefined || req.body.slug == "") {
            engine.getEngine(req.body.slug).then(data => {
                if (data == null) {
                    res.status(404).json({error: "Search Engine Not Found"});
                } else {
                    user.updateDefaultEngine(req.body.hash, req.body.slug).then(data => {
                        res.status(200).json(data);
                    });
                }
            });

        } else {
            res.status(404).json({error: "Search Engine Not Found"});
        }
    });
v1.route(('/user/quicklinks'))
    .post((req, res) => {

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
    });
v1.route('/searchengine')
    .get((req, res) => {
        if (req.body.slug === undefined) {
            engine.getAllEngines().then((data) => {
                res.status(200).json(data);
            });
        } else {
            engine.getEngine(req.body.slug).then(data => {
                if(data === null) {
                    res.status(404).json({error: "Engine Not Found"});
                } else {
                    res.status(200).json(data);
                }
            });
        }
    });
module.exports = v1;