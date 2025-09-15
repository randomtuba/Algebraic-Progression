function yQuadFormula() {
  let y2 = new Decimal(1.25).pow(player.y.sub(2222).div(100)).mul(new Decimal(1.5).pow(player.z))
  y2 = y2.mul(Decimal.pow(1.25,totalColliderLevels()).pow(IntegrationUpgrades.yquadratic3.isBought() ? 10 : 1))
  if(hasYQU(11,'bought')) y2 = y2.mul(YQUAD_UPGRADES[11].eff2())
  if(player.compChallenge != 10) y2 = y2.mul(COMP_UPGRADES[16].eff())
  y2 = y2.mul(NumberSets.effect(4,1))
  y2 = y2.mul(SinusoidalUpgrades[23].eff())
  if(hasPermUpgrade(6)) y2 = y2.mul(PERM_UPGRADES[6].eff())
  if(IntegrationUpgrades.yquadratic1.isBought()) y2 = y2.mul(IntegrationUpgrades.yquadratic1.eff())
  if(IntegrationUpgrades.yquadratic5.isBought()) y2 = y2.mul(IntegrationUpgrades.yquadratic5.eff())
  y2 = y2.pow(NumberSets.effect(6,6))
  y2 = y2.pow(SinusoidalUpgrades[24].eff())
  if(HypercompUpgrades.has(4)) y2 = y2.pow(HypercompUpgrades[4].eff())
  if(player.integration.inTheLimit) y2 = y2.pow(Limit.challengeFactorEffects(7))
  if(player.integration.challenge == 6 && player.integration.ic6Version == 0) y2 = y2.pow(0.5)
  y2 = y2.min("1e6.5e9")
  y2 = y2.floor()
  if(player.y.lt(2222) || player.z.lt(1)) y2 = new Decimal(0)
  return y2
}

