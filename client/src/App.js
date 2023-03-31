import React, {useState} from 'react';
import './App.css';
import shortestPath from './shortestPath';

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
    setcar(i);
  }

  function onSubmit(src, dest){
    const result = shortestPath(graph, src, dest)
    console.log(result.path);
    console.log(result.distance);
  }

  return (
    <div className="App mt-5">
      <h1 className="m-15 text-center">..Car-Book-Karo..</h1>
      <form className="col-md-8 mx-auto">
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" onChange={(e) => {setemail(e.target.value)}} placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Source</label>
          <input type="email" className="form-control" onChange={(e) => {setsrc(e.target.value)}} placeholder="Enter Source Node"/>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Destination</label>
          <input type="email" className="form-control" onChange={(e) => {setdest(e.target.value)}} placeholder="Enter Destination Node"/>
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
        <button type="submit" className="btn btn-primary" onClick={() => onSubmit(src, dest)}>Submit</button>
      </form>

      <shortestPath graph={graph} src={src} dest={dest} />
    </div>
  );
}

export default App;
