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
    chargedDesc: "All buildings are twice as effective, multiply the f(x) exponent by 1.2, and multiply the g(x) and h(x) bases by 1.4.",
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
    chargedDesc: "Unlock Functions, and multiply the starting g(x) and h(x) softcaps by 1.05.",
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