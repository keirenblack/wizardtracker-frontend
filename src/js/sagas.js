import { put, takeEvery } from 'redux-saga/effects'
import {
  FETCH_STATUS,
  FETCH_STATUS_SUCCESS,

  FETCH_PORTS_REQUEST,
  FETCH_PORTS_SUCCESS,

  CONNECT_DEVICE,
  DISCONNECT_DEVICE
} from './actions'

function* fetchStatus(action) {
  const status = yield fetch('/api/device/status')
    .then(response => response.json())
    .then(json => json)

  yield put({ type: FETCH_STATUS_SUCCESS, status: status })
}

function* fetchPorts(action) {
  const ports = yield fetch('/api/device/ports')
    .then(response => response.json())
    .then(json => json)

  yield put({ type: FETCH_PORTS_SUCCESS, ports: ports.ports })
}

function* connectDevice(action) {
  const status = yield fetch('/api/device/connect?port=' + action.portName, {
    method: 'post'
  })
    .then(response => response.json())
    .then(json => json)
}

function* disconnectDevice(action) {
  const status = yield fetch('/api/device/disconnect', {
    method: 'post'
  })
    .then(response => response.json())
    .then(json => json)
}

function* saga() {
  yield takeEvery(FETCH_STATUS, fetchStatus)
  yield takeEvery(FETCH_PORTS_REQUEST, fetchPorts)
  yield takeEvery(CONNECT_DEVICE, connectDevice)
  yield takeEvery(DISCONNECT_DEVICE, disconnectDevice)
}

export default saga
