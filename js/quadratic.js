function x2resetGain(){
  return app.x2resetGain()
}

const quadUpgs = {
  0:{
    desc: "Multiply production by 20.",
    effect: () => {
      let eff = new Decimal(20)
      if(!app.player)return eff
      if(hasQuadUpg(13))eff=eff.times(app.player.x2).add(20)
      return eff
    },
    cost: 2,
  },
  1:{
    desc: "Autoclickers are stronger based on total buildings bought (hardcapped at 1e10).",
    effect: () => undefined,
    cost: 2
  },
  2:{
    desc: "Square f(x).",
    effect: () => undefined,
    cost: 3
  },
  3:{
    desc: "Point Factories are stronger based on total buildings bought (hardcapped at 1e10).",
    effect: () => undefined,
    cost: 4
  },
  4:{
    desc: "Unlock an autobuyer for buildings and unlock function hotkeys (4,5,6).",
    effect: () => undefined,
    cost: 6
  },
  5:{
    desc: "Unlock an autobuyer for x and keep x upgrades on reset.",
    effect: () => undefined,
    cost: 9
  },
  6:{
    desc: "Point Portals are stronger based on total buildings bought (hardcapped at 1e10).",
    effect: () => undefined,
    cost: 10
  },
  7:{
    desc: "Purchasing buildings and functions doesn't remove points and max all buys functions.",
    effect: () => undefined,
    cost: 10
  },
  8:{
    desc: "g(x) = 2.5<sup>x</sup> and h(x) = 3.5<sup>x</sup>, unlock an autobuyer for functions, and you start with 25 points.",
    effect: () => undefined,
    cost: 20
  },
  9:{
    desc: "The g(x) and h(x) softcap starts 25 purchases later.",
    effect: () => undefined,
    cost: 35
  },
  10:{
    desc: "Double x<sup>2</sup> gain and unlock an autobuyer for y.",
    effect: () => undefined,
    cost: 70
  },
  11:{
    desc: "Unlock the coordinate plane and autobuyers go log(x<sup>2</sup>+1)x faster.",
    effect: () => undefined,
    cost: 150
  },
  12:{
    desc: "Upgrades 2, 4, and 7 are now extremely softcapped instead of hardcapped.",
    effect: () => undefined,
    cost: 300
  },
  13:{
    desc: "Upgrade 1 now multiplies point gain by (x<sup>2</sup>+1)*20 and x doesn't remove points.",
    effect: () => undefined,
    cost: 900
  },
  14:{
    desc: "Unlock the quadratic automator and make sacrificed y better.",
    effect: () => undefined,
    cost: 1250
  },
  15:{
    desc: "Unlock Square Root.",
    effect: () => undefined,
    cost: 5000
  }
}

const sqrtUpgs = {
  0:{
    desc: "Double gain of root essence per purchase.",
    effect: () => undefined,
    cost: 2, //cost multiplies by 5 per purchase, base cost is 2
  },
  1:{
    desc: "Triple x<sup>2</sup> gain.",
    effect: () => undefined,
    cost: 3,
  },
  2:{
    desc: "Unlock a new row of X upgrades.",
    effect: () => undefined,
    cost: 5,
  },
  3:{
    desc: "Gain more points based on root essence.",
    effect: () => undefined,
    cost: 10,
  },
  4:{
    desc: "Sacrificed x and y are both slightly more effective.",
    effect: () => undefined,
    cost: 525,
  },
  5:{
    desc: "You can now sacrifice x<sup>2</sup> to the Coordinate Plane.",
    effect: () => undefined,
    cost: 650,
  },
  6:{
    desc: "Points now affect the x<sup>2</sup> formula.",
    effect: () => {
      let eff = new Decimal(1)
      if(!app.player)return eff
      eff=D(app.player.points).add(1).log10().root(3).add(1)
      
      return eff
    },
    cost: 800
  },
  7:{
    desc: "The Square Root penalty is now ^0.6 instead of ^0.5.",
    effect: () => undefined,
    cost: 1000,
  },
  8:{
    desc: "Autobuyers run 4x faster.",
    effect: () => undefined,
    cost: 3000
  },
  9:{
    desc: "Weaken the point softcap.",
    effect: () => undefined,
    cost: 3555
  },
  10:{
    desc: "Gain more points based on Y.",
    effect: () => {
      if(!app.player)return new Decimal(1)
      let eff = D(10).pow(app.player.y)
      
      return eff
    },
    cost: 3700
  },
  11:{
    desc: "Current Endgame (will unlock next mechanic in next update!).",
    effect: () => undefined,
    cost: 333333
  },
}

var quadUpgText;
var quadUpgUpdateEffects = []
var sqrtUpgUpdateEffects = []

