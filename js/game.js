const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

const xUpgCosts = [1,10,25,50,6200,10300,12500,19200]
const xUpgDesc = ["Cost scaling is 1.1x","Production is doubled","Divide x cost by 2","Unlock Functions","Divide X cost by 1 million and multiply point gain by 1,000","Point Portals produce Point Factories and Point Factories produce Autoclickers","Raise point gain to (log(x+1)*log(y+1)<br>/100+1).","Gain 10x more root essence"]

const tabs = [["Generation"],["Options"],["Achievements"],["Upgrades","","unlocked('xupgs')"],["Quadratic",["color:blue; border-color: blue; background-color: #A1C7CC;",""],"unlocked('quadratic')"]] //quadratic tab is unlocked when you quadratic reset for the first time
// [tabName, css [style, class] or "" for nothing, v-if]

var a = false

const app = new Vue({
  el: '#app',
  data: {
    D(x){return new Decimal(x)},
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
    getEssenceGain(){return D((app.player.x/100)+app.player.y).times(D(2).pow(this.player.sqrtUpgs[0])).times(this.player.upgrades[7]?10:1).sub(app.player.rootEssence).floor().max(0)},
    player: {
      points: "0",
      x: 0,
      y: 0,
      x2: "0",
      sacx: 0,
      sacy: 0,
      sacx2: "0",
      timeSinceLastTick: Date.now(),
      timeBoost: 1,
      buildings: [0,0,0],
      producedBuildings: [0,0,0],
      buildingPercent: [0,0,0],
      buildingGain: [0,0,0],
      functions: [0,0,0], //uh do you know how to implement x upgrade 6
      tab: 1,
      subtab:{
        quadratic: 1
      },
      quadraticStats:{
        time: 0,
        best: [0,0]
      },
      upgrades: [0,0,0,0,0,0,0,0],
      quadUpgs: [0,0,0,0,0,0,0,0,0,0],
      pps: "0",
      unlocks: [],
      timeSinceAutobuy: 0,
      autobuyers: [true,true,true,true,[false,0]],
      theme: "Light",
      sacrificing: "x",
      achs: [],
      inSquareRoot: false,
      rootEssence: "0",
      sqrtUpgs: [D(0),0,0,0]
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
      return D(1.1).pow(this.player.x).times(1e5).div(this.player.upgrades[2]?2:1).div(this.player.upgrades[4]?1000000:1)
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
      if(hasSqrtUpg(1))mult=mult.times(3)
      if(hasSqrtUpg(6))mult=mult.times(sqrtUpgs[6].effect())
      
      return mult.times(gain)
    },
    getMaxAllText: function() { /*written by Jayman ~ NOTE: I will clean it up now that it is working. :)*/
      let itemList = ["Buildings", "Functions", "X", "Y"];
      let booleans = [this.hasQuadUpg(7), this.unlocked("x"), this.player.x >= 100];
      let maText = `Max All`;
      let currentSubStrs = [` ${itemList[0]}`];
      for (let [i, name] of booleans.entries()) {
        if (name) currentSubStrs.push(`, ${itemList[i + 1]}`);
      }
      /*if (this.hasQuadUpg(7)) {
        currentSubStrs.push(`, ${itemList[1]}`);
      }
      if (this.unlocked("x")) { //this.player.unlocks.includes("x")
        currentSubStrs.push(`, ${itemList[2]}`);
      }
      if (this.player.x >= 100) {
        currentSubStrs.push(`, ${itemList[3]}`);
      }*/
      let amount = currentSubStrs.length; /*do this instead of increment amount by 1 in each check... a little bit shorter/more concise.*/
      for (let [i, name] of currentSubStrs.entries()) {
        /*if (!currentSubStrs[i + 1]) didnt work for some reason...*/
        /*if (i == amount - 1) currentSubStrs[i] = currentSubStrs[i].replace(",", " and");
        maText += currentSubStrs[i];*/
        if (i == amount - 1) name = name.replace(",", " and");
        maText += name;
      }
      maText += " (M)";
      return maText;
    },
    getQuadBuildingEffect: function() { 
      if (!this.hasQuadUpg(2)) return (1).toFixed(2);
      else {
        let buildingMult = D(1.01).pow(D(this.player.buildings[0]).add(this.player.buildings[1]).add(this.player.buildings[2])).min(hasQuadUpg(12)?1e309:1e10);
        if(this.hasQuadUpg(12)&&buildingMult.gt(1e10))buildingMult=buildingMult.div(1e10).pow(0.1).mul(1e10);
        return buildingMult.toFixed(2);
      }
    },
    quadUpgs,
    sqrtUpgs,
    quadUpgText,
    sqrtUpgText,
    buyQuadUpg,
    buySqrtUpg,
    hasQuadUpg: function(id){
      return !!this.player.quadUpgs[id]
    },
    hasSqrtUpg: function(id){
      return !!this.player.sqrtUpgs[id]
    },
    changeTheme,
    themeList,
    themeNum,
    sacrifice,
    sacEffect,
    achNum,
    achs,
    allocateQuadUpgText,
    allocateSqrtUpgText,
    reBuyableCost(){
      return D(5).pow(this.player.sqrtUpgs[0]).mul(2).round()
    },
    sacrificeTxt(){
      let xtxt = `<span style="font-size:20px;color:blue;">${this.format(this.player.sacx,D(this.player.sacx).lt(1e9)?0:2)}</span> x (dividing y cost scaling by ${this.format(this.sacEffect('x'))})`
      let ytxt = `<span style="font-size:20px;color:blue;">${this.format(this.player.sacy,D(this.player.sacy).lt(1e9)?0:2)}</span> y (adding ${this.format(this.sacEffect('y'))} to g(x) and h(x) base)`
      if(!hasSqrtUpg(5))return xtxt + " and " + ytxt
      let x2txt = `<span style="font-size:20px;color:blue;">${this.format(this.player.sacx2,D(this.player.sacx2).lt(1e9)?0:2)}</span> x<sup>2</sup> (multiplying point gain by ${this.format(this.sacEffect('x2'))})`
      return xtxt + ", " + ytxt + ", and " + x2txt
    },
    changeSac(){
      let arr = ['x','y']
      if(hasSqrtUpg(5))arr.push('x2')
        
      let io = arr.indexOf(this.player.sacrificing)+1
      if(io>=arr.length)io=0
      this.player.sacrificing=arr[io]
    },
    sacrificeButtonTxt(){
      if(this.player.sacrificing=="x2")return "x<sup>2</sup>"
      return this.player.sacrificing
    }
  },
})

