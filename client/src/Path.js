import React, { useEffect, useState } from 'react'

const Path = ({ graph, src, dest, car }) => {
  const [call, setCall] = useState()
 
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



  return (
    <div>
      <button onClick={() => handleSubmit(graph, src, dest)} >Submit</button>
      <div>{call?.path}</div>
      <div>{call?.distance}</div>
      <div>{call?.distance*car}</div>
      
    </div>
  )
}

export default Path