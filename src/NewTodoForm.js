import React, { Component } from 'react';
import './NewTodoForm.css';
class NewTodoForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
			todo : ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange (e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit (e) {
		e.preventDefault();
		this.props.addTodo(this.state);
		this.setState({
			todo : ''
		});
	}
	render () {
		return (
			<form className="NewTodoForm" onSubmit={this.handleSubmit}>
				<label htmlFor="task">New Todo</label>
				<input
					type="text"
					name="todo"
					id="todo"
					placeholder="New Todo"
					value={this.state.todo}
					onChange={this.handleChange}
				/>
				<button>Add Todo</button>
			</form>
		);
	}
}

export default NewTodoForm;
