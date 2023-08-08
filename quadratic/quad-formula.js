function qpGen() {
  if(player.abc[2].pow(2).round().gte(new Decimal(4).mul(player.abc[1]).mul(player.abc[3])) || hasMilestone(19)){
    let qp = player.abc[2].mul(player.abc[3]).pow(player.abc[1].div(2).sub(0.5))
    if(hasSU(13)) qp = qp.mul(SQRT_UPGRADES[13].eff())
    if(hasSU(14)) qp = qp.mul(SQRT_UPGRADES[14].eff())
    if(hasSU(15)) qp = qp.mul(SQRT_UPGRADES[15].eff2())
    qp = qp.mul(ceEffect(2))
    if(hasCU(1,1) && player.compChallenge != 10) qp = qp.mul(10)
    if(hasCU(0,10) && player.compChallenge != 10) qp = qp.mul(COMP_UPGRADES[10].eff2())
    if(hasYQU(3,'bought')) qp = qp.mul(YQUAD_UPGRADES[3].eff())
    if(hasPermUpgrade(2)) qp = qp.mul(PERM_UPGRADES[2].eff2())
    if(player.compChallenge == 9) qp = qp.pow(0.5)
    qp = qp.pow(COMP_CHALLENGES[9].eff())
    if(player.yChallenge == 3) qp = new Decimal(0)
    return qp
  }else{
    return new Decimal(0)
  }
}

function ipGen() {
  if(player.abc[2].pow(2).round().lt(new Decimal(4).mul(player.abc[1]).mul(player.abc[3]))){
    let ip = player.abc[2].mul(player.abc[3]).pow(player.abc[1].div(2).sub(0.5))
    if(player.quadBuyables[5].eq(1)) ip = ip.mul(QP_BUYABLES[5].eff())
    ip = ip.mul(circleEffects(1))
    ip = ip.pow(QP_BUYABLES[8].eff())
    return ip
  }else{
    return new Decimal(0)
  }
}

function maxABC() {
  return new Decimal(5).add(player.quadBuyables[4])
}

