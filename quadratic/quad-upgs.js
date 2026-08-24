const QUAD_UPGRADES = {
  1: {
    title: "Quadratic Bonus",
    desc: "Multiply production based on unspent x².",
    chargedDesc: "Strongly multiply production based on unspent x².",
    cost: new Decimal(1),
    eff() {return player.compChallenge == 9 ? new Decimal(1) : new Decimal(4).mul(new Decimal(1).add(player.x2.pow(new Decimal(0.5).add(COMP_CHALLENGES[1].eff())))).min(player.compChalCompletions[1] >= 6 ? new Decimal(Infinity) : new Decimal("1e1e7").mul(Y_CHALLENGES[4].eff())).pow(IntegrationUpgrades.points6.isBought() ? 1.06 : 1)},
    chargedEff() {return player.compChallenge == 9 ? new Decimal(1) : new Decimal(4).mul(new Decimal(1).add(player.x2.pow(new Decimal(0.7).add(COMP_CHALLENGES[1].eff())))).min(player.compChalCompletions[1] >= 6 ? new Decimal(Infinity) : new Decimal("1e1e7").mul(Y_CHALLENGES[4].eff())).pow(IntegrationUpgrades.points6.isBought() ? 1.06 : 1)},
    effectDisplay() {return format(tmp.quadHovers[1] || hasChargedQU(1) ? QUAD_UPGRADES[1].chargedEff() : QUAD_UPGRADES[1].eff()) + "x production"},
  },
  2: {
    title: "Synergized Autoclickers",
    desc: "Autoclickers are stronger based on total Buildings bought.",
    chargedDesc: "Autoclickers are significantly stronger based on total Buildings bought.",
    cost: new Decimal(1),
    eff() {return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).div(4).add(1).pow(1.2)},
    chargedEff() {return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).div(4).add(1).pow(1e11)},
    effectDisplay() {return format(tmp.quadHovers[2] || hasChargedQU(2) ? QUAD_UPGRADES[2].chargedEff() : QUAD_UPGRADES[2].eff()) + "x Autoclicker effectiveness"},
  },
  3: {
    title: "Nonlinear f(n)",
    desc: "Square f(n).",
    chargedDesc: "Power f(n) ^10.",
    cost: new Decimal(2),
    effectDisplay() {return null},
  },
  4: {
    title: "Synergized Factories",
    desc: "Point Factories are stronger based on total Buildings bought.",
    chargedDesc: "Point Factories are significantly stronger based on total Buildings bought.",
    cost: new Decimal(10),
    eff() {return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).div(4).add(1).pow(1.3)},
    chargedEff() {return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).div(4).add(1).pow(1.5e11)},
    effectDisplay() {return format(tmp.quadHovers[4] || hasChargedQU(4) ? QUAD_UPGRADES[4].chargedEff() : QUAD_UPGRADES[4].eff()) + "x Point Factory effectiveness"},
  },
  5: {
    title: "Automation I",
    desc: "Unlock autobuyers for Buildings.",
    chargedDesc: "Unlock autobuyers for Buildings and add 0.00015 to the Algebraic Set sacrifice effect cap.",
    cost: new Decimal(15),
    effectDisplay() {return null},
  },
  6: {
    title: "Automation II",
    desc: "Unlock the X Autobuyer and keep X Upgrades on Quadratic.",
    chargedDesc: "Unlock the X Autobuyer, keep X Upgrades on Quadratic, and increase the \"Variable Coupler\" amount cap by 2.",
    cost: new Decimal(20),
    effectDisplay() {return null},
  },
  7: {
    title: "Synergized Portals",
    desc: "Point Portals are stronger based on total Buildings bought.",
    chargedDesc: "Point Portals are significantly stronger based on total Buildings bought.",
    cost: new Decimal(25),
    eff() {return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).div(4).add(1).pow(1.4)},
    chargedEff() {return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).div(4).add(1).pow(2e11)},
    effectDisplay() {return format(tmp.quadHovers[7] || hasChargedQU(7) ? QUAD_UPGRADES[7].chargedEff() : QUAD_UPGRADES[7].eff()) + "x Point Portal effectiveness"},
  },
  8: {
    title: "Point Hoarder",
    desc: "Buying things no longer subtracts from your point amount, and you start with 25 points.",
    chargedDesc: "Buying things no longer subtracts from your point amount, start with 25 points, and weaken the Hypercomplex Upgrade 2 softcap.",
    cost: new Decimal(50),
    effectDisplay() {return null},
  },
  9: {
    title: "Base Addend",
    desc: "Add 0.2 to the bases of g(n) and h(n), and unlock autobuyers for Functions.",
    chargedDesc: "Add 5 to the bases of g(n), h(n), g'(n), and h'(n), and unlock autobuyers for Functions.",
    cost: new Decimal(100),
    effectDisplay() {return null},
  },
  10: {
    title: "Automation III",
    desc: "Unlock the Y autobuyer.",
    chargedDesc: "Unlock the Y autobuyer and the 4th Natural Set effect formula is stronger.",
    cost: new Decimal(200),
    effectDisplay() {return null},
  },
  11: {
    title: "Softcap Delay",
    desc: "The g(n) and h(n) softcaps start 10 purchases later.",
    chargedDesc: "The g(n) and h(n) softcaps start 5.00e9 purchases later.",
    cost: new Decimal(500),
    effectDisplay() {return null},
  },
  12: {
    title: "New Mechanic?",
    desc() {return `Unlock the Coordinate ${player.zUnlocked ? "Realm" : "Plane"}.`},
    chargedDesc: "Unlock the Coordinate Realm and add 0.15 to the secondary Dilations effect hardcap.",
    cost: new Decimal(1500),
    effectDisplay() {return null},
  },
  13: {
    title: "Self-Synergy",
    desc: "Gain more points based on points.",
    chargedDesc: "Gain more points based on points by modifying this upgrade's softcaps.",
    cost: new Decimal(10000),
    eff() {
      let x = player.points.max(0).pow(hasZlabMilestone(2,1) ? (player.inSqrt ? 0.24 : 0.23) : 0.2).add(1)
      if(!hasSDU(9)) x = x.min("1e9e6")
      if(hasSDU(9) && x.gt("1e9e6")) x = x.div("1e9e6").pow(0.75).mul("1e9e6")
      if(x.gt("1e1e13")) x = x.div("1e1e13").pow(0.25).mul("1e1e13")
      return x
    },
    chargedEff() {
      let x = player.points.max(0).pow(hasZlabMilestone(2,1) ? (player.inSqrt ? 0.24 : 0.23) : 0.2).add(1)
      if(!hasSDU(9)) x = x.min("1e9e6")
      if(x.gt("1e1e13")) x = x.div("1e1e13").pow(0.4).mul("1e1e13")
      return x
    },
    effectDisplay() {return format(tmp.quadHovers[13] || hasChargedQU(13) ? QUAD_UPGRADES[13].chargedEff() : QUAD_UPGRADES[13].eff()) + "x production"},
  },
  14: {
    title: "Automation IV",
    desc: "Unlock Auto-Quadratic, and make sacrificed Y 1.5x more effective.",
    chargedDesc: "Unlock Auto-Quadratic, and make sacrificed Y 15x more effective.",
    cost: new Decimal(250000),
    effectDisplay() {return null},
  },
  15: {
    title: "Powerful Sacrifice",
    desc: "Make sacrificed X twice as effective.",
    chargedDesc: "Make sacrificed X three times as effective.",
    cost: new Decimal(1e7),
    effectDisplay() {return null},
  },
  16: {
    title: "Uprooted",
    desc: "Unlock Square Root.",
    chargedDesc: "Unlock Square Root and power RE and CE gains by ^1.2.",
    cost: new Decimal(1e9),
    effectDisplay() {return null},
  },
  17: {
    title: "Didn't Need It Anyway",
    desc: "The sacrificed Y effect softcap is removed.",
    chargedDesc: "The sacrificed Y effect softcap is removed and weaken the sacrificed Z effect softcap.",
    cost: new Decimal(1e75),
    effectDisplay() {return null},
  },
  18: {
    title: "Y Divider",
    desc: "Divide the Y cost by 1.1.",
    chargedDesc: "Divide the Y cost by 10.",
    cost: new Decimal(1e84),
    effectDisplay() {return null},
  },
  19: {
    title: "Automation V",
    desc: "Sacrificing no longer resets anything, and Auto-Sacrifice now sacrifices x².",
    chargedDesc: "Sacrificing no longer resets anything, Auto-Sacrifice now sacrifices x², and j and k generation is powered ^1.1.",
    cost: new Decimal(1e96),
    effectDisplay() {return null},
  },
  20: {
    title: "Complicated Mathematics",
    desc: "Unlock Quadratic Formula.",
    chargedDesc: "Unlock Quadratic Formula and QP and IP gains are raised ^1.1.",
    cost: new Decimal(1e160),
    effectDisplay() {return null},
  },
};

