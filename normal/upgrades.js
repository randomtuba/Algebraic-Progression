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
        return player.points.pow(0.01).max(100)
      }
    },
  2: {
    title: "Enlightened Quadratic",
    desc: "Multiply x² and QP gain by 100x or power x² and QP gain by ^1.01, whichever is larger.",
    eff() {
        return player.x2.pow(0.01).max(100)
      },
    eff2() {
        return player.quadPower.pow(0.01).max(100)
      }
    },
  3: {
    title: "Enlightened Dilation",
    desc: "Multiply RE and CE gain by 100x or power RE and CE gain by ^1.01, whichever is larger.",
    eff() {
        return player.rootEssence.pow(0.01).max(100)
      },
    eff2() {
        return player.challengeEssence.pow(0.01).max(100)
      }
    },
  4: {
    title: "Enlightened Uprise",
    desc: "Multiply slope gain by 100x or power slope gain by ^1.01, whichever is larger. (applied after both slope softcaps)",
    eff() {
        return player.slope.pow(0.01).max(100)
      }
    },
  5: {
    title: "Enlightened Imagination",
    desc: "Multiply i gain by 100x or power i gain by ^1.01, whichever is larger.",
    eff() {
        return player.i.pow(0.01).max(100)
      }
    },
  6: {
    title: "Enlightened Dimensionality",
    desc: "Multiply y² gain by 100x or power y² gain by ^1.01, whichever is larger.",
    eff() {
        return player.y2.pow(0.01).max(100)
      }
    },
  7: {
    title: "Enlightened Research",
    desc: "Multiply Z-Power gain by 100x or power Z-Power gain by ^1.01, whichever is larger.",
    eff() {
        return player.zlab.zpower.pow(0.01).max(100)
      }
    },
  8: {
    title: "Enlightened Omnipotence",
    desc: "Multiply the efficiency of all polynomials by 10x.",
  },
};

function buyPermUpgrade(x) {
  if(player.gamePoints.gte(1) && !hasPermUpgrade(x)){
    player.permUpgs.push(x)
    player.gamePoints = player.gamePoints.sub(1)
  }
}

function hasPermUpgrade(x) {
  return player.permUpgs.includes(x) && !player.speedrunMode;
}
