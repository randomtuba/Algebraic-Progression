const HypercompUpgrades = {
  1: {
    desc: "The h(n) softcap start powers point gain at a reduced rate. (^0.005)",
    cost: new Decimal(3),
    eff() {return funcSoftcapStart().pow(0.005)},
    effectDisplay() {return "^" + format(HypercompUpgrades[1].eff()) + " production"},
  },
  2: {
    desc: "Gain more x² based on points.",
    cost: new Decimal(3),
    eff() {
      let x = player.points.pow(0.01).add(1)
      if(x.gt("1e4e11")) x = Decimal.pow(10,x.div("1e4e11").log10().pow(hasChargedQU(8) ? 0.925 : 0.9)).mul("1e4e11")
      return x
    },
    effectDisplay() {return format(HypercompUpgrades[2].eff()) + "x x² gain"},
  },
  3: {
    desc: "Gain more i based on X.",
    cost: new Decimal(3),
    eff() {
      return Decimal.pow(1.00001,player.x).pow(0.01).min("1e3.5e11")
    },
    effectDisplay() {return format(HypercompUpgrades[3].eff()) + "x i gain"},
  },
  4: {
    desc: "Power y² gain based on your global speed multiplier.",
    cost: new Decimal(3),
    eff() {return Decimal.add(1,TemporalPlane.totalEffect().log10().div(300).mul(BasicHypercompUpgrades.has(3) ? 2 : 1)).min(1.35)},
    effectDisplay() {return "^" + format(HypercompUpgrades[4].eff()) + " y² gain"},
  },
  5: {
    desc: "Multiply the Polynomial efficiency softcap start based on quaternion purchases.",
    cost: new Decimal(6),
    eff() {
      let x = Decimal.pow("1e150000",player.hypercompUpgs.purchases[0]+player.hypercompUpgs.purchases[1]+player.hypercompUpgs.purchases[2])
      if(x.gt("1e2400000")) x = x.div("1e2400000").pow(0.5).mul("1e2400000")
      return x
    },
    effectDisplay() {return format(HypercompUpgrades[5].eff()) + "x Polynomial softcap start"},
  },
  6: {
    desc: "Power Polynomial efficiency based on W.",
    cost: new Decimal(6),
    eff() {return Decimal.add(1,player.w.div(50).min(0.08).mul(BasicHypercompUpgrades.has(3) ? 2 : 1))},
    effectDisplay() {return "^" + format(HypercompUpgrades[6].eff()) + " Polynomial efficiency"},
  },
  7: {
    desc: "Power Polynomial efficiency based on revolutions.",
    cost: new Decimal(6),
    eff() {return Decimal.add(1,player.varSynth.revolutions.add(1).log10().add(1).log10().div(1000).mul(BasicHypercompUpgrades.has(3) ? 5 : 1))},
    effectDisplay() {return "^" + format(HypercompUpgrades[7].eff()) + " Polynomial efficiency"},
  },
  8: {
    desc: "Power the Polynomial Factoring multiplier formula based on circles, post-softcap.",
    cost: new Decimal(6),
    eff() {return Decimal.add(1,player.varSynth.circles.add(1).log10().add(1).log10().div(100))},
    effectDisplay() {return "^" + format(HypercompUpgrades[8].eff()) + " Polynomial Factoring mult"},
  },
  9: {
    desc: "Gain more dx based on your bought f(n) amount.",
    cost: new Decimal(9),
    eff() {return player.buyables[4].pow(15).add(1).pow(BasicHypercompUpgrades.has(5) ? 5 : 1)},
    effectDisplay() {return format(HypercompUpgrades[9].eff()) + "x dx gain"},
  },
  10: {
    desc: "Gain more limit score based on your times gone Complex.",
    cost: new Decimal(9),
    eff() {return player.complexes.add(1).log10().pow(0.75).add(1).pow(BasicHypercompUpgrades.has(5) ? 5 : 1)},
    effectDisplay() {return format(HypercompUpgrades[10].eff()) + "x limit score gain"},
  },
  11: {
    desc: "Multiply derivatives gain based on challenge essence.",
    cost: new Decimal(9),
    eff() {return player.challengeEssence.add(1).log10().pow(1.5).add(1).pow(BasicHypercompUpgrades.has(5) ? 5 : 1)},
    effectDisplay() {return format(HypercompUpgrades[11].eff()) + "x derivatives gain"},
  },
  12: {
    desc: "Gain more empty sets based on sacrificed Z.",
    cost: new Decimal(9),
    eff() {return player.sacZ.pow(2).add(1).pow(BasicHypercompUpgrades.has(5) ? 5 : 1)},
    effectDisplay() {return format(HypercompUpgrades[12].eff()) + "x empty sets gain"},
  },
  13: {
    desc: "Gain more triangles based on total Derivative buyables bought.",
    cost: new Decimal(12),
    eff() {return player.integration.derivatives.buyables[1].add(player.integration.derivatives.buyables[2]).add(player.integration.derivatives.buyables[3]).add(player.integration.derivatives.buyables[4]).add(player.integration.derivatives.buyables[5]).add(player.integration.derivatives.buyables[6]).add(player.integration.derivatives.buyables[7]).add(player.integration.derivatives.buyables[8]).pow(7.5).add(1)},
    effectDisplay() {return format(HypercompUpgrades[13].eff()) + "x triangles gain"},
  },
  14: {
    desc: "TW and PE boost each other.",
    cost: new Decimal(12),
    eff() {return player.pythTriples.essence.pow(0.5).add(1)}, // PE boost to TW
    eff2() {return player.trigFunctions.waves.pow(0.1).add(1)}, // TW boost to PE
    effectDisplay() {return format(HypercompUpgrades[14].eff()) + "x TW gain, " + format(HypercompUpgrades[14].eff2()) + "x PE gain"},
  },
  15: {
    desc: "Power the secondary Unit Circle effects based on Y-Polynomial power.",
    cost: new Decimal(12),
    eff() {return Decimal.add(1,player.yPolyPower.add(1).log10().pow(0.5).div(250))},
    effectDisplay() {return "^" + format(HypercompUpgrades[15].eff()) + " secondary Unit Circle effects"},
  },
  16: {
    desc: "Gain more j based on k.",
    cost: new Decimal(12),
    eff() {return player.k.pow(0.2).add(1)},
    effectDisplay() {return format(HypercompUpgrades[16].eff()) + "x j gain"},
  },
  buy(x) {
    if(player.quaternions[0].gte(HypercompUpgrades[x].cost) && !HypercompUpgrades.has(x)){
      player.quaternions[0] = player.quaternions[0].sub(HypercompUpgrades[x].cost)
      player.hypercompUpgs.dynamic.push(x)
    } else if (tmp.shiftToggleBehavior && HypercompUpgrades.has(x)) {
      player.quaternions[0] = player.quaternions[0].add(HypercompUpgrades[x].cost)
      player.hypercompUpgs.dynamic = singleUpgradeRespec(player.hypercompUpgs.dynamic,x)
      IntegrationPrestige.integrate(true)
    }
  },
  has(x) {
    return player.hypercompUpgs.dynamic.includes(x)
  },
  jGen() {
    let gain = Decimal.pow(2.25,player.w).mul(player.i.add(1).log10().div(2e8).add(1))
    if(HypercompUpgrades.has(16)) gain = gain.mul(HypercompUpgrades[16].eff())
    if(hasChargedQU(19)) gain = gain.pow(1.1)
    gain = gain.pow(SinusoidalUpgrades[34].eff())
    if(BasicHypercompUpgrades.has(8)) gain = gain.mul(TemporalPlane.totalEffect())
    if(hasPermUpgrade(16)) gain = gain.mul(PERM_UPGRADES[16].eff())
    return gain
  },
  kGen() {
    let gain = Decimal.pow(1.75,player.w).mul(player.i.add(1).log10().div(4e8).add(1))
    if(hasChargedQU(19)) gain = gain.pow(1.1)
    gain = gain.pow(SinusoidalUpgrades[34].eff())
    if(BasicHypercompUpgrades.has(8)) gain = gain.mul(TemporalPlane.totalEffect())
    if(hasPermUpgrade(16)) gain = gain.mul(PERM_UPGRADES[16].eff2())
    return gain
  },
  quaternionCost(x) {
    switch (x) {
      case 1: // dx cost
        return new Decimal("1e3250").pow(Decimal.pow(1.25,player.hypercompUpgs.purchases[0]))
        break;
      case 2: // triangles cost
        return new Decimal(1e230).pow(Decimal.pow(1.2,player.hypercompUpgs.purchases[1]))
        break;
      case 3: // j cost
        return new Decimal(500).pow(Decimal.pow(1.15,player.hypercompUpgs.purchases[2]))
        break;
    }
  },
  buyQuaternion(x) {
    switch (x) {
      case 1: // dx cost
        if(player.integration.dx.gte(HypercompUpgrades.quaternionCost(x))) {
          player.integration.dx = player.integration.dx.sub(HypercompUpgrades.quaternionCost(x))
          player.quaternions[0] = player.quaternions[0].add(1)
          player.quaternions[1] = player.quaternions[1].add(1)
          player.hypercompUpgs.purchases[x-1]++
        }
        break;
      case 2: // triangles cost
        if(player.triangles.gte(HypercompUpgrades.quaternionCost(x))) {
          player.triangles = player.triangles.sub(HypercompUpgrades.quaternionCost(x))
          player.quaternions[0] = player.quaternions[0].add(1)
          player.quaternions[1] = player.quaternions[1].add(1)
          player.hypercompUpgs.purchases[x-1]++
        }
        break;
      case 3: // j cost
        if(player.j.gte(HypercompUpgrades.quaternionCost(x))) {
          player.j = player.j.sub(HypercompUpgrades.quaternionCost(x))
          player.quaternions[0] = player.quaternions[0].add(1)
          player.quaternions[1] = player.quaternions[1].add(1)
          player.hypercompUpgs.purchases[x-1]++
        }
        break;
    }
  },
  respec(force) {
    if (!player.options[22] || force || confirm("Are you sure you want to respec your Hypercomplex Upgrades? You will Integrate with no reward!")) {
      player.quaternions[0] = player.quaternions[1]
      player.hypercompUpgs.dynamic = []
      if(!force) IntegrationPrestige.integrate(true)
    }
  },
  export() {
    let str = player.hypercompUpgs.dynamic.toString();
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(el);
    $.notify('Hypercomplex Upgrades preset exported!', {
      style: 'apcurrent',
      className:'saving',
    });
  },
  load(imported = undefined) {
    if (imported === undefined) imported = prompt("Paste your Hypercomplex Upgrades preset in the input box below! (This will reset your run with no reward!)")
    let arr = imported.split(",");
    player.quaternions[0] = player.quaternions[1]
    player.hypercompUpgs.dynamic = []
    HypercompUpgrades.respec(true)
    IntegrationPrestige.integrate(true)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0 && arr[i] < 17) {
        HypercompUpgrades.buy(+arr[i])
      }
    }
  },
  savePreset(x) {
    const answer = prompt("Type your exported Hypercomplex Upgrades preset in here!\nIf you type nothing, it will save your current preset")
    if (answer===null) return false
    let str = player.hypercompUpgs.dynamic.toString();
    player.presets.info[x] = answer||str
  },
  loadPreset(x) {
    this.load(player.presets.info[x])
  },
}

