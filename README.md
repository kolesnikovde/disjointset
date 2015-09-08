# disjointset

[Disjoint-set](https://en.wikipedia.org/wiki/Disjoint-set_data_structure) implementation (with path compression and ranks heuristic).

### Installation

    $ npm i disjointset

### Usage

[Kruskal's MST algorithm](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm)

```js
var DisjointSet = require('disjointset');

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

// n - vertices count
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
```

Another example – find groups of elements with connectivity defined by `fn` (see [optimised variant](https://github.com/kolesnikovde/subsets)):
```js
function subsets(items, fn) {
  var set = new DisjointSet(items.length),
      roots = set.roots,
      result = [];

  for (var i = 0, len = items.length; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (!set.isConnected(i, j) && fn(items[i], items[j])) {
        set.union(i, j);
      }
    }

    (result[roots[i]] || (result[roots[i]] = [])).push(items[i]);
  }

  return result.filter(Boolean);
}
```

### API

```js
new DisjointSet(size)
isConnected(node1, node2)
union(node1, node2)
find(node)
```

### License

MIT
