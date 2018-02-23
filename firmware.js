const STATUS_MAP = {
  UPDATE_REQUEST: 0,
  UPDATE_SUCCESS: 1,
  UPDATE_ERROR: 2,
}

const getStatus = (s, v) => ({
  time: Date.now(), // this should get sent by the client
  status: STATUS_MAP[s],
  version: v
})

const initialState = getStatus('UPDATE_SUCCESS', '0.0.0') 

const lock = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return getStatus('UPDATE_REQUEST') 
    case 'UPDATE_SUCCESS':
      return getStatus('UPDATE_SUCCESS', action.data.version || state.version) 
    case 'UPDATE_ERROR': 
      return getStatus('UPDATE_ERROR', action.data.version || state.version)
    default:
      return state 
  }
}

module.exports = lock
