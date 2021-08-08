const db = require('_helpers/db');
const Provider = db.Provider;

module.exports = {
    getAll,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Provider.find()
}

async function create(providerParam) {
    // validate
    if (await Provider.findOne({name: providerParam.name})) {
        throw 'Name "' + providerParam.name + '" is already taken';
    }

    const provider = new Provider(providerParam);


    // save provider
    await provider.save();
}

async function update(id, providerParam) {
    const provider = await Provider.findById(id);

    // validate
    if (!provider) throw 'Provider not found';
    if (await Provider.findOne({name: providerParam.name})) {
        throw 'Name "' + providerParam.name + '" is already taken';
    }


    // copy providerParam properties to provider
    Object.assign(provider, providerParam);

    await provider.save();
}

async function _delete(id) {
    await Provider.findByIdAndRemove(id);
}

