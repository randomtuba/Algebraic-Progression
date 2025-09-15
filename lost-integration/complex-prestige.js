const ComplexPrestigeLI = {
    iFormula() {
        let i = player.x2.div(1e175).pow(0.025).mul(player.challengeEssence.div(1e42).pow(hasCU(0,11) ? 0.075 : 0.05))
        if(i.gt(1e200)) i = i.div(1e200).pow(0.5).mul(1e200)
        if(hasComplexMilestoneLI(10)) i = i.mul(2)
        if(hasCU(0,9)) i = i.mul(ComplexUpgradesLI[9].eff())
        if(hasCU(0,10)) i = i.mul(ComplexUpgradesLI[10].eff())
        i = i.mul(ComplexPlaneLI.effects(1))
        if(player.sqrtDoublers.gte(3)) i = i.mul(ExponentialCurve.effects(3))
        if(ComplexChallengesLI.milestones.has(3)) i = i.mul(ComplexChallengesLI.milestones[3].eff())
        if(hasYQU(6,'lost')) i = i.mul(YQuadraticUpgradesLI[6].eff())
        i = i.mul(ZLabLI.effects(1))
        if(hasCU(1,9)) i = i.mul(BasicComplexUpgradesLI[9].eff())
        i = i.mul(YChallengesLI[6].eff())
        i = i.mul(XPowers.buyables[24].eff())
        i = i.mul(MetaGenerators.metaPointsEffects(4))
        if(FractalArm.hasUpgrade(21)) i = i.mul(FractalArm[2][1].eff())
        if(FractalArm.hasUpgrade(112)) i = i.mul(FractalArm[11][2].eff())
        i = i.mul(MandelbrotChallenges[4].eff())
        i = i.pow(ComplexChallengesLI[10].eff())
        if(player.integration.challenge == 9) i = i.pow(0.25)
        if(player.integration.challenge == 12) i = i.pow(Decimal.div(1,player.complexes.add(1).max(1)))
        if(hasPermUpgrade(5)) i = i.mul(PERM_UPGRADES[5].eff())
        if(!hasQU(25) || player.x2.lt(1e175) || player.challengeEssence.lt(1e42)) i = new Decimal(0)
        i = i.floor()
        return i
    },
    goComplex(force) {
        if(this.iFormula().gte(1) || force) {
            if(force || !player.options[8] || player.autobuyers[9] || confirm("Going Complex will reset everything Resetting resets, and will also reset all Resetting-level content, but you will receive i in return. Are you sure you want to do this?")) {
                if(!force) {
                    let c = this.iFormula()
                    player.i = player.i.add(c)
                    player.totali = player.totali.add(c)
                    player.last10runs.complex.splice(0,0,{gain:c,time:player.prestigeTimes[2],gameTime:player.gamePrestigeTimes[2]})
                    player.last10runs.complex = player.last10runs.complex.slice(0,-1)
                    player.complexes = player.complexes.add(1)
                }
                player.buyables[6] = new Decimal(0)
                player.buyables[7] = new Decimal(0)
                player.buyables[8] = new Decimal(0)
                player.buyables[9] = new Decimal(0)
                player.z = new Decimal(0)
                player.abc[3] = new Decimal(0)
                if(!hasComplexMilestoneLI(2)) player.quadUpgs = []
                if(hasComplexMilestoneLI(2) && !hasComplexMilestoneLI(3)) player.quadUpgs = player.quadUpgs.filter(id => id % 5 == 0)
                if(!hasComplexMilestoneLI(2)) player.autobuyers = [null,false,false,false,false,false,false,false,false,false,false,false]
                player.sacX = new Decimal(0)
                player.sacY = new Decimal(0)
                player.sacX2 = new Decimal(0)
                player.rootEssence = new Decimal(0)
                player.inSqrt = false
                if(!hasComplexMilestoneLI(6)) player.sqrtDoublers = new Decimal(0)
                player.challenge = 0
                if(!hasComplexMilestoneLI(9)) player.chalCompletions = []
                if(!hasComplexMilestoneLI(6)) player.quadPower = new Decimal(0)
                if(!hasComplexMilestoneLI(6)) player.imagPower = new Decimal(0)
                if(!hasComplexMilestoneLI(6)) player.quadBuyables = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
                if(hasComplexMilestoneLI(6)) {
                  for (let i = 1; i < 7; i++) {
                    player.quadBuyables[i] = new Decimal(0)
                  }
                }
                player.challengeEssence = new Decimal(0)
                player.sqrtEnters = 0
                if(!hasComplexMilestoneLI(9)) player.epicenterLevel = '1'
                if(!hasComplexMilestoneLI(3)) player.currentSubtab[0] = "upgrades"
                ResetPrestige.reset(true)
                player.x2 = new Decimal(0)
                player.totalx2 = new Decimal(0)
                player.quadratics = new Decimal(0)
                if(player.prestigeTimes[2] < player.prestigeTimes[3]) player.prestigeTimes[3] = player.prestigeTimes[2]
                if(player.gamePrestigeTimes[2].lt(player.gamePrestigeTimes[3])) player.gamePrestigeTimes[3] = player.gamePrestigeTimes[2]
                player.prestigeTimes[2] = 0
                player.gamePrestigeTimes[2] = new Decimal(0.1)
                player.compChallenge = 0
                if(player.options[6]) {
                  player.upgradePoints[0] = player.upgradePoints[1].sub(player.unlocked != 0 ? ComplexChallengesLI[player.unlocked].unlockCost : new Decimal(0))
                  player.compUpgs[0] = []
                  player.options[6] = false
                }
                if(player.options[4] && player.unlocked > 0){
                  player.upgradePoints[0] = player.upgradePoints[0].add(ComplexChallengesLI[player.unlocked].unlockCost)
                  player.unlocked = 0
                }
                player.options[4] = player.compChallenge != 0 && player.options[4]
                player.antiSlope = new Decimal(1)
            }
        }
    }
}

