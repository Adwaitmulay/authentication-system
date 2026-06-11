// ========================
// REGISTER
// ========================

function registerUser() {

  var name = document.getElementById("regName");
  var email = document.getElementById("regEmail");
  var password = document.getElementById("regPassword");
  var confirm = document.getElementById("regConfirm");
  var errorMsg = document.getElementById("regError");
  var successMsg = document.getElementById("regSuccess");

  // clear old messages
  errorMsg.textContent = "";
  successMsg.textContent = "";

  // check empty fields
  if (name.value == "" || email.value == "" || password.value == "" || confirm.value == "") {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  // basic email check
  if (email.value.indexOf("@") == -1) {
    errorMsg.textContent = "Please enter a valid email address.";
    return;
  }

  // check password length
  if (password.value.length < 6) {
    errorMsg.textContent = "Password must be at least 6 characters.";
    return;
  }

  // check passwords match
  if (password.value != confirm.value) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  // get existing users from localStorage
  var users = [];
  var saved = localStorage.getItem("users");
  if (saved != null) {
    users = JSON.parse(saved);
  }

  // check if email already exists
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email.value) {
      errorMsg.textContent = "This email is already registered.";
      return;
    }
  }

  // create new user object
  var newUser = {
    name: name.value,
    email: email.value,
    password: password.value
  };

  // save to localStorage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // show success and redirect after 1.5 seconds
  successMsg.textContent = "Account created! Redirecting to login...";

  setTimeout(function() {
    window.location.href = "login.html";
  }, 1500);
}

// ========================
// LOGIN
// ========================

function loginUser() {

  var email = document.getElementById("loginEmail");
  var password = document.getElementById("loginPassword");
  var errorMsg = document.getElementById("loginError");

  // clear old message
  errorMsg.textContent = "";

  // check empty fields
  if (email.value == "" || password.value == "") {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  // get users from localStorage
  var users = [];
  var saved = localStorage.getItem("users");
  if (saved != null) {
    users = JSON.parse(saved);
  }

  // check if user exists and password matches
  var found = false;

  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email.value && users[i].password == password.value) {
      found = true;

      // save logged in user to session
      localStorage.setItem("loggedInUser", JSON.stringify(users[i]));

      // go to dashboard
      window.location.href = "dashboard.html";
      break;
    }
  }

  if (!found) {
    errorMsg.textContent = "Incorrect email or password.";
  }
}

// ========================
// DASHBOARD
// ========================

// check if user is logged in when dashboard loads
var dashName = document.getElementById("dashName");

if (dashName != null) {

  var loggedIn = localStorage.getItem("loggedInUser");

  // if not logged in send back to login
  if (loggedIn == null) {
    window.location.href = "login.html";
  } else {

    // show user name and email
    var user = JSON.parse(loggedIn);
    document.getElementById("dashName").textContent = user.name;
    document.getElementById("dashEmail").textContent = user.email;
  }
}

// ========================
// LOGOUT
// ========================

function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