var changedQAdisplay = false

console.log("What are you doing here in the console?");

function format(x){ // Redefined from app.data
  return app.format(x)
}

app.quadUpgs[1].effect = () => app.getQuadBuildingEffect();
app.quadUpgs[3].effect = () => app.getQuadBuildingEffect();
app.quadUpgs[6].effect = () => app.getQuadBuildingEffect();

var mainGameLoop = window.setInterval(function() { // runs the loop 
  let diff = (Date.now()-app.player.timeSinceLastTick)/1000
  if(diff<60)loop(diff)
  else{
    app.player.timeBoost = diff
  }
  app.player.timeSinceLastTick=Date.now()
  
  if(app.player.buildings[0]>0.5&&!app.player.unlocks.includes("factory"))app.player.unlocks.push("factory")
  if(app.player.buildings[1]>0.5&&!app.player.unlocks.includes("portal"))app.player.unlocks.push("portal")
  if(app.player.buildings[2]>0.5&&!app.player.unlocks.includes("x"))app.player.unlocks.push("x")
  if(app.player.x>0.5&&!app.player.unlocks.includes(4))app.player.unlocks.push(4)
  if(app.player.y>0.5&&!app.player.unlocks.includes("quad"))app.player.unlocks.push("quad")
  if(app.player.x2>0.5&&!app.player.unlocks.includes(5))app.player.unlocks.push(5)
  //convertNumber()
}, 33);
//yes
function loop(diff) { // don't change this stuff unless you know what you're doing
  if (!(app.player.points instanceof Decimal)) app.player.points = D(app.player.points)
  app.player.timeBoost=Math.max(app.player.timeBoost-app.player.timeBoost*diff,1) //ok now points don't generate at all
  diff*=app.player.timeBoost
  
  app.player.pps = pointGain().pow(app.player.inSquareRoot?(hasSqrtUpg(7)?0.6:0.5):1)
  app.player.points = D(app.player.points).add(app.player.pps.times(diff))
  if(app.player.upgrades[5]) app.player.producedBuildings[0] = D(app.player.producedBuildings[0]).add(D(app.player.buildings[1]).add(D(app.player.producedBuildings[1])).times(diff))
  if(app.player.upgrades[5]) app.player.producedBuildings[1] = D(app.player.producedBuildings[1]).add(D(app.player.buildings[2]).add(D(app.player.producedBuildings[2])).times(diff))
  // note: produced buildings don't do anything yet!
  
  if(hasQuadUpg(4)||hasQuadUpg(5))app.player.timeSinceAutobuy+=diff*(hasQuadUpg(11)?D(app.player.x2).add(1).log10().add(1).toNumber():1)*(hasSqrtUpg(8)?4:1)
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
  
  for(let x=0;x<Math.ceil(Math.sqrt(achNum));x++){
    for(let y=0;y<Math.ceil(Math.sqrt(achNum));y++){
      if(app.player.achs.includes((x+1)*10+y+1)||!achs[x*Math.ceil(Math.sqrt(achNum))+y])continue;
      if(achs[x*Math.ceil(Math.sqrt(achNum))+y].complete() && !app.player.achs.includes(x*Math.ceil(Math.sqrt(achNum))+y))app.player.achs.push(x*Math.ceil(Math.sqrt(achNum))+y)
    }
  }
  
  let ele = document.getElementById("rebuyablecost")
  if(ele)ele.innerText = format(reBuyableCost())
  
  if(app.player.tab==5&&app.player.subtab.quadratic==1){
    quadUpgUpdateEffects.forEach(x=>{
      document.getElementById("quadUpgEffect"+x).innerText = format(quadUpgs[x].effect())
    })
  }
  
  if(app.player.tab==5&&app.player.subtab.quadratic==4){
    sqrtUpgUpdateEffects.forEach(x=>{
      let ele2 = document.getElementById("sqrtUpgEffect"+x)
      if(ele2)document.getElementById("sqrtUpgEffect"+x).innerText = format(sqrtUpgs[x].effect())
    })
  }
}

