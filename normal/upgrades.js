const UPGRADES = {
  1: {
    title: "Lower Demand",
    desc: "Building cost scaling is 1.1x.",
    chargedDesc: "Building cost scaling is 1.05x, and Function cost scalings are divided by 1.2.",
    cost: new Decimal(1),
  },
  2: {
    title: "Overdrive",
    desc: "All buildings are twice as effective.",
    chargedDesc: "All buildings are twice as effective, multiply the f(n) exponent by 1.2, and multiply the g(n) and h(n) bases by 1.4.",
    cost: new Decimal(10),
  },
  3: {
    title: "Cheapened X",
    desc: "The X cost is halved.",
    chargedDesc: "The X cost is halved, and the Z cost is divided by 1.2.",
    cost: new Decimal(25),
  },
  4: {
    title: "Input -> Output",
    desc: "Unlock Functions.",
    chargedDesc: "Unlock Functions, and multiply the starting g(n) and h(n) softcaps by 1.05.",
    cost: new Decimal(40),
  },
  5: {
    title: "Hyperdrive",
    desc: "Divide X cost by 1 million, and multiply point gain by 1,000.",
    chargedDesc: "Divide X cost by 1 million, and multiply point gain by 1e10000.",
    cost: new Decimal(2300),
  },
  6: {
    title: "Algebraic Dimensions",
    desc: "Point Portals produce Point Factories, and Point Factories produce Autoclickers.",
    chargedDesc: "Buildings produce other Buildings, and power slope gain by 1.1.",
    cost: new Decimal(3500),
  },
  7: {
    title: "Point Exponential",
    desc: "Points are now raised ^1.01.",
    chargedDesc: "Points are now raised ^1.02 (^1.01 in Square Root).",
    cost: new Decimal(7000),
  },
  8: {
    title: "Slope-Intercept Form",
    desc: "Unlock Y-Intercept.",
    chargedDesc: "Unlock Y-Intercept, and multiply the 2nd and 3rd effect hardcaps from b by 1.1.",
    cost: new Decimal(14400),
  },
};

function buyUpgrade(x) {
  if(player.x.gte(UPGRADES[x].cost) && !hasUpgrade(x)){
    player.xUpgs.push(x)
    player.x = player.x.sub(UPGRADES[x].cost.div(2).floor())
  } else if (player.varSynth.xy.gte(1) && hasUpgrade(x) && !hasChargedUpgrade(x)) {
    player.varSynth.chargedXUpgs.push(x)
    player.varSynth.xy = player.varSynth.xy.sub(1)
  } else if (tmp.shiftToggleBehavior && hasChargedUpgrade(x)) {
    player.varSynth.xy = player.varSynth.xy.add(1)
    player.varSynth.chargedXUpgs = singleUpgradeRespec(player.varSynth.chargedXUpgs,x)
    goYQuadratic(true)
  }
}

function hasUpgrade(x) {
  return player.xUpgs.includes(x);
}

