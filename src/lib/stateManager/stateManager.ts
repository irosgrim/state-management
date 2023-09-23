import { useEffect, useState } from 'react';
import { shallowEqual } from './shallowEqual';

 type Selector<T> = (state: State) => T;

 type State = Record<string, any>;
 type Listener = (state: State) => void;

 class Store {
  private listeners: Set<any> = new Set();
  constructor(private state: State = {}){}

  subscribe(listener?: Listener) {
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

 const createHook = (store: Store) => {
  return <T>(selector: Selector<T>) => {
    const [state, setState] = useState(() => selector(store.getState()));
    
    useEffect(() => {
      const listener = (newState: State) => {
        const newSelectedState = selector(newState);
        if (!shallowEqual(newSelectedState, state)) {
          setState(newSelectedState);
        }
      };
      
      store.subscribe(listener);
      return () => {
        store.unsubscribe(listener);
      };
    }, [selector, state]);
    
    return state;
  };
}

