/*
Welcome to game.js! This is the Wild West of the AP codebase. In here you will find:
- The tmp object, containing all variables that don't need to be saved in your savefile
- The main game loop, updating all timers and producing all currencies
- Autobuyer code (warning: math)
- Variables (x, y, z, w, xy, y^2z^2) and variable cost formulas
- Tab navigation code
- Challenge header UI code
- Hotkeys
- v2.3 ending sequence
*/

var tmp = {
  buildingPercent: [null,0,0,0,0],
  text: "",
  letters: [null,"a","b","c","d","e","f"],
  epicslider: 1,
  compPlaneVars: [null,"x","y","x<sup>2</sup>","z","y<sup>2</sup>"],
  compPlaneCosts: [null,new Decimal(3500000),new Decimal(100000),new Decimal(1323),new Decimal(1e8),new Decimal("1e16600"),new Decimal(1e18),new Decimal(20900),new Decimal("1e2450")],
  disses: [
    "Oh, please, that's basically nothing.",
    "Pretty close to zero if you ask me.",
    "Probably a rounding error.",
    "Those are rookie numbers!",
    "Did you miss a zero somewhere?",
    "Did you forget an exponent?",
  ],
  textbook: {
    names: [null,"Preface","Terminology","Hotkeys","Buildings (v1.0)","Variables (v1.0)","Upgrades (v1.0)","Functions (v1.0)","Quadratic (v1.1)","Coordinate Plane (v1.1)","Square Root (v1.2)","Challenges (v1.3)","Quadratic Formula (v1.4)","Root Epicenter (v1.4)","Complex (v2.0)","Milestones (v2.0)","Complex Upgrades (v2.0)","Complex Plane (v2.0)","Complex Challenges (v2.1)","Y-Quadratic (v2.2)","Z Lab (v2.2)","Variable Synthesizer (v2.2)","Y-Challenges (v2.2)","Polynomials (v2.3)","Synthetic Division (v2.3)","Integration (v3.0 Part 1)","Number Sets (v3.0 Part 1)","Integration Upgrades (v3.0 Part 1)","Temporal Plane (v3.0 Part 1)","Automation Core (v3.0 Part 1)","The Limit (v3.0 Part 1)","Sinusoidal (v3.0 Part 2)","Integration Challenges (v3.0 Part 2)","Trigonometric Functions (v3.0 Part 2)","Derivatives (v3.0 Part 2)","Unit Circle (v3.0 Part 2)","Y-Polynomials (v3.0 Part 2)","Pythagorean Triples (v3.0 Part 2)","Alterations (v3.0 Part 2)","Hypercomplex Upgrades (v3.0 Part 2)","Hypercomplex Flune (v3.0 Part 2)"],
    expands: [null,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    world2names: [null,"Lost Integration Preface","Hotkeys","Generators","Variables","Upgrades","Generator Multiplier","Resetting","Coordinate Plane","Square Root","Root Epicenter","Exponential Curve","Complex","Complex Milestones","Complex Upgrades","Complex Plane","Complex Challenges","Y-Quadratic","Z Lab","Y Challenges","X Powers","Mandelbrot","Fractal Milestones","Meta-Generators","Fractal Arm","Minibrots","Mandelbrot Challenges","Y Powers"],
  },
  clicks: 0,
  themeSwitches: 0,
  hovers: [null,false,false,false,false,false,false,false,false],
  quadHovers: [null,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  circleText: [null,"Multiplying Imaginary Power generation","Multiplying Z-Power gain","Delaying the 2nd CE softcap start","Multiplying i exponent generation","Multiplying circles gain","Multiplying effective limit score","Multiplying dx gain"],
  circleMilestones: [null,new Decimal(0),new Decimal(1000),new Decimal(1e5),new Decimal(2e6),new Decimal(1e8),new Decimal("1e7500"),new Decimal("1e11000")],
  savedGlitches: [null,"","","","","","","","","","",0,0,0,0,0,0,0,0,0,0],
  allTabsShown: false,
  dialogShown: [false,false,false],
  gameRecommendations: [
    `<a href="https://ivark.github.io/AntimatterDimensions" target="_blank">Antimatter Dimensions</a>`,
    `<a href="https://synergism.cc" target="_blank">Synergism</a>`,
    `<a href="https://dan-simon.github.io/misc/fe000000" target="_blank">FE000000</a>`,
    `<a href="https://flamemasternxf.github.io/ordinal-pringles" target="_blank">Ordinal Pringles</a>`,
    `<a href="https://jacorb90.me/DistInc.github.io/main.html" target="_blank">Distance Incremental</a>`,
    `<a href="https://trimps.github.io" target="_blank">Trimps</a>`,
    `<a href="https://randomtuba.github.io/Tubas-Tree" target="_blank">Tuba's Tree</a>`,
    `<a href="https://randomtuba.github.io/Out-With-a-Bang" target="_blank">Out With a Bang</a>`,
    `<a href="https://demonin.com/games/dodecaDragons" target="_blank">DodecaDragons</a>`,
    `<a href="https://decisionproblem.com/paperclips/index2.html" target="_blank">Universal Paperclips</a>`,
    `<a href="https://orteil.dashnet.org/cookieclicker" target="_blank">Cookie Clicker</a>`,
    `<a href="https://veprogames.github.io/omega-layers" target="_blank">Omega Layers</a>`,
  ],
  devspeed: new Decimal(1),
  challengeFactorNames: [null,"Labor Shortages","Loneliness","Weed-Whacking","Impotence","Realism","Simplicity","Inverse Paradigm","Slowmode"],
  holesToSacrifice: new Decimal(0),
  unitCircleRotations: 0,
  shiftToggleBehavior: false,
  maxDiff: 0,
  clickedSecretUpgrade: false,
  versionNumber: "v3.0.2",
  absurdMode: false,
  
  triggeredEndingCutscene: false,
  keptGoing: false,
};

// The following functions may break the game, so be careful!
const dev = {
  buyAllPerks() { // purchases all perk upgrades with no cost
    for (let i = 0; i < 40; i++) {
      if(!IntegrationUpgrades[Object.values(IntegrationUpgrades)[i].id.toLowerCase()].isBought()) player.integration.upgrades.qol.push(Object.values(IntegrationUpgrades)[i].id.toLowerCase())
    }
    $.notify('All perks bought!', {
      style: 'apcurrent',
      className:'saving',
    });
  },
  doubleEverything() { // whatever you do, don't do this
    Object.keys(player).forEach(key => {
    if (typeof player[key] === "number") player[key] *= 2;
    if (typeof player[key] === "object" && player[key].constructor !== Object) player[key] = player[key].times(2);
    if (typeof player[key] === "object" && !isFinite(player[key])) {
      Object.keys(player[key]).forEach(key2 => {
        if (typeof player[key][key2] === "number") player[key][key2] *= 2;
        if (typeof player[key][key2] === "object" && player[key][key2].constructor !== Object)
          player[key][key2] = player[key][key2].times(2);
        });
      }
    });
    $.notify('Doubled all resources!', {
      style: 'apcurrent',
      className:'saving',
    });
  },
  gameReset() { // resets the game and gives +2 game points and +1 game completed
    playAgain(true)
  },
  giveAllAchievements(secret = true) { // gives all achievements (and secret achievements if parameter = true)
    for (let i in ACHIEVEMENTS) {
      if(!player.achievements.includes(i)){
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
    if(secret) {
      for (let i in SECRET_ACHIEVEMENTS) {
        if(!player.secretAchievements.includes(i)){
          player.secretAchievements.push(i)
          $.notify("Secret Achievement Unlocked: " + SECRET_ACHIEVEMENTS[i].name, {
            style: 'apcurrent',
            className:'secretAchieves',
          });
        }
      }
    }
  },
  giveAllMilestones() { // gives all complex milestones based on world
    if(!player.inLostIntegration) {
      for(let i in MILESTONES){
        if(!player.obtainedMilestones.includes(i)){
          player.obtainedMilestones.push(i)
          $.notify("Milestone Reached: " + MILESTONES[i].title, {
            style: 'apcurrent',
            className:'unlock',
          });
        }
      }
    } else {
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
  },
  enterWorld(x) { // 1 enters Standard Equation and resets all stats, 2 enters Lost integration and resets all stats
    if(x == 1){
      restartRun()
    } else if (x == 2) {
      IntegrationChallenges.start(8)
    }
  },
  printResources() { // prints major resources into the console
    console.log("Points: " + player.points)
    console.log("Points Per Second: " + pps())
    console.log("x^2: " + player.x2)
    console.log("Quadratics: " + player.quadratics)
    console.log("Root Essence: " + player.rootEssence)
    console.log("Quadratic Power: " + player.quadPower)
    console.log("Challenge Essence: " + player.challengeEssence)
    console.log("i: " + player.i)
    console.log("Complexes: " + player.complexes)
    console.log("Total Upgrade Points: " + player.upgradePoints[1])
    console.log("CC Tiers: " + ccTiers())
    console.log("y^2: " + player.y2)
    console.log("Z-Power: " + player.zlab.zpower)
    console.log("Polynomial Power: " + player.polyPower)
    console.log("Synthetic Essence: " + player.synthEssence)
    console.log("dx: " + player.integration.dx)
    console.log("Integrations: " + player.integrations)
    console.log("Holes: " + player.integration.holes)
    console.log("Global Speed: " + TemporalPlane.totalEffect() + "x")
    console.log("Triangles: " + player.triangles)
    console.log("Trigonometric Waves: " + player.trigFunctions.waves)
    console.log("Pythagorean Essence: " + player.pythTriples.essence)
    console.log("Total Quaternions: " + player.quaternions[1])
    console.log("j: " + player.j)
    console.log("k: " + player.k)
    $.notify('Resources printed! (check console)', {
      style: 'apcurrent',
      className:'saving',
    });
  },
  refreshDailyAchievements() { // refreshes daily achievements and resets 24 hour daily achievement timer
    console.log("not added yet ;(")
  },
  refundPerks() { // respecs perk tree and gives spent holes back
    $.notify(`Perks refunded! +${player.integration.upgrades.qol.length} holes`, {
      style: 'apcurrent',
      className:'saving',
    });
    player.integration.holes = player.integration.holes.add(player.integration.upgrades.qol.length)
    player.integration.upgrades.qol = []
  },
  removeAch(x) { // removes achievement id x from the achievements list
    let array = player.achievements
    let index = array.indexOf(x.toString());
    if (index > -1) { // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }
    $.notify(`Removed Achievement ${x.toString()}`, {
      style: 'apcurrent',
      className:'saving',
    });
  },
  removeSecretAch(x) { // removes secret achievement id x from the achievements list
    let array = player.secretAchievements
    let index = array.indexOf(x.toString());
    if (index > -1) { // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }
    $.notify(`Removed Secret Achievement ${x.toString()}`, {
      style: 'apcurrent',
      className:'saving',
    });
  },
  resetOptions() { // resets all options to their default states, presets are included
    player.theme = true
    player.sacrifice = 'x'
    player.options = [true,true,true,true,false,true,false,true,true,true,false,true,true,false,true,false,false,true,true,true,true]
    player.presets = {
      info: [null,"","","","","",""],
      names: [null,"Preset 1","Preset 2","Preset 3","Preset 4","Preset 5","Preset 6"],
      selected: 0,
    }
    player.tabDisplays = [null,true,true,true,true,true,true,true,true,true,true,true]
    player.newsSpeed = 1,
    player.autosaveInterval = 30000
    player.notation = 1
    $.notify(`Options reset!`, {
      style: 'apcurrent',
      className:'saving',
    });
  },
  resetTmp() { // resets all variables in the tmp object to their default states
    tmp.text = ""
    tmp.epicslider = 1
    tmp.textbook = {
      names: [null,"Preface","Terminology","Hotkeys","Buildings (v1.0)","Variables (v1.0)","Upgrades (v1.0)","Functions (v1.0)","Quadratic (v1.1)","Coordinate Plane (v1.1)","Square Root (v1.2)","Challenges (v1.3)","Quadratic Formula (v1.4)","Root Epicenter (v1.4)","Complex (v2.0)","Milestones (v2.0)","Complex Upgrades (v2.0)","Complex Plane (v2.0)","Complex Challenges (v2.1)","Y-Quadratic (v2.2)","Z Lab (v2.2)","Variable Synthesizer (v2.2)","Y-Challenges (v2.2)","Polynomials (v2.3)","Synthetic Division (v2.3)","Integration (v3.0 Part 1)","Number Sets (v3.0 Part 1)","Integration Upgrades (v3.0 Part 1)","Temporal Plane (v3.0 Part 1)","Automation Core (v3.0 Part 1)","The Limit (v3.0 Part 1)","Sinusoidal (v3.0 Part 2)","Integration Challenges (v3.0 Part 2)","Trigonometric Functions (v3.0 Part 2)","Derivatives (v3.0 Part 2)","Unit Circle (v3.0 Part 2)","Y-Polynomials (v3.0 Part 2)","Pythagorean Triples (v3.0 Part 2)","Alterations (v3.0 Part 2)","Hypercomplex Upgrades (v3.0 Part 2)","Hypercomplex Flune (v3.0 Part 2)"],
    expands: [null,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    }
    tmp.clicks = 0
    tmp.themeSwitches = 0
    tmp.hovers = [null,false,false,false,false,false,false,false,false]
    tmp.savedGlitches = [null,"","","","","","","","","","",0,0,0,0,0,0,0,0,0,0]
    tmp.allTabsShown = false
    tmp.dialogShown = [false,false]
    tmp.devspeed = new Decimal(1)
    tmp.holesToSacrifice = new Decimal(0)
    tmp.unitCircleRotations = 0
    tmp.shiftToggleBehavior = false
    tmp.maxDiff = 0
    tmp.clickedSecretUpgrade = false
    tmp.absurdMode = false

    tmp.triggeredEndingCutscene = false
    tmp.keptGoing = false
    $.notify(`tmp object reset!`, {
      style: 'apcurrent',
      className:'saving',
    });
  },
  speedMult(x) { // multiplies game speed by x (use decimal)
    tmp.devspeed = x
    $.notify(`Devspeed set to ${tmp.devspeed} (goes back to 1 on refresh)`, {
      style: 'apcurrent',
      className:'saving',
    });
  },
  timejump(x) { // time jumps x seconds, does not have cooldown
    tmp.holesToSacrifice = x / 300
    player.integration.temporalPlane.timeJumpDuration = 1 // duration of the time jump (for the purposes of manipulating your global speed)
    player.prestigeTimes[0] += tmp.holesToSacrifice * 300
    player.prestigeTimes[2] += tmp.holesToSacrifice * 300
    player.prestigeTimes[4] += tmp.holesToSacrifice * 300
    player.prestigeTimes[6] += tmp.holesToSacrifice * 300
    player.prestigeTimes[8] += tmp.holesToSacrifice * 300
  },
  uselessFunction() { // does nothing
    return
  }
}

function clickButton() {
  player.points = player.points.add(1)
  tmp.clicks++
}

function pps() { // points per second
  let pps = new Decimal(0);
  pps = pps.add(BUYABLES[1].eff()).add(BUYABLES[2].eff()).add(BUYABLES[3].eff()).add(BUYABLES[7].eff())
  if(player.integrations.lt(1)) pps = pps.min("1e5e8")
  return pps;
}

function tab(x) {
  player.currentTab = x;
}

function xCost() {
  if(player.compChallenge == 5) return new Decimal(Infinity)
  if(player.yChallenge == 6) return new Decimal(100000).mul(Decimal.pow(1.11,player.x))
  if(player.inLostIntegration) return new Decimal(100000).mul(Decimal.pow(xCostScalingLI(),player.abc[1])).div(hasUpgrade(3) ? 2 : 1).div(hasQU(4) ? ResetTable[4].eff() : 1).div(hasUpgrade(5) ? 1e6 : 1).pow(player.challenge == 12 || player.challenge == 16 ? 2 : 1).pow(player.compChallenge == 3 ? 10 : 1)
  // formula: 1e5*(1+(0.11/xDivision())^x)
  return new Decimal(100000).mul(new Decimal(1).add(Decimal.div(0.11,xDivision())).pow(player.x)).div(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).div(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ?1000000:1).div(hasChallenge(5)?1e9:1).pow(player.compChallenge == 3 ? 10 : 1)
}
         
function xDivision() { // returns the X cost scaling per purchase divisor                                                       
  let div = new Decimal(1)
  if(hasSU(1)) div = div.mul(SQRT_UPGRADES[1].eff())
  div = div.mul(QP_BUYABLES[1].eff())
  div = div.mul(COMP_CHALLENGES[3].eff())
  return div
}

function xCostScalingLI() {
  let scale = new Decimal(1.1)
  if(hasQU(3)) scale = scale.sub(0.02)
  if(hasChallenge(12)) scale = scale.pow(0.8)
  scale = scale.div(ComplexChallengesLI[3].eff())
  return scale
}

function yCost() {
  if(player.compChallenge == 5) return new Decimal(Infinity)
  if(player.yChallenge == 6) return new Decimal(100).mul(Decimal.pow(1.25,player.y))
  if(player.inLostIntegration) return new Decimal(100).mul(Decimal.pow(yCostScalingLI(),player.abc[2])).div(hasQU(22) ? 1000000 : 1).pow(player.compChallenge == 3 ? 4 : 1)
  return new Decimal(100).div(hasQU(18)?(hasChargedQU(18)?10:1.1):1).div(hasChallenge(8)?5:1).mul(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff()).mul(NumberSets.effect(1,4)))).pow(player.y)).pow(player.compChallenge == 3 ? 4 : 1).floor()
}

function yCostScalingLI() {
  let scale = new Decimal(1.15)
  if(hasQU(8)) scale = scale.sub(0.05)
  return scale
}

function zCost() {
  if(player.compChallenge == 5) return new Decimal(Infinity)
  if(player.inLostIntegration) return new Decimal(70000).mul(Decimal.pow(Decimal.div(1.2,FractalArm.hasUpgrade(163) ? FractalArm[16][3].eff() : 1),player.abc[3]))
  return new Decimal(2222).add(new Decimal(111).add(player.z.sub(1).mul(10)).mul(player.z)).div(player.yChallenge == 6 ? 1 : zDivision())
}

function zDivision() { // returns the Z cost divisor
  let div = new Decimal(1)
  if(hasChargedUpgrade(3) && player.challenge != 5 && player.compChallenge != 8) div = div.mul(1.2)
  if(hasZlabMilestone(4,5)) div = div.mul(1.5)
  div = div.mul(NumberSets.effect(4,4))
  if(IntegrationUpgrades.quadratic1.isBought()) div = div.mul(IntegrationUpgrades.quadratic1.eff2())
  div = div.mul(PythagoreanTriples.buyables[1].eff())
  return div
}

function xyCost(x) {
  if(player.varSynth.totalxy.gte(8) && !IntegrationUpgrades.yquadratic7.isBought()) {
    return new Decimal(Infinity)
  }
  if(x == 1) {
    return new Decimal(1.8e8).mul(Decimal.pow(1.4,player.varSynth.totalxy))
  } else {
    return new Decimal(9500).mul(Decimal.pow(1.18,player.varSynth.totalxy))
  }
}

function wCost() {
  return new Decimal(player.w.pow(2).mul(100)).add(player.w.mul(12000)).add(79000)
}

function y2z2Cost() {
  return player.y2z2.total.gte(20) ? new Decimal(Infinity) : new Decimal("1e85000000").pow(Decimal.pow(1.3,player.y2z2.total)).pow(NumberSets.effect(7,2)).pow(BasicHypercompUpgrades.has(11) ? 0.5 : 1)
}

function buyVariable(x) {
  switch (x) {
    case "x":
      if (player.points.gte(xCost()) && (player.purchases > 0 || (player.challenge != 10 && player.compChallenge != 8))){
        if((!hasQU(8) && !player.inLostIntegration) || (player.inLostIntegration && !hasComplexMilestoneLI(10))) player.points = player.points.sub(xCost())
        player.x = player.x.add(1)
        if(player.inLostIntegration) player.abc[1] = player.abc[1].add(1)
        if(player.compChallenge != 8) player.purchases -= 1
      }
      break;
    case "y":
      if (player.x.gte(yCost()) && (player.purchases > 0 || (player.challenge != 10 && player.compChallenge != 8))){
        player.y = player.y.add(1)
        if(player.inLostIntegration) player.abc[2] = player.abc[2].add(1)
        if(player.compChallenge != 8) player.purchases -= 1
      }
      break;
    case "z":
      if (player.y.gte(zCost()) && (player.purchases > 0 || (player.challenge != 10 && player.compChallenge != 8))){
        player.z = player.z.add(1)
        if(player.inLostIntegration) player.abc[3] = player.abc[3].add(1)
        if(player.compChallenge != 8) player.purchases -= 1
        if(!player.zUnlocked) {
          $.notify('The laws of this world have been modified.', {
            style: 'apcurrent',
            className:'unlock',
          });
        }
        player.zUnlocked = true
      }
      break;
    case "xy":
      if (player.x.gte(xyCost(1)) && player.y.gte(xyCost(2))){
        player.varSynth.xy = player.varSynth.xy.add(1)
        player.varSynth.totalxy = player.varSynth.totalxy.add(1)
      }
      break;
    case "w":
      if (player.z.gte(wCost()) && (player.purchases > 0 || (player.challenge != 10 && player.compChallenge != 8))){
        player.w = player.w.add(1)
        if(player.compChallenge != 8) player.purchases -= 1
        if(!player.wUnlocked) {
          $.notify('Oh no, not again...', {
            style: 'apcurrent',
            className:'unlock',
          });
        }
        player.wUnlocked = true
      }
      break;
    case "y2z2":
      if (player.y2.gte(y2z2Cost())){
        player.y2z2.amount = player.y2z2.amount.add(1)
        player.y2z2.total = player.y2z2.total.add(1)
      }
      break;
  }
}

function switchTheme() {
  player.theme = !player.theme;
  tmp.themeSwitches++;
  document.getElementById("style").href = player.theme ? "style.css" : "style-dark.css";
}

function toggleOption(x){
  if(x == 3 && !player.options[3] && !hasSecretAchievement(7)) {
    player.secretAchievements.push('7')
    $.notify("Secret Achievement Unlocked: Blanked Out", {
      style: 'apcurrent',
      className:'secretAchieves',
    });
  }
  if(x < 69420) {
    player.options[x] = !player.options[x]
  } else if (confirm("Absurd Mode may be dangerous for those with photosensitive epilepsy and makes the game generally unfun to play. Are you sure you want to enable Absurd Mode? (Absurd Mode is automatically disabled upon refresh.)")) {
    tmp.absurdMode = true
  }
}

function notationDisplay(x) {
  let arr = ["Scientific","Engineering","Logarithm","Mixed","Hexadecimal","Blind"]
  return arr[x-1]
}

var changedQAdisplay = false
var changedESdisplay = false
var changedCAdisplay = false
var changedYQAdisplay = false
var changedACdisplay = false
var arr1 = [null,new Decimal(2),new Decimal(1.7),new Decimal(1.5),new Decimal(1.2)]
var arr2 = [null,new Decimal(300),new Decimal(100),new Decimal(40),new Decimal(10)]
var arr3 = [null,new Decimal(1000),new Decimal(10000),new Decimal(100000),new Decimal(1000)]
var tabNames = []
var subtabNames = []
var s = ""

function mainLoop(){
  if(hasLoaded==1){document.getElementById("loading_page").style = "display: none";document.getElementById("app").style = "";hasLoaded=2}
  if(!window["player"]||!player.points||!hasLoaded)return requestAnimationFrame(mainLoop);
  let diff = (Date.now()-player.lastTick)/1000
  if(diff < 0) diff = 0
  if(diff > tmp.maxDiff) tmp.maxDiff = diff
  if(tmp.maxDiff > 1e8) tmp.maxDiff = 0
  if(!player.options[9])diff = document.hidden?0:Math.min(diff,0.075)
  let lastDailyTimer = Math.floor(player.lastTick / 86400000)
  player.lastTick = Date.now()
  if(Math.floor(Date.now() / 86400000) > lastDailyTimer || player.dailyAchievements[0].length == 0) DailyAchievements.refresh()
  
  // UPDATE TIMES
  player.timePlayed = (Date.now() - player.startingTime) / 1000;
  if(new Decimal(player.timePlayed).gte(player.gameTimePlayed)) player.gameTimePlayed = new Decimal(player.timePlayed)
  player.gameTimePlayed = player.gameTimePlayed.add(new Decimal(diff).mul(TemporalPlane.totalEffect()))
  player.prestigeTimes[0] = player.prestigeTimes[0] += diff;
  player.gamePrestigeTimes[0] = player.gamePrestigeTimes[0].add(new Decimal(diff).mul(TemporalPlane.totalEffect()))
  player.prestigeTimes[2] = player.prestigeTimes[2] += diff;
  player.gamePrestigeTimes[2] = player.gamePrestigeTimes[2].add(new Decimal(diff).mul(TemporalPlane.totalEffect()))
  player.prestigeTimes[4] = player.prestigeTimes[4] += diff;
  player.gamePrestigeTimes[4] = player.gamePrestigeTimes[4].add(new Decimal(diff).mul(TemporalPlane.totalEffect()))
  player.prestigeTimes[6] = player.prestigeTimes[6] += diff;
  player.gamePrestigeTimes[6] = player.gamePrestigeTimes[6].add(new Decimal(diff).mul(TemporalPlane.totalEffect()))
  player.prestigeTimes[8] = player.prestigeTimes[8] += diff;
  player.gamePrestigeTimes[8] = player.gamePrestigeTimes[8].add(new Decimal(diff).mul(TemporalPlane.totalEffect()))
  if(player.prestigeTimes[6] < player.timePlayed && player.integrations.lt(1)) player.prestigeTimes[6] = player.timePlayed
  if(player.prestigeTimes[8] < player.timePlayed && player.sinusoidals.lt(1)) player.prestigeTimes[8] = player.timePlayed
  if(player.gamePrestigeTimes[8].lt(player.gameTimePlayed) && player.sinusoidals.lt(1)) player.gamePrestigeTimes[8] = player.gameTimePlayed
  if(player.speedrunMode && !player.speedrunData[17][1]) player.speedrunTimer = player.speedrunTimer += diff;
  if(player.options[20] && (player.inLostIntegration ? FractalMilestones.has(1) : IntegrationUpgrades.pcc1.isBought()) && player.integration.challenge != 1 && player.integration.challenge != 2) player.integration.autoCCTimer -= diff
  if(player.integration.autoCCTimer <= 0 && ccTiers() < (player.inLostIntegration ? 24 : 50) && player.options[20] && (player.inLostIntegration ? FractalMilestones.has(1) : IntegrationUpgrades.pcc1.isBought())) {
    let i = 1
    while (player.compChalCompletions[i == 8 && player.inLostIntegration ? 10 : i] >= (player.inLostIntegration ? 3 : 5)) i++
    player.compChalCompletions[i == 8 && player.inLostIntegration ? 10 : i]++
    player.integration.autoCCTimer = maxAutoCCTimer()
  }
  if(player.integration.temporalPlane.timeJumpDuration > 0) player.integration.temporalPlane.timeJumpDuration -= diff
  if(player.integration.temporalPlane.timeJumpDuration < 0) player.integration.temporalPlane.timeJumpDuration = 0
  if(player.integration.temporalPlane.timeJumpCooldown > 0) player.integration.temporalPlane.timeJumpCooldown -= diff
  if(player.integration.temporalPlane.timeJumpCooldown < 0) player.integration.temporalPlane.timeJumpCooldown = 0
  if(player.integration.challenge != 6) player.integration.ic6Timer += diff
  if(player.integration.ic6Timer >= 40) player.integration.ic6Timer = 0
  
  // PRODUCE STUFF
  if(((player.challenge != 8 && player.compChallenge != 8) || isPrime(player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).add(player.buyables[4]).add(player.buyables[5]).add(player.buyables[6]))) && (player.compChallenge != 6 || player.inLostIntegration || player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).lt(player.buyables[4].add(player.buyables[5]).add(player.buyables[6])))) player.points = player.points.add(pps().times(diff).mul(TemporalPlane.totalEffect()));
  if(((player.challenge != 8 && player.compChallenge != 8) || isPrime(player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).add(player.buyables[4]).add(player.buyables[5]).add(player.buyables[6]))) && (player.compChallenge != 6 || player.inLostIntegration || player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).lt(player.buyables[4].add(player.buyables[5]).add(player.buyables[6])))) player.totalPoints = player.totalPoints.add(pps().times(diff).mul(TemporalPlane.totalEffect()));
  if(((player.challenge != 8 && player.compChallenge != 8) || isPrime(player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).add(player.buyables[4]).add(player.buyables[5]).add(player.buyables[6]))) && (player.compChallenge != 6 || player.inLostIntegration || player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).lt(player.buyables[4].add(player.buyables[5]).add(player.buyables[6])))) player.totalPointsThisIntegration = player.totalPointsThisIntegration.add(pps().times(diff).mul(TemporalPlane.totalEffect()));
  if(player.inSqrt) player.points = player.points.min(squareRootHardcap())
  if(!player.inLostIntegration) player.slope = player.slope.add(sacEffect('x2').mul(diff))
  if(!player.inLostIntegration) player.quadPower = player.quadPower.add(qpGen().mul(diff))
  if(hasZlabMilestone(1,3)) player.imagPower = player.imagPower.add(ipGen().mul(diff))
  if(!player.inLostIntegration) {
    for (let i = 1; i <= (player.varSynth.unlocked[3] ? 4 : 3); i++) {
      player.compPlane[1][i] = player.compPlane[1][i].add(compPlaneGen(i).mul(diff))
    }
  }
  player.antiSlope = player.antiSlope.add(new Decimal(1).add(player.antiSlope.pow(1.05)).mul(diff).min(player.totalPoints.pow(player.prestigeTimes[2])))
  if(hasYQU(8,'bought') || IntegrationUpgrades.zla.isBought()) player.zlab.zpower = player.zlab.zpower.add(zpowerGen().mul(diff))
  if(!player.inLostIntegration) {
    for (let i = 1; i <= (IntegrationUpgrades.complex9.isBought() ? 5 : 4); i++) {
      if((player.zlab.charged == i || IntegrationUpgrades.zlc.isBought()) && (hasYQU(8,'bought') || IntegrationUpgrades.zla.isBought())) {
        player.zlab.particles[i] = player.zlab.particles[i].add(player.zlab.zpower.sqrt().mul(diff).mul(TemporalPlane.totalEffect()))
      }
    }
  }
  if(hasMilestone(18) && quadFormula().gte(1) && player.integration.challenge != 4) {
    player.x2 = player.x2.add(quadFormula().div(100).mul(diff).mul(TemporalPlane.totalEffect()))
    player.totalx2 = player.totalx2.add(quadFormula().div(100).mul(diff).mul(TemporalPlane.totalEffect()))
  }
  if(player.varSynth.unlocked[1]) {
    player.varSynth.circles = player.varSynth.circles.add(circleGen().mul(diff))
  }
  if(player.varSynth.unlocked[2]) {
    player.varSynth.iExp = player.varSynth.iExp.add(iExpGen().mul(diff))
    if(player.varSynth.iExp.gte(4)) {
      player.varSynth.revolutions = player.varSynth.revolutions.add(player.varSynth.iExp.div(4).floor())
      player.varSynth.iExp = new Decimal(0)
    }
  }
  if(player.varSynth.unlocked[3] && compPlaneEffects(4).gte(player.extraUP) && !hasSDU(11)) {
    player.upgradePoints[0] = player.upgradePoints[0].add(compPlaneEffects(4).sub(player.extraUP))
    player.upgradePoints[1] = player.upgradePoints[1].add(compPlaneEffects(4).sub(player.extraUP))
    player.extraUP = compPlaneEffects(4)
  }
  if(hasSDU(11)) {
    player.upgradePoints[0] = player.upgradePoints[0].add(compPlaneEffects(4).mul(diff))
    player.upgradePoints[1] = player.upgradePoints[1].add(compPlaneEffects(4).mul(diff))
  }
  if(player.yChalsUnlocked[1] && !player.inLostIntegration) {
    if((player.yChallenge == 1 || hasSDU(8)) && player.x.gte(Y_CHALLENGES[1].goal()) && player.yChalsUnlocked[1]) player.yChalCompletions[1] = player.x.sub(4.5e8).div(1e7).add(1).max(0).floor()
    if((player.yChallenge == 2 || hasSDU(8)) && player.x.gte(Y_CHALLENGES[2].goal()) && player.yChalsUnlocked[1]) player.yChalCompletions[2] = player.x.sub(5.1e8).div(1e7).add(1).max(0).floor()
    if((player.yChallenge == 3 || hasSDU(8)) && player.x.gte(Y_CHALLENGES[3].goal()) && player.yChalsUnlocked[1]) player.yChalCompletions[3] = player.x.sub(1.1e9).div(5e7).add(1).max(0).floor()
    if(player.yChallenge == 4 && player.x.gte(Y_CHALLENGES[4].goal()) && !IntegrationUpgrades.pyc.isBought() && player.yChalsUnlocked[1]) player.yChalCompletions[4] = player.x.sub(4e8).div(2.5e7).add(1).max(0).floor()
    if(IntegrationUpgrades.pyc.isBought() && player.yChalCompletions[4].lt(player.x.div(33.3).sub(4e8).div(2.5e7).add(1).mul(IntegrationUpgrades.points9.isBought() ? 10 : 1).floor()) && player.yChalsUnlocked[1]) player.yChalCompletions[4] = player.x.div(33.3).sub(4e8).div(2.5e7).add(1).mul(IntegrationUpgrades.points9.isBought() ? 10 : 1).floor()
    if((player.yChallenge == 5 || player.sinUpgrades[31] >= 1) && player.x.gte(Y_CHALLENGES[5].goal())) player.yChalCompletions[5] = player.x.sub(1.5e17).div(3e15).add(1).max(0).floor()
    if(player.yChallenge == 6 && player.x.gte(Y_CHALLENGES[6].goal())) player.yChalCompletions[6] = player.x.sub(8.5e15).div(5e14).add(1).max(0).floor()
    if(player.sinUpgrades[31] >= 2 && player.x.gte(Y_CHALLENGES[6].goal())) player.yChalCompletions[6] = player.x.sub(8.5e15).div(5e14).div(10).add(1).max(0).floor()
  }
  for (let i = 0; i < 5; i++) {
    player.integration.temporalPlane.powers[i] = player.integration.temporalPlane.powers[i].add(TemporalPlane.generate(i).mul(diff))
  }
  if(IntegrationUpgrades.pas.isBought() && player.varSynth.unlocked[1]) player.varSynth.x2y2 = player.varSynth.x2y2.add(x2y2Formula().div(100).mul(diff).mul(TemporalPlane.totalEffect()))
  if(IntegrationUpgrades.quadratic3.isBought() && player.compChallenge != 4 && player.integration.challenge != 4) player.quadratics = player.quadratics.add(quadraticsGain().div(2).mul(diff).mul(TemporalPlane.totalEffect()))
  if(player.integration.chalCompletions[2] >= 2 && player.compChallenge != 4 && player.integration.challenge != 4) player.quadratics = player.quadratics.add(quadraticsGain().mul(player.complexes.pow(0.25)).mul(diff).mul(TemporalPlane.totalEffect()))
  if(IntegrationUpgrades.complex7.isBought() && player.integration.challenge != 4) player.complexes = player.complexes.add(complexesGain().div(4).mul(diff).mul(TemporalPlane.totalEffect()))
  player.trigFunctions.waves = player.trigFunctions.waves.add(TrigFunctions.waveGen().mul(diff))
  for (let i = 1; i < 7; i++) {
    player.trigFunctions.powers[i] = player.trigFunctions.powers[i].add(TrigFunctions.powerGen(i).mul(diff))
  }
  if(IntegrationUpgrades.integration7.isBought() && player.integration.challenge != 4) {
    if(compFormula().gte(1)) {
      player.i = player.i.add(compFormula().div(100).mul(diff).mul(TemporalPlane.totalEffect()))
      player.totali = player.totali.add(compFormula().div(100).mul(diff).mul(TemporalPlane.totalEffect()))
    }
    if(yQuadFormula().gte(1)) {
      player.y2 = player.y2.add(yQuadFormula().div(100).mul(diff).mul(TemporalPlane.totalEffect()))
      player.totaly2 = player.totaly2.add(yQuadFormula().div(100).mul(diff).mul(TemporalPlane.totalEffect()))
    }
  }
  if(player.integration.upgsActiveInIC3.includes(20)) {
    player.integration.upgsActiveInIC3 = []
    player.integration.activations += 1
  }
  if(player.integration.chalCompletions[3] >= 10) {
    if(Derivatives.jnFormula().gte(player.integration.derivatives.highestReached)) player.integration.derivatives.highestReached = Derivatives.jnFormula()
    if(PythagoreanTriples.hasMilestone(6)) player.integration.derivatives[0] = player.integration.derivatives[0].add(player.integration.derivatives[1].mul(Derivatives.gainMult()).pow(hasPermUpgrade(15) ? 1.01 : 1).mul(diff))
    if(!player.inLostIntegration) {
      player.integration.derivatives[1] = player.integration.derivatives[1].add(player.integration.derivatives[2].mul(Derivatives.gainMult()).pow(hasPermUpgrade(15) ? 1.01 : 1).mul(diff))
      player.integration.derivatives[2] = player.integration.derivatives[2].add(player.integration.derivatives[3].mul(Derivatives.gainMult()).pow(hasPermUpgrade(15) ? 1.01 : 1).mul(diff))
      if(player.integration.derivatives.highestReached.lt(5e6)) player.integration.derivatives[2] = player.integration.derivatives[2].add(Derivatives.gainFormula().mul(diff))
      if(player.integration.derivatives.highestReached.gte(5e6)) player.integration.derivatives[3] = player.integration.derivatives[3].add(Derivatives.gainFormula().mul(diff))
    }
  }
  player.pythTriples.essence = player.pythTriples.essence.add(PythagoreanTriples.peGen().mul(diff))
  if(Alterations.has(2)) {
    player.j = player.j.add(HypercompUpgrades.jGen().mul(diff))
    player.k = player.k.add(HypercompUpgrades.kGen().mul(diff))
  }
  if(BasicHypercompUpgrades.has(1)) {
    if(IntegrationPrestige.dxFormula().gte(1)) {
      player.integration.dx = player.integration.dx.add(IntegrationPrestige.dxFormula().div(100).mul(diff).mul(BasicHypercompUpgrades.has(8) ? TemporalPlane.totalEffect() : 1))
      player.integration.totaldx = player.integration.totaldx.add(IntegrationPrestige.dxFormula().div(100).mul(diff).mul(BasicHypercompUpgrades.has(8) ? TemporalPlane.totalEffect() : 1))
    }
    if(IntegrationPrestige.emptySetsFormula().gte(1)) {
      player.integration.emptySets = player.integration.emptySets.add(IntegrationPrestige.emptySetsFormula().div(100).mul(diff).mul(BasicHypercompUpgrades.has(8) ? TemporalPlane.totalEffect() : 1))
    }
    if(SinusoidalPrestige.trianglesFormula().gte(1)) {
      player.triangles = player.triangles.add(SinusoidalPrestige.trianglesFormula().div(100).mul(diff).mul(BasicHypercompUpgrades.has(8) ? TemporalPlane.totalEffect() : 1))
    }
  }
  if(IntegrationChallenges[5].eff().gte(player.extraQuaternions)) {
    player.quaternions[0] = player.quaternions[0].add(IntegrationChallenges[5].eff().sub(player.extraQuaternions))
    player.quaternions[1] = player.quaternions[1].add(IntegrationChallenges[5].eff().sub(player.extraQuaternions))
    player.extraQuaternions = IntegrationChallenges[5].eff()
  }
  if(BasicHypercompUpgrades.has(6)) player.synthEssence = player.synthEssence.add(seFormula())
  for (let i = 1; i <= 8; i++) {
    player.hypercompFlune.powers[i] = player.hypercompFlune.powers[i].add(HypercompFlune.gen(i).mul(diff))
  }
  if(Alterations.has(4)) player.integration.limitScore = player.integration.limitScore.add(Limit.estimatedScore())
  if(player.integration.challenge == 6 && player.integration.ic6Version == 2) {
    player.sacX2 = player.sacX2.min(player.synthEssence)
    player.quadPower = player.quadPower.min(player.synthEssence)
  }
  if(Alterations.has(6)) player.integration.holes = player.integration.holes.add(IntegrationPrestige.holesFormula().mul(diff).mul(TemporalPlane.totalEffect()))
  if(player.integration.challenge == 7 && player.i.gte(IntegrationChallenges[7].goal())) player.integration.chalCompletions[7] = player.i.div("1e1.7e9").log("1e5e7").add(1).max(0).floor()
  if(player.inLostIntegration) {
    if(hasQU(7) && player.points.lt(25)) player.points = new Decimal(25)
    if(!player.inSqrt) player.x = player.x.add(CoordinatePlaneLI.xPerMin().div(60).mul(diff))
    player.challengeEssence = player.challengeEssence.add(SquareRootLI.sqrtGen().mul(diff))
    if(hasComplexMilestoneLI(7) && SquareRootLI.reFormula().gt(player.rootEssence) && !player.inSqrt) player.rootEssence = SquareRootLI.reFormula()
    if(ccTiers() >= player.extraUP) {
      player.upgradePoints[0] = player.upgradePoints[0].add(new Decimal(ccTiers()).sub(player.extraUP))
      player.upgradePoints[1] = player.upgradePoints[1].add(new Decimal(ccTiers()).sub(player.extraUP))
      player.extraUP = ccTiers()
    }
    if(!player.inSqrt) player.y = player.y.add(CoordinatePlaneLI.yPerMin().div(60).mul(diff))
    if(ComplexChallengesLI.milestones.has(5) && ResetPrestige.rpFormula().gte(1)) {
      player.x2 = player.x2.add(ResetPrestige.rpFormula().div(100).mul(diff))
      player.totalx2 = player.totalx2.add(ResetPrestige.rpFormula().div(100).mul(diff))
    }
    if(player.zlab.zpower.gt(0) && !FractalMilestones.has(8)) player.zlab.zpower = player.zlab.zpower.div(Decimal.pow(1.01,diff * 40))
    if(player.zlab.charged == 1 || FractalMilestones.has(9)) player.zlab.particles[1] = player.zlab.particles[1].add(player.zlab.zpower.sqrt().mul(25).mul(ZLabLI.effects(4)).mul(ZLabLI.particleMult()).pow(hasPermUpgrade(20) ? 1.01 : 1).mul(diff))
    if(player.zlab.charged == 2 || FractalMilestones.has(9)) player.zlab.particles[2] = player.zlab.particles[2].add(player.zlab.zpower.sqrt().mul(25).mul(ZLabLI.effects(6)).mul(ZLabLI.particleMult()).pow(hasPermUpgrade(20) ? 1.01 : 1).mul(diff))
    if(player.zlab.charged == 3 || FractalMilestones.has(9)) player.zlab.particles[3] = player.zlab.particles[3].add(player.zlab.zpower.sqrt().mul(25).mul(ZLabLI.effects(2)).mul(ZLabLI.particleMult()).pow(hasPermUpgrade(20) ? 1.01 : 1).mul(diff))
    player.integration.emptySets = player.integration.emptySets.add(MetaGenerators[1].eff().mul(diff))
    player.integration.rebuyableUpgrades[5] = player.integration.rebuyableUpgrades[5].add(MetaGenerators[2].eff().mul(diff))
    player.integration.rebuyableUpgrades[6] = player.integration.rebuyableUpgrades[6].add(MetaGenerators[3].eff().mul(diff))
    player.integration.rebuyableUpgrades[7] = player.integration.rebuyableUpgrades[7].add(MetaGenerators[4].eff().mul(diff))
    if(FractalArm.hasUpgrade(171)) player.integration.rebuyableUpgrades[8] = player.integration.rebuyableUpgrades[8].add(player.integration.rebuyableUpgrades[1].mul(Decimal.pow(1.1,player.integration.rebuyableUpgrades[1])).mul(MetaGenerators.mults()).mul(diff))
    if(FractalArm.hasUpgrade(81)) {
      if(player.integration.derivatives[0].lt(1)) player.integration.derivatives[0] = new Decimal(1)
      if(player.integration.derivatives[2].lt(1)) player.integration.derivatives[2] = new Decimal(1)
      if(player.integration.derivatives[0].lt(Minibrots.cap())) player.integration.derivatives[0] = player.integration.derivatives[0].mul(Decimal.pow(Minibrots.multPerSecond(),diff))
      if(player.integration.derivatives[0].gte(Minibrots.cap())) player.integration.derivatives[0] = Minibrots.cap()
      player.integration.derivatives[2] = player.integration.derivatives[2].min(1e49)
    }
    if(player.integration.challenge > 8) {
      player.triangles = player.triangles.add(player.points.max(1).log10().div(MandelbrotChallenges[player.integration.challenge - 8].logarithmDivisor()).mul(diff))
      if(player.prestigeTimes[6] > player.integration.chalCompletions[9][player.integration.challenge - 8]) {
        player.integration.challenge = 0
        MandelbrotPrestige.enterMandelbrot(true);
      }
      if(player.triangles.gte(100)) {
        player.integration.chalCompletions[9][player.integration.challenge - 8] = player.prestigeTimes[6]
        player.integration.challenge = 0
        MandelbrotPrestige.enterMandelbrot(true);
      }
    }
    if(FractalArm.hasUpgrade(152) && player.integration.challenge != 12) {
      if(ComplexPrestigeLI.iFormula().gte(1)) {
        player.i = player.i.add(ComplexPrestigeLI.iFormula().div(100).mul(diff))
        player.totali = player.totali.add(ComplexPrestigeLI.iFormula().div(100).mul(diff))
      }
      if(YQuadraticPrestigeLI.y2Formula().gte(1)) {
        player.y2 = player.y2.add(YQuadraticPrestigeLI.y2Formula().div(100).mul(diff))
        player.totaly2 = player.totaly2.add(YQuadraticPrestigeLI.y2Formula().div(100).mul(diff))
      }
    }
  }
  
  if(player.integrations.lt(1)) {
    player.points = player.points.min("1e5e8")
    player.totalPoints = player.totalPoints.min("1e5e8")
    player.totalPointsThisIntegration = player.totalPointsThisIntegration.min("1e5e8")
  }
  
  // (mostly) UPDATE FUNCTIONS
  updateAuto() //runs the autobuyers
  if(hasUpgrade(6)) produceBuildings(diff) //makes buildings produce other buildings
  updatePercent() //updates the building production percentages
  updateExps(diff) //updates the Challenge exponents
  updateNotifs() //detects various accomplishments you've made and sends notifications for them
  updateValues() //makes sure that the values for input elements throughout the game don't reset
  updateRootEpicenter() //disables slider when in Square Root and detects Level 4 and -1 completion
  if(ccTiers() >= (player.inLostIntegration ? 24 : 50) || IntegrationUpgrades.mil2.isBought()) updatePolynomials(diff) //makes polynomials produce other polynomials
  updateModal() //shows modals when requirements are met
  updateUnlocks() //automatically unlocks mechanics from QoL Integration Upgrades
  updateBars() //manages Pythagorean Triples bars
  fixUnixEpoch() //fixes the bug where Quadratic and Complex times jump a Unix Epoch
  trappedInSqrt() //traps the player in Square Root when in Complex Challenge 5 or Y-Challenge 4
  if(hasMilestone(15)) simulateEssence(1) //passively generates RE
  if(hasMilestone(16)) simulateEssence(4) //passively generates CE
  checkForEndgame() //detects if the player has viewed the ending cutscene
  modifiedReality() //hasn't it always been there?
  compChalDetection() //checks if you failed CC4
  if(player.integration.automationCore.running && player.integrations.gte(15) && !player.inLostIntegration) runAutomationCoreScript() //runs the automation core script
  updateComplexSubtab() //switches your tab depending on whether hypercomplex subtabs are on
  IntegrationChallenges.updateIC5() //updates integration challenge 5 completions
  if(player.inLostIntegration) updateExponentialCurve() // updates geometric sequence values for Exponential Curve
  // showAllTabs() //disables tab hiding after unlocking Synthetic Division

  if(tmp.absurdMode) {
    let absurdArr = [(Math.random() * 4) - 2,(Math.random() * 4) - 2,(Math.random() * 4) - 2,Math.random() * Math.PI * 2]
    document.getElementsByTagName("body")[0].setAttribute('style',`transform: rotate3d(${absurdArr[0]}, ${absurdArr[1]}, ${absurdArr[2]}, ${absurdArr[3]}rad)`)
  }
  
  if(FractalArm.hasUpgrade(221)) document.title = "The End"
  
  setTimeout(()=>{if(FractalArm.hasUpgrade(221) && player.inLostIntegration && !isNaN(player.points) && !tmp.triggeredEndingCutscene && !player.viewedEndingCutscene) {
    tmp.triggeredEndingCutscene = true
    cueEndingCutscene()
  }},1000)
  
  if(player.points.isNan()) {
    exportAsFile()
    alert("WARNING: NaN Detected! Your save file has been exported (unless your browser has blocked file downloads). Try clearing the local storage of the game and importing the exported save. If that doesn't work, try and find a save in the AP save banks on the Discord server. Sorry for the inconvenience :(")
  }
  requestAnimationFrame(mainLoop)
}

