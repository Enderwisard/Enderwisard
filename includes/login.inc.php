<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

require_once 'dbh.inc.php';

$username = $_REQUEST['uid-sign-in'];
$password = $_REQUEST['pwd-sign-in'];

if (empty($username) || empty($password)) {
    // * die("<p>Fill in all fields</p>");
    $message = array('message' => 'empty_input');
    echo json_encode($message);
    exit();
}

$sql = "SELECT * FROM users 
WHERE usersUid = '$username'";
$result = mysqli_query($conn, $sql);
if ($record = mysqli_fetch_assoc($result)) {
    if (password_verify($password, $record['usersPwd'])) {
        $session = array('uid' => $record['usersUid'],
                        'email' => $record['usersEmail']);
        echo json_encode($session);
    }
    else {
        // * die("<p>Password doesn't match</p>");
        $message = array('message' => "password_doesn't_match");
        echo json_encode($message);
        exit();
    }
} else {
    // * die("<p>User doesn't exist</p>");
    $message = array('message' => "user_doesn't_exist");
    echo json_encode($message);
    exit();
}