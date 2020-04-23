<?php
$target_dir = "files/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if file already exists
if (file_exists($target_file)) {
    echo "Vabandame, selle nimega fail on juba olemas!";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Vabandame, Teie fail on liiga suur!";
    $uploadOk = 0;
}
// Allow certain file formats
if($fileType != "json") {
    echo "Vabandame, ainult .json failid on lubatud!";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Teie faili ei laetud üles!";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "Fail ". basename( $_FILES["fileToUpload"]["name"]). " laeti üles!";
    } else {
        echo "Vabandame, Teie faili üles laadimisel ilmnes viga";
    }
}
?>
