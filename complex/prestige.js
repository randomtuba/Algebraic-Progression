function compFormula() {
  if(player.totali.gte(1)){
    neg = player.x2.div("1e2950").pow(0.002).div(2).add(player.rootEssence.div("1e660").pow(0.004).div(2)).pow(0.4)
    neg = neg.mul(Decimal.pow(3,player.triplers))
    if(hasCU(0,9)) neg = neg.mul(COMP_UPGRADES[9].eff())
    if(hasCU(0,10)) neg = neg.mul(COMP_UPGRADES[10].eff())
    if(hasCU(0,12)) neg = neg.mul(COMP_UPGRADES[12].eff())
    if(hasMilestone(11)) neg = neg.mul(2)
    neg = neg.floor()
    return neg
  }else{
    return new Decimal(1);
  }
}

function goComplex(force) {
  if(force){
    player.buyables[7] = new Decimal(0)
    player.buyables[8] = new Decimal(0)
    player.buyables[9] = new Decimal(0)
    player.quadratics = new Decimal(0)
    if(!hasMilestone(3)) player.autobuyers = [null,false,false,false,false,false,false,false,false,false,false]
    if(!hasMilestone(3)) player.quadUpgs = []
    if(!hasMilestone(9)) player.currentSubtab[0] = "upgrades"
    if(!hasMilestone(4)) player.sacX = new Decimal(0)
    if(!hasMilestone(4)) player.sacY = new Decimal(0)
    if(!hasMilestone(4)) player.sacX2 = new Decimal(0)
    player.sacrifice = 'x'
    if(!hasMilestone(6)) player.rootEssence = new Decimal(0)
    player.inSqrt = false
    if(!hasMilestone(5)) player.sqrtUpgs = []
    player.doublers = new Decimal(0)
    player.sqrtDoublers = new Decimal(0)
    player.slope = new Decimal(0)
    player.b = new Decimal(0)
    player.challenge = 0
    if(!hasMilestone(7)) player.chalCompletions = []
    player.abc = [null,new Decimal(0),new Decimal(0),new Decimal(0)]
    player.quadPower = new Decimal(0)
    player.quadBuyables = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    if(!hasMilestone(6)) player.challengeEssence = new Decimal(0)
    player.epicenterLevel = "1"
    if(!hasMilestone(9)) player.hasCompletedLevel4 = false
    if(!hasMilestone(9)) player.hasCompletedLevel5 = false
    player.sqrtEnters = 0
    goQuadratic(true)
    player.x2 = new Decimal(0)
    player.totalx2 = new Decimal(0)
    player.prestigeTimes[2] = 0
    if(player.options[6]){player.upgradePoints[0] = player.upgradePoints[1]; player.compUpgs[0] = []}
    player.options[6] = false
  }else if(!force && player.x2.gte("1e2950") && player.rootEssence.gte("1e660") && player.hasCompletedLevel5){
    if(!player.options[8] || player.compAutobuyers[7] || confirm("Going Complex will reset everything Quadratic resets, and will also reset all Quadratic-level content, but you will receive i in return. Are you sure you want to do this?")) {
      player.i = player.i.add(compFormula())
      player.totali = player.totali.add(compFormula())
      player.complexes = player.complexes.add(1)
      if(player.quadPower.eq(0) && !hasAchievement(33)) {
        player.achievements.push('33')
        $.notify("Achievement Unlocked: One Mechanic Bites The Dust", {
          style: 'apcurrent',
          className:'achieves',
        });
      }
    
      player.buyables[7] = new Decimal(0)
      player.buyables[8] = new Decimal(0)
      player.buyables[9] = new Decimal(0)
      player.quadratics = new Decimal(0)
      if(!hasMilestone(3)) player.autobuyers = [null,false,false,false,false,false,false,false,false,false,false]
      if(!hasMilestone(3)) player.quadUpgs = []
      if(!hasMilestone(9)) player.currentSubtab[0] = "upgrades"
      if(!hasMilestone(4)) player.sacX = new Decimal(0)
      if(!hasMilestone(4)) player.sacY = new Decimal(0)
      if(!hasMilestone(4)) player.sacX2 = new Decimal(0)
      player.sacrifice = 'x'
      if(!hasMilestone(6)) player.rootEssence = new Decimal(0)
      player.inSqrt = false
      if(!hasMilestone(5)) player.sqrtUpgs = []
      player.doublers = new Decimal(0)
      player.sqrtDoublers = new Decimal(0)
      player.slope = new Decimal(0)
      player.b = new Decimal(0)
      player.challenge = 0
      if(!hasMilestone(7)) player.chalCompletions = []
      player.abc = [null,new Decimal(0),new Decimal(0),new Decimal(0)]
      player.quadPower = new Decimal(0)
      player.quadBuyables = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
      if(!hasMilestone(6)) player.challengeEssence = new Decimal(0)
      player.epicenterLevel = "1"
      if(!hasMilestone(9)) player.hasCompletedLevel4 = false
      if(!hasMilestone(9)) player.hasCompletedLevel5 = false
      player.sqrtEnters = 0
      goQuadratic(true)
      player.x2 = new Decimal(0)
      player.totalx2 = new Decimal(0)
    
      if(player.prestigeTimes[2] < player.prestigeTimes[3]) player.prestigeTimes[3] = player.prestigeTimes[2]
      player.prestigeTimes[2] = 0
      if(player.options[6]){player.upgradePoints[0] = player.upgradePoints[1]; player.compUpgs[0] = []}
      player.options[6] = false
    }
  }
}