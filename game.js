var tmp = {
  text: "",
  letters: [null,"a","b","c"],
  epicslider: 1,
  compPlaneVars: [null,"x","y","x<sup>2</sup>","z"],
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
    names: [null,"Preface","Terminology","Hotkeys","Buildings (v1.0)","Variables (v1.0)","Upgrades (v1.0)","Functions (v1.0)","Quadratic (v1.1)","Coordinate Plane (v1.1)","Square Root (v1.2)","Challenges (v1.3)","Quadratic Formula (v1.4)","Root Epicenter (v1.4)","Complex (v2.0)","Milestones (v2.0)","Complex Upgrades (v2.0)","Complex Plane (v2.0)","Complex Challenges (v2.1)","Y-Quadratic (v2.2)","Z Lab (v2.2)","Variable Synthesizer (v2.2)","Y-Challenges (v2.2)","Polynomials (v2.3)","Synthetic Division (v2.3)"],
    expands: [null,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
  clicks: 0,
  themeSwitches: 0,
  hovers: [null,false,false,false,false,false,false,false,false],
  circleText: [null,"Multiplying Imaginary Power generation","Multiplying Z-Power gain","Delaying the 2nd CE softcap start","Multiplying i exponent generation","Multiplying circles gain"],
  circleMilestones: [null,new Decimal(0),new Decimal(1000),new Decimal(1e5),new Decimal(2e6),new Decimal(1e8)],
  savedGlitches: [null,"","","","","","","","","","",0,0,0,0,0,0,0,0,0,0],
  allTabsShown: false,
  dialogShown: [false,false],
  
  triggeredEndingCutscene: false,
  keptGoing: false,
};

function clickButton() {
  player.points = player.points.add(1)
  tmp.clicks++
}

function pps() { // points per second
  let pps = new Decimal(0);
  pps = pps.add(BUYABLES[1].eff()).add(BUYABLES[2].eff()).add(BUYABLES[3].eff())
  pps = pps.min("1e5e8")
  return pps;
}

function tab(x) {
  player.currentTab = x;
}

function xCost() {
  if(player.compChallenge == 5)return new Decimal(Infinity)
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

function yCost() {
  return player.compChallenge == 5 ? new Decimal(Infinity) : new Decimal(100).div(hasQU(18)?1.1:1).div(hasChallenge(8)?5:1).mul(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff()))).pow(player.y)).pow(player.compChallenge == 3 ? 4 : 1).floor()
}

function zCost() {
  return player.compChallenge == 5 ? new Decimal(Infinity) : new Decimal(2222).add(new Decimal(111).add(player.z.sub(1).mul(10)).mul(player.z)).div(hasChargedUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 1.2 : 1).div(hasZlabMilestone(4,5) ? 1.5 : 1).floor()
}

function xyCost(x) {
  if(player.varSynth.totalxy.gte(8)) {
    return new Decimal(Infinity)
  }
  if(x == 1) {
    return new Decimal(1.8e8).mul(Decimal.pow(1.4,player.varSynth.totalxy))
  } else {
    return new Decimal(9500).mul(Decimal.pow(1.18,player.varSynth.totalxy))
  }
}

