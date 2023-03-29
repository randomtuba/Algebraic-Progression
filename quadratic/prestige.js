function quadFormula() {
  if(((player.totalx2.gte(1) || player.totali.gte(1)) && (player.y.gte(1) || player.compChallenge == 5)) || player.challenge != 0){
    let x2 = new Decimal(1.25).pow(player.x.div(100).sub(1)).mul(new Decimal(1.5).pow(player.y))
    if (player.compChallenge == 5) x2 = new Decimal(1);
    x2 = x2.mul(Decimal.pow(Decimal.add(2,compPlaneEffects(3)),player.doublers))
    if(hasSU(5)) x2 = x2.mul(SQRT_UPGRADES[5].eff())
    if(hasSU(10)) x2 = x2.mul(SQRT_UPGRADES[10].eff())
    if(hasCU(1,1) && player.compChallenge != 10) x2 = x2.mul(BCOMP_UPGRADES[1].eff2())
    if(hasCU(0,5) && player.compChallenge != 10) x2 = x2.mul(COMP_UPGRADES[5].eff())
    if(hasCU(1,7) && player.compChallenge != 10) x2 = x2.mul(BCOMP_UPGRADES[7].eff())
    if(player.compChallenge == 2) x2 = x2.div(player.antiSlope.cbrt())
    x2 = x2.mul(COMP_CHALLENGES[7].eff())
    if(hasYQU(11,'bought')) x2 = x2.mul(YQUAD_UPGRADES[11].eff())
    if(hasCU(1,4) && player.compChallenge != 10) x2 = x2.pow(BCOMP_UPGRADES[4].eff())
    if(player.compChallenge == 1) x2 = x2.pow(cc1Exponent())
    if(player.yChallenge == 1) x2 = new Decimal(0)
    x2 = x2.floor()
    return x2
  }else{
    if(player.y.gte(1)){
      return Decimal.pow(2,player.doublers).mul(hasSU(5)?SQRT_UPGRADES[5].eff():1).mul(hasSU(10)?SQRT_UPGRADES[10].eff():1).floor();
    }else{
      return new Decimal(0);
    }
  }
}

function goQuadratic(force) {
  if(force){
    player.points = new Decimal(hasQU(8)?25:0)
    if(player.compChallenge == 6) {
      player.points = new Decimal(1e9)
    }
    for (let i = 0; i < 7; i++) {
      player.buyables[i] = new Decimal(0)
    }
    if(player.compChallenge == 8) {
      player.buyables[3] = new Decimal(2)
    }
    player.x = new Decimal(0)
    player.y = new Decimal(0)
    if(!hasQU(6)) player.xUpgs = []
    if(player.prestigeTimes[0] < player.prestigeTimes[1]) player.prestigeTimes[1] = player.prestigeTimes[0]
    player.prestigeTimes[0] = 0
    player.challenge = 0
    player.chalExponents = [new Decimal(0),new Decimal(1)]
    player.purchases = 75
  }
  else if(quadFormula().gte(1)){
    if(!player.options[7] || player.autobuyers[9] || confirm("Going Quadratic will reset Buildings, Functions, Variables, and X Upgrades, but you will receive x² in return. Are you sure you want to do this?")) {
      let q = quadFormula()
      player.x2 = player.x2.add(q)
      player.totalx2 = player.totalx2.add(q)
      player.last10runs.quadratic.splice(0,0,{gain:q,time:player.prestigeTimes[0]})
      player.last10runs.quadratic = player.last10runs.quadratic.slice(0,-1)
      player.quadratics = player.quadratics.add(quadraticsGain())
      player.points = new Decimal(hasQU(8)?25:0)
      if(player.compChallenge == 6) {
        player.points = new Decimal(1e9)
      }
      for (let i = 0; i < 7; i++) {
        player.buyables[i] = new Decimal(0)
      }
      if(player.compChallenge == 8) {
        player.buyables[3] = new Decimal(2)
      }
      player.x = new Decimal(0)
      player.y = new Decimal(0)
      if(!hasQU(6)) player.xUpgs = []
      if(player.prestigeTimes[0] < player.prestigeTimes[1]) player.prestigeTimes[1] = player.prestigeTimes[0]
      player.prestigeTimes[0] = 0
      player.challenge = 0
      player.chalExponents = [new Decimal(0),new Decimal(1)]
      player.purchases = 75
    }
  }
}

function quadraticsGain() {
  let quad = new Decimal(1)
  if(hasCU(0,7) && player.compChallenge != 10) quad = quad.mul(COMP_UPGRADES[7].eff()) 
  if(hasCU(1,2) && player.compChallenge != 10) quad = quad.mul(BCOMP_UPGRADES[2].eff())
  quad = quad.mul(COMP_CHALLENGES[4].eff())
  if(hasYQU(1,'bought')) quad = quad.mul(YQUAD_UPGRADES[1].eff())
  if(player.compChallenge == 4) quad = new Decimal(1)
  return quad
}