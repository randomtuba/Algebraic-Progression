function updateAchs(){
  for(let i in ACHIEVEMENTS){
    if(!player.achievements.includes(i)&&ACHIEVEMENTS[i].done()){
      player.achievements.push(i)
    }
  }
}
const ACHIEVEMENTS = {
  1: {
    name: "Cheater",
    desc: "Buy an Autoclicker.",
    done(){return player.buyables[1].gte(1)},
  },
  2: {
    name: "Mass Production",
    desc: "Build a Point Factory.",
    done(){return player.buyables[2].gte(1)},
  },
  3: {
    name: "A Rift in Space",
    desc: "Summon a Point Portal.",
    done(){return player.buyables[3].gte(1)},
  },
  4: {
    name: "Mystery Value",
    desc: "Get 1x.",
    done(){return player.x.gte(1)},
  },
  5: {
    name: "Function()",
    desc: "Unlock Functions.",
    done(){return hasUpgrade(4)},
  },
  6: {
    name: "Valuable Variable",
    desc: "Get 1y.",
    done(){return player.y.gte(1)},
  },
  7: {
    name: "Getting Squared",
    desc: "Go Quadratic.",
    done(){return player.totalx2.gte(1)},
  },
  8: {
    name: "GAS GAS GAS",
    desc: "Reach 1e15 points.",
    done(){return player.points.gte(1e15)},
  },
  9: {
    name: "(softcapped)",
    desc: "Get g(x) and h(x) to 15.",
    done(){return player.buyables[5].gte(15) && player.buyables[6].gte(15)},
  },
  10: {
    name: "Graphing Time",
    desc: "Unlock Coordinate Plane.",
    done(){return hasQU(12)},
  },
  11: {
    name: "Full Automation",
    desc: "Unlock Auto-Quadratic.",
    done(){return hasQU(14)},
  },
  12: {
    name: "Inverse Quadratic",
    desc: "Unlock Square Root.",
    done(){return hasQU(16)},
  },
  13: {
    name: "Polynomial Growth",
    desc: "Make buildings produce each other.",
    done(){return hasUpgrade(6)},
  },
  14: {
    name: "y = mx",
    desc: "Reach 1,000,000 slope.",
    done(){return player.slope.gte(1e6)},
  },
  15: {
    name: "Googol",
    desc: "Reach 1e100 points.",
    done(){return player.points.gte(1e100)},
  },
  16: {
    name: "The Challenging Achievement",
    desc: "Unlock Challenges.",
    done(){return hasSU(12)},
  },
  17: {
    name: "Infinite Possibilities",
    desc: "Reach 1.79e308 points.",
    done(){return player.points.gte(1.79e308)},
  },
  18: {
    name: "Inflation?",
    desc: "Get 3 b.",
    done(){return player.b.gte(3)},
  },
  19: {
    name: "Z isn't real",
    desc: "Reach 100y.",
    done(){return player.y.gte(100)},
  },
  20: {
    name: "The End",
    desc: "...for now.",
    done(){return hasQU(20)},
  },
}

function hasAchievement(x) {
  return player.achievements.includes(x.toString())
}