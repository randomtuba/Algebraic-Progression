function polyPowerEffect() {
  return Decimal.add(1,player.polyPower.add(1).pow(Decimal.add(1,POLY_BUYABLES[3].eff())).log10().pow(0.75).div(500)).min(1.420)
}

function updatePolynomials(diff) {
  if(!player.inLostIntegration) {
    for(let i=3; i<10; i++){
      player.polynomials[i].amount=player.polynomials[i].amount.add(polynomialGen(i+1).mul(diff))
    }
    if(player.integration.challenge != 6 || player.integration.ic6Version != 3) player.polyPower = player.polyPower.add(polynomialGen(3).mul(diff))
    for(let i=3; i<10; i++){
      player.yPolynomials[i].amount=player.yPolynomials[i].amount.add(YPolynomials.gen(i+1).mul(diff))
    }
    player.yPolyPower = player.yPolyPower.add(YPolynomials.gen(3).mul(diff))
  } else {
    for(let i=2; i<10; i++){
      player.polynomials[i].amount = player.polynomials[i].amount.add(XPowers.gen(i).mul(diff))
      player.polynomials[i].amount = player.polynomials[i].amount.min("1e250000")
    }
    if(FractalMilestones.has(12)) {
      for(let i=3; i<11; i++){
        player.yPolynomials[i].amount = player.yPolynomials[i].amount.add(YPowers.gen(i).mul(diff))
      }
    }
  }
}

function polynomialCosts(x) {
  switch (x) {
    case 3:
      return player.integrations.lt(1) && player.polynomials[3].bought.lt(1) ? new Decimal("1e2750000") : new Decimal("1e3200000").mul(Decimal.pow(Decimal.pow("1e300000",IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1),player.polynomials[3].bought)).mul(Decimal.pow(Decimal.pow("1e100000",IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1),player.polynomials[3].bought.sub(13).max(0).pow(player.polynomials[x].bought.gte(2000) ? 2 : 1.75).floor()))
    break;
    case 4:
      return player.integrations.lt(1) && player.polynomials[4].bought.lt(1) ? new Decimal(3) : new Decimal(4).mul(Decimal.pow(Decimal.pow(5,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1),player.polynomials[4].bought)).mul(Decimal.pow(Decimal.pow(25,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1),player.polynomials[4].bought.sub(308).max(0).pow(player.polynomials[x].bought.gte(2000) ? 2 : 1.75).floor()))
    break;
    case 5:
      return new Decimal(8).mul(Decimal.pow(Decimal.pow(16,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1),player.polynomials[5].bought)).mul(Decimal.pow(Decimal.pow(256,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1),player.polynomials[5].bought.sub(90).max(0).pow(player.polynomials[x].bought.gte(2000) ? 2 : 1.75).floor()))
    break;
    case 6:
      return new Decimal(4).mul(Decimal.pow(Decimal.pow(64,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1),player.polynomials[6].bought))
    break;
    case 7:
      return new Decimal(5).mul(Decimal.pow(Decimal.pow(216,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1),player.polynomials[7].bought))
    break;
    case 8:
      return new Decimal(6).mul(Decimal.pow(Decimal.pow(3072,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1),player.polynomials[8].bought))
    break;
    case 9:
      return new Decimal(6).mul(Decimal.pow(Decimal.pow(10240,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1),player.polynomials[9].bought))
    break;
    case 10:
      return new Decimal(9).mul(Decimal.pow(Decimal.pow(1e10,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1),player.polynomials[10].bought))
    break;
  }
}

function buyPolynomial(x) {
  if(x == 3 ? player.x2.gte(polynomialCosts(x)) : player.polynomials[x-1].amount.gte(polynomialCosts(x))){
    if(x == 3) {
      player.x2 = player.x2.sub(polynomialCosts(x))
    } else {
      player.polynomials[x-1].amount = player.polynomials[x-1].amount.sub(polynomialCosts(x))
    }
    player.polynomials[x].bought = player.polynomials[x].bought.add(1)
    player.polynomials[x].amount = player.polynomials[x].amount.add(1)
    if(x == 10) player.polynomials[10].boughtThisRun = true
  }
}

