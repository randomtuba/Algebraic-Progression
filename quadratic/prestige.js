function quadFormula() {
  if(player.totalx2.gte(1)){
    return new Decimal(1.25).pow(player.x.div(100).sub(1)).mul(new Decimal(1.5).pow(player.y)).mul(Decimal.pow(2,player.doublers)).mul(hasSU(5)?SQRT_UPGRADES[5].eff():1).mul(hasSU(10)?SQRT_UPGRADES[10].eff():1).floor()
  }else{
    return Decimal.pow(2,player.doublers).mul(hasSU(5)?SQRT_UPGRADES[5].eff():1).mul(hasSU(10)?SQRT_UPGRADES[10].eff():1);
  }
}

function goQuadratic() {
  if(quadFormula().gte(1)){
    player.x2 = player.x2.add(quadFormula())
    player.totalx2 = player.totalx2.add(quadFormula())
    player.points = new Decimal(hasQU(8)?25:0)
    for (let i = 0; i < 7; i++) {
      player.buyables[i] = new Decimal(0)
    }
    player.x = new Decimal(0)
    player.y = new Decimal(0)
    if(!hasQU(6)) player.xUpgs = []
    if(player.prestigeTimes[0] < player.prestigeTimes[1]) player.prestigeTimes[1] = player.prestigeTimes[0]
    player.prestigeTimes[0] = 0
    player.quadratics = player.quadratics.add(1)
    player.challenge = 0
    player.chalExponents = [new Decimal(0),new Decimal(1)]
  }
}