const STATUS_MAP = {
  LOCKED: 0,
  WAITING_FOR_LOCK: 1,
  UNLOCKED: 2,
  ERROR: 3 
}

const getStatus = (s) => ({
  time: Date.now(), // this should get sent by the client
  status: STATUS_MAP[s]
})

const initialState = getStatus('LOCKED') 

const lock = (state = initialState, action) => {
  switch (action.type) {
    case 'UNLOCK_REQUEST':
      return getStatus('WAITING_FOR_LOCK') 
    case 'UNLOCK_SUCCESS':
      return getStatus('UNLOCKED') 
    case 'LOCK_SUCCESS': 
      return getStatus('LOCKED')
    default:
      return state 
  }
}

module.exports = lock
