function updateNotifs(){
  // Achievement Notifications
  for(let i in ACHIEVEMENTS){
    if(!player.achievements.includes(i)&&ACHIEVEMENTS[i].done()){
      player.achievements.push(i)
      if(i!=19)      $.notify("Achievement Unlocked: " + ACHIEVEMENTS[i].name, {
        style: 'apcurrent',
        className:'achieves',
      });
      else      $.notify("Achievement Unlocked: " + ACHIEVEMENTS[i].name(),{
        style: 'apcurrent',
        className:'achieves',
      });
    }
  }
  // Secret Achievement Notifications
  for(let i in SECRET_ACHIEVEMENTS){
    if(!player.secretAchievements.includes(i)&&SECRET_ACHIEVEMENTS[i].done()){
      player.secretAchievements.push(i)
      $.notify("Secret Achievement Unlocked: " + SECRET_ACHIEVEMENTS[i].name, {
        style: 'apcurrent',
        className:'secretAchieves',
      });
    }
  }
  // Milestone Notifications
  for(let i in MILESTONES){
    if(!player.obtainedMilestones.includes(i) && hasMilestone(i)){
      player.obtainedMilestones.push(i)
      $.notify("Milestone Reached: " + MILESTONES[i].title, {
        style: 'apcurrent',
        className:'unlock',
      });
    }
  }
  // Y-Quadratic Upgrade Unlock Notifications
  for(let i in YQUAD_UPGRADES){
    if(!player.yQuadUpgs[1].includes(i)&&YQUAD_UPGRADES[i].done() && player.zUnlocked){
      player.yQuadUpgs[1].push(i)
      $.notify("Y-Quadratic Upgrade Unlocked: " + YQUAD_UPGRADES[i].title, {
        style: 'apcurrent',
        className:'unlock',
      });
    }
  }
  // Speedrun Milestones
  for(let i in SPEEDRUN_MILESTONES){
    if(!player.speedrunData[i][1]&&SPEEDRUN_MILESTONES[i].done() && player.speedrunMode){
      player.speedrunData[i][0] = player.speedrunTimer
      player.speedrunData[i][1] = true
      $.notify("Speedrun Milestone Reached: " + SPEEDRUN_MILESTONES[i].name, {
        style: 'apcurrent',
        className:'unlock',
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
    desc(){return "Unlock Coordinate " + (player.zUnlocked ? "Realm" : "Plane") + "."},
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
    name(){return player.zUnlocked ? "Not enough for Z" : "Z isn't real"},
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
    name: "[DATA EXPUNGED]",
    desc: "Reach 2,222y.",
    done(){return player.y.gte(2222)},
  },
  46: {
    name: "Meeting Standards",
    desc: "Buy 4 Y-Quadratic Upgrades.",
    done(){return player.yQuadUpgs[0].length >= 4},
  },
  47: {
    name: "Nuclear Fission",
    desc: "Have 1 level of each Z-Collider.",
    done(){return player.zlab.levels[1] >= 1 && player.zlab.levels[2] >= 1 && player.zlab.levels[3] >= 1 && player.zlab.levels[4] >= 1},
  },
  48: {
    name: "One With Everything",
    desc: "Reach 60 total Upgrade Points.",
    done(){return player.upgradePoints[1].gte(60)},
  },
  49: {
    name: "181 best waifu",
    desc: "Start passively generating x².",
    done(){return hasMilestone(18)},
  },
  50: {
    name: "Cursed Products",
    desc: "Unlock the Variable Synthesizer.",
    done(){return player.varSynth.unlocked[0]},
  },
  51: {
    name: "Complex Conqueror",
    desc: "Have 1 completion of each Complex Challenge.",
    done(){return player.compChalCompletions[10] >= 1},
  },
  52: {
    name: "Nine Circles",
    desc: "Have 9 circles.",
    done(){return player.varSynth.circles.gte(9)},
  },
  53: {
    name: "Polar Rotation",
    desc: "Unlock i Exponentiation.",
    done(){return player.varSynth.unlocked[2]},
  },
  54: {
    name: "Round Three",
    desc: "Complete a Y-Challenge.",
    done(){return player.yChalCompletions[1] > 0},
  },
  55: {
    name: "Powers of X",
    desc: "Unlock Polynomials.",
    done(){return ccTiers() >= 50},
  },
  56: {
    name: "All-Seeing Eye",
    desc: "Reach 1e5000 i.",
    done(){return player.i.gte("1e5000")},
  },
  57: {
    name: "Artificial Operation",
    desc: "Unlock Synthetic Division.",
    done(){return player.polynomials[6].bought.gte(1)},
  },
  58: {
    name: "The Final Frontier",
    desc: "Unlock Y-Challenge 4.",
    done(){return player.yChalsUnlocked[4]},
  },
  59: {
    name: "Galactic Emperor",
    desc: "Start generating Upgrade Points.",
    done(){return hasSDU(11)},
  },
  60: {
    name: "The End",
    desc: "Beat the game.",
    done(){return player.points.gte("1e5e8")},
  },
}

function hasAchievement(x) {
  return player.achievements.includes(x.toString())
}

const SECRET_ACHIEVEMENTS = {
  1: {
    name: "Clicker Enthusiast",
    desc: "Click the \"+1 Point\" button at least 500 times in one session.",
    done(){return tmp.clicks >= 500},
  },
  2: {
    name: "Indecisive",
    desc: "Switch between Light and Dark theme at least 20 times in one session.",
    done(){return tmp.themeSwitches >= 40},
  },
  3: {
    name: "Following Directions",
    desc: "Follow directions.",
    done(){return false},
  },
  4: {
    name: "Not Quite Right",
    desc: "Respec an empty set of Complex Upgrades.",
    done(){return false},
  },
  5: {
    name: "A Complete Catalogue",
    desc: "Name all six presets.",
    done(){return player.presets.names[1] != "Preset 1" && player.presets.names[2] != "Preset 2" && player.presets.names[3] != "Preset 3" && player.presets.names[4] != "Preset 4" && player.presets.names[5] != "Preset 5" && player.presets.names[6] != "Preset 6"},
  },
  6: {
    name: "Those Are Buttons?",
    desc: "Click a Milestone.",
    done(){return false},
  },
  7: {
    name: "Blanked Out",
    desc: "Show the news ticker after hiding it.",
    done(){return false},
  },
  8: {
    name: "Remarkable Progress",
    desc: "Export your save as a file with 25 points or less.",
    done(){return false},
  },
  9: {
    name: "Illegal Hotkey",
    desc(){return "Attempt to purchase the " + (player.zUnlocked ? "4th" : "3rd") + " Variable."},
    done(){return false},
  },
  10: {
    name: "Professor",
    desc: "Expand all Textbook sections.",
    done(){return !tmp.textbook.expands.includes(false)},
  },
  11: {
    name: "Minimalist",
    desc: "Disable Offline Progress, Inactive Progress, Autosave, and Hotkeys.",
    done(){return !player.options[0] && !player.options[1] && !player.options[2] && !player.options[9]},
  },
  12: {
    name: "You Don't Need That",
    desc: "Buy Max while all Pre-Quadratic autobuyers are active.",
    done(){return false},
  },
  13: {
    name: "Sweaty Speedrunner",
    desc: "Have the sum of your Challenge records be under 2 seconds.",
    done(){return chalRecordsSum() < 2},
  },
  14: {
    name: "News Addict",
    desc: "See 3,000 news ticker messages.",
    done(){return player.newsMessagesSeen >= 3000},
  },
  15: {
    name: "Faster Than Light",
    desc: "Get a fastest Quadratic and Complex time of less than 0.02 seconds.",
    done(){return player.prestigeTimes[1] < 0.02 && player.prestigeTimes[3] < 0.02},
  },
  16: {
    name: "Way Too Much",
    desc: "Reach e1.000e9 Anti-Slope.",
    done(){return player.antiSlope.gte("1e1e9") && player.compChallenge == 2},
  },
  17: {
    name: "Show-Off",
    desc: "Enter Root Epicenter Level √-1 with Complex unlocked.",
    done(){return false},
  },
  18: {
    name: "Olden Days",
    desc: "Click the link to AP Classic.",
    done(){return false},
  },
  19: {
    name: "Integer Overflow",
    desc: "Try to increase a, b, or c beyond the cap.",
    done(){return false},
  },
  20: {
    name: "Super Secret",
    desc: "Have every other Secret Achievement.",
    done(){return player.secretAchievements.length >= 19},
  },
}

function hasSecretAchievement(x) {
  return player.secretAchievements.includes(x.toString())
}

const SPEEDRUN_MILESTONES = {
  0: {
    name:"First X",
    done(){return player.x.gte(1)}
  },
  1: {
    name:"f(x) Bought",
    done(){return player.buyables[4].gte(1)}
  },
  2: {
    name:"Gone Quadratic",
    done(){return player.totalx2.gte(1)}
  },
  3: {
    name:"Coordinate Plane Unlocked",
    done(){return hasQU(12)}
  },
  4: {
    name:"Square Root Unlocked",
    done(){return hasQU(16)}
  },
  5: {
    name:"Challenge 1 Completed",
    done(){return player.chalCompletions.includes(1)}
  },
  6: {
    name:"Quadratic Formula Unlocked",
    done(){return hasQU(20)}
  },
  7: {
    name:"Root Epicenter Unlocked",
    done(){return hasSU(16)}
  },
  8: {
    name:"Gone Complex",
    done(){return player.totali.gte(1)}
  },
  9: {
    name:"Complex Plane Unlocked",
    done(){return player.complexes.gte(20)}
  },
  10: {
    name:"Complex Challenge 1x1 Completed",
    done(){return ccTiers() >= 1}
  },
  11: {
    name:"First Z",
    done(){return player.zUnlocked}
  },
  12: {
    name:"Z Lab Unlocked",
    done(){return hasYQU(8,'bought')}
  },
  13: {
    name:"Variable Synthesizer Unlocked",
    done(){return player.varSynth.unlocked[0]}
  },
  14: {
    name:"Y-Challenges Unlocked",
    done(){return player.yChalsUnlocked[1]}
  },
  15: {
    name:"Polynomials Unlocked",
    done(){return ccTiers() >= 50}
  },
  16: {
    name:"Synthetic Division Unlocked",
    done(){return player.polynomials[6].bought.gte(1)}
  },
  17: {
    name:"Game Completed",
    done(){return player.points.gte("1e5e8")}
  },
}