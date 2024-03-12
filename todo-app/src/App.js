import logo from './logo.svg';
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { useCallback, useRef, useState } from 'react';
function createBulkTodos(){
	const array = [];
	for(let i=1;i<2500;i++){
		array.push({
			id : i,
			text : `할 일${i}`,
			checked:false,
		});
	}
	return array;
}
function App() {
	const [todos, setTodos] = useState(createBulkTodos());
	const nextId = useRef(2501);
	const onInsert = useCallback(
		(text) => {
			const todo = {
				id: nextId.current,
				text,
				checked: false,
			};
			setTodos(todos /*변경점*/=> todos.concat(todo));  
			nextId.current += 1;
		},
		[]/*변경점*/,
	);
	const onRemove = useCallback(
		(id) => {
			setTodos(todos /*변경점*/ => todos.filter((todo) => todo.id !== id));		
		},
		[]/*변경점*/,
	);
	const onToggle = useCallback((id) => {
		setTodos(todos => 		/*변경점*/ 
			todos.map((todo) =>
				todo.id === id ? { ...todo, checked: !todo.checked } : todo,
			),
		);
	},[]/*변경점*/,
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
