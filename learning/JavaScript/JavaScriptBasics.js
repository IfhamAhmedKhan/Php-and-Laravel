/* // const { default: Kinde } = require("next-auth/providers/kinde");

// let $ = "hello";
// console.log($);


// // Array
// const CarArr = ["Toyota","BMW"];

// CarArr[0] = "Yaris";
// CarArr.push("Lamborgini");
// console.log(CarArr)

// // Creating const object
// const ifham = {Name: "ifham", Age: 24, Gender: "Male" }
// console.log(`Name: ${ifham.Name}`);
// console.log(`Age: ${ifham.Age}`);
// console.log(`Gender: ${ifham.Gender}`);
// // ifham = {Profession: "Noob Programmer"}          cannot be done becauseo of const
// //console.log(`Profession: ${ifham.Profession}`);

// let x = 100;
// x ^= 2
// console.log(x)

// // There are two ways to create an object 
// // First one 
// const person = {};

// // Later you can add values to it 
// person.Name = "Ifham";
// console.log(person.Name); // This way you can print it 

// // Second one 
// const animal = new Object();
// animal.Name = "Kako";
// console.log(animal.Name);
// // Note: Both do same work, but first one (object literal) is better then using Object()

// const person2 = {
//     firstName: "Ifham",
//     lastName: "Khan",
//     fullName: function(){
//         return this.firstName+" "+this.lastName;
//     }
// }

// console.log(person2.fullName())

// const person3 = {
//     firstName: "Afnan",
//     lastName: "Khan",
//     age: 17
// }

// const p3 = person3
// p3.age = 18
// let value = "age"
// console.log(person3.age) // (calling by direct property name)
// console.log(person3["age"]) // does the same thing as above (calling by property)
// console.log(person3[value]) // does the same thing as above (calling by expression)

// delete person3.age;

// // Nested objects
// const myObj = {
//     Fname: "Ifham",
//     Lname: "Khan",
//     myCar: {
//         color: "Silver",
//         brand: "Toyota"
//     }
// }

// console.log(myObj.myCar.brand)
// console.log(myObj.myCar["brand"])
// console.log(myObj["myCar"]["brand"])


// console.log(Object.values(person3)) // return array

// function Human(FirstName, LastName, Age){
//     this.firstName = FirstName;
//     this.lastName = LastName;
//     this.age = Age;

//     this.fullName = function (){
//         return this.firstName+" "+this.lastName;
//     }
// }

// const myFather = new Human("Farman", "Khan", 45);
// const myBrother = new Human("Afnan", "Khan", 18);
// console.log(`my brother name is ${myBrother.fullName()} and my father name is ${myFather.fullName()}`);

// let val2 = "boogy"
// let val3 = ""

// console.log(val2.localeCompare(val3))

// // Array section
// const sentenceArr = ["My", "name", "is", "Ifham."];
// let mySentence = sentenceArr.toString();
// mySentence = mySentence.replaceAll(","," ")
// console.log(mySentence)
// let mySentence1 = ""
// let mySentence2 = ""
// for (let i = 0; i < sentenceArr.length; i++) {
//     mySentence1 = mySentence1.concat(sentenceArr[i]) // using built in function
//     mySentence2 = mySentence2+" "+sentenceArr[i]  
// }
// console.log(mySentence2)

// const nameArr = [{type: "human"},{alive: true}]
// console.log(nameArr.type)

// var myArr = [1,2,3,4]
// console.log(myArr[0])

// {
//     var myArr = [2,3,4,5]  
//     console.log(myArr[0])
// }

// console.log(myArr[0])

// const d = new Date(2024,10,18);
// console.log(d)

// let a = 4.6
// console.log(Math.floor(a))
// let q
// console.log(q = 5 == 5)

// // if, else if, else
// let age = 18
// if(age >= 18){
//     console.log("You are an adult")
// }else if(age<=17){
//     console.log("You are a kid")
// }else{
//     console.log("You are idiot")
// }

// // Switch case
// let day = "Sunday" 
// switch(day){
//     case "Monday":
//         console.log("Work day")
//         break;

//     case "Tuesday":
//         console.log("Work day")
//         break;

//     case "Wednesday":
//         console.log("Work day")
//         break;

//     case "Thursday":
//         console.log("Work day")
//         break;

//     case "Friday":
//         console.log("Work day")
//         break;

//     case "Saturday":
//         console.log("Fun day")
//         break;

//     case "Sunday":
//         console.log("Fun day")
//         break;

//     default:
//         console.log("Not human at all")
//         break;
     
// } */