function allocateQuadUpgText(upgList) {
  let quadUpgText = [];
  for(let x=0;x<Object.keys(upgList).length;x++){
    let text = "";
    if (upgList[x].desc && upgList[x].cost) text += `${upgList[x].desc}<br><br>Cost: ${upgList[x].cost}x<sup>2</sup>`;
    if (upgList[x].effect() != undefined){text += `<br>Currently: <span id="quadUpgEffect${x}"></span>x`;quadUpgUpdateEffects.push(x)}
    if (text != "") quadUpgText.push(text);
  }
  
  return quadUpgText;
}

function hasQuadUpg(id){
  if(!app["hasQuadUpg"])return false
  return app.hasQuadUpg(id)
}

function hasSqrtUpg(id){
  return app.hasSqrtUpg(id)
}

function buyQuadUpg(id){
  if(D(app.player.x2).gte(quadUpgs[id].cost)&&!hasQuadUpg(id)){
    app.player.x2=D(app.player.x2).minus(quadUpgs[id].cost)
    app.player.quadUpgs[id]=1
  }
}

function buySqrtUpg(id){
  if(D(app.player.rootEssence).gte(sqrtUpgs[id].cost)&&!hasSqrtUpg(id)&&id!=0){
    app.player.rootEssence=D(app.player.rootEssence).minus(sqrtUpgs[id].cost)
    app.player.sqrtUpgs[id]=1
  }else if(id==0&&D(app.player.rootEssence).gte(reBuyableCost())){
    app.player.rootEssence=D(app.player.rootEssence).minus(reBuyableCost())
    app.player.sqrtUpgs[id]=D(app.player.sqrtUpgs[id]).add(1)
  }
}

var sqrtUpgText;

function allocateSqrtUpgText(upgList) {
  let sqrtUpgText = [];
  for(let x=0;x<Object.keys(upgList).length;x++){
    let text = "";
    if (upgList[x].desc && upgList[x].cost) text += `${upgList[x].desc}<br><br>Cost: ${x==0?"<span id='rebuyablecost'>{{app.reBuyableCost()}}</span>":upgList[x].cost} root essence`;
    if (upgList[x].effect() != undefined){text += `<br>Currently: <span id="sqrtUpgEffect${x}"></span>x`;sqrtUpgUpdateEffects.push(x)}
    if (text != "") sqrtUpgText.push(text);
  }
  
  return sqrtUpgText;
} 

function goQuadratic(forced=false,insqrt=app.player.inSquareRoot){
  if(x2resetGain().gte(1)||forced||insqrt){
    if(!forced&&!insqrt)app.player.x2=D(app.player.x2).add(x2resetGain())
    if(insqrt&&D(app.player.x).gte(100)){
      app.player.rootEssence=D(app.player.rootEssence).add(getEssenceGain())
    }
    
    app.player.buildings=[0,0,0]
    app.player.x=0
    app.player.y=0
    if(!hasQuadUpg(5))app.player.upgrades=[0,0,0,0]
    app.player.buildingPercent=[0,0,0]
    app.player.buildingGain=[0,0,0]
    app.player.functions=[0,0,0]
    app.player.pps="0"
    if(!hasQuadUpg(8))app.player.points="0"
    else app.player.points="25"
    app.player.quadraticStats.time=0
  }
}

function autobuy(){
  if(hasQuadUpg(4)&&app.player.autobuyers[0]){
    buyMax("buildings")
  }
  if(hasQuadUpg(5)&&app.player.autobuyers[1]){
    buyMax("x")
  }
  if(hasQuadUpg(8)&&app.player.autobuyers[2]){
    buyMax("functions")
  }
  if(hasQuadUpg(10)&&app.player.autobuyers[3]){
    buyMax("y")
  }
  if(hasQuadUpg(14)&&app.player.autobuyers[4][0]){
    if(x2resetGain().gte(D(app.player.autobuyers[4][1])))goQuadratic()
  }
}


function sacEffect(type){
  let base;
  switch(type){
    case "x":
      base = D(app.player.sacx).add(1).log(hasSqrtUpg(4)?2.5:3).add(1).log2().add(1)
    
      return base
      break;
    case "y":
      base = D(app.player.sacy)
      if(!hasQuadUpg(14))base=base.add(1).log(1.25)
      if(hasSqrtUpg(4))base=base.times(1.2)

      return base.mul(0.02)
      break;
    case "x2":
      base = D(app.player.sacx2)
      base = D(1.001).pow(base)
      
      if(base.gte(1e35))base=base.div(1e35).pow(0.25).mul(1e35)
      
      return base
  }
}

function sacrifice(type){
  if(D(app.player[type]).gt(app.player["sac"+type])){
    app.player["sac"+type]=app.player[type]
    app.player[type]=0
  }
}

function enterSquareRoot(){
  goQuadratic();
  app.player.inSquareRoot = !app.player.inSquareRoot;
}

function getEssenceGain(){
  return app.getEssenceGain()
}

function reBuyableCost(){
  return app.reBuyableCost()
}

quadUpgText = allocateQuadUpgText(quadUpgs);
sqrtUpgText = allocateSqrtUpgText(sqrtUpgs);