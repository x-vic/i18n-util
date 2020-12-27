type INode = RBNode | null | undefined

enum Color {
  red = 'red',
  black = 'black'
}

class RBNode {
  e: number
  left: INode
  right: INode
  color: Color
  constructor(e: number, left = null, right = null, color = Color.red) {
    this.e = e
    this.left = left
    this.right = right
    this.color = color
  }
}

export class RBTree {
  root: INode
  constructor(e: number | null = null) {
    if (typeof e === 'number') {
      this.root = new RBNode(e, null, null, Color.black)
      return this
    }
    this.root = null
    return this
  }
  // 左旋转
  //          node                    x
  //          /  \                  /  \
  //         T1   x      ==>     node  T3
  //            /  \             /  \
  //          T2   T3           T1  T2
  private leftRotate(node: RBNode): INode {
    const x = node.right
    if (x === null || x === void 0) return node
    node.right = x.left
    x.left = node
    x.color = node.color
    node.color = Color.red
    return x
  }
  // 右旋转
  //          node                    x
  //          /  \                  /  \
  //         x   T1       ==>     T2  node
  //       /  \                       /  \
  //      T2  T3                     T3  T1
  private RightRotate(node: RBNode): INode {
    const x = node.left
    if (x === null || x === void 0) return node
    node.left = x.right
    x.right = node
    x.color = node.color
    node.color = Color.red
    return x
  }
  // 颜色反转
  private flipColor(node: RBNode): RBNode {
    node.color = Color.red
    if (node.left) {
      node.left.color = Color.black
    }
    if (node.right) {
      node.right.color = Color.black
    }
    return node
  }
  add(e: number): RBTree {
    const innerAdd = (node: INode, e: number): INode => {
      if (node === null || node === void 0) {
        return new RBNode(e)
      }
      if (e < node.e) {
        node.left = innerAdd(node.left, e)
      } else {
        node.right = innerAdd(node.right, e)
      }
      // 进行旋转以及颜色反转的操作
      // 左旋   黑 -> 红   ==>   红 <- 黑
      if (node?.right?.color  === Color.red && node?.left?.color !== Color.red) {
        node = this.leftRotate(node)
      }
      // 右旋   红 <- 红 <- 黑   ==>   红 <- 黑 -> 红
      if (node?.left?.color === Color.red && node.left.left?.color === Color.red) {
        node = this.RightRotate(node)
      }
      // 颜色反转
      if (node?.left?.color === Color.red && node.right?.color === Color.red) {
        node = this.flipColor(node)
      }
      return node
    }
    this.root = innerAdd(this.root, e)
    // 根节点颜色保持黑色
    if (this.root) {
      this.root.color = Color.black
    }
    return this
  }
  // 移除
  // 包含
  // 中序遍历
  midOrder(fn: Function = () => {}): number[] {
    const res: number[] = []
    const innerPreOrder = (node: INode) => {
      if (node === null || node === void 0) {
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