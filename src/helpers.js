export const receiveRain = (rain, slotsPrior) => {
  const slots = [...slotsPrior]; // e.g.[[0],[0,1,2,0,2],[1,3]]
  if(!rain) return {
    rain,
    slots
  };
  const firstSlotIsEmpty = (slots[0].length === 1 && slots[0][0] === 0) || (slots[0].length === 0);
  const newRainInputs = [];
  for(let i=0; i<rain; i++){
    newRainInputs.push(1);
  }
  if(firstSlotIsEmpty){
    slots[0] = newRainInputs
  } else if(slots[0][0] === 0) {
    slots[0] = [...newRainInputs, ...slots[0].slice(1,slots[0].length)];
  } else {
    slots[0] = [...newRainInputs, ...slots[0]];
  }
  return{
    rain,
    raining: true,
    slots,
  };
};

export const receiveFlow = (flow, slotsPrior) => {
  const slots = [...slotsPrior]; // e.g.[[0],[0,1,2,0,2],[1,3]]
  if(!flow) return {
    flow,
    slots,  
  };
  const newFlowInputs = [];
  for(let i=0; i<flow; i++){
    newFlowInputs.push(1);
  }
  const finalSlotIsEmpty = (slots[slots.length-1].length === 1 && slots[slots.length-1][slots[slots.length-1].length-1] === 0 ) || (slots[slots.length-1] === 0)
  slots[slots.length-1] = finalSlotIsEmpty ?
    [...newFlowInputs]:
    [...newFlowInputs, ...slots[slots.length-1]];
  return{
    flow,
    slots,
  };
};

export const drain = (slotsPrior, maxVerticalDuration) => {
  let moveDown = 0;
  const slots = slotsPrior.map((dropsPrior, i)=>{
    let drops = [...dropsPrior];
    const dropsAreEmpty = (drops.length === 1 && drops[0] === 0) || (drops.length === 0);
    const slotIsBottom = i === slotsPrior.length-1;
    if(moveDown){
      const volume = [];
      for(let i = 0; i<moveDown; i++){
        volume.push(1);
      }
      if(dropsAreEmpty){
        drops = [...volume];
      } else {
        drops = [...volume, ...drops];
      }
    }
    moveDown = drops[drops.length-1] > maxVerticalDuration ? 1 : 0 ;
    if(moveDown){
      if(!slotIsBottom){
        drops = drops.length <= 1 ? [0] : drops.slice(0, drops.length-1);
      }
    }
    if(slotIsBottom) {
      moveDown = 0;
    }
    return drops;
  });
  return {slots};
};

export const runoff = (slotsPrior, maxLateralDuration) => {
  const slots = [...slotsPrior]; // e.g.[[0],[0,1,2,0,2],[1,3]]
  const slotLastIndex = slots.length-1;
  const runoffLastIndex = slots[slotLastIndex].length-1 >= 0 ? slots[slotLastIndex].length-1 : 0 ;
  const needsToRunoff = slots[slotLastIndex][runoffLastIndex] > maxLateralDuration;
  if(needsToRunoff){
    slots[slotLastIndex] = slots[slotLastIndex].length <= 1 ?
      [0] :
      slots[slotLastIndex].slice(0,slots[slotLastIndex].length-1);
  }
  return {
    slotLastIndex,
    runoffLastIndex,
    needsToRunoff,
    runoffVolume: needsToRunoff ? 1 : 0,
    slots,
  };
};

export const increment = slotsPrior => {
  const slots = slotsPrior.map(slot=>{
    return slot.map(s=>s !== 0 ? s + 1 : 0);
  });
  return{
    slots,
  };
};

export const cycle = (state, rain, flow) => {
  const withIncrement = increment(state.slots);
  // keys: slots
  const stateWithIncrement = {...state, ...withIncrement, slotsWithIncrement: withIncrement.slots};

  const withRain = receiveRain(rain, stateWithIncrement.slots);
  // keys: rain, raining, slots
  const stateWithRain = {...stateWithIncrement, ...withRain, slotsWithRain: withRain.slots};
  
  const withFlow = receiveFlow(flow, stateWithRain.slots);
  // keys: flow, slots
  const stateWithFlow = {...stateWithRain, ...withFlow, slotsWithFlow: withFlow.slots};

  const withDrain = drain(stateWithFlow.slots, state.maxVerticalDuration);
  // keys: slots
  const stateWithDrain = {...stateWithFlow, ...withDrain, slotsWithDrain: withDrain.slots};

  const withRunoff = runoff(stateWithDrain.slots, state.maxLateralDuration);
  // keys: slotLastIndex, runoffLastIndex, needsToRunoff, volume, slots
  const stateWithRunoff = {...stateWithDrain, ...withRunoff, slotsWithRunoff: withRunoff.slots};

  let volume = 0;
  stateWithRunoff.slots.forEach(slot=>{
    slot.forEach(drop=>{
      if(drop > 0) volume++ ;
    });
  });
  const finalState = {...stateWithRunoff, volume: volume};
  
  return finalState;
};