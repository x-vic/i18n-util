import { RBTree } from '../src'

describe('测试红黑树', () => {
  it('根元素为 null', () => {
    const rbt = new RBTree()
    expect(rbt.root).toBe(null)
  })
  it('根节点保持黑色', () => {
    const rbt = new RBTree(5)
    expect(rbt.root?.color).toBe('black')
    rbt.add(3)
    expect(rbt.root?.color).toBe('black')
  })
  it('是否是一颗红黑树，通过层序遍历来验证', () => {
    const rbt = new RBTree(6).add(5).add(4).add(3)
    expect(rbt.levelOrder()).toEqual([5, 4, 6, 3])
  })
  it('是否正确左旋', () => {
    const rbt = new RBTree(4).add(5)
    expect(rbt.levelOrder()).toEqual([5, 4])
    expect(rbt.root?.left?.color).toBe('red')
  })
  it('是否正确右旋', () => {
    const rbt = new RBTree(5).add(3).add(4)
    expect(rbt.levelOrder()).toEqual([4, 3, 5])
    expect(rbt.root?.color).toBe('black')
    expect(rbt.root?.left?.color).toBe('black')
    expect(rbt.root?.right?.color).toBe('black')
  })
  // it('层序遍历', () => {
  //   const rbt = new RBTree(3).add(6).add(4).add(2)
  //   expect(rbt.levelOrder()).toEqual([3, 2, 6, 4]) 
  // })
  // it('非递归实现中序遍历', () => {
  //   const rbt = new RBTree(3).add(6).add(4).add(2)
  //   expect(rbt.midOrder2()).toEqual([2, 3, 4, 6])
  // })
})