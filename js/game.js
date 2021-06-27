const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

const xUpgCosts = [1,10,25,50]
const xUpgDesc = ["Cost scaling is 1.1x","Production is doubled","Divide x cost by 2","Unlock Functions"]

const tabs = [["Generation"],["Options"],["Achievements"],["Upgrades","","unlocked('xupgs')"],["Quadratic",["color:blue; border-color: blue; background-color: #A1C7CC;",""],"unlocked('quadratic')"]] //quadratic tab is unlocked when you quadratic reset for the first time
// [tabName, css [style, class] or "" for nothing, v-if]

var a = false

const app = new Vue({
  el: '#app',
  data: {
    D: function (){return D()},
    format: function(x,p=2){
      x=D(x)
  if (D(x).lt(1e9)){
      if(x.lt(1e4))return x.toFixed(p).toLocaleString("en-US")
  let s = x.floor().toNumber().toLocaleString("en-US")
  if(s.includes("."))s=s.slice(0,s.indexOf("."))
  return s
    }
      else{
      let log = x.log(10)
      let ping = log.floor()
      let pingery = log.sub(ping)
      let e = Decimal.pow(10, pingery).times(1000).round().div(1000)
      if(e.toFixed(p)==10){
        e=D(1)
        ping=ping.add(1)
      }
      if (Decimal.gte(x, "1e1000"))
        return `e${ping.toString()}`
      else
        return `${e.toFixed(p).toString()}e${ping.toString()}`
    }
    },
    cost: function(x){
      return D(this.player.upgrades[0] ? 1.1 : 1.15).pow(this.player.buildings[x-1]).times([25,200,15000][x-1])
    },
    funcEff: function(x){
        let amt = D(this.player.functions[x-1])
        let base = D(x).add(hasQuadUpg(8)?0.5:0).add(sacEffect('y').toFixed(2))
        let softcapStart = 50+(hasQuadUpg(9)?25:0)
        switch(x){
          case 1:
            return amt.add(1).pow(hasQuadUpg(2)?2:1)
            break;
          case 2:
            if(amt.gte(softcapStart))return amt=D(base).pow(amt).div(base**softcapStart).pow(0.5).mul(base**softcapStart)
            else return D(base).pow(amt)
            break;
          case 3:
            if(amt.gte(softcapStart))return amt=D(base).pow(amt).div(base**softcapStart).pow(0.5).mul(base**softcapStart)
            else return D(base).pow(amt)
            break;
        }
    },
    costfunc: function(x){
      return D([2,5,7][x-1]).pow(this.player.functions[x-1]).times([10000000,30000000,1e8][x-1])
    },
    player: {
      points: "0",
      x: 0,
      y: 0,
      x2: "0",
      sacx: 0,
      sacy: 0,
      timeSinceLastTick: Date.now(),
      buildings: [0,0,0],
      buildingPercent: [0,0,0],
      buildingGain: [0,0,0],
      functions: [0,0,0],
      tab: 1,
      subtab:{
        quadratic: 1
      },
      quadraticStats:{
        time: 0,
        best: [0,0]
      },
      upgrades: [0,0,0,0],
      quadUpgs: [0,0,0,0,0,0,0,0,0,0],
      pps: "0",
      unlocks: [],
      timeSinceAutobuy: 0,
      autobuyers: [true,true,true,true,[false,0]],
      theme: "Light",
      sacrificing: "x",
    },
    xUpgCosts,
    xUpgDesc,
    buyUpg,
    tabs,
    buyX,
    buy,
    buyFunc,
    funcDisplay: function(x){
      let amt = this.player.functions[x-1]
      let base = this.format(D(x).add(hasQuadUpg(8)?0.5:0).add(sacEffect('y')))
      let softcapStart = 50+(hasQuadUpg(9)?25:0)
      switch(x){
        case 1:
          if(hasQuadUpg(2))return "(x+1)^2"
          else return "x+1"
          break;
        case 2:
          if(D(amt).gte(softcapStart))return `((${base}^x)/${base}^${softcapStart})^0.5*${base}^${softcapStart}`
          else return base+"^x"
          break;
        case 3:
          if(D(amt).gte(softcapStart))return `((${base}^x)/${base}^${softcapStart})^0.5*${base}^${softcapStart}`
          else return base+"^x"
          break;
      }
    },
    unlocked: function(x){
      return this.player.unlocks.includes(x)
    },
    xCost: function(){
      return D(1.1).pow(this.player.x).times(1e5).div(this.player.upgrades[2]?2:1)
    },
    yCost: function(){
      return D(0.25).div(sacEffect('x')).add(1).pow(this.player.y).times(1000)
    },
    formatExponent,
    x2resetGain: function(){
      let x = Math.floor(this.player.x/1000)
      let y = this.player.y
      
      let gain = D(x).add(y)
      let mult = D(1)
      if(hasQuadUpg(10))mult=mult.times(2)
      
      return mult.times(gain)
    },
    quadUpgs,
    quadUpgText,
    buyQuadUpg,
    hasQuadUpg: function(id){
      return !!this.player.quadUpgs[id]
    },
    changeTheme,
    themeList,
    themeNum,
    sacrifice,
    sacEffect,
  },
})

