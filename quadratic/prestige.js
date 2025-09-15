function quadFormula() {
  if(((player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1)) && (player.y.gte(1) || player.compChallenge == 5)) || player.challenge != 0){
    let x2 = new Decimal(1.25).pow(player.x.div(player.x.gte(xFactorSoftcapStart())?xFactorSoftcapStart():1).pow(player.x.gte(xFactorSoftcapStart())?xFactorSoftcapStrength():1).mul(player.x.gte(xFactorSoftcapStart())?xFactorSoftcapStart():1).div(100).sub(1)).mul(new Decimal(1.5).pow(player.y))
    if (player.compChallenge == 5) x2 = new Decimal(1);
    x2 = x2.mul(Decimal.pow(Decimal.add(2,compPlaneEffects(3)),player.doublers).pow(IntegrationUpgrades.quadratic9.isBought() ? 100 : 1))
    if(hasSU(5)) x2 = x2.mul(SQRT_UPGRADES[5].eff())
    if(hasSU(10)) x2 = x2.mul(SQRT_UPGRADES[10].eff())
    if(hasCU(1,1) && player.compChallenge != 10 && (player.integration.challenge != 2 || player.integration.chalCompletions[2] >= 2)) x2 = x2.mul(BCOMP_UPGRADES[1].eff2())
    if(hasCU(0,5) && player.compChallenge != 10 && (player.integration.challenge != 2 || player.integration.chalCompletions[2] >= 2)) x2 = x2.mul(COMP_UPGRADES[5].eff())
    if(hasCU(1,7) && player.compChallenge != 10 && (player.integration.challenge != 2 || player.integration.chalCompletions[2] >= 2)) x2 = x2.mul(BCOMP_UPGRADES[7].eff())
    if(player.compChallenge == 2) x2 = x2.div(player.antiSlope.cbrt())
    x2 = x2.mul(COMP_CHALLENGES[7].eff())
    if(hasYQU(11,'bought')) x2 = x2.mul(YQUAD_UPGRADES[11].eff())
    x2 = x2.mul(NumberSets.effect(2,1))
    if(IntegrationUpgrades.prod1.isBought()) x2 = x2.mul(IntegrationUpgrades.prod1.eff())
    if(HypercompUpgrades.has(2)) x2 = x2.mul(HypercompUpgrades[2].eff())
    if(hasCU(1,4) && player.compChallenge != 10 && (player.integration.challenge != 2 || player.integration.chalCompletions[2] >= 2)) x2 = x2.pow(BCOMP_UPGRADES[4].eff())
    x2 = x2.pow(NumberSets.effect(6,4))
    x2 = x2.pow(SinusoidalUpgrades[24].eff())
    if(player.compChalCompletions[4] >= 6) x2 = x2.pow(1.05)
    if(player.compChallenge == 1) x2 = x2.pow(cc1Exponent())
    if(player.inSynthDiv && (player.integration.challenge != 2 || player.integration.chalCompletions[2] < 2)) x2 = x2.max(0).pow(hasSDU(9)?0.025:0.02)
    if(player.integration.inTheLimit) x2 = x2.pow(Limit.challengeFactorEffects(2))
    if(player.integration.challenge == 6 && player.integration.ic6Version == 0) x2 = x2.pow(0.5)
    if(player.yChallenge == 1) x2 = new Decimal(0)
    if(hasPermUpgrade(2)) x2 = x2.mul(PERM_UPGRADES[2].eff())
    x2 = x2.min("1e3e14")
    x2 = x2.floor()
    return x2
  }else{
    if(player.y.gte(1)){
      return Decimal.pow(2,player.doublers).mul(hasSU(5)?SQRT_UPGRADES[5].eff():1).mul(hasSU(10)?SQRT_UPGRADES[10].eff():1).mul(hasPermUpgrade(2)?PERM_UPGRADES[2].eff():1).floor();
    }else{
      return new Decimal(0);
    }
  }
}

function xFactorSoftcapStart() {
  return new Decimal(1.5e11).add(Decimal.mul(1e11,player.integration.challenge == 6 && player.integration.ic6Version == 2 ? 0 : player.parabolas.add(player.integration.chalCompletions[6].includes(2) ? 0.5 : 0)))
}

function xFactorSoftcapStrength() {
  let exp = new Decimal(0.25)
  if(IntegrationUpgrades.prod1.isBought()) exp = exp.add(0.2)
  if(player.integration.challenge != 6 || player.integration.ic6Version != 2) exp = exp.add(player.parabolas.gte(4) ? player.parabolas.add(player.integration.chalCompletions[6].includes(2) ? 0.5 : 0).div(25).sub(0.12).pow(1.5).add(0.12) : player.parabolas.add(player.integration.chalCompletions[6].includes(2) ? 0.5 : 0).div(25))
  return exp
}

function parabolaCost() {
  return new Decimal("1e1.06e11").pow(Decimal.pow(2,player.parabolas)).pow(player.parabolas.gte(3)?2:1).pow(player.parabolas.gte(4)?4:1).pow(player.parabolas.gte(5)?8:1).pow(player.parabolas.gte(6)?16:1)
}

