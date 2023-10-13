import { put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* shelfSaga() {
  yield takeLatest("DELETE_ITEM", deleteItem);
  yield takeLatest("FETCH_SHELF", fetchShelfSaga);
  yield takeLatest("ADD_ITEM", addShelfSaga);
  yield takeLatest("UPDATE_ITEM", updateItemSaga);
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
  try {
    yield axios.post("/api/shelf", action.payload);

    yield put({ type: "FETCH_SHELF" });
  } catch (error) {
    console.log("Error adding item:", error);
  }
}

function* deleteItem(action) {
  try {
    console.log(action.payload);
    yield axios.delete(`/api/shelf/${action.payload}`);
    yield put({ type: "FETCH_SHELF" });
  } catch (error) {
    console.log("error in deleteItem saga", error);
    alert("NOT ALLOWED");
  }
}

function* updateItemSaga(action) {
  try {
    console.log("in update saga", action.payload);
    yield axios.put(`/api/shelf/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_SHELF" });
  } catch (error) {
    console.log("error in update item saga", error);
  }
}

export default shelfSaga;
