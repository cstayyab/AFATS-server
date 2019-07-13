var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var engineSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    qParam: {
        type: String,
        required: true
    }
});

Engine = mongoose.model('engines', engineSchema);


async function getAllEngines() {
    var resultset = await Engine.find();
    var engines = [];
    //console.log("Total Search Engines: " + resultset);
    resultset.forEach(e => {
        engine = {
            slug: e.slug,
            url: e.url,
            qParam: e.qParam
        };
        engines.push(engine);
    });
    return engines;
}

async function getEngine(slug) {
    allEngines = await getAllEngines();
    engine = null;
    allEngines.forEach((e) => {
        if(e.slug == slug) {
            engine = e;
        }
    });
    if(engine == null) {
        return null;
    }
    return {
        slug: engine.slug,
        url: engine.url,
        qParam: engine.qParam
    };
}


exports.getAllEngines = getAllEngines;
exports.getEngine = getEngine;