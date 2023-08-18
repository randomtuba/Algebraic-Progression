var player = {};
var offline = {};
let hasLoaded = 0;
function start() {
  let a = {
    points: new Decimal(0),
    buyables: [
      null,
      new Decimal(0), // autoclickers
      new Decimal(0), // point factories
      new Decimal(0), // point portals
      new Decimal(0), // f(x)
      new Decimal(0), // g(x)
      new Decimal(0), // h(x)
      new Decimal(0), // produced autoclickers
      new Decimal(0), // produced factories
      new Decimal(0), // produced portals
    ],
    currentTab: 'gen',
    totalPoints: new Decimal(0),
    timePlayed: 0,
    prestigeTimes: [0,10000000,0,10000000,0,10000000],
    x: new Decimal(0),
    y: new Decimal(0),
    x2: new Decimal(0),
    z: new Decimal(0),
    xUpgs: [],
    theme: true,
    totalx2: new Decimal(0),
    quadratics: new Decimal(0),
    quadUpgs: [],
    startingTime: Date.now(),
    lastTick: 0,
    autobuyers: [null,false,false,false,false,false,false,false,false,false,false,false],
    currentSubtab: {0:'upgrades',1:'milestones',2:'stats',3:'upgrades',4:'regular',5:'main'},
    sacX: new Decimal(0),
    sacY: new Decimal(0),
    sacX2: new Decimal(0),
    sacZ: new Decimal(0),
    sacrifice: 'x',
    inputValue: 0,
    rootEssence: new Decimal(0),
    inSqrt: false,
    sqrtUpgs: [],
    doublers: new Decimal(0),
    sqrtDoublers: new Decimal(0),
    slope: new Decimal(0),
    b: new Decimal(0),
    buildingPercent: [null,0,0,0],
    challenge: 0,
    chalCompletions: [],
    chalExponents: {0:new Decimal(1),1:new Decimal(1),2:new Decimal(1)},
    achievements: [],
    secretAchievements: [],
    options: [
      true, // autosave (0)
      true, // offline progress (1)
      true, // hotkeys (2)
      true, // show news ticker (3)
      false, // respec CC on complex (4)
      true, // transformation type switch confirmation (5)
      false, // respec complex upgrades on complex (6)
      true, // quadratic confirmation (7)
      true, // complex confirmation (8)
      true, // inactive progress (9)
      false, // show presets (10)
      true, // y-quadratic confirmation (11)
      true, // passive generation (12)
      false, // respec charged x upgrades on y-quadratic (13)
      true, // title flickering (14)
      false, // show credits (15)
      false, // always show subtabs (16)
      true, // offline progress modal (17)
    ],
    abc: [null,new Decimal(0),new Decimal(0),new Decimal(0)],
    quadPower: new Decimal(0),
    quadBuyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    challengeEssence: new Decimal(0),
    epicenterLevel: "1",
    purchases: 75,
    hasCompletedLevel4: false,
    hasCompletedLevel5: false,
    sqrtEnters: 0,
    i: new Decimal(0),
    totali: new Decimal(0),
    complexes: new Decimal(0),
    compUpgs: [[],[],[0,0,0]],
    upgradePoints: [new Decimal(0),new Decimal(0)],
    compAutobuyers: [null,false,1,false,false,false,false,false,[false,false,false,false],false,false,false,false,false,false,false],
    inputValue2: 0,
    compPlane: [[null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],[null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]],
    triplers: new Decimal(0),
    compChalCompletions: [null,0,0,0,0,0,0,0,0,0,0],
    compChallenge: 0,
    unlocked: 0,
    bestPointsInSqrt: new Decimal(0),
    antiSlope: new Decimal(1),
    bankedQuadratics: new Decimal(0),
    transformations: {
      bought: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      names: [null,"Translations","Reflections","Rotations","Dilations"],
      activated: 0,
      extrusions: [],
    },
    newsMessagesSeen: 0,
    last10runs:{
      quadratic: [{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8}],
      complex: [{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8}],
      yQuadratic: [{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8}],
    },
    challengeRecords: [null,1e8,1e8,1e8,1e8,1e8,1e8,1e8,1e8,1e8,1e8],
    presets: {
      info: [null,"","","","","",""],
      names: [null,"Preset 1","Preset 2","Preset 3","Preset 4","Preset 5","Preset 6"],
      selected: 0,
    },
    tabDisplays: [
      null,
      true, // Generation
      true, // Options
      true, // Statistics
      true, // Achievements
      true, // Textbook
      true, // Upgrades
      true, // Quadratic
      true, // Y-Quadratic
      true, // Complex
      true, // Polynomials
    ],
    zUnlocked: false,
    y2: new Decimal(0),
    totaly2: new Decimal(0),
    yQuadratics: new Decimal(0),
    yQuadUpgs: [[],[]],
    zlab: {
      zpower: new Decimal(0),
      levels: [null,0,0,0,0],
      particles: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      empowerments: new Decimal(0),
      charged: 0,
    },
    imagPower: new Decimal(0),
    varSynth: {
      unlocked: [false,false,false,false],
      xy: new Decimal(0),
      totalxy: new Decimal(0),
      chargedXUpgs: [],
      x2y2: new Decimal(0),
      circles: new Decimal(0),
      iExp: new Decimal(0),
      revolutions: new Decimal(0),
      iExpBuyables: [null,new Decimal(0),new Decimal(0)],
    },
    inputValue3: 0,
    obtainedMilestones: [],
    yChalsUnlocked: [null,false,false,false,false],
    yChalCompletions: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    yChallenge: 0,
    extraUP: new Decimal(0),
    fourthRowCompUpgs: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    polynomials: {
      3: { amount: new Decimal(0), bought: new Decimal(0), },
      4: { amount: new Decimal(0), bought: new Decimal(0), },
      5: { amount: new Decimal(0), bought: new Decimal(0), },
      6: { amount: new Decimal(0), bought: new Decimal(0), },
      7: { amount: new Decimal(0), bought: new Decimal(0), },
      8: { amount: new Decimal(0), bought: new Decimal(0), },
      9: { amount: new Decimal(0), bought: new Decimal(0), },
      10: { amount: new Decimal(0), bought: new Decimal(0), boughtThisRun: false },
      buyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    },
    polyPower: new Decimal(0),
    synthEssence: new Decimal(0),
    inSynthDiv: false,
    synthDivUpgs: [[null,new Decimal(0),new Decimal(0),new Decimal(0)],[]],
    bestPointsInSynthDiv: new Decimal(0),
    synthDivEnters: 0,
    newsSpeed: 1,
    autosaveInterval: 30000,
    notation: 1,
    
    viewedEndingCutscene: false,
    gameWon: false,
    winTime: 0,
    gamePoints: new Decimal(0),
    totalGP: new Decimal(0),
    speedrunMode: false,
    speedrunData: {0:[1e8,false],1:[1e8,false],2:[1e8,false],3:[1e8,false],4:[1e8,false],5:[1e8,false],6:[1e8,false],7:[1e8,false],8:[1e8,false],9:[1e8,false],10:[1e8,false],11:[1e8,false],12:[1e8,false],13:[1e8,false],14:[1e8,false],15:[1e8,false],16:[1e8,false],17:[1e8,false]},
    speedrunTimer: 0,
    permUpgs: [],
  };
  return a;
}

