export type INode = BSTNode | null

export class BSTNode {
  e: number
  left: INode
  right: INode
  constructor(e: number, left = null, right = null) {
    this.e = e
    this.left = left
    this.right = right
  }
}

export class BST {
  root: INode
  constructor(e: number | null = null) {
    if (typeof e === 'number') {
      this.root = new BSTNode(e)
      return
    }
    this.root = null
  }
  add(e: number): BST {
    const innerAdd = (node: INode, e: number): INode => {
      if (node === null) {
        return new BSTNode(e)
      }
      if (e < node.e) {
        node.left = innerAdd(node.left, e)
      } else {
        node.right = innerAdd(node.right, e)
      }
      return node
    }
    this.root = innerAdd(this.root, e)
    return this
  }
  // 移除
  // 包含
  // 中序遍历
  midOrder(fn: Function = () => {}): number[] {
    const res: number[] = []
    const innerPreOrder = (node: INode) => {
      if (node === null) {
        return
      }
      innerPreOrder(node.left)
      fn(node.e)
      node.e && res.push(node.e)
      innerPreOrder(node.right)
    }
    innerPreOrder(this.root)
    return res
  }
  // 层序遍历
  levelOrder(fn: Function = () => {}): number[] {
    const res = []
    const queue = [this.root]
    while (queue.length) {
      const node = queue.shift()
      if (node === null || node === undefined) continue
      fn(node.e)
      res.push(node.e)
      queue.push(node.left)
      queue.push(node.right)
    }
    return res
  }
  // 中序遍历，非递归实现
  midOrder2(fn: Function = () => {}): number[] {
    const res = []
    const stack: Array<INode | number> = [this.root]
    while (stack.length) {
      const node = stack.pop()
      if (node === null || node === undefined) continue
      if (typeof node === 'number') {
        fn(node)
        res.push(node)
      } else {
        stack.push(node.right)
        stack.push(node.e)
        stack.push(node.left)
      }
    }
    return res
  }
}