/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    function minDepthHelper(rootNode) {
      if (!rootNode.left && !rootNode.right) return 1;
      else if (rootNode.left && !rootNode.right) return 1 + minDepthHelper(rootNode.left);
      else if (!rootNode.left && rootNode.right) return 1 + minDepthHelper(rootNode.right);
      else return 1 + Math.min(minDepthHelper(rootNode.left), minDepthHelper(rootNode.right));
    }

    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function maxDepthHelper(rootNode) {
      if (!rootNode.left && !rootNode.right) return 1;
      else if (rootNode.left && !rootNode.right) return 1 + maxDepthHelper(rootNode.left);
      else if (!rootNode.left && rootNode.right) return 1 + maxDepthHelper(rootNode.right);
      else return 1 + Math.max(maxDepthHelper(rootNode.left), maxDepthHelper(rootNode.right));
    }

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      if (node === null) return 0;
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
    let nextLargestValue = null;

    function nextLargestHelper(rootNode) {
      if (rootNode.val > lowerBound && (rootNode.val < nextLargestValue || (!nextLargestValue))) nextLargestValue = rootNode.val;

      if (rootNode.left) nextLargestHelper(rootNode.left);
      if (rootNode.right) nextLargestHelper(rootNode.right);
    }

    nextLargestHelper(this.root);
    return nextLargestValue;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (this.root == node1 || this.root == node2) return false;

    //Assume that node1 and node2 are guaranteed to be in the tree, which means if we reach this point, the root node must have 2 children.
    let nodesAtCurrentLevel = [this.root];
    let nodesAtNextLevel = [];
    while (nodesAtCurrentLevel.length) {
      for (let node of nodesAtCurrentLevel) {
        if ((node.left == node1 && node.right == node2) || (node.right == node2 && node.left == node1)) return false;
        if (node.left) nodesAtNextLevel.push(node.left);
        if (node.right) nodesAtNextLevel.push(node.right);
      }

      if (nodesAtNextLevel.includes(node1) && nodesAtNextLevel.includes(node2)) return true;
      else if (nodesAtNextLevel.includes(node1) || nodesAtNextLevel.includes(node2)) return false;

      nodesAtCurrentLevel = nodesAtNextLevel;
      nodesAtNextLevel = [];
    }
    return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {
    const values = [];

    function traverse(node) {
      if (node) {
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        values.push("#");
      }
    }

    traverse(tree.root);
    return values.join(" ");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {
    if (!stringTree) return null;

    const values = stringTree.split(" ");

    function buildTree() {
      // building a tree starting from the beginning of the array
      if (values.length) {
        const currentVal = values.shift();

        if (currentVal === "#") return null;

        // remember to convert values back into numbers
        let currentNode = new BinaryTreeNode(+currentVal);
        currentNode.left = buildTree();
        currentNode.right = buildTree();

        return currentNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode=this.root) {
    // base case 1: empty tree
    if (currentNode === null) return null;

    // base case 2: root is one of the target nodes
    if (currentNode === node1 || currentNode === node2) return currentNode;

    // recursively search the left sub-tree
    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);

    // recursively search the right sub-tree
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    // if neither left nor right is null, currentNode is the ancestor
    if (left !== null && right !== null) return currentNode;
    
    // if one node is not null, return it
    if (left !== null || right !== null) return left || right;
    
    // left and right are both null, return null
    if (left === null && right === null) return null;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
