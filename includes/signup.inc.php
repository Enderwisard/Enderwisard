<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

require_once 'dbh.inc.php';

$name = $_REQUEST['name-sign-up'];
$email = $_REQUEST['email-sign-up'];
$username = $_REQUEST['uid-sign-up'];
$password = $_REQUEST['pwd-sign-up'];
$pwd_repeat = $_REQUEST['pwd-repeat-sign-up'];

$find_email = "SELECT * FROM users Where usersEmail = '$email';";
if (!preg_match("/^[a-zA-Z]*$/",$name)) {
    $message = array('message' => 'invalid_name');
    echo json_encode($find_email);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $message = array('message' => 'invalid_email');
    echo json_encode($message);
    exit();
}

if (!preg_match("/^[a-zA-Z0-9]*$/",$username)) {
    $message = array('message' => 'invalid_uid');
    echo json_encode($message);
    exit();
}

if ($password != $pwd_repeat) {
    // * die("<p>Password doesn't match</p>");
    $message = array('message' => "password_doesn't_mach");
    echo json_encode($message);
    exit();
}

// * EASY WAY

$find_email = "SELECT * FROM users Where usersEmail = '$email';";
$res = mysqli_query($conn, $find_email);

if(mysqli_num_rows($res) > 0) {
    $message = array('message' => 'email_taken');
    echo json_encode($message);
    exit();
}

/*$find_email = "SELECT * FROM users Where usersEmail = '$email';";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $find_email)) {
    $message = array("message" => "stmt_failed");
    echo json_encode($message);
    exit();
}

mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);

$result_Data = mysqli_stmt_get_result($stmt);
if ($row = mysqli_fetch_assoc($result_Data)) {
    $message = array("message" => "email_taken");
    echo json_encode($message);
    exit();
}
mysqli_stmt_close($stmt);*/

$find_user = "SELECT * FROM users Where usersUid = '$username';";
$res = mysqli_query($conn, $find_user);

if(mysqli_num_rows($res) > 0) {
    $message = array('message' => 'username_taken');
    echo json_encode($message);
    exit();
}
else {
    $session = array('uid' => $username,
                    'email' => $email);
    echo json_encode($session);
}

/*$find_user = "SELECT * FROM users Where usersUid = '$username';";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $find_user)) {
    $message = array("message" => "stmt_failed");
    echo json_encode($message);
    exit();
}

mysqli_stmt_bind_param($stmt, "s", $username);
printf($stmt);
mysqli_stmt_execute($stmt);
printf($stmt);

$resultData = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($resultData)) {
    $message = array("message" => "username_taken");
    echo json_encode($message);
    exit();
}
mysqli_stmt_close($stmt);*/

$pwdHashed = password_hash ($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users(usersName, usersEmail, usersUid, usersPwd) VALUES ('$name', '$email', '$username', '$pwdHashed')";

mysqli_query($conn, $sql);
mysqli_close($conn);