const BasicHypercompUpgrades = {
  1: {
    title: "Minor Perk II",
    desc: "Gain 1% of dx and empty sets gain on Integration and 1% of triangles gain on Sinusoidal every real-time second. Set Sacrifice no longer consumes empty sets.",
    cost: new Decimal(600000),
    effectDisplay() {return null},
  },
  2: {
    title: "Hypercomplex Set",
    desc: "The 4th Complex Set effect's formula is better.<br>(x -> 2<sup>x</sup>)",
    cost: new Decimal(2e7),
    effectDisplay() {return null},
  },
  3: {
    title: "Hypercomplex Propulsion",
    desc: "Hypercomplex Upgrades 4 and 6 are twice as strong, and Hypercomplex Upgrade 7 is 5x stronger.",
    cost: new Decimal(4e7),
    effectDisplay() {return null},
  },
  4: {
    title: "Logarithmic Effect Protests",
    desc: "The Polynomial Power factor formula for empty sets gain is stronger.",
    cost: new Decimal(2.5e9),
    effectDisplay() {return null},
  },
  5: {
    title: "Third Row Bonus",
    desc: "Power all third row Hypercomplex Upgrade effects ^5.",
    cost: new Decimal(1.5e20),
    effectDisplay() {return null},
  },
  6: {
    title: "Even More Hypercomplicated",
    desc: "Unlock the Hypercomplex Flune, and generate Synthetic Essence based on your point amount.",
    cost: new Decimal(2e23),
    effectDisplay() {return null},
  },
  7: {
    title: "Flune Bonus",
    desc: "The zj and wj effects are twice as effective.",
    cost: new Decimal(1e57),
    effectDisplay() {return null},
  },
  8: {
    title: "It's All a Game",
    desc: "All currencies except Hypercomplex Flune currencies are affected by global speed.",
    cost: new Decimal(2e59),
    effectDisplay() {return null},
  },
  9: {
    title: "Temporal Lubrication II",
    desc: "The Temporal Plane power conversion formulas are significantly better.",
    cost: new Decimal(1e139),
    effectDisplay() {return null},
  },
  10: {
    title: "YC6 Does Something",
    desc: "The Y-Challenge 6 effect adds to the Algebraic Set sacrifice effect at a reduced rate.",
    cost: new Decimal("1e392"),
    eff() {return Y_CHALLENGES[6].eff().div(500)},
    effectDisplay() {return "+" + regularFormat(BasicHypercompUpgrades[10].eff(),3) + " Algebraic Set sacrifice effect"},
  },
  11: {
    title: "More Sinusoidal Upgrade Purchases!",
    desc: "Power triangles gain by 1.05, and square root the y<sup>2</sup>z<sup>2</sup> cost.",
    cost: new Decimal("1e598"),
    effectDisplay() {return null},
  },
  12: {
    title: "True Limitless Potential",
    desc: "You can set the Limit Challenge Factors beyond 10. (not required for progression)",
    cost: new Decimal("1e630"),
    effectDisplay() {return null},
  },
  buy(x) {
    if(player.k.gte(BasicHypercompUpgrades[x].cost) && !BasicHypercompUpgrades.has(x)){
      player.k = player.k.sub(BasicHypercompUpgrades[x].cost)
      player.hypercompUpgs.basic.push(x)
    }
  },
  has(x) {
    return player.hypercompUpgs.basic.includes(x)
  },
}