import logo from './logo.svg';
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { useCallback, useRef, useState } from 'react';
function App() {
	const [todos, setTodos] = useState([
	]);
	const nextId = useRef(1);
	const onInsert = useCallback(
		(text) => {
			const todo = {
				id: nextId.current,
				text,
				checked: false,
			};
			setTodos(todos.concat(todo));
			nextId.current += 1;
		},
		[todos],
	);
	const onRemove = useCallback(
		(id) => {
			setTodos(todos.filter((todo) => todo.id !== id));
		},
		[todos],
	);
	const onToggle = useCallback((id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, checked: !todo.checked } : todo,
			),
		);
	},[todos],
  );
	return (
		<>
			<TodoTemplate>
				<TodoInsert onInsert={onInsert} />
				<TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
			</TodoTemplate>
		</>
	);
}

export default App;
