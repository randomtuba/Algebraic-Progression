var tmp = {
  text: "",
};
function clickButton() {
  player.points = player.points.add(1)
}

function pps() {
  let pps = new Decimal(0);
  pps = pps.add(BUYABLES[1].eff()).add(BUYABLES[2].eff()).add(BUYABLES[3].eff())
  if(player.inSqrt) pps = pps.max(0).pow(hasSU(8)?0.55:0.5)
  if(player.challenge == 4) pps = pps.max(0).pow(0.75)
  if(hasUpgrade(7)) pps = pps.pow(1.01)
  if(hasChallenge(4)) pps = pps.pow(1.03)
  if(player.challenge == 2) pps = pps.pow(player.chalExponents[0])
  if(player.challenge == 9) pps = pps.pow(player.chalExponents[1])
  return pps;
}

function tab(x) {
  player.currentTab = x;
}

function xCost() {
  return new Decimal(100000).mul(new Decimal(1).add(Decimal.div(0.11,hasSU(1)?SQRT_UPGRADES[1].eff():1)).pow(player.x)).div(hasUpgrade(3)?2:1).div(hasUpgrade(5)?1000000:1)
}

function yCost() {
  return new Decimal(100).div(hasQU(18)?1.1:1).mul(new Decimal(1).add(Decimal.div(0.25,sacEffect('x'))).pow(player.y)).floor()
}

function buyVariable(x) {
  switch (x) {
    case "x":
      if (player.points.gte(xCost())){
        if(!hasQU(8)) player.points = player.points.sub(xCost())
        player.x = player.x.add(1)
      }
      break;
    case "y":
      if (player.x.gte(yCost())){
        player.y = player.y.add(1)
      }
      break;
  }
}

function switchTheme() {
  player.theme = !player.theme;
  document.getElementById("style").href = player.theme ? "style.css" : "style-dark.css";
}

var changedQAdisplay = false

function mainLoop(){
  if(!window["player"]||!player.points)return;
  let diff = (Date.now()-player.lastTick)/1000
  player.lastTick = Date.now()
  
  player.points = player.points.add(pps().times(diff));
  player.totalPoints = player.totalPoints.add(pps().times(diff));
  player.timePlayed = (Date.now() - player.startingTime) / 1000;
  player.prestigeTimes[0] = player.prestigeTimes[0] += diff;
  player.prestigeTimes[2] = player.prestigeTimes[2] += diff;
  player.slope = player.slope.add(sacEffect('x2').mul(diff))
  
  if(player.currentTab == 'quad' && player.currentSubtab == 'upgrades' && document.getElementById("quadAuto").value == "" && player.inputValue != ""){
    changedQAdisplay = false
  }
  if(!changedQAdisplay && player.currentTab == 'quad' && player.currentSubtab == 'upgrades'){
    changedQAdisplay = true
    document.getElementById("quadAuto").value = player.inputValue
  }
  if(player.quadUpgs.includes(14) && document.getElementById("quadAuto") && player.currentTab == 'quad' && player.currentSubtab == 'upgrades'){
    player.inputValue = document.getElementById("quadAuto").value
  }
  
  updateAuto()
  if(hasUpgrade(6)) produceBuildings(diff)
  updatePercent()
  updateExps(diff)
  updateAchs()
  
  if(isNaN(player.points)) {
    exportSave()
    alert("WARNING: NaN Detected! You will see a message that will ask you to confirm a Hard Reset. Please select OK to solve the NaN. Your save has been exported, so import it when the game loads the import prompt.")
    hardReset()
    importSave()
  }
}

setInterval(mainLoop, 40);

