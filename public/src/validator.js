function validateInput(name, email, password) {
  if (name === null || !checkName(name)) {
    alertUser("Name");
  } else if (email === null || !checkEmail(email)) {
    alertUser("Email");
  } else if (password === null || !checkPassword(password)) {
    alertUser("Password");
  } else {
    window.location.assign("home.html");
  }
}

function checkName(string) {
  return RegExp(/^[A-Za-z]{4,20}$/).test(`${string}`);
}

function checkEmail(email) {
  return RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email);
}

function checkPassword(password) {
  return RegExp(/^[A-Za-z0-9]{6,20}$/).test(`${password}`);
}

function alertUser(string) {
  alert(`Please check ${string} field, it does not match the requirement`);
}