function save() {
  localStorage.setItem("idk", btoa(JSON.stringify(player)));
  $.notify('Game Saved', {
    style: 'apcurrent',
    className:'saving',
  });
}
function fixSave() {
  let defaultData = start();

  fixData(defaultData, player);
}

function fixData(defaultData, newData) {
  for (item in defaultData) {
    if (defaultData[item] == null) {
      if (newData[item] === undefined) newData[item] = null;
    } else if (Array.isArray(defaultData[item])) {
      if (newData[item] === undefined) newData[item] = defaultData[item];
      else fixData(defaultData[item], newData[item]);
    } else if (defaultData[item] instanceof Decimal) {
      // Convert to Decimal
      if (newData[item] === undefined) newData[item] = defaultData[item];
      else newData[item] = new Decimal(newData[item]);
    } else if (!!defaultData[item] && typeof defaultData[item] === "object") {
      if (newData[item] === undefined || typeof defaultData[item] !== "object")
        newData[item] = defaultData[item];
      else fixData(defaultData[item], newData[item]);
    } else {
      if (newData[item] === undefined) newData[item] = defaultData[item];
    }
  }
}
function load() {
  let get = localStorage.getItem("idk");

  if (get === null || get === undefined) {
    player = start();
    offline = start();
  } else {
    player = Object.assign(
      start(),
      JSON.parse(/*decodeURIComponent(escape(*/atob(get)/*))*/)
    );
    offline = Object.assign(
      start(),
      JSON.parse(/*decodeURIComponent(escape(*/atob(get)/*))*/)
    );
    fixSave();
  }
  maskChangelog()
  
  document.getElementById("style").href = player.theme ? "style.css" : "style-dark.css";
  $.notify.addStyle('apcurrent', {
    html: "<div><span data-notify-text/></div>",
    classes: {
      saving: {
        "white-space": "nowrap",
        "background-color": "lightblue",
        "color": "black",
        "padding": "5px",
        "border-radius": "5px",
        "border-color":"black",
      },
      achieves: {
        "white-space": "nowrap",
        "background-color": "#d1c700",
        "color": "black",
        "padding": "5px",
        "border-radius": "5px",
        "border-color":"black",
      },
      unlock: {
        "white-space": "nowrap",
        "background-color": "#5eff79",
        "color": "black",
        "padding": "5px",
        "border-radius": "5px",
        "border-color":"black",
      },
      secretAchieves: {
        "white-space": "nowrap",
        "background-color": "#deadff",
        "color": "black",
        "padding": "5px",
        "border-radius": "5px",
        "border-color":"black",
      },
    }
  });
  app = new Vue({
    el: "#app",
    data: {
      player,
      Decimal,
      format,
      tmp,
    },
  });
s = document.getElementById("news");
  scrollNextMessage();
  $.notify('Game Loaded', {
    style: 'apcurrent',
    className:'saving',
  });
}

