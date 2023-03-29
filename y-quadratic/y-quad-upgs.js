const YQUAD_UPGRADES = {
  1: {
    title: "Functional Recreation",
    desc: "The f(x) exponent boosts Quadratics gain.",
    requirement: "Reach 2e222,222 points and 1.00e9 non-banked Quadratics without buying g(x) and h(x).",
    done() {return player.points.gte("2e222222") && player.quadratics.gte(1e9) && player.buyables[5].eq(0) && player.buyables[6].eq(0)},
    cost: new Decimal(200),
    eff() {return BUYABLES[4].exponent().pow(0.5)},
    effectDisplay() {return format(YQUAD_UPGRADES[1].eff()) + "x Quadratics gain"},
  },
  2: {
    title: "Variable Interpolation",
    desc: "Unlock an autobuyer for Z, and Auto-Sacrifice sacrifices Z.",
    requirement: "Reach 6z.",
    done() {return player.z.gte(6)},
    cost: new Decimal(200),
    effectDisplay() {return null},
  },
  3: {
    title: "Formulated Recursion",
    desc: "Gain more QP based on Quadratic Formula Buyables bought.",
    requirement: "Reach 1e1680 Quadratic Power without any Quadratic Formula Buyables.",
    done() {return player.quadPower.gte("1e1680") && player.quadBuyables[1].eq(0) && player.quadBuyables[2].eq(0) && player.quadBuyables[3].eq(0) && player.quadBuyables[4].eq(0)},
    cost: new Decimal(25),
    eff() {return Decimal.pow(3,player.quadBuyables[1].add(player.quadBuyables[2]).add(player.quadBuyables[3]).add(player.quadBuyables[4]))},
    effectDisplay() {return format(YQUAD_UPGRADES[3].eff()) + "x QP gain"},
  },
  4: {
    title: "Functional Acceleration",
    desc: "Basic Complex Upgrade 3 also boosts the h(x) base.",
    requirement: "Reach 54 Upgrade Points.",
    done() {return player.upgradePoints[1].gte(54)},
    cost: new Decimal(120),
    effectDisplay() {return null},
  },
  5: {
    title: "Uprooted Progression",
    desc: "Power the gains of RE and CE based on Achievements completed, ignoring the 1st CE softcap.",
    requirement: "Have at least 49 Achievements.",
    done() {return player.achievements.length >= 49},
    cost: new Decimal(1500),
    eff() {return new Decimal(1).add(new Decimal(player.achievements.length).div(1000))},
    effectDisplay() {return "^" + format(YQUAD_UPGRADES[5].eff()) + " RE and CE gain"},
  },
  6: {
    title: "Parallel Connection",
    desc: "Gain more i based on y².",
    requirement: "Have at least 4 Y-Quadratic Upgrades.",
    done() {return player.yQuadUpgs[0].length >= 4},
    cost: new Decimal(400),
    eff() {return player.y2.pow(0.5).add(1)},
    effectDisplay() {return format(YQUAD_UPGRADES[6].eff()) + "x i gain"},
  },
  7: {
    title: "Multiplier Deviation",
    desc: "x² Doublers boost Root Essence gain at a reduced rate.",
    requirement: "Reach 1e66,000 x² without any x² Doublers.",
    done() {return player.x2.gte("1e66000") && player.doublers.eq(0)},
    cost: new Decimal(400),
    eff() {return Decimal.pow(Decimal.add(2,compPlaneEffects(3)),player.doublers).cbrt()},
    effectDisplay() {return format(YQUAD_UPGRADES[7].eff()) + "x RE gain"},
  },
  8: {
    title: "Chemical Expansion",
    desc: "Unlock the Z Lab.",
    requirement: "Complete 27 Complex Challenge tiers.",
    done() {return ccTiers() >= 27},
    cost: new Decimal(2222),
    effectDisplay() {return null},
  },
  9: {
    title: "Cost Deceleration",
    desc: "i Tripler scaling is reduced to 25x.",
    requirement: "Have 30 i Triplers.",
    done() {return player.triplers.gte(30)},
    cost: new Decimal(5e10),
    effectDisplay() {return null},
  },
  10: {
    title: "Temporal Ascension",
    desc: "Power slope based on time in this Y-Quadratic, ignoring softcaps. (hardcaps at ^1.25)",
    requirement: "Reach 1e61,700 slope without b, sacrificed X, and sacrificed Y.",
    done() {return player.slope.gte("1e62300") && player.sacX.eq(0) && player.sacY.eq(0)},
    cost: new Decimal(1e6),
    eff() {return new Decimal(1).add(new Decimal(player.prestigeTimes[4]).add(1).log10().div(20)).min(1.25)},
    effectDisplay() {return "^" + format(YQUAD_UPGRADES[10].eff()) + " slope"},
  },
  11: {
    title: "Quadratic Connection",
    desc: "x² and y² boost each other.",
    requirement: "Reach 1e240,000 Points without any x².",
    cost: new Decimal(1e14),
    done() {return player.points.gte("1e240000") && player.totalx2.eq(0)},
    eff() {return player.y2.pow(250).add(1)}, //boost to x^2
    eff2() {return player.x2.add(1).ln().div(10000).add(1)}, //boost to y^2
    effectDisplay() {return format(YQUAD_UPGRADES[11].eff()) + "x x² gain, " + format(YQUAD_UPGRADES[11].eff2()) + "x y² gain"},
  },
  12: {
    title: "Transcendent Automation",
    desc: "Unlock the Y-Quadratic Automator.",
    requirement: "Reach 1e100,000 x² without sacrificed currencies (excluding sacrificed Z), Slope, b, and QP.",
    done() {return player.x2.gte("1e100000") && player.sacX.eq(0) && player.sacY.eq(0) && player.sacX2.eq(0) && player.b.eq(0) && player.quadPower.eq(0)},
    cost: new Decimal(1e19),
    effectDisplay() {return null},
  },
}

function buyYQU(x) {
  if(player.y2.gte(YQUAD_UPGRADES[x].cost) && hasYQU(x,'unlocked') && !hasYQU(x,'bought')){
    player.y2 = player.y2.sub(YQUAD_UPGRADES[x].cost)
    player.yQuadUpgs[0].push(x)
  }
}

function hasYQU(x,y) {
  if(y == 'bought'){
    return player.yQuadUpgs[0].includes(x);
  } else if (y == 'unlocked') {
    return player.yQuadUpgs[1].includes(x.toString())
  }
}