import { useCallback, useReducer, useState } from "react";
const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
    past: T[];
    present: T;
    future: T[];
};
type Aciton<T> = {
    newPresent?: T;
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};
const undoReducer = <T>(state: State<T>, action: Aciton<T>) => {
    const { past, present, future } = state;
    const { type, newPresent } = action;
    switch (type) {
        case UNDO: {
            if (past.length === 0) return state;
            //获取past最新的一个值
            const previous = past[past.length - 1];
            //拿掉最新的那个值
            const newPast = past.slice(0, past.length - 1);
            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        }
        case REDO: {
            if (future.length === 0) return state;
            //获取futrue的最开始的值
            const next = future[0];
            const newFuture = future.slice(1);
            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };
        }
        case SET: {
            if (present === newPresent) return state;

            return {
                past: [...past, present],
                present: newPresent,
                future: [],
            };
        }
        case RESET: {
            return {
                past: [],
                present: newPresent,
                future: [],
            };
        }
    }
    return state;
};

export const useUndo = <T>(initialPresent: T) => {
    const [state, dispatch] = useReducer(undoReducer, {
        past: [], //记录当前状态的历史操作,不记录当前状态
        present: initialPresent, //存放当前的状态
        future: [], //记录当前状态的将来操作,不记录当前状态
    } as State<T>);
    // const [state, setState] = useState<{ past: T[]; present: T; future: T[] }>({
    //     past: [], //记录当前状态的历史操作,不记录当前状态
    //     present: initialPresent, //存放当前的状态
    //     future: [], //记录当前状态的将来操作,不记录当前状态
    // });

    //表示是否能否往后的操作
    const canUndo = state.past.length !== 0;
    //表示是否能否往前的操作
    const canRedo = state.future.length !== 0;
    /**向上操作 */
    const undo = useCallback(() => dispatch({ type: UNDO }), []);
    /**向下操作 */
    const redo = useCallback(() => dispatch({ type: REDO }), []);
    /**设置最新值 */
    const set = useCallback((newPresent: T) => dispatch({ newPresent, type: SET }), []);
    /**重置 */
    const reset = useCallback((newPresent: T) => dispatch({ newPresent, type: RESET }), []);
    return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
