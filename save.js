var player = {};
let hasLoaded = false;
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
    prestigeTimes: [0,10000000,0,10000000],
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
    autobuyers: [null,false,false,false,false,false,false,false,false,false,false],
    currentSubtab: ['upgrades','milestones','stats'],
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
    chalExponents: [new Decimal(1),new Decimal(1)],
    achievements: [],
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
    ],
    abc: [null,new Decimal(0),new Decimal(0),new Decimal(0)],
    quadPower: new Decimal(0),
    quadBuyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
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
    compAutobuyers: [null,false,1,false,false,false,false,false],
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
    },
    newsMessagesSeen: 0,
    last10runs:{
      quadratic: [{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8}],
      complex: [{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8},{gain:new Decimal(0),time:1e8}],
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
      true, // ??????
      true, // Complex
      true, // ??????
    ],
    
    gameWon: false,
    winTime: 0,
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
  } else {
    player = Object.assign(
      start(),
      JSON.parse(decodeURIComponent(escape(atob(get))))
    );
    fixSave();
  }
  
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
  hasLoaded = true
  if(!player.options[1])player.lastTick = Date.now()
window.saveInterval = player.options[0] ? setInterval(save,30000) : 0
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
  } else if (player.compChalCompletions[1] > 0) {
    return ", " + formatWhole(ccTiers()) + " CC tiers"
  } else {
    return ""
  }
}

function exportAsFile() {
  download("Algebraic Progression Save (" + fileStat() + fileStat2() + ").txt",btoa(JSON.stringify(player)))
  $.notify('Save successfully exported as file!', {
    style: 'apcurrent',
    className:'saving',
  });
}

function importSave(imported = undefined) {
  if (imported === undefined) imported = prompt("Paste your save string in the input box below!");
  player = JSON.parse(atob(imported));
  save();
  window.location.reload();
  $.notify('Save Imported!', {
    style: 'apcurrent',
    className:'saving',
  });
}
function hardReset() {
  if (
    confirm(
      "Are you sure? It will reset EVERYTHING and you will not get any reward!"
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