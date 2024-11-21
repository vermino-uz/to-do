import { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, `users/${user.uid}/todos`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData: Todo[] = [];
      snapshot.forEach((doc) => {
        todosData.push({ id: doc.id, ...doc.data() } as Todo);
      });
      setTodos(todosData);
    });

    return unsubscribe;
  }, [user]);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim() || !user) return;

    await addDoc(collection(db, `users/${user.uid}/todos`), {
      text: newTodo,
      completed: false,
    });
    setNewTodo('');
  };

  const toggleTodo = async (todo: Todo) => {
    await updateDoc(doc(db, `users/${user!.uid}/todos/${todo.id}`), {
      completed: !todo.completed,
    });
  };

  const deleteTodo = async (todoId: string) => {
    await deleteDoc(doc(db, `users/${user!.uid}/todos/${todoId}`));
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <form onSubmit={addTodo} className="flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-50"
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo)}
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.text}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}