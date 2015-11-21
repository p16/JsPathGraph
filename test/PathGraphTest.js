'use strict';

var assert = require('assert');
var pathGraph = require('./../src/PathGraph.js');

describe('PathGraph', function() {

  it('should return the right order for a single edge', function(done) {
    var edges = [
      {from: 'Dubai', to: 'Abu Dhabi'}
    ];

    var expectedEdges = [
      {from: 'Dubai', to: 'Abu Dhabi'}
    ];

    pathGraph.sort(edges, function(err, sortedEdges) {
      if (err) {
        done(err);
        return;
      }

      assert.deepEqual(expectedEdges, sortedEdges);
      done();
    });
  });

  it('should return the right order for two edges', function(done) {
    var edges = [
      {from: 'abu dhabi', to: 'doha'},
      {from: 'Dubai', to: 'Abu Dhabi'}
    ];

    var expectedEdges = [
      {from: 'Dubai', to: 'Abu Dhabi'},
      {from: 'abu dhabi', to: 'doha'}
    ];

    pathGraph.sort(edges, function(err, sortedEdges) {
      if (err) {
        done(err);
        return;
      }

      assert.deepEqual(expectedEdges, sortedEdges);
      done();
    });
  });

  it('should return the right order for a set of edges', function(done) {
    var edges = [
      {'from': 'abu dhabi', 'to': 'rome'},
      {'from': 'london', 'to': 'new york'},
      {'from': 'doha', 'to': 'abu dhabi'},
      {'from': 'Dubai', 'to': 'doha'},
      {'from': 'Rome', 'to': 'paris'},
      {'from': 'new york', 'to': 'dallas'},
      {'from': 'paris', 'to': 'London'}
    ];

    var expectedEdges = [
      {'from': 'Dubai', 'to': 'doha'},
      {'from': 'doha', 'to': 'abu dhabi'},
      {'from': 'abu dhabi', 'to': 'rome'},
      {'from': 'Rome', 'to': 'paris'},
      {'from': 'paris', 'to': 'London'},
      {'from': 'london', 'to': 'new york'},
      {'from': 'new york', 'to': 'dallas'}
    ];

    pathGraph.sort(edges, function(err, sortedEdges) {
      if (err) {
        done(err);
        return;
      }

      assert.deepEqual(expectedEdges, sortedEdges);
      done();
    });
  });

  it('should return an error more that one edge can be a starting node', function(done) {
    var edges = [
      {'from': 'dubai', 'to': 'abu dhabi'},
      {'from': 'dubai', 'to': 'doha'}
    ];

    pathGraph.sort(edges, function(err, sortedEdges) {
      if (err) {
        assert.equal('Found multiple edges startings from the same node.', err.message);
        done();
        return;
      }

      done(new Error('should return and error'));
    });
  });

  it('should return an error more that one edge ends in the same node', function(done) {
    var edges = [
        {'from': 'dubai', 'to': 'abu dhabi'},
        {'from': 'doha', 'to': 'dubai'},
        {'from': 'rome', 'to': 'dubai'}
    ];

    pathGraph.sort(edges, function(err, sortedEdges) {
      if (err) {
        assert.equal('There are more than one possible starting nodes', err.message);
        done();
        return;
      }

      done(new Error('should return and error'));
    });
  });

  it('should return an error if the graph is cyclic', function(done) {
    var edges = [
      {'from': 'dubai', 'to': 'abu dhabi'},
      {'from': 'doha', 'to': 'dubai'},
      {'from': 'abu dhabi', 'to': 'doha'}
    ];

    pathGraph.sort(edges, function(err, sortedEdges) {
      if (err) {
        assert.equal('The given edges form a cycle, no starting point can be automatically selected', err.message);
        done();
        return;
      }

      done(new Error('should return and error'));
    });
  });
});
