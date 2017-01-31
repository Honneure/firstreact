import React from 'react';
import reactDOM from 'react-dom';

var postIt = React.createClass({
	getInitialState: function() {
		return {
			editing: false,
			text: this.props.children || "Hello World bitches!"
		};
	},

	componentWillMount: function() {
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 150) + 'px',
			top: this.randomBetween(0, window.innerHeight - 150) + 'px',
			transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
		};
	},

	// draggable with jqueryUI ont note
	componentDidMount: function () {
	$(".note").draggable();
  },

	randomBetween: function(min, max) {
		return (min + Math.ceil(Math.random()*max));
	},

	edit: function() {
		this.setState({editing: true});
	},

	save: function() {
		this.props.onChange(this.refs.newText.value, this.props.index);
		this.setState({
			editing: false,	
			text: this.refs.newText.value
		});
	},

	autoSave: function () {
		if(this.state.editing)  {

		}
	},

	remove: function() {
		this.props.onRemove(this.props.index);
	},

	renderDisplay: function() {
	
			return (
					<div className="note" 
					style={this.style} 
					onDoubleClick={this.edit}>
					<p>{this.props.children}</p>
						<span>
							<button onClick={this.edit}
							className="btn btn-success glyphicon glyphicon-pencil"></button>
							<button onClick={this.remove}
							className="btn btn-danger glyphicon glyphicon-trash"></button>
						</span>
					</div>
				);
		},

	renderForm: function() {
		return (
			<div className="note" style={this.style}>
			<textarea ref="newText"
			defaultValue={this.state.text}
			className="form-control"></textarea>
			<button onClick={this.save}
			className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk">
			</button>
			</div>
			);

	},

 	render: function() {
		
	if(this.state.editing) {
			return this.renderForm(); 
	}

	else {
			return this.renderDisplay();
 	}
},

});


module.exports = postIt;