var changedQAdisplay = false

console.log("What are you doing here in the console?");

function format(x){ // Redefined from app.data
  return app.format(x)
}

var mainGameLoop = window.setInterval(function() { // runs the loop 
  loop((Date.now()-app.player.timeSinceLastTick)/1000)
  app.player.timeSinceLastTick=Date.now()
  
  if(app.player.buildings[0]>0.5&&!app.player.unlocks.includes("factory"))app.player.unlocks.push("factory")
  if(app.player.buildings[1]>0.5&&!app.player.unlocks.includes("portal"))app.player.unlocks.push("portal")
  if(app.player.buildings[2]>0.5&&!app.player.unlocks.includes("x"))app.player.unlocks.push("x")
  if(app.player.x>0.5&&!app.player.unlocks.includes("xupgs"))app.player.unlocks.push("xupgs")
  if(app.player.y>0.5&&!app.player.unlocks.includes("quad"))app.player.unlocks.push("quad")
  //convertNumber()
}, 33);
//yes
function loop(diff) { // don't change this stuff unless you know what you're doing
  if (!(app.player.points instanceof Decimal)) app.player.points = D(app.player.points)
  
  app.player.pps = pointGain()
  app.player.points = D(app.player.points).add(app.player.pps.times(diff))
  
  if(hasQuadUpg(4)||hasQuadUpg(5))app.player.timeSinceAutobuy+=diff*(hasQuadUpg(11)?D(app.player.x2).add(1).log10().add(1).toNumber():1)
  if(app.player.timeSinceAutobuy>=1){
    app.player.timeSinceAutobuy=0
    autobuy()
  }
  
  if(app.player.tab==5&&app.player.subtab.quadratic==3&&document.getElementById("aqAuto").value==""&&app.player.autobuyers[4][1]!="")changedQAdisplay=false
  
  if(!changedQAdisplay&&app.player.tab==5&&app.player.subtab.quadratic==3){
    changedQAdisplay=true
    document.getElementById("aqAuto").value=app.player.autobuyers[4][1]
  }
  if(document.getElementById("aqAuto")&&app.player.tab==5&&app.player.subtab.quadratic==3)app.player.autobuyers[4][1]=document.getElementById("aqAuto").value
  
  app.player.quadraticStats.time+=diff
}

function pointGain(){
  let totalBuildingMult = D(1.01).pow(D(app.player.buildings[0]).add(app.player.buildings[1]).add(app.player.buildings[2])).min(hasQuadUpg(12)?1e309:1e10)
  if(hasQuadUpg(12)&&totalBuildingMult.gt(1e10))totalBuildingMult=totalBuildingMult.div(1e10).pow(0.1).mul(1e10)
  
  let b1 = D(app.player.buildings[0]).times(hasQuadUpg(1)?totalBuildingMult:1)
  let b2 = D(app.player.buildings[1]*10).times(hasQuadUpg(3)?totalBuildingMult:1)
  let b3 = D(app.player.buildings[2]*1000).times(hasQuadUpg(6)?totalBuildingMult:1)
  let buildings = b1.add(b2).add(b3)
  
  app.player.buildingGain=[b1,b2,b3]
  if(buildings.gt(0))app.player.buildingPercent=[b1.div(buildings).times(100),b2.div(buildings).times(100),b3.div(buildings).times(100)]
  else app.player.buildingPercent=[33.33,33.33,33.33]
  
  let mult = D(1)
  if(app.player.upgrades[1])mult=mult.times(2)
  for(let x=1;x<4;x++){
    mult=mult.times(funcEff(x))
  }
  if(hasQuadUpg(0))mult=mult.times(20).times(hasQuadUpg(13)?D(app.player.x2).add(1):1)
  
  let gain = buildings.times(mult)
  
  return gain
}

function pointButton() {
  app.player.points=D(app.player.points).add(1);
}
 
function buy(x) {
  if(D(app.player.points).gte(cost(x))){
    if(!hasQuadUpg(7))app.player.points = D(app.player.points).sub(cost(x),D(app.player.buildings[x-1]).add(1))
    app.player.buildings[x-1] = D(app.player.buildings[x-1]).add(1)
  }
}

function cost(x){
  return D(app.player.upgrades[0] ? 1.1 : 1.15).pow(app.player.buildings[x-1]).times([25,200,15000][x-1])
}

function costfunc(x){
  return D([2,5,7][x-1]).pow(app.player.functions[x-1]).times([10000000,30000000,1e8][x-1])
}

