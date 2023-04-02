import {Node} from "./Node.js";

class Tree {
  constructor(array) {
    const uniqueArr = [...new Set(array.sort((a, b) => a - b))];
    const root = this.buildTree(uniqueArr, 0, uniqueArr.length - 1);
    this.insert(root, 10);
    this.delete(root, 324);
    console.log(this.find(root, 23));
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
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
