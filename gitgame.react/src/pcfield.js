import React from "react";
import Item from "./item";


export default class List extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			notes: []
		}
		this.addNote = this.addNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);

	}

	deleteNote(index){
		let arr = [...this.state.notes];
		arr.splice(index, 1);
		this.setState({notes: arr});
	}

	generateId(){
		this.uId = this.uId || 0; /// Creating a new prop this.uId in our object. if this.uId == undefined this.uId will be 0;
		return this.uId++; // Return this.uId & make this.uId = this.uId + 1;
	}

	addNote(){
		let noteObj = {
			text: "New note",
			posX: 50,
			posY: 50,
			id: this.generateId()
		}
		let arr = [...this.state.notes];
		arr.push(noteObj);
		this.setState({notes: arr}, () => {
			console.log(this.state);
		});
	}


	render(){

		let notes = this.state.notes.map( (item, index) => {
			return <Item 
				key={item.id} 
				text={item.text}
				posX={item.posX}
				posY={item.posY} 
				itemIndex={index} 
				deleteNote={this.deleteNote} 
			/>
		} )

		return(
			<div style={{height: "100%"}}>
				<button style={{zIndex: 1000}} onClick={ this.addNote } className="newnote">+</button>
				<div id="board" className="board">
					{notes}
				</div>
			</div>
			)
		
	}
}





