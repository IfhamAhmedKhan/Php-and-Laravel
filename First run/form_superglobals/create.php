<?php
/*
echo '<pre>';
var_dump($_SERVER, $_GET, $_POST);
echo '</pre>';
*/
/*
echo "<pre>";
var_dump($_FILES);
echo "</pre>";
*/
$uploadDir = 'uploads/';
$contactFile = 'contacts.json';

if ($_SERVER["REQUEST_METHOD"]=="POST"){
    $name = filter_input(INPUT_POST,"name", FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
    $phone = filter_input(INPUT_POST, "phone", FILTER_SANITIZE_NUMBER_INT);

    var_dump($name,$email,$phone);

    if ($name && $email && $phone && isset($_FILES['image'])){

        if(!is_dir($uploadDir)){
            mkdir($uploadDir,0777,true);
        }

        echo "Contact added: $name ($email, $phone)";
    } else{
        echo "Invalid input";
    }
}   
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="" method="POST" enctype="multipart/form-data">
        <label>Name: </label>
        <input type="text" name="name">
        <br>

        <label>Email: </label>
        <input type="email" name="email">
        <br>

        <label>Phone: </label>
        <input type="text" name="phone">
        <br>

        <label>Contact Image: </label>
        <input type="file" name="image" accept="image/" required>
        <br>

        <button type="submit">Add Contact</button>
    </form>
</body>
</html>