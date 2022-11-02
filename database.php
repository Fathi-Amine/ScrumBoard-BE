<?php
    
    //CONNECT TO MYSQL DATABASE USING MYSQLI
    $hostName ="localhost";
    $user_account = "youcode";
    $password = "youcode2ndbrief";
    $data_name = "youcodescrumboard";

    $conn = mysqli_connect($hostName, $user_account,$password,$data_name);
    if(!$conn){
        echo 'Connection error :' . mysqli_connect_error();
    }
?>