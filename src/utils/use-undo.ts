import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";
const ActionTypes = [UNDO, REDO, SET, RESET] as const;
interface State<T> {
  past: T[];
  present: T;
  furture: T[];
}
type Action<T> = { newState?: T; type: typeof ActionTypes[number] };
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, furture } = state;
  const { type, newState } = action;
  switch (type) {
    case UNDO:
      if (past.length === 0) return state;
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        furture: [present, ...furture],
      };

    case REDO:
      if (furture.length === 0) return state;
      return {
        past: [...past, present],
        present: furture[0],
        furture: furture.slice(1),
      };

    case SET:
      if (furture.length === 0) return state;
      return {
        past: [...past, present],
        present: newState,
        furture,
      };
    case RESET:
      return {
        past: [],
        present: newState,
        furture: [],
      };
    default:
      return state;
  }
};
export const useUndo = <T>(initalValue: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initalValue,
    furture: [],
  } as State<T>);

  const undo = useCallback(() => dispatch({ type: UNDO }), []);
  const redo = useCallback(() => dispatch({ type: REDO }), []);
  //这里因为三个变量耦合严重，所以这里合并为一对象，并且使用setState函数减少对外界变量的依赖
  const set = useCallback(
    (value) => dispatch({ type: SET, newState: value }),
    []
  );
  const reSet = useCallback(
    (value) => dispatch({ type: RESET, newState: value }),
    []
  );
  return [
    state,
    {
      set,
      undo,
      redo,
      reSet,
    },
  ] as const;
};