requestAnimationFrame(mainLoop)

function updateAuto() {
  // VARIABLES
  if(player.integration.autobuyers.w && player.z.gte(wCost())) while(player.z.gte(wCost())) buyVariable('w')
  if(player.autobuyers[11] && hasYQU(2,'bought') && player.challenge != 10 && player.compChallenge != 5 && player.y.gte(zCost())) {
    let a = new Decimal(10).div(player.yChallenge == 6 ? 1 : zDivision())
    let b = new Decimal(101).div(player.yChallenge == 6 ? 1 : zDivision())
    let c = new Decimal(2222).div(player.yChallenge == 6 ? 1 : zDivision()).sub(player.y.max(1))
    player.z = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
  }
  if(player.autobuyers[8] && player.x.gte(yCost()) && player.challenge != 10 && player.compChallenge != 5 && !player.inLostIntegration){
    if(player.compChallenge == 3) {
      player.y = player.x.add(1).root(4).div(100).mul(hasQU(18)?(hasChargedQU(18)?10:1.1):1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff()).mul(NumberSets.effect(1,4))))).floor().add(player.x.gte(100)?1:0)
    } else if (player.yChallenge == 6) {
      player.y = player.x.add(1).div(100).max(1).log(1.25).floor().add(player.x.gte(100)?1:0)
    } else {
      player.y = player.x.add(1).div(100).mul(hasQU(18)?(hasChargedQU(18)?10:1.1):1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff()).mul(NumberSets.effect(1,4))))).floor().add(player.x.gte(100)?1:0)
    }
  }
  if(player.autobuyers[7] && player.points.gte(xCost()) && player.challenge != 10 && player.compChallenge != 5 && !player.inLostIntegration){
    if(player.compChallenge == 3) {
      player.x = player.points.root(10).div(100000).mul(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).floor()
    } else if (player.challenge == 5 || player.compChallenge == 8) {
      buyVariable("x");
    } else if (player.yChallenge == 6) {
      player.x = player.points.div(100000).max(1).log(1.11).floor()
    } else {
      player.x = player.points.div(100000).mul(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).floor()
    }
    if(!hasQU(8)) player.points = player.points.sub(xCost())
    player.x = player.x.add(1)
  }

  if(player.autobuyers[11] && player.y.gte(zCost()) && player.compChallenge != 5 && player.inLostIntegration && hasYQU(4,'lost')) {
    let prev = player.abc[3]
    player.abc[3] = player.y.div(70000).max(1).log(Decimal.div(1.2,FractalArm.hasUpgrade(163) ? FractalArm[16][3].eff() : 1)).add(1).floor()
    player.z = player.z.add(player.abc[3].sub(prev))
  }
  if(player.autobuyers[8] && player.x.gte(yCost()) && player.compChallenge != 5 && player.inLostIntegration) {
    let prev = player.abc[2]
    player.abc[2] = player.x.pow(player.compChallenge == 3 ? 0.25 : 1).div(100).mul(hasQU(22) ? 1000000 : 1).max(1).log(yCostScalingLI()).add(1).floor()
    player.y = player.y.add(player.abc[2].sub(prev))
  }
  if(player.autobuyers[7] && player.points.gte(xCost()) && player.compChallenge != 5 && player.inLostIntegration) {
    let prev = player.abc[1]
    player.abc[1] = player.points.pow(player.challenge == 12 || player.challenge == 16 ? 0.5 : 1).pow(player.compChallenge == 3 ? 0.1 : 1).div(100000).mul(hasUpgrade(3) ? 2 : 1).mul(hasQU(4) ? ResetTable[4].eff() : 1).mul(hasUpgrade(5) ? 1e6 : 1).max(1).log(xCostScalingLI())
    if(!hasComplexMilestoneLI(10)) player.points = player.points.sub(xCost())
    player.abc[1] = player.abc[1].add(1).floor()
    player.x = player.x.add(player.abc[1].sub(prev))
  }

  // GENERATOR MULTIPLIER
  if(player.autobuyers[4] && hasUpgrade(4) && player.abc[1].gte(GeneratorMultiplier.cost().sub(1)) && player.inLostIntegration) {
    if(player.abc[1].gte(GeneratorMultiplier.superscalingStart())) {
      player.buyables[4] = player.abc[1].div(GeneratorMultiplier.superscalingStart()).max(0).root(1.25).mul(GeneratorMultiplier.superscalingStart()).sub(50).div(hasQU(9) ? 4 : 5).add(1).floor()
    } else {
      player.buyables[4] = player.abc[1].sub(50).div(hasQU(9) ? 4 : 5).add(1).floor()
    }
  }
  
  // FUNCTIONS
  if(player.autobuyers[6] && player.points.gte(BUYABLES[6].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8 && !player.inLostIntegration){
    player.buyables[6] = player.points.div(100000000).max(1).log(functionCostScaling(3)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[6].cost())
    player.buyables[6] = player.buyables[6].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[5] && player.points.gte(BUYABLES[5].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8 && !player.inLostIntegration){
    player.buyables[5] = player.points.div(30000000).max(1).log(functionCostScaling(2)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[5].cost())
    player.buyables[5] = player.buyables[5].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[4] && player.points.gte(BUYABLES[4].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8 && !player.inLostIntegration){
    player.buyables[4] = player.points.div(5000000).max(1).log(functionCostScaling(1)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[4].cost())
    player.buyables[4] = player.buyables[4].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // BUILDINGS
  if(player.autobuyers[5] && player.points.gte(BUYABLES[7].cost()) && player.challenge != 10 && player.compChallenge != 8 && player.inLostIntegration && hasCU(0,1)){
    player.buyables[5] = player.points.div(1000000).max(1).log(buildingCostScaling()).floor()
    if(player.inLostIntegration && !hasComplexMilestoneLI(10)) player.points = player.points.sub(BUYABLES[7].cost())
    player.buyables[5] = player.buyables[5].add(1)
  }
  if(player.autobuyers[3] && player.points.gte(BUYABLES[3].cost()) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[3] = player.points.div(15000).max(1).log(buildingCostScaling()).floor()
    if((!hasQU(8) && !player.inLostIntegration) || (player.inLostIntegration && !hasComplexMilestoneLI(10))) player.points = player.points.sub(BUYABLES[3].cost())
    player.buyables[3] = player.buyables[3].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[2] && player.points.gte(BUYABLES[2].cost()) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[2] = player.points.div(200).max(1).log(buildingCostScaling()).floor()
    if((!hasQU(8) && !player.inLostIntegration) || (player.inLostIntegration && !hasComplexMilestoneLI(10))) player.points = player.points.sub(BUYABLES[2].cost())
    player.buyables[2] = player.buyables[2].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[1] && player.points.gte(BUYABLES[1].cost()) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[1] = player.points.div(25).max(1).log(buildingCostScaling()).floor()
    if((!hasQU(8) && !player.inLostIntegration) || (player.inLostIntegration && !hasComplexMilestoneLI(10))) player.points = player.points.sub(BUYABLES[1].cost())
    player.buyables[1] = player.buyables[1].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // QUADRATIC
  if(player.autobuyers[9] && !player.inLostIntegration && (!player.inSqrt || player.compChallenge == 5) && (player.challenge == 0 || player.integration.challenge == 1)) {
    if(player.compAutobuyers[2] == 1 && quadFormula().gte(player.inputValue)) goQuadratic(false)
    if(player.compAutobuyers[2] == 2 && player.prestigeTimes[0] >= player.inputValue) goQuadratic(false)
    if(player.compAutobuyers[2] == 3 && quadFormula().gte(player.x2.mul(player.inputValue))) goQuadratic(false)
  }

  // RESETTING (LI)
  if(player.autobuyers[9] && player.inLostIntegration && ((!player.inSqrt && player.challenge == 0) || player.compChallenge == 5)) {
    if(player.compAutobuyers[2] == 1 && ResetPrestige.rpFormula().gte(player.inputValue)) ResetPrestige.reset(false)
    if(player.compAutobuyers[2] == 2 && player.prestigeTimes[0] >= player.inputValue) ResetPrestige.reset(false)
    if(player.compAutobuyers[2] == 3 && ResetPrestige.rpFormula().gte(player.x2.mul(player.inputValue))) ResetPrestige.reset(false)
  }
  
  // COMPLEX
  if(player.compAutobuyers[7] && !player.inSqrt && ((player.challenge == 0 && player.compChallenge == 0) || player.integration.challenge == 1) && !player.inLostIntegration) {
    if(!player.compAutobuyers[10] && compFormula().gte(player.inputValue2)) goComplex(false)
    if(player.compAutobuyers[10] && player.prestigeTimes[2] >= player.inputValue2) goComplex(false)
    if(player.compAutobuyers[10] == 2 && compFormula().gte(player.i.mul(player.inputValue2))) goComplex(false)
  }

  // COMPLEX (LI)
  if(player.compAutobuyers[7] && !player.inSqrt && (player.challenge == 0 && player.compChallenge == 0) && player.inLostIntegration) {
    if(player.compAutobuyers[10] == 0 && ComplexPrestigeLI.iFormula().gte(player.inputValue2)) ComplexPrestigeLI.goComplex(false)
    if(player.compAutobuyers[10] == 1 && player.prestigeTimes[2] >= player.inputValue2) ComplexPrestigeLI.goComplex(false)
    if(player.compAutobuyers[10] == 2 && ComplexPrestigeLI.iFormula().gte(player.i.mul(player.inputValue2))) ComplexPrestigeLI.goComplex(false)
  }
  
  // Y-QUADRATIC
  if(player.compAutobuyers[12] && !player.inLostIntegration) {
    if(player.integration.autobuyers.yQuadraticAutomatorMode == 0 && yQuadFormula().gte(player.inputValue3)) goYQuadratic(false)
    if(player.integration.autobuyers.yQuadraticAutomatorMode == 1 && player.prestigeTimes[4] >= player.inputValue3) goYQuadratic(false)
    if(player.integration.autobuyers.yQuadraticAutomatorMode == 2 && yQuadFormula().gte(player.y2.mul(player.inputValue3))) goYQuadratic(false)
  }

  // Y-QUADRATIC (LI)
  if(player.compAutobuyers[12] && player.inLostIntegration && hasYQU(12,'lost')) {
    if(player.integration.autobuyers.yQuadraticAutomatorMode == 0 && YQuadraticPrestigeLI.y2Formula().gte(player.inputValue3)) YQuadraticPrestigeLI.goYQuadratic(false)
    if(player.integration.autobuyers.yQuadraticAutomatorMode == 1 && player.prestigeTimes[4] >= player.inputValue3) YQuadraticPrestigeLI.goYQuadratic(false)
    if(player.integration.autobuyers.yQuadraticAutomatorMode == 2 && YQuadraticPrestigeLI.y2Formula().gte(player.y2.mul(player.inputValue3))) YQuadraticPrestigeLI.goYQuadratic(false)
  }
  
  // INTEGRATION
  if(player.integration.autobuyers.integration && !player.inLostIntegration) {
    if(player.integration.autobuyers.autoIntegrationMode == 0 && IntegrationPrestige.dxFormula().gte(player.inputValue4)) IntegrationPrestige.integrate(false)
    if(player.integration.autobuyers.autoIntegrationMode == 1 && IntegrationPrestige.emptySetsFormula().gte(player.inputValue4)) IntegrationPrestige.integrate(false)
    if(player.integration.autobuyers.autoIntegrationMode == 2 && player.prestigeTimes[6] >= player.inputValue4) IntegrationPrestige.integrate(false)
  }

  // MANDELBROT (LI)
  if(player.integration.autobuyers.integration && player.inLostIntegration) {
    if(player.integration.autobuyers.autoIntegrationMode == 0 && MandelbrotPrestige.meFormula().gte(player.inputValue4)) MandelbrotPrestige.enterMandelbrot(false)
    if(player.integration.autobuyers.autoIntegrationMode == 1 && player.prestigeTimes[6] >= player.inputValue4) MandelbrotPrestige.enterMandelbrot(false)
    if(player.integration.autobuyers.autoIntegrationMode == 2 && MandelbrotPrestige.meFormula().gte(player.integration.dx.mul(player.inputValue4))) MandelbrotPrestige.enterMandelbrot(false)
  }
  
  // SINUSOIDAL
  if(player.integration.autobuyers.sinusoidal) {
    if(!player.integration.autobuyers.autoSinusoidalMode && SinusoidalPrestige.trianglesFormula().gte(player.inputValue5)) SinusoidalPrestige.goSinusoidal(false)
    if(player.integration.autobuyers.autoSinusoidalMode && player.prestigeTimes[8] >= player.inputValue5) SinusoidalPrestige.goSinusoidal(false)
  }
  
  // SACRIFICE
  if(player.autobuyers[10] && !player.inLostIntegration){
    sacrifice('x')
    sacrifice('y')
    if(hasQU(19)) sacrifice('x<sup>2</sup>')
    if(hasYQU(2,'bought')) sacrifice('z')
  }
  if(player.autobuyers[10] && player.inLostIntegration){
    if(player.y.gte(CoordinatePlaneLI.buyables[1].cost())) {
      player.sacY = player.sacY.add(CoordinatePlaneLI.buyables[1].cost())
      player.quadBuyables[1] = player.y.max(1).log(1.1).add(1).floor()
    }
    if(player.quadBuyables[2].lt(50)) {
      while(player.points.gte(CoordinatePlaneLI.buyables[2].cost())) {
        player.sacX = player.sacX.add(CoordinatePlaneLI.buyables[2].cost())
        CoordinatePlaneLI.buyables[2].buy()
      }
    } else if (player.points.gte(CoordinatePlaneLI.buyables[2].cost())) {
      player.sacX = player.sacX.add(CoordinatePlaneLI.buyables[2].cost())
      let a = new Decimal(1)
      let b = Decimal.sub(2,Decimal.mul(100,a))
      let c = Decimal.add(18,a.mul(Decimal.pow(50,2))).sub(player.points.max(1).log10())
      player.quadBuyables[2] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    }
    if(player.x2.gte(CoordinatePlaneLI.buyables[3].cost())) {
      player.sacX2 = player.sacX2.add(CoordinatePlaneLI.buyables[3].cost())
      player.quadBuyables[3] = player.x2.div(100).max(1).log(50).add(1).min(58859189).floor()
    }
    while(player.z.gte(CoordinatePlaneLI.buyables[4].cost()) && FractalMilestones.has(6)) {
      CoordinatePlaneLI.buyables[4].buy()
    }
  }
  
  // DOUBLERS
  if(player.compAutobuyers[1] && hasQU(16) && !player.inLostIntegration){
    if(player.complexes.lt(20) && player.integrations.lt(40)) {
      while(player.x2.gte(doublerCost())) buyDoubler()
    } else {
      if(player.x2.lt(hasZlabMilestone(4,1)?"1e500":"1e300") && player.x2.gte(doublerCost())) {
        player.doublers = player.x2.max(1).log10().sub(9).floor().add(1)
      } else if(player.x2.gte(doublerCost())) {
        let a = new Decimal(1.1).log10()
        let b = Decimal.sub(1,Decimal.mul(hasZlabMilestone(4,1)?980:580,a))
        let c = Decimal.add(9,a.mul(Decimal.pow(hasZlabMilestone(4,1)?490:290,2))).sub(player.x2.max(1).log10())
        player.doublers = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
      }
    }
  }
  if(player.compAutobuyers[3] && !player.inLostIntegration){
    if(player.complexes.lt(20) && player.integrations.lt(40)) {
      while(player.rootEssence.gte(sqrtDoublerCost())) buySqrtDoubler()
    } else {
      if(player.rootEssence.lt(hasZlabMilestone(4,2)?"1.105e177":"1.577e72") && player.rootEssence.gte(sqrtDoublerCost())) {
        player.sqrtDoublers = player.rootEssence.max(1).log(5).sub(new Decimal(200).log10()).floor().add(1)
      } else if(player.rootEssence.gte(sqrtDoublerCost())) {
        let a = new Decimal(1.05).log10()
        let b = Decimal.sub(new Decimal(5).log10(),Decimal.mul(hasZlabMilestone(4,2)?500:200,a))
        let c = Decimal.add(new Decimal(200).log10(),a.mul(Decimal.pow(hasZlabMilestone(4,2)?250:100,2))).sub(player.rootEssence.max(1).log10())
        player.sqrtDoublers = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
      }
    }
  }
  if(player.compAutobuyers[3] && player.inLostIntegration) {
    if(player.challengeEssence.gte(SquareRootLI.buyables[1].cost())) {
      player.quadBuyables[4] = player.challengeEssence.div(1000).mul(hasChallenge(15) ? 1e6 : 1).max(1).log(6).add(1).floor()
    }
    if(player.challengeEssence.gte(SquareRootLI.buyables[2].cost())) {
      player.quadBuyables[5] = player.challengeEssence.div(10000).mul(hasChallenge(15) ? 1e6 : 1).max(1).log(4).add(1).floor().min(hasCU(1,8) ? (FractalArm.hasUpgrade(121) ? 19 : 18) : 17)
      if(!hasComplexMilestoneLI(8)) player.challengeEssence = new Decimal(0)
    }
    while(player.challengeEssence.gte(SquareRootLI.buyables[3].cost())) {
      SquareRootLI.buyables.buy(3)
    }
    /* if(player.quadBuyables[6].lt(20)) {
      while(player.challengeEssence.gte(SquareRootLI.buyables[3].cost())) {
        SquareRootLI.buyables.buy(3)
      }
    } else if (player.challengeEssence.gte(SquareRootLI.buyables[3].cost())) {
      let a = new Decimal(5).sub(hasChallenge(15) ? 6 : 0)
      let b = Decimal.sub(1,Decimal.mul(40,a))
      let c = Decimal.add(1,a.mul(Decimal.pow(20,2))).sub(player.challengeEssence.max(1).log10())
      player.quadBuyables[6] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    } */
  }
  if(player.compAutobuyers[1] && player.inLostIntegration && player.y2.gte(YQuadraticUpgradesLI.doublerCost())) {
    player.doublers = player.y2.div(1e27).max(1).log(1e6).add(1).floor()
  }
  
  // Y-INTERCEPT
  if(player.compAutobuyers[4] && hasUpgrade(8) && player.slope.gte(bCost())){
    let a = new Decimal(1)
    let b = new Decimal(4)
    let c = new Decimal(23).sub(player.slope.max(1).log10())
    player.b = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
  }
  
  // QP BUYABLES
  if(player.compAutobuyers[5] && hasQU(20) && player.compChallenge != 9) {
    for (let i = 1; i < 5; i++) {
      let a = arr1[i].log10()
      let b = arr2[i].log10()
      let c = arr3[i].log10().sub(player.quadPower.max(1).log10())
      player.quadBuyables[i] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).max(0).sqrt()).div(a.mul(2)).add(1).floor().max(0).min(i == 1 ? (hasZlabMilestone(3,2) ? (IntegrationUpgrades.points8.isBought() ? (hasChargedQU(6) ? 8 : 6) : 5) : 4) : Infinity)
    }
  }
  
  // AUTO-ADJUST
  if(player.compAutobuyers[6] && hasQU(20)) {
    player.abc[1] = maxABC()
    player.abc[2] = maxABC()
    if(!player.compAutobuyers[11]) player.abc[3] = maxABC().div(4).floor()
    if(player.compAutobuyers[11]) player.abc[3] = maxABC()
  }
  if(player.integration.autobuyers.autoAdjust) {
    PythagoreanTriples.doItForMe(PythagoreanTriples.maxDEF())
  }
  
  // COMPLEX PLANE CURRENCIES
  if(player.compAutobuyers[8][0] && (player.compPlane[0][1].gte(1) || IntegrationUpgrades.cpr.isBought()) && !player.inLostIntegration) {
    if(player.compPlane[0][1].lt(1000) && player.integrations.lt(38)) {
      while(player.i.gte(compPlaneBuyCosts(1))) buyCplaneVar(1)
    } else {
      player.compPlane[0][1] = player.i.div(100000).max(1).log(1.5).add(1).floor()
    }
  }
  if(player.compAutobuyers[8][1] && (player.compPlane[0][2].gte(1) || IntegrationUpgrades.cpr.isBought())) {
    if(player.compPlane[0][2].lt(1000) && player.integrations.lt(38)) {
      while(player.i.gte(compPlaneBuyCosts(2))) buyCplaneVar(2)
    } else {
      player.compPlane[0][2] = player.i.div(1e8).max(1).log(1.75).add(1).floor()
    }
  }
  if(player.compAutobuyers[8][2] && (player.compPlane[0][3].gte(1) || IntegrationUpgrades.cpr.isBought())) {
    if(player.compPlane[0][3].lt(1000) && player.integrations.lt(38)) {
      while(player.i.gte(compPlaneBuyCosts(3))) buyCplaneVar(3)
    } else {
      player.compPlane[0][3] = player.i.div(1e18).max(1).log(2).add(1).floor()
    }
  }
  if(player.compAutobuyers[8][3] && (player.compPlane[0][4].gte(1) || IntegrationUpgrades.cpr.isBought()) && player.i.gte(compPlaneBuyCosts(4))) {
    let a = new Decimal(1)
    let b = new Decimal(10)
    let c = new Decimal(2500).sub(player.i.max(1).log10())
    player.compPlane[0][4] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
  }

  // STEPS (LI)
  if(player.compAutobuyers[8][0] && player.i.gte(ComplexPlaneLI.stepCost()) && player.inLostIntegration) {
    let prev = player.compPlane[0][2]
    let a = new Decimal(4).log10()
    let b = new Decimal(2)
    let c = new Decimal(10).sub(player.i.max(1).log10())
    player.compPlane[0][2] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    player.compPlane[0][1] = player.compPlane[0][1].add(player.compPlane[0][2].sub(prev))
  }
  
  // TRANSFORMATIONS
  if(player.compAutobuyers[9]) {
    for (let i = 1; i <= (hasZlabMilestone(1,2) ? 4 : 3); i++) {
      buyTransform(i)
    }
  }
  
  // IP BUYABLES
  if(player.compAutobuyers[13]) {
    for (let i = 1; i < 5; i++) {
      if(i == 1 || i == 3) {
        while(player.imagPower.gte(QP_BUYABLES[i+4].cost())) buyQPBuyable(i+4)
      } else if (i == 2 && player.imagPower.gte(QP_BUYABLES[6].cost())) {
        let a = new Decimal(1)
        let b = new Decimal(40)
        let c = new Decimal(730).sub(player.imagPower.max(1).log10())
        player.quadBuyables[6] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
      } else if (i == 4 && player.imagPower.gte(QP_BUYABLES[8].cost())) {
        let a = new Decimal(50).log10()
        let b = new Decimal(60)
        let c = new Decimal(760).sub(player.imagPower.max(1).log10())
        player.quadBuyables[8] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).min(imagDuplicatorCap()).floor()
      }
    }
  }
  
  // I TRIPLERS
  if(player.compAutobuyers[14]){
    if(player.triplers.lt(1000) && player.integrations.lt(40)) {
      while(player.compPlane[1][1].gte(triplerCost()) && player.compPlane[1][2].gte(triplerCost()) && player.compPlane[1][3].gte(triplerCost())) buyTripler()
    } else {
      if(player.compPlane[1][1].gte(triplerCost()) && player.compPlane[1][2].gte(triplerCost()) && player.compPlane[1][3].gte(triplerCost())) player.triplers = player.compPlane[1][3].div(10000).max(1).log(hasYQU(9,'bought') ? 25 : 50).add(1).floor()
    }
  }
  
  // REVOLUTION BUYABLES
  if(player.compAutobuyers[15] && hasSDU(5) && player.varSynth.unlocked[2]) {
    if(player.varSynth.revolutions.gte(revBuyableCosts(1))) player.varSynth.iExpBuyables[1] = player.varSynth.revolutions.max(1).div(10).log(4).floor().add(1)
    if(player.varSynth.revolutions.gte(revBuyableCosts(2))) player.varSynth.iExpBuyables[2] = player.varSynth.revolutions.max(1).div(100).log(3).floor().add(1)
    if(player.varSynth.revolutions.gte(revBuyableCosts(3)) && IntegrationUpgrades.yquadratic9.isBought()) player.varSynth.iExpBuyables[3] = player.varSynth.revolutions.max(1).div("1e5000").log(1e100).floor().add(1)
    if(player.varSynth.revolutions.gte(revBuyableCosts(4)) && IntegrationUpgrades.yquadratic9.isBought()) player.varSynth.iExpBuyables[4] = player.varSynth.revolutions.max(1).div("1e10000").log("1e5000").floor().add(1)
  }
  
  // UP PURCHASE BUTTONS
  if(player.integration.autobuyers.upgradePoints) {
    while(player.points.gte(upgradePointCost(1))) buyUP(1)
    while(player.x2.gte(upgradePointCost(2))) buyUP(2)
    while(player.i.gte(upgradePointCost(3))) buyUP(3)
  }
  
  // FOURTH ROW COMPLEX UPGRADES
  if(player.integration.autobuyers.compUpgs && hasZlabMilestone(1,5) && (ccTiers() >= 50 || player.integration.challenge != 0)) {
    if(IntegrationUpgrades.complex10.isBought()) {
      for (let i = 1; i < 5; i++) {
        if(player.upgradePoints[0].gte(COMP_UPGRADES[12+i].cost())) {
          player.fourthRowCompUpgs[i] = player.upgradePoints[0].div(5).log(2).add(1).floor()
        }
      }
    } else {
      let minId = 0
      let minCost = new Decimal(Infinity)
      for (let i = 1; i < 5; i++) {
        if(COMP_UPGRADES[12+i].cost().lt(minCost)) {
          minCost = COMP_UPGRADES[12+i].cost()
          minId = i
        }
      }
      buyCU(0,12+minId)
    }
  }
  
  // Z-COLLIDERS
  if(player.integration.autobuyers.zColliders[2]) {
    increaseLevel(2)
  }
  if(player.integration.autobuyers.zColliders[3]) {
    increaseLevel(3)
  }
  if(player.integration.autobuyers.zColliders[4]) {
    increaseLevel(4)
  }
  if(player.integration.autobuyers.zColliders[5]) {
    if(player.zlab.particles[5].gte(zlabBuyableCosts(6))) player.zlab.levels[5] = player.zlab.particles[5].div("1e3800").log(1e10).add(1).floor().toNumber()
  }
  
  // Z-EMPOWERMENTS
  if(player.integration.autobuyers.zEmpowerments && player.i.gte(zlabBuyableCosts(5)) && !player.inLostIntegration) {
    player.zlab.empowerments = player.i.div(1e110).max(1).log(100000).sqrt().add(1).floor()
  }

  // SACRIFICE Z-POWER (LI)
  if(player.integration.autobuyers.zEmpowerments && player.inLostIntegration) {
    ZLabLI.sacrificeZ()
  }
  
  // POLYNOMIALS
  if(player.integration.autobuyers.polynomials[3]) {
    if(player.polynomials[3].bought.lt(2000)) {
      while(player.x2.gte(polynomialCosts(3))) {
        buyPolynomial(3)
      }
    } else if (player.x2.gte(polynomialCosts(3))) {
      let a = Decimal.pow("1e100000",IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1).log10()
      let b = Decimal.sub(Decimal.pow("1e300000",IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1).log10(),Decimal.mul(26,a))
      let c = Decimal.add(300000,a.mul(Decimal.pow(13,2))).sub(player.x2.max(1).log10())
      player.polynomials[3].bought = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    }
  }
  if(player.integration.autobuyers.polynomials[4]) {
    if(player.polynomials[4].bought.lt(2000)) {
      while(player.polynomials[3].amount.gte(polynomialCosts(4))) {
        buyPolynomial(4)
      }
    } else if (player.polynomials[3].amount.gte(polynomialCosts(4))) {
      let a = Decimal.pow(25,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1).log10()
      let b = Decimal.sub(Decimal.pow(5,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1).log10(),Decimal.mul(616,a))
      let c = Decimal.add(new Decimal(4).log10(),a.mul(Decimal.pow(308,2))).sub(player.polynomials[3].amount.max(1).log10())
      player.polynomials[4].bought = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    }
  }
  if(player.integration.autobuyers.polynomials[5]) {
    if(player.polynomials[5].bought.lt(2000)) {
      while(player.polynomials[4].amount.gte(polynomialCosts(5))) {
        buyPolynomial(5)
      }
    } else if (player.polynomials[4].amount.gte(polynomialCosts(5))) {
      let a = Decimal.pow(256,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1).log10()
      let b = Decimal.sub(Decimal.pow(16,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1).log10(),Decimal.mul(180,a))
      let c = Decimal.add(new Decimal(8).log10(),a.mul(Decimal.pow(90,2))).sub(player.polynomials[4].amount.max(1).log10())
      player.polynomials[5].bought = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    }
  }
  if(player.integration.autobuyers.polynomials[6] && player.polynomials[5].amount.gte(polynomialCosts(6))) player.polynomials[6].bought = player.polynomials[5].amount.div(4).max(1).log(Decimal.pow(64,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1)).floor().add(1)
  if(player.integration.autobuyers.polynomials[7] && player.polynomials[6].amount.gte(polynomialCosts(7))) player.polynomials[7].bought = player.polynomials[6].amount.div(5).max(1).log(Decimal.pow(216,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1)).floor().add(1)
  if(player.integration.autobuyers.polynomials[8] && player.polynomials[7].amount.gte(polynomialCosts(8))) player.polynomials[8].bought = player.polynomials[7].amount.div(6).max(1).log(Decimal.pow(3072,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1)).floor().add(1)
  if(player.integration.autobuyers.polynomials[9] && player.polynomials[8].amount.gte(polynomialCosts(9))) player.polynomials[9].bought = player.polynomials[8].amount.div(6).max(1).log(Decimal.pow(10240,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1)).floor().add(1)
  if(player.integration.autobuyers.polynomials[10] && player.polynomials[9].amount.gte(polynomialCosts(10))) player.polynomials[10].bought = player.polynomials[9].amount.div(9).max(1).log(Decimal.pow(1e10,IntegrationUpgrades.polynomials9.isBought() ? 0.9 : 1)).max(0).floor().add(1)
  
  if(IntegrationUpgrades.pla.isBought()) {
    for (let i = 3; i < 11; i++) {
      if(player.polynomials[i].amount.lt(player.polynomials[i].bought)) player.polynomials[i].amount = player.polynomials[i].bought
      if(i == 10 && player.polynomials[i].bought.gte(1)) {
        player.polynomials[10].boughtThisRun = true
      }
    }
  }
  
  // POLYNOMIAL BUYABLES
  if(player.integration.autobuyers.polyBuyables && !player.inLostIntegration) {
    if(player.polynomials[3].amount.gte(POLY_BUYABLES[1].cost())) {
      let a = new Decimal(0.5)
      let b = new Decimal(2.5)
      let c = new Decimal(5).sub(player.polynomials[3].amount.max(1).log10())
      player.polynomials.buyables[1] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    }
    if(player.polynomials[4].amount.gte(POLY_BUYABLES[2].cost())) {
      let a = new Decimal(0.5)
      let b = new Decimal(3.5)
      let c = new Decimal(4).sub(player.polynomials[4].amount.max(1).log10())
      player.polynomials.buyables[2] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    }
    if(player.polynomials[5].amount.gte(POLY_BUYABLES[3].cost())) {
      let a = new Decimal(0.5)
      let b = new Decimal(4.5)
      let c = new Decimal(5).sub(player.polynomials[5].amount.max(1).log10())
      player.polynomials.buyables[3] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    }
    if(player.polynomials[6].amount.gte(POLY_BUYABLES[4].cost())) {
      let a = new Decimal(0.5)
      let b = new Decimal(3.5)
      let c = new Decimal(6).sub(player.polynomials[6].amount.max(1).log10())
      player.polynomials.buyables[4] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    }
    if(player.polynomials[7].amount.gte(POLY_BUYABLES[5].cost())) {
      let a = new Decimal(0.5)
      let b = new Decimal(4.5)
      let c = new Decimal(6).sub(player.polynomials[7].amount.max(1).log10())
      player.polynomials.buyables[5] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    }
    if(player.polynomials[8].amount.gte(POLY_BUYABLES[6].cost())) {
      let a = new Decimal(1)
      let b = new Decimal(7)
      let c = new Decimal(15).sub(player.polynomials[8].amount.max(1).log10())
      player.polynomials.buyables[6] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    }
  }
  if(player.integration.autobuyers.polyBuyables && player.inLostIntegration) {
    if(player.polynomials[2].amount.gte(XPowers.buyables[1].cost())) player.polynomials.buyables[0] = player.polynomials[2].amount.div(1e6).log(5).sqrt().add(1).floor()
    if(player.polynomials[2].amount.gte(XPowers.buyables[2].cost())) player.polynomials.buyables[1] = player.polynomials[2].amount.div(1e10).log(10).sqrt().add(1).floor()
    if(player.polynomials[2].amount.gte(XPowers.buyables[3].cost())) player.polynomials.buyables[2] = player.polynomials[2].amount.div(1e5).log(5).sqrt().add(1).floor()
    if(player.polynomials[3].amount.gte(XPowers.buyables[4].cost())) player.polynomials.buyables[3] = player.polynomials[3].amount.div(100).log(5).sqrt().add(1).floor()
    if(player.polynomials[3].amount.gte(XPowers.buyables[5].cost())) player.polynomials.buyables[4] = player.polynomials[3].amount.div(1e10).log(20).sqrt().add(1).floor()
    if(player.polynomials[3].amount.gte(XPowers.buyables[6].cost())) player.polynomials.buyables[5] = player.polynomials[3].amount.div(1e5).log(25).sqrt().add(1).floor()
    if(player.polynomials[4].amount.gte(XPowers.buyables[7].cost())) player.polynomials.buyables[6] = player.polynomials[4].amount.div(100).log(20).sqrt().add(1).floor()
    if(player.polynomials[4].amount.gte(XPowers.buyables[8].cost())) player.polynomials.buyables[7] = player.polynomials[4].amount.div(1e10).log(40).sqrt().add(1).floor()
    if(player.polynomials[4].amount.gte(XPowers.buyables[9].cost())) player.polynomials.buyables[8] = player.polynomials[4].amount.div(1e5).log(50).sqrt().add(1).floor()
    if(player.polynomials[5].amount.gte(XPowers.buyables[10].cost())) player.polynomials.buyables[9] = player.polynomials[5].amount.div(100).log(30).sqrt().add(1).floor()
    if(player.polynomials[5].amount.gte(XPowers.buyables[11].cost())) player.polynomials.buyables[10] = player.polynomials[5].amount.div(1e10).log(60).sqrt().add(1).floor()
    if(player.polynomials[5].amount.gte(XPowers.buyables[12].cost())) player.polynomials.buyables[11] = player.polynomials[5].amount.div(1e5).log(50).sqrt().add(1).floor()
    if(player.polynomials[6].amount.gte(XPowers.buyables[13].cost())) player.polynomials.buyables[12] = player.polynomials[6].amount.div(100).log(30).sqrt().add(1).floor()
    if(player.polynomials[6].amount.gte(XPowers.buyables[14].cost())) player.polynomials.buyables[13] = player.polynomials[6].amount.div(1e10).log(60).sqrt().add(1).floor()
    if(player.polynomials[6].amount.gte(XPowers.buyables[15].cost())) player.polynomials.buyables[14] = player.polynomials[6].amount.div(1e5).log(50).sqrt().add(1).floor()
    if(player.polynomials[7].amount.gte(XPowers.buyables[16].cost())) player.polynomials.buyables[15] = player.polynomials[7].amount.div(100).log(30).sqrt().add(1).floor()
    if(player.polynomials[7].amount.gte(XPowers.buyables[17].cost())) player.polynomials.buyables[16] = player.polynomials[7].amount.div(1e10).log(60).sqrt().add(1).floor()
    if(player.polynomials[7].amount.gte(XPowers.buyables[18].cost())) player.polynomials.buyables[17] = player.polynomials[7].amount.div(1e5).log(50).sqrt().add(1).floor()
    if(player.polynomials[8].amount.gte(XPowers.buyables[19].cost())) player.polynomials.buyables[18] = player.polynomials[8].amount.div(100).log(60).sqrt().add(1).floor()
    if(player.polynomials[8].amount.gte(XPowers.buyables[20].cost())) player.polynomials.buyables[19] = player.polynomials[8].amount.div(1e10).log(120).sqrt().add(1).floor()
    if(player.polynomials[8].amount.gte(XPowers.buyables[21].cost())) player.polynomials.buyables[20] = player.polynomials[8].amount.div(1e5).log(100).sqrt().add(1).floor()
    if(player.polynomials[9].amount.gte(XPowers.buyables[22].cost())) player.polynomials.buyables[21] = player.polynomials[9].amount.div(100).log(60).sqrt().add(1).floor()
    if(player.polynomials[9].amount.gte(XPowers.buyables[23].cost())) player.polynomials.buyables[22] = player.polynomials[9].amount.div(1e10).log(120).sqrt().add(1).floor()
    if(player.polynomials[9].amount.gte(XPowers.buyables[24].cost())) player.polynomials.buyables[23] = player.polynomials[9].amount.div(1e5).log(100).sqrt().add(1).floor()
  }
  
  // REPEATABLE SYNTHETIC DIVISION UPGRADES
  if(player.integration.autobuyers.synthDivUpgs[1] && (player.polynomials[6].bought.gte(1) || IntegrationUpgrades.sdr.isBought()) && player.synthEssence.gte(SYNTH_DIV_UPGRADES[1].cost())) player.synthDivUpgs[0][1] = player.synthEssence.max(1).div(1000).mul(SYNTH_DIV_UPGRADES[3].eff()).log10().add(1).floor()
  if(player.integration.autobuyers.synthDivUpgs[2] && (player.polynomials[6].bought.gte(1) || IntegrationUpgrades.sdr.isBought())) buySDU(2)
  if(player.integration.autobuyers.synthDivUpgs[3] && (player.polynomials[6].bought.gte(1) || IntegrationUpgrades.sdr.isBought()) && !IntegrationUpgrades.polynomials8.isBought()) {
    buySDU(3)
  } else if (player.integration.autobuyers.synthDivUpgs[3] && (player.polynomials[6].bought.gte(1) || IntegrationUpgrades.sdr.isBought()) && IntegrationUpgrades.polynomials8.isBought()) {
    if(player.synthEssence.gte(SYNTH_DIV_UPGRADES[3].cost())) player.synthDivUpgs[0][3] = player.synthEssence.div(3.58722675e21).log(69420).add(15).floor()
  }
  
  // XY
  if(player.integration.autobuyers.xy) {
    while(player.x.gte(xyCost(1)) && player.y.gte(xyCost(2))) buyVariable("xy")
  }
  
  // POLYNOMIAL FACTORING
  if(player.integration.autobuyers.polyFactoring && !player.inLostIntegration) {
    if(polyFactoringFormula().div(player.integration.polyFactoringMult).gte(1)) player.integration.polyFactoringMult = polyFactoringFormula()
  }

  // X POWERS BOOSTERS
  if(player.integration.autobuyers.polyFactoring && player.inLostIntegration && player.i.gte(XPowers.xPowersBooster.cost())) {
    if(player.triplers.lt(8)) {
      while(player.i.gte(XPowers.xPowersBooster.cost())) {
        XPowers.xPowersBooster.buy()
      }
    } else if (player.i.gte(XPowers.xPowersBooster.cost())) {
      let a = new Decimal(25)
      let b = Decimal.sub(200,Decimal.mul(16,a))
      let c = Decimal.add(2250,a.mul(Decimal.pow(8,2))).sub(player.i.max(1).log10())
      player.triplers = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
    }
  }
  
  // TEMPORAL PLANE CURRENCIES
  for (let i = 0; i < 5; i++) {
    if(player.integration.autobuyers.temporalPlane[i] && player.integration.dx.gte(TemporalPlane.buyableCosts(i))) {
      if(i == 0) player.integration.temporalPlane.buyables[i] = player.integration.dx.div(100).log(2).add(1).floor()
      if(i == 1) player.integration.temporalPlane.buyables[i] = player.integration.dx.div(10000).log(5).add(1).floor()
      if(i == 2) player.integration.temporalPlane.buyables[i] = player.integration.dx.div(1e7).log(15).add(1).floor()
      if(i == 3) player.integration.temporalPlane.buyables[i] = player.integration.dx.div(1e11).log(75).add(1).floor()
      if(i == 4) player.integration.temporalPlane.buyables[i] = player.integration.dx.div(1e16).log(250).add(1).floor()
    }
  }
  
  // REBUYABLE INTEGRATION UPGRADES
  if(player.integration.autobuyers.rebuyableIntegUpgs) {
    if(player.integration.dx.gte(RebuyableIntegrationUpgrades[1].cost())) player.integration.rebuyableUpgrades[1] = player.integration.dx.mul(SinusoidalUpgrades[18].eff()).log(20).add(1).floor()
    if(player.integration.dx.gte(RebuyableIntegrationUpgrades[2].cost())) player.integration.rebuyableUpgrades[2] = player.integration.dx.mul(SinusoidalUpgrades[18].eff()).log(30).add(1).floor()
    if(player.integration.dx.gte(RebuyableIntegrationUpgrades[3].cost())) player.integration.rebuyableUpgrades[3] = player.integration.dx.mul(SinusoidalUpgrades[18].eff()).log(40).add(1).floor()
    if(player.integration.dx.gte(RebuyableIntegrationUpgrades[4].cost())) player.integration.rebuyableUpgrades[4] = player.integration.dx.mul(SinusoidalUpgrades[18].eff()).div(2).log(50).add(1).floor()
    if(player.integration.dx.gte(RebuyableIntegrationUpgrades[5].cost())) player.integration.rebuyableUpgrades[5] = player.integration.dx.mul(SinusoidalUpgrades[18].eff()).div(2).log(60).add(1).floor()
  }
  
  // TRIGONOMETRIC FUNCTIONS
  for (let i = 1; i < 7; i++) {
    if(player.integration.autobuyers.trigFunctions[i] && player.trigFunctions.waves.gte(TrigFunctions[i].cost())) {
      if(i == 1) player.trigFunctions.buyables[i] = player.trigFunctions.waves.div(100).log(100).add(1).floor()
      if(i == 2) player.trigFunctions.buyables[i] = player.trigFunctions.waves.div(10000).log(1000).add(1).floor()
      if(i == 3) player.trigFunctions.buyables[i] = player.trigFunctions.waves.div(1e6).log(10000).add(1).floor()
      if(i == 4) player.trigFunctions.buyables[i] = player.trigFunctions.waves.div(1e7).log(100000).add(1).floor()
      if(i == 5) player.trigFunctions.buyables[i] = player.trigFunctions.waves.div(1e9).log(1e6).add(1).floor()
      if(i == 6) player.trigFunctions.buyables[i] = player.trigFunctions.waves.div(1e12).log(1e8).add(1).floor()
    }
  }

  // DERIVATIVE FUNCTIONS
  for (let i = 1; i < 4; i++) {
    if(player.integration.autobuyers.derivativeFunctions[i] && player.integration.limitScore.gte(Derivatives.functions[i].cost())) {
      if(i == 1) player.integration.derivatives.functions[i] = player.integration.limitScore.div(5e19).log(2).add(1).floor()
      if(i == 2) player.integration.derivatives.functions[i] = player.integration.limitScore.div(1e24).log(5).add(1).floor()
      if(i == 3) player.integration.derivatives.functions[i] = player.integration.limitScore.div(1e26).log(7).add(1).floor()
    }
  }
  
  // Y-POLYNOMIALS
  if(player.integration.autobuyers.yPolynomials[3] && player.y2.gte(YPolynomials.costs(3))) player.yPolynomials[3].bought = player.y2.div("1e140000").max(1).log("1e2000").sqrt().floor().add(1)
  if(player.integration.autobuyers.yPolynomials[4] && player.yPolynomials[3].amount.gte(YPolynomials.costs(4))) player.yPolynomials[4].bought = player.yPolynomials[3].amount.div(3).max(1).log(8).floor().add(1)
  if(player.integration.autobuyers.yPolynomials[5] && player.yPolynomials[4].amount.gte(YPolynomials.costs(5))) player.yPolynomials[5].bought = player.yPolynomials[4].amount.div(5).max(1).log(24).floor().add(1)
  if(player.integration.autobuyers.yPolynomials[6] && player.yPolynomials[5].amount.gte(YPolynomials.costs(6))) player.yPolynomials[6].bought = player.yPolynomials[5].amount.div(5).max(1).log(96).floor().add(1)
  if(player.integration.autobuyers.yPolynomials[7] && player.yPolynomials[6].amount.gte(YPolynomials.costs(7))) player.yPolynomials[7].bought = player.yPolynomials[6].amount.div(5).max(1).log(420).floor().add(1)
  if(player.integration.autobuyers.yPolynomials[8] && player.yPolynomials[7].amount.gte(YPolynomials.costs(8))) player.yPolynomials[8].bought = player.yPolynomials[7].amount.div(6).max(1).log(6144).floor().add(1)
  if(player.integration.autobuyers.yPolynomials[9] && player.yPolynomials[8].amount.gte(YPolynomials.costs(9))) player.yPolynomials[9].bought = player.yPolynomials[8].amount.div(7).max(1).log(78125).floor().add(1)
  if(player.integration.autobuyers.yPolynomials[10] && player.yPolynomials[9].amount.gte(YPolynomials.costs(10))) player.yPolynomials[10].bought = player.yPolynomials[9].amount.div(9).max(1).log(1e10).floor().add(1)
  for (let i = 3; i < 11; i++) {
    if(player.yPolynomials[i].amount.lt(player.yPolynomials[i].bought)) player.yPolynomials[i].amount = player.yPolynomials[i].bought
  }
  
  // SINGULARITY UPGRADES
  if(player.integration.autobuyers.singularityUpgs) {
    if(player.integration.holes.gte(RebuyableIntegrationUpgrades[6].cost())) player.integration.rebuyableUpgrades[6] = player.integration.holes.mul(Derivatives.buyables[5].eff()).log(3).add(1).floor()
    if(player.integration.holes.gte(RebuyableIntegrationUpgrades[7].cost())) player.integration.rebuyableUpgrades[7] = player.integration.holes.mul(Derivatives.buyables[5].eff()).log(4).add(1).min(10).floor()
    if(player.integration.holes.gte(RebuyableIntegrationUpgrades[8].cost())) player.integration.rebuyableUpgrades[8] = player.integration.holes.mul(Derivatives.buyables[5].eff()).div(2).log(5).add(1).floor()
    if(player.integration.holes.gte(RebuyableIntegrationUpgrades[9].cost())) player.integration.rebuyableUpgrades[9] = player.integration.holes.mul(Derivatives.buyables[5].eff()).div(2).log(6).add(1).floor()
    if(player.integration.holes.gte(RebuyableIntegrationUpgrades[10].cost())) player.integration.rebuyableUpgrades[10] = player.integration.holes.mul(Derivatives.buyables[5].eff()).div(10).log(10).add(1).floor()
  }
  
  // UNIT CIRCLE UPGRADERS
  if(player.integration.autobuyers.unitCircleUpgs) {
    if(player.trigFunctions.waves.gte(UnitCircle.costs(0))) player.unitCircle.purchases[0] = player.trigFunctions.waves.div(1e63).log(1e12).sqrt().add(1).floor()
    if(player.triangles.gte(UnitCircle.costs(1))) player.unitCircle.purchases[1] = player.triangles.div(1e70).log(1e15).sqrt().add(1).floor()
  }

  // DERIVATIVE BUYABLES
  if(player.integration.autobuyers.derivativeBuyables) {
    for (let i = 1; i < 9; i++) {
      while(Derivatives.buyables.canAfford(i)) Derivatives.buyables.buy(i)
    }
  }
  
  // SET SACRIFICE/DISTRIBUTE
  if(BasicHypercompUpgrades.has(1)) {
    if(player.integration.autobuyers.setSacrifice) {
      for (let i = 1; i < (NumberSets[6].unlocked() ? 7 : 6); i++) {
        NumberSets.sacrifice(i,player.integration.autobuyers.numberSetAutoModes[1])
      }
    }
    if(player.integration.autobuyers.distributeSets) {
      NumberSets.distribute(player.integration.autobuyers.numberSetAutoModes[0])
    }
  }

  // PYTHAGOREAN TRIPLES BUYABLES
  if(player.integration.autobuyers.pythTriplesBuyables) {
    for (let i = 1; i < 5; i++) {
      if (i == 1 && player.pythTriples.essence.gte(PythagoreanTriples.buyables[1].cost())) {
        let a = new Decimal(3).log10()
        let b = new Decimal(3000).log10()
        let c = new Decimal(5).sub(player.pythTriples.essence.max(1).log10())
        player.pythTriples.buyables[1] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
      } else if (i == 2 && player.pythTriples.essence.gte(PythagoreanTriples.buyables[2].cost())) {
        let a = new Decimal(2.5).log10()
        let b = new Decimal(1000).log10()
        let c = new Decimal(5000000).log10().sub(player.pythTriples.essence.max(1).log10())
        player.pythTriples.buyables[2] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
      } else if (i == 3 && player.pythTriples.essence.gte(PythagoreanTriples.buyables[3].cost())) {
        let a = new Decimal(1.75).log10()
        let b = new Decimal(40).log10()
        let c = new Decimal(20).sub(player.pythTriples.essence.max(1).log10())
        player.pythTriples.buyables[3] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
      } else if (i == 4 && player.pythTriples.essence.gte(PythagoreanTriples.buyables[4].cost())) {
        let a = new Decimal(2).log10()
        let b = new Decimal(3)
        let c = new Decimal(6).sub(player.pythTriples.essence.max(1).log10())
        player.pythTriples.buyables[4] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
      }
    }
  }
}

function buyMax() {
  if(player.autobuyers[1] && player.autobuyers[2] && player.autobuyers[3] && player.autobuyers[4] && player.autobuyers[5] && player.autobuyers[6] && player.autobuyers[7] && player.autobuyers[8] && !hasSecretAchievement(12)) {
    player.secretAchievements.push('12')
    $.notify("Secret Achievement Unlocked: You Don't Need That", {
      style: 'apcurrent',
      className:'secretAchieves',
    });
  }
  
  // VARIABLES
  if(player.integration.autobuyers.w && player.z.gte(wCost())) while(player.z.gte(wCost())) buyVariable('w')
  if(player.challenge != 10 && player.compChallenge != 5 && player.y.gte(zCost()) && !player.inLostIntegration) {
    let a = new Decimal(10).div(player.yChallenge == 6 ? 1 : zDivision())
    let b = new Decimal(101).div(player.yChallenge == 6 ? 1 : zDivision())
    let c = new Decimal(2222).div(player.yChallenge == 6 ? 1 : zDivision()).sub(player.y.max(1))
    player.z = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
  }
  if(player.points.gte(yCost()) && player.challenge != 10 && !player.inLostIntegration){
    if(player.compChallenge == 3) {
      player.y = player.x.add(1).root(4).div(100).mul(hasQU(18)?(hasChargedQU(18)?10:1.1):1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff()).mul(NumberSets.effect(1,4))))).floor().add(player.x.gte(100)?1:0)
    } else if (player.yChallenge == 6) {
      player.y = player.x.add(1).div(100).max(1).log(1.25).floor().add(player.x.gte(100)?1:0)
    } else {
      player.y = player.x.add(1).div(100).mul(hasQU(18)?(hasChargedQU(18)?10:1.1):1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff()).mul(NumberSets.effect(1,4))))).floor().add(player.x.gte(100)?1:0)
    }
  }
  if(player.points.gte(xCost()) && player.challenge != 10 && !player.inLostIntegration){
    if(player.compChallenge == 3) {
      player.x = player.points.root(10).div(100000).mul(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).floor()
    } else if (player.yChallenge == 6) {
      player.x = player.points.div(100000).max(1).log(1.11).floor()
    } else {
      if(hasQU(8)){     
 player.x = player.points.div(100000).mul(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).floor()
} else{
const priceMult = new Decimal(0.11).div(xDivision()).add(1)
const basePrice = new Decimal(100000).div(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).div(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ?1000000:1).div(hasChallenge(5)?1e9:1).pow(player.compChallenge == 3 ? 10 : 1)
let trueNum = player.points.div(basePrice)
let Xsum = priceMult.pow(player.x).sub(1).div(priceMult.sub(1))
let trueSum = Xsum.add(trueNum)
player.x = trueSum.times(priceMult.sub(1)).add(1).log10().div(priceMult.log10()).floor()
player.points = trueSum.sub(priceMult.pow(player.x).sub(1).div(priceMult.sub(1))).mul(basePrice)
}
    }
  }

  if(player.y.gte(zCost()) && player.compChallenge != 5 && player.inLostIntegration && hasYQU(4,'lost')) {
    let prev = player.abc[3]
    player.abc[3] = player.y.div(70000).max(1).log(Decimal.div(1.2,FractalArm.hasUpgrade(163) ? FractalArm[16][3].eff() : 1)).add(1).floor()
    player.z = player.z.add(player.abc[3].sub(prev))
  }
  if(player.x.gte(yCost()) && player.compChallenge != 5 && player.inLostIntegration) {
    let prev = player.abc[2]
    player.abc[2] = player.x.pow(player.compChallenge == 3 ? 0.25 : 1).div(100).mul(hasQU(22) ? 1000000 : 1).max(1).log(yCostScalingLI()).add(1).floor()
    player.y = player.y.add(player.abc[2].sub(prev))
  }
  if(player.points.gte(xCost()) && player.compChallenge != 5 && player.inLostIntegration) {
    let prev = player.abc[1]
    player.abc[1] = player.points.pow(player.challenge == 12 || player.challenge == 16 ? 0.5 : 1).pow(player.compChallenge == 3 ? 0.1 : 1).div(100000).mul(hasUpgrade(3) ? 2 : 1).mul(hasQU(4) ? ResetTable[4].eff() : 1).mul(hasUpgrade(5) ? 1e6 : 1).max(1).log(xCostScalingLI())
    if(!hasComplexMilestoneLI(10)) player.points = player.points.sub(xCost())
    player.abc[1] = player.abc[1].add(1).floor()
    player.x = player.x.add(player.abc[1].sub(prev))
  }
  if(hasUpgrade(4) && player.abc[1].gte(GeneratorMultiplier.cost()) && player.inLostIntegration) {
    if(player.abc[1].gte(GeneratorMultiplier.superscalingStart())) {
      player.buyables[4] = player.abc[1].div(GeneratorMultiplier.superscalingStart()).root(1.25).mul(GeneratorMultiplier.superscalingStart()).sub(50).div(hasQU(9) ? 4 : 5).add(1).floor()
    } else {
      player.buyables[4] = player.abc[1].sub(50).div(hasQU(9) ? 4 : 5).add(1).floor()
    }
  }
  
  // FUNCTIONS
  if(player.points.gte(BUYABLES[6].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8 && !player.inLostIntegration){
    player.buyables[6] = player.points.div(100000000).max(1).log(functionCostScaling(3)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[6].cost())
    player.buyables[6] = player.buyables[6].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[5].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8 && !player.inLostIntegration){
    player.buyables[5] = player.points.div(30000000).max(1).log(functionCostScaling(2)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[5].cost())
    player.buyables[5] = player.buyables[5].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[4].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8 && !player.inLostIntegration){
    player.buyables[4] = player.points.div(5000000).max(1).log(functionCostScaling(1)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[4].cost())
    player.buyables[4] = player.buyables[4].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // BUILDINGS
  if(!hasQU(8) && !player.inLostIntegration) {
    for (let i = 3; i > 0; i--) {
      let j = 0
      while (player.points.gte(BUYABLES[i].cost()) && j < 1000) {
        buyBuyable(i)
        j++
      }
    }
  } else {
    if(player.points.gte(BUYABLES[3].cost()) && player.challenge != 10 && player.compChallenge != 8 && player.inLostIntegration && hasCU(0,1)){
      player.buyables[5] = player.buyables[5].add(Decimal.affordGeometricSeries(player.points,1000000,buildingCostScaling(),player.buyables[5])).sub(1)
      if(!hasComplexMilestoneLI(10)) player.points = player.points.sub(BUYABLES[7].cost())
      player.buyables[5] = player.buyables[5].add(1)
    }
    if(player.points.gte(BUYABLES[3].cost()) && player.challenge != 10 && player.compChallenge != 8){
      if(!player.inLostIntegration) player.buyables[3] = player.points.div(15000).max(1).log(buildingCostScaling()).floor()
      if(player.inLostIntegration) player.buyables[3] = player.buyables[3].add(Decimal.affordGeometricSeries(player.points,15000,buildingCostScaling(),player.buyables[3])).sub(1)
      if((!hasQU(8) && !player.inLostIntegration) || (player.inLostIntegration && !hasComplexMilestoneLI(10))) player.points = player.points.sub(BUYABLES[3].cost())
      player.buyables[3] = player.buyables[3].add(1)
      player.chalExponents[0] = new Decimal(0)
    }
    if(player.points.gte(BUYABLES[2].cost()) && player.challenge != 10 && player.compChallenge != 8){
      if(!player.inLostIntegration) player.buyables[2] = player.points.div(200).max(1).log(buildingCostScaling()).floor()
      if(player.inLostIntegration) player.buyables[2] = player.buyables[2].add(Decimal.affordGeometricSeries(player.points,200,buildingCostScaling(),player.buyables[2])).sub(1)
      if((!hasQU(8) && !player.inLostIntegration) || (player.inLostIntegration && !hasComplexMilestoneLI(10))) player.points = player.points.sub(BUYABLES[2].cost())
      player.buyables[2] = player.buyables[2].add(1)
      player.chalExponents[0] = new Decimal(0)
    }
    if(player.points.gte(BUYABLES[1].cost()) && player.challenge != 10 && player.compChallenge != 8){
      if(!player.inLostIntegration) player.buyables[1] = player.points.div(25).max(1).log(buildingCostScaling()).floor()
      if(player.inLostIntegration) player.buyables[1] = player.buyables[1].add(Decimal.affordGeometricSeries(player.points,25,buildingCostScaling(),player.buyables[1])).sub(1)
      if((!hasQU(8) && !player.inLostIntegration) || (player.inLostIntegration && !hasComplexMilestoneLI(10))) player.points = player.points.sub(BUYABLES[1].cost())
      player.buyables[1] = player.buyables[1].add(1)
      player.chalExponents[0] = new Decimal(0)
    }
  }
}

function produceBuildings(diff) {
  player.buyables[7] = player.buyables[7].add(player.buyables[2].add(player.buyables[8]).mul(slopeEffect()).mul(polyGrowthMults()).pow(player.inLostIntegration ? ComplexChallengesLI[2].eff() : 1).pow(player.inLostIntegration ? YChallengesLI[1].eff() : 1).mul(diff))
  player.buyables[8] = player.buyables[8].add(player.buyables[3].add(player.buyables[9]).mul(slopeEffect()).mul(polyGrowthMults()).pow(player.inLostIntegration ? ComplexChallengesLI[2].eff() : 1).pow(player.inLostIntegration ? YChallengesLI[1].eff() : 1).mul(diff))
  if(hasSU(7) || (player.inLostIntegration && !hasCU(0,1))) player.buyables[9] = player.buyables[9].add(player.buyables[1].mul(slopeEffect()).mul(polyGrowthMults()).pow(player.inLostIntegration ? ComplexChallengesLI[2].eff() : 1).pow(player.inLostIntegration ? YChallengesLI[1].eff() : 1).mul(diff))
  if(player.inLostIntegration && hasCU(0,1)) {
    player.buyables[6] = player.buyables[6].add(player.buyables[1].mul(slopeEffect()).mul(polyGrowthMults()).pow(player.inLostIntegration ? ComplexChallengesLI[2].eff() : 1).pow(player.inLostIntegration ? YChallengesLI[1].eff() : 1).mul(diff))
    player.buyables[9] = player.buyables[9].add(player.buyables[6].mul(slopeEffect()).mul(polyGrowthMults()).pow(player.inLostIntegration ? ComplexChallengesLI[2].eff() : 1).pow(player.inLostIntegration ? YChallengesLI[1].eff() : 1).mul(diff))
  }
}

function updatePercent() {
  let buildings = BUYABLES[1].eff().add(BUYABLES[2].eff()).add(BUYABLES[3].eff()).add(player.inLostIntegration ? BUYABLES[7].eff() : 0)
  
  if(buildings.gt(0)) tmp.buildingPercent=[null,BUYABLES[1].eff().div(buildings).times(100),BUYABLES[2].eff().div(buildings).times(100),BUYABLES[3].eff().div(buildings).times(100),new Decimal(player.inLostIntegration ? BUYABLES[7].eff() : 0).div(buildings).times(100)]
  else if(!player.inLostIntegration || !hasCU(0,1)) tmp.buildingPercent=[null,33.33,33.33,33.33,0]
  else tmp.buildingPercent=[null,25,25,25,25]
}

function updateExps(diff) {
  player.chalExponents[0] = player.chalExponents[0].add(new Decimal(1).div(15).mul(diff)).min(1)
  player.chalExponents[1] = player.chalExponents[1].sub(new Decimal(0.04).mul(diff)).max(0)
  player.chalExponents[2] = new Decimal((Math.sin(player.prestigeTimes[2] / 2) / 30) * (player.inLostIntegration ? player.x2 : player.slope).add(1).ln().add(1).ln().add(1).toNumber()).min(1)
}

function updateValues() {
  // Auto-Quadratic
  if(!player.inLostIntegration) {
    player.inputValue = document.getElementById("quadAuto").value
  }
  if(player.inLostIntegration && player.currentTab == 'quad') {
    player.inputValue = document.getElementById("quadAuto2").value
  }
  
  // Root Epicenter Slider
  if(player.currentTab == "quad" && player.currentSubtab[0] == "sroot" && document.getElementById("epicSlider") != player.epicenterLevel && !changedESdisplay){
    if(document.getElementById("epicSlider")) document.getElementById("epicSlider").value = player.epicenterLevel
    changedESdisplay = true
  }
  if(player.currentTab != "quad" || player.currentSubtab[0] != "sroot") changedESdisplay = false
  if(changedESdisplay && document.getElementById("epicSlider")) player.epicenterLevel = document.getElementById("epicSlider").value
  
  // Auto-Complex
  if(!player.inLostIntegration) {
    player.inputValue2 = document.getElementById("compAuto").value
  }
  if(player.inLostIntegration && player.currentTab == 'comp') {
    player.inputValue2 = document.getElementById("compAuto2").value
  }
  
  // Best Points in Square Root
  if(player.points.gte(player.bestPointsInSqrt) && player.inSqrt) player.bestPointsInSqrt = player.points
  
  // Coordinate Plane Sacrifice Selector
  if(document.getElementById("sacrificeSelect"))document.getElementById("sacrificeSelect").value = player.sacrifice.toUpperCase()
  
  // Y-Quadratic Autobuyer
  if(!player.inLostIntegration) {
    player.inputValue3 = document.getElementById("yquadAuto").value
  }
  if(player.inLostIntegration && player.currentTab == 'yquad') {
    player.inputValue3 = document.getElementById("yquadAuto2").value
  }
  
  // Automation Core Script
  if(player.currentTab == 'integration' && player.currentSubtab[6] == 'autocore' && document.getElementById("automationCore")?.value == "" && player.integration.automationCore.script == ""){
    changedACdisplay = false
  }
  if(!changedACdisplay && player.currentTab == 'integration' && player.currentSubtab[6] == 'autocore'){
    changedACdisplay = true
    if(document.getElementById("automationCore"))document.getElementById("automationCore").value = player.integration.automationCore.script
  }
  if(player.integrations.gte(15) && document.getElementById("automationCore") && player.currentTab == 'integration' && player.currentSubtab[6] == 'autocore'){
    player.integration.automationCore.script = document.getElementById("automationCore").value
  }
  
  // Auto-Integration
  player.inputValue4 = player.inLostIntegration ? document.getElementById("integAuto2").value : document.getElementById("integAuto").value
  
  // Auto-Sinusoidal
  player.inputValue5 = document.getElementById("sinAuto").value
  
  // Convergence Goal
  if(!player.integration.inTheLimit) player.integration.convergenceGoal = document.getElementById("convergenceGoal").value
  
  // Best Points in Synthetic Division
  if(player.points.gte(player.bestPointsInSynthDiv) && player.inSynthDiv) player.bestPointsInSynthDiv = player.points
  
  // SE Multiplier Polynomial Buyable Counter
  if(IntegrationUpgrades.se1.isBought() && player.polynomials.buyables[4].gte(player.integration.seBuyableCounter)) {
    player.synthEssence = player.synthEssence.mul(Decimal.pow(1.5,player.polynomials.buyables[4].sub(player.integration.seBuyableCounter)))
    player.integration.seBuyableCounter = player.polynomials.buyables[4]
  }
  
  // Synthetic Division Upgrade 1 Counter
  if(IntegrationUpgrades.se2.isBought() && player.synthDivUpgs[0][1].gte(player.integration.sdu1Counter) && !BasicHypercompUpgrades.has(6)) {
    player.synthEssence = player.synthEssence.mul(Decimal.pow(IntegrationUpgrades.se3.isBought()?3:2,player.synthDivUpgs[0][1].sub(player.integration.sdu1Counter)))
    player.integration.sdu1Counter = player.synthDivUpgs[0][1]
  }

  // Automation Core Inputs
  let auto = player.integration.automationCore.inputs
  auto.startCCSweepReq = document.getElementById("startCCSweepReq").value
  auto.synthDivIReq1 = document.getElementById("synthDivIReq1").value
  auto.synthDivSEReq1 = document.getElementById("synthDivSEReq1").value
  auto.synthDivIReq2 = document.getElementById("synthDivIReq2").value
  auto.synthDivSEReq2 = document.getElementById("synthDivSEReq2").value
  auto.grindQuadraticsReq = document.getElementById("grindQuadraticsReq").value
}

function updateModal() {
  if(ccTiers() >= 20 && !player.zUnlocked && !tmp.dialogShown[0]) {
    document.getElementById("zUnlockHintModal").showModal()
    tmp.dialogShown[0] = true
  }
  if(player.options[1] && player.options[17] && !player.inLostIntegration && (!player.gameWon || tmp.keptGoing) && (new Decimal(offline.points).gt(0) || new Decimal(offline.totalx2).gte(1) || new Decimal(offline.totali).gte(1) || new Decimal(offline.integration.dx).gt(0)) && !tmp.dialogShown[1]) {
    document.getElementById("offlineProgressModal").showModal()
    tmp.dialogShown[1] = true
  }
  if(IntegrationUpgrades.complex11.isBought() && !player.wUnlocked && !tmp.dialogShown[2]) {
    document.getElementById("wUnlockHintModal").showModal()
    tmp.dialogShown[2] = true
  }
}

function updateUnlocks() {
  if(IntegrationUpgrades.vsr.isBought() && player.varSynth.unlocked[0] && player.varSynth.unlocked.includes(false)) {
    player.varSynth.unlocked = [true,true,true,true]
  }
  if(IntegrationUpgrades.exr.isBought() && hasMilestone(14)) {
    for (let i = 1; i < 4; i++) {
      if(!player.transformations.extrusions.includes(i)) player.transformations.extrusions.push(i)
    }
  }
  if(IntegrationUpgrades.cxu.isBought() && player.varSynth.unlocked[0] && (player.varSynth.totalxy.lt(8) || player.varSynth.chargedXUpgs.length < 8)) {
    if(player.options[21]) {
      for (let i = 1; i < 9; i++) {
        if(!player.xUpgs.includes(i)) player.xUpgs.push(i)
        if(!player.varSynth.chargedXUpgs.includes(i)) player.varSynth.chargedXUpgs.push(i)
      }
    }
      player.varSynth.xy = player.varSynth.totalxy.sub(player.varSynth.chargedXUpgs.length)
      if(!player.integration.autobuyers.xy) player.varSynth.totalxy = new Decimal(8)
  }
  if(IntegrationUpgrades.ymu.isBought() && player.varSynth.unlocked.includes(false) && player.yChalsUnlocked.includes(false)) {
    player.varSynth.unlocked = [true,true,true,true]
    player.yChalsUnlocked = [null,true,true,true,true]
  }
  if(IntegrationUpgrades.sdu.isBought() && (player.polynomials[6].bought.gte(1) || IntegrationUpgrades.sdr.isBought())) {
    for (let i = 4; i < 10; i++) {
      if(!player.synthDivUpgs[1].includes(i)) player.synthDivUpgs[1].push(i)
    }
  }
  if(IntegrationUpgrades.aip.isBought() && (player.polynomials[6].bought.gte(1) || IntegrationUpgrades.sdr.isBought())) {
    if(!player.synthDivUpgs[1].includes(11)) buySDU(11)
  }
  if(IntegrationUpgrades.sse.isBought() && player.synthEssence.eq(0)) {
    player.synthEssence = new Decimal(1000)
  }
  if(player.buyables[1].gte(1) || player.buyables[2].gte(1) || player.buyables[3].gte(1)) player.integration.buildingsBought = true
}

function fixUnixEpoch() {
  if(player.prestigeTimes[0] >= 1639872000) player.prestigeTimes[0] = player.timePlayed
  if(player.prestigeTimes[2] >= 1639872000) player.prestigeTimes[2] = player.timePlayed
  if(player.speedrunTimer >= 1639872000) player.speedrunTimer = 0
}

function trappedInSqrt() {
  if((player.compChallenge == 5 || player.yChallenge == 4 || player.integration.challenge == 2) && !player.inLostIntegration) {
    player.inSqrt = true;
    player.epicenterLevel = player.compChallenge == 0 ? 5 : Math.min(player.compChalCompletions[5]+1,5).toString();
    if(player.integration.chalCompletions[2] >= 2 && player.integration.challenge == 2) player.epicenterLevel = 1
  }
  if(player.compChallenge == 5 && player.inLostIntegration) {
    player.inSqrt = true;
    player.challenge = 16;
  }
}

function checkForEndgame() {
  if(!player.inLostIntegration) {
    player.gameWon = false
    player.viewedEndingCutscene = false
  }
  if (player.viewedEndingCutscene && !player.gameWon) {
    player.gameWon = true
    player.winTime = (player.speedrunMode ? player.speedrunTimer : player.timePlayed)
  } else if (!player.viewedEndingCutscene) {
    player.gameWon = false;
  }
}

function modifiedReality() {
  if (player.zUnlocked) {
    if(!player.polynomials[10].boughtThisRun) document.title = "Algebraic Progression " + tmp.versionNumber
    document.getElementById("favicon").setAttribute("href","https://cdn.glitch.global/f11707a7-4c2e-4e11-b957-162b8f56f334/logo2.png?v=1743469008828");
    tmp.textbook.names[9] = "Coordinate Realm (v1.1)"
    setTimeout(() => {
      if(!player.inLostIntegration) {
        if(!player.varSynth.unlocked[0] && player.options[14] && player.integrations.lt(1)) document.title = "Hasn't it always been there?";
        if(player.varSynth.unlocked[0] && !player.yChalsUnlocked[1] && player.options[14] && player.integrations.lt(1)) document.title = "The variables grow more distant";
        if(player.yChalsUnlocked[1] && ccTiers() < 50 && player.options[14] && player.integrations.lt(1)) document.title = "Why are you still trying?";
        if((player.polynomials[6].bought.gte(1) || IntegrationUpgrades.sdr.isBought()) && !player.polynomials[10].boughtThisRun && player.options[14] && player.integrations.lt(1)) document.title = "I hope you're happy";
      }
    }, Math.random()*100);
  } else {
    document.title = "Algebraic Progression " + tmp.versionNumber
    document.getElementById("favicon").setAttribute("href","https://cdn.glitch.global/f11707a7-4c2e-4e11-b957-162b8f56f334/logo1.png?v=1743469004406");
    tmp.textbook.names[9] = "Coordinate Plane (v1.1)"
  }
  
  if(player.yQuadratics.lt(1) && player.integrations.lt(1)) player.prestigeTimes[4] = player.timePlayed
}

function compChalDetection() {
  if(player.quadratics.gt(new Decimal(20).sub(player.compChalCompletions[4]*5).max(0)) && player.compChallenge == 4 && !player.inLostIntegration) {
    goComplex(true);
    if(!hasAchievement(41)) {
        player.achievements.push('41')
        $.notify("Achievement Unlocked: Not Following Directions", {
          style: 'apcurrent',
          className:'achieves',
        });
      }
  }
}

function updateComplexSubtab() {
  if(player.options[26]) {
    if(player.currentSubtab[1] == "alterations") player.currentSubtab[1] = "milestones"
    if(player.currentSubtab[1] == "hcupgrades") player.currentSubtab[1] = "upgrades"
    if(player.currentSubtab[1] == "flune") player.currentSubtab[1] = "cplane"
  } else {
    if(player.currentSubtab[1] == "milestones" && player.wUnlocked) player.currentSubtab[1] = "alterations"
    if(player.currentSubtab[1] == "upgrades" && Alterations.has(2)) player.currentSubtab[1] = "hcupgrades"
    if(player.currentSubtab[1] == "cplane" && BasicHypercompUpgrades.has(6)) player.currentSubtab[1] = "flune"
  }
}

function showAllTabs() {
  if(!tmp.allTabsShown && !player.viewedEndingCutscene) {
    for(let i = 1; i < 11; i++) {
      player.tabDisplays[i] = true
    }
    tmp.allTabsShown = true
  }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function averagePrestigeStats(x) {
  let gain = new Decimal(0)
  let time = new Decimal(0)
  let gameTime = new Decimal(0)
  let gainOverTime = new Decimal(0)
  for (let i = 0; i < 10; i++) {
    gain = gain.add(player.last10runs[x][i].gain)
    time = time.add(player.last10runs[x][i].time)
    gameTime = gameTime.add(player.last10runs[x][i].gameTime)
    gainOverTime = gainOverTime.add(player.last10runs[x][i].gain.div(player.last10runs[x][i].time))
  }
  gain = gain.div(10)
  time = time.div(10)
  gameTime = gameTime.div(10)
  gainOverTime = gainOverTime.div(10)
  return {gain:gain,time:time,gameTime:gameTime,gainOverTime:gainOverTime}
}

function challengeHeaderDisplay() {
  let arr = [] // list of the challenges you are currently in
  
  if(player.inSqrt) arr.push(0) // square root has id 0
  if(player.challenge != 0 && player.challenge < 11) arr.push(player.challenge) // challenges have ids 1-10
  if(player.compChallenge != 0) arr.push(10 + player.compChallenge) // CCs have ids 11-20
  if(player.yChallenge != 0) arr.push(20 + player.yChallenge) // YCs have ids 21-26
  if(player.inSynthDiv) arr.push(27) // synthetic division has id 27
  if(player.integration.inTheLimit) arr.push(28) // the limit has id 28
  if(player.integration.challenge != 0 && player.integration.challenge < 8) arr.push(28 + player.integration.challenge) // ICs have ids 29-35
  if(player.challenge != 0 && player.challenge > 10) arr.push(25 + player.challenge) // RTEs have ids 36-41
  if(player.integration.challenge != 0 && player.integration.challenge > 8) arr.push(33 + player.integration.challenge) // MCs have ids 42-46
  
  if(arr.length == 0) return (player.inLostIntegration ? "the Lost Integration" : "the Standard Equation") // default case for if you are not in a challenge
  
  let str = "" // defines display string
  
  // goes through each challenge id and converts it to its display name
  for (let i in arr) {
    if(arr[i] == 0) {
      if(str === "") str += "Square Root"
      else str += " + Square Root"
    } else if (arr[i] > 0 && arr[i] < 11) {
      if(str === "") str += "Challenge " + arr[i]
      else str += " + Challenge " + arr[i]
    } else if (arr[i] > 10 && arr[i] < 21) {
      if(str === "") str += "Complex Challenge " + (arr[i] == 20 && player.inLostIntegration ? 8 : (arr[i]-10))
      else str += " + Complex Challenge " + (arr[i] == 20 && player.inLostIntegration ? 8 : (arr[i]-10))
    } else if (arr[i] > 20 && arr[i] < 27) {
      if(str === "") str += (player.inLostIntegration ? "Y Challenge " : "Y-Challenge ") + (arr[i]-20)
      else str += (player.inLostIntegration ? " + Y Challenge " : " + Y-Challenge ") + (arr[i]-20)
    } else if (arr[i] == 27) {
      if(str === "") str += "Synthetic Division"
      else str += " + Synthetic Division"
    } else if (arr[i] == 28) {
      if(str === "") str += "The Limit"
      else str += " + The Limit"
    } else if (arr[i] > 28 && arr[i] < 36) {
      if(str === "") str += "Integration Challenge " + (arr[i]-28)
      else str += " + Integration Challenge " + (arr[i]-28)
    } else if (arr[i] > 36 && arr[i] < 42) {
      if(str === "") str += "Root Epicenter Task " + (arr[i] == 41 ? -1 : (arr[i]-35))
      else str += " + Root Epicenter Task " + (arr[i] == 41 ? -1 : (arr[i]-35))
    } else if (arr[i] > 41 && arr[i] < 47) {
      if(str === "") str += "Mandelbrot Challenge " + (arr[i]-41)
      else str += " + Mandelbrot Challenge " + (arr[i]-41)
    }
  }
  
  return str
}

function exitChallengeDisplay() {
  let min = Infinity // updated to challenge w/ smallest id
  
  if(player.integration.challenge != 0 && player.integration.challenge > 8) min = 33 + player.integration.challenge // MCs have ids 42-46
  if(player.challenge != 0 && player.challenge > 10) min = 25 + player.challenge // RTEs have ids 36-41
  if(player.integration.challenge != 0 && player.integration.challenge < 8) min = 28 + player.integration.challenge // ICs have ids 29-35
  if(player.integration.inTheLimit) min = 28 // the limit has id 28
  if(player.inSynthDiv && player.integration.challenge != 2) min = 27 // synthetic division has id 27
  if(player.yChallenge != 0) min = 20 + player.yChallenge // YCs have ids 21-26
  if(player.compChallenge != 0 && player.integration.challenge != 1) min = 10 + player.compChallenge // CCs have ids 11-20
  if(player.challenge != 0 && player.challenge < 11 && player.integration.challenge != 1) min = player.challenge // challenges have ids 1-10
  if(player.inSqrt && player.compChallenge != 5 && player.integration.challenge != 2 && player.challenge < 11) min = 0 // square root has id 0
  
  let str = "" // defines display string
  if(min == 0) {
    str = "Exit Square Root"
  } else if (min > 35 && min < 42) {
    str = canCompleteChallengeDisplay() + " Root Epicenter Task"
  } else if (((min > 0 && min < 27) || min > 28) || player.integration.challenge == 7) {
    str = canCompleteChallengeDisplay() + " Challenge"
  } else if (min == 27) {
    str = "Exit Synthetic Division"
  } else if (min == 28 && player.integration.challenge != 7) {
    str = "Exit The Limit"
  }

  return str
}

function canCompleteChallengeDisplay() {
  let min = Infinity // updated to challenge w/ smallest id
  
  if(player.integration.challenge != 0 && player.integration.challenge > 8) min = 33 + player.integration.challenge // MCs have ids 42-46
  if(player.challenge != 0 && player.challenge > 10) min = 25 + player.challenge // RTEs have ids 36-41
  if(player.integration.challenge != 0 && player.integration.challenge < 8) min = 28 + player.integration.challenge // ICs have ids 29-35
  if(player.yChallenge != 0) min = 20 + player.yChallenge // YCs have ids 21-26
  if(player.compChallenge != 0 && player.integration.challenge != 1) min = 10 + player.compChallenge // CCs have ids 11-20
  if(player.challenge != 0 && player.challenge < 11 && player.integration.challenge != 1) min = player.challenge // challenges have ids 1-10

  let str = "" // defines display string
  if(min > 0 && min < 11) {
    return player.points.gte(CHALLENGES[player.challenge].goal) && !hasChallenge(player.challenge) ? "Complete" : "Exit"
  } else if (min > 10 && min < 21) {
    if(!player.inLostIntegration) return player.x2.gte(COMP_CHALLENGES[player.compChallenge].goals[player.compChalCompletions[player.compChallenge]]) ? "Complete" : "Exit"
    if(player.inLostIntegration) return player.x2.gte(ComplexChallengesLI[player.compChallenge].goals[player.compChallenge]) ? "Complete" : "Exit"
  } else if (min == 29) {
    return player.i.gte(IntegrationChallenges[1].goal(player.compChallenge)) && !player.integration.chalCompletions[1].includes(player.challenge + (player.compChallenge * 10)) ? "Complete" : "Exit"
  } else if (min == 31) {
    return player.i.gte(IntegrationChallenges[3].goals[player.integration.chalCompletions[3]]) ? "Complete" : "Exit"
  } else if (min == 32) {
    return player.y2.gte(IntegrationChallenges[4].goals[player.integration.chalCompletions[4]]) ? "Complete" : "Exit"
  } else if (min == 34) {
    return player.i.gte(IntegrationChallenges[6].goals[player.integration.ic6Version]) && !player.integration.chalCompletions[6].includes(player.integration.ic6Version) ? "Complete" : "Exit"
  } else if (min > 35 && min < 42) {
    return player.epicenterLevel > 0 && player.points.gte(RootEpicenterLI.goals[player.epicenterLevel]) && !hasChallenge(player.epicenterLevel + 10) ? "Complete" : "Exit"
  } else {
    return "Exit"
  }
}

function generalExitChallenge() {
  let min = Infinity // updated to challenge w/ smallest id
  
  if(player.integration.challenge != 0 && player.integration.challenge > 8) min = 33 + player.integration.challenge // MCs have ids 42-46
  if(player.challenge != 0 && player.challenge > 10) min = 25 + player.challenge // RTEs have ids 36-41
  if(player.integration.challenge != 0 && player.integration.challenge < 8) min = 28 + player.integration.challenge // ICs have ids 29-35
  if(player.integration.inTheLimit) min = 28 // the limit has id 28
  if(player.inSynthDiv && player.integration.challenge != 2) min = 27 // synthetic division has id 27
  if(player.yChallenge != 0) min = 20 + player.yChallenge // YCs have ids 21-26
  if(player.compChallenge != 0 && player.integration.challenge != 1) min = 10 + player.compChallenge // CCs have ids 11-20
  if(player.challenge != 0 && player.challenge < 11 && player.integration.challenge != 1) min = player.challenge // challenges have ids 1-10
  if(player.inSqrt && player.compChallenge != 5 && player.integration.challenge != 2 && player.challenge < 11) min = 0 // square root has id 0
  
  // depending on minimum id, exit the lowest tier challenge
  if(min == 0) {
    if(!player.inLostIntegration) enterSqrt()
    if(player.inLostIntegration) SquareRootLI.enterSqrt()
    return
  } else if (min > 0 && min < 11) {
    startChallenge(min)
    return
  } else if (min > 10 && min < 21) {
    if(!player.inLostIntegration) interactWithCC(min - 10)
    if(player.inLostIntegration) ComplexChallengesLI.interactWithCC(min - 10)
    return
  } else if (min > 20 && min < 27) {
    if(!player.inLostIntegration) interactWithYC(min - 20)
    if(player.inLostIntegration) YChallengesLI.interactWithYC(min - 20)
    return
  } else if (min == 27) {
    enterSynthDiv()
    return
  } else if (min == 28) {
    Limit.enter()
    return
  } else if (min > 28 && min < 36) {
    IntegrationChallenges.start(min - 28)
    return
  } else if (min > 35 && min < 42) {
    SquareRootLI.enterSqrt()
    return
  } else if (min > 41) {
    MandelbrotChallenges.interactWithMC(min - 41)
    return
  }
}

document.addEventListener("keydown", function onEvent(event) {

  switch (event.key) {
    case "1":
      if(player.options[2]) buyBuyable(1)
      break;
    case "2":
      if(player.options[2]) buyBuyable(2)
      break;
    case "3":
      if(player.options[2]) buyBuyable(3)
      break;
    case "4":
      if(player.options[2] && hasUpgrade(4) && !player.inLostIntegration) buyBuyable(4)
      if(player.options[2] && hasCU(0,1) && player.inLostIntegration) buyBuyable(7)
      break;
    case "5":
      if(player.options[2] && hasUpgrade(4) && !player.inLostIntegration) buyBuyable(5)
      break;
    case "6":
      if(player.options[2] && hasUpgrade(4) && !player.inLostIntegration) buyBuyable(6)
      break;
    case "g":
      if(player.options[2] && hasUpgrade(4) && player.inLostIntegration) GeneratorMultiplier.buy()
      break;
    case "x":
      if(player.options[2]) buyVariable('x')
      break;
    case "y":
      if(player.options[2]) buyVariable('y')
      break;
    case "z":
      if(player.options[2]) buyVariable('z')
      if(player.options[2] && !player.zUnlocked && !hasSecretAchievement(9)) {
        player.secretAchievements.push('9')
        $.notify("Secret Achievement Unlocked: Illegal Hotkey", {
          style: 'apcurrent',
          className:'secretAchieves',
        });
      }
      break;
    case "w":
      if(player.options[2] && IntegrationUpgrades.complex11.isBought()) buyVariable('w')
      if(player.options[2] && player.zUnlocked && !player.wUnlocked && !hasSecretAchievement(9)) {
        player.secretAchievements.push('9')
        $.notify("Secret Achievement Unlocked: Illegal Hotkey", {
          style: 'apcurrent',
          className:'secretAchieves',
        });
      }
      break;
    case "v":
      if(player.options[2] && player.wUnlocked && !hasSecretAchievement(9)) {
        player.secretAchievements.push('9')
        $.notify("Secret Achievement Unlocked: Illegal Hotkey", {
          style: 'apcurrent',
          className:'secretAchieves',
        });
      }
      break;
    case "m":
      if(player.options[2] && (player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1)) && player.yChallenge != 4) buyMax()
      break;
    case "q":
      if(player.options[2] && (!player.inSqrt || player.compChallenge == 5) && !player.inLostIntegration) goQuadratic(false)
      break;
    case "r":
      if(player.options[2] && player.inLostIntegration) ResetPrestige.reset(false)
      break;
    case "s":
      if(player.options[2] && hasQU(16) && !player.inLostIntegration) enterSqrt()
      if(player.options[2] && hasQU(16) && player.inLostIntegration) SquareRootLI.enterSqrt()
      break;
    case "b":
      if(player.options[2] && hasUpgrade(8) && !player.inLostIntegration) buyB()
      break;
    case "c":
      if(player.options[2] && !player.inLostIntegration) goComplex(false)
      if(player.options[2] && player.inLostIntegration) ComplexPrestigeLI.goComplex(false)
      break;
    case "u":
      if(player.options[2] && !player.inLostIntegration) goYQuadratic(false)
      if(player.options[2] && player.inLostIntegration) YQuadraticPrestigeLI.goYQuadratic(false)
      break;
    case "E":
      if(player.options[2]) exportSave()
      break;
    case "S":
      if(player.options[2]) save(localStorage.getItem("APSaveMetaData"))
      break;
    case "d":
      if(player.options[2] && (player.polynomials[6].bought.gte(1) || IntegrationUpgrades.sdr.isBought()) && !player.inLostIntegration) enterSynthDiv()
      break;
    case "p":
      if(player.options[2] && (ccTiers() >= 50 || IntegrationUpgrades.mil2.isBought())) buyMaxPolynomials()
      break;
    case "i":
      if(player.options[2] && !player.inLostIntegration) IntegrationPrestige.integrate(false)
      if(player.options[2] && player.inLostIntegration) Minibrots.buyRiemannSphere()
      break;
    case "l":
      if(player.options[2] && IntegrationUpgrades.integration6.isBought()) Limit.enter()
      break;
    case "t":
      if(player.options[2] && player.integration.temporalPlane.unlocked) toggleOption(18)
    break
    case "n":
      if(player.options[2] && player.integration.challenge == 0) SinusoidalPrestige.goSinusoidal(false)
    break
    case "f":
      if(player.options[2] && IntegrationUpgrades.polynomials4.isBought()) factorPolynomials()
      if(player.options[2] && player.inLostIntegration) MandelbrotPrestige.enterMandelbrot(false)
    break
    case "ArrowLeft":
      if(player.options[2] && document.activeElement.tagName != 'INPUT') {
        tabNames = tabArray()
        s = player.currentTab;
        for (let i = 0; i < tabNames.length; i++) {
          if(s === tabNames[i]) {
            s = i - 1;
          }
        }
        if(s < 0) {
          s = tabNames.length - 1
        }
        tab(tabNames[s])
      }
      break;
    case "ArrowRight":
      if(player.options[2] && document.activeElement.tagName != 'INPUT') {
        tabNames = tabArray()
        s = player.currentTab;
        for (let i = 0; i < tabNames.length; i++) {
          if(s === tabNames[i]) {
            s = i + 1;
          }
        }
        if(s > tabNames.length - 1) {
          s = 0
        }
        tab(tabNames[s])
      }
      break;
    case "ArrowUp":
      if(player.options[2] && document.activeElement.tagName != 'INPUT') {
        subtabNames = subtabArray()
        s = player.currentSubtab[subtabIndex()];
        for (let i = 0; i < subtabNames[subtabIndex()].length; i++) {
          if(s === subtabNames[subtabIndex()][i]) {
            s = i - 1;
          }
        }
        if(s === player.currentSubtab[subtabIndex()]) return
        if(s < 0) {
          s = subtabNames[subtabIndex()].length - 1
        }
        player.currentSubtab[subtabIndex()] = subtabNames[subtabIndex()][s]
      }
      break;
    case "ArrowDown":
      if(player.options[2] && document.activeElement.tagName != 'INPUT') {
        subtabNames = subtabArray()
        s = player.currentSubtab[subtabIndex()];
        for (let i = 0; i < subtabNames[subtabIndex()].length; i++) {
          if(s === subtabNames[subtabIndex()][i]) {
            s = i + 1;
          }
        }
        if(s === player.currentSubtab[subtabIndex()]) return
        if(s > subtabNames[subtabIndex()].length - 1) {
          s = 0
        }
        player.currentSubtab[subtabIndex()] = subtabNames[subtabIndex()][s]
      }
      break;
  }
  if(event.key == 'Shift') {
    tmp.shiftToggleBehavior = true
  }
  if(event.altKey && !player.inLostIntegration) {
    switch (event.key) {
      case "1":
        if(player.options[2] && hasQU(5)) player.autobuyers[1] = !player.autobuyers[1]
      break;
      case "2":
        if(player.options[2] && hasQU(5)) player.autobuyers[2] = !player.autobuyers[2]
      break;
      case "3":
        if(player.options[2] && hasQU(5)) player.autobuyers[3] = !player.autobuyers[3]
      break;
      case "4":
        if(player.options[2] && hasQU(9)) player.autobuyers[4] = !player.autobuyers[4]
      break;
      case "5":
        if(player.options[2] && hasQU(9)) player.autobuyers[5] = !player.autobuyers[5]
      break;
      case "6":
        if(player.options[2] && hasQU(9)) player.autobuyers[6] = !player.autobuyers[6]
      break;
      case "x":
        if(player.options[2] && hasQU(6)) player.autobuyers[7] = !player.autobuyers[7]
      break;
      case "y":
        if(player.options[2] && hasQU(10)) player.autobuyers[8] = !player.autobuyers[8]
      break;
      case "z":
        if(player.options[2] && hasYQU(2,'bought')) player.autobuyers[11] = !player.autobuyers[11]
      break;
      case "w":
        if(player.options[2] && Alterations.has(2)) player.integration.autobuyers.w = !player.integration.autobuyers.w
      break;
      case "q":
        if(player.options[2] && hasQU(14)) player.autobuyers[9] = !player.autobuyers[9]
      break;
      case "b":
        if(player.options[2] && hasMilestone(8)) player.compAutobuyers[4] = !player.compAutobuyers[4]
      break;
      case "c":
        if(player.options[2] && hasMilestone(12)) player.compAutobuyers[7] = !player.compAutobuyers[7]
      break;
      case "u":
        if(player.options[2] && hasYQU(12,'bought')) player.compAutobuyers[12] = !player.compAutobuyers[12]
      break;
      case "i":
        if(player.options[2] && IntegrationUpgrades.integration1.isBought()) player.integration.autobuyers.integration = !player.integration.autobuyers.integration
      break;
      case "n":
        if(player.options[2] && SinusoidalUpgrades.has(9)) player.integration.autobuyers.sinusoidal = !player.integration.autobuyers.sinusoidal
      break;
      case "f":
        if(player.options[2] && SinusoidalUpgrades.has(13)) pplayer.integration.autobuyers.polyFactoring = !player.integration.autobuyers.polyFactoring
      break;
    }
  }
});

document.addEventListener("keyup", function onEvent(event) {

  if(event.key == 'Shift') {
    tmp.shiftToggleBehavior = false
  }

});

function tabArray() {
  let arr = [];
  if(player.tabDisplays[1]) arr.push("gen")
  if(player.tabDisplays[2]) arr.push("options") // trolling
  if(player.tabDisplays[3] && subtabArray()[2].length > 0) arr.push("stats")
  if(player.tabDisplays[4] && subtabArray()[4].length > 0) arr.push("achs")
  if(player.tabDisplays[5]) arr.push("tbook")
  if((player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.totalGP.gte(1)) && player.tabDisplays[6]) arr.push("upgs")
  if(hasQU(10) && player.tabDisplays[10] && player.inLostIntegration) arr.push("automation")
  if((player.totalx2.gte(1) || player.totali.gte(1)) && player.tabDisplays[7] && subtabArray()[0].length > 0) arr.push("quad")
  if(player.totaly2.gte(1) && player.tabDisplays[8] && subtabArray()[3].length > 0) arr.push("yquad")
  if(player.totali.gte(1) && player.tabDisplays[9] && subtabArray()[1].length > 0) arr.push("comp")
  if(ccTiers() >= 50 && player.tabDisplays[10] && !player.inLostIntegration && subtabArray()[5].length > 0) arr.push("polynomials")
  if(player.integrations.gte(1) && player.tabDisplays[11] && subtabArray()[6].length > 0) arr.push("integration")
  if(player.sinusoidals.gte(1) && player.tabDisplays[12] && subtabArray()[7].length > 0) arr.push("sinusoidal")
  return arr
}

function subtabArray() {
  let arr = [[],[],[],[],[],[],[],[]];

  if(player.subtabDisplays[0][0]) arr[0].push("upgrades")
  if(hasQU(12) && player.subtabDisplays[0][1] && !player.inLostIntegration) arr[0].push("cplane")
  if(hasQU(16) && player.subtabDisplays[0][2] && !player.inLostIntegration) arr[0].push("sroot")
  if(hasSU(12) && player.subtabDisplays[0][3] && !player.inLostIntegration) arr[0].push("chals")
  if(hasQU(20) && player.subtabDisplays[0][4] && !player.inLostIntegration) arr[0].push("formula")

  if(hasQU(5) && player.subtabDisplays[0][1] && player.inLostIntegration) arr[0].push("cplane")
  if(hasQU(15) && player.subtabDisplays[0][2] && player.inLostIntegration) arr[0].push("sroot")
  if(hasQU(23) && player.subtabDisplays[0][3] && player.inLostIntegration) arr[0].push("expcurve")

  if(!player.inLostIntegration) {
    if((!player.wUnlocked || player.options[26]) && player.subtabDisplays[1][0]) arr[1].push("milestones")
    if(player.wUnlocked && !player.options[26] && player.subtabDisplays[1][0]) arr[1].push("alterations")
    if((!Alterations.has(2) || player.options[26]) && player.subtabDisplays[1][1]) arr[1].push("upgrades")
    if(Alterations.has(2) && !player.options[26] && player.subtabDisplays[1][1]) arr[1].push("hcupgrades")
    if(hasMilestone(12) && (!BasicHypercompUpgrades.has(6) || player.options[26]) && player.subtabDisplays[1][2]) arr[1].push("cplane")
    if(BasicHypercompUpgrades.has(6) && !player.options[26] && player.subtabDisplays[1][2]) arr[1].push("flune")
    if(hasCU(1,6) && player.subtabDisplays[1][3]) arr[1].push("challenges")
    if(hasYQU(8,'bought') && player.subtabDisplays[1][4]) arr[1].push("zlab")
  }

  if(player.inLostIntegration) {
    if(player.subtabDisplays[1][0]) arr[1].push("milestones")
    if(player.subtabDisplays[1][1]) arr[1].push("upgrades")
    if(hasComplexMilestoneLI(11) && player.subtabDisplays[1][2]) arr[1].push("cplane")
    if(hasCU(1,6) && player.subtabDisplays[1][3]) arr[1].push("challenges")
    if(hasYQU(8,'lost') && player.subtabDisplays[1][4]) arr[1].push("zlab")
    if(ccTiers() >= 24 && player.subtabDisplays[1][5]) arr[1].push("xpowers")
  }

  if(player.subtabDisplays[2][0]) arr[2].push("stats")
  if((player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1)) && player.subtabDisplays[2][1]) arr[2].push("tenruns")
  if((hasSU(12) || player.totali.gte(1) || player.integrations.gte(1)) && player.subtabDisplays[2][2] && !player.inLostIntegration) arr[2].push("chalrecords")
  if(player.speedrunMode && player.subtabDisplays[2][3]) arr[2].push("speedrun")

  if(!player.inLostIntegration) {
    if(player.subtabDisplays[3][0]) arr[3].push("upgrades")
    if(player.subtabDisplays[3][1]) arr[3].push("varsynth")
    if(player.subtabDisplays[3][2]) arr[3].push("challenges")
    if(player.unitCircle.unlocked && player.subtabDisplays[3][3]) arr[3].push("polynomials")
  }

  if(player.inLostIntegration) {
    if(player.subtabDisplays[3][0]) arr[3].push("upgrades")
    if(hasYQU(16,'lost') && player.subtabDisplays[3][1]) arr[3].push("challenges")
    if(FractalMilestones.has(12) && player.subtabDisplays[3][2]) arr[3].push("ypowers")
  }

  if(player.subtabDisplays[4][0]) arr[4].push("regular")
  if(player.subtabDisplays[4][1]) arr[4].push("secret")
  if(player.subtabDisplays[4][2]) arr[4].push("daily")
  
  if(player.subtabDisplays[5][0]) arr[5].push("main")
  if(player.subtabDisplays[5][1]) arr[5].push("division")
  
  if(!player.inLostIntegration) {
    if(player.subtabDisplays[6][0]) arr[6].push("sets")
    if(player.subtabDisplays[6][1]) arr[6].push("upgrades")
    if(player.subtabDisplays[6][2]) arr[6].push("tplane")
    if(player.subtabDisplays[6][3]) arr[6].push("autocore")
    if(IntegrationUpgrades.integration4.isBought() && player.subtabDisplays[6][4]) arr[6].push("limit")
    if(IntegrationUpgrades.ic1.isBought() && player.subtabDisplays[6][5]) arr[6].push("challenges")
    if(player.integration.chalCompletions[3] >= 10 && player.subtabDisplays[6][6]) arr[6].push("derivatives")
  }

  if(player.inLostIntegration) {
    if(player.subtabDisplays[6][0]) arr[6].push("milestones")
    if(player.subtabDisplays[6][1]) arr[6].push("generators")
    if(player.subtabDisplays[6][2]) arr[6].push("fractalarm")
    if(player.quaternions[1].gte(150) && player.subtabDisplays[6][3]) arr[6].push("minibrots")
    if(player.quaternions[1].gte(750) && player.subtabDisplays[6][4]) arr[6].push("challenges")
  }

  if(player.subtabDisplays[7][0]) arr[7].push("functions")
  if(player.subtabDisplays[7][1]) arr[7].push("upgrades")
  if(player.integration.chalCompletions[3] >= 10 && player.subtabDisplays[7][2]) arr[7].push("circle")
  if(player.integration.chalCompletions[4] >= 1 && player.subtabDisplays[7][3]) arr[7].push("triples")
  return arr
}

