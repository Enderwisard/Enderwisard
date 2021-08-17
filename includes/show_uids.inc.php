<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

require_once 'dbh.inc.php';

$user = $_REQUEST['uid'];

$sql = "SELECT * FROM users
WHERE usersUid != '$user'";

$result = mysqli_query($conn,$sql);

$user = array();

while ($record = mysqli_fetch_assoc($result)) {
    $users[] = array('user' => $record['usersUid']);
}
echo json_encode($users);

mysqli_close($conn);