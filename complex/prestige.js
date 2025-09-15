function compFormula() {
  if(player.totali.gte(1) || player.integrations.gte(1)){
    neg = player.x2.div("1e2950").pow(0.002).div(2).add(player.rootEssence.div("1e660").pow(0.004).div(2)).pow(0.4)
    neg = neg.mul(Decimal.pow(3,player.triplers))
    if(hasCU(0,9) && player.compChallenge != 10 && player.integration.challenge != 2) neg = neg.mul(COMP_UPGRADES[9].eff())
    if(hasCU(0,10) && player.compChallenge != 10 && player.integration.challenge != 2) neg = neg.mul(COMP_UPGRADES[10].eff())
    if(hasCU(0,12) && player.compChallenge != 10 && player.integration.challenge != 2) neg = neg.mul(COMP_UPGRADES[12].eff())
    if(hasMilestone(11)) neg = neg.mul(2)
    if(hasYQU(6,'bought')) neg = neg.mul(YQUAD_UPGRADES[6].eff())
    neg = neg.mul(Decimal.pow(1.25,totalColliderLevels()).pow(IntegrationUpgrades.yquadratic3.isBought() ? 10 : 1))
    if(hasCU(1,9) && player.compChallenge != 10 && player.integration.challenge != 2) neg = neg.mul(BCOMP_UPGRADES[9].eff())
    if(player.compChallenge != 10 && player.integration.challenge != 2) neg = neg.mul(COMP_UPGRADES[15].eff())
    if(hasSDU(7)) neg = neg.mul(SYNTH_DIV_UPGRADES[7].eff())
    neg = neg.mul(NumberSets.effect(3,1))
    if(IntegrationUpgrades.prod1.isBought()) neg = neg.mul(IntegrationUpgrades.prod1.eff())
    if(IntegrationUpgrades.complex4.isBought()) neg = neg.mul(IntegrationUpgrades.complex4.eff())
    if(hasYQU(13,'bought')) neg = neg.mul(YQUAD_UPGRADES[13].eff())
    if(HypercompUpgrades.has(3)) neg = neg.mul(HypercompUpgrades[3].eff())
    neg = neg.pow(COMP_CHALLENGES[10].eff())
    if(IntegrationUpgrades.complex8.isBought()) neg = neg.pow(IntegrationUpgrades.complex8.eff())
    neg = neg.pow(NumberSets.effect(6,5))
    neg = neg.pow(SinusoidalUpgrades[28].eff())
    if(player.integration.inTheLimit) neg = neg.pow(Limit.challengeFactorEffects(5))
    if(player.integration.challenge == 2) neg = neg.pow(0.415)
    if(player.integration.challenge == 3) neg = neg.pow(0.25)
    if(player.integration.challenge == 6 && player.integration.ic6Version == 0) neg = neg.pow(0.5)
    if(hasPermUpgrade(5)) neg = neg.mul(PERM_UPGRADES[5].eff())
    neg = neg.min("1e2.5e12")
    neg = neg.floor()
    if(player.x2.lt("1e2950") || player.rootEssence.lt("1e660")) neg = new Decimal(0)
    return neg
  }else{
    return new Decimal(1).mul(hasPermUpgrade(5)?PERM_UPGRADES[5].eff():1);
  }
}

