import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import NewTodoForm from './NewTodoForm';
import ToDo from './ToDo';
import './TodoList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
class TodoList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			todos : []
		};
		this.deleteTodo = this.deleteTodo.bind(this);
		this.addTodo = this.addTodo.bind(this);
		this.updateTodo = this.updateTodo.bind(this);
		this.toggleCompletion = this.toggleCompletion.bind(this);
	}
	addTodo (todo) {
		const newTodo = {
			...todo,
			id : uuid()
		};

		this.setState((st) => {
			return {
				todos : [ ...st.todos, newTodo ]
			};
		});
	}
	deleteTodo (id) {
		this.setState((st) => {
			return {
				todos : st.todos.filter((t) => t.id !== id)
			};
		});
	}

	updateTodo (id, updatedTodo) {
		const updatedTodos = this.state.todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, todo: updatedTodo };
			}
			return todo;
		});
		this.setState({ todos: updatedTodos });
	}

	toggleCompletion (id) {
		const updatedTodos = this.state.todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		this.setState({ todos: updatedTodos });
	}

	render () {
		return (
			<div className="TodoList">
				<h1>
					Get To Work! <span>An Animated Todo List Made With React Hooks.</span>
				</h1>
				<NewTodoForm addTodo={this.addTodo} />
				<ul>
					<TransitionGroup className="todo-list">
						{this.state.todos.map((todo) => {
							return (
								<CSSTransition key={todo.id} timeout={500} classNames="todo">
									<ToDo
										key={todo.id}
										todo={todo.todo}
										deleteTodo={this.deleteTodo}
										completed={todo.completed}
										id={todo.id}
										updateTodo={this.updateTodo}
										toggleCompletion={this.toggleCompletion}
									/>
								</CSSTransition>
							);
						})}
					</TransitionGroup>
				</ul>
			</div>
		);
	}
}

export default TodoList;
