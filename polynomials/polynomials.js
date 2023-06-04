function polyPowerEffect() {
  return Decimal.add(1,player.polyPower.add(1).pow(Decimal.add(1,POLY_BUYABLES[3].eff())).log10().pow(0.75).div(500))
}

function updatePolynomials(diff) {
  for(let i=3; i<10; i++){
    player.polynomials[i].amount=player.polynomials[i].amount.add(polynomialGen(i+1).mul(diff))
  }
  player.polyPower = player.polyPower.add(polynomialGen(3).mul(diff))
}

function polynomialCosts(x) {
  switch (x) {
    case 3:
      return new Decimal("1e3200000").mul(Decimal.pow("1e300000",player.polynomials[3].bought)).mul(Decimal.pow("1e100000",player.polynomials[3].bought.sub(13).max(0).pow(1.75).floor()))
    break;
    case 4:
      return new Decimal(4).mul(Decimal.pow(5,player.polynomials[4].bought)).mul(Decimal.pow(25,player.polynomials[4].bought.sub(308).max(0).pow(1.75).floor()))
    break;
    case 5:
      return new Decimal(8).mul(Decimal.pow(16,player.polynomials[5].bought)).mul(Decimal.pow(256,player.polynomials[5].bought.sub(90).max(0).pow(1.75).floor()))
    break;
    case 6:
      return new Decimal(4).mul(Decimal.pow(64,player.polynomials[6].bought))
    break;
    case 7:
      return new Decimal(5).mul(Decimal.pow(216,player.polynomials[7].bought))
    break;
    case 8:
      return new Decimal(6).mul(Decimal.pow(3072,player.polynomials[8].bought))
    break;
    case 9:
      return new Decimal(6).mul(Decimal.pow(10240,player.polynomials[9].bought))
    break;
    case 10:
      return player.polynomials[10].boughtThisRun ? new Decimal(Infinity) : new Decimal(9)
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
  return Decimal.pow(2,player.polynomials[x].bought).mul(player.polynomials[x].amount).mul(x == 3 ? Y_CHALLENGES[3].eff() : new Decimal(1)).mul(seEffect()).mul(POLY_BUYABLES[6].eff()).mul(hasPermUpgrade(8)?10:1)
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