function polynomialGen(x) {
  let gain = polynomialEff(x)
  gain = gain.mul(player.polynomials[x].amount)
  gain = gain.mul(TemporalPlane.totalEffect())
  return gain
}

function polynomialEff(x) {
  let gain = Decimal.pow(polynomialPerPurchaseMultiplier(),player.polynomials[x].bought)
  if(x == 3) gain = gain.mul(Y_CHALLENGES[3].eff())
  gain = gain.mul(seEffect())
  gain = gain.mul(POLY_BUYABLES[6].eff())
  gain = gain.mul(RebuyableIntegrationUpgrades[2].eff())
  gain = gain.mul(NumberSets.effect(5,1))
  if(IntegrationUpgrades.polynomials2.isBought() && x > 6) gain = gain.mul(player.polyPower.pow(0.04).add(1))
  if(IntegrationUpgrades.polynomials6.isBought() && x == 10) gain = gain.mul(IntegrationUpgrades.polynomials6.eff())
  if(x == 10) gain = gain.mul(player.integration.polyFactoringMult)
  if(hasYQU(14,'bought') && x < 10) gain = gain.mul(YQUAD_UPGRADES[14].eff())
  gain = gain.pow(NumberSets.effect(5,3))
  if(SinusoidalUpgrades.has(13) && x < 5) gain = gain.pow(1.5)
  gain = gain.pow(YPolynomials.powerEffect())
  if(HypercompUpgrades.has(6)) gain = gain.pow(HypercompUpgrades[6].eff())
  if(HypercompUpgrades.has(7)) gain = gain.pow(HypercompUpgrades[7].eff())
  if(hasSDU(10)) gain = gain.pow(Decimal.add(1,new Decimal(x).sub(2).div(50)))
  
  let polyEffSoftcap = new Decimal("1e3000000")
  if(HypercompUpgrades.has(5)) polyEffSoftcap = polyEffSoftcap.mul(HypercompUpgrades[5].eff())
  
  if(gain.gt(polyEffSoftcap)) gain = Decimal.pow(10,gain.div(polyEffSoftcap).log10().pow(0.95)).mul(polyEffSoftcap)
  
  if(hasPermUpgrade(8)) gain = (gain.pow(1.01).gte(gain.mul(100)) ? gain.pow(1.01) : gain.mul(100))
  
  if(player.integration.inTheLimit) gain = gain.pow(Limit.challengeFactorEffects(9))
  if(player.integration.challenge == 6 && player.integration.ic6Version == 0) gain = gain.pow(0.5)
  return gain
}

function polynomialPerPurchaseMultiplier() {
  let mult = new Decimal(2)
  if(IntegrationUpgrades.polynomials1.isBought()) mult = new Decimal(3)
  if(SinusoidalUpgrades.has(13) && player.polyPower.gte("1e125000")) mult = mult.add(0.3)
  mult = mult.add(player.integration.rebuyableUpgrades[7].div(100))
  if(SinusoidalUpgrades.has(21)) mult = mult.add(SinusoidalUpgrades[21].eff())
  return mult
}

