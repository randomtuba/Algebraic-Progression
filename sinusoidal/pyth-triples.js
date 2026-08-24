const PythagoreanTriples = {
  peGen() {
    let gain = player.pythTriples.def[1].mul(player.pythTriples.def[2]).pow(player.pythTriples.def[3].div(4).sub(0.25))
    if(PythagoreanTriples.hasMilestone(5)) gain = gain.mul(PythagoreanTriples.barMilestones[5].eff())
    if(Alterations.has(1)) gain = gain.mul(100)
    if(PythagoreanTriples.hasMilestone(3)) gain = gain.mul(Decimal.pow(1000,player.w))
    if(HypercompUpgrades.has(14)) gain = gain.mul(HypercompUpgrades[14].eff2())
    gain = gain.mul(HypercompFlune[8].eff())
    if(BasicHypercompUpgrades.has(8)) gain = gain.mul(TemporalPlane.totalEffect())
    if(!player.pythTriples.def[1].pow(2).round().add(player.pythTriples.def[2].pow(2).round()).eq(player.pythTriples.def[3].pow(2).round()) || (player.pythTriples.def[1] == 0 || player.pythTriples.def[2] == 0 || player.pythTriples.def[3] == 0)) gain = new Decimal(0)
    return gain
  },
  maxDEF() {
    return new Decimal(10).add(PythagoreanTriples.buyables[4].eff())
  },
  doItForMe() {
    if(player.dailyAchievements[0].includes('163') && !player.dailyAchievements[1].includes('163') && player.pythTriples.def[1].eq(new Decimal(PythagoreanTriples.maxDEF().mul(0.6))) && player.pythTriples.def[2].eq(new Decimal(PythagoreanTriples.maxDEF().mul(0.8))) && player.pythTriples.def[3].eq(new Decimal(PythagoreanTriples.maxDEF()))){
      player.dailyAchievements[1].push('163')
      $.notify("Daily Achievement Unlocked: " + DailyAchievements.standardize('163').name, {
        style: 'apcurrent',
        className:'dailyAchieves',
      });
    }
    player.pythTriples.def[1] = new Decimal(PythagoreanTriples.maxDEF().mul(0.6))
    player.pythTriples.def[2] = new Decimal(PythagoreanTriples.maxDEF().mul(0.8))
    player.pythTriples.def[3] = new Decimal(PythagoreanTriples.maxDEF())
  },
  buyables: {
    1: {
      title: "Variable Extruder",
      desc: "Divide the Z cost by +0.1 per purchase",
      cost() {
        return new Decimal(100000).mul(Decimal.pow(3000,player.pythTriples.buyables[1])).mul(Decimal.pow(3,player.pythTriples.buyables[1].pow(2)))
      },
      eff() {
        return Decimal.add(1,player.pythTriples.buyables[1].add(HypercompFlune[5].eff()).div(10))
      },
      effectDisplay() {
        return "/" + format(this.eff()) + " Z cost";
      },
    },
    2: {
      title: "Synthetic Enhancer",
      desc: "Multiply SE gain by 1.00e100 per purchase",
      cost() {
        return new Decimal(5000000).mul(Decimal.pow(1000,player.pythTriples.buyables[2])).mul(Decimal.pow(2.5,player.pythTriples.buyables[2].pow(2)))
      },
      eff() {
        return Decimal.pow(1e100,player.pythTriples.buyables[2].add(HypercompFlune[5].eff()))
      },
      effectDisplay() {
        return format(this.eff()) + "x SE gain";
      },
    },
    3: {
      title: "Challenge Revitalizer",
      desc: "Power the IC1 reward effect by +0.1 per purchase",
      cost() {
        return new Decimal(1e20).mul(Decimal.pow(400,player.pythTriples.buyables[3])).mul(Decimal.pow(1.75,player.pythTriples.buyables[3].pow(2)))
      },
      eff() {
        return Decimal.add(1,player.pythTriples.buyables[3].add(HypercompFlune[5].eff()).div(10))
      },
      effectDisplay() {
        return "^" + format(this.eff()) + " IC1 reward effect";
      },
    },
    4: {
      title: "Horizon Shifter",
      desc: "Add 5 to the d, e, and f limit per purchase",
      cost() {
        return new Decimal(1000000).mul(Decimal.pow(1000,player.pythTriples.buyables[4])).mul(Decimal.pow(2,player.pythTriples.buyables[4].pow(2))).pow(player.pythTriples.buyables[4].gte(58) && !PythagoreanTriples.hasMilestone(11) ? 1.5 : 1)
      },
      eff() {
        return player.pythTriples.buyables[4].add(HypercompFlune[5].eff()).mul(5)
      },
      effectDisplay() {
        return "+" + format(this.eff()) + " d, e, and f limit";
      },
    },
    buy(x) {
      if(player.pythTriples.essence.gte(PythagoreanTriples.buyables[x].cost())){
        player.pythTriples.essence = player.pythTriples.essence.sub(PythagoreanTriples.buyables[x].cost())
        player.pythTriples.buyables[x] = player.pythTriples.buyables[x].add(1)
      }
    },
  },
  barPercentage(x) {
    switch (x) {
      case 1:
        return player.pythTriples.bars[x].div("1e7e9").add(1).log10().div(1e8).toNumber() // max: 1e1.7e10
      break;
      case 2:
        return player.pythTriples.bars[x].div("1e5e8").add(1).log10().div(5e7).toNumber() // max: 1e5.5e9
      break;
      case 3:
        return player.pythTriples.bars[x].div("1e18").add(1).log10().div(30.825).toNumber() // max: 3.165e3100
      break;
    }
  },
  fillBar(x) {
    if(PythagoreanTriples.barPercentage(x) < 100) {
      switch (x) {
        case 1:
          let value = player.quadPower.div(10)
          player.quadPower = player.quadPower.sub(value)
          player.pythTriples.bars[x] = player.pythTriples.bars[x].add(value)
          player.pythTriples.bars[x] = player.pythTriples.bars[x].min("1e1.7e10")
        break;
        case 2:
          let value2 = player.imagPower.div(10)
          player.imagPower = player.imagPower.sub(value2)
          player.pythTriples.bars[x] = player.pythTriples.bars[x].add(value2)
          player.pythTriples.bars[x] = player.pythTriples.bars[x].min("1e5.5e9")
        break;
        case 3:
          let value3 = player.pythTriples.essence.div(10)
          player.pythTriples.essence = player.pythTriples.essence.sub(value3)
          player.pythTriples.bars[x] = player.pythTriples.bars[x].add(value3)
          player.pythTriples.bars[x] = player.pythTriples.bars[x].min("3.165e3100")
        break;
      }
    }
  },
  barMilestones: {
    1: {
      desc: "QP filled boosts Derivatives gain",
      req: 2.1,
      eff() {
        let x = Decimal.pow(3,PythagoreanTriples.barPercentage(1))
        if(x.gt(1000)) x = new Decimal(1000).mul(Decimal.pow(PythagoreanTriples.hasMilestone(2) ? 1.75 : 1.25,PythagoreanTriples.barPercentage(1) - 6.288))
        return x
      },
    },
    2: {
      desc: "Boost the previous effect and unlock autobuyers for Trigonometric Functions",
      req: 10.6,
    },
    3: {
      desc() {return `Gain more Pythagorean Essence based on ${player.wUnlocked ? `W` : `???`}`},
      req: 31,
    },
    4: {
      desc: "Unlock autobuyers for Derivative Buyables",
      req: 100,
    },
    5: {
      desc: "IP filled boosts Pythagorean Essence gain",
      req: 5,
      eff() {
        return Decimal.pow(1.5,PythagoreanTriples.barPercentage(2)).mul(100).pow(PythagoreanTriples.hasMilestone(8) ? 5 : 1)
      },
    },
    6: {
      desc: "Unlock antiderivatives and autobuyers for Derivative Functions",
      req: 5.6,
    },
    7: {
      desc: "dx gain is powered ^1.05",
      req: 48,
    },
    8: {
      desc: "The IP filled effect is powered ^5",
      req: 100,
    },
    9: {
      desc: "PE filled powers the secondary Unit Circle effects and unlock Auto-Adjust for Pythagorean Triples",
      req: 1.5,
      eff() {
        return Decimal.add(1,PythagoreanTriples.barPercentage(3) / (100 / 3)).min(PythagoreanTriples.hasMilestone(12) ? 3.2 : 3.15)
      },
    },
    10: {
      desc: "The 3rd Pythagorean Triples buyable also powers the 1st IC4 effect",
      req: 6.25,
    },
    11: {
      desc: "Unlock an autobuyer for Pythagorean Triples Buyables and the Horizon Shifter cost spike is removed",
      req: 69.42,
    },
    12: {
      desc: "The PE filled effect hardcap is ^3.2",
      req: 100,
    },
  },
  hasMilestone(x) {
    return PythagoreanTriples.barPercentage(x > 8 ? 3 : (x > 4 ? 2 : 1)) >= PythagoreanTriples.barMilestones[x].req
  },
}

function updateBars() {
  document.getElementById("qpBar").style.width = PythagoreanTriples.barPercentage(1) + "%";
  document.getElementById("ipBar").style.width = PythagoreanTriples.barPercentage(2) + "%";
  document.getElementById("peBar").style.width = PythagoreanTriples.barPercentage(3) + "%";
}