function zpowerGen() {
  let zp = Decimal.pow(Decimal.add(2,player.zlab.empowerments.div(4)),player.z)
  zp = zp.mul(QP_BUYABLES[7].eff())
  zp = zp.mul(circleEffects(2))
  return zp
}

const COLLIDERS = {
  1: {
    title: "Expansion",
    desc: "Extends previous mechanics.",
    milestones: [
      null,
      "<b>Level 1</b><br>Unlock a Time mode for Auto-Complex",
      "<b>Level 3</b><br>Unlock a new Transformation type, Dilations",
      "<b>Level 6</b><br>Unlock Imaginary Power (found in the Quadratic Formula tab)",
      "<b>Level 12</b><br>Unlock the ability to Extrude Transformations",
      "<b>Level 20</b><br>Unlock a fourth row of Complex Upgrades",
    ],
  },
  2: {
    title: "Propulsion",
    desc: "Boosts past upgrade effects.",
    milestones: [
      null,
      "<b>Level 1</b><br>Add 0.03 to the exponent of <i>Self-Synergy</i> (+0.04 in Square Root)",
      "<b>Level 3</b><br>Add 0.2 to the exponent of <i>Uprooted Points</i>",
      "<b>Level 6</b><br>Add 0.01 to the exponent of <i>All-Encompassing</i>",
      "<b>Level 12</b><br>Each \"Function Enhancer\" now delays the g(x) and h(x) softcaps by 6 levels",
      "<b>Level 20</b><br>The effect from <i>Time Is Money</i> is raised ^4",
    ],
  },
  3: {
    title: "Inflation",
    desc: "Removes and weakens softcaps and hardcaps.",
    milestones: [
      null,
      "<b>Level 1</b><br>Remove the Translations effect softcap",
      "<b>Level 3</b><br>Increase the \"Variable Coupler\" amount cap by 1", 
      "<b>Level 6</b><br>Multiply the Complex Upgrade 6 hardcap by 50",
      "<b>Level 12</b><br>Increase the 1st Challenge Essence softcap exponent from 0.6 to 0.62",
      "<b>Level 20</b><br>Weaken the 3rd slope effect softcap",
    ],
  },
  4: {
    title: "Reduction",
    desc: "Reduces costs and cost scalings.",
    milestones: [
      null,
      "<b>Level 1</b><br>Delay the x<sup>2</sup> Doubler cost superscaling start by 200 purchases",
      "<b>Level 3</b><br>Delay the RE Doubler cost superscaling start by 150 purchases",
      "<b>Level 6</b><br>Power the first UP purchase button costs by 0.8",
      "<b>Level 12</b><br>Power the Translation cost by 0.9",
      "<b>Level 20</b><br>The Z cost scaling is divided by 1.5",
    ],
  },
}

function zlabBuyableCosts(x) {
  if(player.zlab.levels[x] >= 20) {
    return new Decimal(Infinity);
  }
  switch (x) {
    case 1:
      return player.zlab.levels[x] == 19 ? new Decimal(1e34) : new Decimal(2000).mul(Decimal.pow(8,player.zlab.levels[x])).mul(Decimal.pow(2,new Decimal(player.zlab.levels[x]).sub(15).max(0).pow(2)))
    break;
    case 2:
      return new Decimal(8000).mul(Decimal.pow(16,player.zlab.levels[x])).mul(Decimal.pow(2,new Decimal(player.zlab.levels[x]).sub(15).max(0).pow(2)))
    break;
    case 3:
      return new Decimal(40000).mul(Decimal.pow(32,player.zlab.levels[x])).mul(Decimal.pow(2,new Decimal(player.zlab.levels[x]).sub(15).max(0).pow(2)))
    break;
    case 4:
      return new Decimal(200000).mul(Decimal.pow(64,player.zlab.levels[x])).mul(Decimal.pow(2,new Decimal(player.zlab.levels[x]).sub(15).max(0).pow(2)))
    break;
    case 5:
      return new Decimal(1e110).mul(Decimal.pow(1e5,player.zlab.empowerments.pow(2)))
    break;
  }
}

function hasZlabMilestone(collider,x) {
  switch (x) {
    case 1:
      return player.zlab.levels[collider] >= 1;
    break;
    case 2:
      return player.zlab.levels[collider] >= 3;
    break;
    case 3:
      return player.zlab.levels[collider] >= 6;
    break;
    case 4:
      return player.zlab.levels[collider] >= 12;
    break;
    case 5:
      return player.zlab.levels[collider] >= 20;
    break;
  }
}

function increaseLevel(x) {
  if(x == 5) {
    if(player.i.gte(zlabBuyableCosts(x))) {
      player.i = player.i.sub(zlabBuyableCosts(x))
      player.zlab.empowerments = player.zlab.empowerments.add(1)
    }
  } else {
    if(player.zlab.particles[x].gte(zlabBuyableCosts(x))) {
      player.zlab.particles[x] = player.zlab.particles[x].sub(zlabBuyableCosts(x))
      player.zlab.levels[x]++
    }
  }
}

function totalColliderLevels() {
  return player.zlab.levels[1]+player.zlab.levels[2]+player.zlab.levels[3]+player.zlab.levels[4]
}