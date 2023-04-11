const Y_CHALLENGES = {
  1: {
    title: "Anti-Quadratic",
    desc: "You cannot gain x².",
    goal() {return new Decimal(4.5e8).add(Decimal.mul(1e7,player.yChalCompletions[1]))},
    rewardDesc: "Multiplies circles gain.",
    eff() {return new Decimal(player.yChalCompletions[1]).add(1).pow(Decimal.add(2,POLY_BUYABLES[2].eff()))},
    effectDisplay() {return format(Y_CHALLENGES[1].eff()) + "x circles gain"},
  },
  2: {
    title: "Unpolluted",
    desc: "Produced Buildings and all bonuses to Functions are disabled.",
    goal() {return new Decimal(5.1e8).add(Decimal.mul(1e7,player.yChalCompletions[2]))},
    rewardDesc: "Multiplies i exponent generation.",
    eff() {return new Decimal(player.yChalCompletions[2]).pow(Decimal.add(1.5,POLY_BUYABLES[2].eff())).add(1)},
    effectDisplay() {return format(Y_CHALLENGES[2].eff()) + "x i exponent generation"},
  },
  3: {
    title: "Hidden Formula",
    desc: "Quadratic Power cannot be generated. Quadratic Formula Buyables and Imaginary Power Buyables are disabled.",
    goal() {return new Decimal(1.1e9).add(Decimal.mul(5e7,player.yChalCompletions[3]))},
    rewardDesc: "Multiplies polynomial power generation.",
    eff() {return new Decimal(player.yChalCompletions[3]).pow(2).add(1)},
    effectDisplay() {return format(Y_CHALLENGES[3].eff()) + "x PP generation"},
  },
  4: {
    title: "Return to the Epicenter",
    desc: "You are trapped in Root Epicenter Level √-1. The Square Root Upgrade 'Uprooted Points' is disabled.",
    goal() {return new Decimal(4e8).add(Decimal.mul(2.5e7,player.yChalCompletions[4]))},
    rewardDesc: "Multiplies the hardcap start of Quadratic Bonus (Quadratic Upgrade 1).",
    eff() {return Decimal.pow("1e300000",(player.yChalCompletions[4].gte(50) ? player.yChalCompletions[4].div(50).pow(0.8).mul(50) : player.yChalCompletions[4]))},
    effectDisplay() {return format(Y_CHALLENGES[4].eff()) + "x QU1 hardcap start"},
  },
}

function yChalUnlockCosts(x) {
  switch (x) {
    case 2:
      return new Decimal(1e61)
    break;
    case 3:
      return new Decimal(1e74)
    break;
    case 4:
      return new Decimal(1e140)
    break;
  }
}

function interactWithYC(x) {
  if(!player.yChalsUnlocked[x] && player.y2.gte(yChalUnlockCosts(x))) { // unlock y-challenge
    player.y2 = player.y2.sub(yChalUnlockCosts(x))
    player.yChalsUnlocked[x] = true;
  } else if (player.yChalsUnlocked[x] && player.yChallenge != x) { // enter y-challenge
    goYQuadratic(true);
    player.yChallenge = x;
  } else if (player.yChalsUnlocked[x] && player.yChallenge == x) { // exit y-challenge
    goYQuadratic(true);
  }
}