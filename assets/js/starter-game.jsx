import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value :"",win:8,guess:8};
	}

	componentDidMount() {
		this.shufflechars(this);
	}

	show(_ev) {

		var val=_ev.target.id;
		_ev.target.innerHTML=_ev.target.value;
		_ev.persist();
		let currstate=this.state.value;
		let state1=_.assign(this.state,{value:_ev.target.id});
		if(currstate=="") {
			this.setState(state1);
			document.getElementById(_ev.target.id).disabled = true; 
			//so that double clicking on the same button does not count in as match
		}
		else {
			var currVal=document.getElementById(currstate).value;

			if(currVal==_ev.target.value) {
				var button1 = document.getElementById(currstate);
				button1.disabled = true;
				var button2 = document.getElementById(_ev.target.id);
				button2.disabled = true;

				let w=this.state.win;
				w=w-1;
				
				if(w==0) {
					let score = this.state.guess;
					score = score*25;
					alert("You Won\nYour score :"+score.toString);
					return;
				}
				else {
					let statewin =_.assign(this.state,{win:w});
					this.setState(statewin);
				}
			}
			else {
				document.getElementById(currstate).disabled = false;

				setTimeout(function(){_ev.target.innerHTML="";
					document.getElementById(currstate).innerHTML="";},1000);

				var g=this.state.guess;	
				g=g-1;
				if(g==0) {
					alert("You Lose");
					this.disableOnLoss(this);
					return;
				}
				let stateguess =_.assign(this.state,{guess:g});
				this.setState(stateguess);
				
				document.getElementById(currstate).disabled=false;
			}

			state1=_.assign(this.state,{value:""});
			this.setState(state1);  

		}


	}

	

	disableOnLoss(_ev) {
		var buttonList = document.getElementsByTagName("button");
		var i;
		for(i=0;i<16;i++){
			buttonList[i].disabled = true;
		}
	}


	shufflechars(_ev) {
		var buttonList = document.getElementsByTagName("button");
		var buttonValues=_.shuffle(["A","B","C","D","E","F","G","H","A","B","C","D","E","F","G","H"]);
		let clearState = _.assign(this.state,{value:"",win:8,guess:8})
		this.setState(clearState);
	
		var i;  
		for(i=0;i<16;i++) {

			buttonList[i].disabled = false;
			buttonList[i].value=buttonValues[i];
			buttonList[i].innerHTML="";
		}

}


  	render() {	
		
      		let score = this.state.guess*25;
		return <div className="row">
				<p>
				<div className="row">
				<button style = {{width: "50px",height: "50px"}} id = "C1" onClick={this.show.bind(this)}></button><b>  </b>       
				<button style = {{width: "50px",height: "50px"}} id = "C2" onClick={this.show.bind(this)}></button><b>  </b>
				<button style = {{width: "50px",height: "50px"}} id="C3" onClick={this.show.bind(this)}></button><b>  </b>
		  		<button style = {{width: "50px",height: "50px"}} id="C4" onClick={this.show.bind(this)}></button></div>
				<div className="row">
		  		<button style = {{width: "50px",height: "50px"}} id="C5" onClick={this.show.bind(this)}></button><b>   </b>
		  	 	<button style = {{width: "50px",height: "50px"}} id="C6" onClick={this.show.bind(this)}></button><b>   </b>
		  		<button style = {{width: "50px",height: "50px"}} id="C7" onClick={this.show.bind(this)}></button><b>   </b>
		  		<button style = {{width: "50px",height: "50px"}} id="C8" onClick={this.show.bind(this)}></button></div>
				<div className="row">
				<button style = {{width: "50px",height: "50px"}} id="C9" onClick={this.show.bind(this)}></button><b>   </b>
				<button style = {{width: "50px",height: "50px"}} id="C10" onClick={this.show.bind(this)}></button><b>   </b>
				<button style = {{width: "50px",height: "50px"}} id="C11" onClick={this.show.bind(this)}></button><b>   </b>
				<button style = {{width: "50px",height: "50px"}} id="C12" onClick={this.show.bind(this)}></button></div>
				<div className="row">
				<button style = {{width: "50px",height: "50px"}} id="C13" onClick={this.show.bind(this)}></button><b>   </b>
				<button style = {{width: "50px",height: "50px"}} id="C14" onClick={this.show.bind(this)}></button><b>   </b>
				<button style = {{width: "50px",height: "50px"}} id="C15" onClick={this.show.bind(this)}></button><b>   </b>
				<button style = {{width: "50px",height: "50px"}} id="C16" onClick={this.show.bind(this)}></button></div>
				<div className="row">
				<div className="column">
		  		Your Score : {score}</div>
				<div className="column">  
		  		<button id="restart" onClick={this.shufflechars.bind(this)}>Restart</button></div>
				</div>
		  		</p>
			</div>
		  
    }


   
  
}


