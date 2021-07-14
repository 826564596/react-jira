interface ReorderProps {
    fromId: number;
    referenceId: number;
    type: "after" | "before";
    list: { id: number }[];
}
/**
 * 在本地对排序进行乐观更新
 * @param fromId 要排序的项目的id
 * @param type 'before' | 'after'
 * @param referenceId 参照id
 * @param list 要排序的列表, 比如tasks, kanbans
 */
export const reorder = ({ fromId, referenceId, type, list }: ReorderProps) => {
    const copiedList = [...list];
    const moveItemIndex = copiedList.findIndex((item) => {
        return item.id === fromId;
    });
    //当跨看板移动时，移到另一看板的最末处超出目标数组的原来的长度，referenceId就会为undefined
    if (!referenceId) {
        return insertAfter({
            list: [...copiedList],
            fromId: moveItemIndex,
            toId: copiedList.length - 1,
        });
    }
    //找到目标
    const targetIndex = copiedList.findIndex((item) => {
        return item.id === referenceId;
    });
    const insert = type === "after" ? insertAfter : insertBefore;
    return insert({
        list: [...copiedList],
        fromId: moveItemIndex,
        toId: targetIndex,
    });
};

/**
 * 在list中将from放在to的前边  即fromId < toId,所选项往后前
 */
interface inserProps {
    fromId: number;
    toId: number;
    list: unknown[];
}
const insertBefore = ({ list, fromId, toId }: inserProps) => {
    //获得to项
    const toItem = list[toId];
    //删除from项
    const removedItem = list.splice(fromId, 1)[0];
    //获得新的toIndex
    const toIndex = list.indexOf(toItem);
    list.splice(toIndex, 0, removedItem);
    return list;
};
/**
 * 在list中将from放在to的后边  即fromId > toId,所选项往后放
 */
const insertAfter = ({ list, fromId, toId }: inserProps) => {
    //获得to项
    const toItem = list[toId];
    //删除from项
    const removedItem = list.splice(fromId, 1)[0];
    //获得新的toIndex
    const toIndex = list.indexOf(toItem);
    //往后放需要注意前一项的index改变了
    list.splice(toIndex + 1, 0, removedItem);
    return list;
};
