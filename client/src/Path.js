import React, {useState } from 'react'
import axios from 'axios';
import './App.css';

const Path = ({ graph, src, dest, car, email}) => {
  const [call, setCall] = useState()
  const [booked, setBooked] = useState([false, false, false, false, false]);
 
  function calculation(graph, source, destination) {
    // Initialize distances to all nodes as Infinity except the source, which is 0
    const distances = Object.keys(graph).reduce((acc, node) => {
      acc[node] = node === source ? 0 : Infinity;
      return acc;
    }, {});

    // Initialize the queue with the source node
    const queue = [source];

    // Initialize an empty object to store the shortest path to each node
    const shortestPaths = {};

    // Loop until the queue is empty
    while (queue.length > 0) {
      // Get the node with the minimum distance from the source
      const currentNode = queue.reduce((minNode, node) => {
        return distances[node] < distances[minNode] ? node : minNode;
      }, queue[0]);

      // Remove the currentNode from the queue
      queue.splice(queue.indexOf(currentNode), 1);

      // Stop if we've reached the destination
      if (currentNode === destination) {
        break;
      }

      // Loop through the neighbors of the current node
      const neighbors = graph[currentNode];
      for (let neighbor in neighbors) {
        // Calculate the distance to the neighbor node
        const distance = distances[currentNode] + neighbors[neighbor];

        // Update the distance if it's shorter than the current distance
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;

          // Add the neighbor to the queue
          queue.push(neighbor);

          // Update the shortest path to the neighbor node
          shortestPaths[neighbor] = currentNode;
        }
      }
    }

    // Build the shortest path by iterating through the shortestPaths object
    const path = [destination];
    let node = destination;
    while (node !== source) {
      node = shortestPaths[node];
      path.push(node);
    }
    path.reverse();

    // Return an object containing the shortest path and its distance
    return {
      path: path,
      distance: distances[destination],
    };
  }


  const handleSubmit = (graph, src, dest ) => {
    setCall(calculation(graph,src,dest));
  }

  const handleBook = (email, src, dest, car) => {
    const index = (car/10 - 1);

    var cr = "";
    if(car === 10){
      cr = "Micro";
    }else if(car === 20){
      cr = "Mini";
    }else if(car === 30){
      cr = "Sedan";
    }else if(car === 40){
      cr = "Sedan Prime";
    }else{
      cr = "SUV";
    }

    if(booked[index] === true){
      alert(`Sory The Current Ride ${cr} is Booked. Select Any other Ride..`)
      return;
    }

    let data ={
      email:email,
      source:src,
      destination:dest,
      car:cr,
      time:call?.distance,
      price:call?.distance*car
    }
    axios.post('http://localhost:5000/', data)
    .then(resp=>{
      if(resp){
        console.log(resp)
        const newBooked = [...booked]
        newBooked[index] = true;
        setBooked(newBooked);
        alert("Successfully Booked", resp);
      }else{
        alert("Something went wrong")
      }
    })
    .catch(err=>console.log(err))
    
  }

  return (
    <div>
      <button id='submit' className='btn btn-primary' onClick={() => handleSubmit(graph, src, dest)} >Submit</button>
      <div>Your Ride Path is as followes : {call?.path}</div>
      <div>Your Minimum time Required is : {call?.distance} minuites</div>
      <div>The Price for Your Ride will be : Rs.{call?.distance*car}</div>
      <button id='submit' className='btn btn-success' onClick={() => handleBook(email, src, dest, car)} >Book Now</button>
    </div>
  )
}

export default Path