import React from "react";
import cityList from "./citylist";


export default class Game extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			usedCities : [],
			cityObjArr : [],
			userCity : "",
			finish : false,
			};
		this.cityListArr = cityList.cities.split(" ");
		this.player = true;


		}
		

	 checkLetter(city){
	 	console.log(city);
		let lastLetter = city[city.length-1];
		console.log("cityCheck", lastLetter);
		if ( lastLetter == "ё"|| lastLetter == "ь" || lastLetter == "ы" || lastLetter == "ъ"){
			lastLetter = city[city.length-2];}		
			for(let i=0; i<this.cityListArr.length; i++){
				if(this.state.usedCities.indexOf(this.cityListArr[i])>-1){
					continue;
				}
				if (this.cityListArr[i][0]==lastLetter){
					
					let arr = this.state.usedCities.concat([]);		
					arr.push(this.cityListArr[i]);
					this.setState({usedCities:arr});
					console.log(this.state.usedCities[this.state.usedCities.length-1].slice(-1));
					console.log(this.state.usedCities);
							this.showCity({
								city:this.cityListArr[i],
								player: this.player})

					break;
							}
		
			}
			
		}
	 checkCity(city){
		city = city.toLowerCase();		
		if (this.cityListArr.indexOf(city) > -1 && this.state.usedCities.indexOf(city)==-1){
			return true;		
		}
		else{
			alert('Введите другой город')
			return false;			
		}		
	}

	showCity(obj){
		let arr = this.state.cityObjArr.concat([]);
		arr.push(obj);
		this.setState({
			cityObjArr: arr
		});		
	}

	userTurn(){
		let city = this.state.userCity;	
		console.log(city);
		let prevCityLastLetter;	
		let arr = this.state.usedCities.concat([]);	
		if (this.state.usedCities.length>0){
			prevCityLastLetter = this.state.usedCities[this.state.usedCities.length-1].slice(-1);
			
		}	
		if (this.checkCity(city)){
			if (prevCityLastLetter){
				if (prevCityLastLetter !== city[0]){
					alert(`Введите город, который начиннается на букву ${prevCityLastLetter}`);
				}
				else{
					arr.push(city);
					console.log(city);
					
					// this.showCity({
					// 	city: city,
					// 	player:this.player});

					let cArr = this.state.cityObjArr.concat([]);
					cArr.push({
							city: city,
							player: this.player
						});

					this.setState({usedCities : arr, cityObjArr: cArr}, () => {
						this.player = !this.player;
						this.pcTurn();
					});

					
				}


								
			}	
			else {	
				console.log(city);
				console.log(arr); /// Empty Arr
				arr.push(city);
				console.log(arr); //// Ok Arr

				//this.setState({usedCities : arr});
				//console.log(this.state.usedCities ); /////!!!! Empty Arr			
				// this.showCity({
				// 		city: city,
				// 		player: this.player});
				
				let cArr = this.state.cityObjArr.concat([]);
				cArr.push({
						city: city,
						player: this.player
					});
				this.setState({usedCities : arr, cityObjArr: cArr}, () => {
					this.player = !this.player;
					this.pcTurn();
					console.log(this.state);
				});	

			}				
		}			
	}

		pcTurn(){
			console.log(this.state.usedCities); // Empty ARR
			let city = this.state.usedCities[this.state.usedCities.length-1];
			console.log(city); /// ERR
			this.checkLetter(city);
			this.player = !this.player;	
			}

		 
		
		finishGame(obj){
			this.setState({finish:true});
			
			

		}
		getText(e){
			let text = e.target.value;
			this.setState({userCity : text})
		}

	
	render() {
		if (!this.state.finish){


		let cityResult = this.state.cityObjArr.map(function (item, index){
			return (
				<div style = {{textAlign : item.player ? "left" : "right",
							color	 : item.player ? "red" : "green"}}>
							 {item.city}
							 <span>{item.player ? " Игрок" : " Компьютер"}
							 </span>
				</div>
				)
		})




		return (
		<div id="main"> 
			<div id="game">
			 <div className="stopbtn">
		   <input type="button" className="btn btn-secondary btn-lg" id="stop" onClick={this.finishGame.bind(this)} value="Стоп игра"/>
      	 </div>
			 <div id="history" >
			{cityResult}
			 </div>  
      <div id="global">
          <div id="gamer">
            <div id="gamerUser">Вы:</div>
              <input type="text" placeholder="Введите" className="text" id="wordUser" onChange={this.getText.bind(this)} value={this.state.userCity}/>
              <input type="button" id="btn" className="btn btn-secondary" onClick={this.userTurn.bind(this)} value="OK"/>              
            </div>
          <div id="computer">
            <div id="gamerComp">Компьютер:</div>
			  <div id ="wordComp"> </div>           
				
         		 </div>      	
		 	 </div>
		
		</div>
	</div>
		)
		}
		else{
			return(<div>Конец</div>);
		}
	}
}
