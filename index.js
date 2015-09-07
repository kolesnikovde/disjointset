module.exports = DisjointSet;

function DisjointSet(n) {
  var roots = this.roots = new Array(n);
  var ranks = this.ranks = new Array(n);

  for (var i = 0; i < n; ++i) {
    roots[i] = i;
    ranks[i] = 0;
  }
}

var proto = DisjointSet.prototype;

proto.isConnected = function(node1, node2) {
  return this.find(node1) === this.find(node2);
}

proto.find = function(node) {
  var roots = this.roots;

  while (node !== roots[node]) {
    node = roots[node] = roots[roots[node]];
  }

  return node;
}

proto.union = function(node1, node2) {
  var root1 = this.find(node1);
  var root2 = this.find(node2);

  if (root1 === root2) return;

  var rank1 = this.ranks[root1];
  var rank2 = this.ranks[root2];

  if (rank1 < rank2) {
    this.roots[root1] = root2;
  } else {
    if (rank1 === rank2) {
      this.ranks[root1] += 1;
    }

    this.roots[root2] = root1;
  }
}
