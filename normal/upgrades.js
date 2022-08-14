const UPGRADES = {
  1: {
    title: "Lower Demand",
    desc: "Building cost scaling is 1.1x.",
    cost: new Decimal(1),
  },
  2: {
    title: "Overdrive",
    desc: "All buildings are twice as effective.",
    cost: new Decimal(10),
  },
  3: {
    title: "Cheapened X",
    desc: "The X cost is halved.",
    cost: new Decimal(25),
  },
  4: {
    title: "Input -> Output",
    desc: "Unlock Functions.",
    cost: new Decimal(40),
  },
  5: {
    title: "Hyperdrive",
    desc: "Divide X cost by 1 million, and multiply point gain by 1,000.",
    cost: new Decimal(2300),
  },
  6: {
    title: "Algebraic Dimensions",
    desc: "Point Portals produce Point Factories, and Point Factories produce Autoclickers.",
    cost: new Decimal(3500),
  },
  7: {
    title: "Point Exponential",
    desc: "Points are now raised ^1.01.",
    cost: new Decimal(7000),
  },
  8: {
    title: "Slope-Intercept Form",
    desc: "Unlock Y-Intercept.",
    cost: new Decimal(14400),
  },
};

function buyUpgrade(x) {
  if(player.x.gte(UPGRADES[x].cost) && !hasUpgrade(x)){
    player.xUpgs.push(x)
  }
}

function hasUpgrade(x) {
  return player.xUpgs.includes(x);
}