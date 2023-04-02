function varSynthUnlockCosts(x,type) {
  switch (x) {
    case 1:
      return type === 'y2' ? new Decimal(1e25) : 39
    break;
    case 2:
      return type === 'y2' ? new Decimal(1e37) : 42
    break;
    case 3:
      return type === 'y2' ? new Decimal(1e45) : 46
    break;
  }
}

function hasChargedUpgrade(x) {
  return player.varSynth.chargedXUpgs.includes(x);
}

function x2y2Formula() {
  let x2y2 = player.x2.pow(0.000001).mul(player.y2.pow(0.02)).pow(1.2)
  if(x2y2.gte(1e15)) x2y2 = x2y2.div(1e15).pow(0.5).mul(1e15)
  x2y2 = x2y2.sub(player.varSynth.x2y2).max(0).floor()
  return x2y2
}

function x2y2Reset() {
  if(x2y2Formula().gte(1)) {
    player.varSynth.x2y2 = player.varSynth.x2y2.add(x2y2Formula())
    player.x2 = new Decimal(0)
    player.y2 = new Decimal(0)
  }
}

function circleGen() {
  let cir = player.varSynth.x2y2.div(10)
  cir = cir.mul(circleEffects(5))
  if(player.varSynth.unlocked[2]) cir = cir.mul(player.varSynth.revolutions.pow(0.25).add(1))
  cir = cir.mul(Y_CHALLENGES[1].eff())
  return cir
}

function circleEffects(x) {
  if(!hasCircleMilestone(x)) {
    return new Decimal(1)
  }
  switch (x) {
    case 1: // IP gain
      return player.varSynth.circles.pow(20).add(1)
    break;
    case 2: // Z-Power gain
      return player.varSynth.circles.add(1).log10().add(1)
    break;
    case 3: // 2nd CE softcap start
      return player.varSynth.circles.pow(50).add(1)
    break;
    case 4: // i exponent gain
      return player.varSynth.circles.add(1).log10().div(2).add(1)
    break;
    case 5: // Circles gain
      return player.varSynth.circles.pow(0.3).add(1)
    break;
  }
}

function hasCircleMilestone(x) {
  return player.varSynth.circles.gte(tmp.circleMilestones[x])
}

function nextCircleMilestone() {
  if(hasCircleMilestone(1) && !hasCircleMilestone(2)) {
    return "Next circle milestone at " + format(tmp.circleMilestones[2]) + "."
  } else if (hasCircleMilestone(2) && !hasCircleMilestone(3)) {
    return "Next circle milestone at " + format(tmp.circleMilestones[3]) + "."
  } else if (hasCircleMilestone(3) && !hasCircleMilestone(4)) {
    return "Next circle milestone at " + format(tmp.circleMilestones[4]) + "."
  } else if (hasCircleMilestone(4) && !hasCircleMilestone(5)) {
    return "Next circle milestone at " + format(tmp.circleMilestones[5]) + "."
  } else {
    return "You have all of the circle milestones."
  }
}

function iExpGen() {
  return new Decimal(0.5).mul(Decimal.pow(2,player.varSynth.iExpBuyables[1])).mul(Y_CHALLENGES[2].eff()).mul(hasCircleMilestone(4)?circleEffects(4):1)
}

function iExpEffects(x) {
  switch (x) {
    case 1:
      return iExpGen().gte(20) ? Decimal.pow(1e10,Decimal.add(1,player.varSynth.iExpBuyables[2])) : Decimal.pow(1e10,Decimal.add(1,player.varSynth.iExpBuyables[2])).pow(player.varSynth.iExp.div(Decimal.div(8,3).div(Math.PI)).sin().max(0))
    break;
    case 2:
      return iExpGen().gte(20) ? Decimal.pow(1e10,Decimal.add(1,player.varSynth.iExpBuyables[2])) : Decimal.pow(1e10,Decimal.add(1,player.varSynth.iExpBuyables[2])).pow(player.varSynth.iExp.sub(Decimal.div(4,3)).div(Decimal.div(8,3).div(Math.PI)).sin().max(0))
    break;
    case 3:
      return iExpGen().gte(20) ? Decimal.pow(1e10,Decimal.add(1,player.varSynth.iExpBuyables[2])) : Decimal.pow(1e10,Decimal.add(1,player.varSynth.iExpBuyables[2])).pow(player.varSynth.iExp.sub(Decimal.div(8,3)).div(Decimal.div(8,3).div(Math.PI)).sin().max(0))
    break;
  }
}

function revBuyableCosts(x) {
  if(x == 1) {
    return new Decimal(10).mul(Decimal.pow(4,player.varSynth.iExpBuyables[x]))
  } else {
    return new Decimal(100).mul(Decimal.pow(3,player.varSynth.iExpBuyables[x]))
  }
}

function buyRevBuyable(x) {
  if(player.varSynth.revolutions.gte(revBuyableCosts(x))) {
    player.varSynth.revolutions = player.varSynth.revolutions.sub(revBuyableCosts(x))
    player.varSynth.iExpBuyables[x] = player.varSynth.iExpBuyables[x].add(1)
  }
}