window.onload = function () {
  load();
  hasLoaded = 1
  if(!player.options[1])player.lastTick = Date.now()
window.saveInterval = player.options[0] ? setInterval(save,player.autosaveInterval) : 0
}

function adjustAutosaveInterval() {
  let x = prompt("Enter the autosave interval that you want in the input box below! (minimum 10s, maximum 300s, input gets rounded down)")
  player.autosaveInterval = Math.floor(Math.max(Math.min(new Decimal(x).toNumber(),300),10)) * 1000
  save();
  window.location.reload();
}

function exportSave() {
  let str = btoa(JSON.stringify(player));
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(el);
  $.notify('Save successfully copied to clipboard!', {
    style: 'apcurrent',
    className:'saving',
  });
}

function fileStat() {
  if (player.totalx2.eq(0) && player.totali.eq(0)) {
    return format(player.points) + " points"
  } else if (player.totali.eq(0)) {
    return format(player.x2) + " x²"
  } else {
    return format(player.i) + " i"
  }
}

function fileStat2() {
  if (player.totalx2.gt(0) && !hasQU(16)) {
    return ", " + formatWhole(player.quadratics) + " Quadratics"
  } else if (hasQU(16) && !hasQU(20)) {
    return ", " + format(player.rootEssence) + " RE"
  } else if (hasQU(20) && !hasSU(16)) {
    return ", " + format(player.quadPower) + " QP"
  } else if (hasSU(16) && player.complexes.eq(0)) {
    return ", " + format(player.challengeEssence) + " CE"
  } else if (player.complexes.gte(1) && player.complexes.lt(20)) {
    return ", " + formatWhole(player.complexes) + " Complexes"
  } else if (player.complexes.gte(20) && player.compChalCompletions[1] == 0) {
    return ", " + formatWhole(player.upgradePoints[1]) + " UP"
  } else if (player.compChalCompletions[1] > 0 && !player.zUnlocked) {
    return ", " + formatWhole(ccTiers()) + " CC tiers"
  } else if (player.zUnlocked && !hasYQU(8,'bought')) {
    return ", " + formatWhole(player.y2) + " y²"
  } else if (hasYQU(8,'bought') && !player.varSynth.unlocked[0]) {
    return ", " + formatWhole(totalColliderLevels()) + " total Z-Collider levels"
  } else if (player.varSynth.unlocked[0] && ccTiers() < 50) {
    return ", " + formatWhole(ccTiers()) + " CC tiers"
  } else if (ccTiers() >= 50 && player.polynomials[6].bought.eq(0)) {
    return ", " + format(player.polyPower) + " PP"
  } else if (player.polynomials[6].bought.gte(1) && player.totalPoints.lt("1e5e8")) {
    return ", " + formatWhole(player.synthEssence) + " SE"
  } else if (player.totalPoints.gte("1e5e8")) {
    return ", Game Completed"
  } else {
    return ""
  }
}

