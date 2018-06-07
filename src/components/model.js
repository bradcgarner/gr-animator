import React from 'react';
import Column from './column';

export default class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rainCount: 0,
      columnCount: 100,
      columns: [],
      flow: [],
      rainIncrements: 4000,
      maxLateralDuration: 15,
      maxVerticalDuration: 2,
      incrementSpeed: 100, // columns increment
      rainSpeed: 30, // speed of rainfall
      clearRainSpeed: 300, // columns remove raindrop
    }
    this.moveLateral = this.moveLateral.bind(this);
    this.increment = this.increment.bind(this);
  }

  componentDidMount(){
    setInterval(this.increment,this.state.rainSpeed);
    const columns = [];
    const flow = [];
    for (let i=0; i<this.state.columnCount; i++){
      columns.push(0)
      flow.push(0)
    }
    this.setState({
      columns,
      flow
    });
  }

  increment(){
    if(this.state.rainCount < this.state.rainIncrements){
      const columns = [...this.state.columns];
      const randomCounter = Math.floor(Math.random() * 20);
      for(let i=0; i<randomCounter; i++){
        const randomColumn = Math.floor(Math.random() * this.state.columnCount);
        columns[randomColumn] = columns[randomColumn] + 1;
      }
      this.setState({
        rainCount: this.state.rainCount + 1,
        columns,
      });
    }
  }

  moveLateral(index) {
    const flow = [...this.state.flow];
    // flow[index] = flow[index] -1;
    if(index < this.state.columnCount-1){
      flow[index+1] = flow[index+1] + 1;
    }
    this.setState({flow});
  }

  render() {
    const columns = this.state.columns.map((c,i)=>{
      return <Column 
        key = {i}
        rain = {this.state.columns[i]}
        flow = {this.state.flow[i]}
        moveLateral = {this.moveLateral}
        maxLateralDuration={this.state.maxLateralDuration}
        maxVerticalDuration={this.state.maxVerticalDuration}
        incrementSpeed={this.state.incrementSpeed}
        clearRainSpeed={this.state.clearRainSpeed}
        index = {i}
      />
    })
    return (
      <div>
      {columns}
      </div>
    );
  }
}