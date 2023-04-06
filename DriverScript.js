import Tree from "./Tree.js";

const randomArray = (size) => {
  return Array.from({length: size}, () => Math.floor(Math.random() * 100));
};

const tree = new Tree(randomArray(20));

console.log(tree.isBalanced()); // true

console.log(tree.levelOrder());
console.log(tree.preorder(tree.root));
console.log(tree.postorder(tree.root));
console.log(tree.inorder(tree.root));

for (let i = 0; i < 10; i++) {
  let randomNumber = Math.floor(Math.random() * 100 + 100);
  tree.insert(tree.root, randomNumber); // add 10 random Numbers to tree
}

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.preorder(tree.root));
console.log(tree.postorder(tree.root));
console.log(tree.inorder(tree.root));
