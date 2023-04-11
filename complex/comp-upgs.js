// index 1 in compUpgs
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
    desc: "Power x² gain based on total Upgrade Points. (hardcaps at ^1.25)",
    cost: new Decimal(5e10),
    eff() {return player.upgradePoints[1].div(200).add(1).div(1.05).pow(0.5).mul(1.05).min(1.25)},
    effectDisplay() {return "^" + format(BCOMP_UPGRADES[4].eff()) + " x² gain"},
  },
  5: {
    title: "Time Is Money",
    desc: "Multiply Complex Plane powers gain based on time in this Complex.",
    cost: new Decimal(2.4e24),
    eff() {return new Decimal(player.prestigeTimes[2]).pow(0.75).add(1).div(100).pow(0.5).mul(10).pow(hasZlabMilestone(2,5)?4:1)},
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
    title: "Prestigious II",
    desc: "Gain more i based on times gone Complex.",
    cost: new Decimal(1e120),
    eff() {return player.complexes.sqrt()},
    effectDisplay() {return format(BCOMP_UPGRADES[9].eff()) + "x i gain"},
  },
};

// index 0 in compUpgs
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
    desc(){return "Gain more root essence based on times gone Quadratic. (hardcaps at " + (hasZlabMilestone(3,3) ? format(1e9) : format(2e7)) + " Quadratics)"},
    cost: new Decimal(5),
    eff() {return player.compChallenge == 4 ? new Decimal(1) : player.quadratics.add(player.bankedQuadratics).min(hasZlabMilestone(3,3)?1e9:2e7).pow(player.quadratics.add(player.bankedQuadratics).min(hasZlabMilestone(3,3)?1e9:2e7).add(1).log10().mul(3)).add(1).pow(hasCU(1,2)?4:1).pow(COMP_CHALLENGES[4].eff2())},
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
    effectDisplay() {return format(COMP_UPGRADES[9].eff()) + "x i, +" + formatWhole(player.compUpgs[2][0]+player.compUpgs[2][1]+player.compUpgs[2][2]) + " softcap starts"},
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
  13: {
    desc: "Gain more points based on Z.",
    cost() {return Decimal.mul(5,Decimal.pow(2,player.fourthRowCompUpgs[1]))},
    eff() {return Decimal.pow(1e100,player.z).pow(player.fourthRowCompUpgs[1])},
    effectDisplay() {return format(COMP_UPGRADES[13].eff()) + "x production"},
    next() {return Decimal.pow(1e100,player.z).pow(player.fourthRowCompUpgs[1].add(1))},
    nextDisplay() {return format(COMP_UPGRADES[13].next()) + "x production"},
  },
  14: {
    desc: "Slope gain is powered by a fixed exponent.",
    cost() {return Decimal.mul(5,Decimal.pow(2,player.fourthRowCompUpgs[2]))},
    eff() {return Decimal.add(1,player.fourthRowCompUpgs[2].div(50))},
    effectDisplay() {return "^" + format(COMP_UPGRADES[14].eff()) + " slope"},
    next() {return Decimal.add(1,(player.fourthRowCompUpgs[2].add(1)).div(50))},
    nextDisplay() {return "^" + format(COMP_UPGRADES[14].next()) + " slope"},
  },
  15: {
    desc: "Gain more i based on unspent revolutions.",
    cost() {return Decimal.mul(5,Decimal.pow(2,player.fourthRowCompUpgs[3]))},
    eff() {return player.varSynth.revolutions.pow(4).add(1).pow(player.fourthRowCompUpgs[3])},
    effectDisplay() {return format(COMP_UPGRADES[15].eff()) + "x i"},
    next() {return player.varSynth.revolutions.pow(4).add(1).pow(player.fourthRowCompUpgs[3].add(1))},
    nextDisplay() {return format(COMP_UPGRADES[15].next()) + "x i"},
  },
  16: {
    desc: "Gain more y² based on circles.",
    cost() {return Decimal.mul(5,Decimal.pow(2,player.fourthRowCompUpgs[4]))},
    eff() {return player.varSynth.circles.pow(0.075).add(1).pow(player.fourthRowCompUpgs[4])},
    effectDisplay() {return format(COMP_UPGRADES[16].eff()) + "x y²"},
    next() {return player.varSynth.circles.pow(0.075).add(1).pow(player.fourthRowCompUpgs[4].add(1))},
    nextDisplay() {return format(COMP_UPGRADES[16].next()) + "x y²"},
  },
}