/*
const person = {fname:"John", lname:"Doe", age:25};

let text = "";
for (let x in person) {
  text += person[x];
  console.log(text)
}
*/

/*
const person = ["Ifham", "Afnan", "Usman"]
for (x in person) {
    console.log(person[x])
}
*/


/*
const person = ["Ifham", "Afnan", "Usman"]
for (x of person) {
    console.log("1")
}
*/

/*
const a = new Set([1,2,3,4]);
const b = new Set([6,7,8,9]);
a.add(5)
console.log(a.values())
*/

// const myMap = new Map([
//     ["grapes", 300],
//     ["watermelon", 200]
// ])

// myMap.set("apple", 500)
// myMap.set("banana", 400)

// console.log(myMap.get("banana"))

// console.log(typeof myMap)

// // js typed array
// const myArray = new Int32Array(10)
// myArray.fill(1);
// console.log(myArray)

// // iterator
// const myIterator = new Iterator.from([1,2,3]);
// let text = ""
// for (const x of myIterator){
//     text+=x;
//     console.log(text)
// }

// destructing is a process in which we are able to assign value of objects to different variable

// const person = {
//     fname: "Ifham",
//     lname: "Khan"

// }

// let {firstName, lastName} = person // Now we can call the first and last name by using just these two names

// const numbers = [1,2,3,4,5]
// const [a,b,...rest] = numbers

// // Create an Array
// const fruits = ["Bananas", "Oranges", "Apples", "Mangos"];

// // Destructuring
// let [fruit1,,,fruit2] = fruits;// skips oranges and apples


// try {
//   let a = 10,b = 0;
//   c = a/b;
//   console.log(c);

// }catch (err){
//   console.log(err.message)
//   throw "Don't add zero in end"
// }finally {
//   console.log("I will run no matter what!")
// }
// function myName (p1,p1){}
// "use strict";

// //a =10; will cause an error

// // console.log(a)

// // function myBad (p1,p1){}// will cause an error

// class Animal {
//   constructor(AnimalName, AnimalAge, AnimalBreed, AnimalType){
//     this.animalName = AnimalName;
//     this.animalAge = AnimalAge;
//     this.animalBreed = AnimalBreed;
//     this.animalType = AnimalType;
//   }

//   AnimalDetails(){
//     console.log(`Animal name is ${this.animalName} and it's age is ${this.animalAge}, the breed of this animal is ${this.animalBreed} ${this.animalType}`);
//   }
// }

// const Pet1 = new Animal("Leo", 8, "Persian", "Cat")
// Pet1.AnimalDetails()


// import {UserName,UserAge, message} from "./message.js";

// console.log(UserName)
// console.log(UserAge)
// console.log(message())

// let text = '{ "employees" : [' +
// '{ "firstName":"John" , "lastName":"Doe" },' +
// '{ "firstName":"Anna" , "lastName":"Smith" },' +
// '{ "firstName":"Peter" , "lastName":"Jones" } ]}';


// const obj = JSON.parse(text);

// console.log(obj.employees[1].firstName + " " + obj.employees[1].lastName);

// // Closures

// function myCounter(){
//   let counter = 0;
//   return function (){
//     counter++;
//     return counter;
//   }

// }

// const add = myCounter();
// add()
// add()

// console.log(add())

// // Callback

// function result(some){
//   console.log(some)
// }

// function calculator(a,b,callBack){
//   let c = a + b;
//   callBack(c);
// }

// calculator(5,5,result)

// // asynchronous

// setTimeout(myFunction, 3000)

// function myFunction(){
//   console.log("Hello!");
// }

// Promises (resolve, reject)

// fetch('https://jsonplaceholder.typicode.com/users/1') // Step 1: Fetch user
//   .then(response => response.json())                  // Step 2: Convert to JSON
//   .then(data => {                                     // Step 3: Handle the data
//     console.log("User Name:", data.name);
//     console.log("Email:", data.email);
//   })
//   .catch(error => {                                   // Step 4: Handle errors
//     console.log("Something went wrong ", error);
//   });

// Async and await

// async function getUser() {
//   try {
//     console.log("Fetching user...");
    
//     const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
//     const data = await response.json();  // wait until it turns the response into usable data
    
//     console.log("User fetched:");
//     console.log(data);  // print user data
//   } catch (error) {
//     console.log("Something went wrong:", error);
//   }
// }

// getUser();



// // Arrow function

// myWork = () => {
//   console.log("Frontend")
//   let age = 24
//   return age
// }

// myWork()
// console.log(myWork())


const person = {
  username: "IfhamAhmedKhan",
  firstName: "Ifham",
  lastName: "Khan"
}

const val = JSON.stringify(person)

console.log(val)