function goComplex(force) {
  if(player.integration.challenge != 4 || !player.integration.ic4Prestiges[1]) {
    if(force){
      player.buyables[7] = new Decimal(0)
      player.buyables[8] = new Decimal(0)
      player.buyables[9] = new Decimal(0)
      if(hasMilestone(13)) player.bankedQuadratics = player.bankedQuadratics.add(player.quadratics.div(10).floor())
      player.quadratics = new Decimal(0)
      if(!hasMilestone(3)) player.autobuyers = [null,false,false,false,false,false,false,false,false,false,false]
      if(!hasMilestone(3)) player.quadUpgs = []
      if(!hasMilestone(9)) player.currentSubtab[0] = "upgrades"
      if(!hasMilestone(4)) player.sacX = new Decimal(0)
      if(!hasMilestone(4)) player.sacY = new Decimal(0)
      if(!hasMilestone(4)) player.sacX2 = new Decimal(0)
      player.sacrifice = 'x'
      if(!hasMilestone(6)) player.rootEssence = new Decimal(0)
      if(player.integration.challenge != 2) player.inSqrt = false
      if(!hasMilestone(5)) player.sqrtUpgs = []
      player.doublers = new Decimal(0)
      player.sqrtDoublers = new Decimal(0)
      player.slope = new Decimal(0)
      player.b = new Decimal(0)
      if(player.integration.challenge != 1) player.challenge = 0
      player.chalCompletions = hasMilestone(7)?[1,2,3,4,5,6,7,8,9,10]:[]
      player.abc = [null,new Decimal(0),new Decimal(0),new Decimal(0)]
      player.quadPower = new Decimal(0)
      player.quadBuyables[1] = new Decimal(0)
      player.quadBuyables[2] = new Decimal(0)
      player.quadBuyables[3] = new Decimal(0)
      player.quadBuyables[4] = new Decimal(0)
      if(!hasMilestone(6)) player.challengeEssence = new Decimal(0)
        if(player.integration.challenge != 2) player.epicenterLevel = "1"
      if(!hasMilestone(9)) player.hasCompletedLevel4 = false
      if(!hasMilestone(9)) player.hasCompletedLevel5 = false
      player.sqrtEnters = 0
      if(!hasMilestone(2)) player.compAutobuyers[2] = 1
      goQuadratic(true)
      player.x2 = new Decimal(0)
      player.totalx2 = new Decimal(0)
      if(IntegrationUpgrades.squ.isBought()) player.x2 = new Decimal(1e9)

      player.prestigeTimes[2] = 0
      player.gamePrestigeTimes[2] = new Decimal(0)
      if(player.options[6]){
        player.upgradePoints[0] = player.upgradePoints[1].sub(player.unlocked > 0 ? COMP_CHALLENGES[player.unlocked].unlockCost : 0)
        if(player.compUpgs[0].length == 0 && !hasSecretAchievement(4)) {
          player.secretAchievements.push('4')
          $.notify("Secret Achievement Unlocked: Not Quite Right", {
            style: 'apcurrent',
            className:'secretAchieves',
          });
        }
        player.compUpgs[0] = []
        player.fourthRowCompUpgs = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
      }
      player.options[6] = false
      if(player.options[4] && player.unlocked > 0 && player.integration.challenge != 1 && player.integration.challenge != 2){player.upgradePoints[0] = player.upgradePoints[0].add(COMP_CHALLENGES[player.unlocked].unlockCost); player.unlocked = 0}
      player.options[4] =  (player.compChallenge != 0)&&player.options[4]
      if(player.integration.challenge != 1 && player.integration.challenge != 2) player.compChallenge = 0
      player.antiSlope = new Decimal(1)
      player.z = new Decimal(0)
      player.zlab.zpower = new Decimal(0)
      player.integration.ic4Prestiges[1] = true
    }else if(!force && player.x2.gte("1e2950") && player.rootEssence.gte("1e660") && player.hasCompletedLevel5){
      if(!player.options[8] || player.compAutobuyers[7] || confirm("Going Complex will reset everything Quadratic resets, and will also reset all Quadratic-level content, but you will receive i in return. Are you sure you want to do this?")) {
        let c = compFormula()
        player.i = player.i.add(c)
        player.totali = player.totali.add(c)
        player.last10runs.complex.splice(0,0,{gain:c,time:player.prestigeTimes[2],gameTime:player.gamePrestigeTimes[2]})
        player.last10runs.complex = player.last10runs.complex.slice(0,-1)
        player.complexes = player.complexes.add(complexesGain())
        if(player.quadPower.eq(0) && !hasAchievement(33)) {
          player.achievements.push('33')
          $.notify("Achievement Unlocked: One Mechanic Bites The Dust", {
            style: 'apcurrent',
            className:'achieves',
          });
        }
        if(player.dailyAchievements[0].includes('45') && !player.dailyAchievements[1].includes('45') && player.buyables[1].eq(1) && player.buyables[2].eq(0) && player.buyables[3].eq(0) && player.buyables[4].eq(0) && player.buyables[5].eq(0) && player.buyables[6].eq(0)){
          player.dailyAchievements[1].push('45')
          $.notify("Daily Achievement Unlocked: " + DailyAchievements.standardize('45').name, {
            style: 'apcurrent',
            className:'dailyAchieves',
          });
        }

        player.buyables[7] = new Decimal(0)
        player.buyables[8] = new Decimal(0)
        player.buyables[9] = new Decimal(0)
        if(hasMilestone(13)) player.bankedQuadratics = player.bankedQuadratics.add(player.quadratics.div(10).floor())
        player.quadratics = new Decimal(0)
        if(!hasMilestone(3)) player.autobuyers = [null,false,false,false,false,false,false,false,false,false,false]
        if(!hasMilestone(2)) player.compAutobuyers[2]=1
        if(!hasMilestone(3)) player.quadUpgs = []
        if(!hasMilestone(9)) player.currentSubtab[0] = "upgrades"
        if(!hasMilestone(4)) player.sacX = new Decimal(0)
        if(!hasMilestone(4)) player.sacY = new Decimal(0)
        if(!hasMilestone(4)) player.sacX2 = new Decimal(0)
        player.sacrifice = 'x'
        if(!hasMilestone(6)) player.rootEssence = new Decimal(0)
        if(player.integration.challenge != 2) player.inSqrt = false
        if(!hasMilestone(5)) player.sqrtUpgs = []
        player.doublers = new Decimal(0)
        player.sqrtDoublers = new Decimal(0)
        player.slope = new Decimal(0)
        player.b = new Decimal(0)
        if(player.integration.challenge != 1) player.challenge = 0
        player.chalCompletions = hasMilestone(7)?[1,2,3,4,5,6,7,8,9,10]:[]
        player.abc = [null,new Decimal(0),new Decimal(0),new Decimal(0)]
        player.quadPower = new Decimal(0)
        player.quadBuyables[1] = new Decimal(0)
        player.quadBuyables[2] = new Decimal(0)
        player.quadBuyables[3] = new Decimal(0)
        player.quadBuyables[4] = new Decimal(0)
        if(!hasMilestone(6)) player.challengeEssence = new Decimal(0)
        if(player.integration.challenge != 2) player.epicenterLevel = "1"
        if(!hasMilestone(9)) player.hasCompletedLevel4 = false
        if(!hasMilestone(9)) player.hasCompletedLevel5 = false
        player.sqrtEnters = 0
        if(!hasMilestone(2)) player.compAutobuyers[2] = 1
        goQuadratic(true)
        player.x2 = new Decimal(0)
        player.totalx2 = new Decimal(0)

        if(player.prestigeTimes[2] < player.prestigeTimes[3]) player.prestigeTimes[3] = player.prestigeTimes[2]
        if(player.gamePrestigeTimes[2].lt(player.gamePrestigeTimes[3])) player.gamePrestigeTimes[3] = player.gamePrestigeTimes[2]
        player.prestigeTimes[2] = 0
        player.gamePrestigeTimes[2] = new Decimal(0)
        if(player.options[6]){
          player.upgradePoints[0] = player.upgradePoints[1].sub(player.unlocked > 0 ? COMP_CHALLENGES[player.unlocked].unlockCost : 0)
          if(player.compUpgs[0].length == 0 && !hasSecretAchievement(4)) {
            player.secretAchievements.push('4')
            $.notify("Secret Achievement Unlocked: Not Quite Right", {
              style: 'apcurrent',
              className:'secretAchieves',
            });
          }
          player.compUpgs[0] = []
          player.fourthRowCompUpgs = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
        }
        player.options[6] = false
        if(player.options[4] && player.unlocked > 0 && player.integration.challenge != 1 && player.integration.challenge != 2){player.upgradePoints[0] = player.upgradePoints[0].add(COMP_CHALLENGES[player.unlocked].unlockCost); player.unlocked = 0}
        player.options[4] =  (player.compChallenge != 0)&&player.options[4]
        if(player.integration.challenge != 1 && player.integration.challenge != 2) {player.compChallenge = 0}
        player.antiSlope = new Decimal(1)
        player.z = new Decimal(0)
        player.zlab.zpower = new Decimal(0)
        if(player.integration.challenge == 2 && player.integration.chalCompletions[2] == 1) {
          IntegrationPrestige.integrate(true)
          player.integration.chalCompletions[2]++
          player.integration.challenge = 0
        }
        player.integration.ic4Prestiges[1] = true
      }
    }
  }
}

function complexesGain() {
  let comp = RebuyableIntegrationUpgrades[5].eff()
  comp = comp.mul(NumberSets.effect(3,4))
  if(IntegrationUpgrades.complex6.isBought()) comp = comp.mul(IntegrationUpgrades.complex6.eff())
  if(hasYQU(17,'bought')) comp = comp.mul(YQUAD_UPGRADES[17].eff())
  if(hasPermUpgrade(9)) comp = comp.mul(PERM_UPGRADES[9].eff2())
  if(player.integration.challenge == 4) comp = new Decimal(1)
  return comp
}