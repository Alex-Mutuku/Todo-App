
import { useEffect, useState } from 'react';
import  Todo  from './types/todo';
import TodoItem from './components/TodoItem';
import { AnimatePresence } from 'framer-motion';
import './index.css';


function App() {

  // dummy data
  const [todos, setTodos] = useState<Todo[]>(() =>{
    if(typeof window !== 'undefined'){
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [
    { id: 1, title: 'Future task by Lekky Tech', completed: false },
    { id: 2, title: 'Current task by Lekky Tech', completed: false },
    { id: 3, title: 'Previous task by Lekky Tech', completed: false },
  ];
}

return [
  { id: 1, title: 'Future task by Lekky Tech', completed: false },
  { id: 2, title: 'Current task by Lekky Tech', completed: false },
  { id: 3, title: 'Previous task by Lekky Tech', completed: false },
];
});


  const [input, setInput] = useState('');

  //persisting on the browser
  useEffect(() => {
     localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  //adding a new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTodos([
      ...todos,
      { id: Date.now(), title: input, completed: false },
      
    ]);
    setInput('');
  }
    //toggle completion status
    const toggleComplete = (id: number, completed: boolean) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
    }

    //delete todo
    const deleteTodo = (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    }

  //delete all todos
  const deleteAllTodos = () => {
    setTodos( todos.filter((todo) => !todo.completed ));
  }



  return (
    <>
     <div className='max-w-md mx-auto p-4 bg-gray-50 rounded-lg shadow-md m-2 h-auto scroll-auto'>
     <AnimatePresence>
     <h1 className='font-bold mb-4 text-2xl text-center text-shadow font-roboto-500'>My Todos</h1>

     {/* Form to add a new todo */}
      <form onSubmit={addTodo} className='flex mb-4'>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='border border-gray-300 rounded-l-md px-2 py-1 flex-grow'
          placeholder='Add a new todo'
        />
        <button type="submit" 
        className='bg-gray-900 hover:bg-gray-700 text-white px-4 py-1 rounded-r-md'>
          Add
        </button>
      </form>

      {/* List of todos */}
      <div className='space-y-2'>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        )
        )}
        
      </div>

      {todos.length === 0 && (
          <p className='text-center text-sm text-gray-500 mt-4'>
            No todos available yet.
          </p>
        )}

      {todos.length > 0 && (
          <p className='text-center text-sm text-gray-500'>
            {todos.filter( todo => todo.completed).length}/{todos.length} completed
          </p>
        )
          }

          {todos.filter( todo => todo.completed).length > 1 && (
            <p className='text-center text-sm text-red-500 mt-2 mb-2 hover:underline cursor-pointer' onClick={deleteAllTodos}>
              Delete all completed({todos.filter( todo => todo.completed).length})</p>
          )
            }
         </AnimatePresence>
      </div>
    </>
  );
}
export default App
