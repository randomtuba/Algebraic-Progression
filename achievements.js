/*
Welcome to achievements.js! This is where a bunch of achievement and notification stuff is contained. In here you will find:
- Various unlock notifications
- Achievement, secret achievement, and speedrun milestone storage data
*/

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
  // Daily Achievement Notifications
  for(let i = 0; i < 3; i++){
    if(!player.dailyAchievements[1].includes(player.dailyAchievements[0][i]) && DailyAchievements.standardize(player.dailyAchievements[0][i]).done()){
      player.dailyAchievements[1].push(player.dailyAchievements[0][i])
      $.notify("Daily Achievement Unlocked: " + DailyAchievements.standardize(player.dailyAchievements[0][i]).name, {
        style: 'apcurrent',
        className:'dailyAchieves',
      });
    }
  }
  // Milestone Notifications
  if(!player.inLostIntegration) {
    for(let i in MILESTONES){
      if(!player.obtainedMilestones.includes(i) && hasMilestone(i)){
        player.obtainedMilestones.push(i)
        $.notify("Milestone Reached: " + MILESTONES[i].title, {
          style: 'apcurrent',
          className:'unlock',
        });
      }
    }
  } else if (player.inLostIntegration) {
    for(let i in ComplexMilestonesLI){
      if(!player.obtainedMilestones.includes(i) && hasComplexMilestoneLI(i)){
        player.obtainedMilestones.push(i)
        $.notify("Milestone Reached: " + ComplexMilestonesLI[i].title, {
          style: 'apcurrent',
          className:'unlock',
        });
      }
    }
  }
  // Y-Quadratic Upgrade Unlock Notifications
  for(let i in YQUAD_UPGRADES){
    if(!player.yQuadUpgs[1].includes(i)&&YQUAD_UPGRADES[i].done() && player.zUnlocked && !player.inLostIntegration){
      player.yQuadUpgs[1].push(i)
      if(!IntegrationUpgrades.yqr.isBought() || i > 12) {
        $.notify("Y-Quadratic Upgrade Unlocked: " + YQUAD_UPGRADES[i].title, {
          style: 'apcurrent',
          className:'unlock',
        });
      }
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
  // Integration Upgrade Unlock Notifications
  if(!player.inLostIntegration) {
    for(let i in IntegrationUpgrades){
      if(!player.integration.upgrades.unlocked.includes(IntegrationUpgrades[i].id) && IntegrationUpgrades[i].hasUnlock != null && IntegrationUpgrades[i].hasUnlock && IntegrationUpgrades[i].done()){
        player.integration.upgrades.unlocked.push(IntegrationUpgrades[i].id)
        $.notify("Integration Upgrade Unlocked: " + IntegrationUpgrades[i].id, {
          style: 'apcurrent',
          className:'unlock',
        });
      }
    }
  }
  // Alteration Notifications
  if(!player.inLostIntegration) {
    for(let i = 1; i < 7; i++){
      if(!player.obtainedAlterations.includes(i) && Alterations.has(i)){
        player.obtainedAlterations.push(i)
        $.notify("Alteration Reached: " + Alterations[i].title, {
          style: 'apcurrent',
          className:'unlock',
        });
      }
    }
  } else {
    for(let i = 1; i < 13; i++){
      if(!player.obtainedAlterations.includes(i) && FractalMilestones.has(i)){
        player.obtainedAlterations.push(i)
        $.notify("Fractal Milestone Reached: " + FractalMilestones[i].title, {
          style: 'apcurrent',
          className:'unlock',
        });
      }
    }
  }
}

const ACHIEVEMENTS = {
  1: {
    name: "Cheater",
    desc(){return `Buy an Autoclicker.`},
    done(){return player.buyables[1].gte(1) || IntegrationUpgrades.anr.isBought()},
  },
  2: {
    name: "Mass Production",
    desc(){return `Build a Point Factory.`},
    done(){return player.buyables[2].gte(1) || IntegrationUpgrades.anr.isBought()},
  },
  3: {
    name: "A Rift in Space",
    desc(){return `Summon a Point Portal.`},
    done(){return player.buyables[3].gte(1) || IntegrationUpgrades.anr.isBought()},
  },
  4: {
    name: "Mystery Value",
    desc(){return `Get ${formatWhole(1)}x.`},
    done(){return player.x.gte(1) || IntegrationUpgrades.anr.isBought()},
  },
  5: {
    name: "Function()",
    desc(){return `Unlock Functions.`},
    done(){return hasUpgrade(4) || IntegrationUpgrades.anr.isBought()},
  },
  6: {
    name: "Valuable Variable",
    desc(){return `Get ${formatWhole(1)}y.`},
    done(){return player.y.gte(1) || IntegrationUpgrades.anr.isBought()},
  },
  7: {
    name: "Getting Squared",
    desc(){return `Go Quadratic.`},
    done(){return player.totalx2.gte(1) || IntegrationUpgrades.anr.isBought()},
  },
  8: {
    name: "GAS GAS GAS",
    desc(){return `Reach ${format(1e15)} points.`},
    done(){return (player.points.gte(1e15) && !isNaN(player.points)) || IntegrationUpgrades.anr.isBought()},
  },
  9: {
    name: "(softcapped)",
    desc(){return `Get g(n) and h(n) to ${formatWhole(15)}.`},
    done(){return (player.buyables[5].gte(15) && player.buyables[6].gte(15)) || IntegrationUpgrades.anr.isBought()},
  },
  10: {
    name: "Graphing Time",
    desc(){return `Unlock Coordinate ${player.zUnlocked ? `Realm` : `Plane`}.`},
    done(){return hasQU(12) || IntegrationUpgrades.anr.isBought()},
  },
  11: {
    name: "Full Automation",
    desc(){return `Unlock Auto-Quadratic.`},
    done(){return hasQU(14) || IntegrationUpgrades.anr.isBought()},
  },
  12: {
    name: "Inverse Quadratic",
    desc(){return `Unlock Square Root.`},
    done(){return hasQU(16) || IntegrationUpgrades.anr.isBought()},
  },
  13: {
    name: "Polynomial Growth",
    desc(){return `Make buildings produce each other.`},
    done(){return hasUpgrade(6) || IntegrationUpgrades.anr.isBought()},
  },
  14: {
    name: "y = mx",
    desc(){return `Reach ${format(1e6)} slope.`},
    done(){return player.slope.gte(1e6) || IntegrationUpgrades.anr.isBought()},
  },
  15: {
    name: "Googol",
    desc(){return `Reach ${format(1e100)} points.`},
    done(){return (player.points.gte(1e100) && !isNaN(player.points)) || IntegrationUpgrades.anr.isBought()},
  },
  16: {
    name: "The Challenging Achievement",
    desc(){return `Unlock Challenges.`},
    done(){return hasSU(12) || IntegrationUpgrades.anr.isBought()},
  },
  17: {
    name: "Infinite Possibilities",
    desc(){return `Reach ${format(1.79e308)} points.`},
    done(){return (player.points.gte(1.79e308) && !isNaN(player.points)) || IntegrationUpgrades.anr.isBought()},
  },
  18: {
    name: "To B or not to B",
    desc(){return `Get ${formatWhole(3)} b.`},
    done(){return player.b.gte(3) || IntegrationUpgrades.anr.isBought()},
  },
  19: {
    name(){return player.zUnlocked ? "Not enough for Z" : "Z isn't real"},
    desc(){return `Get ${formatWhole(100)}y.`},
    done(){return player.y.gte(100) || IntegrationUpgrades.anr.isBought()},
  },
  20: {
    name: "(-b ± √(b^2 - 4ac)) / 2a",
    desc(){return `Unlock Quadratic Formula.`},
    done(){return hasQU(20) || IntegrationUpgrades.anr.isBought()},
  },
  21: {
    name: "f(Infinite)",
    desc(){return `Have a ${format(1.79e308)}x multiplier from Functions.`},
    done(){return BUYABLES[4].eff().mul(BUYABLES[5].eff()).mul(BUYABLES[6].eff()).gte(1.79e308) || IntegrationUpgrades.anr.isBought()},
  },
  22: {
    name: "Doubled Storage",
    desc(){return `Buy ${formatWhole(5)} Limit Expanders.`},
    done(){return player.quadBuyables[4].gte(5) || IntegrationUpgrades.anr.isBought()},
  },
  23: {
    name: "Not-so-challenging",
    desc(){return `Reach ${format("1e3000")} points in a Challenge.`},
    done(){return (player.points.gte("1e3000") && player.challenge != 0) || IntegrationUpgrades.anr.isBought()},
  },
  24: {
    name: "Quadratic Millennium",
    desc(){return `Reach ${format("1e1000")} x².`},
    done(){return player.x2.gte("1e1000") || IntegrationUpgrades.anr.isBought()},
  },
  25: {
    name: "Almost There!",
    desc(){return `Unlock Root Epicenter.`},
    done(){return hasSU(16) || IntegrationUpgrades.anr.isBought()},
  },
  26: {
    name: "X-hausted",
    desc(){return `Reach ${format(1e6)}x.`},
    done(){return player.x.gte(1e6) || IntegrationUpgrades.anr.isBought()},
  },
  27: {
    name: "Epic Gamer",
    desc(){return `Complete ${formatWhole(10)} Challenges.`},
    done(){return player.chalCompletions.length == 10 || IntegrationUpgrades.anr.isBought()},
  },
  28: {
    name: "Super Saiyan",
    desc(){return `Reach ${format(1e45)} Quadratic Power.`},
    done(){return player.quadPower.gte(1e45) || IntegrationUpgrades.anr.isBought()},
  },
  29: {
    name: "Outer Core",
    desc(){return `Complete Root Epicenter Level √4.`},
    done(){return player.hasCompletedLevel4 || IntegrationUpgrades.anr.isBought()},
  },
  30: {
    name: "It's Not Simple",
    desc(){return `Go Complex.`},
    done(){return player.totali.gte(1) || IntegrationUpgrades.anr.isBought()},
  },
  31: {
    name: "Straight to the Point",
    desc(){return `Max the first row of Complex Upgrades.`},
    done(){return (hasCU(0,1) && hasCU(0,2) && hasCU(0,3) && hasCU(0,4)) || IntegrationUpgrades.anr.isBought()},
  },
  32: {
    name: "Not That Complicated",
    desc(){return `Go Complex in under ${formatWhole(10)} minutes.`},
    done(){return player.prestigeTimes[3] <= 600 || IntegrationUpgrades.anr.isBought()},
  },
  33: {
    name: "One Mechanic Bites The Dust",
    desc(){return `Go Complex without using Quadratic Formula.`},
    done(){return IntegrationUpgrades.anr.isBought()},
  },
  34: {
    name: "Dream Mile",
    desc(){return `Obtain ${formatWhole(12)} Milestones.`},
    done(){return hasMilestone(12) || IntegrationUpgrades.anr.isBought()},
  },
  35: {
    name: "2 Million Quadratics",
    desc(){return `Go Quadratic ${format(2e6)} times.`},
    done(){return player.quadratics.gte(2e6) || IntegrationUpgrades.anr.isBought()},
  },
  36: {
    name: "Dedicated Upgrader",
    desc(){return `Have ${formatWhole(25)} total Upgrade Points.`},
    done(){return player.upgradePoints[1].gte(25) || IntegrationUpgrades.anr.isBought()},
  },
  37: {
    name: "Get Unreal",
    desc(){return `Have at least one of xi, yi, and x²i.`},
    done(){return (player.compPlane[0][1].gte(1) && player.compPlane[0][2].gte(1) && player.compPlane[0][3].gte(1)) || IntegrationUpgrades.anr.isBought()},
  },
  38: {
    name: "You're Still Here?",
    desc(){return `Reach ${format("1e60000")} points without Complex Upgrades.`},
    done(){return (player.points.gte("1e60000") && player.compUpgs[0].length === 0) || IntegrationUpgrades.anr.isBought()},
  },
  39: {
    name: "Triple Tripler",
    desc(){return `Have ${formatWhole(3)} i Triplers.`},
    done(){return player.triplers.gte(3) || IntegrationUpgrades.anr.isBought()},
  },
  40: {
    name: "Challenges, Round 2",
    desc(){return `Unlock Complex Challenges.`},
    done(){return hasCU(1,6) || IntegrationUpgrades.anr.isBought()},
  },
  41: {
    name: "Not Following Directions",
    desc(){return `Fail Complex Challenge 4.`},
    done(){return IntegrationUpgrades.anr.isBought()},
  },
  42: {
    name: "We're Not Done Yet",
    desc(){return `Complete ${formatWhole(10)} CC tiers in total.`},
    done(){return ccTiers() >= 10 || IntegrationUpgrades.anr.isBought()},
  },
  43: {
    name: "Completing the Square",
    desc(){return `Complete Complex Challenge 1 five times.`},
    done(){return player.compChalCompletions[1] == 5 || IntegrationUpgrades.anr.isBought()},
  },
  44: {
    name: "I've Been Everywhere",
    desc(){return `Have at least ${formatWhole(2)} Translations, Reflections, and Rotations.`},
    done(){return (player.transformations.bought[1].gte(2) && player.transformations.bought[2].gte(2) && player.transformations.bought[3].gte(2)) || IntegrationUpgrades.anr.isBought()},
  },
  45: {
    name: "[DATA EXPUNGED]",
    desc(){return `Get ${format(2222)}y.`},
    done(){return player.y.gte(2222) || IntegrationUpgrades.anr.isBought()},
  },
  46: {
    name: "Meeting Standards",
    desc(){return `Buy ${formatWhole(4)} Y-Quadratic Upgrades.`},
    done(){return player.yQuadUpgs[0].length >= 4 || IntegrationUpgrades.anr.isBought()},
  },
  47: {
    name: "Nuclear Fission",
    desc(){return `Have ${formatWhole(1)} level of each Z-Collider.`},
    done(){return (player.zlab.levels[1] >= 1 && player.zlab.levels[2] >= 1 && player.zlab.levels[3] >= 1 && player.zlab.levels[4] >= 1) || IntegrationUpgrades.anr.isBought()},
  },
  48: {
    name: "One With Everything",
    desc(){return `Reach ${formatWhole(60)} total Upgrade Points.`},
    done(){return player.upgradePoints[1].gte(60) || IntegrationUpgrades.anr.isBought()},
  },
  49: {
    name: "Study 181",
    desc(){return `Start passively generating x².`},
    done(){return hasMilestone(18) || IntegrationUpgrades.anr.isBought()},
  },
  50: {
    name: "Cursed Products",
    desc(){return `Unlock the Variable Synthesizer.`},
    done(){return player.varSynth.unlocked[0] || IntegrationUpgrades.anr.isBought()},
  },
  51: {
    name: "Complex Conqueror",
    desc(){return `Have ${formatWhole(1)} completion of each Complex Challenge.`},
    done(){return player.compChalCompletions[10] >= 1 || IntegrationUpgrades.anr.isBought()},
  },
  52: {
    name: "Nine Circles",
    desc(){return `Have ${formatWhole(9)} circles.`},
    done(){return player.varSynth.circles.gte(9) || IntegrationUpgrades.anr.isBought()},
  },
  53: {
    name: "Polar Rotation",
    desc(){return `Unlock i Exponentiation.`},
    done(){return player.varSynth.unlocked[2] || IntegrationUpgrades.anr.isBought()},
  },
  54: {
    name: "Round Three",
    desc(){return `Complete a Y-Challenge.`},
    done(){return player.yChalCompletions[1] > 0 || IntegrationUpgrades.anr.isBought()},
  },
  55: {
    name: "Powers of X",
    desc(){return `Unlock Polynomials.`},
    done(){return ccTiers() >= 50 || IntegrationUpgrades.anr.isBought()},
  },
  56: {
    name: "All-Seeing Eye",
    desc(){return `Reach ${format("1e5000")} i.`},
    done(){return player.i.gte("1e5000") || IntegrationUpgrades.anr.isBought()},
  },
  57: {
    name: "Artificial Operation",
    desc(){return `Unlock Synthetic Division.`},
    done(){return player.polynomials[6].bought.gte(1) || IntegrationUpgrades.anr.isBought()},
  },
  58: {
    name: "The Final Frontier",
    desc(){return `Unlock Y-Challenge 4.`},
    done(){return player.yChalsUnlocked[4] || IntegrationUpgrades.anr.isBought()},
  },
  59: {
    name: "Galactic Emperor",
    desc(){return `Start generating Upgrade Points.`},
    done(){return hasSDU(11) || IntegrationUpgrades.anr.isBought()},
  },
  60: {
    name: "Universal Collapse",
    desc(){return `Reach ${format("1e5e8")} points.`},
    done(){return (player.points.gte("1e5e8") && !isNaN(player.points)) || IntegrationUpgrades.anr.isBought()},
  },
  61: {
    name: "Under The Curve",
    desc(){return `Integrate into a new universe.`},
    done(){return player.integrations.gt(0)},
  },
  62: {
    name: "Broken Continuum",
    desc(){return `Unlock the Temporal Plane.`},
    done(){return player.integration.temporalPlane.unlocked},
  },
  63: {
    name: "Brainf*ck",
    desc(){return `Unlock the Automation Core.`},
    done(){return player.integrations.gte(15)},
  },
  64: {
    name: "Quality of Lives",
    desc(){return `Buy all of the upgrades in the Perk Tree.`},
    done(){return player.integration.upgrades.qol.length >= 40},
  },
  65: {
    name: "2 Million Complexes",
    desc(){return `Go Complex ${format(2e6)} times.`},
    done(){return player.complexes.gte(2e6)},
  },
  66: {
    name: "Truly Upgradeless",
    desc(){return `Integrate without using the first 12 Complex Upgrades.`},
    done(){return false},
  },
  67: {
    name: "Invincible II",
    desc(){return `Successfully time-jump at least 1 real-time hour into the future.`},
    done(){return player.integration.temporalPlane.timeJumpDuration > 0 && tmp.holesToSacrifice.gte(SinusoidalUpgrades.has(19) ? 6 : 12)},
  },
  68: {
    name: "Gotta Go Fast",
    desc(){return `Integrate in under ${formatWhole(3)} seconds (game time).`},
    done(){return player.gamePrestigeTimes[7].lte(3)},
  },
  69: {
    name: "Actually Unlimited",
    desc(){return `Obtain at least ${format(1000000)} limit score.`},
    done(){return player.integration.limitScore.gte(1e6)},
  },
  70: {
    name: "Cult of the Exponents",
    desc(){return `Factor your Polynomials.`},
    done(){return player.integration.polyFactoringMult.gt(1)},
  },
  71: {
    name: "Do The Wave",
    desc(){return `Go Sinusoidal.`},
    done(){return player.sinusoidals.gte(1)},
  },
  72: {
    name: "Superset",
    desc(){return `Have 5 different Number Set types activated at once.`},
    done(){return player.integration.active.types.length >= 5},
  },
  73: {
    name: "Better Than Slope",
    desc(){return `Unlock Derivatives.`},
    done(){return player.integration.chalCompletions[3] >= 10},
  },
  74: {
    name: "There's No Point",
    desc(){return `Reach ${format("1e20000000")} i without producing points.`},
    done(){return player.i.gte("1e20000000") && pps().eq(0) && !player.integration.buildingsBought},
  },
  75: {
    name: "New Polynomials???",
    desc(){return `Buy 1 y⁵.`},
    done(){return player.yPolynomials[5].bought.gte(1)},
  },
  76: {
    name: "[REDACTED]",
    desc(){return `Reach 79,000 z.`},
    done(){return player.z.gte(79000)},
  },
  77: {
    name: "It's Quite Simple, Really",
    desc(){return `Complete all CCs in less than 5 seconds (real time) without the Automation Core.`},
    done(){return ccTiers() >= 50 && player.prestigeTimes[6] < 5 && player.integration.autocoreTicks < 1},
  },
  78: {
    name: "Sonic Wave",
    desc(){return `Reach at least 1e200 for all Trigonometric Function powers.`},
    done(){return player.trigFunctions.powers[6].gte(1e200)},
  },
  79: {
    name: "No Natural Flavors",
    desc(){return `Reach ${format("e2.36e12")} Points in Synthetic Division.`},
    done(){return player.points.gte("1e2.36e12") && player.inSynthDiv},
  },
  80: {
    name: "Two With Everything",
    desc(){return `Buy all Hypercomplex Upgrades.`},
    done(){return player.hypercompUpgs.dynamic.length >= 16},
  },
  81: {
    name: "Back To The Past",
    desc(){return `Enter Integration Challenge 8.`},
    done(){return player.inLostIntegration},
  },
  82: {
    name: "Sacrifices To randomtuba",
    desc(){return `Sacrifice 10y to the Coordinate Plane in the Lost Integration.`},
    done(){return player.sacY.gte(10) && player.inLostIntegration},
  },
  83: {
    name: "x²? What's That?",
    desc(){return `Reach ${format(1e12)} Reset Points.`},
    done(){return player.x2.gte(1e12) && player.inLostIntegration},
  },
  84: {
    name: "It's Still Not Simple",
    desc(){return `Go Complex in the Lost Integration.`},
    done(){return player.totali.gte(1) && player.inLostIntegration},
  },
  85: {
    name: "Cha Cha Real Smooth",
    desc(){return `Travel at least +5 on the Complex Plane.`},
    done(){return player.compPlane[0][3].gte(5) && player.inLostIntegration},
  },
  86: {
    name: "Sixth Sense",
    desc(){return `Complete Y Challenge 6.`},
    done(){return player.yChalCompletions[6].gt(0) && player.inLostIntegration},
  },
  87: {
    name: "Complex Conqueror 2",
    desc(){return `Complete all CC tiers in the Lost Integration.`},
    done(){return ccTiers() >= 24 && player.inLostIntegration},
  },
  88: {
    name: "Center of a Fractal",
    desc(){return `Enter the Mandelbrot.`},
    done(){return player.integrations.gte(1) && player.inLostIntegration},
  },
  89: {
    name: "Running For Your Life",
    desc(){return `Reach 1e2950 minibrots in 15 seconds or less.`},
    done(){return player.integration.derivatives[0].gte("1e2950") && Minibrots.cap().log(Minibrots.multPerSecond()).lte(15) && player.inLostIntegration},
  },
  90: {
    name: "The End",
    desc(){return `Beat the game.`},
    done(){return FractalArm.hasUpgrade(221) && player.inLostIntegration},
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
    desc(){return "Attempt to purchase the " + (player.zUnlocked ? (player.wUnlocked ? "5th" : "4th") : "3rd") + " Variable."},
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
    desc: "Get a fastest Quadratic and Complex time of less than 0.03 seconds.",
    done(){return player.prestigeTimes[1] < 0.03 && player.prestigeTimes[3] < 0.03},
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
    name: "Complex Build Advanced",
    desc: "Make your Complex Upgrades build into a chessboard pattern.",
    done(){return ((hasCU(0,1) && hasCU(0,3) && hasCU(0,6) && hasCU(0,8) && hasCU(0,9) && hasCU(0,11)) || (hasCU(0,2) && hasCU(0,4) && hasCU(0,5) && hasCU(0,7) && hasCU(0,10) && hasCU(0,12))) && player.compUpgs[0].length < 7},
  },
  21: {
    name: "Jumping to Conclusions",
    desc: "Time-jump 48 real-time hours into the future.",
    done(){return false},
  },
  22: {
    name: "Trefoil",
    desc: "Be in Square Root, Synthetic Division, and The Limit all at once.",
    done(){return player.inSqrt && player.inSynthDiv && player.integration.inTheLimit},
  },
  23: {
    name: "Time Flies",
    desc: "Be on a different save slot or offline for at least 48 hours.",
    done(){return tmp.maxDiff >= 172800 && tmp.maxDiff < 1e8},
  },
  24: {
    name: "Why Isn't It Possible?",
    desc: "Stay a maxed Limit run for at least 2 minutes (real time) without completing it.",
    done(){return player.integration.inTheLimit && Limit.totalLevels().gte(80) && player.prestigeTimes[6] >= 120 && IntegrationPrestige.dxFormula().lt(1)},
  },
  25: {
    name: "Zero-Indexing",
    desc: "Enter 0 for all Automation Core inputs.",
    done(){return new Decimal(player.integration.automationCore.inputs.startCCSweepReq).eq(0) && new Decimal(player.integration.automationCore.inputs.synthDivIReq1).eq(0) && new Decimal(player.integration.automationCore.inputs.synthDivSEReq1).eq(0) && new Decimal(player.integration.automationCore.inputs.synthDivIReq2).eq(0) && new Decimal(player.integration.automationCore.inputs.synthDivSEReq2).eq(0) && new Decimal(player.integration.automationCore.inputs.grindQuadraticsReq).eq(0)},
  },
  26: {
    name: "Offroad Adventures",
    desc: "Find a secret Integration Upgrade.",
    done(){return tmp.clickedSecretUpgrade},
  },
  27: {
    name: "Circular Reasoning",
    desc: "Go around the Unit Circle several times.",
    done(){return Math.abs(tmp.unitCircleRotations) >= 5},
  },
  28: {
    name: "This Again?",
    desc: "Respec an empty Fractal Arm.",
    done(){return false},
  },
  29: {
    name: "No Infinite Completions",
    desc: "Reenter a completed Y Challenge.",
    done(){return false},
  },
  30: {
    name: "Super Secret",
    desc: "Have every other Secret Achievement.",
    done(){return player.secretAchievements.length >= 29},
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
    name:"f(n) Bought",
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
    done(){return !player.inLostIntegration && player.polynomials[6].bought.gte(1)}
  },
  17: {
    name:"First Integration",
    done(){return player.integrations.gte(1)}
  },
  18: {
    name:"Temporal Plane Unlocked",
    done(){return player.integration.temporalPlane.unlocked}
  },
  19: {
    name:"Automation Core Unlocked",
    done(){return player.integrations.gte(15)}
  },
  20: {
    name:"The Limit Unlocked",
    done(){return IntegrationUpgrades.integration4.isBought()}
  },
  21: {
    name:"Gone Sinusoidal",
    done(){return player.totalTriangles.gte(1)}
  },
  22: {
    name:"Integration Challenge 2 Unlocked",
    done(){return IntegrationUpgrades.ic2.isBought()}
  },
  23: {
    name:"Derivatives Unlocked",
    done(){return player.integration.chalCompletions[3] >= 10}
  },
  24: {
    name:"Unit Circle Unlocked",
    done(){return player.unitCircle.unlocked}
  },
  25: {
    name:"Pythagorean Triples Unlocked",
    done(){return player.pythTriples.unlocked}
  },
  26: {
    name:"First W",
    done(){return player.wUnlocked}
  },
  27: {
    name:"Hypercomplex Flune Unlocked",
    done(){return BasicHypercompUpgrades.has(6)}
  },
  28: {
    name:"Integration Challenge 6 Unlocked",
    done(){return IntegrationUpgrades.ic6.isBought()}
  },
  29: {
    name:"Integration Challenge 8 Unlocked",
    done(){return IntegrationUpgrades.ic8.isBought()}
  },
  30: {
    name:"First X in Lost Integration",
    done(){return player.x.gte(1) && player.inLostIntegration}
  },
  31: {
    name:"Generator Multiplier Unlocked in Lost Integration",
    done(){return hasUpgrade(4) && player.inLostIntegration}
  },
  32: {
    name:"Resetted in Lost Integration",
    done(){return player.totalx2.gte(1) && player.inLostIntegration}
  },
  33: {
    name:"Coordinate Plane Unlocked in Lost Integration",
    done(){return hasQU(5) && player.inLostIntegration}
  },
  34: {
    name:"Square Root Unlocked in Lost Integration",
    done(){return hasQU(15) && player.inLostIntegration}
  },
  35: {
    name:"Root Epicenter Unlocked in Lost Integration",
    done(){return hasQU(20) && player.inLostIntegration}
  },
  36: {
    name:"Exponential Curve Unlocked in Lost Integration",
    done(){return hasQU(23) && player.inLostIntegration}
  },
  37: {
    name:"Gone Complex in Lost Integration",
    done(){return player.totali.gte(1) && player.inLostIntegration}
  },
  38: {
    name:"Complex Plane Unlocked in Lost Integration",
    done(){return hasComplexMilestoneLI(12) && player.inLostIntegration}
  },
  39: {
    name:"Complex Challenge 1x1 Completed in Lost Integration",
    done(){return ccTiers() >= 1 && player.inLostIntegration}
  },
  40: {
    name:"First Z in Lost Integration",
    done(){return player.zUnlocked && player.inLostIntegration}
  },
  41: {
    name:"Z Lab Unlocked in Lost Integration",
    done(){return hasYQU(8,'lost') && player.inLostIntegration}
  },
  42: {
    name:"Y Challenges Unlocked in Lost Integration",
    done(){return hasYQU(16,'lost') && player.inLostIntegration}
  },
  43: {
    name:"X Powers Unlocked in Lost Integration",
    done(){return ccTiers() >= 24 && player.inLostIntegration}
  },
  44: {
    name:"Entered the Mandelbrot in Lost Integration",
    done(){return player.integrations.gte(1) && player.inLostIntegration}
  },
  45: {
    name:"11 Fractal Milestones in Lost Integration",
    done(){return FractalMilestones.has(11) && player.inLostIntegration}
  },
  46: {
    name:"Minibrots Unlocked in Lost Integration",
    done(){return FractalArm.hasUpgrade(81) && player.inLostIntegration}
  },
  47: {
    name:"Mandelbrot Challenge 1 Complete in Lost Integration",
    done(){return player.integration.chalCompletions[9][1] < 120 && player.inLostIntegration}
  },
  48: {
    name:"Y Powers Unlocked in Lost Integration",
    done(){return FractalMilestones.has(12) && player.inLostIntegration}
  },
  49: {
    name:"Game Completed",
    done(){return FractalArm.hasUpgrade(221) && player.inLostIntegration}
  },
}

const DailyAchievements = {
  1: { // Before square root
    1: {name: "Architect",desc(){return `Have at least ${formatWhole(100)} of each Building.`},done(){return player.buyables[1].gte(100) && player.buyables[2].gte(100) && player.buyables[3].gte(100)}},
    2: {name: "So Close...",desc(){return `Reach ${formatWhole(99)}x.`},done(){return player.x.gte(99)}},
    3: {name: "Dysfunctional",desc(){return `Reach ${formatWhole(100)}x with no Functions bought.`},done(){return player.x.gte(100) && player.buyables[4].eq(0) && player.buyables[5].eq(0) && player.buyables[6].eq(0)}},
    4: {name: "Environmentally Safe",desc(){return `Reach ${format(1e30)} points with only Autoclickers.`},done(){return player.points.gte(1e30) && player.buyables[2].eq(0) && player.buyables[3].eq(0) && player.buyables[4].eq(0) && player.buyables[5].eq(0) && player.buyables[6].eq(0)}},
    5: {name: "Because I Like To Grind",desc(){return `Play for ${formatWhole(3)} hours.`},done(){return player.gameTimePlayed.gte(10800)}},
  },
  2: { // Square root to quadratic formula
    1: {name: "Nested Roots",desc(){return `Purchase an RE doubler.`},done(){return player.sqrtDoublers.gte(1)}},
    2: {name: "World Population",desc(){return `Have ${format(8e9)} Autoclickers.`},done(){return player.buyables[1].add(player.buyables[7]).gte(8e9)}},
    3: {name: "In & Out",desc(){return `Enter Square Root ${formatWhole(30)} times.`},done(){return player.sqrtEnters >= 30}},
    4: {name: "Blink And You'll Miss It",desc(){return `Complete Challenge 1 in under ${format(0.33)} seconds.`},done(){return player.challengeRecords[1] < 0.33}},
    5: {name: "Long Elevator",desc(){return `Complete Challenge 2 in under ${formatWhole(10)} seconds.`},done(){return player.challengeRecords[2] < 10}},
  },
  3: { // Quadratic formula to complex
    1: {name: "Infinite Possibilities II",desc(){return `Reach ${format(1.79e308)} x².`},done(){return player.x2.gte(1.79e308)}},
    2: {name: "Open the Floodgates",desc(){return `Complete Root Epicenter Level √-1.`},done(){return player.hasCompletedLevel5}},
    3: {name: "ZOOOOOM!",desc(){return `Go Quadratic in under ${format(0.2)} seconds while having ${formatWhole(4)} Variable Couplers.`},done(){return false}},
    4: {name: "No CE Here, Though",desc(){return `Reach ${format("1e7000")} points in Root Epicenter Level √2.`},done(){return player.points.gte("1e7000") && player.inSqrt && player.epicenterLevel == '2'}},
    5: {name: "Döppelgangers",desc(){return `Have a, b, and c ≥ ${formatWhole(10)} and all be equal to each other.`},done(){return player.abc[1].eq(player.abc[2]) && player.abc[2].eq(player.abc[3]) && player.abc[1].add(player.abc[2]).add(player.abc[3]).gte(30)}},
  },
  4: { // Complex to complex challenges
    1: {name: "This Can't Be Real",desc(){return `Have ${formatWhole(6)} respeccable Complex Upgrades bought.`},done(){return player.compUpgs[0].length >= 6}},
    2: {name: "The Strongest BCU",desc(){return `Reach an effect of ^1.1 from Basic Complex Upgrade 4.`},done(){return BCOMP_UPGRADES[4].eff().gte(1.1)}},
    3: {name: "Eternal Complex",desc(){return `Go Complex ${formatWhole(1000)} times.`},done(){return player.complexes.gte(1000)}},
    4: {name: "Yo dawg, I heard you liked Quadratics...",desc(){return `Go Quadratic for ${format("1e1000")}x more x² than the previous x² amount.`},done(){return false}},
    5: {name: "Ignoring The Basics",desc(){return `Go Complex with ${formatWhole(1)} Autoclicker and no Functions bought.`},done(){return false}},
  },
  5: { // Complex challenges to y-quadratic
    1: {name: "Waiting Game",desc(){return `Reach a multiplier of ${format(1e150)}x from Challenge 9.`},done(){return CHALLENGES[9].effect().gte(1e150)}},
    2: {name: "CC3 Wasn't Next?",desc(){return `Complete Complex Challenge 5 once.`},done(){return player.compChalCompletions[5] >= 1}},
    3: {name: "Inception Noise!",desc(){return `Enter a Challenge while in a Complex Challenge.`},done(){return player.challenge != 0 && player.compChallenge != 0}},
    4: {name: "Vastly Unprepared",desc(){return `Enter a Complex Challenge with no Complex Upgrades bought.`},done(){return player.compChallenge != 0 && player.compUpgs[0].length == 0}},
    5: {name: "Old Habits Die Hard",desc(){return `Enter regular Square Root while having automatic RE generation.`},done(){return player.inSqrt && player.epicenterLevel == '1' && hasMilestone(15)}},
  },
  6: { // Y-quadratic to variable synthesizer
    1: {name: "We Need To Cook",desc(){return `Unlock the Z Lab.`},done(){return hasYQU(8,'bought')}},
    2: {name: "Lucid Dreaming",desc(){return `Begin generating imaginary power.`},done(){return hasZlabMilestone(1,3)}},
    3: {name: "Alternative Prestige",desc(){return `Go Y-Quadratic ${formatWhole(100)} times.`},done(){return player.yQuadratics.gte(100)}},
    4: {name: "Empty Plane",desc(){return `Reach ${format("1e200000")} points without sacrificed x, y, and x².`},done(){return player.points.gte("1e200000") && player.sacX.eq(0) && player.sacY.eq(0) && player.sacX2.eq(0)}},
    5: {name: "Empty Formula",desc(){return `Reach ${format("1e200000")} points without QP.`},done(){return player.points.gte("1e200000") && player.quadPower.eq(0)}},
  },
  7: { // Variable synthesizer to second integration
    1: {name: "W isn't real",desc(){return `Reach ${formatWhole(100)}z.`},done(){return player.z.gte(100)}},
    2: {name: "Right Round, Like a Record",desc(){return `Reach ${format(360000)} revolutions.`},done(){return player.varSynth.revolutions.gte(360000)}},
    3: {name: "Charged Build Advanced",desc(){return `Make your Charged X Upgrades build into a chessboard pattern.`},done(){return player.varSynth.chargedXUpgs.length == 4 && ((hasChargedUpgrade(1) && hasChargedUpgrade(3) && hasChargedUpgrade(5) && hasChargedUpgrade(7)) || (hasChargedUpgrade(2) && hasChargedUpgrade(4) && hasChargedUpgrade(6) && hasChargedUpgrade(8)))}},
    4: {name: "Pushing Through The Storm",desc(){return `Reach ${format("1e400000")} points in Synthetic Division.`},done(){return player.points.gte("1e400000") && player.inSynthDiv}},
    5: {name: "So-very-challenging",desc(){return `Reach ${format("1e10000000")} points in Y-Challenge 4 while following the requirements of Y-Quadratic Upgrade 12.`},done(){return player.points.gte("1e10000000") && player.sacX.eq(0) && player.sacY.eq(0) && player.sacX2.eq(0) && player.b.eq(0) && player.quadPower.eq(0)}},
  },
  8: { // Second integration to temporal plane
    1: {name: "Outside the Universe",desc(){return `Reach ${format("1e6e8")} points.`},done(){return player.points.gte("1e6e8")}},
    2: {name: "Cartesian Product",desc(){return `Have ${formatWhole(3)} different number set types active at once.`},done(){return player.integration.active.types.length >= 3}},
    3: {name: "How The Z-Tables Have Turned...",desc(){return `Have your Z-Collider levels be in ascending order.`},done(){return player.zlab.levels[1] < player.zlab.levels[2] && player.zlab.levels[2] < player.zlab.levels[3] && player.zlab.levels[3] < player.zlab.levels[4]}},
    4: {name: "Sloppy Riemann Sum",desc(){return `Integrate in under ${formatWhole(1)} hour.`},done(){return player.gamePrestigeTimes[7].lt(3600)}},
    5: {name: "Not That Synthetic",desc(){return `Reach ${format(1e12)} SE with no repeatable Synthetic Division Upgrades.`},done(){return player.synthEssence.gte(1e12) && player.synthDivUpgs[0][1].eq(0) && player.synthDivUpgs[0][2].eq(0) && player.synthDivUpgs[0][3].eq(0)}},
  },
  9: { // Temporal plane to 40 integrations
    1: {name: "Intermediate Value",desc(){return `Reach ${format(1000)} dx.`},done(){return player.integration.dx.gte(1000)}},
    2: {name: "1.21 Gigawatts??",desc(){return `Have at least ${formatWhole(121)} assigned sets in each basic number set type.`},done(){return player.integration.assignedSets[1].gte(121) && player.integration.assignedSets[2].gte(121) && player.integration.assignedSets[3].gte(121) && player.integration.assignedSets[4].gte(121) && player.integration.assignedSets[5].gte(121)}},
    3: {name: "Full Clear",desc(){return `Fully complete a Complex Challenge in one run.`},done(){return false}},
    4: {name: "Take Your Time",desc(){return `Integrate for ${format(5000)} dx without using the Temporal Plane.`},done(){return false}},
    5: {name: "Reduced Power Series",desc(){return `Integrate without having any x⁷.`},done(){return false}},
  },
  10: { // 40 integrations to the limit
    1: {name: "Incrementalist's Dozen",desc(){return `Have ${formatWhole(13)} Production Tree upgrades.`},done(){return player.integration.upgrades.prod.length >= 13}},
    2: {name: "Quadratic Continuity",desc(){return `Passively generate Quadratic count.`},done(){return IntegrationUpgrades.quadratic3.isBought()}},
    3: {name: "Wide Accumulation",desc(){return `Integrate ${formatWhole(200)} times.`},done(){return player.integrations.gte(200)}},
    4: {name: "Avoiding Conflict",desc(){return `Reach ${format("1e1000")} y² without any CC tiers.`},done(){return player.y2.gte("1e1000") && ccTiers() == 0}},
    5: {name: "It's a Useless Tab",desc(){return `Reach ${format("1e500000")} i without Charged X Upgrades.`},done(){return player.i.gte("1e500000") && player.varSynth.chargedXUpgs.length == 0}},
  },
  11: { // The limit to sinusoidal
    1: {name: "I'm At My F(x)ing Limit",desc(){return `Unlock The Limit.`},done(){return IntegrationUpgrades.integration4.isBought()}},
    2: {name: "Breaking Bad",desc(){return `Unlock the 5th Z-Collider.`},done(){return IntegrationUpgrades.complex9.isBought()}},
    3: {name: "Limitless Potential II",desc(){return `Reach at least ${format(1e12)} pending dx without any Number Sets equipped.`},done(){return IntegrationPrestige.dxFormula().gte(1e12) && player.integration.active.types.length == 0}},
    4: {name: "I Misclicked...",desc(){return `Sacrifice at least ${format(1e10)} of a set type by sacrificing 100%.`},done(){return false}},
    5: {name: "Just Checking",desc(){return `Reach ${format("1e1200000")} i without Complex Plane currencies.`},done(){return player.i.gte("1e1200000") && player.compPlane[0][1].eq(0) && player.compPlane[0][2].eq(0) && player.compPlane[0][3].eq(0) && player.compPlane[0][4].eq(0)}},
  },
  12: { // Sinusoidal to IC2
    1: {name: "But Wait, There's More!",desc(){return `Have ${formatWhole(16)} Y-Quadratic Upgrades bought.`},done(){return player.yQuadUpgs[0].length >= 16}},
    2: {name: "Not Related to Tangent Lines",desc(){return `Begin producing tangent power.`},done(){return player.trigFunctions.powers[3].gt(0)}},
    3: {name: "Nice Try",desc(){return `Try to exit a Challenge or Complex Challenge in Integration Challenge 1.`},done(){return false}},
    4: {name: "Scalene Triangle",desc(){return `Go Sinusoidal without any Number Sets equipped.`},done(){return false}},
    5: {name: "Did I Miss Anything?",desc(){return `Reenter a completed Integration Challenge 1 combination.`},done(){return player.integration.challenge == 1 && player.integration.chalCompletions[1].includes(player.challenge + (player.compChallenge * 10))}},
  },
  13: { // IC2 to IC3
    1: {name: "Removable Discontinuities",desc(){return `Have at least ${formatWhole(1)} purchase of each Singularity Upgrade.`},done(){return player.integration.rebuyableUpgrades[6].gt(0) && player.integration.rebuyableUpgrades[7].gt(0) && player.integration.rebuyableUpgrades[8].gt(0) && player.integration.rebuyableUpgrades[9].gt(0) && player.integration.rebuyableUpgrades[10].gt(0)}},
    2: {name: "Achievement #19683",desc(){return `Play for 13.7 billion years.`},done(){return player.gameTimePlayed.gte(4.320432e17)}},
    3: {name: "Here's a Hint",desc(){return `Reach ${format("1e8e8")} QP without any QP buyables. Go Complex instead of Integrating.`},done(){return player.quadPower.gte("1e8e8") && player.quadBuyables[1].eq(0) && player.quadBuyables[2].eq(0) && player.quadBuyables[3].eq(0) && player.quadBuyables[4].eq(0)}},
    4: {name: "Borne Back Ceaselessly Into The Past",desc(){return `Reach ${format("1e1e9")} x² in Y-Challenge 4.`},done(){return player.x2.gte("1e1e9") && player.yChallenge == 4}},
    5: {name: "Defeats the Purpose",desc(){return `Reach ${format("1e650")} SE without having any x³.`},done(){return player.synthEssence.gte("1e650") && player.polynomials[3].amount.eq(0)}},
  },
  14: { // IC3 to derivatives
    1: {name: "Meet Me Halfway",desc(){return `Complete Integration Challenge 3 five times.`},done(){return player.integration.chalCompletions[3] >= 5}},
    2: {name: "Rule of Three",desc(){return `Fully purchase Sinusoidal Upgrades "Converging Dimensionality", "Hyperbolic Sine", and "Complexity Power".`},done(){return player.sinUpgrades[23] >= 5 && player.sinUpgrades[24] >= 5 && player.sinUpgrades[28] >= 5}},
    3: {name: "Synthetic Crunch",desc(){return `Reach ${format("1e5e8")} points in Synthetic Division.`},done(){return player.points.gte("1e5e8") && player.inSynthDiv}},
    4: {name: "Still No Fourth Layer...",desc(){return `Reach ${format("1e600000")} i in Integration Challenge 2.`},done(){return player.i.gte("1e600000") && player.integration.challenge == 2}},
    5: {name: "Lights Out",desc(){return `Reach ${format("1e1000000")} i in Integration Challenge 3 without spending activations.`},done(){return player.i.gte("1e1000000") && player.integration.challenge == 3 && player.integration.upgsActiveInIC3.length == 0}},
  },
  15: { // Derivatives to pythagorean triples
    1: {name: "Running In Circles",desc(){return `Unlock the Unit Circle.`},done(){return player.unitCircle.unlocked}},
    2: {name: "Powers of Y",desc(){return `Unlock Y-Polynomials.`},done(){return player.yPolynomials.unlocked}},
    3: {name: "Recency Bias",desc(){return `Have ${format(1e9)} more Y-Polynomial Power than Polynomial Power.`},done(){return player.yPolyPower.gte(player.polyPower.add(1e9))}},
    4: {name: "I Hate Trig",desc(){return `Reach ${format("1e1000")} pending dx with the Unit Circle quadrant set to ${formatWhole(0)}.`},done(){return IntegrationPrestige.dxFormula().gte("1e1000") && player.unitCircle.quadrant == 0}},
    5: {name: "Remember YQUs?",desc(){return `Reach ${format("1e40000000")} i without generating QP and IP.`},done(){return player.i.gte("1e40000000") && player.quadPower.eq(0) && player.imagPower.eq(0)}},
  },
  16: { // Pythagorean triples to hypercomplex
    1: {name: "Mechanics Within Mechanics",desc(){return `Complete Integration Challenge 4 three times.`},done(){return player.integration.chalCompletions[4] >= 3}},
    2: {name: "ETA: ee10+ QP",desc(){return `Reach ${formatWhole(10)}% on the QP filled bar.`},done(){return PythagoreanTriples.barPercentage(1) >= 10}},
    3: {name: "Do It Yourself",desc(){return `Click "Do it for me!" while already having an optimal PE generation build.`},done(){return false}},
    4: {name: "When Life Was Simple",desc(){return `Reach ${format("1e50000000")} i with no Z.`},done(){return player.i.gte("1e50000000") && player.z.eq(0)}},
    5: {name: "What Even Is j(n)?",desc(){return `Reach ${format("1e90000000")} points in The Limit with all Challenge Factors maxed.`},done(){return player.points.gte("1e90000000") && player.integration.inTheLimit && Limit.totalLevels().gte(80)}},
  },
  17: { // Hypercomplex+ (WIP)
    1: {name: "Impossible",desc(){return `This achievement is impossible.`},done(){return false}},
    2: {name: "Impossible",desc(){return `This achievement is impossible.`},done(){return false}},
    3: {name: "Impossible",desc(){return `This achievement is impossible.`},done(){return false}},
    4: {name: "Impossible",desc(){return `This achievement is impossible.`},done(){return false}},
    5: {name: "Impossible",desc(){return `This achievement is impossible.`},done(){return false}},
  },
  refresh() {
    player.dailyAchievements = [[],[]] // clears daily achievement storage
    let j = 0 // variable to determine point in progression, will be increased for each daily achievement pushed
    if(!hasQU(16) && player.totali.lt(1) && player.integrations.lt(1)) j = 1
    else if (hasQU(16) && !hasQU(20) && player.totali.lt(1) && player.integrations.lt(1)) j = 2
    else if (hasQU(20) && player.totali.lt(1) && player.integrations.lt(1)) j = 3
    else if (player.totali.gte(1) && !hasCU(1,6) && player.integrations.lt(1)) j = 4
    else if (hasCU(1,6) && !player.zUnlocked) j = 5
    else if (player.zUnlocked && !player.varSynth.unlocked[0] && player.integrations.lt(1)) j = 6
    else if (player.varSynth.unlocked[0] && player.integrations.lt(1)) j = 7
    else if (player.integrations.gte(1) && !player.integration.temporalPlane.unlocked) j = 8
    else if (player.integration.temporalPlane.unlocked && player.integrations.lt(40)) j = 9
    else if (player.integrations.gte(40) && !IntegrationUpgrades.integration4.isBought()) j = 10
    else if (IntegrationUpgrades.integration4.isBought() && player.sinusoidals.lt(1)) j = 11
    else if (player.sinusoidals.gte(1) && !IntegrationUpgrades.ic2.isBought()) j = 12
    else if (IntegrationUpgrades.ic2.isBought() && !IntegrationUpgrades.ic3.isBought()) j = 13
    else if (IntegrationUpgrades.ic3.isBought() && player.integration.chalCompletions[3] < 10) j = 14
    else if (player.integration.chalCompletions[3] >= 10 && !player.pythTriples.unlocked) j = 15
    else if (player.pythTriples.unlocked && !player.wUnlocked) j = 16
    else j = 17
    
    // pushes daily achievements to first sub-array (completed daily achievements go in second sub-array)
    for (let i = 0; i < 3; i++) {
      player.dailyAchievements[0].push(j.toString() + Math.floor((Math.random() * 5) + 1))
      if(j < 17) j++
    }

    // sends complete notification
    $.notify("Daily achievements have refreshed!", {
      style: 'apcurrent',
      className:'dailyAchieves',
    });
  },
  standardize(x) { 
    let str = x.toString()
    let str1 = str.length == 3 ? str.substring(0,2) : str.substring(0,1)
    let str2 = str.substring(str.length == 3 ? 2 : 1)
    return DailyAchievements[+str1][+str2]
  }
}