function buyVariable(x) {
  switch (x) {
    case "x":
      if (player.points.gte(xCost()) && (player.purchases > 0 || (player.challenge != 10 && player.compChallenge != 8))){
        if(!hasQU(8)) player.points = player.points.sub(xCost())
        player.x = player.x.add(1)
        if(player.compChallenge != 8) player.purchases -= 1
      }
      break;
    case "y":
      if (player.x.gte(yCost()) && (player.purchases > 0 || (player.challenge != 10 && player.compChallenge != 8))){
        player.y = player.y.add(1)
        if(player.compChallenge != 8) player.purchases -= 1
      }
      break;
    case "z":
      if (player.y.gte(zCost()) && (player.purchases > 0 || (player.challenge != 10 && player.compChallenge != 8))){
        player.z = player.z.add(1)
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
  player.options[x] = !player.options[x]
}

function notationDisplay(x) {
  let arr = ["Scientific","Engineering","Logarithm","Mixed","Hexadecimal","Blind"]
  return arr[x-1]
}

var changedQAdisplay = false
var changedESdisplay = false
var changedCAdisplay = false
var changedYQAdisplay = false
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
  if(!player.options[9])diff = document.hidden?0:Math.min(diff,0.075)
  player.lastTick = Date.now()
  
  // UPDATE TIMES
  player.timePlayed = (Date.now() - player.startingTime) / 1000;
  player.prestigeTimes[0] = player.prestigeTimes[0] += diff;
  player.prestigeTimes[2] = player.prestigeTimes[2] += diff;
  if(player.yQuadratics.gte(1)) player.prestigeTimes[4] = player.prestigeTimes[4] += diff;
  if(player.speedrunMode && !player.speedrunData[17][1]) player.speedrunTimer = player.speedrunTimer += diff;
  
  // PRODUCE STUFF
  if(((player.challenge != 8 && player.compChallenge != 8) || isPrime(player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).add(player.buyables[4]).add(player.buyables[5]).add(player.buyables[6]))) && (player.compChallenge != 6 || player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).lt(player.buyables[4].add(player.buyables[5]).add(player.buyables[6])))) player.points = player.points.add(pps().times(diff));
  if(((player.challenge != 8 && player.compChallenge != 8) || isPrime(player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).add(player.buyables[4]).add(player.buyables[5]).add(player.buyables[6]))) && (player.compChallenge != 6 || player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).lt(player.buyables[4].add(player.buyables[5]).add(player.buyables[6])))) player.totalPoints = player.totalPoints.add(pps().times(diff));
  player.slope = player.slope.add(sacEffect('x2').mul(diff))
  player.quadPower = player.quadPower.add(qpGen().mul(diff))
  if(hasZlabMilestone(1,3)) player.imagPower = player.imagPower.add(ipGen().mul(diff))
  for (let i = 1; i <= (player.varSynth.unlocked[3] ? 4 : 3); i++) {
    player.compPlane[1][i] = player.compPlane[1][i].add(compPlaneGen(i).mul(diff))
  }
  player.antiSlope = player.antiSlope.add(new Decimal(1).add(player.antiSlope.pow(1.05)).mul(diff).min(player.totalPoints.pow(player.prestigeTimes[2])))
  if(hasYQU(8,'bought')) player.zlab.zpower = player.zlab.zpower.add(zpowerGen().mul(diff))
  for (let i = 1; i <= 4; i++) {
    if(player.zlab.charged == i) {
      player.zlab.particles[i] = player.zlab.particles[i].add(player.zlab.zpower.sqrt().mul(diff))
    }
  }
  if(hasMilestone(18) && quadFormula().gte(1) && player.options[12]) {
    player.x2 = player.x2.add(quadFormula().div(100).mul(diff))
    player.totalx2 = player.totalx2.add(quadFormula().div(100).mul(diff))
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
  if((player.yChallenge == 1 || hasSDU(8)) && player.x.gte(Y_CHALLENGES[1].goal())) player.yChalCompletions[1] = player.x.sub(4.5e8).div(1e7).add(1).floor()
  if((player.yChallenge == 2 || hasSDU(8)) && player.x.gte(Y_CHALLENGES[2].goal())) player.yChalCompletions[2] = player.x.sub(5.1e8).div(1e7).add(1).floor()
  if((player.yChallenge == 3 || hasSDU(8)) && player.x.gte(Y_CHALLENGES[3].goal())) player.yChalCompletions[3] = player.x.sub(1.1e9).div(5e7).add(1).floor()
  if(player.yChallenge == 4 && player.x.gte(Y_CHALLENGES[4].goal())) player.yChalCompletions[4] = player.x.sub(4e8).div(2.5e7).add(1).floor()
  
  player.points = player.points.min("1e5e8")
  player.totalPoints = player.totalPoints.min("1e5e8")
  
  // (mostly) UPDATE FUNCTIONS
  updateAuto() //runs the autobuyers
  if(hasUpgrade(6)) produceBuildings(diff) //makes buildings produce other buildings
  updatePercent() //updates the building production percentages
  updateExps(diff) //updates the Challenge exponents
  updateNotifs() //detects various accomplishments you've made and sends notifications for them
  updateValues() //makes sure that the values for input elements throughout the game don't reset
  updateRootEpicenter() //disables slider when in Square Root and detects Level 4 and -1 completion
  if(ccTiers() >= 50) updatePolynomials(diff) //makes polynomials produce other polynomials
  if(location.href != "https://galaxy.click/play/19" && location.href != "https://galaxy.click/play/19/") updateModal() //shows modals when requirements are met
  fixUnixEpoch() //fixes the bug where Quadratic and Complex times jump a Unix Epoch
  trappedInSqrt() //traps the player in Square Root when in Complex Challenge 5 or Y-Challenge 4
  if(hasMilestone(15)) simulateEssence(1) //passively generates RE
  if(hasMilestone(16)) simulateEssence(4) //passively generates CE
  checkForEndgame() //detects if the player has viewed the ending cutscene
  modifiedReality() //hasn't it always been there?
  compChalDetection() //checks if you failed CC4
  showAllTabs() //disables tab hiding after unlocking Synthetic Division
  
  if(player.polynomials[10].boughtThisRun) document.title = "The End"
  
  setTimeout(()=>{if(player.points.gte("1e5e8")  && !isNaN(player.points) && !tmp.triggeredEndingCutscene && !player.viewedEndingCutscene) {
    tmp.triggeredEndingCutscene = true
    cueEndingCutscene()
  }},1000)
  
  if(isNaN(player.points)) {
    exportAsFile()
    alert("WARNING: NaN Detected! Your save file has been exported (unless your browser has blocked file downloads). Try clearing the local storage of the game and importing the exported save. If that doesn't work, try and find a save in the AP save banks on the Discord server. Sorry for the inconvenience :(")
  }
  requestAnimationFrame(mainLoop)
}

