import { put, takeEvery } from 'redux-saga/effects'
import {
  DEVICE_SHOW_SPINNER,
  DEVICE_HIDE_SPINNER,

  FETCH_STATUS,
  FETCH_STATUS_SUCCESS,

  FETCH_PORTS_REQUEST,
  FETCH_PORTS_SUCCESS,

  SET_FREQUENCY,

  CONNECT_DEVICE,
  DISCONNECT_DEVICE
} from './actions'

function* fetchStatus() {
  const status = yield fetch('/api/device/status')
    .then(response => response.json())
    .then(json => json)

  yield put({ type: FETCH_STATUS_SUCCESS, status: status })
}

function* fetchPorts() {
  yield put({ type: DEVICE_SHOW_SPINNER })

  const ports = yield fetch('/api/device/ports')
    .then(response => response.json())
    .then(json => json)

  yield put({ type: DEVICE_HIDE_SPINNER })
  yield put({ type: FETCH_PORTS_SUCCESS, ports: ports.ports })
}

function* connectDevice(action) {
  yield put({ type: DEVICE_SHOW_SPINNER })

  yield fetch(`/api/device/connect?port=${action.portName}`, {
    method: 'post'
  })

  yield put({ type: FETCH_STATUS })
  yield put({ type: DEVICE_HIDE_SPINNER })
}

function* disconnectDevice() {
  yield put({ type: DEVICE_SHOW_SPINNER })

  yield fetch('/api/device/disconnect', {
    method: 'post'
  })

  yield put({ type: FETCH_STATUS })
  yield put({ type: DEVICE_HIDE_SPINNER })
}

function* setFrequency(action) {
  yield put({ type: DEVICE_SHOW_SPINNER })

  yield fetch(
    `/api/device/set_frequency?id=${action.id}&frequency=${action.frequency}`,
    {
      method: 'post'
    }
  )

  yield put({ type: FETCH_STATUS })
  yield put({ type: DEVICE_HIDE_SPINNER })
}

function* saga() {
  yield takeEvery(FETCH_STATUS, fetchStatus)
  yield takeEvery(FETCH_PORTS_REQUEST, fetchPorts)
  yield takeEvery(CONNECT_DEVICE, connectDevice)
  yield takeEvery(DISCONNECT_DEVICE, disconnectDevice)
  yield takeEvery(SET_FREQUENCY, setFrequency)
}

export default saga
