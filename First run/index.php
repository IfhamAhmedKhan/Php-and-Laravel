<?php
    // print statement
    echo "Hello World<br>";
    echo "Hello World<br>";
    echo "Hello"." php!";

    // single line comment
    // Hello world

    // Multiline comment
    /*
        this is great
        now I can comment multiple lines
    */

    // String
    $name = 'Ifham';

    // Integer
    $age = 24;

    // Boolean
    $isPro = true;

    // Float
    $money = 1000.50;

    // Null
    $salary = null;

    echo "<br>My name is {$name}, I'm {$age} year old. Am I pro = {$isPro}, hehehe. Right now I have {$money} pkr and my salary is: {$salary}";

    // type of variable
    echo gettype($money)."<br>";
    
    // var dump also print lenght
    echo "<br>";
    var_dump($name);
    print_r($name);

    // variable checking function
    echo "<br>";
    var_dump(is_string($name));
    echo "<br>";

    //Strings built-in functions
    $str = "Hello from php";
    echo strtolower($str).'<br>';
    echo strtoupper($str).'<br>';
    echo str_replace("php", "Ifham",$str).'<br>';
    echo str_word_count($str).'<br>';
    // Strings: https://www.php.net/manual/en/ref.strings.php

    // Arithmetic
    $x = 25;
    $y = 2;
    echo "Addition: ".$x+$y;
    echo "<br>";
    echo "Minimum between x and y: ".min($x, $y).'<br>';
    echo "Maximum between x and y: ".max($x, $y).'<br>';
    // Numbers: https://www.php.net/manual/en/ref.math.php

    // Conditions
    $age = 10;
    if ($age <= 12){
        echo "Too young to watch Harry Potter<br>";
    } else if ($age < 15) {
        echo "You may watch Harry Potter<br>";
    } else {
        echo "You should watch Harry Potter<br>";
    }

    // Switch case
    $day = 3;

    switch ($day){
        case 1:
            echo "Monday<br>";
            break;
        case 2:
            echo "Tuesday<br>";
            break;
        case 3:
            echo "Wednesday<br>";
            break;
        default:
            echo "Invalid day<br>";
    }

    // Array
    $fruits = ["Apple", "Banana", "Cherry"];
    echo $fruits[0] . '<br>';
    $fruits[3] = "Peach";
    echo '<pre>';
    var_dump($fruits);
    echo '</pre>';

    // Mixed Type Array
    $MixedArray = [15,"Apple",true];
    echo '<pre>';
    var_dump($MixedArray);
    echo '</pre>';

    // Associative Array
    $user = [
        'name' => 'Zura',
        'age' => 23,
        'hobbies' => ['Coding', 'Tennis']
    ];
    echo $user['name']. '<br>';
    echo '<pre>';
    var_dump($user);
    echo '<pre>';

    // For loop 
    for($i = 1;$i<=5;$i++){
        echo $i. " ";
    }
    echo "<br>";

    // While Loop
    $i = 1;
    while ($i<=5){
        echo $i." ";
        $i++;
    }
    echo "<br>";

    // foreach loop
    $fruits = ["Apple","Banana","Cherry"];
    foreach ($fruits as $fruit){
        echo $fruit." ";
    }
    echo "<br>";

    // simple function
    function sayHello(){
        echo "Hello World!";
    }

    sayHello();
    echo "<br>";

    // With Parameter
    function greet($name = "Guest"){
        echo "Good morning {$name}!<br>";
    }
    echo "<br>";
    greet();
    greet("Afnan");

    // Return from function

    function multiply($a,$b){
        return $a*$b;
    }
    $result = multiply(4,3);
    echo "The result of multiplication is {$result}";
    echo "<br>";

    
?>