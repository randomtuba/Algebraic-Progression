function reFormula() {
  return new Decimal(1.1).pow(player.x.div(100).sub(1)).mul(new Decimal(1.25).pow(player.y)).mul(Decimal.pow(2,player.sqrtDoublers)).mul(hasSU(11)?10:1).sub(player.rootEssence).max(0).floor()
}

function enterSqrt() {
  if(quadFormula().gte(1)){
    if(player.inSqrt){
      player.rootEssence = player.rootEssence.add(reFormula())
    }
    goQuadratic();
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
    eff() {return player.rootEssence.max(0).pow(1.25).add(1)},
    effectDisplay() {return format(SQRT_UPGRADES[2].eff()) + "x production"},
  },
  3: {
    title: "X-pansion",
    desc: "Unlock a new row of X Upgrades.",
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
    eff() {return player.points.max(0).pow(0.04).add(1)},
    effectDisplay() {return format(SQRT_UPGRADES[5].eff()) + "x x² gain"},
  },
  6: {
    title: "Extra Opportunities",
    desc: "Unlock the ability to sacrifice x² to the Coordinate Plane.",
    cost: new Decimal(600000),
    effectDisplay() {return null},
  },
  7: {
    title: "Loopover",
    desc: "Bought Autoclickers produce Point Portals.",
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
    eff() {return player.quadratics.pow(1.5).add(1)},
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
  return new Decimal(200).mul(Decimal.pow(5,player.sqrtDoublers))
}

function buySqrtDoubler() {
  if(player.rootEssence.gte(sqrtDoublerCost())){
    player.rootEssence = player.rootEssence.sub(sqrtDoublerCost())
    player.sqrtDoublers = player.sqrtDoublers.add(1)
  }
}