import { toyService } from '../services/toy-service.js'
export const toyStore = {
    strict: true,
    state: {
        toys: [],
        filterBy: {
            name: '',
            inStock: '',
            labels: [],
            paging: { pageSize: 3, currPageIdx: 0 }
        },
        toysLength: 0
    },
    getters: {
        toys(state) {
            return state.toys
        },
        toyNames(state) {
            const toyNames = state.toys.map((toy) => toy.name)
            return toyNames
        },
        toyPrices(state) {
            return state.toys.map((toy) => toy.price)
        },
        toysInStock(state) {
            return state.toys.filter((toy) => toy.inStock)
        },
        labelsInStock(state, getters) {
            return getters.toysInStock.map((toy) => {
                return toy.labels
            }).flat()
        },
        labelPercentage(state, getters) {
            const labels = getters.labelsInStock
            const numOfLabels = labels.length
            let labelCount = {}
            labels.forEach((label) => {
                if (labelCount[label]) {
                    labelCount[label]++
                } else labelCount[label] = 1
            })
            let percentage = []
            for (let label in labelCount) {
                percentage.push((100 * labelCount[label]) / numOfLabels);
            }
            return percentage;
        },
        filterBy(state) {
            return state.filterBy
        },
        toysLength(state) {
            return state.toysLength
        }

    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys;
        },
        remove(state, { toyId }) {
            const idx = state.toys.findIndex((toy) => toy._id === toyId)
            state.toys.splice(idx, 1);
        },
        addToy(state, { toy }) {
            state.toys.push(toy);
        },
        updateToy(state, { toy }) {
            const idx = state.toys.findIndex((currToy) => currToy._id === toy._id)
            state.toys.splice(idx, 1, toy)
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
        sortBy(state, { sortBy }) {
            switch (sortBy) {
                case 'name':
                    state.toys.sort(function(a, b) { return a.name.localeCompare(b.name) });
                    break;
                case 'price':
                    state.toys.sort(function(a, b) { return a.price - b.price });
                    break;
                case 'created':
                    state.toys.sort(function(a, b) { return b.createdAt - a.createdAt });
                    break;
            }
        },
        movePage(state, { direction }) {
            switch (direction) {
                case 'first':
                    state.filterBy.paging.currPageIdx = 0;
                    return;
                case 'down':
                    if (state.filterBy.paging.currPageIdx - 1 < 0) return
                    state.filterBy.paging.currPageIdx -= 1;
                    return;
                case 'up':
                    if (state.filterBy.paging.currPageIdx + 1 >= Math.ceil(state.toysLength / state.filterBy.paging.pageSize)) {
                        return
                    }
                    state.filterBy.paging.currPageIdx += 1;
                    return;
                case 'last':
                    state.filterBy.paging.currPageIdx = Math.ceil(state.toysLength / state.filterBy.paging.pageSize) - 1;
                    return;
                default:
                    state.filterBy.paging.currPageIdx = direction - 1;
            }
        },
        setLength(state, { length }) {
            state.toysLength = length
        }
    },
    actions: {
        async loadToys({ commit }, { filterBy }) {
            try {
                const res = await toyService.query(filterBy)
                const { toys } = res
                const { length } = res
                commit({ type: 'setToys', toys })
                commit({ type: 'setLength', length })
                return toys
            } catch (err) {
                console.log('err', err);
            }
        },
        async remove({ commit }, { toyId }) {
            try {
                await toyService.remove(toyId)
                commit({ type: 'remove', toyId })
            } catch (err) {
                console.log(err)
                throw 'err'
            }
        },
        async addToy({ commit }, { toy }) {
            try {
                const savedToy = await toyService.save(toy)
                commit({ type: 'addToy', toy: savedToy })
                return savedToy
            } catch (err) {
                console.log(err);
                throw 'err'
            }
        },
        async editToy({ commit }, { toy }) {
            try {
                const savedToy = await toyService.save(toy)
                commit({ type: 'updateToy', toy: savedToy })
            } catch (err) {
                console.log('err', err);
                throw 'err'
            }
        },
        async setFilter({ commit }, { filterBy }) {
            try {
                const res = await toyService.query(filterBy)
                commit({ type: 'setFilter', filterBy })
                commit({ type: 'setToys', toys: res.toys })
                commit({ type: 'setLength', length: res.length })
                return res.toys
            } catch (error) {
                console.log('error', error);
            }
        }

    }

}