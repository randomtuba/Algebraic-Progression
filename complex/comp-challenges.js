const COMP_CHALLENGES = {
  1: {
    title: "Incomplete Square",
    desc() {return "x² gain is raised to an exponent based on your point amount (always less than 1)."},
    goals: [new Decimal("1e16100"),new Decimal("1e21900"),new Decimal("1e22300"),new Decimal("1e24000"),new Decimal("1e24700"),new Decimal(Infinity)],
    rewardDesc: "Add to the exponent of Quadratic Bonus.",
    eff() {return new Decimal(0.03).mul(player.compChalCompletions[1])},
    effectDisplay() {return "+" + format(COMP_CHALLENGES[1].eff()) + " Quadratic Bonus exponent"},
    unlockCost: new Decimal(10),
  },
  2: {
    title: "Anti-Graphing",
    desc() {return "Slope and b are disabled. Produced buildings do nothing. Anti-slope super-exponentially rises over time and divides point gain and divides x² gain at a reduced rate."},
    goals: [new Decimal("1e5800"),new Decimal("1e6200"),new Decimal("1e8610"),new Decimal("1e9010"),new Decimal(Infinity),new Decimal(Infinity)],
    rewardDesc: "Multiply the hardcap starts of the 1st and 2nd effects of b.",
    eff() {return new Decimal(1).add(Decimal.pow(2,player.compChalCompletions[2] - 1).div(100))},
    effectDisplay() {return format(COMP_CHALLENGES[2].eff()) + "x b effect hardcaps"},
    unlockCost: new Decimal(15),
  },
  3: {
    title: "Greatest Common Factor",
    desc() {return "X cost is ^10 and Y cost is ^4. If your X and Y amounts share a GCF, point gain will be negatively affected based on the factor. Note: Greatest Common Factor is also known as \"Greatest Common Divisor\"."},
    goals: [new Decimal("1e9100"),new Decimal("1e9900"),new Decimal("1e10900"),new Decimal("1e11200"),new Decimal("1e11800"),new Decimal(Infinity)],
    rewardDesc: "Divide the X and Y cost scalings.",
    eff() {return new Decimal(1).add(Decimal.mul(0.03,player.compChalCompletions[3]))},
    effectDisplay() {return "/" + format(COMP_CHALLENGES[3].eff()) + " X and Y cost scalings"},
    unlockCost: new Decimal(20),
  },
  4: {
    title: "The Failable One",
    desc() {return "All boosts based on times gone Quadratic and boosts to Quadratics gain are disabled. You also must beat the challenge in " + formatWhole(new Decimal(20).sub(player.compChalCompletions[4]*5).max(0)) + " Quadratics or less, or else you fail the challenge."},
    goals: [new Decimal("1e34500"),new Decimal("1e40900"),new Decimal("1e42400"),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity)],
    rewardDesc: "Multiply Quadratics gain, and power all Quadratic-based effects.",
    eff() {return Decimal.pow(2,player.compChalCompletions[4])},
    eff2() {return Decimal.add(1,player.compChalCompletions[4] / 8)},
    effectDisplay() {return format(COMP_CHALLENGES[4].eff()) + "x Quadratics, ^" + format(COMP_CHALLENGES[4].eff2()) + " Quadratic-based effects"},
    unlockCost: new Decimal(30),
  },
  5: {
    title: "Constance",
    desc() {return "You cannot gain X and Y. The way x² is gained is changed to compensate for this. You are also trapped in Root Epicenter Level √" + (player.compChalCompletions[5] == 4 ? "-1" : player.compChalCompletions[5]+1) + ", just for fun."},
    goals: [new Decimal("1e2750"),new Decimal("1e3800"),new Decimal("1e4710"),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity)],
    rewardDesc: "Multiply the gains of sacrificed X and Y.",
    eff() {return Decimal.pow(1.2,player.compChalCompletions[5])},
    effectDisplay() {return format(COMP_CHALLENGES[5].eff()) + "x sacrificed X and Y gain"},
    unlockCost: new Decimal(40),
  },
  6: {
    title: "???",
    desc() {return "???"},
    goals: [new Decimal("1.79e300008"),new Decimal("1.79e300008"),new Decimal("1.79e300008"),new Decimal("1.79e300008"),new Decimal("1.79e300008"),new Decimal("1.79e300008")],
    rewardDesc: "???",
    eff() {return new Decimal(1)},
    effectDisplay() {return format(COMP_CHALLENGES[6].eff()) + "x ???"},
    unlockCost: new Decimal(50),
  },
}

function ccTiers() {
  return player.compChalCompletions[1]+player.compChalCompletions[2]+player.compChalCompletions[3]+player.compChalCompletions[4]+player.compChalCompletions[5]+player.compChalCompletions[6]+player.compChalCompletions[7]+player.compChalCompletions[8]+player.compChalCompletions[9]+player.compChalCompletions[10]
}

function interactWithCC(x) {
  if(player.unlocked == 0 && player.upgradePoints[0].gte(COMP_CHALLENGES[x].unlockCost)) { // unlock complex challenge
    player.upgradePoints[0] = player.upgradePoints[0].sub(COMP_CHALLENGES[x].unlockCost);
    player.unlocked = x;
  } else if (player.unlocked == x && player.compChallenge == 0) { // enter complex challenge
    player.compChallenge = x;
    goComplex(true);
    player.compChallenge = x;
  } else if (player.unlocked == x && player.compChallenge == x) { // exit/complete complex challenge
    if(player.x2.gte(COMP_CHALLENGES[x].goals[player.compChalCompletions[x]])) {
      player.compChalCompletions[x]++;
      player.upgradePoints[0] = player.upgradePoints[0].add(COMP_CHALLENGES[x].unlockCost);
      player.unlocked = 0
    }
    goComplex(true);
  }
}

function cc1Exponent() {
  return new Decimal(1).sub(new Decimal(1).div(player.points.add(1).log10().add(1).log(1000).add(1)))
}

function gcd_two_numbers(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}