function exportAsFile() {
  download("AP Save (" + fileStat() + fileStat2() + ").txt",btoa(JSON.stringify(player)))
  if(player.points.lte(25) && !hasSecretAchievement(8)) {
    player.secretAchievements.push('8')
      $.notify("Secret Achievement Unlocked: Remarkable Progress", {
        style: 'apcurrent',
        className:'secretAchieves',
      });
  }
  $.notify('Save successfully exported as file!', {
    style: 'apcurrent',
    className:'saving',
  });
}

function importSave(imported = undefined) {
  if (imported === undefined) imported = prompt("Paste your save string in the input box below!");
  if(imported === "your save string" && !hasSecretAchievement(3)){
    player.secretAchievements.push('3')
      $.notify("Secret Achievement Unlocked: Following Directions", {
        style: 'apcurrent',
        className:'secretAchieves',
      });
  }
  player = JSON.parse(atob(imported));
  fixSave();
  save();
  window.location.reload();
  $.notify('Save Imported!', {
    style: 'apcurrent',
    className:'saving',
  });
}

function importAsFile() {
  document.getElementById("file-upload").files[0].text().then(txt=>importSave(txt))
}

function hardReset() {
  if (
    confirm(
      "Are you sure? It will reset EVERYTHING (even postgame content) and you will not get any reward!"
    )
  ) {
    player = start();
    window.location.reload();
    player.startingTime = Date.now()
    save();
  }
}

function fixOldSave() {
  player.currentSubtab = ['upgrades','milestones']
  player.prestigeTimes[2] = player.timePlayed
  player.options[7] = false
  $.notify('Your save is fixed!', {
    style: 'apcurrent',
    className:'saving',
  });
}

function maskChangelog() {
  if(player.zUnlocked) {
    document.getElementById("info1").style.display = ''
  } else {
    document.getElementById("info1").style.display = 'none'
  }
}

