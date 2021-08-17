window.onload = function(){
  if (localStorage.getItem("session") != "1") {
    form_menu.classList.remove("home")
    form_menu.classList.remove("user")
    form_menu.classList.remove("msg")
    form_menu.classList.remove("photos")

    container.classList.remove("login-mode");
    container.classList.remove("login-mode_sign_up");
  } else {
    container.classList.add("login-mode");
    local_uid = localStorage.getItem("uid");
    local_email = localStorage.getItem("email");

    profile_detail.innerHTML = 
    "<div class='name'>" + local_uid + "</div>" + 
    "<div class='email'>" + local_email + "</div>";

    uid_msg(local_uid);
    uid_list(local_uid);
  }
}

const sign_up_btn = document.querySelector("#sign-up-btn");
const sign_in_btn = document.querySelector("#sign-in-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const btn_sidebar = document.querySelector("#btn_sidebar");
const sidebar = document.querySelector(".sidebar");

btn_sidebar.addEventListener("click", () => {
  sidebar.classList.toggle("active");
})

const form_menu = document.querySelector(".main-menu-body");
const btn_home = document.querySelector("#home_content");
const btn_user = document.querySelector("#user_content");
const btn_msg = document.querySelector("#messages_content");
const btn_photos = document.querySelector("#photos_content");

var fields = document.querySelectorAll(".text-b input");
// ? var inputs = document.querySelectorAll('input');

var btn_sign_up = document.querySelector(".btn-sign-up");
var btn_sign_in = document.querySelector(".btn-login");
var btn_log_out = document.querySelector("#log_out");

function check(){
  if(fields[2].value != "" && fields[3].value != "" && fields[4].value != "" && fields[5].value != "" && fields[6].value != "") {
    btn_sign_up.disabled = false;
  } else {
    btn_sign_up.disabled = true; 
  } 
}

fields[0].addEventListener("keyup",check);
fields[1].addEventListener("keyup",check);
fields[2].addEventListener("keyup",check);
fields[3].addEventListener("keyup",check);
fields[4].addEventListener("keyup",check);
fields[5].addEventListener("keyup",check);
fields[6].addEventListener("keyup",check);


document.querySelector(".show-password-login").addEventListener("click", function(){
  if(this.classList[2] == "fa-eye-slash") {
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
    fields[1].type = "text";
  } else {
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
    fields[1].type = "password";
  }
})

document.querySelector(".show-password-sign-up").addEventListener("click", function(){
  if(this.classList[2] == "fa-eye-slash") {
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
    fields[5].type = "text";
    fields[6].type = "text";
  } else {
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
    fields[5].type = "password";
    fields[6].type = "password";
  }
})

var uid_session;

var form_signup = document.querySelector(".sign-up-form");
var answer_signup = document.querySelector("#answer-sign-up");
var profile_detail = document.querySelector(".uid_email");

var show_list = document.querySelector("#uid_list");
var list_length;
var show_msg = document.querySelector(".show_msg");
var msg_length;

btn_sign_up.addEventListener("click", function(e){
  e.preventDefault();

  let data = new FormData(form_signup);
  
  /*
  ? console.log(data)
  ? console.log(data.get("name-sign-up"))
  ? console.log(data.get("email-sign-up"))
  ? console.log(data.get("uid-sign-up"))
  ? console.log(data.get("pwd-sign-up"))
  ? console.log(data.get("pwd-repeat-sign-up"))
  */

  fetch("http://tpapvjr.orgfree.com/includes/signup.inc.php",{
    method: 'POST',
    body: data
  })
  /*
  ! .then(res => res.text())
  ! .then(data => {
  !   console.log(data);
  !})
  */
  .then(function(result) {
    return result.json()
  })
  .then(function(data) {
    console.log(data);
    if (data.message == "invalid_name") {
      answer_signup.innerHTML = '<div class="alert alert-danger" role="alert"> Choose a proper name ${data}</div>';
    } else if (data.message == "invalid_email") {
      answer_signup.innerHTML = '<div class="alert alert-danger" role="alert"> Choose a proper email </div>';
    } else if (data.message == "invalid_uid") {
      answer_signup.innerHTML = '<div class="alert alert-danger" role="alert"> Choose a proper username </div>';
    } else if (data.message == "password_doesn't_mach") {
      answer_signup.innerHTML = "<div class='alert alert-danger' role='alert'> Password doesn't mach </div>";
    } else if (data.message == "stmt_failed") {
      answer_signup.innerHTML = "<div class='alert alert-danger' role='alert'> Stmt failed </div>";
    } else if (data.message == "email_taken") {
      answer_signup.innerHTML = "<div class='alert alert-danger' role='alert'> Email already taken </div>";
    } else if (data.message == "username_taken") {
      answer_signup.innerHTML = "<div class='alert alert-danger' role='alert'> Username already taken </div>";
    } else {
      container.classList.add("login-mode_sign_up");

      uid_session = data.uid;
      profile_detail.innerHTML = 
      "<div class='name'>" + data.uid + "</div>" + 
      "<div class='email'>" + data.email + "</div>";

      localStorage.setItem("session", 1);
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("email", data.email);

      uid_msg(uid_session);
      uid_list(uid_session);
    }
  })
  .catch(function(err) {
    console.log(err + "Sin_up");
  })
  // ! inputs.forEach(input =>  input.value = '');
})

var form_sign_in = document.querySelector(".sign-in-form");
var answer_sign_in = document.querySelector("#answer-sign-in");

btn_sign_in.addEventListener("click", function(e){
  e.preventDefault();

  let data = new FormData(form_sign_in);

  /*
  ? console.log(data)
  ? console.log(data.get("uid"))
  ? console.log(data.get("pwd"))
  */

  fetch("http://tpapvjr.orgfree.com/includes/login.inc.php",{
    method: 'POST',
    body: data
  })
  /*
  !.then(res => res.text())
  !.then(data => {
  !  console.log(data);
  !})
  */
  .then(function(result) {
    return result.json()
  })
  .then(function(data) {
    // ? console.log(data);
    if (data.message == "empty_input") {
      answer_sign_in.innerHTML = '<div class="alert alert-danger" role="alert"> Fill in all fields </div>';
    } else if (data.message == "password_doesn't_match") {
      answer_sign_in.innerHTML = "<div class='alert alert-danger' role='alert'> Password doesn't mach </div>";
    } else if (data.message == "user_doesn't_exist") {
      answer_sign_in.innerHTML = "<div class='alert alert-danger' role='alert'> User doesn't exist </div>";
    } else {
      container.classList.add("login-mode");

      uid_session = data.uid;
      profile_detail.innerHTML = 
      "<div class='name'>" + data.uid + "</div>" + 
      "<div class='email'>" + data.email + "</div>";

      localStorage.setItem("session", 1);
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("email", data.email);

      uid_msg(uid_session);
      uid_list(uid_session);
    }
  })
  .catch(function(err) {
    console.log(err + "Login");
  })
  // ! inputs.forEach(input =>  input.value = '');
})

function uid_list(uid_sess) {
  let data = new FormData();
  data.append('uid', uid_sess);
      
  /*
  ? console.log(data)
  ? console.log(data.get("uid-log"))
  */

  fetch("http://tpapvjr.orgfree.com/includes/show_uids.inc.php",{
    method: 'POST',
    body: data
  })
  
  /*
  ? .then(res => res.text())
  ? .then(data_list => {
  ?  console.log(data);
  ?})
  */

  .then(function(result) {
    return result.json()
  })
  .then(function(data) {
    // ? console.log(data);
    list_length = data.length;
    for (let x = 0; x < data.length; x++){
      show_list.innerHTML += " <option value='" + data[x].user + "'>";
    }
  })
  .catch(function(err) {
    console.log(err);
  })
}

function uid_msg(uid_sess) {
  let data = new FormData();
  data.append('uid', uid_sess);
      
  /*
  ? console.log(data)
  ? console.log(data.get("uid"))
  */

  fetch("http://tpapvjr.orgfree.com/includes/show_msg.inc.php",{
    method: 'POST',
    body: data
  })
  
  /*
  ! .then(res => res.text())
  !.then(data => {
  !  console.log(data);
  ! })
  */

  .then(function(result) {
    return result.json()
  })
  .then(function(data) {
    // ? console.log(data);
    for (let x = 0; x < data.length; x++){
      msg_length = data.length;
      show_msg.innerHTML +=
      "<div class='msg_from'>" + data[x].from + "</div>" +
      "<div class='msg_text'>" + data[x].message + "</div>" +
      "<div class='msg_date'>" + data[x].Date + "</div>";
    }
  })
  .catch(function(err) {
    console.log(err);
  })
}

btn_home.addEventListener("click", () => {
  form_menu.classList.add("home")
  form_menu.classList.remove("user")
  form_menu.classList.remove("msg")
  form_menu.classList.remove("photos")
})

btn_user.addEventListener("click", () => {
  form_menu.classList.remove("home")
  form_menu.classList.add("user")
  form_menu.classList.remove("msg")
  form_menu.classList.remove("photos")
})

btn_msg.addEventListener("click", () => {
  form_menu.classList.remove("home")
  form_menu.classList.remove("user")
  form_menu.classList.add("msg")
  form_menu.classList.remove("photos")
})

btn_photos.addEventListener("click", () => {
  form_menu.classList.remove("home")
  form_menu.classList.remove("user")
  form_menu.classList.remove("msg")
  form_menu.classList.add("photos")
})

var form_send_msg = document.querySelector(".send_msg");
var btn_send_msg = document.querySelector(".btn-send");
var answer_msg = document.querySelector("#answer-msg");

btn_send_msg.addEventListener("click", function(e){
  e.preventDefault();

  let data = new FormData(form_send_msg);
  data.append('msg-from', uid_session);
  /* 
  ? console.log(data)
  ? console.log(data.get("uid-msg"))
  ? console.log(data.get("msg-text"))
  ? console.log(data.get("msg-from");
  */
  
  fetch("http://tpapvjr.orgfree.com/includes/save_msg.inc.php",{
    method: 'POST',
    body: data
  })
  /*
  !.then(res => res.text())
  !.then(data => {
  !  console.log(data);
  !})
  */
  .then(function(result) {
    return result.json()
  })
  .then(function(data) {
    console.log(data);
    if (data.message == "empty_input") {
      answer_msg.innerHTML = '<div class="alert alert-danger" role="alert"> Fill in all fields </div>';
    } else {
      answer_msg.innerHTML = '<div class="alert alert-success" role="alert"> Message send </div>';
    }
  })
  .catch(function(err) {
    console.log(err);
  })
})

const textarea = document.querySelector("textarea");
textarea.addEventListener("keyup" , e => {
  textarea.style.height = "auto"
  let scHeight = e.target.scrollHeight;
  textarea.style.height = `${scHeight}px`
})

function delete_list() {
  var listBox = document.querySelector("option");
  listBox.remove();
}

function delete_msg() {
  var from = document.querySelector(".msg_from");
  var text = document.querySelector(".msg_text");
  var date = document.querySelector(".msg_date");
  from.remove();
  text.remove();
  date.remove();
}

function get_os(){
  let os = null;
  let platform = window.navigator.platform,
  ios_platform = ['iPhone', 'iPad', 'iPod'];
  if (ios_platform.includes(platform)) {
    os = 'IOS'
  }
  return os;
}

const take_picture = document.querySelector(".take_photo");
var file_input = take_picture.querySelector(".file_input");
var photo  = document.querySelector(".show_photo");

take_picture.addEventListener("click", () => {
  file_input.click();
})

file_input.addEventListener("change", function(e){
  path = URL.createObjectURL(e.target.files[0]);
  photo.src = path;
  if (get_os() == "IOS") {
  let link = document.createElement('a');
  link.download = "test.png";
  link.href = photo.toDataURL("image/png").replace("image/png","image/octet-stream");
  link.click();
  }
});

const btn_find = document.querySelector(".btn_find");

btn_find.addEventListener("click", () =>{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    btn_find.innerHTML = "Your browser not support";
  }
})

function onSuccess(position) {
  let {latitude, longitude} = position.coords;
  fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
  .then(response => response.json())
  .then(result => {
    let allDetails = result.address;
    let {country, postcode, state} = allDetails;
    btn_find.innerText = `${country}, ${postcode}, ${state}`;
  })
}

function onError(error) {
  if (error.code == 1) {
    btn_find.innerHTML = "You denied the request";
  } else if (error.code == 2) {
    btn_find.innerHTML = "Location not available";
  } else {
    btn_find.innerHTML = "Something went wrong";
  }
}

btn_log_out.addEventListener("click", function() {
  form_menu.classList.remove("home")
  form_menu.classList.remove("user")
  form_menu.classList.remove("msg")
  form_menu.classList.remove("photos")

  container.classList.remove("login-mode");
  container.classList.remove("login-mode_sign_up");

  localStorage.setItem("session", 0);
  localStorage.removeItem("uid");
  localStorage.removeItem("email");

  for (let x = 0; x < list_length; x++){
    delete_list();
  }
  for (let x = 0; x < msg_length; x++){
    delete_msg();
  }
})