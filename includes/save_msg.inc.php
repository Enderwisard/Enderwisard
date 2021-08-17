<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

require_once 'dbh.inc.php';

$to = $_REQUEST['uid-msg-to'];
$msg = $_REQUEST['msg-text'];
$from = $_REQUEST['msg-from'];

if (empty($to) || empty($msg)) {
    // * die("<p>Fill in all fields</p>");
    $message = array('message' => 'empty_input');
    echo json_encode($message);
    exit();
}
else {
    $message = array('message' => 'msg_send');
    echo json_encode($message);
}

$sql = "INSERT INTO msgs(msgsTo, msgsFrom, msgsMessage, msgsDate) values('$to', '$from', '$msg', NOW())";
mysqli_query($conn,$sql);
mysqli_close($conn);