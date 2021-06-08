import React, { Component } from 'react';
import './ToDo.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
class ToDo extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isEditing : false,
			todo      : this.props.todo
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleToggle () {
		this.props.toggleCompletion(this.props.id);
	}
	handleDelete () {
		this.props.deleteTodo(this.props.id);
	}

	handleEdit () {
		this.setState({
			isEditing : !this.state.isEditing
		});
	}

	handleUpdate (e) {
		e.preventDefault();
		this.props.updateTodo(this.props.id, this.state.todo);
		this.setState({
			isEditing : !this.state.isEditing
		});
	}

	handleChange (e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render () {
		let result;
		if (this.state.isEditing) {
			result = (
				<CSSTransition key="editing" timeout={500} classNames="form">
					<form className="Todo-edit-form" onSubmit={this.handleUpdate}>
						<input type="text" id="todo" name="todo" value={this.state.todo} onChange={this.handleChange} />
						<button>Update</button>
					</form>
				</CSSTransition>
			);
		}
		else {
			result = (
				<CSSTransition key="normal" timeout={500} classNames="task-text">
					<li className="Todo-task" onClick={this.handleToggle}>
						{this.props.todo}
					</li>
				</CSSTransition>
			);
		}
		return (
			<TransitionGroup
				className={

						this.props.completed ? 'Todo completed' :
						'Todo'
				}
			>
				{result}
				<div className="Todo-buttons">
					<button onClick={this.handleUpdate}>
						<i class="fas fa-pen" />
					</button>
					<button onClick={this.handleDelete}>
						<i class="fas fa-trash" />
					</button>
				</div>
			</TransitionGroup>
		);
	}
}

export default ToDo;