// while it is called "quadratic power buyables", this const stores imaginary power buyables as well
const QP_BUYABLES = {
  1: {
    title: "Variable Coupler",
    desc: "Divide X cost scaling by +0.1 per purchase",
    cost() {
      return player.quadBuyables[1].gt(hasZlabMilestone(3,2) ? 4 : 3) ? new Decimal(Infinity) : new Decimal(1000).mul(Decimal.pow(300,player.quadBuyables[1])).mul(Decimal.pow(2,player.quadBuyables[1].pow(2)))
    },
    eff() {
      return player.yChallenge == 3 ? new Decimal(1) : new Decimal(1).add(player.quadBuyables[1].div(10))
    },
    effectDisplay() {
      return "/" + format(QP_BUYABLES[1].eff()) + " X cost scaling";
    },
  },
  2: {
    title: "Function Enhancer",
    desc: "Delay the g(n) and h(n) softcaps by 5 levels per purchase",
    cost() {
      return new Decimal(10000).mul(Decimal.pow(100,player.quadBuyables[2])).mul(Decimal.pow(1.7,player.quadBuyables[2].pow(2)))
    },
    eff() {
      return player.yChallenge == 3 ? new Decimal(0) : new Decimal(hasZlabMilestone(2,4)?6:5).mul(player.quadBuyables[2].add(compPlaneEffects(1)))
    },
    effectDisplay() {
      return "Softcap starts " + format(QP_BUYABLES[2].eff()) + " purchases later";
    },
  },
  3: {
    title: "Challenge Amplifier",
    desc: "Raise the C1 reward effect by +0.1 per purchase",
    cost() {
      return new Decimal(100000).mul(Decimal.pow(40,player.quadBuyables[3])).mul(Decimal.pow(1.5,player.quadBuyables[3].pow(2)))
    },
    eff() {
      return player.yChallenge == 3 ? new Decimal(1) : new Decimal(1).add(player.quadBuyables[3].add(compPlaneEffects(1)).div(10))
    },
    effectDisplay() {
      return "^" + format(QP_BUYABLES[3].eff()) + " C1 reward effect";
    },
  },
  4: {
    title: "Limit Expander",
    desc: "Add 1 to the a, b, and c limit per purchase",
    cost() {
      return new Decimal(1000).mul(Decimal.pow(10,player.quadBuyables[4])).mul(Decimal.pow(1.2,player.quadBuyables[4].pow(2)))
    },
    eff() {
      return player.yChallenge == 3 ? new Decimal(0) : player.quadBuyables[4]
    },
    effectDisplay() {
      return "+" + format(QP_BUYABLES[4].eff()) + " a, b, and c limit";
    },
  },
  5: {
    title: "Bonus Converter",
    desc: "Challenge Essence boosts IP generation at a reduced rate",
    cost() {
      return player.quadBuyables[5].eq(1) ? new Decimal(Infinity) : new Decimal("1e820")
    },
    eff() {
      return player.yChallenge == 3 ? new Decimal(1) : ceEffect(2).pow(0.015)
    },
    effectDisplay() {
      return format(QP_BUYABLES[5].eff()) + "x IP gain";
    },
  },
  6: {
    title: "Production Augmenter",
    desc: "Multiply production of Buildings by 1e400x per purchase",
    cost() {
      return new Decimal("1e730").mul(Decimal.pow(1e40,player.quadBuyables[6])).mul(Decimal.pow(10,player.quadBuyables[6].pow(2)))
    },
    eff() {
      return player.yChallenge == 3 ? new Decimal(1) : Decimal.pow(new Decimal("1e400"),player.quadBuyables[6])
    },
    effectDisplay() {
      return format(QP_BUYABLES[6].eff()) + "x production of Buildings";
    },
  },
  7: {
    title: "Chemical Accelerator",
    desc: "Multiply Z-Power gain by 3 per purchase",
    cost() {
      return player.quadBuyables[7].gte(10) ? new Decimal(Infinity) : new Decimal("1e800").mul(Decimal.pow(1e80,player.quadBuyables[7])).mul(Decimal.pow(100,player.quadBuyables[7].pow(2)))
    },
    eff() {
      return player.yChallenge == 3 ? new Decimal(1) : Decimal.pow(3,player.quadBuyables[7].min(10))
    },
    effectDisplay() {
      return format(QP_BUYABLES[7].eff()) + "x Z-Power gain";
    },
  },
  8: {
    title: "Imaginary Duplicator",
    desc: "Raise IP generation by +0.01 per purchase",
    cost() {
      return new Decimal("1e760").mul(Decimal.pow(1e60,player.quadBuyables[8])).mul(Decimal.pow(50,player.quadBuyables[8].pow(2)))
    },
    eff() {
      return player.yChallenge == 3 ? new Decimal(1) : Decimal.add(1,player.quadBuyables[8].div(100))
    },
    effectDisplay() {
      return "^" + format(QP_BUYABLES[8].eff()) + " IP gain";
    },
  },
}

function buyQPBuyable(x) {
  if(x < 5) {
    if(player.quadPower.gte(QP_BUYABLES[x].cost()) && (player.quadBuyables[1].add(player.quadBuyables[2]).add(player.quadBuyables[3]).add(player.quadBuyables[4]).lt(new Decimal(20).sub(player.compChalCompletions[9]*5).max(0)) || player.compChallenge != 9)){
      player.quadPower = player.quadPower.sub(QP_BUYABLES[x].cost())
      player.quadBuyables[x] = player.quadBuyables[x].add(1)
    }
  } else {
    if(player.imagPower.gte(QP_BUYABLES[x].cost())) {
      player.imagPower = player.imagPower.sub(QP_BUYABLES[x].cost())
      player.quadBuyables[x] = player.quadBuyables[x].add(1)
    }
  }
}