const ComplexMilestonesLI = {
    1: {
      title: "1 Complex",
      desc: "Unlock an autobuyer for Resetting",
      requirement: 1,
    },
    2: {
      title: "2 Complexes",
      desc: "Keep the fifth column of Reset Table upgrades on Complex",
      requirement: 2,
    },
    3: {
      title: "3 Complexes",
      desc: "Keep all Reset Table upgrades on Complex",
      requirement: 3,
    },
    4: {
      title: "4 Complexes",
      desc: "Unlock an autobuyer for Coordinate Plane",
      requirement: 4,
    },
    5: {
      title: "5 Complexes",
      desc: "Unlock an autobuyer for Square Root Upgrades",
      requirement: 5,
    },
    6: {
      title: "6 Complexes",
      desc: "Keep geometric sequences and Exponential Curve buyables on Complex",
      requirement: 6,
    },
    7: {
      title: "7 Complexes",
      desc: "Automatically generate root essence outside of Square Root",
      requirement: 7,
    },
    8: {
      title: "8 Complexes",
      desc: "Square Root Upgrade 2 no longer resets your square roots",
      requirement: 8,
    },
    9: {
      title: "9 Complexes",
      desc: "Keep RET completions on Complex",
      requirement: 9,
    },
    10: {
      title: "12 Complexes",
      desc: "Double i gain and points are no longer subtracted when buying Generators and X",
      requirement: 12,
    },
    11: {
      title: "15 Complexes",
      desc: "Unlock Complex Plane",
      requirement: 15,
    },
    12: {
      title: "20 Complexes",
      desc: "Unlock an autobuyer for Complex",
      requirement: 20,
    },
}

function hasComplexMilestoneLI(x) {
    return player.inLostIntegration && (player.complexes.gte(ComplexMilestonesLI[x].requirement) || FractalMilestones.has(3) || (x == 10 && FractalMilestones.has(1)))
}

