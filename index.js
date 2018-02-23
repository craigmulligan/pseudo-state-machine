const { createStore, combineReducers } = require('redux')
const fs = require('fs')
const lock = require('./lock')
const firmware = require('./firmware')
const getCurrentState = (id) => require('./data.json')[id]

const ID = process.argv[2]
const ACTION = process.argv[3]

const reducers = combineReducers({
  lock,
  firmware
})

let store = createStore(reducers, getCurrentState(199))

store.subscribe(() => {
  console.dir(store.getState(), { depth: 2, colors: true })
  fs.writeFileSync('./data.json', JSON.stringify(store.getState(), null, 2))
})

store.dispatch({ type: ACTION, device_id: ID }) // from BMC
