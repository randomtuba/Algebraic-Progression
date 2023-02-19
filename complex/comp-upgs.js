// row 1 in compUpgs
const BCOMP_UPGRADES = {
  1: {
    title: "Starter Pack",
    desc: "Multiply point gain and x² gain based on unspent i. Multiply gains of RE, QP, and CE by 10. Multiply slope gain by 100.",
    cost: new Decimal(1),
    eff() {return new Decimal(16).mul(new Decimal(1).add(player.i.pow(0.5)))}, // point gain
    eff2() {return new Decimal(4).mul(new Decimal(1).add(player.i.pow(0.25)))}, // x^2 gain
    effectDisplay() {return format(BCOMP_UPGRADES[1].eff()) + "x production, " + format(BCOMP_UPGRADES[1].eff2()) + "x x² gain"},
  },
  2: {
    title: "Quadratic Squared",
    desc: "Boost Quadratic gain based on total i, and all Quadratic-based effects are raised ^4.",
    cost: new Decimal(500000),
    eff() {return player.totali.log10().add(1).floor()},
    effectDisplay() {return format(BCOMP_UPGRADES[2].eff()) + "x Quadratics"},
  },
  3: {
    title: "Achievement Bonus",
    desc: "Multiply the g(x) base based on Achievements completed.",
    cost: new Decimal(1e9),
    eff() {return new Decimal(player.achievements.length).div(20)},
    effectDisplay() {return format(BCOMP_UPGRADES[3].eff()) + "x g(x) base"},
  },
  4: {
    title: "S-UP-er Boost",
    desc: "Power x² gain based on total Upgrade Points.",
    cost: new Decimal(5e10),
    eff() {return player.upgradePoints[1].div(200).add(1).div(1.05).pow(0.5).mul(1.05)},
    effectDisplay() {return "^" + format(BCOMP_UPGRADES[4].eff()) + " x² gain"},
  },
  5: {
    title: "Time Is Money",
    desc: "Multiply Complex Plane powers gain based on time in this Complex.",
    cost: new Decimal(2.4e24),
    eff() {return new Decimal(player.prestigeTimes[2]).pow(0.75).add(1).div(100).pow(0.5).mul(10)},
    effectDisplay() {return format(BCOMP_UPGRADES[5].eff()) + "x Complex Plane powers gain"},
  },
  6: {
    title: "Discontinuities II",
    desc: "Unlock Complex Challenges.",
    cost: new Decimal(1e32),
    effectDisplay() {return null},
  },
  7: {
    title: "Complex Bonus",
    desc: "Gain more x<sup>2</sup> based on unspent i.",
    cost: new Decimal(1e43),
    eff() {return player.i.pow(8).add(1)},
    effectDisplay() {return format(BCOMP_UPGRADES[7].eff()) + "x x² gain"},
  },
  8: {
    title: "Uprooted Delay",
    desc: "Remove the nerfs to both CE effects, and delay the 2nd challenge essence softcap start based on root essence.",
    cost: new Decimal(1e50),
    eff() {return player.rootEssence.max(1).pow(0.02)},
    effectDisplay() {return format(BCOMP_UPGRADES[8].eff()) + "x CE softcap start"},
  },
  9: {
    title: "TBD",
    desc: "???",
    cost: new Decimal("1.79e3008"),
    eff() {return new Decimal(1)},
    effectDisplay() {return null},
  },
};