function subtabIndex() {
  if(player.currentTab == "quad") {
    return 0
  } else if (player.currentTab == "comp") {
    return 1
  } else if (player.currentTab == "stats") {
    return 2
  } else if (player.currentTab == "yquad") {
    return 3
  } else if (player.currentTab == "achs") {
    return 4
  } else if (player.currentTab == "polynomials") {
    return 5
  } else if (player.currentTab == "integration") {
    return 6
  } else if (player.currentTab == "sinusoidal") {
    return 7
  } else {
    return -1
  }
}

// for ending cutscene
function predictableRandom(x) {
  let start = Math.pow(x % 97, 4.3) * 232344573;
  const a = 15485863;
  const b = 521791;
  start = (start * a) % b;
  for (let i = 0; i < (x * x) % 90 + 90; i++) {
    start = (start * a) % b;
  }
  return start / b;
}

function randomSymbol() {
  return String.fromCharCode(Math.floor(Math.random() * 50) + 192);
}

  // increasing the frac makes the word more glitched
  function randomCrossWords(str, frac = 0.7) {
    if (frac <= 0) return str;
    const x = str.split("");
    for (let i = 0; i < x.length * frac; i++) {
      const randomIndex = Math.floor(predictableRandom(Math.floor(Date.now() / 5000) % 964372 + 1.618 * i) * x.length);
      x[randomIndex] = randomSymbol();
    }
    return x.join("");
  }
  // combining 2 strings based on param
  function blendWords(first, second, param) {
    if (param <= 0) return first;
    if (param >= 1) return second;
    return first.substring(0, first.length * (1 - param)) +
      second.substring(second.length * (1 - param), second.length);
  }
  // transition from original tab name to ending tab name
  function glitchedTabName(first, second, param, tabNum) {
    if(Date.now() >= tmp.savedGlitches[tabNum+10]+200) {
      let str = randomCrossWords(blendWords(first, second, (param > 0.9999 ? 1 : param)),param >= 0.5 ? 1 - (((param > 0.9999 ? 1 : param) - 0.5) * 2) : (param > 0.9999 ? 1 : param) * 2)
      tmp.savedGlitches[tabNum] = str
      tmp.savedGlitches[tabNum+10] = Date.now()
      return str
    } else {
      return tmp.savedGlitches[tabNum]
    }
  }

