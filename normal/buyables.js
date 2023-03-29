const BUYABLES = {
  1: {
    title: "Autoclickers",
    cost() {
      return new Decimal(25).mul(new Decimal(buildingCostScaling()).pow(player.buyables[1]))
    },
    eff() {
      return player.challenge == 1 || player.compChallenge == 8 ? new Decimal(0) : player.buyables[1].add(player.buyables[7].mul(player.challenge == 3 || player.challenge == 5 || player.challenge == 10 || player.compChallenge == 2 || player.compChallenge == 8 || player.yChallenge == 2 ? 0 : 1)).mul(buildingMultipliers()).mul(hasQU(2)?QUAD_UPGRADES[2].eff():1).pow(buildingExponents())
    },
    baseProd() {
      return player.challenge == 1 || player.compChallenge == 8 ? new Decimal(0) : buildingMultipliers().mul(hasQU(2)?QUAD_UPGRADES[2].eff():1).pow(buildingExponents())
    },
    effectDisplay() {
      return format(BUYABLES[1].eff()) + "/s";
    },
    unl() {
      return true;
    },
  },
  2: {
    title: "Point Factories",
    cost() {
      return new Decimal(200).mul(new Decimal(buildingCostScaling()).pow(player.buyables[2]))
    },
    eff() {
      return player.challenge == 1 || player.compChallenge == 8 ? new Decimal(0) : player.buyables[2].add(player.buyables[8].mul(player.challenge == 3 || player.challenge == 5 || player.challenge == 10 || player.compChallenge == 2 || player.compChallenge == 8 || player.yChallenge == 2 ? 0 : 1)).mul(10).mul(buildingMultipliers()).mul(hasQU(4)?QUAD_UPGRADES[4].eff():1).pow(buildingExponents())
    },
    baseProd() {
      return player.challenge == 1 || player.compChallenge == 8 ? new Decimal(0) : buildingMultipliers().mul(10).mul(hasQU(4)?QUAD_UPGRADES[4].eff():1).pow(buildingExponents())
    },
    effectDisplay() {
      return format(BUYABLES[2].eff()) + "/s";
    },
    unl() {
      return player.buyables[1].gte(1) || hasQU(6) || player.totali.gte(1);
    },
  },
  3: {
    title: "Point Portals",
    cost() {
      return new Decimal(15000).mul(new Decimal(buildingCostScaling()).pow(player.buyables[3]))
    },
    eff() {
      return player.buyables[3].add(player.buyables[9].mul(player.challenge == 3 || player.challenge == 5 || player.challenge == 10 || player.compChallenge == 2 || player.compChallenge == 8 || player.yChallenge == 2 ? 0 : 1)).mul(1000).mul(buildingMultipliers()).mul(hasQU(7)?QUAD_UPGRADES[7].eff():1).pow(buildingExponents())
    },
    baseProd() {
      return buildingMultipliers().mul(1000).mul(hasQU(7)?QUAD_UPGRADES[7].eff():1).pow(buildingExponents())
    },
    effectDisplay() {
      return format(BUYABLES[3].eff()) + "/s";
    },
    unl() {
      return player.buyables[2].gte(1) || hasQU(6) || player.totali.gte(1);
    },
  },
  4: {
    title: "f(",
    cost() {
      return new Decimal(5000000).mul(new Decimal(functionCostScaling(1)).pow(player.buyables[4]))
    },
    formula(){return (hasQU(3) || hasChallenge(2)) && player.yChallenge != 2 ? "(x + 1)<sup>" + formatWhole(BUYABLES[4].exponent()) + "</sup>" : "x + 1"},
    eff() {
      return player.challenge == 5 || player.compChallenge == 8 ? new Decimal(1) : player.buyables[4].add(1).pow(BUYABLES[4].exponent())
    },
    exponent() {
      let exp = new Decimal(1)
      if(hasQU(3)) exp = exp.mul(2)
      if(hasChallenge(2)) exp = exp.mul(2)
      exp = exp.mul(sacEffect('z'))
      if(hasChargedUpgrade(2) && player.challenge != 5 && player.compChallenge != 8) exp = exp.mul(1.2)
      if(player.yChallenge == 2) exp = new Decimal(1)
      return exp
    },
    unl() {
      return hasUpgrade(4)
    },
  },
  5: {
    title: "g(",
    cost() {
      return new Decimal(30000000).mul(new Decimal(functionCostScaling(2)).pow(player.buyables[5]))
    },
    formula() {return player.buyables[5].gte(funcSoftcapStart()) ? format(BUYABLES[5].base()) + "<sup>" + formatWhole(funcSoftcapStart()) + "</sup>*" + format(BUYABLES[5].base()) + "<sup>(x-" + formatWhole(funcSoftcapStart()) + ")<sup>0.5</sup></sup>" : format(BUYABLES[5].base()) + "<sup>x</sup>"},
    base() {
      let base = new Decimal(1.3)
      if(hasQU(9)) base = base.add(0.2)
      base = base.add(sacEffect('y'))
      if(hasChallenge(6)) base = base.mul(2)
      if(hasCU(1,3)) base = base.mul(BCOMP_UPGRADES[3].eff())
      if(hasChargedUpgrade(2) && player.challenge != 5 && player.compChallenge != 8) base = base.mul(1.4)
      if(base.gte(5e7) && player.transformations.activated == 4) base = base.div(5e7).pow(0.5).mul(5e7)
      if(player.yChallenge == 2) base = new Decimal(1.3)
      return base
    },
    eff() {
      if(player.buyables[5].gte(funcSoftcapStart())){
        return player.challenge == 1 || player.challenge == 5 || player.compChallenge == 8 ? new Decimal(1) : new Decimal(BUYABLES[5].base()).pow(funcSoftcapStart()).mul(Decimal.pow(BUYABLES[5].base(),player.buyables[5].sub(funcSoftcapStart()).max(0).pow(0.5)))
      }else{
        return player.challenge == 1 || player.challenge == 5 || player.compChallenge == 8 ? new Decimal(1) : new Decimal(BUYABLES[5].base()).pow(player.buyables[5])
      }
    },
    unl() {
      return hasUpgrade(4)
    },
  },
  6: {
    title: "h(",
    cost() {
      return new Decimal(100000000).mul(new Decimal(functionCostScaling(3)).pow(player.buyables[6]))
    },
    formula() {return player.buyables[6].gte(funcSoftcapStart()) ? format(BUYABLES[6].base()) + "<sup>" + formatWhole(funcSoftcapStart()) + "</sup>*" + format(BUYABLES[6].base()) + "<sup>(x-" + formatWhole(funcSoftcapStart()) + ")<sup>0.5</sup></sup>" : format(BUYABLES[6].base()) + "<sup>x</sup>"},
    base() {
      let base = new Decimal(1.6)
      if(hasQU(9)) base = base.add(0.2)
      base = base.add(sacEffect('y'))
      if(hasChallenge(6)) base = base.mul(2)
      if(hasYQU(4,'bought')) base = base.mul(BCOMP_UPGRADES[3].eff())
      if(hasChargedUpgrade(2) && player.challenge != 5 && player.compChallenge != 8) base = base.mul(1.4)
      if(base.gte(5e7) && player.transformations.activated == 4) base = base.div(5e7).pow(0.5).mul(5e7)
      if(player.yChallenge == 2) base = new Decimal(1.6)
      return base
    },
    eff() {
      if(player.buyables[6].gte(funcSoftcapStart())){
        return player.challenge == 5 || player.compChallenge == 8 ? new Decimal(1) : new Decimal(BUYABLES[6].base()).pow(funcSoftcapStart()).mul(Decimal.pow(BUYABLES[6].base(),player.buyables[6].sub(funcSoftcapStart()).max(0).pow(0.5)))
      }else{
        return player.challenge == 5 || player.compChallenge == 8 ? new Decimal(1) : new Decimal(BUYABLES[6].base()).pow(player.buyables[6])
      }
    },
    unl() {
      return hasUpgrade(4)
    },
  },
};