function goQuadratic(force) {
  if(player.integration.challenge != 4 || !player.integration.ic4Prestiges[0]) {
    if(force){
      player.points = new Decimal(hasQU(8)?25:0)
      if(player.compChallenge == 6) {
        player.points = new Decimal(1e9)
      }
      if(IntegrationUpgrades.spo.isBought()) player.points = new Decimal(1e50)
      for (let i = 0; i < 7; i++) {
        player.buyables[i] = new Decimal(0)
      }
      if(player.compChallenge == 8) {
        player.buyables[3] = new Decimal(2)
      }
      player.x = new Decimal(0)
      player.y = new Decimal(0)
      if(!hasQU(6) && !IntegrationUpgrades.cxu.isBought()) player.xUpgs = []
      if(player.prestigeTimes[0] < player.prestigeTimes[1]) player.prestigeTimes[1] = player.prestigeTimes[0]
      if(player.gamePrestigeTimes[0].lt(player.gamePrestigeTimes[1])) player.gamePrestigeTimes[1] = player.gamePrestigeTimes[0]
      player.prestigeTimes[0] = 0
      player.gamePrestigeTimes[0] = new Decimal(0)
      if(player.integration.challenge != 1) player.challenge = 0
      player.chalExponents = [new Decimal(0),new Decimal(1)]
      player.purchases = 75
      player.integration.ic4Prestiges[0] = true
    }
    else if(quadFormula().gte(1)){
      if(!player.options[7] || player.autobuyers[9] || confirm("Going Quadratic will reset Buildings, Functions, Variables, and X Upgrades, but you will receive x² in return. Are you sure you want to do this?")) {
        let q = quadFormula()
        if(player.dailyAchievements[0].includes('44') && !player.dailyAchievements[1].includes('44') && q.gte(player.x2.mul("1e1000"))){
          player.dailyAchievements[1].push('44')
          $.notify("Daily Achievement Unlocked: " + DailyAchievements.standardize('44').name, {
            style: 'apcurrent',
            className:'dailyAchieves',
          });
        }
        player.x2 = player.x2.add(q)
        player.totalx2 = player.totalx2.add(q)
        player.last10runs.quadratic.splice(0,0,{gain:q,time:player.prestigeTimes[0],gameTime:player.gamePrestigeTimes[0]})
        player.last10runs.quadratic = player.last10runs.quadratic.slice(0,-1)
        player.quadratics = player.quadratics.add(quadraticsGain())
        player.points = new Decimal(hasQU(8)?25:0)
        if(player.compChallenge == 6) {
          player.points = new Decimal(1e9)
        }
        if(IntegrationUpgrades.spo.isBought()) player.points = new Decimal(1e50)
        for (let i = 0; i < 7; i++) {
          player.buyables[i] = new Decimal(0)
        }
        if(player.compChallenge == 8) {
          player.buyables[3] = new Decimal(2)
        }
        player.x = new Decimal(0)
        player.y = new Decimal(0)
        if(!hasQU(6) && !IntegrationUpgrades.cxu.isBought()) player.xUpgs = []
        if(player.dailyAchievements[0].includes('33') && !player.dailyAchievements[1].includes('33') && player.gamePrestigeTimes[0].lt(0.2) && player.quadBuyables[1].gte(4)){
          player.dailyAchievements[1].push('33')
          $.notify("Daily Achievement Unlocked: " + DailyAchievements.standardize('33').name, {
            style: 'apcurrent',
            className:'dailyAchieves',
          });
        }
        if(player.prestigeTimes[0] < player.prestigeTimes[1]) player.prestigeTimes[1] = player.prestigeTimes[0]
        if(player.gamePrestigeTimes[0].lt(player.gamePrestigeTimes[1])) player.gamePrestigeTimes[1] = player.gamePrestigeTimes[0]
        player.prestigeTimes[0] = 0
        player.gamePrestigeTimes[0] = new Decimal(0)
        if(player.integration.challenge != 1) player.challenge = 0
        player.chalExponents = [new Decimal(0),new Decimal(1)]
        player.purchases = 75
        if(player.integration.challenge == 2 && player.integration.chalCompletions[2] == 0) {
          IntegrationPrestige.integrate(true)
          player.integration.chalCompletions[2]++
          player.integration.challenge = 0
        }
        player.integration.ic4Prestiges[0] = true
      }
    }
  }
}

function quadraticsGain() {
  let quad = new Decimal(1)
  if(hasCU(0,7) && player.compChallenge != 10 && player.integration.challenge != 2) quad = quad.mul(COMP_UPGRADES[7].eff()) 
  if(hasCU(1,2) && player.compChallenge != 10 && player.integration.challenge != 2) quad = quad.mul(BCOMP_UPGRADES[2].eff())
  quad = quad.mul(COMP_CHALLENGES[4].eff())
  if(hasYQU(1,'bought')) quad = quad.mul(YQUAD_UPGRADES[1].eff())
  quad = quad.mul(RebuyableIntegrationUpgrades[4].eff())
  quad = quad.mul(NumberSets.effect(2,2))
  if(IntegrationUpgrades.quadratic1.isBought()) quad = quad.mul(IntegrationUpgrades.quadratic1.eff())
  if(hasPermUpgrade(9)) quad = quad.mul(PERM_UPGRADES[9].eff())
  if(player.compChallenge == 4 || player.integration.challenge == 4) quad = new Decimal(1)
  return quad
}