// row 0 in compUpgs
const COMP_UPGRADES = {
  1: {
    desc: "The h(x) base powers point gain at a heavily reduced rate. (^0.01)",
    cost: new Decimal(3),
    eff() {return BUYABLES[6].base().pow(0.01)},
    effectDisplay() {return "^" + format(COMP_UPGRADES[1].eff()) + " production"},
  },
  2: {
    desc: "Gain more slope based on times gone Quadratic, applied after the first slope softcap.",
    cost: new Decimal(3),
    eff() {return player.compChallenge == 4 ? new Decimal(1) : player.quadratics.add(player.bankedQuadratics).pow(player.quadratics.add(player.bankedQuadratics).min(2e7).add(1).log10().mul(2.5)).add(1).pow(hasCU(1,2)?4:1).pow(COMP_CHALLENGES[4].eff2())},
    effectDisplay() {return format(COMP_UPGRADES[2].eff()) + "x slope"},
  },
  3: {
    desc: "Gain more points based on X.",
    cost: new Decimal(3),
    eff() {return Decimal.pow(1.001,player.x)},
    effectDisplay() {return format(COMP_UPGRADES[3].eff()) + "x production"},
  },
  4: {
    desc: "Power the C9 reward based on time in this Complex.",
    cost: new Decimal(3),
    eff() {return new Decimal(player.prestigeTimes[2]).add(1).log10().div(3).add(1)},
    effectDisplay() {return "^" + format(COMP_UPGRADES[4].eff()) + " C9 reward"},
  },
  5: {
    desc: "Gain more x² based on your amount of produced Autoclickers.",
    cost: new Decimal(5),
    eff() {return player.buyables[7].add(1).pow(0.01)},
    effectDisplay() {return format(COMP_UPGRADES[5].eff()) + "x x²"},
  },
  6: {
    desc: "Gain more root essence based on times gone Quadratic. (hardcaps at 20,000,000 Quadratics)",
    cost: new Decimal(5),
    eff() {return player.compChallenge == 4 ? new Decimal(1) : player.quadratics.add(player.bankedQuadratics).min(2e7).pow(player.quadratics.add(player.bankedQuadratics).min(2e7).add(1).log10().mul(3)).add(1).pow(hasCU(1,2)?4:1).pow(COMP_CHALLENGES[4].eff2())},
    effectDisplay() {return format(COMP_UPGRADES[6].eff()) + "x root essence"},
  },
  7: {
    desc: "Gain more Quadratics based on Y.",
    cost: new Decimal(5),
    eff() {return player.y.div(2).add(1).floor()},
    effectDisplay() {return format(COMP_UPGRADES[7].eff()) + "x Quadratics gain"},
  },
  8: {
    desc: "Gain more root essence and sacrificed x² based on total i.",
    cost: new Decimal(5),
    eff() {return player.totali.pow(2).gte(1e200) ? player.totali.pow(2).div(1e200).pow(0.75).mul(1e200) : player.totali.pow(2)},
    effectDisplay() {return format(COMP_UPGRADES[8].eff()) + "x RE and sacrificed x²"},
  },
  9: {
    desc: "Gain more i based on Functions bought, and delay the g(x) and h(x) softcaps by UP purchases.",
    cost: new Decimal(7),
    eff() {return player.buyables[4].add(player.buyables[5]).add(player.buyables[6]).div(100000).add(1).pow(2.5)},
    effectDisplay() {return format(COMP_UPGRADES[9].eff()) + "x i, +" + format(player.compUpgs[2][0]+player.compUpgs[2][1]+player.compUpgs[2][2]) + " g(x) and h(x) softcap starts"},
  },
  10: {
    desc: "i and Quadratic Power boost each other.",
    cost: new Decimal(7),
    eff() {return player.quadPower.pow(0.005).add(1).gte(1e6) ? player.quadPower.pow(0.005).add(1).div(1e6).pow(0.5).mul(1e6) : player.quadPower.pow(0.005).add(1)}, //QP boost to i
    eff2() {return player.i.pow(1.5).add(1)}, //i boost to QP
    effectDisplay() {return format(COMP_UPGRADES[10].eff()) + "x i, " + format(COMP_UPGRADES[10].eff2()) + "x QP"},
  },
  11: {
    desc: "Gain more Complex Plane powers based on X and Y.",
    cost: new Decimal(7),
    eff() {return player.x.pow(0.25).add(player.y.pow(0.5)).div(10).add(1)},
    effectDisplay() {return format(COMP_UPGRADES[11].eff()) + "x Complex Plane powers production"},
  },
  12: {
    desc: "Gain more i based on unspent i.",
    cost: new Decimal(7),
    eff() {return player.i.pow(0.1).div(300).add(1)},
    effectDisplay() {return format(COMP_UPGRADES[12].eff()) + "x i"},
  },
}

