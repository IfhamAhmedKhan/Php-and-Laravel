import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Car from './Car';
import reportWebVitals from './reportWebVitals';

class Animal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      color: "ginger",
      breed: "persian",
      petName: "leo"
    }
  }
  render(){
    return <h1>Hello, my animal name is {this.state.petName}. He is a {this.state.breed} cat and the color of {this.state.petName} is {this.state.color}</h1>
  }
}

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {favoritecolor: "red"};
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState ({favoritecolor: "yellow"})
    }, 1000)
  }
  render(){
    return (
        <h1>Hello my fav color is {this.state.favoritecolor}</h1>
    );
  }

}

function Football (){
  const shoot = () => {
    alert("Great shot!")
  }

  return (
    <button onClick={shoot}>Take a shoot</button>
  );
}

function MadeGoal(){
  return <h1>Great! You scored a goal</h1>
}

function MissedGoal(){
  return <h1>Oops! You missed a goal</h1>
}

function GOAL(props){
  const IsGoal = props.IsGoal;
  if (IsGoal){
    return <MadeGoal/>
  } return <MissedGoal/>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Animal/>
    <Header/>
    <Football/>
    <GOAL IsGoal = {false}/>
    <Car color = "red"/>
  </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
