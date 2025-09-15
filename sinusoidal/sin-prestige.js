const SinusoidalPrestige = {
  trianglesFormula() {
    let gain = Decimal.pow(100,player.varSynth.circles.max(1).log10().div(4000).sub(1)).mul(Decimal.pow(100,player.varSynth.revolutions.max(1).log10().div(2650).sub(1)))
    gain = gain.mul(SinusoidalUpgrades[11].eff())
    gain = gain.mul(Decimal.pow(2,player.varSynth.iExpBuyables[4]))
    if(player.unitCircle.quadrant == 4 || Alterations.has(1)) gain = gain.mul(UnitCircle.effect())
    if(HypercompUpgrades.has(13)) gain = gain.mul(HypercompUpgrades[13].eff())
    gain = gain.pow(HypercompFlune[7].eff())
    gain = gain.pow(SinusoidalUpgrades[30].eff())
    if(BasicHypercompUpgrades.has(11)) gain = gain.pow(1.05)
    if(hasPermUpgrade(14)) gain = gain.mul(PERM_UPGRADES[14].eff())
    gain = gain.min("1e600000")
    gain = gain.floor()
    return gain
  },
  goSinusoidal(force) {
    if(force || (SinusoidalPrestige.trianglesFormula().gte(1) && (!player.options[23] || player.integration.autobuyers.sinusoidal || confirm("Going Sinusoidal will reset everything Integration resets, but you will receive triangles in return. Are you sure you want to do this?")))) {
      
      if(!force) {
        let f = SinusoidalPrestige.trianglesFormula()
        player.triangles = player.triangles.add(f)
        player.totalTriangles = player.totalTriangles.add(f)
        player.last10runs.sinusoidal.splice(0,0,{gain:f,time:player.prestigeTimes[8],gameTime:player.gamePrestigeTimes[8]})
        player.last10runs.sinusoidal = player.last10runs.sinusoidal.slice(0,-1)
        
        player.sinusoidals = player.sinusoidals.add(1)
        if(player.prestigeTimes[8] < player.prestigeTimes[9]) player.prestigeTimes[9] = player.prestigeTimes[8]
        if(player.gamePrestigeTimes[8].lt(player.gamePrestigeTimes[9])) player.gamePrestigeTimes[9] = player.gamePrestigeTimes[8]
        player.prestigeTimes[8] = 0
        player.gamePrestigeTimes[8] = new Decimal(0)
      }
      
      // respec hypercomplex upgrades on sinusoidal
      if(player.options[27]) {
        HypercompUpgrades.respec(true)
        player.options[27] = false
      }

      // respec charged quadratic upgrades on sinusoidal
      if(player.options[29]) {
        player.chargedQuadUpgs = []
        player.y2z2.amount = player.y2z2.total
        player.options[29] = false
      }

      // check for daily achievement
      if(player.dailyAchievements[0].includes('124') && !player.dailyAchievements[1].includes('124') && player.integration.active.types.length == 0){
        player.dailyAchievements[1].push('124')
        $.notify("Daily Achievement Unlocked: " + DailyAchievements.standardize('124').name, {
          style: 'apcurrent',
          className:'dailyAchieves',
        });
      }
      
      if(!IntegrationUpgrades.mil2.isBought() && !IntegrationUpgrades.zla.isBought()) player.currentSubtab[1] = "milestones"
      if(!IntegrationUpgrades.anr.isBought()) player.achievements = player.achievements.filter(id => id > 60)
      player.sacX = new Decimal(0)
      player.sacY = new Decimal(0)
      player.sacX2 = new Decimal(0)
      player.sacZ = new Decimal(0)
      player.rootEssence = new Decimal(0)
      player.challengeEssence = new Decimal(0)
      let result = player.obtainedMilestones.filter(id => id < (IntegrationUpgrades.mil1.isBought() ? (IntegrationUpgrades.mil2.isBought() ? 21 : 13) : 0))
      player.obtainedMilestones = result
      player.complexes = new Decimal(IntegrationUpgrades.mil1.isBought() ? 20 : 0)
      player.compUpgs[0] = []
      if(!IntegrationUpgrades.bcu.isBought()) player.compUpgs[1] = []
      player.compUpgs[2] = [0,0,0]
      player.upgradePoints = [new Decimal(0),new Decimal(0)]
      if(IntegrationUpgrades.mil1.isBought()) {
        if(!IntegrationUpgrades.mil2.isBought()) {
          player.compAutobuyers[8] = [false,false,false,false]
          for (let i = 9; i < 16; i++) {
            player.compAutobuyers[i] = false
          }
        }
      } else if (!IntegrationUpgrades.mil1.isBought()) {
        player.compAutobuyers = [null,false,1,false,false,false,false,false,[false,false,false,false],false,false,false,false,false,false,false]
      }
      player.compPlane = [[null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],[null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]]
      player.triplers = new Decimal(0)
      if(!Alterations.has(3)) player.compChalCompletions = [null,0,0,0,0,0,0,0,0,0,0]
      player.compChallenge = 0
      player.unlocked = 0
      player.bestPointsInSqrt = new Decimal(0)
      player.antiSlope = new Decimal(1)
      player.bankedQuadratics = new Decimal(0)
      if(player.sinUpgrades[26] == 0) {
        player.transformations = {
          bought: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
          names: [null,"Translations","Reflections","Rotations","Dilations"],
          activated: 0,
          extrusions: [],
        }
      }
      if(IntegrationUpgrades.exr.isBought()) player.transformations.activated = 4
      player.y2 = new Decimal(0)
      player.totaly2 = new Decimal(0)
      if(IntegrationUpgrades.syq.isBought()) player.y2 = new Decimal(100)
      player.yQuadratics = new Decimal(0)
      player.prestigeTimes[4] = 0
      if(!IntegrationUpgrades.yqu.isBought()) player.yQuadUpgs[0] = []
      if(!IntegrationUpgrades.yqr.isBought()) player.yQuadUpgs[1] = []
      player.zlab = {
        zpower: new Decimal(0),
        levels: [null,0,0,0,0,0],
        particles: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
        empowerments: new Decimal(0),
        charged: 0,
      }
      if(IntegrationUpgrades.zla.isBought()) player.zlab.levels[1] = 20
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
        iExpBuyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      }
      for (let i = 5; i < 9; i++) {
        player.quadBuyables[i] = new Decimal(0)
      }
      if(IntegrationUpgrades.ycr.isBought()) {
        player.yChalsUnlocked[1] = false
      } else {
        player.yChalsUnlocked = [null,false,false,false,false] 
      }
      player.yChalCompletions[1] = new Decimal(0)
      player.yChalCompletions[2] = new Decimal(0)
      player.yChalCompletions[3] = new Decimal(0)
      player.yChalCompletions[4] = new Decimal(0)
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
      player.synthEssence = IntegrationUpgrades.sse.isBought() ? new Decimal(1000) : new Decimal(0)
      player.inSynthDiv = false
      if(!Alterations.has(5)) {
        player.synthDivUpgs = [[null,new Decimal(0),new Decimal(0),new Decimal(0)],[]]
      } else {
        player.synthDivUpgs[0] = [null,new Decimal(0),new Decimal(0),new Decimal(0)]
      }
      player.bestPointsInSynthDiv = new Decimal(0)
      player.synthDivEnters = 0
      goComplex(true)
      player.i = new Decimal(0)
      player.totali = new Decimal(0)
      if(IntegrationUpgrades.sco.isBought()) player.i = new Decimal(100000)
      player.integration.seBuyableCounter = new Decimal(0)
      player.integration.sdu1Counter = new Decimal(0)
      player.integration.boughtBuildings = false
    }
  },
}