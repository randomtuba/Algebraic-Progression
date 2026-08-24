/*
Welcome to save.js! This is how the "Saving" portion of the Options tab actually work. In here you will find:
- The player object, containing all variables that are stored in your browser
- Saving and loading!
- Import and export!
- File import and export!
- Offline progress!
- Autosave!
- Soft and hard reset! (soft reset meaning getting 1 game point)
*/

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
    gameTimePlayed: new Decimal(0),
    prestigeTimes: [0,100000000,0,100000000,0,100000000,0,100000000,0,100000000],
    gamePrestigeTimes: [new Decimal(0),new Decimal(9e15),new Decimal(0),new Decimal(9e15),new Decimal(0),new Decimal(9e15),new Decimal(0),new Decimal(9e15),new Decimal(0),new Decimal(9e15)],
    x: new Decimal(0),
    y: new Decimal(0),
    x2: new Decimal(0),
    z: new Decimal(0),
    w: new Decimal(0),
    xUpgs: [],
    theme: true,
    totalx2: new Decimal(0),
    quadratics: new Decimal(0),
    quadUpgs: [],
    startingTime: Date.now(),
    lastTick: 0,
    autobuyers: [null,false,false,false,false,false,false,false,false,false,false,false],
    currentSubtab: {0:'upgrades',1:'milestones',2:'stats',3:'upgrades',4:'regular',5:'main',6:'sets',7:'functions'},
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
      true, // challenge header (12)
      false, // respec charged x upgrades on y-quadratic (13)
      true, // title flickering (14)
      false, // respec number set slots on integration / respec fractal arm on mandelbrot (15)
      false, // always show subtabs (16)
      true, // offline progress modal (17)
      true, // temporal plane active (18)
      true, // integration confirmation (19)
      true, // automatic complex challenge completion (20)
      true, // autobuy charged x upgrades (21)
      true, // CU respec confirmation (22)
      true, // sinusoidal confirmation (23)
      false, // show number set presets (24)
      false, // hide completed achievement rows (25)
      false, // override hypercomplex subtabs (26)
      false, // respec hypercomplex upgrades on integration/sinusoidal (27)
      false, // show hypercomplex upgrade presets (28)
      false, // respec charged quadratic upgrades on integration/sinusoidal (29)
      false, // hide obscured achievement rows (30)
      true, // permanent upgrades active (31)
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
      quadratic: [{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)}],
      complex: [{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)}],
      yQuadratic: [{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)}],
      integration: [{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)}],
      sinusoidal: [{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)}],
      tabOpens: [true,true,true,true,true],
    },
    challengeRecords: [null,1e8,1e8,1e8,1e8,1e8,1e8,1e8,1e8,1e8,1e8],
    presets: {
      info: [null,"","","","","","","","","","","","","","","","","","","","","","","",""],
      names: [null,"Preset 1","Preset 2","Preset 3","Preset 4","Preset 5","Preset 6","Preset 1","Preset 2","Preset 3","Preset 4","Preset 5","Preset 6","Preset 1","Preset 2","Preset 3","Preset 4","Preset 5","Preset 6","Preset 1","Preset 2","Preset 3","Preset 4","Preset 5","Preset 6"],
      selected: 0,
      selected2: 0,
      selected3: 0,
    },
    tabDisplays: [
      null,
      true, // Generation
      true, // Options
      true, // Statistics
      true, // Achievements
      true, // Textbook
      true, // Upgrades
      true, // Quadratic/Resetting
      true, // Y-Quadratic
      true, // Complex
      true, // Polynomials/Automation
      true, // Integration/Mandelbrot
      true, // Sinusoidal
    ],
    subtabDisplays: {
      0: [true,true,true,true,true], // Quadratic
      1: [true,true,true,true,true,true], // Complex
      2: [true,true,true,true], // Statistics
      3: [true,true,true,true], // Y-Quadratic
      4: [true,true,true], // Achievements
      5: [true,true], // Polynomials
      6: [true,true,true,true,true,true,true], // Integration
      7: [true,true,true,true], // Sinusoidal
    },
    zUnlocked: false,
    y2: new Decimal(0),
    totaly2: new Decimal(0),
    yQuadratics: new Decimal(0),
    yQuadUpgs: [[],[]],
    zlab: {
      zpower: new Decimal(0),
      levels: [null,0,0,0,0,0],
      particles: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
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
      iExpBuyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    },
    inputValue3: 0,
    obtainedMilestones: [],
    yChalsUnlocked: [null,false,false,false,false],
    yChalCompletions: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    yChallenge: 0,
    extraUP: new Decimal(0),
    fourthRowCompUpgs: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    polynomials: {
      2: { amount: new Decimal(0) },
      3: { amount: new Decimal(0), bought: new Decimal(0), },
      4: { amount: new Decimal(0), bought: new Decimal(0), },
      5: { amount: new Decimal(0), bought: new Decimal(0), },
      6: { amount: new Decimal(0), bought: new Decimal(0), },
      7: { amount: new Decimal(0), bought: new Decimal(0), },
      8: { amount: new Decimal(0), bought: new Decimal(0), },
      9: { amount: new Decimal(0), bought: new Decimal(0), },
      10: { amount: new Decimal(0), bought: new Decimal(0), boughtThisRun: false },
      buyables: player.inLostIntegration ? Array(24).fill(new Decimal(0)) : [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
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
    integration: {
      dx: new Decimal(0),
      totaldx: new Decimal(0),
      holes: new Decimal(0),
      emptySets: new Decimal(0),
      rebuyableUpgrades: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      upgrades: {
        prod: [],
        qol: [],
        unlocked: [],
      },
      assignedSets: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      effectSlots: [2,2],
      typeSlots: [1,1],
      active: {effects: [], types: []},
      autobuyers: {
        upgradePoints: false,
        compUpgs: false,
        zColliders: {2:false,3:false,4:false,5:false},
        zEmpowerments: false,
        yQuadraticAutomatorMode: 0,
        polynomials: {3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},
        polyBuyables: false,
        synthDivUpgs: {1:false,2:false,3:false},
        integration: false,
        autoIntegrationMode: 0,
        xy: false,
        polyFactoring: false,
        temporalPlane: [false,false,false,false,false],
        rebuyableIntegUpgs: false,
        distributeSets: false,
        setSacrifice: false,
        numberSetAutoModes: [100,0],
        sinusoidal: false,
        autoSinusoidalMode: false,
        trigFunctions: [null,false,false,false,false,false,false],
        derivativeFunctions: [null,false,false,false],
        derivativeBuyables: false,
        yPolynomials: {3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},
        w: false,
        singularityUpgs: false,
        unitCircleUpgs: false,
        autoAdjust: false,
        pythTriplesBuyables: false,
      },
      temporalPlane: {
        unlocked: false,
        buyables: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
        powers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
        timeJumpDuration: 0,
        timeJumpCooldown: 0,
        assigned: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      },
      automationCore: {
        running: false,
        inputs: {
          loadCompUpgs: true,
          autoCCSweep: true,
          startCCSweepReq: new Decimal("1e20000"),
          enterSynthDiv: true,
          synthDivIReq1: new Decimal("1e40000"),
          synthDivSEReq1: new Decimal(1e9),
          synthDivIReq2: new Decimal("1e500000"),
          synthDivSEReq2: new Decimal(1e35),
          grindQuadratics: false,
          grindQuadraticsReq: new Decimal("1e500000"),
        },
      },
      seBuyableCounter: new Decimal(0),
      sdu1Counter: new Decimal(0),
      autoCCTimer: Infinity,
      setSacrificeValues: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      limitScore: new Decimal(0),
      inTheLimit: false,
      limitEnters: 0,
      challengeFactors: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      factorsUnlocked: [1,3],
      convergenceGoal: 0,
      usedComplexUpgrades: false,
      polyFactoringMult: new Decimal(1),
      chalCompletions: [null,[],0,0,0,0,[],0,0,[null,120,120,120,120,120,120]],
      challenge: 0,
      ic1Settings: [0,0],
      activations: Infinity,
      upgsActiveInIC3: [],
      derivatives: {
        0: new Decimal(0),
        1: new Decimal(0),
        2: new Decimal(0),
        3: new Decimal(0),
        highestReached: new Decimal(0),
        functions: [null,new Decimal(0),new Decimal(0),new Decimal(0)],
        buyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      },
      boughtBuildings: false,
      ic4Prestiges: [false,false,false],
      ic6Timer: 0,
      ic6Version: 0,
      autocoreTicks: 0,
    },
    integrations: new Decimal(0),
    totalPointsThisIntegration: new Decimal(0),
    inputValue4: 0,
    sinusoidals: new Decimal(0),
    triangles: new Decimal(0),
    totalTriangles: new Decimal(0),
    trigFunctions: {
      waves: new Decimal(0),
      buyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      powers: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    },
    sinUpgrades: [null,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    inputValue5: 0,
    unitCircle: {
      unlocked: false,
      quadrant: 0,
      purchases: [new Decimal(0),new Decimal(0)],
    },
    yPolynomials: {
      unlocked: false,
      3: { amount: new Decimal(0), bought: new Decimal(0), },
      4: { amount: new Decimal(0), bought: new Decimal(0), },
      5: { amount: new Decimal(0), bought: new Decimal(0), },
      6: { amount: new Decimal(0), bought: new Decimal(0), },
      7: { amount: new Decimal(0), bought: new Decimal(0), },
      8: { amount: new Decimal(0), bought: new Decimal(0), },
      9: { amount: new Decimal(0), bought: new Decimal(0), },
      10: { amount: new Decimal(0), bought: new Decimal(0) },
      buyables: Array(16).fill(new Decimal(0)),
    },
    yPolyPower: new Decimal(0),
    pythTriples: {
      unlocked: false,
      essence: new Decimal(0),
      def: [null,new Decimal(0),new Decimal(0),new Decimal(0)],
      buyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      barsUnlocked: [null,false,false,false],
      bars: [null,new Decimal(0),new Decimal(0),new Decimal(0)],
      barFilling: 0,
    },
    wUnlocked: false,
    j: new Decimal(0),
    k: new Decimal(0),
    obtainedAlterations: [],
    hypercompUpgs: {
      dynamic: [],
      basic: [],
      purchases: [0,0,0],
    },
    quaternions: [new Decimal(0),new Decimal(0)],
    parabolas: new Decimal(0),
    extraQuaternions: new Decimal(0),
    hypercompFlune: {
      currencies: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      powers: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    },
    y2z2: {
      amount: new Decimal(0),
      total: new Decimal(0)
    },
    chargedQuadUpgs: [],
    inLostIntegration: false,
    dailyAchievements: [[],[]],
    
    viewedEndingCutscene: false,
    gameWon: false,
    winTime: 0,
    gamePoints: new Decimal(0),
    totalGP: new Decimal(0),
    speedrunMode: false,
    speedrunData: {0:[1e8,false],1:[1e8,false],2:[1e8,false],3:[1e8,false],4:[1e8,false],5:[1e8,false],6:[1e8,false],7:[1e8,false],8:[1e8,false],9:[1e8,false],10:[1e8,false],11:[1e8,false],12:[1e8,false],13:[1e8,false],14:[1e8,false],15:[1e8,false],16:[1e8,false],17:[1e8,false],18:[1e8,false],19:[1e8,false],20:[1e8,false],21:[1e8,false],22:[1e8,false],23:[1e8,false],24:[1e8,false],25:[1e8,false],26:[1e8,false],27:[1e8,false],28:[1e8,false],29:[1e8,false],30:[1e8,false],31:[1e8,false],32:[1e8,false],33:[1e8,false],34:[1e8,false],35:[1e8,false],36:[1e8,false],37:[1e8,false],38:[1e8,false],39:[1e8,false],40:[1e8,false],41:[1e8,false],42:[1e8,false],43:[1e8,false],44:[1e8,false],45:[1e8,false],46:[1e8,false],47:[1e8,false],48:[1e8,false],49:[1e8,false]},
    speedrunTimer: 0,
    permUpgs: [],
  };
  return a;
}

function save(num = localStorage.getItem("APSaveMetaData")) {
  player.saveSlot = num // Store the current save slot in player
  localStorage.setItem("APSaveSlot" + num, btoa(JSON.stringify(player)));
  localStorage.setItem("APSaveMetaData", num); // Store the last used save slot
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
function load(num) {
  let get = localStorage.getItem("APSaveSlot" + num);

  if (get === null || get === undefined) {
    player = start();
    offline = start();
    player.saveSlot = num
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
      dailyAchieves: {
        "white-space": "nowrap",
        "background-color": "#ff9900",
        "color": "black",
        "padding": "5px",
        "border-radius": "5px",
        "border-color":"black",
      },
    }
  });
  // const panzoom = new Panzoom(document.getElementById("upgrade-tree"), {
  //   // canvas: true,
  //   maxScale: 2,
  //   minScale: .25,
  //   excludeClass: "no-pz",
  //   // get exclude() {
  //   //   return Array.from(document.querySelectorAll(".tree-btn"));
  //   // },
  // });
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
  $.notify(`Game Loaded (Save Slot ${num})`, {
    style: 'apcurrent',
    className:'saving',
  });
}

