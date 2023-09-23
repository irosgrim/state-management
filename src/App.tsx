import { useState } from 'react'
import './App.css'
import { Header } from './Header'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { Todos } from './Todos'
import { TodoState, useTodoState } from './store/todoStore'
import { useGlobalState } from './store/appStore'
import { AppState } from './store/types'
import { Checkboxes } from './Checkboxes'

function App() {
  const { addToCount } = useGlobalState<Pick<AppState, "addToCount">>(state => (
    {
      addToCount: state.addToCount,
    }
  ));
  const { getTodos, clearTodos } = useTodoState<Pick<TodoState, "getTodos" | "clearTodos">>((state) => (
    {
      getTodos: state.getTodos,
      clearTodos: state.clearTodos,
    }
  ));

  return (
    <>
      <Sidebar />
      <main>
        <Header />
        <div className="content">
          <p>This is a custom state management playground. This state manager is a basic implementation using the observer pattern.</p>
          <Checkboxes />
          <nav>
            <button onClick={() => addToCount(11)}>
              Add 11 to count
            </button>
            <button onClick={() => getTodos(10)}>get todos</button>
            <button onClick={() => clearTodos()}>clear todos</button>
          </nav>
          <Todos />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default App
