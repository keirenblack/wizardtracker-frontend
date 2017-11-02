import { combineReducers } from 'redux'
import {
  FETCH_STATUS_SUCCESS,
  FETCH_PORTS_SUCCESS,
  RECEIVE_RSSI
} from './actions'

function device(state = { ports: [], rssi: [] }, action) {
  switch (action.type) {
    case FETCH_STATUS_SUCCESS:
      return {
        ...state,
        connected: action.status.connected,
        ready: action.status.ready,
        frequencies: action.status.frequencies,
        receiverCount: action.status.receiverCount,
        voltage: action.status.voltage,
        temperature: action.status.temperature,
        hz: action.status.hz
      }

    case FETCH_PORTS_SUCCESS:
      return {
        ...state,
        ports: action.ports
      }

    case RECEIVE_RSSI:
      return {
        ...state,
        rssi: action.rssi
      }

    default:
      return state
  }
}

export default combineReducers({device})
