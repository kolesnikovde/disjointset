var assert = require('assert');
var DisjointSet = require('./');

describe('disjointset', function() {
  it('#union', function() {
    var set = new DisjointSet(3);
    set.union(0, 2);

    assert.deepEqual(set.roots, [0, 1, 0]);
  });

  it('#find', function() {
    var set = new DisjointSet(3);
    set.union(0, 2);

    assert.equal(set.find(2), 0);
  });

  it('#isConnected', function() {
    var set = new DisjointSet(3);
    set.union(0, 2);

    assert.equal(set.isConnected(0, 1), false);
    assert.equal(set.isConnected(0, 2), true);
  });

  it('kruskal example', function() {
    // 7 - vertices count.
    function kruskal(edges, n) {
      var edges = edges.sort(function(a, b) { return a.w - b.w }),
          set = new DisjointSet(n),
          mst = [];

      edges.forEach(function(e) {
        if (!set.isConnected(e.u, e.v)) {
          set.union(e.u, e.v);
          mst.push(e);
        }
      });

      return mst;
    }

    var edges = [
      { v: 0, u: 1, w: 7 },
      { v: 0, u: 3, w: 5 },
      { v: 1, u: 2, w: 8 },
      { v: 1, u: 3, w: 9 },
      { v: 1, u: 4, w: 7 },
      { v: 2, u: 4, w: 5 },
      { v: 3, u: 4, w: 15 },
      { v: 3, u: 5, w: 6 },
      { v: 4, u: 5, w: 8 },
      { v: 4, u: 6, w: 9 },
      { v: 5, u: 6, w: 11 }
    ];

    var mst = kruskal(edges, 7);

    assert.deepEqual(mst, [
      { v: 2, u: 4, w: 5 },
      { v: 0, u: 3, w: 5 },
      { v: 3, u: 5, w: 6 },
      { v: 0, u: 1, w: 7 },
      { v: 1, u: 4, w: 7 },
      { v: 4, u: 6, w: 9 }
    ]);
  });
});
