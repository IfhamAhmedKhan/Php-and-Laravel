let $ = "hello";
console.log($);


// Array
const CarArr = ["Toyota","BMW"];

CarArr[0] = "Yaris";
CarArr.push("Lamborgini");
console.log(CarArr)

// Creating const object
const ifham = {Name: "ifham", Age: 24, Gender: "Male" }
console.log(`Name: ${ifham.Name}`);
console.log(`Age: ${ifham.Age}`);
console.log(`Gender: ${ifham.Gender}`);
// ifham = {Profession: "Noob Programmer"}          cannot be done becauseo of const
//console.log(`Profession: ${ifham.Profession}`);

let x = 100;
x ^= 2
console.log(x)