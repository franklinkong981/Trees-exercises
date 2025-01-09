/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) {
      return 0;
    }

    let sum = 0;
    let nodesToVisit = [this.root];

    while (nodesToVisit.length) {
      let currentNode = nodesToVisit.pop();
      sum += currentNode.val;
      for (let child of currentNode.children) {
        nodesToVisit.push(child);
      }
    }
    return sum;  
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;

    let numberEvens = 0;
    let nodesToVisit = [this.root];

    while (nodesToVisit.length) {
      let currentNode = nodesToVisit.pop();
      if (currentNode.val % 2 === 0) numberEvens++;
      for (let child of currentNode.children) {
        nodesToVisit.push(child);
      }
    }
    return numberEvens;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;

    let numberGreaters = 0;
    let nodesToVisit = [this.root];

    while (nodesToVisit.length) {
      let currentNode = nodesToVisit.pop();
      if (currentNode.val > lowerBound) numberGreaters++;
      for (let child of currentNode.children) {
        nodesToVisit.push(child);
      }
    }
    return numberGreaters;
  }
}

module.exports = { Tree, TreeNode };
