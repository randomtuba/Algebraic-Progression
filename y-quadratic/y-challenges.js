const Y_CHALLENGES = {
  1: {
    title: "Anti-Quadratic",
    desc: "You cannot gain x².",
    goal() {return new Decimal(4.5e8).add(Decimal.mul(1e7,player.yChalCompletions[1]))},
    rewardDesc: "Multiplies circles gain.",
    eff() {return new Decimal(player.yChalCompletions[1]).add(1).pow(2)},
    effectDisplay() {return format(Y_CHALLENGES[1].eff()) + "x circles gain"},
  },
  2: {
    title: "Unpolluted",
    desc: "Produced Buildings and all bonuses to Functions are disabled.",
    goal() {return new Decimal(5.1e8).add(Decimal.mul(1e7,player.yChalCompletions[2]))},
    rewardDesc: "Multiplies i exponent generation.",
    eff() {return new Decimal(player.yChalCompletions[2]).pow(1.5).add(1)},
    effectDisplay() {return format(Y_CHALLENGES[2].eff()) + "x i exponent generation"},
  },
  3: {
    title: "???",
    desc: "???",
    goal() {return new Decimal(1e100).add(Decimal.mul(1e80,player.yChalCompletions[3]))},
    rewardDesc: "???",
    eff() {return new Decimal(player.yChalCompletions[3])},
    effectDisplay() {return format(Y_CHALLENGES[3].eff()) + "x ???"},
  },
  4: {
    title: "???",
    desc: "???",
    goal() {return new Decimal(1e100).add(Decimal.mul(1e80,player.yChalCompletions[4]))},
    rewardDesc: "???",
    eff() {return new Decimal(player.yChalCompletions[4])},
    effectDisplay() {return format(Y_CHALLENGES[4].eff()) + "x ???"},
  },
}

function yChalUnlockCosts(x) {
  switch (x) {
    case 2:
      return new Decimal(1e61)
    break;
    case 3:
      return new Decimal(Infinity)
    break;
    case 4:
      return new Decimal(Infinity)
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