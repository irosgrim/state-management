import { useEffect, useState } from 'react';
import { shallowEquality } from '../shallowEquality';

export type Selector<T> = (state: State) => T;

export type State = Record<string, any>;
export type Listener = (state: State) => void;

class GlobalState {
  private state: State = {};
  private listeners: Set<any> = new Set();

  subscribe(listener: Listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  setState(newState: Partial<State>) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  getState(): State {
    return this.state;
  }
}

export const globalState = new GlobalState();

export const useGlobalState = <T>(selector: Selector<T>) => {
  const [state, setState] = useState(() => selector(globalState.getState()));

  useEffect(() => {
    const listener = (newState: State) => {
      const newSelectedState = selector(newState);
      if (!shallowEquality(newSelectedState, state)) {
        setState(newSelectedState);
      }
    };

    globalState.subscribe(listener);
    return () => {
      globalState.unsubscribe(listener);
    };
  }, [selector, state]);

  return state;
};