function buyCU(x,y) {
  switch (x) {
    case 0:
      if(y > 12) {
        if(player.upgradePoints[0].gte(COMP_UPGRADES[y].cost())){
          player.upgradePoints[0] = player.upgradePoints[0].sub(COMP_UPGRADES[y].cost())
          player.fourthRowCompUpgs[y-12] = player.fourthRowCompUpgs[y-12].add(1)
        }
      } else {
        if(player.upgradePoints[0].gte(COMP_UPGRADES[y].cost) && !hasCU(0,y)){
          player.upgradePoints[0] = player.upgradePoints[0].sub(COMP_UPGRADES[y].cost)
          player.compUpgs[0].push(y)
        }
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
      return new Decimal("1e17000").pow(Decimal.pow(1.25,player.compUpgs[2][0])).pow(hasZlabMilestone(4,3)?0.8:1)
      break;
    case 2: // X^2 cost
      return new Decimal("1e2950").pow(Decimal.pow(1.15,player.compUpgs[2][1])).pow(hasZlabMilestone(4,3)?0.8:1)
      break;
    case 3: // I cost
      return new Decimal("1").mul(player.compUpgs[2][2] >= 1 ? 2 : 1).pow(Decimal.pow(1.4,new Decimal(player.compUpgs[2][2]-1).max(0))).pow(hasZlabMilestone(4,3)?0.8:1).ceil()
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
    if(player.compUpgs[0].length == 0 && !hasSecretAchievement(4) && player.fourthRowCompUpgs[1]+player.fourthRowCompUpgs[2]+player.fourthRowCompUpgs[3]+player.fourthRowCompUpgs[4] == 0) {
      player.secretAchievements.push('4')
      $.notify("Secret Achievement Unlocked: Not Quite Right", {
        style: 'apcurrent',
        className:'secretAchieves',
      });
    }
    player.compUpgs[0] = []
    player.fourthRowCompUpgs = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    goComplex(true)
  }
}

function respecFourthRow() {
  if (confirm("Are you sure you want to respec your fourth-row Complex Upgrades? You will go Complex with no reward!")) {
    let cuCost = (hasCU(0,1)?new Decimal(3):new Decimal(0)).add(hasCU(0,2)?new Decimal(3):new Decimal(0)).add(hasCU(0,3)?new Decimal(3):new Decimal(0)).add(hasCU(0,4)?new Decimal(3):new Decimal(0)).add(hasCU(0,5)?new Decimal(5):new Decimal(0)).add(hasCU(0,6)?new Decimal(5):new Decimal(0)).add(hasCU(0,7)?new Decimal(5):new Decimal(0)).add(hasCU(0,8)?new Decimal(5):new Decimal(0)).add(hasCU(0,9)?new Decimal(7):new Decimal(0)).add(hasCU(0,10)?new Decimal(7):new Decimal(0)).add(hasCU(0,11)?new Decimal(7):new Decimal(0)).add(hasCU(0,12)?new Decimal(7):new Decimal(0))
    player.upgradePoints[0] = player.upgradePoints[1].sub(player.unlocked != 0 ? COMP_CHALLENGES[player.unlocked].unlockCost : new Decimal(0)).sub(cuCost)
    player.fourthRowCompUpgs = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    goComplex(true)
  }
}

function exportUpgs() {
  let str = player.compUpgs[0].toString();
  if(hasZlabMilestone(1,5)) str += ";" + player.fourthRowCompUpgs[1] + "," + player.fourthRowCompUpgs[2] + "," + player.fourthRowCompUpgs[3] + "," + player.fourthRowCompUpgs[4];
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
if(imported.includes(";")==false)  imported+=";0,0,0,0"
    
  let arr = imported.split(";")[0].split(",");
    player.upgradePoints[0] = player.upgradePoints[1].sub(player.unlocked == 0 ? 0 : COMP_CHALLENGES[player.unlocked].unlockCost)
    player.compUpgs[0] = []
    player.fourthRowCompUpgs = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    goComplex(true)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0 && arr[i] < 13) {
        buyCU(0,+arr[i])
      }
    }
let fourth = imported.split(";")[1].split(",")
fourth.forEach((item,index,array)=>{array[index]=Number(item)})
for(let i = 0; i < fourth.length; i++){
for(let x=0;x<fourth[i];x++){
buyCU(0,i+13)
}
}
}

function loadPreset(x) {
    let info =  player.presets.info[x]
if(info.includes(";")==false)  info+=";0,0,0,0"
    
  let arr = info.split(";")[0].split(",");
    player.upgradePoints[0] = player.upgradePoints[1].sub(player.unlocked == 0 ? 0 : COMP_CHALLENGES[player.unlocked].unlockCost)
    player.compUpgs[0] = []
    player.fourthRowCompUpgs = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    goComplex(true)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0 && arr[i] < 13) {
        buyCU(0,+arr[i])
      }
    }
let fourth = info.split(";")[1].split(",")
fourth.forEach((item,index,array)=>{array[index]=Number(item)})
for(let i = 0; i < fourth.length; i++){
for(let x=0;x<fourth[i];x++){
buyCU(0,i+13)
}
}
}

function renamePreset(x) {
  const answer = prompt("Type in the new name for this preset below!")
 if(prompt===null) return false
  player.presets.names[x] = answer
}