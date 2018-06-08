import React from 'react';

export default class Cistern extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      volume: this.props.volume,
      maxOutFlow: this.props.maxOutFlow,
      clearDropSpeed: this.props.clearDropSpeed,
    }
    this.removeDrop = this.removeDrop.bind(this);
  }

  componentDidUpdate(){
    if(this.props.volume > this.state.volume){
      this.setState({
        volume: this.props.volume,
        dripping: true,
      });
      setTimeout(this.removeDrop, this.state.clearDropSpeed);
    }
  }
  removeDrop(){
    this.setState({
      dripping: false,
    });
  }

  render() {
    const cisternHeight = this.state.volume;
    const dripping = this.state.dripping ? 'dripping' : '' ;

    return (
      <div className='cistern'>
        <div className='drip'>
          <div className={`cisterndrop ${dripping}`}></div>
        </div>
        <div className='cistern-full'
          style={{height: `${cisternHeight}px`}}>
        </div>        
        <p className='cistern-count'>{this.state.volume}</p>
      </div>
    );
  }
}