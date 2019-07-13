var mongoose = require('mongoose');
var md5 = require('md5');
var uuidv4 = require('uuid/v4');
var slugify = require('slug-generator');
mongoose.set('useFindAndModify', false);
var linkSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

var userSchema = mongoose.Schema({
    guid: {
        type: String,
        required: true
    },
    dEngine: {
        type: String,
        required: true
    },
    qLinks: {
        type: [linkSchema]
    }
});

User = mongoose.model('users', userSchema);
Link = mongoose.model('links', linkSchema);

defaultUser = {
    guid: null,
    dEngine: 'DuckDuckGo',
    qLinks: []
};

function calculateHash(u) {
    data = {
        guid: u.guid,
        dEngine: u.dEngine,
        qLinks: []
    };
    u.qLinks.forEach(e => {
        link = {
            slug: e.slug,
            url: e.url,
            title: e.title,
            description: e.description
        };
        data.qLinks.push(link);
    });
    return md5(JSON.stringify(data));
}

async function getUserByHash(hash) {
    var users = await User.find();
    //console.log("Total Users: " + users.length);
    found = null;
    users.map(u => {
        if (calculateHash(u) == hash) {
            found = data;
        }
    });
    if (found == null) {
        return null;
    } else {
        return found;
    }
}

exports.getUser = async function (hash) {
    user = await getUserByHash(hash);
    if (user !== null) {
        return user;
    } else {
        newUser = new User();
        newUser.guid = uuidv4();
        newUser.dEngine = "DuckDuckGo";
        newUser.qLinks = [];
        saved = await newUser.save();
        return { hash: calculateHash(newUser), data: data };
    }
};

exports.addQuickLink = async function (hash, url, title, description) {
    u = await getUserByHash(hash);
    if (u != null) {
        slug = slugify(url)
        duplicate = false;
        u.qLinks.forEach(link => {
            if (link.slug == slug) {
                duplicate = true;
            }
        });
        if (duplicate) {
            return { "success": true, "hash": hash };
        }
        newLink = new Link();
        newLink.slug = slug;
        newLink.title = title;
        newLink.description = description;
        newLink.url = url;
        u.qLinks.push(newLink);
        success = await User.findOneAndUpdate({ guid: u.guid }, { qLinks: u.qLinks });
        if (success) {
            u = await User.findOne({ guid: u.guid });
            return { success: true, hash: calculateHash(u) };
        }
    }
    return { success: false };
};
exports.updateQuickLink = async function (hash, slug, title, description) {
    u = await getUserByHash(hash);
    if (u != null) {
        i = null;
        u.qLinks.forEach((link, index) => {
            if (link.slug == slug) {
                i = index;
            }
        });
        if (i !== null) {
            u.qLinks[i].title = title;
            u.qLinks[i].description = description;
            success = await User.findOneAndUpdate({ guid: u.guid }, { qLinks: u.qLinks });
            if (success) {
                u = await User.findOne({ guid: u.guid });
                return { success: true, hash: calculateHash(u) };
            }
        }
    }
    return { success: false };
};
exports.deleteQuickLink = async function (hash, slug) {
    u = await getUserByHash(hash);
    if (u !== null) {
        qlinks = u.qLinks.filter(link => link.slug != slug);
        success = await User.findOneAndUpdate({ guid: u.guid }, { qLinks: qlinks });
        if (success) {
            u = await User.findOne({ guid: u.guid });
            return { success: true, hash: calculateHash(u) };
        }
    }
    return { success: false };
};
exports.updateDefaultEngine = async function (hash, slug) {
    u = await getUserByHash(hash);
    if (u !== null) {
        success = await User.findOneAndUpdate({ guid: u.guid }, { dEngine: slug });
        if (success) {
            u = await User.findOne({ guid: u.guid });
            return { success: true, hash: calculateHash(u) };
        }
    }
    return { success: false };
};
