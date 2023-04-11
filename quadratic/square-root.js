function reFormula() {
  if(!inSqrtLevel(2)){
    let re = new Decimal(1.1).pow(player.x.div(100).sub(1)).mul(new Decimal(1.25).pow(player.y))
    re = re.mul(Decimal.pow(Decimal.add(2,compPlaneEffects(3)),player.sqrtDoublers))
    if(hasSU(11)) re = re.mul(10)
    if(hasSU(15)) re = re.mul(SQRT_UPGRADES[15].eff())
    re = re.mul(ceEffect(1))
    if(hasCU(1,1) && player.compChallenge != 10) re = re.mul(10)
    if(hasCU(0,6) && player.compChallenge != 10) re = re.mul(COMP_UPGRADES[6].eff())
    if(hasCU(0,8) && player.compChallenge != 10) re = re.mul(COMP_UPGRADES[8].eff())
    if(hasYQU(7,'bought')) re = re.mul(YQUAD_UPGRADES[7].eff())
    if(hasPermUpgrade(3)) re = re.mul(PERM_UPGRADES[3].eff())
    if(hasYQU(5,'bought')) re = re.pow(YQUAD_UPGRADES[5].eff())
    re = re.sub(player.rootEssence).max(0).floor()
    return re
  }else{
    let addend = 0
    if(inSqrtLevel(3)) addend += 0.008
    if(inSqrtLevel(4)) addend += 0.05
    let re = player.points.div(1e12).pow(0.002+addend)
    if(hasCU(1,1) && player.compChallenge != 10) re = re.mul(10)
    if(hasPermUpgrade(3)) re = re.mul(PERM_UPGRADES[3].eff2())
    if(re.gt(hasChallenge(10)?(hasZlabMilestone(3,4)?1e100:1e10):1e8)) re = re.div(hasChallenge(10)?1e10:1e8).pow(hasZlabMilestone(3,4)?0.62:0.6).mul(hasChallenge(10)?1e10:1e8)
    if(hasYQU(5,'bought')) re = re.pow(YQUAD_UPGRADES[5].eff())
    if(re.gt(ceSoftcapStart())) {
      let y = new Decimal(re).log(ceSoftcapStart())
      re = new Decimal(ceSoftcapStart()).pow(y.pow(0.9))
    }
    re = re.sub(player.challengeEssence).max(0).floor()
    return re
  }
}

function ceSoftcapStart() {
  let softcap = new Decimal("1e2000")
  if(hasCU(1,8) && player.compChallenge != 10) softcap = softcap.mul(BCOMP_UPGRADES[8].eff())
  softcap = softcap.mul(circleEffects(3))
  return softcap;
}

function enterSqrt() {
  if(quadFormula().gte(1) && player.compChallenge != 5 && player.yChallenge != 4){
    if(player.inSqrt){
      if(inSqrtLevel(2)){
        player.challengeEssence = player.challengeEssence.add(reFormula())
      }else{
        player.rootEssence = player.rootEssence.add(reFormula())
      }
    }
    goQuadratic(true);
    if(!player.inSqrt){
      player.sqrtEnters += 1
      if(!hasSecretAchievement(17) && player.epicenterLevel == '5' && player.x2.gte("1e2950") && player.rootEssence.gte("1e660") && player.hasCompletedLevel5) {
      player.secretAchievements.push('17')
      $.notify("Secret Achievement Unlocked: Show-Off", {
        style: 'apcurrent',
        className:'secretAchieves',
      });
    }
    }
    player.inSqrt = !player.inSqrt;
  }
}