function buyQU(x) {
  if(player.x2.gte(QUAD_UPGRADES[x].cost) && !hasQU(x)){
    player.x2 = player.x2.sub(QUAD_UPGRADES[x].cost)
    if(player.integration.challenge != 3) player.quadUpgs.push(x)
  } else if (player.y2z2.amount.gte(1) && hasQU(x) && !hasChargedQU(x)) {
    player.chargedQuadUpgs.push(x)
    player.y2z2.amount = player.y2z2.amount.sub(1)
  } else if (tmp.shiftToggleBehavior && hasChargedQU(x)) {
    player.y2z2.amount = player.y2z2.amount.add(1)
    player.chargedQuadUpgs = singleUpgradeRespec(player.chargedQuadUpgs,x)
    IntegrationPrestige.integrate(true)
  }
  if(player.integration.challenge == 3 && player.integration.activations > 0 && !(x == 5 || x == 6 || x == 8 || x == 9 || x == 10 || x == 12 || x == 14 || x == 16 || x == 19 || x == 20) && !player.integration.upgsActiveInIC3.includes(x)) {
    player.integration.activations -= 1
    player.integration.upgsActiveInIC3.push(x)
  }
}

function hasQU(x) {
  return player.quadUpgs.includes(x) && (player.integration.challenge != 3 || x == 5 || x == 6 || x == 8 || x == 9 || x == 10 || x == 12 || x == 14 || x == 16 || x == 19 || x == 20 || player.integration.upgsActiveInIC3.includes(x));
}

