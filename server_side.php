<?php

//Modified from https://www.w3schools.com/php/php_file_upload.asp
$target_dir = "uploads/";
$uploadedFile = $_FILES['image-file'];
$target_file = $target_dir . basename($uploadedFile["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($uploadedFile["tmp_name"]);
    if (!$img = @imagecreatefromstring(file_get_contents($uploadedFile["tmp_name"]))) {
        throw new Exception("{$uploadedFile['tmp_name']}: Invalid image content.");
        $uploadOk = 0;
    }
    if($check !== false) {
        //echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size
if ($uploadedFile["size"] > 800000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "jpeg") {
    echo "Sorry, only JPG or JPEG files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
} else {
    if (move_uploaded_file($uploadedFile["tmp_name"], $target_file)) {
        $file_loc= htmlspecialchars(basename($uploadedFile["name"]));
        echo 'The file <strong>'. $file_loc. '</strong> has been uploaded. <a href="uploads/'. $file_loc. '">Click here to view '. $file_loc. '</a>';
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
