import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* shelfSaga() {
  yield takeLatest("DELETE_ITEM", deleteItem);
  yield takeLatest("FETCH_SHELF", fetchShelfSaga);
  yield takeLatest("ADD_ITEM", addShelfSaga);
}

function* fetchShelfSaga() {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/shelf", config);
    yield put({ type: "SET_SHELF", payload: response.data });
  } catch (error) {
    console.log("got an error with the SAGA GET", error);
  }
}

function* addShelfSaga(action) {

}

function* deleteItem(action) {
    
}

export default shelfSaga;
