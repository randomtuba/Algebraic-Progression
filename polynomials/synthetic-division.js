function seFormula() {
  let se = player.points.div("1e95000").max(1).log10().div(5)
  se = se.mul(SYNTH_DIV_UPGRADES[1].eff())
  se = se.mul(POLY_BUYABLES[4].eff())
  se = se.sub(player.synthEssence).max(0).floor()
  return se
}

function enterSynthDiv() {
    if(player.inSynthDiv){
      player.synthEssence = player.synthEssence.add(seFormula())
    }
    goComplex(true);
    if(!player.inSynthDiv){
      player.synthDivEnters += 1
    }
    player.inSynthDiv = !player.inSynthDiv;
}

function seEffect() {
  return player.synthEssence.pow(Decimal.add(0.5,SYNTH_DIV_UPGRADES[2].eff())).add(1).pow(hasSDU(4)?1.25:1)
}

const SYNTH_DIV_UPGRADES = {
  1: {
    desc: "Triple synthetic essence gain per purchase.",
    cost() {return new Decimal(1000).mul(Decimal.pow(10,player.synthDivUpgs[0][1])).div(SYNTH_DIV_UPGRADES[3].eff())},
    eff() {return Decimal.pow(3,player.synthDivUpgs[0][1])},
    effectDisplay() {return format(SYNTH_DIV_UPGRADES[1].eff()) + "x SE gain"},  
  },
  2: {
    desc: "Add 0.1 to the SE conversion exponent (in the SE effect) per purchase.",
    cost() {return new Decimal(3000).mul(Decimal.pow(20,player.synthDivUpgs[0][2])).div(SYNTH_DIV_UPGRADES[3].eff())},
    eff() {return Decimal.mul(0.1,player.synthDivUpgs[0][2])},
    effectDisplay() {return "+" + format(SYNTH_DIV_UPGRADES[2].eff()) + " SE conversion exponent"},  
  },
  3: {
    desc: "Halve the other two repeatable upgrade costs.",
    cost() {return new Decimal(7500).mul(Decimal.pow(30,player.synthDivUpgs[0][3]))},
    eff() {return Decimal.pow(2,player.synthDivUpgs[0][3])},
    effectDisplay() {return "/" + format(SYNTH_DIV_UPGRADES[3].eff()) + " upgrade costs"},  
  },
  4: {
    title: "Artificial Plague",
    desc: "The boost to Polynomials is powered by 1.25.",
    cost: new Decimal(20000),
    effectDisplay() {return null},
  },
  5: {
    title: "The Worlds Revolving",
    desc: "Unlock an autobuyer for Revolution Buyables.",
    cost: new Decimal(5000),
    effectDisplay() {return null},
  },
  6: {
    title: "Paradoxical Functions",
    desc: "Multiply the g(x) and h(x) bases based on SE.",
    cost: new Decimal(1e6),
    eff() {return player.synthEssence.max(1).log2()},
    effectDisplay() {return format(SYNTH_DIV_UPGRADES[6].eff()) + "x g(x) and h(x) bases"},  
  },
  7: {
    title: "Imaginary Pollution",
    desc: "Multiply i gain based on SE.",
    cost: new Decimal(7.7e6),
    eff() {return player.synthEssence.pow(100).add(1)},
    effectDisplay() {return format(SYNTH_DIV_UPGRADES[7].eff()) + "x i gain"},  
  },
  8: {
    title: "Beyond the Veil",
    desc: "Automatically gain completions for Y-Challenges 1-3, even when you're not in them.",
    cost: new Decimal(4.3e9),
    effectDisplay() {return null},  
  },
  9: {
    title: "Wait, That's Also Illegal",
    desc: "Weaken the Synthetic Division penalties from ^0.02 to ^0.025, and uncap Quadratic Upgrade 13.",
    cost: new Decimal(4.5e8),
    effectDisplay() {return null},  
  },
  10: {
    title: "Obligatory Padding Upgrade",
    desc: "Are you having fun browsing the game's code? Probably not lol",
    cost: new Decimal("1.79e3008"),
    effectDisplay() {return null},  
  },
  11: {
    title: "Infinite Power",
    desc: "zi generates Upgrade Points instead of giving free Upgrade Points.",
    cost: new Decimal(7.5e12),
    effectDisplay() {return formatWhole(compPlaneEffects(4)) + " UP/sec"},  
  },
  12: {
    title: "Obligatory Padding Upgrade 2",
    desc: "Are you having fun browsing the game's code? Probably not lol",
    cost: new Decimal("1.79e3008"),
    effectDisplay() {return null},  
  },
}

function hasSDU(x) {
  return player.synthDivUpgs[1].includes(x);
}

function buySDU(x) {
  if(x < 4) {
    if(player.synthEssence.gte(SYNTH_DIV_UPGRADES[x].cost())){
      player.synthEssence = player.synthEssence.sub(SYNTH_DIV_UPGRADES[x].cost())
      player.synthDivUpgs[0][x] = player.synthDivUpgs[0][x].add(1)
    }
  } else {
    if(player.synthEssence.gte(SYNTH_DIV_UPGRADES[x].cost) && !hasSDU(x)){
      player.synthEssence = player.synthEssence.sub(SYNTH_DIV_UPGRADES[x].cost)
      player.synthDivUpgs[1].push(x)
    }
  }
}