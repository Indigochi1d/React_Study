import { combineReducers } from "redux";
import {all} from 'redux-saga/effects';
import sample from './sample';
import sampleS,{sampleSaga} from "./sampleSaga";
import loading from './loading';
const rootReducer = combineReducers({
    sample, //from sample_thunk
    sampleS, // from sampleSaga_sample
    loading
});

export function* rootSaga(){
    yield all([sampleSaga()]);
}

export default rootReducer;