function updateAuto() {
  // VARIABLES
  if(player.autobuyers[8] && player.points.gte(yCost())){
    player.y = player.x.add(1).div(100).mul(hasQU(18)?1.1:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x')))).floor().add(player.x.gte(100)?1:0)
  }
  if(player.autobuyers[7] && player.points.gte(xCost())){
    player.x = player.points.div(100000).mul(hasUpgrade(3)?2:1).mul(hasUpgrade(5)?1000000:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,hasSU(1)?SQRT_UPGRADES[1].eff():1))).floor()
    if(!hasQU(8)) player.points = player.points.sub(xCost())
    player.x = player.x.add(1)
  }
  
  // FUNCTIONS
  if(player.autobuyers[6] && player.points.gte(BUYABLES[6].cost()) && hasUpgrade(4)){
    player.buyables[6] = player.points.div(100000000).max(1).log(functionCostScaling(3)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[6].cost())
    player.buyables[6] = player.buyables[6].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[5] && player.points.gte(BUYABLES[5].cost()) && hasUpgrade(4)){
    player.buyables[5] = player.points.div(30000000).max(1).log(functionCostScaling(2)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[5].cost())
    player.buyables[5] = player.buyables[5].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[4] && player.points.gte(BUYABLES[4].cost()) && hasUpgrade(4)){
    player.buyables[4] = player.points.div(5000000).max(1).log(functionCostScaling(1)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[4].cost())
    player.buyables[4] = player.buyables[4].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // BUILDINGS
  if(player.autobuyers[3] && player.points.gte(BUYABLES[3].cost())){
    player.buyables[3] = player.points.div(15000).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[3].cost())
    player.buyables[3] = player.buyables[3].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[2] && player.points.gte(BUYABLES[2].cost())){
    player.buyables[2] = player.points.div(200).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[2].cost())
    player.buyables[2] = player.buyables[2].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[1] && player.points.gte(BUYABLES[1].cost())){
    player.buyables[1] = player.points.div(25).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[1].cost())
    player.buyables[1] = player.buyables[1].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // QUADRATIC
  if(player.autobuyers[9] && quadFormula().gte(player.inputValue) && !player.inSqrt && player.challenge == 0){
    goQuadratic()
  }
  
  // SACRIFICE
  if(player.autobuyers[10]){
    sacrifice('x')
    sacrifice('y')
    sacrifice('x<sup>2</sup>')
  }
}

function buyMax() {
  // VARIABLES
  if(player.points.gte(yCost())){
    player.y = player.x.add(1).div(100).mul(hasQU(18)?1.1:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x')))).floor().add(player.x.gte(100)?1:0)
  }
  if(player.points.gte(xCost())){
    player.x = player.points.div(100000).mul(hasUpgrade(3)?2:1).mul(hasUpgrade(5)?1000000:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,hasSU(1)?SQRT_UPGRADES[1].eff():1))).floor()
    if(!hasQU(8)) player.points = player.points.sub(xCost())
    player.x = player.x.add(1)
  }
  
  // FUNCTIONS
  if(player.points.gte(BUYABLES[6].cost()) && hasUpgrade(4)){
    player.buyables[6] = player.points.div(100000000).max(1).log(functionCostScaling(3)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[6].cost())
    player.buyables[6] = player.buyables[6].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[5].cost()) && hasUpgrade(4)){
    player.buyables[5] = player.points.div(30000000).max(1).log(functionCostScaling(2)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[5].cost())
    player.buyables[5] = player.buyables[5].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[4].cost()) && hasUpgrade(4)){
    player.buyables[4] = player.points.div(5000000).max(1).log(functionCostScaling(1)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[4].cost())
    player.buyables[4] = player.buyables[4].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // BUILDINGS
  if(player.points.gte(BUYABLES[3].cost())){
    player.buyables[3] = player.points.div(15000).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[3].cost())
    player.buyables[3] = player.buyables[3].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[2].cost())){
    player.buyables[2] = player.points.div(200).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[2].cost())
    player.buyables[2] = player.buyables[2].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[1].cost())){
    player.buyables[1] = player.points.div(25).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[1].cost())
    player.buyables[1] = player.buyables[1].add(1)
    player.chalExponents[0] = new Decimal(0)
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
  return poly
}

function updatePercent() {
  let buildings = BUYABLES[1].eff().add(BUYABLES[2].eff()).add(BUYABLES[3].eff())
  
  if(buildings.gt(0)) player.buildingPercent=[null,BUYABLES[1].eff().div(buildings).times(100),BUYABLES[2].eff().div(buildings).times(100),BUYABLES[3].eff().div(buildings).times(100)]
  else player.buildingPercent=[null,33.33,33.33,33.33]
}

function updateExps(diff) {
  player.chalExponents[0] = player.chalExponents[0].add(new Decimal(1).div(30).mul(diff)).min(1)
  player.chalExponents[1] = player.chalExponents[1].sub(new Decimal(0.04).mul(diff)).max(0)
}

document.addEventListener("keydown", function onEvent(event) {

  switch (event.key) {
    case "1":
      buyBuyable(1)
      break;
    case "2":
      buyBuyable(2)
      break;
    case "3":
      buyBuyable(3)
      break;
    case "4":
      buyBuyable(4)
      break;
    case "5":
      buyBuyable(5)
      break;
    case "6":
      buyBuyable(6)
      break;
    case "x":
      buyVariable('x')
      break;
    case "y":
      buyVariable('y')
      break;
    case "m":
      if(player.totalx2.gte(1)) buyMax()
      break;
    case "q":
      if(!player.inSqrt) goQuadratic()
      break;
    case "s":
      if(hasQU(16)) enterSqrt()
      break;
    case "b":
      if(hasUpgrade(8)) buyB()
      break;
  }
});