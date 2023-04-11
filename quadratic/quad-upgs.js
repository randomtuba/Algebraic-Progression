const QUAD_UPGRADES = {
  1: {
    title: "Quadratic Bonus",
    desc: "Multiply production based on unspent x².",
    cost: new Decimal(1),
    eff() {return player.compChallenge == 9 ? new Decimal(1) : new Decimal(4).mul(new Decimal(1).add(player.x2.pow(new Decimal(0.5).add(COMP_CHALLENGES[1].eff())))).min(new Decimal("1e1e7").mul(Y_CHALLENGES[4].eff()))},
    effectDisplay() {return format(QUAD_UPGRADES[1].eff()) + "x production"},
  },
  2: {
    title: "Synergized Autoclickers",
    desc: "Autoclickers are stronger based on total Buildings bought.",
    cost: new Decimal(1),
    eff() {return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).div(4).add(1).pow(1.2)},
    effectDisplay() {return format(QUAD_UPGRADES[2].eff()) + "x Autoclicker effectiveness"},
  },
  3: {
    title: "Nonlinear f(x)",
    desc: "Square f(x).",
    cost: new Decimal(2),
    effectDisplay() {return null},
  },
  4: {
    title: "Synergized Factories",
    desc: "Point Factories are stronger based on total Buildings bought.",
    cost: new Decimal(10),
    eff() {return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).div(4).add(1).pow(1.3)},
    effectDisplay() {return format(QUAD_UPGRADES[4].eff()) + "x Point Factory effectiveness"},
  },
  5: {
    title: "Automation I",
    desc: "Unlock autobuyers for Buildings.",
    cost: new Decimal(15),
    effectDisplay() {return null},
  },
  6: {
    title: "Automation II",
    desc: "Unlock the X Autobuyer and keep X Upgrades on Quadratic.",
    cost: new Decimal(20),
    effectDisplay() {return null},
  },
  7: {
    title: "Synergized Portals",
    desc: "Point Portals are stronger based on total Buildings bought.",
    cost: new Decimal(25),
    eff() {return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).div(4).add(1).pow(1.4)},
    effectDisplay() {return format(QUAD_UPGRADES[7].eff()) + "x Point Portal effectiveness"},
  },
  8: {
    title: "Point Hoarder",
    desc: "Buying things no longer subtracts from your point amount, and you start with 25 points.",
    cost: new Decimal(50),
    effectDisplay() {return null},
  },
  9: {
    title: "Base Addend",
    desc: "Add 0.2 to the bases of g(x) and h(x), and unlock autobuyers for Functions.",
    cost: new Decimal(100),
    effectDisplay() {return null},
  },
  10: {
    title: "Automation III",
    desc: "Unlock the Y autobuyer.",
    cost: new Decimal(200),
    effectDisplay() {return null},
  },
  11: {
    title: "Softcap Delay",
    desc: "The g(x) and h(x) softcaps start 10 purchases later.",
    cost: new Decimal(500),
    effectDisplay() {return null},
  },
  12: {
    title: "New Mechanic?",
    desc() {return `Unlock the Coordinate ${player.zUnlocked ? "Realm" : "Plane"}.`},
    cost: new Decimal(1500),
    effectDisplay() {return null},
  },
  13: {
    title: "Self-Synergy",
    desc: "Gain more points based on points.",
    cost: new Decimal(10000),
    eff() {
      let x = player.points.max(0).pow(hasZlabMilestone(2,1) ? (player.inSqrt ? 0.24 : 0.23) : 0.2).add(1)
      if(!hasSDU(9)) x = x.min("1e9e6")
      if(hasSDU(9) && x.gt("1e9e6")) x = x.div("1e9e6").pow(0.75).mul("1e9e6")
      return x
    },
    effectDisplay() {return format(QUAD_UPGRADES[13].eff()) + "x production"},
  },
  14: {
    title: "Automation IV",
    desc: "Unlock Auto-Quadratic, and make sacrificed Y more effective.",
    cost: new Decimal(250000),
    effectDisplay() {return null},
  },
  15: {
    title: "Powerful Sacrifice",
    desc: "Make sacrificed X twice as effective.",
    cost: new Decimal(1e7),
    effectDisplay() {return null},
  },
  16: {
    title: "Uprooted",
    desc: "Unlock Square Root.",
    cost: new Decimal(1e9),
    effectDisplay() {return null},
  },
  17: {
    title: "Didn't Need It Anyway",
    desc: "The sacrificed Y effect softcap is removed.",
    cost: new Decimal(1e75),
    effectDisplay() {return null},
  },
  18: {
    title: "Y Divider",
    desc: "Divide the Y cost by 1.1.",
    cost: new Decimal(1e84),
    effectDisplay() {return null},
  },
  19: {
    title: "Automation V",
    desc: "Sacrificing no longer resets anything, and Auto-Sacrifice now sacrifices x².",
    cost: new Decimal(1e96),
    effectDisplay() {return null},
  },
  20: {
    title: "Complicated Mathematics",
    desc: "Unlock Quadratic Formula.",
    cost: new Decimal(1e160),
    effectDisplay() {return null},
  },
};

function buyQU(x) {
  if(player.x2.gte(QUAD_UPGRADES[x].cost) && !hasQU(x)){
    player.x2 = player.x2.sub(QUAD_UPGRADES[x].cost)
    player.quadUpgs.push(x)
  }
}

function hasQU(x) {
  return player.quadUpgs.includes(x);
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
      if(hasCU(1,6))row4 += 4
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