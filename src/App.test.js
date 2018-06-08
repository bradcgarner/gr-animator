import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as helpers from './helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('helpers', () => {

  it('receiveRain 1', () => {
    const rain = 1;
    const slotsPrior = [[1,3,5],[2,2,3]];
    const expectedResult = {
      rain: 1,
      raining: true,
      slots: [[1,1,3,5],[2,2,3]],
    }
    const result = helpers.receiveRain(rain, slotsPrior);
    expect(result).toEqual(expectedResult);
  });
  it('receiveRain 2', () => {
    const rain = 2;
    const slotsPrior = [[1,3,5],[2,2,3]];
    const expectedResult = {
      rain: 2,
      raining: true,
      slots: [[1,1,1,3,5],[2,2,3]],
    }
    const result = helpers.receiveRain(rain, slotsPrior);
    expect(result).toEqual(expectedResult);
  });
  it('receiveRain 2 on null', () => {
    const rain = 2;
    const slotsPrior = [[],[2,2,3]];
    const expectedResult = {
      rain: 2,
      raining: true,
      slots: [[1,1],[2,2,3]],
    }
    const result = helpers.receiveRain(rain, slotsPrior);
    expect(result).toEqual(expectedResult);
  });
  it('receiveRain 2 on 0', () => {
    const rain = 2;
    const slotsPrior = [[0],[2,2,3]];
    const expectedResult = {
      rain: 2,
      raining: true,
      slots: [[1,1],[2,2,3]],
    }
    const result = helpers.receiveRain(rain, slotsPrior);
    expect(result).toEqual(expectedResult);
  });
  it('receiveRain 1 on 0,1', () => {
    const rain = 1;
    const slotsPrior = [[0,1],[2,2,3]];
    const expectedResult = {
      rain: 1,
      raining: true,
      slots: [[1,1],[2,2,3]],
    }
    const result = helpers.receiveRain(rain, slotsPrior);
    expect(result).toEqual(expectedResult);
  });
  it('receiveRain 2 on 0,1', () => {
    const rain = 2;
    const slotsPrior = [[0,1],[2,2,3]];
    const expectedResult = {
      rain: 2,
      raining: true,
      slots: [[1,1,1],[2,2,3]],
    }
    const result = helpers.receiveRain(rain, slotsPrior);
    expect(result).toEqual(expectedResult);
  });

  it('receiveFlow 1', () => {
    const flow = 1;
    const slotsPrior = [[0],[2,2,3]];
    const expectedResult = {
      flow: 1,
      slots: [[0],[1,2,2,3]],
    }
    const result = helpers.receiveFlow(flow, slotsPrior);
    expect(result).toEqual(expectedResult);
  });
  it('receiveFlow 2', () => {
    const flow = 2;
    const slotsPrior = [[0],[2,2,3]];
    const expectedResult = {
      flow: 2,
      slots: [[0],[1,1,2,2,3]],
    }
    const result = helpers.receiveFlow(flow, slotsPrior);
    expect(result).toEqual(expectedResult);
  });
  it('receiveFlow 2 long', () => {
    const flow = 2;
    const slotsPrior = [[0],[2,2,3],[4,5],[11,1],[0],[9]];
    const expectedResult = {
      flow: 2,
      slots: [[0],[2,2,3],[4,5],[11,1],[0],[1,1,9]],
    }
    const result = helpers.receiveFlow(flow, slotsPrior);
    expect(result).toEqual(expectedResult);
  });
  it('receiveFlow 2 long null', () => {
    const flow = 2;
    const slotsPrior = [[0],[2,2,3],[4,5],[11,1],[0],[]];
    const expectedResult = {
      flow: 2,
      slots: [[0],[2,2,3],[4,5],[11,1],[0],[1,1]],
    }
    const result = helpers.receiveFlow(flow, slotsPrior);
    expect(result).toEqual(expectedResult);
  });
  it('receiveFlow 2 long 0', () => {
    const flow = 2;
    const slotsPrior = [[0],[2,2,3],[4,5],[11,1],[0],[0]];
    const expectedResult = {
      flow: 2,
      slots: [[0],[2,2,3],[4,5],[11,1],[0],[1,1]],
    }
    const result = helpers.receiveFlow(flow, slotsPrior);
    expect(result).toEqual(expectedResult);
  });

  it('drain 1', () => {
    const maxVerticalDuration = 10;
    const slotsPrior = [[0],[2,2,3],[4,5],[11],[0],[0]];
    const expectedResult = {
      slots:           [[0],[2,2,3],[4,5],[0 ],[1],[0]],
    }
    const result = helpers.drain(slotsPrior, maxVerticalDuration);
    expect(result).toEqual(expectedResult);
  });
  it('drain every other', () => {
    const maxVerticalDuration = 10;
    const slotsPrior = [[0],[2,2,13],[4,5],[11],[0],[0]];
    const expectedResult = {
      slots:           [[0],[2,2],[1,4,5],[0 ],[1],[0]],
    }
    const result = helpers.drain(slotsPrior, maxVerticalDuration);
    expect(result).toEqual(expectedResult);
  });
  it('drain every other + last', () => {
    const maxVerticalDuration = 10;
    const slotsPrior = [[0],[2,2,13],[4,5],[11],[0],[13]];
    const expectedResult = {
      slots:           [[0],[2,2],[1,4,5],[0 ],[1],[13]],
    }
    const result = helpers.drain(slotsPrior, maxVerticalDuration);
    expect(result).toEqual(expectedResult);
  });
  it('drain every one', () => {
    const maxVerticalDuration = 10;
    const slotsPrior = [[20],[2,2,13],[4,15],[11],[17],[3]];
    const expectedResult = {
      slots:           [[0],[1,2,2],[1,4],[1],[1],[1,3]],
    }
    const result = helpers.drain(slotsPrior, maxVerticalDuration);
    expect(result).toEqual(expectedResult);
  });
  it('drain every one + last', () => {
    const maxVerticalDuration = 10;
    const slotsPrior = [[20],[2,2,13],[4,15],[11],[17],[13]];
    const expectedResult = {
      slots:           [[0],[1,2,2],[1,4],[1],[1],[1,13]],
    }
    const result = helpers.drain(slotsPrior, maxVerticalDuration);
    expect(result).toEqual(expectedResult);
  });

  it('runoff true duration', () => {
    const maxLateralDuration = 10;
    const maxVolumeFlow = 3;
    const slotsPrior = [[0],[2,2,13],[0,15],[11],[17],[13]];
    const expectedResult = {
      slotLastIndex: 5,
      dropsLastIndex: 0,
      runoffFirstIndex: 0,
      heldTooLong: true,
      tooFull: false,
      needsToRunoff: true,
      runoffVolume: 1,
      slots:           [[0],[2,2,13],[0,15],[11],[17],[0]],
    }
    const result = helpers.runoff(slotsPrior, maxLateralDuration);
    expect(result).toEqual(expectedResult);
  });
  it('runoff false duration', () => {
    const maxLateralDuration = 10;
    const maxVolumeFlow = 3;
    const slotsPrior = [[0],[2,2,13],[0,15],[11],[17],[3]];
    const expectedResult = {
      slotLastIndex: 5,
      dropsLastIndex: 0,
      runoffFirstIndex: undefined,
      heldTooLong: false,
      tooFull: false,
      needsToRunoff: false,
      runoffVolume: 0,
      slots:           [[0],[2,2,13],[0,15],[11],[17],[3]],
    }
    const result = helpers.runoff(slotsPrior, maxLateralDuration);
    expect(result).toEqual(expectedResult);
  });
  it('runoff null duration', () => {
    const maxLateralDuration = 10;
    const maxVolumeFlow = 3;
    const slotsPrior = [[0],[2,2,13],[0,15],[11],[17],[]];
    const expectedResult = {
      slotLastIndex: 5,
      dropsLastIndex: 0,
      runoffFirstIndex: undefined,
      heldTooLong: false,
      tooFull: false,
      needsToRunoff: false,
      runoffVolume: 0,
      slots:           [[0],[2,2,13],[0,15],[11],[17],[]],
    }
    const result = helpers.runoff(slotsPrior, maxLateralDuration);
    expect(result).toEqual(expectedResult);
  });
  it('runoff true volume 1', () => {
    const maxLateralDuration = 10;
    const maxVolumeFlow = 1;
    const slotsPrior = [[0],[2,2,13],[0,15],[11],[17],[13]];
    const expectedResult = {
      slotLastIndex: 5,
      dropsLastIndex: 0,
      runoffFirstIndex: 0,
      heldTooLong: true,
      tooFull: false,
      needsToRunoff: true,
      runoffVolume: 1,
      slots:           [[0],[2,2,13],[0,15],[11],[17],[0]],
    }
    const result = helpers.runoff(slotsPrior, maxLateralDuration, maxVolumeFlow);
    expect(result).toEqual(expectedResult);
  });
  it('runoff true duration high, volume at max', () => {
    const maxLateralDuration = 10;
    const maxVolumeFlow = 2;
    const slotsPrior = [[0],[2,2,13],[0,15],[11],[17],[13,14]];
    const expectedResult = {
      slotLastIndex: 5,
      dropsLastIndex: 1,
      runoffFirstIndex: 1,
      heldTooLong: true,
      tooFull: false,
      needsToRunoff: true,
      runoffVolume: 1,
      slots:           [[0],[2,2,13],[0,15],[11],[17],[13]],
    }
    const result = helpers.runoff(slotsPrior, maxLateralDuration, maxVolumeFlow);
    expect(result).toEqual(expectedResult);
  });
  it('runoff true duration high and volume over by 2', () => {
    const maxLateralDuration = 10;
    const maxVolumeFlow = 2;
    const slotsPrior = [[0],[2,2,13],[0,15],[11],[17],[13,14,11,15]];
    const expectedResult = {
      slotLastIndex: 5,
      dropsLastIndex: 3,
      runoffFirstIndex: 2,
      heldTooLong: true,
      tooFull: true,
      needsToRunoff: true,
      runoffVolume: 2,
      slots:           [[0],[2,2,13],[0,15],[11],[17],[13,14]],
    }
    const result = helpers.runoff(slotsPrior, maxLateralDuration, maxVolumeFlow);
    expect(result).toEqual(expectedResult);
  });
  it('runoff true volume over by 2', () => {
    const maxLateralDuration = 20;
    const maxVolumeFlow = 2;
    const slotsPrior = [[0],[2,2,13],[0,15],[11],[17],[13,14,11,15]];
    const expectedResult = {
      slotLastIndex: 5,
      dropsLastIndex: 3,
      runoffFirstIndex: 2,
      heldTooLong: false,
      tooFull: true,
      needsToRunoff: true,
      runoffVolume: 2,
      slots:           [[0],[2,2,13],[0,15],[11],[17],[13,14]],
    }
    const result = helpers.runoff(slotsPrior, maxLateralDuration, maxVolumeFlow);
    expect(result).toEqual(expectedResult);
  });
  it('runoff true volume over by 3', () => {
    const maxLateralDuration = 20;
    const maxVolumeFlow = 1;
    const slotsPrior = [[0],[2,2,13],[0,15],[11],[17],[13,14,11,15]];
    const expectedResult = {
      slotLastIndex: 5,
      dropsLastIndex: 3,
      runoffFirstIndex: 1,
      heldTooLong: false,
      tooFull: true,
      needsToRunoff: true,
      runoffVolume: 3,
      slots:           [[0],[2,2,13],[0,15],[11],[17],[13]],
    }
    const result = helpers.runoff(slotsPrior, maxLateralDuration, maxVolumeFlow);
    expect(result).toEqual(expectedResult);
  });

  it('increment', () => {
    const slotsPrior = [[20],[2,2,13],[4,15],[11],[17],[13]];
    const expectedResult = {
      slots:           [[21],[3,3,14],[5,16],[12],[18],[14]],
    }
    const result = helpers.increment(slotsPrior);
    expect(result).toEqual(expectedResult);
  });
  it('increment skip 0', () => {
    const slotsPrior = [[0],[2,2,13],[0,15],[11],[17],[13]];
    const expectedResult = {
      slots:           [[0],[3,3,14],[0,16],[12],[18],[14]],
    }
    const result = helpers.increment(slotsPrior);
    expect(result).toEqual(expectedResult);
  });

  it('cycle rain', () => {
    const state = {
      slots: [[1,3,5],[2,2,3]],
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      maxVolumeFlow: 5,
    }
    const rain = 1;
    const flow = 0;
    const expectedResult = {
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      maxVolumeFlow: 5,
      rain: 1,
      raining: true,
      flow: 0,
      slotLastIndex: 1,
      dropsLastIndex: 2,
      runoffFirstIndex: undefined,
      heldTooLong: false,
      tooFull: false,
      needsToRunoff: false,
      runoffVolume: 0,
      slotsWithIncrement:[[  2,4,6],[3,3,4]],
      slotsWithRain:     [[1,2,4,6],[3,3,4]],
      slotsWithFlow:     [[1,2,4,6],[3,3,4]],
      slotsWithDrain:    [[1,2,4,6],[3,3,4]],
      slotsWithRunoff:   [[1,2,4,6],[3,3,4]],
      slots:             [[1,2,4,6],[3,3,4]],
      volume: 7,
    }
    const result = helpers.cycle(state, rain, flow);
    expect(result).toEqual(expectedResult);
  });
  it('cycle rain and runoff', () => {
    const state = {
      slots: [[1,3,5],[2,2,13]],
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      maxVolumeFlow: 5,
    }
    const rain = 1;
    const flow = 0;
    const expectedResult = {
      maxVolumeFlow: 5,
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      rain: 1,
      raining: true,
      flow: 0,
      slotLastIndex: 1,
      dropsLastIndex: 2,
      runoffFirstIndex: 2,
      heldTooLong: true,
      tooFull: false,
      needsToRunoff: true,
      runoffVolume: 1,
      slotsWithIncrement:[[  2,4,6],[3,3,14]],
      slotsWithRain:     [[1,2,4,6],[3,3,14]],
      slotsWithFlow:     [[1,2,4,6],[3,3,14]],
      slotsWithDrain:    [[1,2,4,6],[3,3,14]],
      slotsWithRunoff:   [[1,2,4,6],[3,3   ]],
      slots:             [[1,2,4,6],[3,3   ]],
      volume: 6,
    }
    const result = helpers.cycle(state, rain, flow);
    expect(result).toEqual(expectedResult);
  });
  it('cycle rain, flow and runoff', () => {
    const state = {
      slots: [[1,3,5],[2,2,13]],
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      maxVolumeFlow: 5,
    }
    const rain = 1;
    const flow = 2;
    const expectedResult = {
      maxVolumeFlow: 5,
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      rain: 1,
      raining: true,
      flow: 2,
      slotLastIndex: 1,
      dropsLastIndex: 4,
      runoffFirstIndex: 4,
      heldTooLong: true,
      tooFull: false,
      needsToRunoff: true,
      runoffVolume: 1,
      slotsWithIncrement:[[  2,4,6],[    3,3,14]],
      slotsWithRain:     [[1,2,4,6],[    3,3,14]],
      slotsWithFlow:     [[1,2,4,6],[1,1,3,3,14]],
      slotsWithDrain:    [[1,2,4,6],[1,1,3,3,14]],
      slotsWithRunoff:   [[1,2,4,6],[1,1,3,3   ]],
      slots:             [[1,2,4,6],[1,1,3,3   ]],
      volume: 8,
    }
    const result = helpers.cycle(state, rain, flow);
    expect(result).toEqual(expectedResult);
  });
  it('cycle rain and flow', () => {
    const state = {
      slots: [[1,3,5],[2,2,9]],
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      maxVolumeFlow: 5,
    }
    const rain = 1;
    const flow = 2;
    const expectedResult = {
      maxVolumeFlow: 5,
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      rain: 1,
      raining: true,
      flow: 2,
      slotLastIndex: 1,
      dropsLastIndex: 4,
      runoffFirstIndex: undefined,
      heldTooLong: false,
      tooFull: false,
      needsToRunoff: false,
      runoffVolume: 0,
      slotsWithIncrement:[[  2,4,6],[    3,3,10]],
      slotsWithRain:     [[1,2,4,6],[    3,3,10]],
      slotsWithFlow:     [[1,2,4,6],[1,1,3,3,10]],
      slotsWithDrain:    [[1,2,4,6],[1,1,3,3,10]],
      slotsWithRunoff:   [[1,2,4,6],[1,1,3,3,10]],
      slots:             [[1,2,4,6],[1,1,3,3,10]],
      volume: 9,
    }
    const result = helpers.cycle(state, rain, flow);
    expect(result).toEqual(expectedResult);
  });
  it('cycle rain, drain and flow', () => {
    const state = {
      slots: [[1,3,10],[2,2,8]],
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      maxVolumeFlow: 6,
    }
    const rain = 1;
    const flow = 2;
    const expectedResult = {
      maxVolumeFlow: 6,
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      rain: 1,
      raining: true,
      flow: 2,
      slotLastIndex: 1,
      dropsLastIndex: 5,
      runoffFirstIndex: undefined,
      heldTooLong: false,
      tooFull: false,
      needsToRunoff: false,
      runoffVolume: 0,
      slotsWithIncrement:[[  2,4,11],[      3,3,9]],
      slotsWithRain:     [[1,2,4,11],[      3,3,9]],
      slotsWithFlow:     [[1,2,4,11],[  1,1,3,3,9]],
      slotsWithDrain:    [[1,2,4   ],[1,1,1,3,3,9]],
      slotsWithRunoff:   [[1,2,4   ],[1,1,1,3,3,9]],
      slots:             [[1,2,4   ],[1,1,1,3,3,9]],
      volume: 9,
    }
    const result = helpers.cycle(state, rain, flow);
    expect(result).toEqual(expectedResult);
  });
  it('cycle rain, drain and flow more', () => {
    const state = {
      slots: [[1,3,10],[4,5,7],[2,2,8]],
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      maxVolumeFlow: 5,
    }
    const rain = 1;
    const flow = 2;
    const expectedResult = {
      maxVolumeFlow: 5,
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      rain: 1,
      raining: true,
      flow: 2,
      slotLastIndex: 2,
      dropsLastIndex: 4,
      runoffFirstIndex: undefined,
      heldTooLong: false,
      tooFull: false,
      needsToRunoff: false,
      runoffVolume: 0,
      slotsWithIncrement:[[  2,4,11],[  5,6,8],[    3,3,9]],
      slotsWithRain:     [[1,2,4,11],[  5,6,8],[    3,3,9]],
      slotsWithFlow:     [[1,2,4,11],[  5,6,8],[1,1,3,3,9]],
      slotsWithDrain:    [[1,2,4   ],[1,5,6,8],[1,1,3,3,9]],
      slotsWithRunoff:   [[1,2,4   ],[1,5,6,8],[1,1,3,3,9]],
      slots:             [[1,2,4   ],[1,5,6,8],[1,1,3,3,9]],
      volume: 12,
    }
    const result = helpers.cycle(state, rain, flow);
    expect(result).toEqual(expectedResult);
  });
  it('cycle rain, drain, flow, runoff', () => {
    const state = {
      slots: [[1,3,10],[4,5,7],[2,2,10]],
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      maxVolumeFlow: 5,
    }
    const rain = 1;
    const flow = 2;
    const expectedResult = {
      maxVolumeFlow: 5,
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      rain: 1,
      raining: true,
      flow: 2,
      slotLastIndex: 2,
      dropsLastIndex: 4, // index of the one that ran off, not index AFTER runoff occurs
      runoffFirstIndex: 4,
      heldTooLong: true,
      tooFull: false,
      needsToRunoff: true,
      runoffVolume: 1,
      slotsWithIncrement:[[  2,4,11],[  5,6,8],[    3,3,11]],
      slotsWithRain:     [[1,2,4,11],[  5,6,8],[    3,3,11]],
      slotsWithFlow:     [[1,2,4,11],[  5,6,8],[1,1,3,3,11]],
      slotsWithDrain:    [[1,2,4   ],[1,5,6,8],[1,1,3,3,11]],
      slotsWithRunoff:   [[1,2,4   ],[1,5,6,8],[1,1,3,3   ]],
      slots:             [[1,2,4   ],[1,5,6,8],[1,1,3,3   ]],
      volume: 11,
    }
    const result = helpers.cycle(state, rain, flow);
    expect(result).toEqual(expectedResult);
  });
  it('cycle rain, drain, flow, runoff 0', () => {
    const state = {
      slots: [[0,3,10],[4,5,7],[2,2,10]],
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      maxVolumeFlow: 5,
    }
    const rain = 1;
    const flow = 2;
    const expectedResult = {
      maxVolumeFlow: 5,
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      rain: 1,
      raining: true,
      flow: 2,
      slotLastIndex: 2,
      dropsLastIndex: 4, // index of the one that ran off, not index AFTER runoff occurs
      runoffFirstIndex: 4,
      heldTooLong: true,
      tooFull: false,
      needsToRunoff: true,
      runoffVolume: 1,
      slotsWithIncrement:[[0,4,11],[  5,6,8],[    3,3,11]],
      slotsWithRain:     [[1,4,11],[  5,6,8],[    3,3,11]],
      slotsWithFlow:     [[1,4,11],[  5,6,8],[1,1,3,3,11]],
      slotsWithDrain:    [[1,4   ],[1,5,6,8],[1,1,3,3,11]],
      slotsWithRunoff:   [[1,4   ],[1,5,6,8],[1,1,3,3   ]],
      slots:             [[1,4   ],[1,5,6,8],[1,1,3,3   ]],
      volume: 10,
    }
    const result = helpers.cycle(state, rain, flow);
    expect(result).toEqual(expectedResult);
  });
  it('cycle drain, flow, runoff 0', () => {
    const state = {
      slots: [[0,3,10],[4,5,7],[2,2,10]],
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      maxVolumeFlow: 5,
    }
    const rain = 0;
    const flow = 2;
    const expectedResult = {
      maxVolumeFlow: 5,
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      rain: 0,
      // raining: false,
      flow: 2,
      slotLastIndex: 2,
      dropsLastIndex: 4, // index of the one that ran off, not index AFTER runoff occurs
      runoffFirstIndex: 4,
      heldTooLong: true,
      tooFull: false,
      needsToRunoff: true,
      runoffVolume: 1,
      slotsWithIncrement:[[0,4,11],[  5,6,8],[    3,3,11]],
      slotsWithRain:     [[0,4,11],[  5,6,8],[    3,3,11]],
      slotsWithFlow:     [[0,4,11],[  5,6,8],[1,1,3,3,11]],
      slotsWithDrain:    [[0,4   ],[1,5,6,8],[1,1,3,3,11]],
      slotsWithRunoff:   [[0,4   ],[1,5,6,8],[1,1,3,3   ]],
      slots:             [[0,4   ],[1,5,6,8],[1,1,3,3   ]],
      volume: 9,
    }
    const result = helpers.cycle(state, rain, flow);
    expect(result).toEqual(expectedResult);
  });
  it('cycle drain, flow, runoff 0', () => {
    const state = {
      slots: [[0,3,10],[4,5,7],[2,2,10]],
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      maxVolumeFlow: 1,
    }
    const rain = 0;
    const flow = 2;
    const expectedResult = {
      maxVolumeFlow: 1,
      maxLateralDuration: 10,
      maxVerticalDuration: 10,
      rain: 0,
      // raining: false,
      flow: 2,
      slotLastIndex: 2,
      dropsLastIndex: 4, // index of the one that ran off, not index AFTER runoff occurs
      runoffFirstIndex: 1,
      heldTooLong: true,
      tooFull: true,
      needsToRunoff: true,
      runoffVolume: 4,
      slotsWithIncrement:[[0,4,11],[  5,6,8],[    3,3,11]],
      slotsWithRain:     [[0,4,11],[  5,6,8],[    3,3,11]],
      slotsWithFlow:     [[0,4,11],[  5,6,8],[1,1,3,3,11]],
      slotsWithDrain:    [[0,4   ],[1,5,6,8],[1,1,3,3,11]],
      slotsWithRunoff:   [[0,4   ],[1,5,6,8],[1         ]],
      slots:             [[0,4   ],[1,5,6,8],[1         ]],
      volume: 6,
    }
    const result = helpers.cycle(state, rain, flow);
    expect(result).toEqual(expectedResult);
  });


});