const ComplexPlaneLI = {
  stepCost() {
    return new Decimal(5e10).mul(Decimal.pow(100,player.compPlane[0][2])).mul(Decimal.pow(4,player.compPlane[0][2].pow(2)))
  },
  buyStep() {
    if(player.i.gte(this.stepCost())) {
      player.i = player.i.sub(this.stepCost())
      player.compPlane[0][1] = player.compPlane[0][1].add(1)
      player.compPlane[0][2] = player.compPlane[0][2].add(1)
    }
  },
  stepInDirection(x) {
    if(player.compPlane[0][1].gte(1)) {
      player.compPlane[0][1] = player.compPlane[0][1].sub(1)
      switch (x) {
        case 1:
          player.compPlane[0][3] = player.compPlane[0][3].add(1)
        break;
        case 2:
          player.compPlane[0][3] = player.compPlane[0][3].sub(1)
        break;
        case 3:
          player.compPlane[0][4] = player.compPlane[0][4].add(1)
        break;
        case 4:
          player.compPlane[0][4] = player.compPlane[0][4].sub(1)
        break;
      }
    }
  },
  effects(x) {
    let y;
    switch (x) {
      case 1:
        y = hasYQU(10,'lost') ? Decimal.pow(3,player.compPlane[0][2].max(0)).pow(hasCU(0,12) ? 1.1 : 1).pow(FractalArm.hasUpgrade(223) ? 5 : 1) : (hasCU(1,5) && player.compPlane[0][3].lt(0) ? Decimal.pow(3,player.compPlane[0][3].mul(-1).div(2).max(0)).pow(hasCU(0,12) ? 1.1 : 1) : Decimal.pow(3,player.compPlane[0][3].max(0)).pow(hasCU(0,12) ? 1.1 : 1)) // i gain
      break;
      case 2:
        y = hasYQU(10,'lost') ? Decimal.pow(1e15,player.compPlane[0][2].max(0)).pow(hasCU(0,12) ? 1.1 : 1).pow(FractalArm.hasUpgrade(223) ? 5 : 1) : (hasCU(1,5) && player.compPlane[0][3].gt(0) ? Decimal.pow(1e15,player.compPlane[0][3].div(2).max(0)).pow(hasCU(0,12) ? 1.1 : 1) : Decimal.pow(1e15,player.compPlane[0][3].mul(-1).max(0)).pow(hasCU(0,12) ? 1.1 : 1)) // reset points
      break;
      case 3:
        y = hasYQU(10,'lost') ? Decimal.pow("1.79e308",player.compPlane[0][2].max(0)).pow(hasCU(0,12) ? 1.1 : 1).pow(FractalArm.hasUpgrade(223) ? 5 : 1) : (hasCU(1,5) && player.compPlane[0][4].lt(0) ? Decimal.pow("1.79e308",player.compPlane[0][4].mul(-1).div(2).max(0)).pow(hasCU(0,12) ? 1.1 : 1) : Decimal.pow("1.79e308",player.compPlane[0][4].max(0)).pow(hasCU(0,12) ? 1.1 : 1)) // points
      break;
      case 4:
        y = hasYQU(10,'lost') ? Decimal.pow(100,player.compPlane[0][2].max(0)).pow(hasCU(0,12) ? 1.1 : 1).pow(FractalArm.hasUpgrade(223) ? 5 : 1) : (hasCU(1,5) && player.compPlane[0][4].gt(0) ? Decimal.pow(100,player.compPlane[0][4].div(2).max(0)).pow(hasCU(0,12) ? 1.1 : 1) : Decimal.pow(100,player.compPlane[0][4].mul(-1).max(0)).pow(hasCU(0,12) ? 1.1 : 1)) // square roots
      break;
    }
    return y.pow(ZLabLI.effects(5))
  },
  respec(force) {
    if (force || confirm("Are you sure you want to respec your steps? You will go Complex with no reward!")) {
        player.compPlane[0][1] = player.compPlane[0][2]
        player.compPlane[0][3] = new Decimal(0)
        player.compPlane[0][4] = new Decimal(0)
        if(!force) ComplexPrestigeLI.goComplex(true)
    }
  },
}

const ZLabLI = {
  zPowerFormula() {
    return Decimal.pow(hasYQU(15,'lost') ? 1.5 : 1.3,player.z).pow(MandelbrotChallenges[2].eff()).mul(hasPermUpgrade(7) ? PERM_UPGRADES[7].eff() : 1)
  },
  sacrificeZ() {
    player.zlab.zpower = player.zlab.zpower.add(this.zPowerFormula())
    if(!FractalMilestones.has(9)) player.z = new Decimal(0)
  },
  effects(x) {
    switch (x) {
      case 1:
        return player.zlab.particles[1].pow(1.25).add(1)
      break;
      case 2:
        return player.zlab.particles[1].pow(0.1).add(1)
      break;
      case 3:
        return player.zlab.particles[2].pow(0.15).add(1)
      break;
      case 4:
        return player.zlab.particles[2].pow(0.1).add(1)
      break;
      case 5:
        return Decimal.add(1,player.zlab.particles[3].add(1).log10().add(1).ln().pow(1.25).div(10))
      break;
      case 6:
        return player.zlab.particles[3].pow(0.1).add(1)
      break;
    }
  },
  particleMult() {
    let par = new Decimal(1)
    if(hasYQU(9,'lost')) par = par.mul(YQuadraticUpgradesLI[9].eff())
    if(player.sqrtDoublers.gte(7)) par = par.mul(ExponentialCurve.effects(7))
    par = par.mul(XPowers.buyables[12].eff())
    if(FractalArm.hasUpgrade(31)) par = par.mul(FractalArm[3][1].eff())
    if(player.integration.challenge == 10) par = new Decimal(0)
    return par
  },
}