import { takeLatest, call, put, all } from "redux-saga/effects";

import api from "services/api";

import { signInSuccess, signFailure } from "./actions";

export function* signIn({ payload }) {
  const { email, password, history, setSubmited } = payload;

  try {
    const response = yield call(api.post, "user/login", {
      email,
      password,
    });

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, response.data));

    history.push("/home");
  } catch (err) {
    setSubmited(false);
    history.push("/login", { submitError: true });

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  const {
    email,
    password,
    firstName,
    lastName,
    birthDate,
    gender,
    register,
    history,
    isSubmited,
  } = payload;

  var unixTimestamp = new Date(birthDate).getTime() / 1000;

  try {
    const response = yield call(api.post, "user/create", {
      email,
      password,
    });

    const { jwt } = response.data;
    const headerParams = {
      Authorization: `Bearer ${jwt}`,
    };

    yield call(
      api.put,
      "user/profile",
      {
        firstName,
        lastName,
        birthDate: "" + unixTimestamp + "",
        gender: parseInt(gender, 10),
        register: parseInt(register, 10),
      },
      { headers: headerParams }
    );

    history.push("/login");
  } catch (err) {
    isSubmited(false);
    history.push("/register", { submitError: true });

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut({ payload }) {
  const { history } = payload;
  history.push("");
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp),
  takeLatest("@auth/SIGN_OUT", signOut),
]);
