const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

const xUpgCosts = [1,10,25,50]
const xUpgDesc = ["Cost scaling is 1.1x","Production is doubled","Divide x cost by 2","Unlock Functions"]

const tabNames = ["Generation","Options","Achievements","Upgrades"]

var a = false

const app = new Vue({
  el: '#app',
  data: {
    D: function (){return D()},
    format: function(x,p=2){
      x=D(x)
  if (D(x).lt(1e9)){
      if(x.lt(1e4))return x.toFixed(p).toLocaleString()
  let s = x.floor().toNumber().toLocaleString()
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
        switch(x){
          case 1:
            return amt.add(1)
            break;
          case 2:
            if(amt.gt(49.5))return amt=D(2).pow(amt).div(2**50).pow(0.5).mul(2**50)
            else return D(2).pow(amt)
            break;
          case 3:
            if(amt.gt(49.5))return amt=D(3).pow(amt).div(3**50).pow(0.5).mul(3**50)
            else return D(3).pow(amt)
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
      timeSinceLastTick: Date.now(),
      buildings: [0,0,0],
      functions: [0,0,0],
      tab: 1,
      upgrades: [0,0,0,0],
      pps: "0",
      unlocks: []
    },
    xUpgCosts,
    xUpgDesc,
    buyUpg,
    tabNames,
    buyX,
    buy,
    buyFunc,
    funcDisplay: function(x){
      let amt = this.player.functions[x-1]
      switch(x){
        case 1:
          return "x+1"
          break;
        case 2:
          if(D(amt).gt(49.5))return "((2^x)/2^50)^0.5*2^50"
          else return "2^x"
          break;
        case 3:
          if(D(amt).gt(49.5))return "((3^x)/3^50)^0.5*3^50"
          else return "3^x"
          break;
      }
    },
    unlocked: function(x){
      return this.player.unlocks.includes(x)
    },
    xCost: function(){
      return D(1.1).pow(this.player.x).times(1e5)
    },
    yCost: function(){
      return D(1.25).pow(this.player.y).times(1000)
    },
    formatExponent
  },
})

console.log("What are you doing here in the console?");

function format(x){ // Redefined from app.data
  x=D(x)
  if (D(x).lt(1e9))
      if(x.lt(1e4))x=x.toFixed(2)
    else x=x.floor()
  let s = x.toFixed(x.lt(1e4)?2:0).toLocaleString()
  if(s.includes("."))s=s.slice(0,s.indexOf("."))
  return s
      let log = x.log(10)
      let ping = log.floor()
      let pingery = log.sub(ping)
      let e = Decimal.pow(10, pingery).times(1000).round().div(1000)
      if(e.toFixed(2)==10){
        e=D(1)
        ping=ping.add(1)
      }
      if (Decimal.gte(x, "1e1000"))
        return `e${ping.toString()}`
      else
        return `${e.toFixed(2).toString()}e${ping.toString()}`
}

var mainGameLoop = window.setInterval(function() { // runs the loop 
  loop((Date.now()-app.player.timeSinceLastTick)/1000)
  app.player.timeSinceLastTick=Date.now()
  
  if(app.player.buildings[2]>0.5&&!app.player.unlocks.includes("x"))app.player.unlocks.push("x")
  if(app.player.x>0.5&&!app.player.unlocks.includes("xupgs"))app.player.unlocks.push("xupgs")
  //convertNumber()
}, 33);
//yes
function loop(diff) { // don't change this stuff unless you know what you're doing
  if (!(app.player.points instanceof Decimal)) app.player.points = D(app.player.points)
  
  app.player.pps = pointGain()
  app.player.points = D(app.player.points).add(app.player.pps.times(diff))
}

function pointGain(){
  let b1 = D(app.player.buildings[0])
  let b2 = D(app.player.buildings[1]*10)
  let b3 = D(app.player.buildings[2]*1000)
  let buildings = b1.add(b2).add(b3)
  
  let mult = D(1)
  if(app.player.upgrades[1])mult=mult.times(2)
  for(let x=1;x<4;x++){
    mult=mult.times(funcEff(x))
  }
  
  let gain = buildings.times(mult)
  
  return gain
}

function pointButton() {
  app.player.points=D(app.player.points).add(1);
}
 
function buy(x) {
  if(D(app.player.points).gte(cost(x))){
    app.player.points = D(app.player.points).sub(cost(x),D(app.player.buildings[x-1]).add(1))
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
    app.player.points = D(app.player.points).sub(app.xCost());
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
    if(x==2)app.player.xcost = D(app.player.xcost).div(2);
  }
}

function buyFunc(x){
  if(D(app.player.points).gte(costfunc(x))){
    app.player.points = D(app.player.points).sub(costfunc(x));
    app.player.functions[x-1]++;
  }
}

function funcEff(x){
  return app.funcEff(x)
}

function buyMax(){
  if(D(app.player.points).lt(20))return;
  
  for(let i=1;i<4;i++){
    let x = 4-i
    if(costfunc(x).gt(app.player.points))continue;
    
    let max = D(app.player.points).div([10000000,30000000,1e8][x-1]).log([2,5,7][x-1]).minus(app.player.functions[x-1]).floor()
    if(max.lt(1))continue;
    let fcost = D([2,5,7][x-1]).pow(max.add(app.player.functions[x-1])).times([10000000,30000000,1e8][x-1])
    
    app.player.points = D(app.player.points).sub(fcost)
    app.player.functions[x-1] = D(app.player.functions[x-1]).add(max)
  }
  
  for(let i=1;i<4;i++){
    let x = 4-i
    if(cost(x).gt(app.player.points))continue;
    
    let max = D(app.player.points).div([25,200,15000][x-1]).log(app.player.upgrades[0] ? 1.1 : 1.15).minus(app.player.buildings[x-1]).floor()
    if(max.lt(1))continue;
    let bcost = D(app.player.upgrades[0] ? 1.1 : 1.15).pow(max.add(app.player.buildings[x-1])).times([25,200,15000][x-1])
    
    app.player.points = D(app.player.points).sub(bcost)
    app.player.buildings[x-1] = D(app.player.buildings[x-1]).add(max)
  }
  
  let xMax = D(app.player.points).div(1e5).log(1.1).minus(app.player.x).floor()
  if(xMax.gte(1)){
    let xCost = D(1.1).pow(xMax.add(app.player.x)).times(1e5)
    
    app.player.points = D(app.player.points).sub(xCost)
    app.player.x= D(app.player.x).add(xMax)
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
  }
});