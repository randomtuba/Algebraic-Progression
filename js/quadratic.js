function x2resetGain(){
  return app.x2resetGain()
}

const quadUpgs = {
  0:{
    desc: "Multiply production by 20.",
    effect: () => undefined,
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
    desc: "Current endgame (will unlock next mechanic next update)",
    effect: () => undefined,
    cost: 5000
  }
}

var quadUpgText;

function allocateQuadUpgText(upgList) {
  let quadUpgText = [];
  for(let x=0;x<Object.keys(upgList).length;x++){
    let text = "";
    if (upgList[x].desc && upgList[x].cost) text += `${upgList[x].desc}<br><br>Cost: ${upgList[x].cost}x<sup>2</sup>`;
    if (upgList[x].effect() != undefined) text += `<br>Currently: ${upgList[x].effect()}x`;
    if (text != "") quadUpgText.push(text);
  }
  
  return quadUpgText;
}

function hasQuadUpg(id){
  return app.hasQuadUpg(id)
}

function buyQuadUpg(id){
  if(D(app.player.x2).gte(quadUpgs[id].cost)&&!hasQuadUpg(id)){
    app.player.x2=D(app.player.x2).minus(quadUpgs[id].cost)
    app.player.quadUpgs[id]=1
  }
}

function goQuadratic(forced=false){
  if(x2resetGain().gte(1)||forced){
    if(!forced)app.player.x2=D(app.player.x2).add(x2resetGain())
    
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
  if(type=="x"){
    let base = D(app.player.sacx).add(1).log(3).add(1).log2().add(1)
    
    return base
  }
  else if(type=="y"){
    let base = D(app.player.sacy)
    if(!hasQuadUpg(14))base=base.add(1).log(1.25)
    
    return base.mul(0.02)
  }
}

function sacrifice(type){
  if(D(app.player[type]).gt(app.player["sac"+type])){
    app.player["sac"+type]=app.player[type]
    app.player[type]=0
  }
}