requestAnimationFrame(mainLoop)

function updateAuto() {
  // VARIABLES
  if(player.autobuyers[11] && player.challenge != 10 && player.compChallenge != 5) {
    while(player.y.gte(zCost())) buyVariable("z")
  }
  if(player.autobuyers[8] && player.x.gte(yCost()) && player.challenge != 10 && player.compChallenge != 5){
    if(player.compChallenge == 3) {
      player.y = player.x.add(1).root(4).div(100).mul(hasQU(18)?1.1:1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff())))).floor().add(player.x.gte(100)?1:0)
    } else {
      player.y = player.x.add(1).div(100).mul(hasQU(18)?1.1:1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff())))).floor().add(player.x.gte(100)?1:0)
    }
  }
  if(player.autobuyers[7] && player.points.gte(xCost()) && player.challenge != 10 && player.compChallenge != 5){
    if(player.compChallenge == 3) {
      player.x = player.points.root(10).div(100000).mul(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).floor()
    } else if (player.challenge == 5 || player.compChallenge == 8) {
      buyVariable("x");
    } else {
      player.x = player.points.div(100000).mul(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).floor()
    }
    if(!hasQU(8)) player.points = player.points.sub(xCost())
    player.x = player.x.add(1)
  }
  
  // FUNCTIONS
  if(player.autobuyers[6] && player.points.gte(BUYABLES[6].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[6] = player.points.div(100000000).max(1).log(functionCostScaling(3)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[6].cost())
    player.buyables[6] = player.buyables[6].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[5] && player.points.gte(BUYABLES[5].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[5] = player.points.div(30000000).max(1).log(functionCostScaling(2)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[5].cost())
    player.buyables[5] = player.buyables[5].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[4] && player.points.gte(BUYABLES[4].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[4] = player.points.div(5000000).max(1).log(functionCostScaling(1)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[4].cost())
    player.buyables[4] = player.buyables[4].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // BUILDINGS
  if(player.autobuyers[3] && player.points.gte(BUYABLES[3].cost()) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[3] = player.points.div(15000).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[3].cost())
    player.buyables[3] = player.buyables[3].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[2] && player.points.gte(BUYABLES[2].cost()) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[2] = player.points.div(200).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[2].cost())
    player.buyables[2] = player.buyables[2].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[1] && player.points.gte(BUYABLES[1].cost()) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[1] = player.points.div(25).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[1].cost())
    player.buyables[1] = player.buyables[1].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // QUADRATIC
  if(player.autobuyers[9] && (!player.inSqrt || player.compChallenge == 5) && player.challenge == 0){
    if(player.compAutobuyers[2] == 1 && quadFormula().gte(player.inputValue)) goQuadratic(false)
    if(player.compAutobuyers[2] == 2 && player.prestigeTimes[0] >= player.inputValue) goQuadratic(false)
    if(player.compAutobuyers[2] == 3 && quadFormula().gte(player.x2.mul(player.inputValue))) goQuadratic(false)
  }
  
  // COMPLEX
  if(player.compAutobuyers[7]) {
    if(!player.compAutobuyers[10] && compFormula().gte(player.inputValue2)) goComplex(false)
    if(player.compAutobuyers[10] && player.prestigeTimes[2] >= player.inputValue2) goComplex(false)
  }
  
  // Y-QUADRATIC
  if(player.compAutobuyers[12] && yQuadFormula().gte(player.inputValue3)) {
    goYQuadratic(false)
  }
  
  // SACRIFICE
  if(player.autobuyers[10]){
    sacrifice('x')
    sacrifice('y')
    if(hasQU(19)) sacrifice('x<sup>2</sup>')
    if(hasYQU(2,'bought')) sacrifice('z')
  }
  
  // DOUBLERS
  if(player.compAutobuyers[1] && hasQU(16)){
    if(player.complexes.lt(20)) {
      while(player.x2.gte(doublerCost())) buyDoubler()
    } else {
      if(player.x2.lt(hasZlabMilestone(4,1)?"1e500":"1e300") && player.x2.gte(doublerCost)) {
        player.doublers = player.x2.max(1).log10().sub(9).floor().add(1)
      } else if(player.x2.gte(doublerCost)) {
        let a = new Decimal(1.1).log10()
        let b = Decimal.sub(1,Decimal.mul(hasZlabMilestone(4,1)?980:580,a))
        let c = Decimal.add(9,a.mul(Decimal.pow(hasZlabMilestone(4,1)?490:290,2))).sub(player.x2.max(1).log10())
        player.doublers = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).sqrt()).div(a.mul(2)).add(1).floor()
      }
    }
  }
  if(player.compAutobuyers[3]){
    if(player.complexes.lt(20)) {
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
      player.quadBuyables[i] = b.mul(-1).add(Decimal.pow(b,2).sub(Decimal.mul(4,a.mul(c))).max(0).sqrt()).div(a.mul(2)).add(1).floor().max(0).min(i == 1 ? (hasZlabMilestone(3,2) ? 5 : 4) : Infinity)
    }
  }
  
  // AUTO-ADJUST
  if(player.compAutobuyers[6] && hasQU(20)) {
    player.abc[1] = maxABC()
    player.abc[2] = maxABC()
    if(!player.compAutobuyers[11]) player.abc[3] = maxABC().div(4).floor()
    if(player.compAutobuyers[11]) player.abc[3] = maxABC()
  }
  
  // COMPLEX PLANE CURRENCIES
  if(player.compAutobuyers[8][0]) {
    if(player.compPlane[0][1].lt(1000)) {
      while(player.i.gte(compPlaneBuyCosts(1))) buyCplaneVar(1)
    } else {
      player.compPlane[0][1] = player.i.div(100000).max(1).log(1.5).add(1).floor()
    }
  }
  if(player.compAutobuyers[8][1]) {
    if(player.compPlane[0][2].lt(1000)) {
      while(player.i.gte(compPlaneBuyCosts(2))) buyCplaneVar(2)
    } else {
      player.compPlane[0][2] = player.i.div(1e8).max(1).log(1.75).add(1).floor()
    }
  }
  if(player.compAutobuyers[8][2]) {
    if(player.compPlane[0][3].lt(1000)) {
      while(player.i.gte(compPlaneBuyCosts(3))) buyCplaneVar(3)
    } else {
      player.compPlane[0][3] = player.i.div(1e18).max(1).log(2).add(1).floor()
    }
  }
  if(player.compAutobuyers[8][3]) {
    while(player.i.gte(compPlaneBuyCosts(4))) buyCplaneVar(4)
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
      while(player.imagPower.gte(QP_BUYABLES[i+4].cost())) buyQPBuyable(i+4)
    }
  }
  
  // I TRIPLERS
  if(player.compAutobuyers[14]){
    if(player.triplers.lt(1000)) {
      while(player.compPlane[1][1].gte(triplerCost()) && player.compPlane[1][2].gte(triplerCost()) && player.compPlane[1][3].gte(triplerCost())) buyTripler()
    } else {
      if(player.compPlane[1][1].gte(triplerCost()) && player.compPlane[1][2].gte(triplerCost()) && player.compPlane[1][3].gte(triplerCost())) player.triplers = player.compPlane[1][3].div(10000).max(1).log(hasYQU(9,'bought') ? 25 : 50).add(1).floor()
    }
  }
  
  // REVOLUTION BUYABLES
  if(player.compAutobuyers[15]) {
    player.varSynth.iExpBuyables[1] = player.varSynth.revolutions.div(10).log(4).floor().add(1)
    player.varSynth.iExpBuyables[2] = player.varSynth.revolutions.div(100).log(3).floor().add(1)
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
  if(player.challenge != 10 && player.compChallenge != 5) {
    while(player.y.gte(zCost())) buyVariable("z")
  }
  if(player.points.gte(yCost()) && player.challenge != 10){
    if(player.compChallenge == 3) {
      player.y = player.x.add(1).root(4).div(100).mul(hasQU(18)?1.1:1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff())))).floor().add(player.x.gte(100)?1:0)
    } else {
      player.y = player.x.add(1).div(100).mul(hasQU(18)?1.1:1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x').mul(COMP_CHALLENGES[3].eff())))).floor().add(player.x.gte(100)?1:0)
    }
  }
  if(player.points.gte(xCost()) && player.challenge != 10){
    if(player.compChallenge == 3) {
      player.x = player.points.root(10).div(100000).mul(hasUpgrade(3) && player.challenge != 5 && player.compChallenge != 8 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 && player.compChallenge != 8 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).floor()
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
  
  // FUNCTIONS
  if(player.points.gte(BUYABLES[6].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[6] = player.points.div(100000000).max(1).log(functionCostScaling(3)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[6].cost())
    player.buyables[6] = player.buyables[6].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[5].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[5] = player.points.div(30000000).max(1).log(functionCostScaling(2)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[5].cost())
    player.buyables[5] = player.buyables[5].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[4].cost()) && hasUpgrade(4) && player.challenge != 10 && player.compChallenge != 8){
    player.buyables[4] = player.points.div(5000000).max(1).log(functionCostScaling(1)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[4].cost())
    player.buyables[4] = player.buyables[4].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // BUILDINGS
  if(!hasQU(8)) {
    for (let i = 3; i > 0; i--) {
      let j = 0
      while (player.points.gte(BUYABLES[i].cost()) && j < 1000) {
        buyBuyable(i)
        j++
      }
    }
  } else {
    if(player.points.gte(BUYABLES[3].cost()) && player.challenge != 10 && player.compChallenge != 8){
      player.buyables[3] = player.points.div(15000).max(1).log(buildingCostScaling()).floor()
      if(!hasQU(8)) player.points = player.points.sub(BUYABLES[3].cost())
      player.buyables[3] = player.buyables[3].add(1)
      player.chalExponents[0] = new Decimal(0)
    }
    if(player.points.gte(BUYABLES[2].cost()) && player.challenge != 10 && player.compChallenge != 8){
      player.buyables[2] = player.points.div(200).max(1).log(buildingCostScaling()).floor()
      if(!hasQU(8)) player.points = player.points.sub(BUYABLES[2].cost())
      player.buyables[2] = player.buyables[2].add(1)
      player.chalExponents[0] = new Decimal(0)
    }
    if(player.points.gte(BUYABLES[1].cost()) && player.challenge != 10 && player.compChallenge != 8){
      player.buyables[1] = player.points.div(25).max(1).log(buildingCostScaling()).floor()
      if(!hasQU(8)) player.points = player.points.sub(BUYABLES[1].cost())
      player.buyables[1] = player.buyables[1].add(1)
      player.chalExponents[0] = new Decimal(0)
    }
  }
}

function produceBuildings(diff) {
  player.buyables[7] = player.buyables[7].add(player.buyables[2].add(player.buyables[8]).mul(slopeEffect()).mul(polyGrowthMults()).mul(diff))
  player.buyables[8] = player.buyables[8].add(player.buyables[3].add(player.buyables[9]).mul(slopeEffect()).mul(polyGrowthMults()).mul(diff))
  if(hasSU(7)) player.buyables[9] = player.buyables[9].add(player.buyables[1].mul(slopeEffect()).mul(polyGrowthMults()).mul(diff))
}

function polyGrowthMults() {
  let poly = new Decimal(1)
  if(hasChallenge(1)) poly = poly.mul(CHALLENGES[1].effect())
  poly = poly.mul(QP_BUYABLES[6].eff())
  return poly
}

function updatePercent() {
  let buildings = BUYABLES[1].eff().add(BUYABLES[2].eff()).add(BUYABLES[3].eff())
  
  if(buildings.gt(0)) player.buildingPercent=[null,BUYABLES[1].eff().div(buildings).times(100),BUYABLES[2].eff().div(buildings).times(100),BUYABLES[3].eff().div(buildings).times(100)]
  else player.buildingPercent=[null,33.33,33.33,33.33]
}

function updateExps(diff) {
  player.chalExponents[0] = player.chalExponents[0].add(new Decimal(1).div(15).mul(diff)).min(1)
  player.chalExponents[1] = player.chalExponents[1].sub(new Decimal(0.04).mul(diff)).max(0)
  player.chalExponents[2] = new Decimal((Math.sin(player.prestigeTimes[2] / 2) / 30) * player.slope.add(1).ln().add(1).ln().add(1).toNumber())
}

function updateValues() {
  // Auto-Quadratic
  if(player.currentTab == 'quad' && document.getElementById("quadAuto")?.value == "" && player.inputValue != ""){
    changedQAdisplay = false
  }
  if(!changedQAdisplay && player.currentTab == 'quad'){
    changedQAdisplay = true
    if(document.getElementById("quadAuto"))document.getElementById("quadAuto").value = player.inputValue
  }
  if(player.quadUpgs.includes(14) && document.getElementById("quadAuto") && player.currentTab == 'quad'){
    player.inputValue = document.getElementById("quadAuto").value
  }
  
  // Root Epicenter Slider
  if(player.currentTab == "quad" && player.currentSubtab[0] == "sroot" && document.getElementById("epicSlider") != player.epicenterLevel && !changedESdisplay){
    if(document.getElementById("epicSlider")) document.getElementById("epicSlider").value = player.epicenterLevel
    changedESdisplay = true
  }
  if(player.currentTab != "quad" || player.currentSubtab[0] != "sroot") changedESdisplay = false
  if(changedESdisplay && document.getElementById("epicSlider")) player.epicenterLevel = document.getElementById("epicSlider").value
  
  // Auto-Complex
  if(player.currentTab == 'comp'&& document.getElementById("compAuto")?.value == "" && player.inputValue2 != ""){
    changedCAdisplay = false
  }
  if(!changedCAdisplay && player.currentTab == 'comp'){
    changedCAdisplay = true
    if(document.getElementById("compAuto"))document.getElementById("compAuto").value = player.inputValue2
  }
  if(hasMilestone(12) && document.getElementById("compAuto") && player.currentTab == 'comp'){
    player.inputValue2 = document.getElementById("compAuto").value
  }
  
  // Best Points in Square Root
  if(player.points.gte(player.bestPointsInSqrt) && player.inSqrt) player.bestPointsInSqrt = player.points
  
  // Coordinate Plane Sacrifice Selector
  if(document.getElementById("sacrificeSelect"))document.getElementById("sacrificeSelect").value = player.sacrifice.toUpperCase()
  
  // Y-Quadratic Autobuyer
  if(player.currentTab == 'yquad' && document.getElementById("yquadAuto")?.value == "" && player.inputValue3 != ""){
    changedYQAdisplay = false
  }
  if(!changedYQAdisplay && player.currentTab == 'yquad'){
    changedYQAdisplay = true
    if(document.getElementById("yquadAuto"))document.getElementById("yquadAuto").value = player.inputValue3
  }
  if(hasYQU(12,'bought') && document.getElementById("yquadAuto") && player.currentTab == 'yquad'){
    player.inputValue3 = document.getElementById("yquadAuto").value
  }
  
  // Best Points in Synthetic Division
  if(player.points.gte(player.bestPointsInSynthDiv) && player.inSynthDiv) player.bestPointsInSynthDiv = player.points
}

function updateModal() {
  if(ccTiers() >= 20 && !player.zUnlocked && !tmp.dialogShown[0]) {
    document.getElementById("zUnlockHintModal").showModal()
    tmp.dialogShown[0] = true
  }
  if(player.options[1] && player.options[17] && (!player.gameWon || tmp.keptGoing) && (new Decimal(offline.points).gt(0) || new Decimal(offline.totalx2).gte(1) || new Decimal(offline.totali).gte(1)) && !tmp.dialogShown[1]) {
    document.getElementById("offlineProgressModal").showModal()
    tmp.dialogShown[1] = true
  }
}

function fixUnixEpoch() {
  if(player.prestigeTimes[0] >= 1639872000) player.prestigeTimes[0] = player.timePlayed
  if(player.prestigeTimes[2] >= 1639872000) player.prestigeTimes[2] = player.timePlayed
  if(player.speedrunTimer >= 1639872000) player.speedrunTimer = 0
}

function trappedInSqrt() {
  if(player.compChallenge == 5 || player.yChallenge == 4) {
    player.inSqrt = true;
    player.epicenterLevel = player.compChallenge == 0 ? 5 : Math.min(player.compChalCompletions[5]+1,5).toString();
  }
}

function checkForEndgame() {
  if (player.viewedEndingCutscene && !player.gameWon) {
    player.gameWon = true
    player.winTime = (player.speedrunMode ? player.speedrunTimer : player.timePlayed)
  } else if (!player.viewedEndingCutscene) {
    player.gameWon = false;
  }
}

function modifiedReality() {
  if (player.zUnlocked) {
    if(!player.polynomials[10].boughtThisRun) document.title = "Algebraic Progression v2.3.3"
    document.getElementById("favicon").setAttribute("href","https://cdn.glitch.global/f11707a7-4c2e-4e11-b957-162b8f56f334/AP%20cZrrZnt.png?v=1676847726255");
    tmp.textbook.names[9] = "Coordinate Realm (v1.1)"
    setTimeout(() => {
      if(!player.varSynth.unlocked[0] && player.options[14]) document.title = "Hasn't it always been there?";
      if(player.varSynth.unlocked[0] && !player.yChalsUnlocked[1] && player.options[14]) document.title = "The variables grow more distant";
      if(player.yChalsUnlocked[1] && ccTiers() < 50 && player.options[14]) document.title = "Why are you still trying?";
      if(player.polynomials[6].bought.gte(1) && !player.polynomials[10].boughtThisRun && player.options[14]) document.title = "I hope you're happy";
    }, Math.random()*100);
  } else {
    document.getElementById("favicon").setAttribute("href","https://cdn.glitch.global/f11707a7-4c2e-4e11-b957-162b8f56f334/AP%20current.png?v=1658860107337");
    tmp.textbook.names[9] = "Coordinate Plane (v1.1)"
  }
  
  if(player.yQuadratics.lt(1)) player.prestigeTimes[4] = player.timePlayed
}

function compChalDetection() {
  if(player.quadratics.gt(new Decimal(20).sub(player.compChalCompletions[4]*5).max(0)) && player.compChallenge == 4) {
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

function showAllTabs() {
  if(!tmp.allTabsShown && player.polynomials[6].bought.gte(1) && !player.viewedEndingCutscene) {
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
      if(player.options[2] && hasUpgrade(4)) buyBuyable(4)
      break;
    case "5":
      if(player.options[2] && hasUpgrade(4)) buyBuyable(5)
      break;
    case "6":
      if(player.options[2] && hasUpgrade(4)) buyBuyable(6)
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
    case "m":
      if(player.options[2] && (player.totalx2.gte(1) || player.totali.gte(1))) buyMax()
      break;
    case "q":
      if(player.options[2] && (!player.inSqrt || player.compChallenge == 5)) goQuadratic(false)
      break;
    case "s":
      if(player.options[2] && hasQU(16)) enterSqrt()
      break;
    case "b":
      if(player.options[2] && hasUpgrade(8)) buyB()
      break;
    case "c":
      if(player.options[2]) goComplex(false)
      break;
    case "u":
      if(player.options[2]) goYQuadratic(false)
      break;
    case "w":
      if(player.options[2] && player.zUnlocked && !hasSecretAchievement(9)) {
        player.secretAchievements.push('9')
        $.notify("Secret Achievement Unlocked: Illegal Hotkey", {
          style: 'apcurrent',
          className:'secretAchieves',
        });
      }
      break;
    case "E":
      exportSave()
      break;
    case "S":
      save()
      break;
    case "d":
      if(player.polynomials[6].bought.gte(1)) enterSynthDiv()
      break;
    case "p":
      if(ccTiers() >= 50) buyMaxPolynomials()
      break;
    case "ArrowLeft":
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
      break;
    case "ArrowRight":
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
      break;
    case "ArrowUp":
      subtabNames = subtabArray()
      s = player.currentSubtab[subtabIndex()];
      for (let i = 0; i < subtabNames[subtabIndex()].length; i++) {
        if(s === subtabNames[subtabIndex()][i]) {
          s = i - 1;
        }
      }
      if(s < 0) {
        s = subtabNames[subtabIndex()].length - 1
      }
      player.currentSubtab[subtabIndex()] = subtabNames[subtabIndex()][s]
      break;
    case "ArrowDown":
      subtabNames = subtabArray()
      s = player.currentSubtab[subtabIndex()];
      for (let i = 0; i < subtabNames[subtabIndex()].length; i++) {
        if(s === subtabNames[subtabIndex()][i]) {
          s = i + 1;
        }
      }
      if(s > subtabNames[subtabIndex()].length - 1) {
        s = 0
      }
      player.currentSubtab[subtabIndex()] = subtabNames[subtabIndex()][s]
      break;
  }
});

function tabArray() {
  let arr = [];
  if(player.tabDisplays[1]) arr.push("gen")
  if(player.tabDisplays[2]) arr.push("options") // trolling
  if(player.tabDisplays[3]) arr.push("stats")
  if(player.tabDisplays[4]) arr.push("achs")
  if(player.tabDisplays[5]) arr.push("tbook")
  if((player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.totalGP.gte(1)) && player.tabDisplays[6]) arr.push("upgs")
  if((player.totalx2.gte(1) || player.totali.gte(1)) && player.tabDisplays[7]) arr.push("quad")
  if(player.totaly2.gte(1) && player.tabDisplays[8]) arr.push("yquad")
  if(player.totali.gte(1) && player.tabDisplays[9]) arr.push("comp")
  if(ccTiers() >= 50 && player.tabDisplays[10]) arr.push("polynomials")
  return arr
}

function subtabArray() {
  let arr = [["upgrades"],["milestones","upgrades"],["stats"],["upgrades","varsynth","challenges"],["regular","secret"],["main","division"]];
  if(hasQU(12)) arr[0].push("cplane")
  if(hasQU(16)) arr[0].push("sroot")
  if(hasSU(12)) arr[0].push("chals")
  if(hasQU(20)) arr[0].push("formula")
  if(hasMilestone(12)) arr[1].push("cplane")
  if(hasCU(1,6)) arr[1].push("challenges")
  if(hasYQU(8,'bought')) arr[1].push("zlab")
  if(player.totalx2.gte(1) || player.totali.gte(1)) arr[2].push("tenruns")
  if(hasSU(12) || player.totali.gte(1)) arr[2].push("chalrecords")
  if(player.speedrunMode) arr[2].push("speedrun")
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
  setTimeout(()=>{player.tabDisplays[10] = false; if(player.currentTab == "polynomials") player.currentTab = "comp"}, 2000)
  setTimeout(()=>{player.tabDisplays[9] = false; if(player.currentTab == "comp") player.currentTab = "yquad"}, 2500)
  setTimeout(()=>{player.tabDisplays[8] = false; if(player.currentTab == "yquad") player.currentTab = "quad"}, 3000)
  setTimeout(()=>{player.tabDisplays[7] = false; if(player.currentTab == "quad") player.currentTab = "upgs"}, 3500)
  setTimeout(()=>{player.tabDisplays[6] = false; if(player.currentTab == "upgs") player.currentTab = "tbook"}, 4000)
  setTimeout(()=>{player.tabDisplays[5] = false; if(player.currentTab == "tbook") player.currentTab = "achs"}, 4500)
  setTimeout(()=>{player.tabDisplays[4] = false; if(player.currentTab == "achs") player.currentTab = "stats"}, 5250)
  setTimeout(()=>{player.tabDisplays[3] = false; if(player.currentTab == "stats") player.currentTab = "gen"}, 6750)
  setTimeout(()=>{document.body.classList.add("disappearingbody")},9000)
  setTimeout(()=>{document.body.classList.remove("disappearingbody"); player.viewedEndingCutscene = true; tmp.allTabsShown = false},17000)
}