const PERM_UPGRADES = {
  1: {
    title: "Enlightened Points",
    desc: "Multiply point gain by 100x or power point gain by ^1.01, whichever is larger.",
    eff() {
      return player.points.max(1).pow(0.01).max(100)
    }
  },
  2: {
    title: "Enlightened Quadratic",
    desc: "Multiply x² and QP gain by 100x or power x² and QP gain by ^1.01, whichever is larger.",
    eff() {
      return player.x2.max(1).pow(0.01).max(100)
    },
    eff2() {
      return player.quadPower.max(1).pow(0.01).max(100)
    }
  },
  3: {
    title: "Enlightened Dilation",
    desc: "Multiply RE and CE gain by 100x or power RE and CE gain by ^1.01, whichever is larger.",
    eff() {
      return player.rootEssence.max(1).pow(0.01).max(100)
    },
    eff2() {
      return player.challengeEssence.max(1).pow(0.01).max(100)
    }
  },
  4: {
    title: "Enlightened Uprise",
    desc: "Multiply slope gain by 100x or power slope gain by ^1.01, whichever is larger.",
    eff() {
      return player.slope.max(1).pow(0.01).max(100)
    }
  },
  5: {
    title: "Enlightened Imagination",
    desc: "Multiply i gain by 100x or power i gain by ^1.01, whichever is larger.",
    eff() {
      return player.i.max(1).pow(0.01).max(100)
    }
  },
  6: {
    title: "Enlightened Dimensionality",
    desc: "Multiply y² gain by 100x or power y² gain by ^1.01, whichever is larger.",
    eff() {
      return player.y2.max(1).pow(0.01).max(100)
    }
  },
  7: {
    title: "Enlightened Research",
    desc: "Multiply Z-Power gain by 100x or power Z-Power gain by ^1.01, whichever is larger.",
    eff() {
      return player.zlab.zpower.max(1).pow(0.01).max(100)
    }
  },
  8: {
    title: "Enlightened Omnipotence",
    desc: "Multiply Polynomial efficiency by 100x or power Polynomial efficiency by ^1.01, whichever is larger.",
  },
  9: {
    title: "Enlightened Prestige",
    desc: "Multiply Quadratic and Complex gain by 100x or power Quadratic and Complex gain by ^1.01, whichever is larger. (Point Universe only)",
    eff() {
      return player.quadratics.max(1).pow(0.01).max(100)
    },
    eff2() {
      return player.complexes.max(1).pow(0.01).max(100)
    }
  },
  10: {
    title: "Enlightened Accumulation",
    desc: "Multiply dx gain by 100x or power dx gain by ^1.01, whichever is larger.",
    eff() {
      return player.integration.dx.max(1).pow(0.01).max(100)
    }
  },
  11: {
    title: "Enlightened Axioms",
    desc: "Multiply empty set gain by 100x or power empty set gain by ^1.01, whichever is larger.",
    eff() {
      return player.integration.emptySets.max(1).pow(0.01).max(100)
    }
  },
  12: {
    title: "Enlightened Singularity",
    desc: "Multiply hole gain by 10x or power hole gain by ^1.01, whichever is larger.",
    eff() {
      return player.integration.holes.max(1).pow(0.01).max(10)
    }
  },
  13: {
    title: "Enlightened Continuum",
    desc: "Multiply global speed by 100x or power global speed by ^1.01, whichever is larger, when Temporal Plane is active.",
  },
  14: {
    title: "Enlightened Trigonometry",
    desc: "Multiply triangle gain by 100x or power triangle gain by ^1.01, whichever is larger.",
    eff() {
      return player.triangles.max(1).pow(0.01).max(100)
    }
  },
  15: {
    title: "Enlightened Differentiation",
    desc: "Power gain of all Derivatives by ^1.01.",
  },
  16: {
    title: "Enlightened Esotericism",
    desc: "Multiply j and k gain by 100x or power j and k gain by ^1.01, whichever is larger.",
    eff() {
      return player.j.max(1).pow(0.01).max(100)
    },
    eff2() {
      return player.k.max(1).pow(0.01).max(100)
    }
  },
  17: {
    desc: "Multiply RP gain by 100x or power RP gain by ^1.01, whichever is larger.",
    eff() {
      return player.x2.max(1).pow(0.01).max(100)
    }
  },
  18: {
    desc: "Multiply X and Y generation by 100x or power X and Y generation by ^1.01, whichever is larger.",
    eff() {
      return player.x.max(1).pow(0.01).max(100)
    },
    eff2() {
      return player.y.max(1).pow(0.01).max(100)
    }
  },
  19: {
    desc: "Multiply square root gain by 100x or power square root gain by ^1.01, whichever is larger.",
    eff() {
      return player.challengeEssence.max(1).pow(0.01).max(100)
    }
  },
  20: {
    desc: "Power gain of all Particles by ^1.01.",
  },
  21: {
    desc: "Multiply gain of all X Powers by 100x or power gain of all X Powers by ^1.01, whichever is larger.",
    eff(x) {
      return player.polynomials[x].amount.max(1).pow(0.01).max(100)
    }
  },
  22: {
    desc: "Multiply ME gain by 100x or power ME gain by ^1.01, whichever is larger.",
    eff() {
      return player.integration.dx.max(1).pow(0.01).max(100)
    }
  },
  23: {
    desc: "Multiply Meta-Generator effectiveness by 100x or power Meta-Generator effectiveness by ^1.01, whichever is larger.",
  },
  24: {
    desc: "Multiply Minibrot replication speed by 10x.",
  },
};

function buyPermUpgrade(x) {
  if(player.gamePoints.gte(1) && !hasPermUpgrade(x)){
    player.permUpgs.push(x)
    player.gamePoints = player.gamePoints.sub(1)
  }
}

function hasPermUpgrade(x) {
  return player.permUpgs.includes(x) && player.options[31];
}
