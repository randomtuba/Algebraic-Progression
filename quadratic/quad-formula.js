function qpGen() {
  if(player.abc[2].pow(2).round().gte(new Decimal(4).mul(player.abc[1]).mul(player.abc[3]))){
    let qp = player.abc[2].mul(player.abc[3]).pow(player.abc[1].div(2).sub(0.5))
    if(hasSU(13)) qp = qp.mul(SQRT_UPGRADES[13].eff())
    if(hasSU(14)) qp = qp.mul(SQRT_UPGRADES[14].eff())
    if(hasSU(15)) qp = qp.mul(SQRT_UPGRADES[15].eff2())
    qp = qp.mul(ceEffect(2))
    if(hasCU(1,1)) qp = qp.mul(10)
    if(hasCU(0,10)) qp = qp.mul(COMP_UPGRADES[10].eff2())
    return qp
  }else{
    return new Decimal(0)
  }
}

function maxABC() {
  return new Decimal(5).add(player.quadBuyables[4])
}

const QP_BUYABLES = {
  1: {
    title: "Variable Coupler",
    desc: "Divide X cost scaling by +0.1 per purchase",
    cost() {
      return player.quadBuyables[1].gt(3) ? new Decimal(Infinity) : new Decimal(1000).mul(Decimal.pow(300,player.quadBuyables[1])).mul(Decimal.pow(2,player.quadBuyables[1].pow(2)))
    },
    eff() {
      return new Decimal(1).add(player.quadBuyables[1].div(10))
    },
    effectDisplay() {
      return "/" + format(QP_BUYABLES[1].eff()) + " X cost scaling";
    },
  },
  2: {
    title: "Function Enhancer",
    desc: "Delay the g(x) and h(x) softcaps by 5 levels per purchase",
    cost() {
      return new Decimal(10000).mul(Decimal.pow(100,player.quadBuyables[2])).mul(Decimal.pow(1.7,player.quadBuyables[2].pow(2)))
    },
    eff() {
      return new Decimal(5).mul(player.quadBuyables[2].add(compPlaneEffects(1)))
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
      return new Decimal(1).add(player.quadBuyables[3].add(compPlaneEffects(1)).div(10))
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
      return player.quadBuyables[4]
    },
    effectDisplay() {
      return "+" + format(QP_BUYABLES[4].eff()) + " a, b, and c limit";
    },
  },
}

function buyQPBuyable(x) {
  if(player.quadPower.gte(QP_BUYABLES[x].cost())){
    player.quadPower = player.quadPower.sub(QP_BUYABLES[x].cost())
    player.quadBuyables[x] = player.quadBuyables[x].add(1)
  }
}