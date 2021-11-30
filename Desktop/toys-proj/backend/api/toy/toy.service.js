const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const MongoClient = require('mongodb').MongoClient

async function query(filterBy = {}) {
    try {
        const paging = JSON.parse(filterBy.paging);
        const collection = await dbService.getCollection('toys')
        const criteria = _buildCriteria(filterBy)
        let toys = await collection.find(criteria).toArray()
        const length = toys.length
        toys = await collection.find(criteria).skip(paging.currPageIdx * paging.pageSize).limit(paging.pageSize).toArray()
        return { toys, length: length }
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        const toy = collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toys')
        const addedtoyToy = await collection.insertOne(toy)
        return addedtoyToy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ "_id": id }, { $set: {...toy } })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        criteria.name = { $regex: regex }
    }
    if (filterBy.inStock) {
        criteria.inStock = { $eq: JSON.parse(filterBy.inStock) }
    }
    if (filterBy.labels && filterBy.labels.length) {
        criteria.labels = { $in: filterBy.labels }
    }
    return criteria
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}