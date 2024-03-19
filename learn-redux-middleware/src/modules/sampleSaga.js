import { handleActions } from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "../lib/createRequsetSaga";
//액션 타입을 선언
//한 요청 당 세개를 만듬

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";

export const getPostSaga = createRequestSaga(GET_POST, (id) => id);
export const getUsersSaga = createRequestSaga(GET_USERS);

export function* sampleSaga(){
  yield takeLatest(GET_POST,getPostSaga);
  yield takeLatest(GET_USERS,getUsersSaga);
}

const initialState = {
  post: null,
  users: null,
};

const sampleS = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true, //요청시작
      },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, //요청 실패
      },
      post: action.payload,
    }),
    [GET_USERS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: true, //요청시작
      },
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
      users: action.payload,
    }),
  },
  initialState
);

export default sampleS;
