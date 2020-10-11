export function signInRequest(email, password, history, setSubmited) {
  return {
    type: "@auth/SIGN_IN_REQUEST",
    payload: { email, password, history, setSubmited },
  };
}

export function signInSuccess(token, user) {
  // export function signInSuccess(message) {
  return {
    type: "@auth/SIGN_IN_SUCCESS",
    // payload: { message },
    payload: { token, user },
  };
}

export function signUpRequest(
  email,
  password,
  confirmPass,
  firstName,
  lastName,
  birthDate,
  gender,
  register,
  history,
  isSubmited
) {
  return {
    type: "@auth/SIGN_UP_REQUEST",
    payload: {
      email,
      password,
      confirmPass,
      firstName,
      lastName,
      birthDate,
      gender,
      register,
      history,
      isSubmited,
    },
  };
}

export function signFailure() {
  return {
    type: "@auth/SIGN_FAILURE",
  };
}

export function signOut(history) {
  return {
    type: "@auth/SIGN_OUT",
    payload: {
      history,
    },
  };
}
