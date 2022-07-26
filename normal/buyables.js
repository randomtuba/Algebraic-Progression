const BUYABLES = {
  1: {
    title: "Autoclickers",
    cost() {
      return new Decimal(25).mul(new Decimal(buildingCostScaling()).pow(player.buyables[1]))
    },
    eff() {
      return player.challenge == 1 ? new Decimal(0) : player.buyables[1].add(player.buyables[7].mul(player.challenge == 3 ? 0 : 1)).mul(buildingMultipliers()).mul(hasQU(2)?QUAD_UPGRADES[2].eff():1)
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
      return player.challenge == 1 ? new Decimal(0) : player.buyables[2].add(player.buyables[8].mul(player.challenge == 3 ? 0 : 1)).mul(10).mul(buildingMultipliers()).mul(hasQU(4)?QUAD_UPGRADES[4].eff():1)
    },
    effectDisplay() {
      return format(BUYABLES[2].eff()) + "/s";
    },
    unl() {
      return player.buyables[1].gte(1) || hasQU(6);
    },
  },
  3: {
    title: "Point Portals",
    cost() {
      return new Decimal(15000).mul(new Decimal(buildingCostScaling()).pow(player.buyables[3]))
    },
    eff() {
      return player.buyables[3].add(player.buyables[9].mul(player.challenge == 3 ? 0 : 1)).mul(1000).mul(buildingMultipliers()).mul(hasQU(7)?QUAD_UPGRADES[7].eff():1)
    },
    effectDisplay() {
      return format(BUYABLES[3].eff()) + "/s";
    },
    unl() {
      return player.buyables[2].gte(1) || hasQU(6);
    },
  },
  4: {
    title: "f(",
    cost() {
      return new Decimal(5000000).mul(new Decimal(functionCostScaling(1)).pow(player.buyables[4]))
    },
    formula(){return hasQU(3) || hasChallenge(2) ? "(x + 1)<sup>" + (hasChallenge(2) ? '4' : '2') + "</sup>" : "x + 1"},
    eff() {
      return player.buyables[4].add(1).pow(hasQU(3) || hasChallenge(2) ? (hasChallenge(2)?4:2) : 1)
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
    formula() {return player.buyables[5].gte(funcSoftcapStart()) ? format(BUYABLES[5].base()) + "<sup>" + funcSoftcapStart() + "</sup>*" + format(BUYABLES[5].base()) + "<sup>(x-" + funcSoftcapStart() + ")<sup>0.5</sup></sup>" : format(BUYABLES[5].base()) + "<sup>x</sup>"},
    base() {
      let base = new Decimal(1.3)
      if(hasQU(9)) base = base.add(0.2)
      base = base.add(sacEffect('y'))
      return base
    },
    eff() {
      if(player.buyables[5].gte(funcSoftcapStart())){
        return player.challenge == 1 ? new Decimal(1) : new Decimal(BUYABLES[5].base()).pow(funcSoftcapStart()).mul(Decimal.pow(BUYABLES[5].base(),player.buyables[5].sub(funcSoftcapStart()).max(0).pow(0.5)))
      }else{
        return player.challenge == 1 ? new Decimal(1) : new Decimal(BUYABLES[5].base()).pow(player.buyables[5])
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
    formula() {return player.buyables[6].gte(funcSoftcapStart()) ? format(BUYABLES[6].base()) + "<sup>" + funcSoftcapStart() + "</sup>*" + format(BUYABLES[6].base()) + "<sup>(x-" + funcSoftcapStart() + ")<sup>0.5</sup></sup>" : format(BUYABLES[6].base()) + "<sup>x</sup>"},
    base() {
      let base = new Decimal(1.6)
      if(hasQU(9)) base = base.add(0.2)
      base = base.add(sacEffect('y'))
      return base
    },
    eff() {
      if(player.buyables[6].gte(funcSoftcapStart())){
        return new Decimal(BUYABLES[6].base()).pow(funcSoftcapStart()).mul(Decimal.pow(BUYABLES[6].base(),player.buyables[6].sub(funcSoftcapStart()).max(0).pow(0.5)))
      }else{
        return new Decimal(BUYABLES[6].base()).pow(player.buyables[6])
      }
    },
    unl() {
      return hasUpgrade(4)
    },
  },
};

function buyBuyable(x) {
  if(player.points.gte(BUYABLES[x].cost())){
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[x].cost())
    player.buyables[x] = player.buyables[x].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
}

function buildingMultipliers() {
  let mult = new Decimal(1);
  mult = mult.mul(BUYABLES[4].eff()).mul(BUYABLES[5].eff()).mul(BUYABLES[6].eff())
  if(hasUpgrade(2)) mult = mult.mul(2)
  if(hasQU(1)) mult = mult.mul(QUAD_UPGRADES[1].eff())
  if(hasQU(13)) mult = mult.mul(QUAD_UPGRADES[13].eff())
  if(hasSU(2)) mult = mult.mul(SQRT_UPGRADES[2].eff())
  if(hasUpgrade(5)) mult = mult.mul(1000)
  if(hasSU(9)) mult = mult.mul(SQRT_UPGRADES[9].eff())
  if(hasSU(10)) mult = mult.mul(SQRT_UPGRADES[10].eff())
  if(hasChallenge(9)) mult = mult.mul(CHALLENGES[9].effect())
  return mult
}

function buildingCostScaling() {
  let scale = new Decimal(1.15)
  if(hasUpgrade(1)) scale = scale.sub(0.05)
  if(hasChallenge(3)) scale = scale.sub(0.025)
  if(player.challenge == 3) scale = scale.mul(3)
  return scale
}

function functionCostScaling(x) {
  switch (x) {
    case 1:
      let scale1 = 2
      if(hasChallenge(3)) scale1 = scale1 / 1.75
      if(player.challenge == 3) scale1 = scale1 * 3
      return scale1
    break;
    case 2:
      let scale2 = 5
      if(hasChallenge(3)) scale2 = scale2 / 1.75
      if(player.challenge == 3) scale2 = scale2 * 3
      return scale2
    break;
    case 3:
      let scale3 = 7
      if(hasChallenge(3)) scale3 = scale3 / 1.75
      if(player.challenge == 3) scale3 = scale3 * 3
      return scale3
    break;
  }
}

function funcSoftcapStart() {
  let softcap = new Decimal(15)
  if(hasQU(11)) softcap = softcap.add(10)
  if(hasChallenge(3)) softcap = softcap.add(75)
  return softcap
}