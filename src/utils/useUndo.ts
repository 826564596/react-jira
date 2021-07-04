import React, { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
    const [state, setState] = useState<{ past: T[]; present: T; future: T[] }>({
        past: [], //记录当前状态的历史操作,不记录当前状态
        present: initialPresent, //存放当前的状态
        future: [], //记录当前状态的将来操作,不记录当前状态
    });

    //表示是否能否往后的操作
    const canUndo = state.past.length !== 0;
    //表示是否能否往前的操作
    const canRedo = state.future.length !== 0;
    /** */
    const undo = useCallback(() => {
        setState((currentState) => {
            const { past, present, future } = currentState;
            if (past.length === 0) return currentState;
            //获取past最新的一个值
            const previous = past[past.length - 1];
            //拿掉最新的那个值
            const newPast = past.slice(0, past.length - 1);
            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        });
    }, []);
    /** */
    const redo = useCallback(() => {
        setState((currentState) => {
            const { past, present, future } = currentState;
            if (future.length === 0) return currentState;
            //获取futrue的最开始的值
            const next = future[0];
            const newFuture = future.slice(1);
            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };
        });
    }, []);
    /** */
    const set = useCallback((newPresent: T) => {
        setState((currentState) => {
            const { past, present, future } = currentState;
            if (present === newPresent) return currentState;

            return {
                past: [...past, present],
                present: newPresent,
                future: [],
            };
        });
    }, []);
    /**重置 */
    const reset = useCallback((newPresent: T) => {
        setState({
            past: [],
            present: newPresent,
            future: [],
        });
    }, []);
    return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
