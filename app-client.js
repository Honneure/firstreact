import React from 'react';
import ReactDOM from 'react-dom';

var APP = require('./components/app');
var POSTIT = require('./components/post-it');

var Board = React.createClass({
	propTypes: {
		count: function(props, propName) {
			if (typeof props[propName] !== "number") {
				return new Error('The count property is not a number');
			}
			if (props[propName] > 100) {
				return new Error("Creating" + props[propName] + " notes is too muuuuch!");
			}
		}
	},

	getInitialState: function () {
		return {
			notes: []
		};
	},

	nextId: function() {
		this.uniqueId = this.uniqueId || 0;
		return this.uniqueId++;
	},

	update: function(newText, i) {
		var arr = this.state.notes;
		arr[i].note = newText;
		this.setState({notes: arr});
	},

	remove: function(i){
		var arr = this.state.notes;
		console.log(arr);
		arr.splice(i, 1);
		console.log(arr);
		this.setState({notes: arr});
	},

	eachNote: function(note, i) {
		return (
			<POSTIT key={note.id}
					index={i}
					onChange={this.update}
					onRemove={this.remove}
			>{note['note']}</POSTIT>
			);
	},
	
	convertHTML: function(str){
		var reGexp = /^&;$|&.....;/g;
		  
		  var str2 = str.replace(reGexp, function (match) {
		
		    switch(match) {
		        
		      case "&amp;": 
		        return "&";
		      
		      case "&lt;": 
		        return "<";
		        
		      case "&gt;": 
		        return ">";
		        
		      case "&apos;":
		        return "'";
		        
		      case "&quot;":
		        return '"';
		      
		      case "&#8217;":
		      	return "'";
		      
		      case "&#8221;":
		      	return '"';
		     
		      case "&#8222;":
		      	return '"';
		      	
		      case "&#8216;":
		      	return '"';
		      	
		      case "&#8211;":
		      	return "-";
		    }
		    
		  });
		
		return str2;
	},
	
	componentWillMount: function() {
		var self = this; 
		if(this.props.count) {
			$.ajax( {
      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=" 
      +	this.props.count,
      success: function(results) {
					results.forEach(function(quote) {

						var goodQuote = quote.content.substring(3, quote.content.length  - 5);
						console.log(goodQuote);
						var goodQuote2 = self.convertHTML(goodQuote);
						console.log(goodQuote2);
						goodQuote2 = goodQuote2.substring(0, 60);
						if(goodQuote2.length > 12) {
							var lastQuote1 = '" ' + goodQuote2 + ' ... "';
							self.add(lastQuote1);
						}
						else {
							var lastQuote1 =  '" ' + goodQuote2 + ' "';
							self.add(lastQuote1);
						}

					});
				}
			});
		}
	},
	add: function(text) {
		var arr = this.state.notes;
		arr.push({
			id: this.nextId(),
			note: text
		});
		this.setState({notes: arr});
	},

	render: function() {
		return (<div className="board">
			{this.state.notes.map(this.eachNote)}
			<button className="btn btn-lg btn-success glyphicon glyphicon-plus add"
					onClick={this.add.bind(null, "New Note")} />
		</div>	

		);
	}
});

ReactDOM.render(<Board count={26}/>, document.getElementById('react-container'));