import {call,put} from 'redux-saga/effects';
import { startLoading,endLoading } from '../modules/loading';

export default function createRequestSaga(type,request){
    const SUCCESS = `${type}_SUCCESS`;
    const FAIL = `${type}_FAIL`;

    return function*(action){
        yield put(startLoading(type));
        try{
            const response = yield call(request,action.payload);
            yield put({
                type:SUCCESS,
                payload: response.data
            });
        }
        catch(e){
            yield put({
                type:FAIL,
                payload : e,
                error : true
            });
        }
        yield put(endLoading(type));
    };
}