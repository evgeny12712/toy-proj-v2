import { utilService } from './util.service.js'
import Axios from 'axios';
const axios = Axios.create({ withCredentials: true, });

const TOY_URL = 'http://localhost:3030/api/toy/'
    // const gLabels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy
}

// TODO: support paging and filtering and sorting
async function query(filterBy = {}) {
    try {
        const res = await axios.get(TOY_URL, { params: filterBy })
        return res.data
    } catch (error) {
        console.log('error', error);
    }
}

async function getById(id) {
    try {
        const res = await axios.get(TOY_URL + id)
        return res.data

    } catch (error) {
        console.log('error', error);
        throw 'err'
    }
}

async function remove(id) {
    try {
        const res = await axios.delete(TOY_URL + id)
        return res.data
    } catch (error) {
        console.log('error', error);
        throw 'err'
    }
}

async function save(toy) {
    try {
        if (toy._id) {
            const res = await axios.put(TOY_URL, toy)
            return res.data
        } else {
            const res = await axios.post(TOY_URL, toy)
            console.log('res.data', res.data);
            return res.data
        }
    } catch (error) {
        console.log('error', error);
        throw error
    }
}

// async function addReview(toy) {
//     try {
//         const res = await axios.put(TOY_URL + 'review', toy)
//         return res.data
//     } catch (error) {
//         console.log('error', error);
//         throw error
//     }
// }

async function getEmptyToy(name = '', price = 100) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }

}

// // Create Test Data:
// function _createToys() {
//     var toys = JSON.parse(localStorage.getItem(KEY))
//     if (!toys || !toys.length) {
//         toys = [
//             _createToy('Superman'),
//             _createToy('Batman'),
//             _createToy('Spiderman'),
//         ]
//         localStorage.setItem(KEY, JSON.stringify(toys))
//     }
//     return toys;
// }

// function _createToy(name) {
//     const toy = getEmptyToy(name, utilService.getRandomInt(80, 300))
//     return toy
// }