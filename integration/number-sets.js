const NumberSets = {
  1: {
    title: "Natural",
    symbol: "ℕ",
    unlocked() {return player.integrations.gte(1)},
    eff(x) {
      if(player.integration.challenge == 2) return x == 2 ? new Decimal(0) : new Decimal(1)
      switch (x) {
        case 1:
          return Decimal.add(1,player.integration.assignedSets[1].add(1).log10().add(1).log10().div(100).pow(0.5)) // point exponent
        break;
        case 2:
          return player.integration.assignedSets[1].add(1).log10().mul(500).mul(IntegrationUpgrades.points7.isBought() ? 100 : 1).floor() // function softcap delay
        break;
        case 3:
          let x = Decimal.pow(10,player.integration.assignedSets[1].add(1).log10().add(1).pow(4).sub(1)).pow(IntegrationUpgrades.points7.isBought() ? 1000 : 1) // production of buildings mult
          if(x.gt("1e10000000")) x = x.div("1e10000000").pow(0.5).mul("1e10000000")
          if(x.gt("1e2e7")) x = Decimal.pow(10,x.div("1e2e7").log10().pow(0.9)).mul("1e2e7")
          x = x.min("1e4e7")
          return x
        break;
        case 4:
          return Decimal.add(1,player.integration.assignedSets[1].add(1).log10().add(1).log2().div(hasChargedQU(10) ? 2.5 : 3)).pow(TrigFunctions[1].setEff()) // Y cost scaling divider
        break;
      }
    },
    desc(x) {
      switch (x) {
        case 1:
          return `Point gain is powered ^${regularFormat(this.eff(x),3)}`
        break;
        case 2:
          return `+${formatWhole(this.eff(x))} g(n) and h(n) softcap starts`
        break;
        case 3:
          return `${format(this.eff(x))}x point production and production of Buildings`
        break;
        case 4:
          return `/${format(this.eff(x))} Y cost scaling`
        break;
      }
    },
  },
  2: {
    title: "Rational",
    symbol: "ℚ",
    unlocked() {return player.integrations.gte(2)},
    eff(x) {
      if(player.integration.challenge == 2) return new Decimal(1)
      switch (x) {
        case 1:
          return player.integration.assignedSets[2].add(1).pow(100).pow(IntegrationUpgrades.quadratic7.isBought() ? 5000 : 1) // x^2 multiplier
        break;
        case 2:
          return player.integration.assignedSets[2].add(1).log2().add(1).pow(TrigFunctions[2].setEff()) // quadratic count mult
        break;
        case 3:
          return Decimal.add(1,player.integration.assignedSets[2].add(1).log10().add(1).log10().div(100).pow(0.5).div(2)) // RE and CE exponent
        break;
        case 4:
          return Decimal.add(1,player.integration.assignedSets[2].add(1).log10().add(1).log10().div(100).pow(0.5).mul(2)) // QP and IP exponent
        break;
      }
    },
    desc(x) {
      switch (x) {
        case 1:
          return `${format(this.eff(x))}x x² gain`
        break;
        case 2:
          return `${format(this.eff(x))}x Quadratics gain`
        break;
        case 3:
          return `RE and CE gains are raised ^${regularFormat(this.eff(x),3)}`
        break;
        case 4:
          return `QP and IP gains are raised ^${regularFormat(this.eff(x),3)}`
        break;
      }
    },
  },
  3: {
    title: "Complex",
    symbol: "ℂ",
    unlocked() {return player.integrations.gte(3)},
    eff(x) {
      if(player.integration.challenge == 2) return new Decimal(1)
      switch (x) {
        case 1:
          return player.integration.assignedSets[3].add(1).pow(20).pow(TrigFunctions[3].setEff()).min(new Decimal("1e1.7e10").pow(SinusoidalUpgrades.has(32) ? SinusoidalUpgrades[32].eff() : 1)) // i multiplier
        break;
        case 2:
          return player.integration.assignedSets[3].add(1).pow(200) // Complex Plane powers mult
        break;
        case 3:
          return player.integration.assignedSets[3].pow(0.5).add(1) // free UP multiplier
        break;
        case 4:
          return BasicHypercompUpgrades.has(2) ? Decimal.pow(2,player.integration.assignedSets[3].add(1).log(3).add(1)) : player.integration.assignedSets[3].add(1).log(3).add(1) // complex count multiplier
        break;
      }
    },
    desc(x) {
      switch (x) {
        case 1:
          return `${format(this.eff(x))}x i gain`
        break;
        case 2:
          return `${format(this.eff(x))}x first 3 Complex Plane powers production`
        break;
        case 3:
          return `${format(this.eff(x))}x Upgrade Points from zi`
        break;
        case 4:
          return `${format(this.eff(x))}x Complexes gain`
        break;
      }
    },
  },
  4: {
    title: "Real",
    symbol: "ℝ",
    unlocked() {return player.integrations.gte(4)},
    eff(x) {
      if(player.integration.challenge == 2) return new Decimal(1)
      switch (x) {
        case 1:
          return player.integration.assignedSets[4].add(1).pow(10).pow(TrigFunctions[4].setEff()).min(new Decimal("1e6e8").pow(SinusoidalUpgrades[36].eff())) // y^2 multiplier
        break;
        case 2:
          return player.integration.assignedSets[4].add(1).pow(5) // circles multiplier
        break;
        case 3:
          return player.integration.assignedSets[4].add(1).pow(4) // revolutions multiplier
        break;
        case 4:
          return Decimal.add(1,player.integration.assignedSets[4].add(1).log10().add(1).log(4).div(2)) // Z cost scaling divider
        break;
      }
    },
    desc(x) {
      switch (x) {
        case 1:
          return `${format(this.eff(x))}x y² gain`
        break;
        case 2:
          return `${format(this.eff(x))}x circles gain`
        break;
        case 3:
          return `${format(this.eff(x))}x i exponent generation`
        break;
        case 4:
          return `/${format(this.eff(x))} Z cost`
        break;
      }
    },
  },
  5: {
    title: "Integer",
    symbol: "ℤ",
    unlocked() {return player.integrations.gte(5)},
    eff(x) {
      if(player.integration.challenge == 2) return new Decimal(1)
      switch (x) {
        case 1:
          return player.integration.assignedSets[5].add(1).pow(10) // polynomial efficiency mult
        break;
        case 2:
          return player.integration.assignedSets[5].add(1).pow(2).pow(IntegrationUpgrades.polynomials5.isBought() ? 1.5 : 1) // SE gain multiplier
        break;
        case 3:
          return Decimal.add(1,player.integration.assignedSets[5].add(1).log10().add(1).log10().div(100).pow(0.5).div(4).mul(TrigFunctions[5].setEff())).min(Decimal.add(1.55,SinusoidalUpgrades.has(32) ? SinusoidalUpgrades[32].eff2() : 0)) // power to polynomial efficiency
        break;
        case 4:
          return Decimal.add(1,player.integration.assignedSets[5].add(1).log10().add(1).log10().div(100).pow(0.5).mul(1.5)) // power to PP factor in empty sets formula
        break;
      }
    },
    desc(x) {
      switch (x) {
        case 1:
          return `${format(this.eff(x))}x polynomial efficiency`
        break;
        case 2:
          return `${format(this.eff(x))}x SE gain`
        break;
        case 3:
          return `Polynomial efficiency is raised ^${regularFormat(this.eff(x),3)}`
        break;
        case 4:
          return `PP factor in empty sets formula is raised ^${regularFormat(this.eff(x),3)}`
        break;
      }
    },
  },
  6: {
    title: "Algebraic",
    symbol: "𝔸",
    unlocked() {return player.integration.chalCompletions[2] >= 3},
    eff(x) {
      if(player.integration.challenge == 2) return new Decimal(1)
      switch (x) {
        case 1:
          return player.integration.assignedSets[6].pow(0.075).add(1) // dx multiplier
        break;
        case 2:
          return player.integration.assignedSets[6].pow(0.05).add(1) // empty sets multiplier
        break;
        case 3:
          return player.integration.assignedSets[6].add(1).log10().div(10).add(1) // global speed multiplier
        break;
        case 4:
          return Decimal.add(1,player.integration.assignedSets[6].add(1).log10().add(1).log10().div(100)) // x^2 gain power
        break;
        case 5:
          return Decimal.add(1,player.integration.assignedSets[6].add(1).log10().add(1).log10().div(150)) // i gain power
        break;
        case 6:
          return Decimal.add(1,player.integration.assignedSets[6].add(1).log10().add(1).log10().div(200)) // y^2 gain power
        break;
      }
    },
    desc(x) {
      switch (x) {
        case 1:
          return `${format(this.eff(x))}x dx gain`
        break;
        case 2:
          return `${format(this.eff(x))}x empty sets gain`
        break;
        case 3:
          return `${format(this.eff(x))}x global speed`
        break;
        case 4:
          return `x² gain is raised ^${regularFormat(this.eff(x),3)}`
        break;
        case 5:
          return `i gain is raised ^${regularFormat(this.eff(x),3)}`
        break;
        case 6:
          return `y² gain is raised ^${regularFormat(this.eff(x),3)}`
        break;
      }
    },
  },
  7: {
    unlocked() {return Alterations.has(6)},
    unlockAmount(x) {
      let arr = [null,new Decimal("1e180000"),new Decimal("1e220000"),new Decimal("1e550000"),new Decimal("1e770000")]
      return arr[x]
    },
    effUnlocked(x) {
      return player.integration.assignedSets[7].gte(this.unlockAmount(x))
    },
    eff(x) {
      if(player.integration.challenge == 2 || !this.effUnlocked(x)) return new Decimal(1)
      switch (x) {
        case 1:
          return player.integration.assignedSets[7].add(1).log10().div(5000) // power to square root hardcap start
        break;
        case 2:
          return Decimal.div(1,player.integration.assignedSets[7].add(1).log10().add(1).log10().div(4).add(1)) // power to y^2z^2 cost
        break;
        case 3:
          return Decimal.add(1,player.integration.assignedSets[7].add(1).log10().add(1).log10().add(1).div(50)) // power to global speed
        break;
        case 4:
          return Decimal.add(1,player.integration.assignedSets[7].add(1).log10().add(1).log10().add(1).div(75)) // power to gain of hypercomplex flune powers
        break;
      }
    },
    desc(x) {
      switch (x) {
        case 1:
          return `^${format(this.eff(x))} Square Root Hardcap start`
        break;
        case 2:
          return `^${format(this.eff(x))} y²z² cost`
        break;
        case 3:
          return `^${format(this.eff(x))} global speed`
        break;
        case 4:
          return `^${format(this.eff(x))} Hypercomplex Flune powers production`
        break;
      }
    },
  },
  assort(x) {
    if(player.integration.emptySets.gt(0) && NumberSets[x].unlocked()) {
      player.integration.emptySets = player.integration.emptySets.sub(1)
      player.integration.assignedSets[x] = player.integration.assignedSets[x].add(1)
    }
  },
  isActive(type, x) {
    return player.integration.active[type].includes(x)
  },
  activate(type, secondType, x) {
    // first type corresponds to slot types, second type corresponds to active effects/types arrays
    if(player.integration[type][0] > 0) {
      player.integration[type][0] -= 1
      player.integration.active[secondType].push(x)
    }
  },
  respec(force) {
    if (force || confirm("Are you sure you want to respec your Number Set slots? You will Integrate with no reward!")) {
      player.integration.effectSlots[0] = player.integration.effectSlots[1]
      player.integration.typeSlots[0] = player.integration.typeSlots[1]
      player.integration.active = {effects: [], types: []}
      if(!force) IntegrationPrestige.integrate(true)
    }
  },
  effect(type, effect) {
    if(type < 7) {
      return NumberSets.isActive("effects",(type*4)+effect-4) ? NumberSets[type].eff(effect) : new Decimal(type == 1 && effect == 2 ? 0 : 1)
    } else {
      return NumberSets[type].effUnlocked(effect) ? NumberSets[type].eff(effect) : 1
    }
  },
  cost(type) {
    if(type == "effectSlots") {
      let arr = [null,null,new Decimal(6),new Decimal(36),new Decimal(1e7),new Decimal(1e11),new Decimal(1e15),new Decimal(1e19),new Decimal(1e27),new Decimal(1e38),new Decimal(1e42),new Decimal(1e62),new Decimal(1e79),new Decimal(1e125),new Decimal(1e175),new Decimal(1e220),new Decimal("1e395"),new Decimal("1e420"),new Decimal("1e480"),new Decimal("1e580"),new Decimal("6.66e666"),new Decimal("7.77e777"),new Decimal("1e840"),new Decimal("1.01e1010"),new Decimal("1e1500"),new Decimal("1e2300"),new Decimal(Infinity)]
      return arr[player.integration[type][1]]
    } else if (type == "typeSlots") {
      let arr = [null,new Decimal(6),new Decimal(100),new Decimal(1e16),new Decimal(1e150),new Decimal("1e415"),new Decimal(Infinity)]
      return arr[player.integration[type][1]]
    }
  },
  buy(type) {
    if(player.integration.dx.gte(NumberSets.cost(type))) {
      player.integration.dx = player.integration.dx.sub(NumberSets.cost(type))
      player.integration[type][0] += 1
      player.integration[type][1] += 1
    }
  },
  distribute(percent) {
    if(player.integration.emptySets.gte(NumberSets[6].unlocked() ? (NumberSets[7].unlocked ? 7 : 6) : 5)) {
      let x = player.integration.emptySets.div(NumberSets[6].unlocked() ? (NumberSets[7].unlocked ? 7 : 6) : 5).mul(percent/100).floor()
      for (let i = 1; i < (NumberSets[6].unlocked() ? (NumberSets[7].unlocked ? 8 : 7) : 6); i++) {
        if(!BasicHypercompUpgrades.has(1)) player.integration.emptySets = player.integration.emptySets.sub(x)
        player.integration.assignedSets[i] = player.integration.assignedSets[i].add(x)
      }
    }
    if(player.integration.emptySets.lt(0)) player.integration.emptySets = new Decimal(0)
  },
  sacrifice(set,percent) {
    let sac = player.integration.assignedSets[set].mul(percent/100)
    if(!BasicHypercompUpgrades.has(1)) player.integration.assignedSets[set] = player.integration.assignedSets[set].sub(sac)
    player.integration.setSacrificeValues[set] = player.integration.setSacrificeValues[set].add(sac.mul(IntegrationChallenges[1].eff()))

    if(player.dailyAchievements[0].includes('114') && !player.dailyAchievements[1].includes('114') && sac.gte(1e10) && percent >= 100){
      player.dailyAchievements[1].push('114')
      $.notify("Daily Achievement Unlocked: " + DailyAchievements.standardize('114').name, {
        style: 'apcurrent',
        className:'dailyAchieves',
      });
    }
  },
  sacrificeValueEffects(x) {
    switch (x) {
      case 1:
        return player.integration.setSacrificeValues[x].add(1).log10().add(1).pow(Decimal.add(1,Derivatives.buyables[3].eff()))
      break
      case 2:
        return player.integration.setSacrificeValues[x].add(1).log10().add(1).log10().div(8).add(1).pow(Decimal.add(1,Derivatives.buyables[3].eff()))
      break
      case 3:
        return player.integration.setSacrificeValues[x].add(1).log10().div(3).add(1).pow(0.75).pow(Decimal.add(1,Derivatives.buyables[3].eff()))
      break
      case 4:
        return player.integration.setSacrificeValues[x].add(1).log10().add(1).log10().div(4).add(1).pow(Decimal.add(1,Derivatives.buyables[3].eff()))
      break
      case 5:
        return player.integration.setSacrificeValues[x].add(1).log10().add(1).log2().div(5).add(1).pow(Decimal.add(1,Derivatives.buyables[3].eff()))
      break;
      case 6:
        return player.integration.setSacrificeValues[x].add(1).log10().add(1).log10().div(5000).add(1).pow(Decimal.add(1,Derivatives.buyables[3].eff())).add(BasicHypercompUpgrades.has(10) ? BasicHypercompUpgrades[10].eff() : 0).min(new Decimal(1.00125).add(hasChargedQU(5) ? 0.00015 : 0).add(Y_CHALLENGES[6].eff()))
      break;
    }
  },
  setPercentage(x) {
    let imported = new Decimal(prompt("Set your desired percentage in the input box below!"))
    player.integration.autobuyers.numberSetAutoModes[x] = imported.min(99).max(0).floor().toNumber()
  },
  export() {
    let str = player.integration.active.types.toString() + ";" + player.integration.active.effects.toString();
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(el);
    $.notify('Number Sets preset exported!', {
      style: 'apcurrent',
      className:'saving',
    });
  },
  load(imported = undefined) {
    if (imported === undefined) imported = prompt("Paste your Number Sets preset in the input box below! (This will reset your run with no reward!)")
    let arr = imported.split(";")[0].split(",");
    NumberSets.respec(true)
    IntegrationPrestige.integrate(true)
    for (let i = 0; i < arr.length; i++) {
      NumberSets.activate('typeSlots','types',new Decimal(arr[i]).toNumber())
    }
    let arr2 = imported.split(";")[1].split(",")
    for (let j = 0; j < arr2.length; j++) {
      NumberSets.activate('effectSlots','effects',new Decimal(arr2[j]).toNumber())
    }
  },
  savePreset(x) {
    const answer = prompt("Type your exported Number Sets preset in here!\nIf you type nothing, it will save your current preset")
    if (answer===null) return false
    let str = player.integration.active.types.toString() + ";" + player.integration.active.effects.toString();
    player.presets.info[x] = answer||str
  },
  loadPreset(x) {
    this.load(player.presets.info[x])
  },
}