function buyBuyable(x) {
  if(player.points.gte(BUYABLES[x].cost()) && (player.purchases > 0 || (player.challenge != 10 && player.compChallenge != 8))){
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[x].cost())
    player.buyables[x] = player.buyables[x].add(1)
    player.chalExponents[0] = new Decimal(0)
    player.purchases -= 1
  }
}

function buildingMultipliers() {
  let mult = new Decimal(1);
  mult = mult.mul(BUYABLES[4].eff()).mul(BUYABLES[5].eff()).mul(BUYABLES[6].eff())
  if(hasUpgrade(2) && player.challenge != 5 && player.compChallenge != 8) mult = mult.mul(2)
  if(hasQU(1)) mult = mult.mul(QUAD_UPGRADES[1].eff())
  if(hasQU(13)) mult = mult.mul(QUAD_UPGRADES[13].eff())
  if(hasSU(2)) mult = mult.mul(SQRT_UPGRADES[2].eff())
  if(player.challenge != 5 && player.compChallenge != 8) if(hasUpgrade(5)) mult = mult.mul(1000)
  if(hasSU(9)) mult = mult.mul(SQRT_UPGRADES[9].eff()) // non-static
  if(hasSU(10)) mult = mult.mul(SQRT_UPGRADES[10].eff())
  if(hasChallenge(9)) mult = mult.mul(CHALLENGES[9].effect())
  if(player.challenge == 5 && player.compChallenge != 8) mult = mult.div(Decimal.pow(5**0.01,player.x))
  if(inSqrtLevel(2)) mult = mult.div("1e5000")
  if(inSqrtLevel(3)) mult = mult.div("1e1650")
  if(inSqrtLevel(4)) mult = mult.div("1e3650")
  if(hasCU(1,1) && player.compChallenge != 10) mult = mult.mul(BCOMP_UPGRADES[1].eff())
  if(hasCU(0,3) && player.compChallenge != 10) mult = mult.mul(COMP_UPGRADES[3].eff()) // non-static
  if(hasChargedUpgrade(5) && player.challenge != 5 && player.compChallenge != 8) mult = mult.mul("1e9997")
  if(player.compChallenge != 10) mult = mult.mul(COMP_UPGRADES[13].eff())
  if(player.compChallenge == 2) mult = mult.div(player.antiSlope)
  if(player.compChallenge == 6) mult = mult.div("1e75000")
  return mult
}

