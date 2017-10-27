import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import io from 'socket.io-client'

import Main from './components/Main/Main'

import reducer from './reducers'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    (window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__()),
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(saga)

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('ReactRoot')
);

store.dispatch({ type: 'FETCH_PORTS_REQUEST' })

window.setInterval(() => {
    store.dispatch({ type: 'FETCH_STATUS' })
}, 2000)

const socket = io.connect('http://localhost:5000/')
socket.on('rssi', (data) => {
    store.dispatch({ type: 'RECEIVE_RSSI', rssi: data.rssi })
})
