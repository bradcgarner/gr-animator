import React from 'react';
import * as lib from '../lib';
import { cycle } from '../helpers';

export default class Column extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      slotCount: 8,
      slots: [],
      raining: false,
      rain: 0,
      rainTotal: 0,
      flow: 0,
      flowTotal: 0,
      runoff: 0,
      runoffTotal: 0,
      volume: 0,
      maxLateralDuration: this.props.maxLateralDuration,
      maxVerticalDuration: this.props.maxVerticalDuration,
      incrementSpeed: this.props.incrementSpeed,
      clearRainSpeed: this.props.clearRainSpeed,
    }
    this.increment = this.increment.bind(this);
    this.removeRain = this.removeRain.bind(this);
  }

  componentDidMount() {
    const slots = []
    for(let i = 0; i< this.state.slotCount; i++ ) {
      slots.push([0])
    }
    this.setState({slots});
    setInterval(this.increment,this.state.incrementSpeed);
    // setInterval(this.receiveRain,this.state.incrementSpeed);
    // setTimeout(setInterval(this.receiveFlow,this.state.incrementSpeed), 0.25 * this.state.incrementSpeed);
    // setTimeout(setInterval(this.drain,this.state.incrementSpeed), 0.25 * this.state.incrementSpeed);
    // setTimeout(setInterval(this.runoff,this.state.incrementSpeed), 0.25 * this.state.incrementSpeed);
    setInterval(this.removeRain, this.state.clearRainSpeed);
  }
  removeRain(){
    this.setState({
      raining: false,
    });
  }
  increment(){
    const rain = this.props.rain - this.state.rainTotal;
    const flow = this.props.flow - this.state.flowTotal;
    const newState = cycle(this.state, rain, flow);
    const updatedState = {
      ...newState, 
      rainTotal: newState.rain + this.state.rainTotal,
      flowTotal: newState.flow + this.state.flowTotal,
      runoffTotal: newState.runoffVolume + this.state.runoffTotal,
    }
    this.setState(updatedState);
    if(updatedState.needsToRunoff){
      this.props.moveLateral(this.props.index);
    }
  }

  render() {
    const slots = this.state.slots.map((drops,i)=>{
      const dropsClass = drops.length === 1 && drops[0] === 0 ? 0 : drops.length ;
      return  <div key={i} className={`drop drop${dropsClass}`}></div>
    });
    const raining = this.state.raining ? 'raining' : '' ;
    return (
      <div className = 'column'>
        <div className={`rain ${raining}`}>
          <div className={`raindrop ${raining}`}></div>
        </div>
        {slots}
        <div className='slot-count'>{this.state.rainTotal}</div>
        <div className='slot-count'>{this.state.flowTotal}</div>
        <div className='slot-count'>{this.state.rainTotal + this.state.flowTotal}</div>
        <div className='slot-count'>{this.state.volume}</div>
        <div className='slot-count'>{this.state.runoffTotal}</div>
      </div>
    );
  }
}