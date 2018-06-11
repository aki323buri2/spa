import { put, call, fork, take, cencel, cancelled } from 'redux-saga/effects';
import { takeLatest, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import fetchBunruiApi from './fetchBunruiApi';
export default function *bunruiSaga()
{
	yield takeLatest('FETCH_BUNRUI', fetchBunruiSaga);
	yield put({ type: 'FETCH_BUNRUI' });
}
const fetchBunruiSaga = function *(action)
{
	const bunrui = yield call(fetchBunruiApi);
	yield put({ type: 'RECEIVE_BUNRUI', payload: bunrui });

};