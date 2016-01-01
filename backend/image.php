<?php header('Access-Control-Allow-Origin: *');
    $id = $_POST['id'];
    $imagename = $_POST['imagename'];
    $data = $_POST['imagedata'];
    $data = substr($data, 23);
    if( is_dir($id) === false ) { mkdir($id); }
    $fileName = $id.'/'.$imagename.'.jpg';
    $reponse = file_put_contents($fileName, base64_decode($data, true));
    if($response === FALSE) {
        echo 'notuploaded';
    } else {
        echo 'uploaded';
    }
    chmod($upload_file, 0777);
?>