const IntegrationPrestige = {
  dxFormula() {
    let gain = new Decimal(5).mul(Decimal.pow(1000,player.i.max(1).log10().div(270000).sub(1))).mul(Decimal.pow(10,player.y2.max("1e510").log10().div(510).sub(1)))
    if(player.integrations.lt(1)) gain = new Decimal(5)
    if(!((player.polynomials[10].boughtThisRun || (SinusoidalUpgrades.has(20) && !player.integration.inTheLimit)) && player.i.gte("1e270000") && player.y2.gte("1e500"))) gain = new Decimal(0)
    if(IntegrationUpgrades.integration1.isBought()) gain = gain.mul(2)
    if(IntegrationUpgrades.integration2.isBought()) gain = gain.mul(IntegrationUpgrades.integration2.eff())
    gain = gain.mul(Limit.scoreEffects(1))
    if(IntegrationUpgrades.integration6.isBought()) gain = gain.mul(IntegrationUpgrades.integration6.eff())
    if(hasCircleMilestone(7) && IntegrationUpgrades.yquadratic9.isBought()) gain = gain.mul(circleEffects(7))
    if(hasYQU(18,'bought')) gain = gain.mul(YQUAD_UPGRADES[18].eff())
    if(IntegrationUpgrades.integration10.isBought()) gain = gain.mul(IntegrationUpgrades.integration10.eff())
    gain = gain.mul(Decimal.pow(100,player.integration.rebuyableUpgrades[6]))
    gain = gain.mul(NumberSets.effect(6,1))
    if(player.unitCircle.quadrant == 1 || Alterations.has(1)) gain = gain.mul(UnitCircle.effect())
    if(HypercompUpgrades.has(9)) gain = gain.mul(HypercompUpgrades[9].eff())
    if(PythagoreanTriples.hasMilestone(6)) gain = gain.pow(1.05)
    gain = gain.pow(HypercompFlune[3].eff())
    if(hasPermUpgrade(10)) gain = gain.mul(PERM_UPGRADES[10].eff())
    gain = gain.min("1e50000000")
    gain = gain.floor()
    return gain
  },
  holesFormula() {
    let gain = TrigFunctions[6].setEff().mul(IntegrationPrestige.dxFormula().add(1).log10().div(100).max(1))
    gain = gain.mul(Decimal.pow(2,player.integration.rebuyableUpgrades[10]))
    if(hasPermUpgrade(12)) gain = gain.mul(PERM_UPGRADES[12].eff())
    gain = gain.floor()
    return gain
  },
  emptySetsFormula() {
    let gain = new Decimal(1)
    gain = gain.mul(player.i.pow(1/270000).div(10)) // i factor
    gain = gain.mul((BasicHypercompUpgrades.has(4) ? player.polyPower.add(1).pow(1/100000) : player.polyPower.add(1).log10().div(500)).pow(NumberSets.effect(5,4))) // PP factor
    gain = gain.mul(player.synthEssence.pow(1/50).div(10).max(1)) // SE factor
    gain = gain.mul(player.complexes.pow(1/10).div(10).max(1)) // complexes factor
    gain = gain.mul(IntegrationPrestige.emptySetGainBonuses()) // bonus factor
    
    let instabilityStart = new Decimal(1e50).mul(Derivatives.buyables[7].eff())
    if(gain.gt(instabilityStart)) gain = gain.div(instabilityStart).pow(0.5).mul(instabilityStart) // instability

    let harshInstabilityStart = new Decimal("1e60000")
    if(gain.gt(harshInstabilityStart)) gain = Decimal.pow(10,gain.div(harshInstabilityStart).log10().pow(0.9)).mul(harshInstabilityStart) // harsh instability

    if(hasPermUpgrade(11)) gain = gain.mul(PERM_UPGRADES[11].eff())
    
    gain = gain.min("1e1500000")
    gain = gain.floor()
    return gain
  },
  emptySetGainBonuses() {
    let gain = new Decimal(1)
    gain = gain.mul(Limit.scoreEffects(2))
    gain = gain.mul(SinusoidalUpgrades[17].eff())
    gain = gain.mul(NumberSets.effect(6,2))
    if(HypercompUpgrades.has(12)) gain = gain.mul(HypercompUpgrades[12].eff())
    return gain
  },
  integrate(force) {
    if(force || (IntegrationPrestige.dxFormula().gte(1) && (!player.options[19] || player.integration.autobuyers.integration || confirm("Integrating will reset everything Complex resets, and will also reset all Complex-level content and the first 60 Achievements, but you will receive dx, holes, and empty sets in return. Are you sure you want to do this?")))) {
      
      if(!force) {
        // add dx
        let f = IntegrationPrestige.dxFormula()
        player.integration.dx = player.integration.dx.add(f)
        player.integration.totaldx = player.integration.totaldx.add(f)
        
        // check if you unlocked "Limitless Potential"
        if(f.gte(1e6) && player.integration.active.types.length == 0) {
          let i = "integration4"
          if(!player.integration.upgrades.unlocked.includes(IntegrationUpgrades[i].id)){
            player.integration.upgrades.unlocked.push(IntegrationUpgrades[i].id)
            $.notify("Integration Upgrade Unlocked: " + IntegrationUpgrades[i].id, {
              style: 'apcurrent',
              className:'unlock',
            });
          }
        }

        // check for daily achievements
        if(player.dailyAchievements[0].includes('94') && !player.dailyAchievements[1].includes('94') && f.gte(5000) && player.gamePrestigeTimes[6].eq(player.prestigeTimes[6])){
          player.dailyAchievements[1].push('94')
          $.notify("Daily Achievement Unlocked: " + DailyAchievements.standardize('94').name, {
            style: 'apcurrent',
            className:'dailyAchieves',
          });
        }
        if(player.dailyAchievements[0].includes('95') && !player.dailyAchievements[1].includes('95') && player.polynomials[7].bought.eq(0)){
          player.dailyAchievements[1].push('95')
          $.notify("Daily Achievement Unlocked: " + DailyAchievements.standardize('95').name, {
            style: 'apcurrent',
            className:'dailyAchieves',
          });
        }
        
        // check if you unlocked Integration Challenge 5
        if(f.gte("1e14400") && !player.integration.usedComplexUpgrades && player.polynomials.buyables[1].add(player.polynomials.buyables[2]).add(player.polynomials.buyables[3]).add(player.polynomials.buyables[4]).add(player.polynomials.buyables[5]).add(player.polynomials.buyables[6]).eq(0) && player.integration.active.types.length == 0) {
          let i = "ic5"
          if(!player.integration.upgrades.unlocked.includes(IntegrationUpgrades[i].id)){
            player.integration.upgrades.unlocked.push(IntegrationUpgrades[i].id)
            $.notify("Integration Upgrade Unlocked: " + IntegrationUpgrades[i].id, {
              style: 'apcurrent',
              className:'unlock',
            });
          }
        }
        
        // add holes, empty sets, and integration count
        player.integration.holes = player.integration.holes.add(IntegrationPrestige.holesFormula())
        player.integration.emptySets = player.integration.emptySets.add(IntegrationPrestige.emptySetsFormula())
        player.integrations = player.integrations.add(1)
        
        // complete IC2x3 if you meet the requirements
        if(player.integration.challenge == 2 && player.integration.chalCompletions[2] == 2) {
          player.integration.chalCompletions[2]++
          player.integration.challenge = 0
        }
        
        // number set automation
        if(player.integration.autobuyers.setSacrifice) {
          for (let i = 1; i < (NumberSets[6].unlocked() ? 7 : 6); i++) {
            NumberSets.sacrifice(i,player.integration.autobuyers.numberSetAutoModes[1])
          }
        }
        if(player.integration.autobuyers.distributeSets) {
          NumberSets.distribute(player.integration.autobuyers.numberSetAutoModes[0])
        }

        // add last 10 runs data and update prestige times
        player.last10runs.integration.splice(0,0,{gain:IntegrationPrestige.dxFormula(),time:player.prestigeTimes[6],gameTime:player.gamePrestigeTimes[6]})
        player.last10runs.integration = player.last10runs.integration.slice(0,-1)
        if(player.prestigeTimes[6] < player.prestigeTimes[7]) player.prestigeTimes[7] = player.prestigeTimes[6]
        if(player.gamePrestigeTimes[6].lt(player.gamePrestigeTimes[7])) player.gamePrestigeTimes[7] = player.gamePrestigeTimes[6]
        player.prestigeTimes[6] = 0
        player.gamePrestigeTimes[6] = new Decimal(0)

        // check if you unlocked "Truly Upgradeless"
        if(!player.integration.usedComplexUpgrades) {
          if(!player.achievements.includes('66')){
            player.achievements.push("66")
            $.notify("Achievement Unlocked: " + ACHIEVEMENTS[66].name, {
              style: 'apcurrent',
              className:'achieves',
            });
          }
        }
      }
      
      // respec number sets on integration
      if(player.options[15]) {
        NumberSets.respec(true)
        player.options[15] = false
      }
      
      // respec hypercomplex upgrades on integration
      if(player.options[27]) {
        HypercompUpgrades.respec(true)
        player.options[27] = false
      }

      // respec charged quadratic upgrades on integration
      if(player.options[29]) {
        player.chargedQuadUpgs = []
        player.y2z2.amount = player.y2z2.total
        player.options[29] = false
      }
      
      player.totalPointsThisIntegration = new Decimal(0)
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
      if(!IntegrationUpgrades.yquadratic8.isBought()) player.yQuadUpgs[1] = []
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
      player.synthEssence = new Decimal(0)
      if(IntegrationUpgrades.sse.isBought()) player.synthEssence = new Decimal(1000)
      player.inSynthDiv = false
      if(!Alterations.has(5)) {
        player.synthDivUpgs = [[null,new Decimal(0),new Decimal(0),new Decimal(0)],[]]
      } else {
        player.synthDivUpgs[0] = [null,new Decimal(0),new Decimal(0),new Decimal(0)]
      }
      player.bestPointsInSynthDiv = new Decimal(0)
      player.synthDivEnters = 0
      if(player.compUpgs[0].length > 0 || player.fourthRowCompUpgs[1].add(player.fourthRowCompUpgs[2]).add(player.fourthRowCompUpgs[3]).add(player.fourthRowCompUpgs[4]).gte(1)) player.integration.usedComplexUpgrades = true
      goComplex(true)
      player.i = new Decimal(0)
      player.totali = new Decimal(0)
      if(IntegrationUpgrades.sco.isBought()) player.i = new Decimal(100000)
      player.integration.seBuyableCounter = new Decimal(0)
      player.integration.sdu1Counter = new Decimal(0)
      player.integration.usedComplexUpgrades = false
      player.integration.challenge = 0
      player.integration.ic1Settings = [0,0]
      player.integration.buildingsBought = false
      player.integration.autocoreTicks = 0
    }
  },
}