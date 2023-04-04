import { Node } from "./Node.js";

class Tree {
  constructor(array) {
    this.uniqueArr = [...new Set(array.sort((a, b) => a - b))];
    this.root = this.buildTree(this.uniqueArr, 0, this.uniqueArr.length - 1);
    this.insert(this.root, 10);
    this.delete(this.root, 324);
    this.find(this.root, 23);
    this.levelOrder();
    this.preorder(this.root);
    this.inorder(this.root);
    this.postorder(this.root);
    this.prettyPrint(this.root);
    console.log(this.height(this.root, 10));
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  buildTree(arr, start, end) {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  insert(root, data) {
    // Create a new Node
    let node = new Node(data);

    // if root is undefined return
    if (!root) {
      root = node;
      return;
    }

    let prev = null;
    let temp = root;

    // Compare
    // if data in actual node is smaller than data go left
    // if data in actual node is bigger than data go right
    while (temp) {
      if (temp.data > data) {
        prev = temp;
        temp = temp.left;
      } else if (temp.data < data) {
        prev = temp;
        temp = temp.right;
      }
    }

    //
    if (prev.data > data) prev.left = node;
    else prev.right = node;

    return root;
  }

  delete(root, data) {
    // Base case
    if (root == null) return root;

    // Recursive calls for ancestors of
    // node to be deleted
    if (root.data > data) {
      root.left = this.delete(root.left, data);
      return root;
    } else if (root.data < data) {
      root.right = this.delete(root.right, data);
      return root;
    }

    // We reach here when root is the node
    // to be deleted.

    // If one of the children is empty
    if (root.left == null) {
      let temp = root.right;
      return temp;
    } else if (root.right == null) {
      let temp = root.left;
      return temp;
    }

    // If both children exist
    else {
      let succParent = root;

      // Find successor
      let succ = root.right;

      while (succ.left != null) {
        succParent = succ;
        succ = succ.left;
      }

      // Delete successor. Since successor
      // is always left child of its parent
      // we can safely make successor's right
      // right child as left of its parent.
      // If there is no succ, then assign
      // succ->right to succParent->right
      if (succParent != root) succParent.left = succ.right;
      else succParent.right = succ.right;

      // Copy Successor Data to root
      root.data = succ.data;

      return root;
    }
  }

  find(root, data) {
    if (root == null) return null;

    if (root.data == data) return root;

    let found = this.find(root.left, data);
    if (found != null) return found;

    return this.find(root.right, data);
  }

  levelOrder(callback) {
    if (this.root == null) return [];

    const queue = [this.root];
    const result = [[this.root.data]];

    while (queue.length != 0) {
      let node = queue.shift();
      let tempArray = [];

      if (node.left != null) {
        tempArray.push(node.left.data);
        queue.push(node.left);
      }
      if (node.right != null) {
        tempArray.push(node.right.data);
        queue.push(node.right);
      }

      if (tempArray.length != 0) {
        callback ? callback(node) : result.push(tempArray);
      }
    }

    return result;
  }

  preorder(root, arr = [this.root.data], callback) {
    if (root == null) return;

    let result = arr;

    if (root.left != null) {
      callback ? callback(root.data) : result.push(root.left.data);
    }
    this.preorder(root.left, result);

    if (root.right != null) {
      callback ? callback(root.data) : result.push(root.right.data);
    }
    this.preorder(root.right, result);

    return result;
  }

  inorder(root, arr = [], callback) {
    if (root == null) return;

    let result = arr;

    this.inorder(root.left, result);
    callback ? callback(root.data) : result.push(root.data);
    this.inorder(root.right, result);

    return result;
  }

  postorder(root, arr = [], callback) {
    if (root == null) return;

    let result = arr;

    this.postorder(root.left, result);
    this.postorder(root.right, result);
    callback ? callback(root.data) : result.push(root.data);

    return result;
  }

  height(root, data) {
    if (root == null) return;

    if (root.data == data) return root;

    let left = root.left;
    let right = root.right;

    if (left != null) {
      this.height(left, data);
    }

    if (right != null) {
      this.height(right, data);
    }

    console.log(left);
    console.log(right);
    // take a value and compare to data
    // go to left leaf and compare
    // go to right leaf and compare
    // take another root anc repeat until is done
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