const POLY_BUYABLES = {
  1: {
    desc: "Add 0.1 to the zi power effect exponent per purchase",
    cost() {
      return new Decimal(100000).mul(Decimal.pow(100,player.polynomials.buyables[1])).mul(Decimal.pow(10,player.polynomials.buyables[1].mul(player.polynomials.buyables[1].add(1)).div(2)))
    },
    eff() {
      return player.polynomials.buyables[1].div(10)
    },
    effectDisplay() {
      return "+" + format(POLY_BUYABLES[1].eff()) + " zi power effect exponent";
    },
  },
  2: {
    desc: "Add 0.5 to the YC1 and YC2 effect exponents per purchase",
    cost() {
      return new Decimal(10000).mul(Decimal.pow(1000,player.polynomials.buyables[2])).mul(Decimal.pow(10,player.polynomials.buyables[2].mul(player.polynomials.buyables[2].add(1)).div(2)))
    },
    eff() {
      return player.polynomials.buyables[2].div(2)
    },
    effectDisplay() {
      return "+" + format(POLY_BUYABLES[2].eff()) + " YC1 and YC2 effect exponents";
    },
  },
  3: {
    desc: "Add 0.1 to the exponent before the log in the PP effect formula per purchase",
    cost() {
      return new Decimal(100000).mul(Decimal.pow(10000,player.polynomials.buyables[3])).mul(Decimal.pow(10,player.polynomials.buyables[3].mul(player.polynomials.buyables[3].add(1)).div(2)))
    },
    eff() {
      return player.polynomials.buyables[3].div(10)
    },
    effectDisplay() {
      return "+" + format(POLY_BUYABLES[3].eff()) + " exponent before log in PP effect formula";
    },
  },
  4: {
    desc: "Multiply SE gain by 1.5 per purchase",
    cost() {
      return new Decimal(1000000).mul(Decimal.pow(1000,player.polynomials.buyables[4])).mul(Decimal.pow(10,player.polynomials.buyables[4].mul(player.polynomials.buyables[4].add(1)).div(2)))
    },
    eff() {
      return Decimal.pow(1.5,player.polynomials.buyables[4])
    },
    effectDisplay() {
      return format(POLY_BUYABLES[4].eff()) + "x SE gain";
    },
  },
  5: {
    desc: "Double free UP per purchase",
    cost() {
      return new Decimal(1000000).mul(Decimal.pow(10000,player.polynomials.buyables[5])).mul(Decimal.pow(10,player.polynomials.buyables[5].mul(player.polynomials.buyables[5].add(1)).div(2)))
    },
    eff() {
      return Decimal.pow(2,player.polynomials.buyables[5])
    },
    effectDisplay() {
      return format(POLY_BUYABLES[5].eff()) + "x free UP";
    },
  },
  6: {
    desc: "Multiply the efficiency of all polynomials by 5x per purchase",
    cost() {
      return new Decimal(1e15).mul(Decimal.pow(1e6,player.polynomials.buyables[6])).mul(Decimal.pow(100,player.polynomials.buyables[6].mul(player.polynomials.buyables[6].add(1)).div(2)))
    },
    eff() {
      return Decimal.pow(5,player.polynomials.buyables[6])
    },
    effectDisplay() {
      return format(POLY_BUYABLES[6].eff()) + "x polynomial efficiency";
    },
  },
}

function buyPolyBuyable(x) {
  if(player.polynomials[x+2].amount.gte(POLY_BUYABLES[x].cost())){
    player.polynomials[x+2].amount = player.polynomials[x+2].amount.sub(POLY_BUYABLES[x].cost())
    player.polynomials.buyables[x] = player.polynomials.buyables[x].add(1)
  }
}

function buyMaxPolynomials() {
  for (let i = 3; i <= 10; i++) {
    while (i == 3 ? player.x2.gte(polynomialCosts(i)) : player.polynomials[i-1].amount.gte(polynomialCosts(i))) {
      buyPolynomial(i)
    }
  }
}

function polyFactoringFormula() {
  let x = player.polyPower.pow(0.01).add(1)
  if(IntegrationUpgrades.polynomials7.isBought()) x = x.pow(1.2)
  x = x.pow(NumberSets.sacrificeValueEffects(5))
  if(x.gt("1e76000")) x = x.div("1e76000").pow(0.5).mul("1e76000")
  if(HypercompUpgrades.has(8)) x = x.pow(HypercompUpgrades[8].eff())
  return x
}

function factorPolynomials() {
  if(polyFactoringFormula().div(player.integration.polyFactoringMult).gte(1)) {
    player.integration.polyFactoringMult = polyFactoringFormula()
    if(!SinusoidalUpgrades.has(13)) {
      player.polyPower = new Decimal(0)
      player.polynomials = {
        3: { amount: new Decimal(0), bought: new Decimal(0), },
        4: { amount: new Decimal(0), bought: new Decimal(0), },
        5: { amount: new Decimal(0), bought: new Decimal(0), },
        6: { amount: new Decimal(0), bought: new Decimal(0), },
        7: { amount: new Decimal(0), bought: new Decimal(0), },
        8: { amount: new Decimal(0), bought: new Decimal(0), },
        9: { amount: new Decimal(0), bought: new Decimal(0), },
        10: { amount: new Decimal(0), bought: new Decimal(0), boughtThisRun: false },
        buyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      }
    }
  }
}