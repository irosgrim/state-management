import { useState } from 'react'
import './App.css'
import { Header } from './Header'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { Todos } from './Todos'
import { useGlobalState } from './lib/state/useGlobalState'

function App() {
  const [count, setCount] = useState(0);
  const { getTodos, clearTodos } = useGlobalState<any>((state) => (
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
          <nav>
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
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
