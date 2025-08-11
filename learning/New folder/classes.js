// // class Animal{
// //     constructor(name, age) {
// //         this.name = name;
// //         this.age = age;
// //     }

// //     speak() {
// //         console.log(`${this.name} makes a noise and his age is ${this.age}.`);
// //     }

// //     run(){
// //         console.log(`${this.name} is running.`);
// //     }

// //     eat() {
// //         console.log(`${this.name} is eating.`);
// //     }
// // }


// // const obj1 = new Animal('Dog', 5);
// // obj1.speak(); // Output: Dog makes a noise.

// // const obj2 = new Animal('Cat', 3);
// // obj2.speak(); // Output: Cat makes a noise.

// class A{
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     speak() {
//         console.log(`${this.name} makes a noise and his age is ${this.age}.`);
//     }

    
// }

// // Child class B that extends parent class A
// class B extends A{
//  constructor(name, age, color) {
//         super(name, age); // Call the parent class constructor
//         this.color = color; // Additional property for child class
//     }

//     speak() {
//         console.log(`${this.name} makes a noise and his age is ${this.age} and color is ${this.color}.`);
//     }

// }

// const obj3 = new A('Dog', 5);
// obj3.speak(); // Output: Dog makes a noise and his age is 5.
// const obj4 = new B('Cat', 3, 'Black');
// obj4.speak(); // Output: Cat makes a noise and his age is 3 and

let arr = [1,6,4,7,2,4,6]

for (let i = 0; i<= arr.length; i++){
    if(i==1 || i == 3){
       continue;
    }else{
        console.log(arr[i]) 
    }
}
