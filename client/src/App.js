import React, {useState} from 'react';
import './App.css';
import ShortestPath from './Path';
import carGraph from './graphh.png';


function App() {

  const graph = {
    a: { b: 5, c: 7 },
    b: { a: 5, d: 15, e: 20 },
    c: { a: 7, d: 5, e: 35 },
    d: { b: 15, c: 5, f: 20 },
    e: { b: 20, c: 35, f: 10 },
    f: { d: 20, e: 10 },
  };

  const [email, setemail] = useState('');
  const [src, setsrc] = useState('');
  const [dest, setdest] = useState('');
  const [car, setcar] = useState('');

  function onSelect(i){
    let rate;
    if(i === 0){
      rate = 10;
    }else if(i === 1){
      rate = 20;
    }else if(i === 2){
      rate = 30;
    }else if(i === 3){
      rate = 40;
    }else{
      rate = 50;
    }
    setcar(rate);
  }

  return (
    <div className="background-container">
    <div className="App">
      <h1 className="text">..Car-Book-Karo..</h1>
      <div className="form-container">
      <img src={carGraph} alt="Car animation" />
      <form className="mx-auto">
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" onChange={(e) => {setemail(e.target.value)}} placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Source</label>
          <input type="text" className="form-control" onChange={(e) => {setsrc(e.target.value)}} placeholder="Enter Source Node"/>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Destination</label>
          <input type="text" className="form-control" onChange={(e) => {setdest(e.target.value)}} placeholder="Enter Destination Node"/>
        </div>
        <ul>
          <li>
            <input type="radio" value={false} name="options" id='op1' onChange={() => onSelect(0)}/>
            <label className='text-primary' htmlFor="op1">Micro (Rs. 10/min) </label>
          </li>
          <li>
            <input type="radio" value={false} name="options" id='op2' onChange={() => onSelect(1)}/>
            <label className='text-primary' htmlFor="op2">Mini (Rs. 20/min) </label>
          </li>
          <li>
            <input type="radio" value={false} name="options" id='op3' onChange={() => onSelect(2)}/>
            <label className='text-primary' htmlFor="op3">Sedan (Rs. 30/min) </label>
          </li>
          <li>
            <input type="radio" value={false} name="options" id='op4' onChange={() => onSelect(3)}/>
            <label className='text-primary' htmlFor="op4">Sedan Prime (Rs. 40/min) </label>
          </li>
          <li>
            <input type="radio" value={false} name="options" id='op5' onChange={() => onSelect(4)}/>
            <label className='text-primary' htmlFor="op5">SUV (Rs. 50/min) </label>
          </li>
        </ul>
        
      </form>
      </div>

      <ShortestPath graph={graph} src={src} dest={dest} car={car} email={email}/>
    </div>
    </div>
  );
}

export default App;
