// this code is generally awful

function compPlaneEffects(x) {
  switch (x) {
    case 1:
      return player.compPlane[1][1].add(1).log10().pow(0.9).floor()
      break;
    case 2:
      return player.compPlane[1][2].add(1).log(100).add(1)
      break;
    case 3:
      return player.compPlane[1][3].add(1).log10().add(1).log(3)
      break;
    case 4:
      return player.compPlane[1][4].add(1).log10().pow(Decimal.add(0.8,POLY_BUYABLES[1].eff())).floor()
      break;
  }
}

function compPlaneEffectDisplay(x) {
  switch (x) {
    case 1:
      return "giving " + formatWhole(compPlaneEffects(x)) + " free purchases for the middle 2 Quadratic Formula buyables. (next at " + format(Decimal.pow(10,compPlaneEffects(1).add(1).pow(1.11111)).sub(1)) + ")"
      break;
    case 2:
      return "multiplying the gain of sacrificed currencies by " + format(compPlaneEffects(x)) + "."
      break;
    case 3:
      return "adding " + format(compPlaneEffects(x)) + " to the multiplier per purchase of the x² doubler and the RE doubler."
      break;
    case 4:
      return "giving " + formatWhole(compPlaneEffects(x)) + " extra Upgrade Points. (next at " + format(Decimal.pow(10,compPlaneEffects(4).add(1).pow(Decimal.div(1,Decimal.add(0.8,POLY_BUYABLES[1].eff())))).sub(1)) + ")"
  }
}

function whyAreThereSoManyFunctionsNeededForThisMechanic(x) {
  switch (x) {
    case 1:
      return player.sacX
      break;
    case 2:
      return player.sacY
      break;
    case 3:
      return player.sacX2
      break;
    case 4:
      return player.sacZ
      break;
  }
}

function compPlaneBuyCosts(x) {
  switch (x) {
    case 1:
      return new Decimal(100000).mul(Decimal.pow(1.5,player.compPlane[0][x]))
      break;
    case 2:
      return new Decimal(1e8).mul(Decimal.pow(1.75,player.compPlane[0][x]))
      break;
    case 3:
      return new Decimal(1e18).mul(Decimal.pow(2,player.compPlane[0][x]))
      break;
    case 4:
      return new Decimal("1e2500").mul(Decimal.pow(1e10,player.compPlane[0][x])).mul(Decimal.pow(10,player.compPlane[0][x].pow(2)))
      break;
  }
}

function buyCplaneVar(x) {
  if(player.compPlane[0][x].eq(0)) {
    if(whyAreThereSoManyFunctionsNeededForThisMechanic(x).gte(tmp.compPlaneCosts[x*2-1]) && player.i.gte(tmp.compPlaneCosts[x*2])) {
      player.i = player.i.sub(tmp.compPlaneCosts[x*2])
      player.compPlane[0][x] = player.compPlane[0][x].add(1)
    }
  } else {
    if(player.i.gte(compPlaneBuyCosts(x))) {
      player.i = player.i.sub(compPlaneBuyCosts(x))
      player.compPlane[0][x] = player.compPlane[0][x].add(1)
    }
  }
}

function compPlaneGen(x) {
  let cp = Decimal.pow(1.2,player.compPlane[0][x]).mul(player.compPlane[0][x])
  if(hasCU(0,11) && x < 4) cp = cp.mul(COMP_UPGRADES[11].eff())
  if(hasCU(1,5) && x < 4) cp = cp.mul(BCOMP_UPGRADES[5].eff())
  if(player.varSynth.unlocked[2] && x < 4) cp = cp.mul(iExpEffects(x))
  return cp
}

function triplerCost() {
  return new Decimal(10000).mul(Decimal.pow(hasYQU(9,'bought') ? 25 : 50,player.triplers))
}

function buyTripler() {
  if(player.compPlane[1][1].gte(triplerCost()) && player.compPlane[1][2].gte(triplerCost()) && player.compPlane[1][3].gte(triplerCost())){
    for (i = 1; i <= 3; i++) {
      player.compPlane[1][i] = player.compPlane[1][i].sub(triplerCost())
    }
    player.triplers = player.triplers.add(1)
  }
}