import { BST } from '../src'

describe('测试二分搜索树', () => {
  it('根元素为 null', () => {
    const bst = new BST()
    expect(bst.root).toBe(null)
  })
  it('添加元素', () => {
    const bst = new BST(5)
    expect(bst.root?.e).toBe(5)
    bst.add(3)
    expect(bst.root?.left?.e).toBe(3)
    bst.add(8)
    expect(bst.root?.right?.e).toBe(8)
  })
  it('递归中序遍历', () => {
    const bst = new BST(3).add(6).add(4).add(2)
    expect(bst.midOrder()).toEqual([2, 3, 4, 6])
  })
  it('层序遍历', () => {
    const bst = new BST(3).add(6).add(4).add(2)
    expect(bst.levelOrder()).toEqual([3, 2, 6, 4]) 
  })
  it('非递归实现中序遍历', () => {
    const bst = new BST(3).add(6).add(4).add(2)
    expect(bst.midOrder2()).toEqual([2, 3, 4, 6])
  })
})