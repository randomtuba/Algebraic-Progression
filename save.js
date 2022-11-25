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
    xUpgs: [],
    theme: true,
    totalx2: new Decimal(0),
    quadratics: new Decimal(0),
    quadUpgs: [],
    startingTime: Date.now(),
    lastTick: 0,
    autobuyers: [null,false,false,false,false,false,false,false,false,false,false],
    currentSubtab: ['upgrades','milestones'],
    sacX: new Decimal(0),
    sacY: new Decimal(0),
    sacX2: new Decimal(0),
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
    options: [true,true,true,true,true,true,false,true,true],
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
  let startTime = Date.now()
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
  console.log(Date.now()-startTime)
}

window.onload = function () {
  load();
  hasLoaded = true
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

function exportAsFile() {
  download("Algebraic Progression Save (" + fileStat() + ").txt",btoa(JSON.stringify(player)))
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
  player.currentSubtab = [player.currentSubtab,'milestones']
  player.prestigeTimes[2] = player.timePlayed
  player.options[7] = false
  $.notify('Your save is fixed!', {
    style: 'apcurrent',
    className:'saving',
  });
}