function goYQuadratic(force) {
  if(player.integration.challenge != 4 || !player.integration.ic4Prestiges[2]) {
    if(force){
      player.buyables[7] = new Decimal(0)
      player.buyables[8] = new Decimal(0)
      player.buyables[9] = new Decimal(0)
      if(hasMilestone(13)) player.bankedQuadratics = player.bankedQuadratics.add(player.quadratics.div(10).floor())
      player.quadratics = new Decimal(0)
      if(!hasMilestone(3)) player.autobuyers = [null,false,false,false,false,false,false,false,false,false,false]
      if(!hasMilestone(3)) player.quadUpgs = []
      if(!hasMilestone(9)) player.currentSubtab[0] = "upgrades"
      player.sacX = new Decimal(0)
      player.sacY = new Decimal(0)
      player.sacX2 = new Decimal(0)
      player.sacrifice = 'x'
      if(!hasMilestone(6)) player.rootEssence = new Decimal(0)
      player.inSqrt = false
      if(!hasMilestone(5)) player.sqrtUpgs = []
      player.doublers = new Decimal(0)
      player.sqrtDoublers = new Decimal(0)
      player.slope = new Decimal(0)
      player.b = new Decimal(0)
      if(player.integration.challenge != 1) player.challenge = 0
      if(!hasMilestone(7)) player.chalCompletions = []
      player.abc = [null,new Decimal(0),new Decimal(0),new Decimal(0)]
      player.quadPower = new Decimal(0)
      player.quadBuyables[1] = new Decimal(0)
      player.quadBuyables[2] = new Decimal(0)
      player.quadBuyables[3] = new Decimal(0)
      player.quadBuyables[4] = new Decimal(0)
      if(!hasMilestone(6)) player.challengeEssence = new Decimal(0)
      player.epicenterLevel = "1"
      if(!hasMilestone(9)) player.hasCompletedLevel4 = false
      if(!hasMilestone(9)) player.hasCompletedLevel5 = false
      player.sqrtEnters = 0
      goQuadratic(true)
      player.x2 = new Decimal(0)
      player.totalx2 = new Decimal(0)

      player.prestigeTimes[4] = 0
      player.gamePrestigeTimes[4] = new Decimal(0)
      player.z = new Decimal(0)
      if(player.options[13]) {
        player.varSynth.chargedXUpgs = []
        player.varSynth.xy = player.varSynth.totalxy
        player.options[13] = false
      }
      player.yChallenge = 0
      player.integration.ic4Prestiges[2] = true
    }else if(!force && player.y.gte(2222) && player.z.gte(1)){
      if(!player.options[11] || player.compAutobuyers[12] || confirm("Going Y-Quadratic will reset everything Complex resets, and will also reset sacrificed x, y, and x², but you will receive y² in return. Are you sure you want to do this?")) {
        let y = yQuadFormula()
        player.y2 = player.y2.add(y)
        player.totaly2 = player.totaly2.add(y)
        player.last10runs.yQuadratic.splice(0,0,{gain:y,time:player.prestigeTimes[4],gameTime:player.gamePrestigeTimes[4]})
        player.last10runs.yQuadratic = player.last10runs.yQuadratic.slice(0,-1)
        player.yQuadratics = player.yQuadratics.add(1)

        player.buyables[7] = new Decimal(0)
        player.buyables[8] = new Decimal(0)
        player.buyables[9] = new Decimal(0)
        if(hasMilestone(13)) player.bankedQuadratics = player.bankedQuadratics.add(player.quadratics.div(10).floor())
        player.quadratics = new Decimal(0)
        if(!hasMilestone(3)) player.autobuyers = [null,false,false,false,false,false,false,false,false,false,false]
        if(!hasMilestone(3)) player.quadUpgs = []
        if(!hasMilestone(9)) player.currentSubtab[0] = "upgrades"
        player.sacX = new Decimal(0)
        player.sacY = new Decimal(0)
        player.sacX2 = new Decimal(0)
        player.sacrifice = 'x'
        if(!hasMilestone(6)) player.rootEssence = new Decimal(0)
        player.inSqrt = false
        if(!hasMilestone(5)) player.sqrtUpgs = []
        player.doublers = new Decimal(0)
        player.sqrtDoublers = new Decimal(0)
        player.slope = new Decimal(0)
        player.b = new Decimal(0)
        if(player.integration.challenge != 1) player.challenge = 0
        if(!hasMilestone(7)) player.chalCompletions = []
        player.abc = [null,new Decimal(0),new Decimal(0),new Decimal(0)]
        player.quadPower = new Decimal(0)
        player.quadBuyables[1] = new Decimal(0)
        player.quadBuyables[2] = new Decimal(0)
        player.quadBuyables[3] = new Decimal(0)
        player.quadBuyables[4] = new Decimal(0)
        if(!hasMilestone(6)) player.challengeEssence = new Decimal(0)
        player.epicenterLevel = "1"
        if(!hasMilestone(9)) player.hasCompletedLevel4 = false
        if(!hasMilestone(9)) player.hasCompletedLevel5 = false
        player.sqrtEnters = 0
        goQuadratic(true)
        player.x2 = new Decimal(0)
        player.totalx2 = new Decimal(0)

        if(player.prestigeTimes[4] < player.prestigeTimes[5]) player.prestigeTimes[5] = player.prestigeTimes[4]
        if(player.gamePrestigeTimes[4].lt(player.gamePrestigeTimes[5])) player.gamePrestigeTimes[5] = player.gamePrestigeTimes[4]
        player.prestigeTimes[4] = 0
        player.gamePrestigeTimes[4] = new Decimal(0)
        player.z = new Decimal(0)
        if(player.options[13]) {
          player.varSynth.chargedXUpgs = []
          player.varSynth.xy = player.varSynth.totalxy
          player.options[13] = false
        }
        player.yChallenge = 0
        player.integration.ic4Prestiges[2] = true
      }
    }
  }
}