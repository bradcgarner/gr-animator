import React from 'react';
import Column from './column';
import Cistern from './cistern';
import { precisionRound } from '../lib';

export default class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cycles: 0,
      rainCount: 0,
      columnCount: 100,
      columns: [],
      flow: [],
      rainIncrements: 4000,
      maxVolumeFlow: 5,
      maxLateralDuration: 2,
      maxVerticalDuration: 2,
      incrementSpeed: 100, // columns increment
      rainSpeed: 500, // speed of rainfall
      clearRainSpeed: 300, // columns remove raindrop
      downstreamVolume: 0,
      clearDropSpeed: 300,
      startTime: new Date().getTime(),
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
      const randomCounter = Math.floor(Math.random() * 10);
      for(let i=0; i<randomCounter; i++){
        const randomColumn = Math.floor(Math.random() * this.state.columnCount);
        columns[randomColumn] = columns[randomColumn] + 1;
      }
      const now = new Date().getTime();
      const elapsedSeconds = (now - this.state.startTime)/1000;
      const rainCount = this.state.rainCount + randomCounter;
      const dropsPerSecond = rainCount / elapsedSeconds;
      this.setState({
        cycles: this.state.cycles + 1,
        rainCount,
        columns,
        elapsedSeconds,
        dropsPerSecond,
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
        <p>{this.state.cycles} cycles </p>
        <p> {precisionRound(this.state.elapsedSeconds,2)} seconds </p>
        <p> {this.state.rainCount} drops </p>
        <p> {precisionRound(this.state.dropsPerSecond,2)} drops per second</p>
      </div>
    );
  }
}