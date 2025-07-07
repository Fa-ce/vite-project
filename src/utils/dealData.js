/**
 * @Author: 花生
 * @description: 将树形结构扁平化
 * @param {*} treeData 树形结构数据
 * @param {*} childrenKey 子节点的key，默认为"children"
 * @return {*}
 */
export function flattenTree(treeData, childrenKey = 'children') {
    if (!Array.isArray(treeData)) {
        throw new Error('Input must be an array')
    }
    const result = []
    function traverse(arr) {
        arr.forEach((item) => {
            const { [childrenKey]: children, ...data } = item // 将children属性从对象中删除，并返回剩余的属性
            result.push(data) // 将当前节点(不包含子节点)添加到结果数组中
            if (children && Array.isArray(children)) {
                traverse(children) // 递归处理子节点
            }
        })
    }
    traverse(treeData) // 开始遍历树形数据
    // 返回扁平化后的结果
    return result
}

/**
 * @Author: 花生
 * @description: 清洗树结构中的数据
 * @param {*} tree 树形结构数据
 * @param {*} childrenKey 子节点的key，默认为"children"
 * @param {*} callback 回调函数，用于对每个节点的清洗，返回一个新的节点对象
 * @param {*} newChildrenKey 新的子节点的key，默认为"children"
 * @return {*[]} 返回清洗后的树形数据
 */

export function cleanTreeData(
    tree,
    callback,
    childrenKey = 'children',
    newChildrenKey = 'children'
) {
    // 检查输入是否为数组
    if (!Array.isArray(tree)) {
        throw new Error('Input must be an array')
    }
    const result = []
    function traverse(arr) {
        arr.forEach((item) => {
            const { [childrenKey]: children, ...data } = item
            const newItem = callback ? callback(data) : data
            if (children && Array.isArray(children)) {
                traverse(children)
            }
            result.push(newItem)
        })
    }
    traverse(tree)
    return result
}