window.onload = function () {
  // Get the last used save slot from localStorage, default to 1 if not found
  if(localStorage.getItem("APSaveMetaData") === null || localStorage.getItem("APSaveMetaData") === undefined || isNaN(localStorage.getItem("APSaveMetaData"))) {
    localStorage.setItem("APSaveMetaData",1)
  }
  
  load(localStorage.getItem("APSaveMetaData"));
  hasLoaded = 1
  if(!player.options[1])player.lastTick = Date.now()
window.saveInterval = player.options[0] ? setInterval(save,player.autosaveInterval) : 0

  if(localStorage.getItem("idk") != null && localStorage.getItem("idk").length >= 1000 && player.points.lt(1000)) {
    localStorage.setItem("APSaveSlot1",localStorage.getItem("idk"));
    localStorage.setItem("APSaveMetaData",1)
    localStorage.setItem("idk",null)
    load(1)
    location.reload()
  }
  
  setTimeout(() => {
    panzoom(document.querySelector("#upgrade-tree"), { maxScale: 3, minScale: 0.25 });
    panzoom(document.querySelector("#upgrade-tree-2"), { maxScale: 3, minScale: 0.25, startX: 1000, startY: 1000 });
  }, 500)
}

function adjustAutosaveInterval() {
  let x = prompt("Enter the autosave interval that you want in the input box below! (minimum 10s, maximum 300s, input gets rounded down)")
  if(new Decimal(x).isNan()) return
  player.autosaveInterval = Math.floor(Math.max(Math.min(new Decimal(x).toNumber(),300),10)) * 1000
  save(localStorage.getItem("APSaveMetaData"));
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
  if (player.totalx2.eq(0) && player.totali.eq(0) && player.integrations.eq(0)) {
    return format(player.points) + " points"
  } else if (player.totali.eq(0) && player.integrations.eq(0)) {
    return format(player.x2) + (player.inLostIntegration ? " RP" : " x²")
  } else if (player.integrations.eq(0)) {
    return format(player.i) + " i"
  } else {
    return format(player.integration.dx) + (player.inLostIntegration ? " ME" : " dx")
  }
}

