const db = require('_helpers/db');
const {ObjectId} = require("mongodb");
const User = db.User;

module.exports = {
    removeProviderFromUser,
    removeProviderFromUsers,
    getProvidersByUserId,
    create,
    addProviderToUser,
    update,
    delete: _delete
};


async function addProviderToUser(userId, provider) {
    return db.User.findByIdAndUpdate(
        userId,
        { $push: { providers: ObjectId(provider) } },
        { new: true, useFindAndModify: false }
    );
}

async function removeProviderFromUser(userId, provider) {
    return db.User.findByIdAndUpdate(
        userId,
        { $pull: { providers: ObjectId(provider) } },
        { new: true, useFindAndModify: false }
    );
}
async function removeProviderFromUsers( provider) {
    return db.User.find({},
        { $pull: { providers: ObjectId(provider) } },
        { new: true, useFindAndModify: false }
    );
}

async function create(userParam) {
    // validate
    if (await User.findOne({email: userParam.email})) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);


    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({email: userParam.email})) {
        throw 'Email ' + userParam.email + '" is already taken';
    }


    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}
async function getProvidersByUserId(id) {
    return await User.findById(id).select('providers');
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

