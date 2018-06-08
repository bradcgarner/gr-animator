import React from 'react';
import Column from './column';
import Cistern from './cistern';

export default class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rainCount: 0,
      columnCount: 100,
      columns: [],
      flow: [],
      rainIncrements: 4000,
      maxVolumeFlow: 5,
      maxLateralDuration: 2,
      maxVerticalDuration: 2,
      incrementSpeed: 100, // columns increment
      rainSpeed: 30, // speed of rainfall
      clearRainSpeed: 300, // columns remove raindrop
      downstreamVolume: 0,
      clearDropSpeed: 300,
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
        rainCount: this.state.rainCount + randomCounter,
        columns,
      });
    }
  }

  moveLateral(index, volume) {
    const flow = [...this.state.flow];
    if(index < this.state.columnCount-1){
      flow[index+1] = flow[index+1] + volume;
    }
    const downstreamVolume = index === this.state.columnCount-1 ?
      this.state.downstreamVolume + volume :
      this.state.downstreamVolume ;
    this.setState({
      flow,
      downstreamVolume,
    });
  }

  render() {
    const columns = this.state.columns.map((c,i)=>{
      return <Column 
        key = {i}
        rain = {this.state.columns[i]}
        flow = {this.state.flow[i]}
        moveLateral = {this.moveLateral}
        maxVolumeFlow={this.state.maxVolumeFlow}
        maxLateralDuration={this.state.maxLateralDuration}
        maxVerticalDuration={this.state.maxVerticalDuration}
        incrementSpeed={this.state.incrementSpeed}
        clearRainSpeed={this.state.clearRainSpeed}
        index = {i}
      />
    });
    const downstream = <Cistern 
      volume = {this.state.downstreamVolume}
      clearDropSpeed={this.state.clearDropSpeed}
      maxOutFlow = {0}
      />

    return (
      <div className='model'>
        {columns}
        {downstream}
      </div>
    );
  }
}