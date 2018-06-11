import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSaga from 'redux-saga';
import { createLogger } from 'redux-logger';
import moment from 'moment';
import reducers from './reducers';
const createProvider = App =>
{
	const saga = createSaga();
	const logger = createLogger({
		predicate: (state, action) =>
		{
			return global.debug;
		}, 
	});
	const middleware = [
		saga, 
		logger, 
	]; 
	const store = createStore(combineReducers(reducers), applyMiddleware(...middleware));
	const provider = <Provider store={store}><App/></Provider>;
	return {
		...provider, 
		runSaga: () => saga.run(mainSaga), 
	};
};
export {
	createProvider, 
};
import { put, call, fork, take, cancel, cancelled } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import bunruiSaga from './bunruiSaga';
const mainSaga = function *()
{
	yield takeEvery('DEBUG', processDebug);
	yield fork(bunruiSaga);
	yield takeLatest('FETCH_BUKA', fetchBuka);
	// yield put({ type: 'DEBUG', payload: true });
	yield put({ type: 'FETCH_BUKA' });
	yield put({ type: 'SYOZOK', payload: 160 });
	yield put({ type: 'KJOB', payload: {
		since: moment().add(-1, 'days'), 
		until: moment().add(-1, 'days'), 
	}});
}
const processDebug = function *(action)
{
	global.debug = action.payload;
}
import fetchBukaApi from './fetchBukaApi';
const fetchBuka = function *(action)
{
	const buka = yield call(fetchBukaApi);
	yield put({ type: 'RECEIVE_BUKA', payload: buka });
}