function cueEndingCutscene() {
  player.options[16] = false
  showAllTabs()
  setTimeout(()=>{player.tabDisplays[11] = false; if(player.currentTab == "integration") player.currentTab = "comp"}, 2000)
  setTimeout(()=>{player.tabDisplays[9] = false; if(player.currentTab == "comp") player.currentTab = "yquad"}, 2500)
  setTimeout(()=>{player.tabDisplays[8] = false; if(player.currentTab == "yquad") player.currentTab = "quad"}, 3000)
  setTimeout(()=>{player.tabDisplays[7] = false; if(player.currentTab == "quad") player.currentTab = "automation"}, 3500)
  setTimeout(()=>{player.tabDisplays[10] = false; if(player.currentTab == "automation") player.currentTab = "upgs"}, 4000)
  setTimeout(()=>{player.tabDisplays[6] = false; if(player.currentTab == "upgs") player.currentTab = "tbook"}, 4500)
  setTimeout(()=>{player.tabDisplays[5] = false; if(player.currentTab == "tbook") player.currentTab = "achs"}, 5000)
  setTimeout(()=>{player.tabDisplays[4] = false; if(player.currentTab == "achs") player.currentTab = "stats"}, 5750)
  setTimeout(()=>{player.tabDisplays[3] = false; if(player.currentTab == "stats") player.currentTab = "gen"}, 7250)
  setTimeout(()=>{document.body.classList.add("disappearingbody")},9500)
  setTimeout(()=>{document.body.classList.remove("disappearingbody"); player.viewedEndingCutscene = true; tmp.allTabsShown = false},17500)
}