function fileStat2() {
  if(!player.inLostIntegration) {
    if(player.totalx2.gt(0) && !hasQU(16) && player.totali.lt(1) && player.integrations.lt(1)) {
      return ", " + formatWhole(player.quadratics) + " Quadratics"
    } else if (hasQU(16) && !hasQU(20) && player.totali.lt(1) && player.integrations.lt(1)) {
      return ", " + format(player.rootEssence) + " RE"
    } else if (hasQU(20) && !hasSU(16) && player.totali.lt(1) && player.integrations.lt(1)) {
      return ", " + format(player.quadPower) + " QP"
    } else if (hasSU(16) && player.complexes.eq(0) && player.totali.lt(1) && player.integrations.lt(1)) {
      return ", " + format(player.challengeEssence) + " CE"
    } else if (player.complexes.gte(1) && player.complexes.lt(20) && player.integrations.lt(1)) {
      return ", " + formatWhole(player.complexes) + " Complexes"
    } else if (player.complexes.gte(20) && player.compChalCompletions[1] == 0 && player.integrations.lt(1)) {
      return ", " + formatWhole(player.upgradePoints[1]) + " UP"
    } else if (player.compChalCompletions[1] > 0 && !player.zUnlocked && player.integrations.lt(1)) {
      return ", " + formatWhole(ccTiers()) + " CC tiers"
    } else if (player.zUnlocked && !hasYQU(8,'bought') && player.integrations.lt(1)) {
      return ", " + formatWhole(player.y2) + " y²"
    } else if (hasYQU(8,'bought') && !player.varSynth.unlocked[0] && player.integrations.lt(1)) {
      return ", " + formatWhole(totalColliderLevels()) + " total Z-Collider levels"
    } else if (player.varSynth.unlocked[0] && ccTiers() < 50 && player.integrations.lt(1)) {
      return ", " + formatWhole(ccTiers()) + " CC tiers"
    } else if (ccTiers() >= 50 && player.polynomials[6].bought.eq(0) && player.integrations.lt(1)) {
      return ", " + format(player.polyPower) + " PP"
    } else if (player.polynomials[6].bought.gte(1) && player.integrations.lt(1)) {
      return ", " + format(player.synthEssence) + " SE"
    } else if (player.integrations.gte(1) && player.integrations.lt(40)) {
      return ", " + formatWhole(player.integrations) + " Integrations"
    } else if (player.integrations.gte(40) && !IntegrationUpgrades.integration4.isBought()) {
      return ", " + format(player.integration.emptySets) + " empty sets"
    } else if (IntegrationUpgrades.integration4.isBought() && player.totalTriangles.lt(1)) {
      return ", " + format(player.integration.limitScore) + " limit score"
    } else if (player.totalTriangles.gte(1) && player.integration.chalCompletions[3] < 10) {
      return ", " + format(player.triangles) + " triangles"
    } else if (player.integration.chalCompletions[3] >= 10 && !player.pythTriples.unlocked) {
      return ", " + format(player.integration.derivatives[0]) + " derivatives"
    } else if (player.pythTriples.unlocked && !player.wUnlocked) {
      return ", " + format(player.pythTriples.essence) + " PE"
    } else if (player.wUnlocked && !Alterations.has(2)) {
      return ", " + formatWhole(player.w) + " w"
    } else if (Alterations.has(2)) {
      return ", " + format(player.j) + " j"
    } else {
      return ""
    }
  } else {
    if (hasQU(15) && !hasQU(23) && player.totali.lt(1) && player.integrations.lt(1)) {
      return ", " + format(player.challengeEssence) + " square roots"
    } else if (hasQU(23) && player.totali.lt(1) && player.integrations.lt(1)) {
      return ", " + formatWhole(player.imagPower) + " total GS"
    } else if (player.totali.gte(1) && !hasComplexMilestoneLI(12) && player.integrations.lt(1)) {
      return ", " + formatWhole(player.complexes) + " Complexes"
    } else if (hasComplexMilestoneLI(12) && ccTiers() < 1 && player.integrations.lt(1)) {
      return ", " + formatWhole(player.upgradePoints[1]) + " UP"
    } else if (ccTiers() >= 1 && !player.zUnlocked && player.integrations.lt(1)) {
      return ", " + formatWhole(ccTiers()) + " CC tiers"
    } else if (player.zUnlocked && !hasYQU(8,'lost') && player.integrations.lt(1)) {
      return ", " + format(player.y2) + " y²"
    } else if (hasYQU(8,'lost') && ccTiers() < 24 && player.integrations.lt(1)) {
      return ", " + format(player.zlab.zpower) + " Z-Power"
    } else if (ccTiers() >= 24 && player.integrations.lt(1)) {
      return ", " + format(XPowers.xPowerProduct()) + " X Power Product"
    } else if (player.integrations.gte(1) && !FractalArm.hasUpgrade(221)) {
      return ", " + format(player.quaternions[0]) + " fractal spirals"
    } else if (FractalArm.hasUpgrade(221)) {
      return ", Game Completed"
    } else {
      return ""
    }
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
  save(localStorage.getItem("APSaveMetaData"));
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
    save(localStorage.getItem("APSaveMetaData"));
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
  if(force || confirm("Are you sure? You will lose everything except for Secret Achievements and Options! (You will also gain 2 game points on reset)")) {
    let keep = {
      secretAchievements: player.secretAchievements,
      options: player.options,
      theme: player.theme,
      presets: player.presets,
      speedrunMode: player.speedrunMode,
      gamePoints: player.gamePoints,
      totalGP: player.totalGP,
      permUpgs: player.permUpgs,
    }
    player = start();
    player.secretAchievements = keep.secretAchievements
    player.options = keep.options
    player.theme = keep.theme
    player.presets = keep.presets
    player.speedrunMode = keep.speedrunMode
    player.gamePoints = keep.gamePoints
    player.totalGP = keep.totalGP
    player.permUpgs = keep.permUpgs
    player.gamePoints = player.gamePoints.add(2)
    player.totalGP = player.totalGP.add(1)
    document.title = "Algebraic Progression v3.0"
    save(localStorage.getItem("APSaveMetaData"))
    location.reload()
  }
}

function restartRun() {
  if(confirm("Are you sure? You will lose everything except for Secret Achievements and Options!")) {
    if(confirm("Would you like to enter Speedrun Mode? (Click OK for Yes, click Cancel for No)")) {
      player.speedrunMode = true
    } else {
      player.speedrunMode = false
    }
    player.gamePoints = player.gamePoints.sub(2)
    player.totalGP = player.totalGP.sub(1)
    playAgain(true)
  }
}