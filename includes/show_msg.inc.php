<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

require_once 'dbh.inc.php';

$user = $_REQUEST["uid"];

$sql = "SELECT * FROM msgs WHERE msgsTo = '$user'";
$result = mysqli_query($conn,$sql);

$message_info = array();

while ($record = mysqli_fetch_assoc($result)){
    $message_info[] = array('from' => $record['msgsFrom'],
                            'message' => $record['msgsMessage'],
                            'Date' => $record["msgsDate"]);
}
echo json_encode($message_info);

mysqli_close($conn);