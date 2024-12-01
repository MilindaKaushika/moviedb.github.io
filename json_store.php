<?php
if (isset($_REQUEST['submit'])) {
    $filename = "data.json";
    $json_arr = [];


    if (is_file($filename) && filesize($filename) > 0) {
        $data = file_get_contents($filename);


        $json_arr = json_decode($data, true);


        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "Error decoding JSON: " . json_last_error_msg();
            exit;
        }
    }


    $json_arr[] = array(
        'username'  => htmlspecialchars($_REQUEST['username']),
        'lastname'  => htmlspecialchars($_REQUEST['lastname']),
        'email'     => htmlspecialchars($_REQUEST['email']),
        'telephone' => htmlspecialchars($_REQUEST['telephone']),
        'message'   => htmlspecialchars($_REQUEST['message'])
    );


    if (file_put_contents($filename, json_encode($json_arr, JSON_PRETTY_PRINT))) {
        echo "Data saved successfully!";
    } else {
        echo "Error saving data!";
    }
}
?>