const SQRT_UPGRADES = {
  1: {
    title: "X Abundance",
    desc: "Divide X cost scaling based on Root Essence.",
    cost: new Decimal(20),
    eff() {return player.rootEssence.max(10).log10().log10().add(1)},
    effectDisplay() {return "/" + format(SQRT_UPGRADES[1].eff()) + " X cost scaling"},  
  },
  2: {
    title: "Uprooted Points",
    desc: "Gain more points based on Root Essence.",
    cost: new Decimal(90),
    eff() {return inSqrtLevel(5) ? (player.yChallenge == 4 ? new Decimal(1) : player.rootEssence.max(0).pow(hasZlabMilestone(2,2) ? 1.45 : 1.25).add(1).pow(0.12)) : player.rootEssence.max(0).pow(hasZlabMilestone(2,2) ? 1.45 : 1.25).add(1)},
    effectDisplay() {return format(SQRT_UPGRADES[2].eff()) + "x production"},
  },
  3: {
    title: "X-pansion",
    desc: "Unlock a new row of X Upgrades, and a new Auto-Quadratic mode.",
    cost: new Decimal(2500),
    effectDisplay() {return null},
  },
  4: {
    title: "Powerful Sacrifice II",
    desc: "Make sacrificed X and Y slightly more effective (1.1x effect for each).",
    cost: new Decimal(75000),
    effectDisplay() {return null},
  },
  5: {
    title: "All-Encompassing",
    desc: "Multiply x² gain based on points.",
    cost: new Decimal(333333),
    eff() {return player.points.max(0).pow(hasZlabMilestone(2,3) ? 0.05 : 0.04).add(1)},
    effectDisplay() {return format(SQRT_UPGRADES[5].eff()) + "x x² gain"},
  },
  6: {
    title: "Extra Opportunities",
    desc() {return `Unlock Auto-Sacrifice, and the ability to sacrifice x² to the Coordinate ${player.zUnlocked ? "Realm" : "Plane"}. X and Y don't reset on sacrifice.`},
    cost: new Decimal(600000),
    effectDisplay() {return null},
  },
  7: {
    title: "Loopover",
    desc: "Bought Autoclickers produce Point Portals. (\"Algebraic Dimensions\" is required for the effect to occur)",
    cost: new Decimal(9000000),
    effectDisplay() {return null},
  },
  8: {
    title: "Wait, That's Illegal",
    desc: "The Square Root penalty is now ^0.55 instead of ^0.5.",
    cost: new Decimal(2.4e8),
    effectDisplay() {return null},
  },
  9: {
    title: "Variable Multiplier",
    desc: "Gain more points based on Y.",
    cost: new Decimal(5e9),
    eff() {return Decimal.pow(1.5,player.y)},
    effectDisplay() {return format(SQRT_UPGRADES[9].eff()) + "x production"},
  },
  10: {
    title: "Prestigious",
    desc: "Multiply both point gain and x² gain based on times gone Quadratic.",
    cost: new Decimal(2.5e10),
    eff() {return player.compChallenge == 4 ? new Decimal(1) : player.quadratics.add(player.bankedQuadratics).pow(1.5).add(1).pow(hasCU(1,2)?4:1).pow(COMP_CHALLENGES[4].eff2())},
    effectDisplay() {return format(SQRT_UPGRADES[10].eff()) + "x production and x² gain"},
  },
  11: {
    title: "Decatupler",
    desc: "Gain 10x more Root Essence.",
    cost: new Decimal(7.5e11),
    effectDisplay() {return null},
  },
  12: {
    title: "Discontinuities",
    desc: "Unlock Challenges.",
    cost: new Decimal(1e14),
    effectDisplay() {return null},
  },
  13: {
    title: "Powerful Points",
    desc: "Gain more Quadratic Power based on points.",
    cost: new Decimal(1.11e111),
    eff() {return player.points.max(10).log(100)},
    effectDisplay() {return format(SQRT_UPGRADES[13].eff()) + "x Quadratic Power gain"},
  },
  14: {
    title: "The Other \"b\"",
    desc: "Gain more Quadratic Power based on Y-Intercept.",
    cost: new Decimal(1e200),
    eff() {return Decimal.pow(1.2,player.b)},
    effectDisplay() {return format(SQRT_UPGRADES[14].eff()) + "x Quadratic Power gain"},
  },
  15: {
    title: "Mechanical Interlock",
    desc: "RE and QP boost each other.",
    cost: new Decimal("1e295"),
    eff() {return player.quadPower.pow(0.3).add(1)}, // boost to RE
    eff2() {return player.rootEssence.max(10).log10()}, // boost to QP
    effectDisplay() {return format(SQRT_UPGRADES[15].eff()) + "x RE gain, " + format(SQRT_UPGRADES[15].eff2()) + "x QP gain"},
  },
  16: {
    title: "The Center of Quadratic",
    desc: "Unlock Root Epicenter.",
    cost: new Decimal("1e343"),
    effectDisplay() {return null},
  },
};