function pointGain(){
  let totalBuildingMult = D(1.01).pow(D(app.player.buildings[0]).add(app.player.buildings[1]).add(app.player.buildings[2])).min(hasQuadUpg(12)?1e309:1e10)
  if(hasQuadUpg(12)&&totalBuildingMult.gt(1e10))totalBuildingMult=totalBuildingMult.div(1e10).pow(0.1).mul(1e10)
  
  let b1 = D(app.player.buildings[0]).add(app.player.producedBuildings[0]).times(hasQuadUpg(1)?totalBuildingMult:1)
  let b2 = D(app.player.buildings[1]*10).add(app.player.producedBuildings[1]*10).times(hasQuadUpg(3)?totalBuildingMult:1)
  let b3 = D(app.player.buildings[2]*1000).times(hasQuadUpg(6)?totalBuildingMult:1)
  let buildings = b1.add(b2).add(b3)
  
  app.player.buildingGain=[b1,b2,b3]
  if(buildings.gt(0))app.player.buildingPercent=[b1.div(buildings).times(100),b2.div(buildings).times(100),b3.div(buildings).times(100)]
  else app.player.buildingPercent=[33.33,33.33,33.33]
  
  let mult = D(1)
  if(app.player.upgrades[1])mult=mult.times(2)
  if(app.player.upgrades[4])mult=mult.times(1000)
  for(let x=1;x<4;x++){
    mult=mult.times(funcEff(x))
  }
  if(hasQuadUpg(0))mult=mult.times(20).times(hasQuadUpg(13)?D(app.player.x2).add(1):1)
  if(hasSqrtUpg(3))mult=mult.times(D(app.player.rootEssence).plus(1).pow(10))
  
  let gain = buildings.times(mult)
  if(app.player.upgrades[6])gain=gain.pow(D(app.player.x).add(1).log10().times(D(app.player.y).add(1).log10()).div(100).add(1))
  gain = gain.times(sacEffect('x2'))
  if(hasSqrtUpg(10))mult=mult.times(sqrtUpgs[10].effect())
  if(D(app.player.points).gte("1e500"))gain=gain.div("1e500").pow(hasSqrtUpg(9)?0.6:0.5).mul("1e500");
  
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
  if(hasQuadUpg(7)&&(!type||type=="functions")){
    for(let i=3; i>0; i--) {
      if(costfunc(i).gte(app.player.points))continue;
      while (D(app.player.points).gte(costfunc(i))) {
        buyFunc(i);
      }
    }
  }

  for(let i=3; i>0; i--){
    if(type&&type!="buildings")break;
    if(cost(i).gt(app.player.points))continue;
    while (D(app.player.points).gte(cost(i))) {
      buy(i);
    }
  }
  
  if(type=="x"||!type){
    while(D(app.player.points).gte(app.xCost())){
      buyX();
    }
  }
  
  if((type=="y"||!type)&&D(app.player.x).gte(750)){
    while(D(app.player.x).gte(app.yCost())){
      buyY();
    }
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