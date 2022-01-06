export function validatePassword(password: string) {
  let valid = true;

  //check length
  if (password.length < 8) valid = false;

  //lowercase letters
  if (!/[a-z]/.test(password)) valid = false;

  //uppercase letters
  if (!/[A-Z]/.test(password)) valid = false;

  //numbers
  if (!/\d/.test(password)) valid = false;

  //return the boolean
  return valid;
}

export function validateEmail(email: string) {
  //test the lowercase variant against a validator regex
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.toLocaleLowerCase(),
  );
}