function buySU(x) {
  if(player.rootEssence.gte(SQRT_UPGRADES[x].cost) && !hasSU(x)){
    player.rootEssence = player.rootEssence.sub(SQRT_UPGRADES[x].cost)
    player.sqrtUpgs.push(x)
  }
}

function hasSU(x) {
  return player.sqrtUpgs.includes(x);
}

function sqrtDoublerCost() {
  return new Decimal(200).mul(Decimal.pow(5,player.sqrtDoublers)).mul(Decimal.pow(1.05,player.sqrtDoublers.sub(hasZlabMilestone(4,2)?250:100).max(0).pow(2)))
}

function buySqrtDoubler() {
  if(player.rootEssence.gte(sqrtDoublerCost())){
    player.rootEssence = player.rootEssence.sub(sqrtDoublerCost())
    player.sqrtDoublers = player.sqrtDoublers.add(1)
  }
}

const epicenterDescs = [null,
"Level √1: A regular Square Root Run.",
"Level √2: Level √1 and Points are divided by 1e5000.<br>(keep in mind that all multiplication and division goes before exponents)",
"Level √3: Level √2 and Points are divided by 1e1650.",
"Level √4: Level √3 and Points are divided by 1e3650.<br><i>Completing this will multiply the challenge essence effect softcap starts by 1,000,<br>and multiply the Challenge 1 effect hardcap start by 1e50</i>",
"Level √-1: Level √4 and sacrificed X and Y do nothing,<br>and Square Root Upgrade 2 is raised ^0.12.<br><i>Completing this will unlock the next prestige layer.</i>",
]

function inSqrtLevel(x) {
  return player.inSqrt && player.epicenterLevel >= x
}

function ceEffect(x) {
  switch (x) {
    case 1:
      let eff1 = player.challengeEssence.max(1).pow(2)
      if(eff1.gt(Decimal.mul(1e35,player.hasCompletedLevel4?1000:1))) eff1 = eff1.div(Decimal.mul(1e35,player.hasCompletedLevel4?1000:1)).pow(0.4).mul(Decimal.mul(1e35,player.hasCompletedLevel4?1000:1))
      if(eff1.gt("1e1500") && (!hasCU(1,8) || player.compChallenge == 10)) eff1 = eff1.div("1e1500").pow(0.3).mul("1e1500")
      eff1 = eff1.min("1e200000")
      return eff1
    break;
    case 2:
      let eff2 = player.challengeEssence.max(1).pow(1.2)
      if(eff2.gt(Decimal.mul(1e20,player.hasCompletedLevel4?1000:1))) eff2 = eff2.div(Decimal.mul(1e20,player.hasCompletedLevel4?1000:1)).pow(0.4).mul(Decimal.mul(1e20,player.hasCompletedLevel4?1000:1))
      if(eff2.gt("1e900") && (!hasCU(1,8) || player.compChallenge == 10)) eff2 = eff2.div("1e900").pow(0.3).mul("1e900")
      eff2 = eff2.min("1e120000")
      return eff2
    break;
  }
}

function updateRootEpicenter() {
  if(player.inSqrt && document.getElementById("epicSlider")){
    document.getElementById("epicSlider").disabled = true;
  }else if(document.getElementById("epicSlider")){
    document.getElementById("epicSlider").disabled = false;
  }
  
  if(inSqrtLevel(4) && player.points.gte(1e12)) {
    player.hasCompletedLevel4 = true;
  }
  
  if(inSqrtLevel(5) && player.points.gte(1e12)) {
    player.hasCompletedLevel5 = true;
  }
}