function rowAmt(x){
  switch(x) {
    case 1: // QUAD UPGRADES
      let row=1
      if(player.quadUpgs.length >= 4)row++
      if(player.quadUpgs.length >= 8)row++
      if(player.quadUpgs.length >= 12)row++
      if(hasChallenge(2) || hasMilestone(3))row++
      return row
    break;
    case 2: // SQRT UPGRADES
      let row2=1
      if(player.sqrtUpgs.length >= 4)row2++
      if(player.sqrtUpgs.length >= 8)row2++
      if(hasChallenge(5) || hasMilestone(5))row2++
      return row2
    break;
    case 3: // X UPGRADES
      let row3=1
      if(hasSU(3) || player.xUpgs.length > 4)row3++
      return row3
    break;
    case 4: // MILESTONES
      let row4=12
      if(hasCU(1,6) || player.integrations.gte(1))row4 += 4
      if(player.zUnlocked)row4 += 4
      return row4
    break;
    case 5: // BASIC COMP UPGRADES
      let row5=1
      if(player.compUpgs[1].length >= 3)row5++
      if(player.compUpgs[1].length >= 6)row5++
      return row5
    break;
    case 6: // TRANSFORMATIONS
      let row6=3
      if(hasZlabMilestone(1,2)) row6++
      return row6
    break;
    case 7: // COMPLEX PLANE POWERS
      let row7=3
      if(player.varSynth.unlocked[3]) row7++
      return row7
    break;
    case 8: // COMP UPGRADES
      let row8=3
      if(hasZlabMilestone(1,5)) row8++
      return row8
    break;
    case 9: // POLYNOMIAL BUYABLES
      let row9=0
      if(player.polynomials[4].bought.gte(1)) row9++
      if(player.polynomials[5].bought.gte(1)) row9++
      if(player.polynomials[6].bought.gte(1)) row9++
      if(player.polynomials[7].bought.gte(1)) row9++
      if(player.polynomials[8].bought.gte(1)) row9++
      if(player.polynomials[9].bought.gte(1)) row9++
      return row9
    break;
    case 10: // SINUSOIDAL UPGRADES
      let row10=1
      if(SinusoidalUpgrades.has(1)) row10 += 2
      if(SinusoidalUpgrades.has(2)) row10 += 2
      if(SinusoidalUpgrades.has(3)) row10 += 2
      if(SinusoidalUpgrades.has(4)) row10 += 2
      return row10
    break;
    case 11: // BASIC HYPERCOMP UPGRADES
      let row11=1
      if(player.hypercompUpgs.basic.length >= 4)row11++
      if(player.hypercompUpgs.basic.length >= 8)row11++
      return row11
    break;
  }
}

function doublerCost() {
  return new Decimal(1e9).mul(Decimal.pow(10,player.doublers)).mul(Decimal.pow(1.1,player.doublers.sub(hasZlabMilestone(4,1) ? 490 : 290).max(0).pow(2)))
}

function buyDoubler() {
  if(player.x2.gte(doublerCost())){
    player.x2 = player.x2.sub(doublerCost())
    player.doublers = player.doublers.add(1)
  }
}