function playAgain(force) {
  if(force || confirm("Are you sure? You will lose everything except for Secret Achievements and Options! (You will also gain 1 game point on reset)")) {
    player.gamePoints = player.gamePoints.add(1)
    player.totalGP = player.totalGP.add(1)
    player.points = new Decimal(0)
    player.buyables =
    [null,
      new Decimal(0), // autoclickers
      new Decimal(0), // point factories
      new Decimal(0), // point portals
      new Decimal(0), // f(x)
      new Decimal(0), // g(x)
      new Decimal(0), // h(x)
      new Decimal(0), // produced autoclickers
      new Decimal(0), // produced factories
      new Decimal(0), // produced portals
    ]
    player.currentTab = 'gen'
    player.totalPoints = new Decimal(0)
    player.timePlayed = 0
    player.prestigeTimes = [0,10000000,0,10000000,0,10000000]
    player.x = new Decimal(0)
    player.y = new Decimal(0)
    player.x2 = new Decimal(0)
    player.z = new Decimal(0)
    player.xUpgs = []
    player.totalx2 = new Decimal(0)
    player.quadratics = new Decimal(0)
    player.quadUpgs = []
    player.startingTime = Date.now()
    player.lastTick = 0
    player.autobuyers = [null,false,false,false,false,false,false,false,false,false,false,false]
    player.currentSubtab = {0:'upgrades',1:'milestones',2:'stats',3:'upgrades',4:'regular',5:'main'}
    player.sacX = new Decimal(0)
    player.sacY = new Decimal(0)
    player.sacX2 = new Decimal(0)
    player.sacZ = new Decimal(0)
    player.sacrifice = 'x'
    player.inputValue = 0
    player.rootEssence = new Decimal(0)
    player.inSqrt = false
    player.sqrtUpgs = []
    player.doublers = new Decimal(0)
    player.sqrtDoublers = new Decimal(0)
    player.slope = new Decimal(0)
    player.b = new Decimal(0)
    player.buildingPercent = [null,0,0,0]
    player.challenge = 0
    player.chalCompletions = []
    player.chalExponents = {0:new Decimal(1),1:new Decimal(1),2:new Decimal(1)}
    player.achievements = []
    player.abc = [null,new Decimal(0),new Decimal(0),new Decimal(0)]
    player.quadPower = new Decimal(0)
    player.quadBuyables = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    player.challengeEssence = new Decimal(0)
    player.epicenterLevel = "1"
    player.purchases = 75
    player.hasCompletedLevel4 = false
    player.hasCompletedLevel5 = false
    player.sqrtEnters = 0
    player.i = new Decimal(0)
    player.totali = new Decimal(0)
    player.complexes = new Decimal(0)
    player.compUpgs = [[],[],[0,0,0]]
    player.upgradePoints = [new Decimal(0),new Decimal(0)]
    player.compAutobuyers = [null,false,1,false,false,false,false,false,[false,false,false,false],false,false,false,false,false,false,false]
    player.inputValue2 = 0
    player.compPlane = [[null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],[null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]]
    player.triplers = new Decimal(0)
    player.compChalCompletions = [null,0,0,0,0,0,0,0,0,0,0]
    player.compChallenge = 0
    player.unlocked = 0
    player.bestPointsInSqrt = new Decimal(0)
    player.antiSlope = new Decimal(1)
    player.bankedQuadratics = new Decimal(0)
    player.transformations = {
      bought: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      names: [null,"Translations","Reflections","Rotations","Dilations"],
      activated: 0,
      extrusions: [],
    }
    player.newsMessagesSeen = 0
    player.last10runs = {
      quadratic: [{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8}],
      complex: [{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8}],
      yQuadratic: [{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8}],
    }
    player.challengeRecords = [null,1e8,1e8,1e8,1e8,1e8,1e8,1e8,1e8,1e8,1e8]
    player.presets = {
      info: [null,"","","","","",""],
      names: [null,"Preset 1","Preset 2","Preset 3","Preset 4","Preset 5","Preset 6"],
      selected: 0,
    }
    player.tabDisplays = [
      null,
      true, // Generation
      true, // Options
      true, // Statistics
      true, // Achievements
      true, // Textbook
      true, // Upgrades
      true, // Quadratic
      true, // Y-Quadratic
      true, // Complex
      true, // ??????
    ]
    player.zUnlocked = false
    player.y2 = new Decimal(0)
    player.totaly2 = new Decimal(0)
    player.yQuadratics = new Decimal(0)
    player.yQuadUpgs = [[],[]]
    player.zlab = {
      zpower: new Decimal(0),
      levels: [null,0,0,0,0],
      particles: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      empowerments: new Decimal(0),
      charged: 0,
    }
    player.imagPower = new Decimal(0)
    player.varSynth = {
      unlocked: [false,false,false,false],
      xy: new Decimal(0),
      totalxy: new Decimal(0),
      chargedXUpgs: [],
      x2y2: new Decimal(0),
      circles: new Decimal(0),
      iExp: new Decimal(0),
      revolutions: new Decimal(0),
      iExpBuyables: [null,new Decimal(0),new Decimal(0)],
    }
    player.inputValue3 = 0
    player.obtainedMilestones = []
    player.yChalsUnlocked = [null,false,false,false,false]
    player.yChalCompletions = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    player.yChallenge = 0
    player.extraUP = new Decimal(0)
    player.fourthRowCompUpgs = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    player.polynomials = {
      3: { amount: new Decimal(0), bought: new Decimal(0), },
      4: { amount: new Decimal(0), bought: new Decimal(0), },
      5: { amount: new Decimal(0), bought: new Decimal(0), },
      6: { amount: new Decimal(0), bought: new Decimal(0), },
      7: { amount: new Decimal(0), bought: new Decimal(0), },
      8: { amount: new Decimal(0), bought: new Decimal(0), },
      9: { amount: new Decimal(0), bought: new Decimal(0), },
      10: { amount: new Decimal(0), bought: new Decimal(0), boughtThisRun: false },
      buyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    }
    player.polyPower = new Decimal(0)
    player.synthEssence = new Decimal(0)
    player.inSynthDiv = false
    player.synthDivUpgs = [[null,new Decimal(0),new Decimal(0),new Decimal(0)],[]]
    player.bestPointsInSynthDiv = new Decimal(0)
    player.synthDivEnters = 0
    player.viewedEndingCutscene = false
    player.gameWon = false
    player.winTime = 0
    document.title = "Algebraic Progression v2.3"
    save()
    location.reload()
  }
}

function restartRun() {
  if(confirm("Are you sure? You will lose everything except for Secret Achievements and Options!")) {
    if(confirm("Would you like to enter Speedrun Mode? (Click OK for Yes, click Cancel for No)")) {
      player.speedrunMode = true
    }
    player.gamePoints = player.gamePoints.sub(1)
    player.totalGP = player.totalGP.sub(1)
    playAgain(true)
  }
}