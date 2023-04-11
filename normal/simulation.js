function staticMultipliers() {
  let mult = new Decimal(1);
  mult = mult.mul(BUYABLES[4].eff())
  mult = mult.mul(player.buyables[7])
  if(hasUpgrade(2) && player.challenge != 5 && player.compChallenge != 8) mult = mult.mul(2)
  if(hasQU(1)) mult = mult.mul(QUAD_UPGRADES[1].eff())
  if(hasSU(2)) mult = mult.mul(SQRT_UPGRADES[2].eff())
  if(hasUpgrade(5)) mult = mult.mul(1000)
  if(hasSU(10)) mult = mult.mul(SQRT_UPGRADES[10].eff())
  if(hasChallenge(9)) mult = mult.mul(CHALLENGES[9].effect())
  if(hasCU(1,1)) mult = mult.mul(BCOMP_UPGRADES[1].eff())
  if(hasChargedUpgrade(5) && player.challenge != 5 && player.compChallenge != 8) mult = mult.mul("1e9997")
  mult = mult.mul(COMP_UPGRADES[13].eff())
  return mult
}

function nonStaticMultipliers(points) {
  let mult = new Decimal(1);
  // tracking your simulated points in square root
  let simulatedPoints = points // iteration with previously calculated point value as your new points amount
  
  //g(x)
  mult = mult.mul(new Decimal(BUYABLES[5].base()).pow(funcSoftcapStart()).mul(Decimal.pow(BUYABLES[5].base(),simulatedPoints.div(30000000).max(1).log(functionCostScaling(2)).add(1).floor().sub(funcSoftcapStart()).max(0).pow(0.5))))
  
  //h(x)
  mult = mult.mul(new Decimal(BUYABLES[6].base()).pow(funcSoftcapStart()).mul(Decimal.pow(BUYABLES[6].base(),simulatedPoints.div(100000000).max(1).log(functionCostScaling(3)).floor().sub(funcSoftcapStart()).max(0).pow(0.5))))

  //Quadratic Upgrade 13 effect
  if(hasQU(13)) mult = mult.mul(simulatedPoints.max(0).pow(hasZlabMilestone(2,1) ? 0.24 : 0.2).add(1))
  
  //Square Root Upgrade 9 effect
  if(hasSU(9)) mult = mult.mul(Decimal.pow(1.5,simulatedPoints.div(100000).mul(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).add(1).floor().add(1).div(100).mul(hasQU(18)?1.1:1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff())))).add(2).floor())) // non-static
  
  //Complex Upgrade 3 effect
  if(hasCU(0,3)) mult = mult.mul(Decimal.pow(1.001,simulatedPoints.div(100000).mul(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).add(1).floor())) // non-static
  
  //Permanent Upgrade 1 effect
  if(hasPermUpgrade(1)) mult = mult.mul(simulatedPoints.pow(0.01).gte(100) ? simulatedPoints.pow(0.01) : new Decimal(1))
  return mult
}

function getFinalPoints(level){
  let currentPointsValue = player.points.pow(0.55).div(level == 4 ? "1e5665" : 1)
  let exp = new Decimal(1)
  if(hasUpgrade(7) && player.challenge != 5 && player.compChallenge != 8) exp = exp.mul(1.01)
  if(hasChallenge(4)) exp = exp.mul(1.03)
  if(hasCU(0,1)) exp = exp.mul(COMP_UPGRADES[1].eff())
  exp = exp.mul(polyPowerEffect())
  if(player.inSynthDiv) exp = exp.max(0).mul(hasSDU(9)?0.025:0.02)
  let staticMults = staticMultipliers()
  for(let i=0; i<5; i++){
    currentPointsValue=nonStaticMultipliers(currentPointsValue).mul(staticMults).pow(0.55).div(level == 4 ? "1e5665" : 1).pow(exp)
  }
  currentPointsValue = currentPointsValue.min("1e5e8")
  return currentPointsValue
}

function simulateEssence(level) {
  // defining variables x and y for reference
  let x = getFinalPoints(level).div(100000).mul(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).add(1).floor()
  let y = x.div(100).mul(hasQU(18)?1.1:1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff())))).add(2).floor()
  
  if(level == 1){
    // Root Essence formula
    let re = new Decimal(1.1).pow(x.div(100).sub(1)).mul(new Decimal(1.25).pow(y))
    re = re.mul(Decimal.pow(Decimal.add(2,compPlaneEffects(3)),player.sqrtDoublers))
    if(hasSU(11)) re = re.mul(10)
    if(hasSU(15)) re = re.mul(SQRT_UPGRADES[15].eff())
    re = re.mul(ceEffect(1))
    if(hasCU(1,1)) re = re.mul(10)
    if(hasCU(0,6)) re = re.mul(COMP_UPGRADES[6].eff())
    if(hasCU(0,8)) re = re.mul(COMP_UPGRADES[8].eff())
    if(hasYQU(7,'bought')) re = re.mul(YQUAD_UPGRADES[7].eff())
    if(hasPermUpgrade(3)) re = re.mul(PERM_UPGRADES[3].eff())
    if(hasYQU(5,'bought')) re = re.pow(YQUAD_UPGRADES[5].eff())
    // If simulated RE > real RE, real RE equals simulated RE
    if (re.gte(player.rootEssence)) {
      player.rootEssence = re;
      if(getFinalPoints(1).gte(player.bestPointsInSqrt)) player.bestPointsInSqrt = getFinalPoints(1)
    }
  }else{
    // Challenge Essence formula
    let re = getFinalPoints(4).div(1e12).pow(0.06)
    if(hasCU(1,1)) re = re.mul(10)
    if(hasPermUpgrade(3)) re = re.mul(PERM_UPGRADES[3].eff2())
    if(re.gt(hasChallenge(10)?1e10:1e8)) re = re.div(hasChallenge(10)?1e10:1e8).pow(hasZlabMilestone(3,4)?0.62:0.6).mul(hasChallenge(10)?1e10:1e8)
    if(hasYQU(5,'bought')) re = re.pow(YQUAD_UPGRADES[5].eff())
    if(re.gt(ceSoftcapStart())) {
      let y = new Decimal(re).log(ceSoftcapStart())
      re = ceSoftcapStart().pow(y.pow(0.9))
    }
    // If simulated CE > real CE, real CE equals simulated CE
    if (re.gte(player.challengeEssence)) player.challengeEssence = re;
  }
}