function buyCU(x,y) {
  switch (x) {
    case 0:
      if(player.upgradePoints[0].gte(COMP_UPGRADES[y].cost) && !hasCU(0,y)){
        player.upgradePoints[0] = player.upgradePoints[0].sub(COMP_UPGRADES[y].cost)
        player.compUpgs[0].push(y)
      }
      break;
    case 1:
      if(player.i.gte(BCOMP_UPGRADES[y].cost) && !hasCU(1,y)){
        player.i = player.i.sub(BCOMP_UPGRADES[y].cost)
        player.compUpgs[1].push(y)
      }
      break;
  }
}

// x=0 is complex upgrades, x=1 is basic complex upgrades
function hasCU(x,y) {
  return player.compUpgs[x].includes(y);
}

function upgradePointCost(x) {
  switch (x) {
    case 1: // Point cost
      return new Decimal("1e17000").pow(Decimal.pow(1.25,player.compUpgs[2][0]))
      break;
    case 2: // X^2 cost
      return new Decimal("1e2950").pow(Decimal.pow(1.15,player.compUpgs[2][1]))
      break;
    case 3: // I cost
      return new Decimal("1").mul(player.compUpgs[2][2] >= 1 ? 2 : 1).pow(Decimal.pow(1.4,new Decimal(player.compUpgs[2][2]-1).max(0))).ceil()
      break;
  }
}

function buyUP(x) {
  switch (x) {
    case 1: // Point cost
      if(player.points.gte(upgradePointCost(x))) {
        player.points = player.points.sub(upgradePointCost(x))
        player.upgradePoints[0] = player.upgradePoints[0].add(1)
        player.upgradePoints[1] = player.upgradePoints[1].add(1)
        player.compUpgs[2][x-1]++
      }
      break;
    case 2: // X^2 cost
      if(player.x2.gte(upgradePointCost(x))) {
        player.x2 = player.x2.sub(upgradePointCost(x))
        player.upgradePoints[0] = player.upgradePoints[0].add(1)
        player.upgradePoints[1] = player.upgradePoints[1].add(1)
        player.compUpgs[2][x-1]++
      }
      break;
    case 3: // I cost
      if(player.i.gte(upgradePointCost(x)) && player.complexes >= 2) {
        player.i = player.i.sub(upgradePointCost(x))
        player.upgradePoints[0] = player.upgradePoints[0].add(1)
        player.upgradePoints[1] = player.upgradePoints[1].add(1)
        player.compUpgs[2][x-1]++
      }
      break;
  }
}

function respec() {
  if (confirm("Are you sure you want to respec your Complex Upgrades? You will go Complex with no reward!")) {
    player.upgradePoints[0] = player.upgradePoints[1].sub(player.unlocked != 0 ? COMP_CHALLENGES[player.unlocked].unlockCost : new Decimal(0))
    player.compUpgs[0] = []
    goComplex(true)
  }
}

function exportUpgs() {
  let str = player.compUpgs[0].toString();
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(el);
  $.notify('Complex Upgrades preset exported!', {
    style: 'apcurrent',
    className:'saving',
  });
}

function loadUpgs(imported = undefined) {
  if (imported === undefined) imported = prompt("Paste your Complex Upgrades preset in the input box below! (This will reset your run with no reward!)")
    let arr = imported.split(",");
    player.upgradePoints[0] = player.upgradePoints[1].sub(player.unlocked == 0 ? 0 : COMP_CHALLENGES[player.unlocked].unlockCost)
    player.compUpgs[0] = []
    goComplex(true)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0 && arr[i] < 13) {
        buyCU(0,new Decimal(arr[i]).toNumber())
      }
    }
}

function loadPreset(x) {
  let arr = player.presets.info[x].split(",");
    player.upgradePoints[0] = player.upgradePoints[1].sub(player.unlocked == 0 ? 0 : COMP_CHALLENGES[player.unlocked].unlockCost)
    player.compUpgs[0] = []
    goComplex(true)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0 && arr[i] < 13) {
        buyCU(0,new Decimal(arr[i]).toNumber())
      }
    }
}

function renamePreset(x) {
  player.presets.names[x] = prompt("Type in the new name for this preset below!")
}