'use strict';

function sort(edges, callback) {
  if (edges.length === 1) {
    return callback(null, edges);
  }

  var processedEdges = edges.reduce(function(processed, edge) {
    var augmentedEdge = {
      edge: edge,
      to: edge.to.toLowerCase(),
      incomingEdges: 0
    }

    processed[edge.from.toLowerCase()] = augmentedEdge;

    return processed;
  }, {});

  if (Object.keys(processedEdges).length !== edges.length) {

    callback(new Error('Found multiple edges startings from the same node.'), null);
    return;
  }

  Object.keys(processedEdges).forEach(function(key) {
    if (processedEdges[processedEdges[key].to]) {
      processedEdges[processedEdges[key].to].incomingEdges += 1;
    }
  });

  var start = [];
  Object.keys(processedEdges).forEach(function(key) {
    if (processedEdges[key].incomingEdges === 0) {
      start.push(processedEdges[key]);
    }
  });

  if (start.length === 0) {
    callback(new Error('The given edges form a cycle, no starting point can be automatically selected'), null);
    return;
  }

  if (start.length > 1) {
    callback(new Error('There are more than one possible starting nodes'), null);
    return;
  }

  callback(null, order(start.pop(), processedEdges));
}

function order(edge, edges) {
  var orderedEdges = [];
  var found = true;

  orderedEdges.push(edge.edge);
  while(found) {
    if (edges[edge.to]) {
      orderedEdges.push(edges[edge.to].edge);
      edge = edges[edge.to];
    } else {
      found = false;
    }
  }

  return orderedEdges;
}

module.exports = {
    sort: sort
}