function buildingExponents() {
  let exp = new Decimal(1);
  if(player.inSqrt) exp = exp.max(0).mul(hasSU(8)?0.55:0.5)
  if(player.challenge == 4 || player.compChallenge == 8) exp = exp.max(0).mul(0.75)
  if(hasUpgrade(7) && player.challenge != 5 && player.compChallenge != 8 && (!hasChargedUpgrade(7) || player.inSqrt)) exp = exp.mul(1.01)
  if(hasChargedUpgrade(7) && player.challenge != 5 && player.compChallenge != 8 && !player.inSqrt) exp = exp.mul(1.03)
  if(hasChallenge(4)) exp = exp.mul(1.02)
  if(player.challenge == 2 || player.compChallenge == 8) exp = exp.mul(player.chalExponents[0])
  if(player.challenge == 9) exp = exp.mul(player.chalExponents[1])
  if(hasCU(0,1) && player.compChallenge != 10) exp = exp.mul(COMP_UPGRADES[1].eff())
  if(player.compChallenge == 3) exp = exp.mul(Decimal.div(1,new Decimal(gcd_two_numbers(player.x.toNumber(),player.y.toNumber())).sqrt().max(1)))
  if(player.compChallenge == 7) exp = exp.mul(player.chalExponents[2])
  if(player.compChallenge == 10) exp = exp.mul(0.1)
  return exp
}

function buildingCostScaling() {
  let scale = new Decimal(1.15)
  if(hasUpgrade(1) && player.challenge != 5 && player.compChallenge != 8) scale = scale.sub(0.05)
  if(hasChallenge(3)) scale = scale.sub(0.025)
  if(hasChargedUpgrade(1) && player.challenge != 5 && player.compChallenge != 8) scale = scale.sub(0.025)
  if(player.challenge == 3 || player.compChallenge == 8) scale = scale.mul(3)
  return scale
}

function functionCostScaling(x) {
  switch (x) {
    case 1:
      let scale1 = 2
      if(hasChallenge(3)) scale1 = scale1 / 1.25
      if(hasChargedUpgrade(1) && player.challenge != 5 && player.compChallenge != 8) scale1 = scale1 / 1.2
      if(player.challenge == 3 || player.compChallenge == 8) scale1 = scale1 * 3
      if(player.challenge == 6 || player.compChallenge == 8) scale1 = scale1 * 10
      return scale1
    break;
    case 2:
      let scale2 = 5
      if(hasChallenge(3)) scale2 = scale2 / 1.25
      if(hasChargedUpgrade(1) && player.challenge != 5 && player.compChallenge != 8) scale2 = scale2 / 1.2
      if(player.challenge == 3 || player.compChallenge == 8) scale2 = scale2 * 3
      if(player.challenge == 6 || player.compChallenge == 8) scale2 = scale2 * 10
      if(player.yChallenge == 2) scale2 = 5
      return scale2
    break;
    case 3:
      let scale3 = 7
      if(hasChallenge(3)) scale3 = scale3 / 1.25
      if(hasChargedUpgrade(1) && player.challenge != 5 && player.compChallenge != 8) scale3 = scale3 / 1.2
      if(player.challenge == 3 || player.compChallenge == 8) scale3 = scale3 * 3
      if(player.challenge == 6 || player.compChallenge == 8) scale3 = scale3 * 10
      if(player.yChallenge == 2) scale3 = 7
      return scale3
    break;
  }
}

function funcSoftcapStart() {
  let softcap = new Decimal(15)
  if(hasQU(11)) softcap = softcap.add(10)
  if(hasChallenge(3)) softcap = softcap.add(25)
  softcap = softcap.add(QP_BUYABLES[2].eff())
  if(hasCU(0,9) && player.compChallenge != 10) softcap = softcap.add(player.compUpgs[2][0]+player.compUpgs[2][1]+player.compUpgs[2][2])
  softcap = softcap.add(COMP_CHALLENGES[6].eff())
  if(hasChargedUpgrade(4) && player.challenge != 5 && player.compChallenge != 8) softcap = softcap.mul(1.05)
  if(player.yChallenge == 2) softcap = new Decimal(15)
  return softcap
}