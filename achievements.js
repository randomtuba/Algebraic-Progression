function updateAchs(){
  for(let i in ACHIEVEMENTS){
    if(!player.achievements.includes(i)&&ACHIEVEMENTS[i].done()){
      player.achievements.push(i)
      $.notify("Achievement Unlocked: " + ACHIEVEMENTS[i].name, {
        style: 'apcurrent',
        className:'achieves',
      });
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
    name: "To B or not to B",
    desc: "Get 3 b.",
    done(){return player.b.gte(3)},
  },
  19: {
    name: "Z isn't real",
    desc: "Reach 100y.",
    done(){return player.y.gte(100)},
  },
  20: {
    name: "(-b ± √(b^2 - 4ac)) / 2a",
    desc: "Unlock Quadratic Formula.",
    done(){return hasQU(20)},
  },
  21: {
    name: "f(Infinite)",
    desc: "Have a 1.79e308x multiplier from Functions.",
    done(){return BUYABLES[4].eff().mul(BUYABLES[5].eff()).mul(BUYABLES[6].eff()).gte(1.79e308)},
  },
  22: {
    name: "Doubled Storage",
    desc: "Buy 5 Limit Expanders.",
    done(){return player.quadBuyables[4].gte(5)},
  },
  23: {
    name: "Not-so-challenging",
    desc: "Reach 1e3000 points in a Challenge.",
    done(){return player.points.gte("1e3000") && player.challenge != 0},
  },
  24: {
    name: "Quadratic Millennium",
    desc: "Reach 1e1000 x².",
    done(){return player.x2.gte("1e1000")},
  },
  25: {
    name: "Almost There!",
    desc: "Unlock Root Epicenter.",
    done(){return hasSU(16)},
  },
  26: {
    name: "X-hausted",
    desc: "Reach 1,000,000x.",
    done(){return player.x.gte(1e6)},
  },
  27: {
    name: "Epic Gamer",
    desc: "Complete 10 Challenges.",
    done(){return player.chalCompletions.length == 10},
  },
  28: {
    name: "Super Saiyan",
    desc: "Reach 1e45 Quadratic Power.",
    done(){return player.quadPower.gte(1e45)},
  },
  29: {
    name: "Outer Core",
    desc: "Complete Root Epicenter Level √4.",
    done(){return player.hasCompletedLevel4},
  },
  30: {
    name: "It's Not Simple",
    desc: "Go Complex.",
    done(){return player.totali.gte(1)},
  },
  31: {
    name: "Straight to the Point",
    desc: "Max the first row of Complex Upgrades.",
    done(){return hasCU(0,1) && hasCU(0,2) && hasCU(0,3) && hasCU(0,4)},
  },
  32: {
    name: "Not That Complicated",
    desc: "Go Complex in under 10 minutes.",
    done(){return player.prestigeTimes[3] <= 600},
  },
  33: {
    name: "One Mechanic Bites The Dust",
    desc: "Go Complex without using Quadratic Formula.",
    done(){return false},
  },
  34: {
    name: "Dream Mile",
    desc: "Obtain all Milestones.",
    done(){return hasMilestone(12)},
  },
  35: {
    name: "2 Million Quadratics",
    desc: "Go Quadratic 2,000,000 times.",
    done(){return player.quadratics.gte(2e6)},
  },
  36: {
    name: "Dedicated Upgrader",
    desc: "Have 25 total Upgrade Points.",
    done(){return player.upgradePoints[1].gte(25)},
  },
  37: {
    name: "Get Unreal",
    desc: "Have at least one of xi, yi, and x²i.",
    done(){return player.compPlane[0][1].gte(1) && player.compPlane[0][2].gte(1) && player.compPlane[0][3].gte(1)},
  },
  38: {
    name: "You're Still Here?",
    desc: "Reach 1e60,000 points with no Complex Upgrades.",
    done(){return player.points.gte("1e60000") && player.compUpgs[0].length === 0},
  },
  39: {
    name: "Triple Tripler",
    desc: "Have 3 i Triplers.",
    done(){return player.triplers.gte(3)},
  },
  40: {
    name: "Challenges, Round 2",
    desc: "Unlock Complex Challenges.",
    done(){return hasCU(1,6)},
  },
  41: {
    name: "Not Following Directions",
    desc: "Fail Complex Challenge 4.",
    done(){return false},
  },
  42: {
    name: "We're Not Done Yet",
    desc: "Complete 10 CC tiers in total.",
    done(){return ccTiers() >= 10 /* player.upgradePoints[1].gte(60) && player.upgradePoints[0].lte(player.upgradePoints[1].sub(60)) */},
  },
  43: {
    name: "Completing the Square",
    desc: "Complete Complex Challenge 1 five times.",
    done(){return player.compChalCompletions[1] == 5},
  },
  44: {
    name: "I've Been Everywhere",
    desc: "Have at least 2 Translations, Reflections, and Rotations.",
    done(){return player.transformations.bought[1].gte(2) && player.transformations.bought[2].gte(2) && player.transformations.bought[3].gte(2)},
  },
  45: {
    name: "The End",
    desc: "...for now.",
    done(){return player.y.gte(2222)},
  },
}

function hasAchievement(x) {
  return player.achievements.includes(x.toString())
}