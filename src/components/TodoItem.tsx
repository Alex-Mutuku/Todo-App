import { Trash2 } from "lucide-react";
import Todo from "../types/todo";
import { motion } from "framer-motion";

type TodoItemProps = {
  todo: Todo;
  toggleComplete: (id: number, completed: boolean) => void;
  deleteTodo: (id: number) => void;
};

function TodoItem({ todo, toggleComplete, deleteTodo }: TodoItemProps) {
  return (
    <>
    <motion.div className="flex">
      <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      layout 
       className="flex grow gap-2 border border-gray-300 rounded-md p-2 mb-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => toggleComplete(todo.id, e.target.checked)}
          className="cursor-pointer scale-125"
        />
        <span className={`flex-grow ${todo.completed ? "line-through" : ""}`}>
          {todo.title}
        </span>
      </motion.div>

      <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
        onClick={() => deleteTodo(todo.id)}
        className=" ml-1 pb-1"
      >
        <Trash2 className="scale-100" />
      </motion.button>
      </motion.div>
   
    </>
  );
}

export default TodoItem;