function buyX() {
  if(D(app.player.points).gte(app.xCost())){
    if(!hasQuadUpg(13))app.player.points = D(app.player.points).sub(app.xCost());
    app.player.x++;
  }
}

function buyY() {
  if(D(app.player.x).gte(app.yCost())){
    app.player.y++;
  }
}

function buyUpg(x){
  if(app.player.x >= xUpgCosts[x] && app.player.upgrades[x]==0){
    app.player.upgrades[x] = 1;
  }
}

function buyFunc(x){
  if(D(app.player.points).gte(costfunc(x))){
    if(!hasQuadUpg(7))app.player.points = D(app.player.points).sub(costfunc(x));
    app.player.functions[x-1]++;
  }
}

function funcEff(x){
  return app.funcEff(x)
}

function buyMax(type){
  if(D(app.player.points).lt(10))return;

  if(hasQuadUpg(7)&&(type&&type=="functions")){
    for(let i=1;i<4;i++){
      let x = 4-i
      
      if(D(app.player.points).gte(cost(i)))buy(i)
      if(costfunc(x).gt(app.player.points))continue;

      let max = D(app.player.points).div([10000000,30000000,1e8][x-1]).log([2,5,7][x-1]).minus(app.player.functions[x-1]).floor()
      if(max.lt(1))continue;
      let fcost = D([2,5,7][x-1]).pow(max.add(app.player.functions[x-1])).times([10000000,30000000,1e8][x-1])

      app.player.functions[x-1] = D(app.player.functions[x-1]).add(max)
    }
  }

  
  for(let i=1;i<4;i++){
    if(type&&type!="buildings")break;
    let x = 4-i
    if(cost(x).gt(app.player.points))continue;
    
    let max = D(app.player.points).div([25,200,15000][x-1]).log(app.player.upgrades[0] ? 1.1 : 1.15).minus(app.player.buildings[x-1]).floor()
    if(max.lt(1))continue;
    let bcost = D(app.player.upgrades[0] ? 1.1 : 1.15).pow(max.add(app.player.buildings[x-1])).times([25,200,15000][x-1])
    
    if(!hasQuadUpg(7))app.player.points = D(app.player.points).sub(bcost)
    app.player.buildings[x-1] = D(app.player.buildings[x-1]).add(max)
  }
  
  if(type=="x"||!type){
    let xMax = D(app.player.points).div(1e5).log(1.1).minus(app.player.x).floor()
    if(xMax.gte(1)){
      let xCost = D(1.1).pow(xMax.add(app.player.x)).times(1e5)

      if(!hasQuadUpg(13))app.player.points = D(app.player.points).sub(xCost)
      app.player.x= D(app.player.x).add(xMax)
    }
    else if(D(app.player.points).gte(app.xCost()))buyX()
  }
  
  if(type=="y"&&D(app.player.x).gte(750)){
    let yMax = D(app.player.x).div(1000).log(D(0.25).div(sacEffect('x')).add(1)).minus(app.player.y).floor()
    if(yMax.gte(1)){
      app.player.y= D(app.player.y).add(yMax)
    }
    if(D(app.player.points).gte(app.yCost()))buyY()
  }
}

// using the function i made for a different game
function formatExponent(str){
  let end = ""
  while(str.includes("^")){
    let num = str.indexOf("^")+1
    str=str.replace("^","<sup>")
    let inP = false
    if(str.slice(num).includes(")")&&str.slice(num).includes("(")){
      if(str.slice(num).indexOf(")")<str.slice(num).indexOf("("))inP=true}
    if(str.slice(num).includes(")")&&!str.slice(num).includes("("))inP=true
    if(inP)str=str.slice(0,num)+str.slice(num).replace(")","</sup>)")
    else end+="</sup>"}
  while(str.includes("v")){
    let num = str.indexOf("v")+1
    str=str.replace("v","<sub>")
    let inP = false
    if(str.slice(num).includes(")")&&str.slice(num).includes("(")){
      if(str.slice(num).indexOf(")")<str.slice(num).indexOf("("))inP=true}
    if(str.slice(num).includes(")")&&!str.slice(num).includes("("))inP=true
    if(inP)str=str.slice(0,num)+str.slice(num).replace(")","</sub>)")
    else end+="</sub>"}
  return str+end
}

document.addEventListener("keydown", function onEvent(event) {
  switch (event.key) {
    case "m":
      buyMax()
      break;
    case "1":
      buy(1)
      break;
    case "2":
      buy(2)
      break;
    case "3":
      buy(3)
      break;
    case "x":
      buyX()
      break;
    case "y":
      buyY()
      break;
    case "4":
      if(hasQuadUpg(4)){buyFunc(1)}
      break;
    case "5":
      if(hasQuadUpg(4)){buyFunc(2)}
      break;
    case "6":
      if(hasQuadUpg(4)){buyFunc(3)}
      break;
    case "q":
      goQuadratic();
      break;
  }
});