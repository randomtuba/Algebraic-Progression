const IntegrationChallenges = {
  1: {
    title: "The Challenging Integration",
    desc() {return "You must pick one Challenge and one Complex Challenge to be trapped in."},
    goalDesc() {return "The goal will depend on the combination you select."},
    rewardDesc: "Multiply set sacrifice value conversion.",
    maxCompletions: 91,
    goal(x) {
      switch (x) {
        case 1:
          return new Decimal("1e1200000")
        break
        case 2:
          return new Decimal("1e2450000")
        break
        case 3:
          return new Decimal("1e66600000")
        break
        case 4:
          return new Decimal("1e16400000")
        break
        case 5:
          return new Decimal("1e1250000")
        break
        case 6:
          return new Decimal("1e69100000")
        break
        case 7:
          return new Decimal("1e1500000")
        break
        case 8:
          return new Decimal("1e103800000")
        break
        case 9:
          return new Decimal("1e16100000")
        break
        case 10:
          return new Decimal("1e2240000")
        break
      }
    },
    eff() {return Decimal.pow(3,player.integration.chalCompletions[1].length).pow(PythagoreanTriples.buyables[3].eff()).pow(player.integration.chalCompletions[1].length >= 91 ? 2 : 1)},
    effectDisplay() {return format(this.eff()) + "x set sacrifice value"},
    unlocked() {return IntegrationUpgrades.ic1.isBought()},
  },
  2: {
    title: "The Layered Integration",
    desc() {return "All Number Set effects are disabled, and you are trapped in Root Epicenter Level √-1 and Synthetic Division. i gain is raised ^0.415."},
    goalDesc() {
      switch (player.integration.chalCompletions[2]) {
        case 0:
          return "Go Quadratic."
        break;
        case 1:
          return "Go Complex."
        break;
        case 2:
          return "Integrate."
        break;
        case 3:
          return "Prestige on the 4th layer...somehow."
        break;
      }
    },
    rewardDesc: "Hover over this challenge to view the rewards!",
    maxCompletions: 3,
    eff() {return new Decimal(1)},
    effectDisplay() {return "Hover over this challenge to view the effects!"},
    unlocked() {return IntegrationUpgrades.ic2.isBought()},
  },
  3: {
    title: "The Inactive Integration",
    desc() {return `Almost all Quadratic, Complex, and Y-Quadratic Upgrades are disabled. You have ${Math.max(27-(player.integration.chalCompletions[3]*3),0)} activations, where each activation allows you to enable 1 disabled effect. i gain is raised ^0.25.`},
    goalDesc() {return `Reach ${format(this.goals[player.integration.chalCompletions[3]])} i.`},
    rewardDesc: "Multiplier to gain of all Trigonometric Function powers. On the 10th completion, unlock Derivatives.",
    maxCompletions: 10,
    goals: [new Decimal("1e3000000"),new Decimal("1e3650000"),new Decimal("1e4240000"),new Decimal("1e4500000"),new Decimal("1e4800000"),new Decimal("1e5350000"),new Decimal("1e5450000"),new Decimal("1e5950000"),new Decimal("1e4350000"),new Decimal("1e2270000"),new Decimal(Infinity)],
    eff() {return Decimal.pow(100,player.integration.chalCompletions[3])}, // trig function powers mult
    eff2() {return Decimal.mul(500,player.integration.chalCompletions[3] - 4).max(0)}, // IP buyable hardcap addition
    effectDisplay() {return format(this.eff()) + "x Trig. Function powers, +" + formatWhole(this.eff2()) + " Imaginary Duplicator amount cap"},
    unlocked() {return IntegrationUpgrades.ic3.isBought()},
  },
  4: {
    title: "The Definite Integration",
    desc() {return "<span style='font-size:13px;'>You can only do one of each prestige once, and global speed decreases based on prestiges done. Passive generation of prestiges and prestige currencies are disabled. All multipliers to prestige count gain are disabled.</span>"},
    goalDesc() {return `Reach ${format(this.goals[player.integration.chalCompletions[4]])} y².`},
    rewardDesc: "Multiplier to Y-Polynomial efficiencies and divider to CC autocompletion time.",
    maxCompletions: 15,
    goals: [new Decimal("1e133000"),new Decimal("1e155000"),new Decimal("1e164200"),new Decimal("1e212200"),new Decimal("1e227100"),new Decimal("1e248300"),new Decimal("1e307300"),new Decimal("1e441200"),new Decimal("1e538500"),new Decimal("1e1025000"),new Decimal("1e1334000"),new Decimal("1e2072000"),new Decimal("1e3030000"),new Decimal("1e3980000"),new Decimal("1e10000000"),new Decimal(Infinity)],
    eff() {return Decimal.pow(100,player.integration.chalCompletions[4]).pow(PythagoreanTriples.hasMilestone(10) ? PythagoreanTriples.buyables[3].eff() : 1)}, // y-polynomial efficiency mult
    eff2() {return 2 ** player.integration.chalCompletions[4]}, // CC autocompletion time divider
    effectDisplay() {return format(this.eff()) + "x Y-Polynomial efficiencies, /" + format(this.eff2()) + " CC autocompletion time"},
    unlocked() {return IntegrationUpgrades.ic4.isBought()},
  },
  5: {
    title: "The Conditional Integration",
    desc() {return "You don't actually enter this challenge. Instead, you must abide by the following requirements in the tooltip."},
    goalDesc() {return "The goal will depend on the tier."},
    rewardDesc: "3 free quaternions per completion!",
    maxCompletions: 7,
    goal() {return new Decimal("1e5e9").pow(Decimal.pow(player.integration.chalCompletions[5] >= 3 ? 1.85 : 1.5,player.integration.chalCompletions[5])).pow(player.integration.chalCompletions[5] >= 5 ? 0.93 : 1).pow(player.integration.chalCompletions[5] >= 6 ? 0.073 : 1)},
    eff() {return Decimal.mul(player.integration.chalCompletions[5],3)},
    effectDisplay() {return "+" + format(this.eff()) + " free quaternions"},
    unlocked() {return IntegrationUpgrades.ic5.isBought()},
  },
  6: {
    title: "The Multivariable Integration",
    desc() {
      if(player.integration.ic6Timer < 10) {
        return `The total Function multiplier, x² gain, i gain, y² gain, and polynomial efficiency are square rooted. Global speed is fixed at ${format(0.01)}.`
      } else if (player.integration.ic6Timer >= 10 && player.integration.ic6Timer < 20) {
        return `All effects from Trigonometric Functions and Imaginary Power Buyables are disabled. Complex Upgrades 10 and 12 are useless.`
      } else if (player.integration.ic6Timer >= 20 && player.integration.ic6Timer < 30) {
        return `Parabolas do nothing. Synthetic Essence determines the cap to your sacrificed x² and Quadratic Power amounts.`
      } else if (player.integration.ic6Timer >= 30) {
        return `All Y-Quadratic Upgrades are disabled except for Y-Quadratic Upgrades 2, 8, and 18. Polynomial power cannot be generated.`
      }
    },
    goalDesc() {return `Reach ${format(this.goals[Math.floor(player.integration.ic6Timer / 10)])} i.`},
    rewardDesc() {
      if(player.integration.ic6Timer < 10) {
        return `Global speed is powered ^1.5.`
      } else if (player.integration.ic6Timer >= 10 && player.integration.ic6Timer < 20) {
        return `The effects of Complex Upgrades 13 and 15 are powered ^10.`
      } else if (player.integration.ic6Timer >= 20 && player.integration.ic6Timer < 30) {
        return `Gain 0.5 free parabolas.`
      } else if (player.integration.ic6Timer >= 30) {
        return `Y-Quadratic Upgrade 11's second effect is raised ^50,000.`
      }
    },
    maxCompletions: 4,
    goals: [new Decimal("1e1.85e11"),new Decimal("1e1.6e10"),new Decimal("1e9.2e11"),new Decimal("1e6.7e10")],
    eff() {return new Decimal(1)},
    effectDisplay() {return format(this.eff()) + "x ???"},
    unlocked() {return IntegrationUpgrades.ic6.isBought()},
  },
  7: {
    title: "The Indefinite Integration",
    desc() {return "You are trapped in The Limit, and all Challenge Factors are set to 15."},
    goalDesc() {return "Reach " + format(this.goal()) + " i."},
    rewardDesc: "Power to Y-Challenge 3 effect.",
    maxCompletions: Infinity,
    goal() {return new Decimal("1e1.7e9").mul(Decimal.pow("1e5e7",player.integration.chalCompletions[7]))},
    eff() {
      let x = new Decimal(player.integration.chalCompletions[7]).pow(1.5).mul(1000000).add(1)
      if(x.gt(1e7)) x = x.div(1e7).pow(0.25).mul(1e7)
      return x
    },
    effectDisplay() {return "^" + format(this.eff()) + " YC3 effect"},
    unlocked() {return IntegrationUpgrades.ic7.isBought()},
  },
  8: {
    title: "The Lost Integration",
    desc() {return "All post-Integration bonuses and quality of life is disabled. Most mechanics are greatly modified. Once you enter this challenge, you cannot exit it."},
    goalDesc() {return "What are you talking about?"},
    rewardDesc: "You would break the universe if you could!",
    maxCompletions: 1,
    unlocked() {return IntegrationUpgrades.ic8.isBought()},
  },
  hasChallenge(x) {
    if(typeof player.integration.chalCompletions[x] === "object") {
      return player.integration.chalCompletions[x].length >= IntegrationChallenges[x].maxCompletions
    } else {
      return player.integration.chalCompletions[x] >= IntegrationChallenges[x].maxCompletions
    }
  },
  start(x) {
    // reset times
    player.prestigeTimes[6] = 0
    player.gamePrestigeTimes[6] = new Decimal(0)

    // enter challenge
    switch (x) {
      case 1:
        if(player.integration.challenge == 1) {
          if(player.i.gte(IntegrationChallenges[1].goal(player.compChallenge)) && !player.integration.chalCompletions[1].includes(player.challenge + (player.compChallenge * 10))) {
            player.integration.challenge = 0
            player.integration.chalCompletions[1].push(player.challenge + (player.compChallenge * 10))
          }
          IntegrationPrestige.integrate(true);
          player.integration.challenge = 0
          player.challenge = 0
        } else {
          document.getElementById("ic1Modal").showModal()
        }
      break;
      case 2:
        if(player.integration.challenge == 2) {
          IntegrationPrestige.integrate(true);
          player.integration.challenge = 0
        } else {
          IntegrationPrestige.integrate(true);
          player.inSqrt = true
          player.epicenterLevel = 5
          player.inSynthDiv = true
          player.integration.challenge = 2
        }
      break;
      case 3:
        if(player.integration.challenge == 3) {
          if(player.i.gte(IntegrationChallenges[3].goals[player.integration.chalCompletions[3]])) {
            player.integration.chalCompletions[3] += 1
          }
          player.integration.upgsActiveInIC3 = []
          IntegrationPrestige.integrate(true);
          player.integration.challenge = 0
        } else {
          player.integration.upgsActiveInIC3 = []
          IntegrationPrestige.integrate(true);
          player.integration.challenge = 3
          player.integration.activations = Math.max(27-(player.integration.chalCompletions[3]*3),0)
        }
      break;
      case 4:
        if(player.integration.challenge == 4) {
          if(player.y2.gte(IntegrationChallenges[4].goals[player.integration.chalCompletions[4]])) {
            player.integration.chalCompletions[4] += 1
          }
          player.integration.ic4Prestiges = [false,false,false]
          IntegrationPrestige.integrate(true);
          player.integration.challenge = 0
        } else {
          IntegrationPrestige.integrate(true);
          player.integration.challenge = 4
          player.integration.ic4Prestiges = [false,false,false]
        }
      break;
      case 6:
        if(player.integration.challenge == 6) {
          if(player.i.gte(IntegrationChallenges[6].goals[player.integration.ic6Version]) && !player.integration.chalCompletions[6].includes(player.integration.ic6Version)) {
            player.integration.chalCompletions[6].push(player.integration.ic6Version)
          }
          IntegrationPrestige.integrate(true);
          player.integration.challenge = 0
        } else {
          IntegrationPrestige.integrate(true);
          player.integration.challenge = 6
          player.integration.ic6Version = Math.floor(player.integration.ic6Timer / 10)
        }
      break;
      case 7:
        if(player.integration.challenge == 7) {
          IntegrationPrestige.integrate(true);
          player.integration.inTheLimit = false
          player.integration.challengeFactors = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
          player.integration.challenge = 0
        } else {
          IntegrationPrestige.integrate(true);
          player.integration.inTheLimit = true
          player.integration.challengeFactors = [null,new Decimal(15),new Decimal(15),new Decimal(15),new Decimal(15),new Decimal(15),new Decimal(15),new Decimal(15),new Decimal(15)]
          player.integration.challenge = 7
        }
      break;
      case 8:
        if(confirm("Are you sure you want to enter Integration Challenge 8? This cannot be undone!")) {
          let achs = player.achievements
          player.integration = {
            dx: new Decimal(0),
            totaldx: new Decimal(0),
            holes: new Decimal(1e200),
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
          }
          player.integrations = new Decimal(0)
          player.totalPointsThisIntegration = new Decimal(0)
          player.inputValue = 0
          player.inputValue2 = 0
          player.inputValue3 = 0
          player.inputValue4 = 0
          player.sinusoidals = new Decimal(0)
          player.triangles = new Decimal(0)
          player.totalTriangles = new Decimal(0)
          player.trigFunctions = {
            waves: new Decimal(0),
            buyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
            powers: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
          }
          player.sinUpgrades = [null,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          player.inputValue5 = 0,
          player.unitCircle = {
            unlocked: false,
            quadrant: 0,
            purchases: [new Decimal(0),new Decimal(0)],
          }
          player.yPolynomials = {
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
          }
          player.yPolyPower = new Decimal(0)
          player.pythTriples = {
            unlocked: false,
            essence: new Decimal(0),
            def: [null,new Decimal(0),new Decimal(0),new Decimal(0)],
            buyables: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
            barsUnlocked: [null,false,false,false],
            bars: [null,new Decimal(0),new Decimal(0),new Decimal(0)],
            barFilling: 0,
          }
          player.wUnlocked = false
          player.j = new Decimal(0)
          player.k = new Decimal(0)
          player.obtainedAlterations = []
          player.hypercompUpgs = {
            dynamic: [],
            basic: [],
            purchases: [0,0,0],
          }
          player.quaternions = [new Decimal(0),new Decimal(0)]
          player.parabolas = new Decimal(0)
          player.extraQuaternions = new Decimal(0)
          player.hypercompFlune = {
            currencies: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
            powers: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
          }
          player.y2z2 = {
            amount: new Decimal(0),
            total: new Decimal(0)
          }
          player.chargedQuadUpgs = []
          player.totalPoints = new Decimal(0)
          player.currentTab = "gen"
          player.currentSubtab[3] = 'upgrades'
          player.w = new Decimal(0)
          player.compChalCompletions = [null,0,0,0,0,0,0,0,0,0,0]
          player.bankedQuadratics = new Decimal(0)
          player.presets = {
            info: [null,"","","","","","","","","","","","","","","","","",""],
            names: [null,"Preset 1","Preset 2","Preset 3","Preset 4","Preset 5","Preset 6","Preset 1","Preset 2","Preset 3","Preset 4","Preset 5","Preset 6","Preset 1","Preset 2","Preset 3","Preset 4","Preset 5","Preset 6"],
            selected: 0,
            selected2: 0,
            selected3: 0,
          }
          player.zUnlocked = false
          player.yChalCompletions = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
          player.synthDivUpgs[1] = []

          IntegrationPrestige.integrate(true)
          player.integration.dx = new Decimal(0)
          player.integration.totaldx = new Decimal(0)
          player.integration.emptySets = new Decimal(0)

          player.last10runs = {
            quadratic: [{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)}],
            complex: [{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)}],
            yQuadratic: [{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)}],
            integration: [{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)}],
            sinusoidal: [{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)},{gain:new Decimal(0),time:1e8,gameTime:new Decimal(Infinity)}],
            tabOpens: [true,true,true,true,true],
          }
          player.prestigeTimes = [0,100000000,0,100000000,0,1000000000,0,100000000,0,1000000000]
          player.gamePrestigeTimes = [new Decimal(0),new Decimal(9e15),new Decimal(0),new Decimal(9e15),new Decimal(0),new Decimal(9e15),new Decimal(0),new Decimal(9e15),new Decimal(0),new Decimal(9e15)]
          player.achievements = achs
          player.epicenterLevel = 0
          player.polynomials = {
            2: { amount: new Decimal(0) },
            3: { amount: new Decimal(0) },
            4: { amount: new Decimal(0) },
            5: { amount: new Decimal(0) },
            6: { amount: new Decimal(0) },
            7: { amount: new Decimal(0) },
            8: { amount: new Decimal(0) },
            9: { amount: new Decimal(0) },
            10: { amount: new Decimal(0) },
            buyables: Array(24).fill(new Decimal(0)),
          }
          player.tabDisplays = [null,true,true,true,true,true,true,true,true,true,true,true,true],
          player.subtabDisplays = {
            0: [true,true,true,true,true], // Quadratic
            1: [true,true,true,true,true,true], // Complex
            2: [true,true,true,true], // Statistics
            3: [true,true,true,true], // Y-Quadratic
            4: [true,true,true], // Achievements
            5: [true,true], // Polynomials
            6: [true,true,true,true,true,true,true], // Integration
            7: [true,true,true,true], // Sinusoidal
          }
          player.currentSubtab[4] = "regular"

          player.inLostIntegration = true
        }
      break;
    }
  },
  actuallyStartIC1(chal,compChal) {
    IntegrationPrestige.integrate(true);
    player.unlocked = compChal
    interactWithCC(compChal)
    startChallenge(chal)
    player.integration.challenge = 1
  },
  updateIC5() {
    if(IntegrationUpgrades.ic5.isBought() && player.i.gte(IntegrationChallenges[5].goal())) {
      if(player.synthDivUpgs[0][1].eq(0) && player.synthDivUpgs[0][2].eq(0) && player.synthDivUpgs[0][3].eq(0) && player.integration.chalCompletions[5] < 1) {player.integration.chalCompletions[5] = 1; return}
      if(player.synthDivUpgs[0][1].eq(0) && player.synthDivUpgs[0][2].eq(0) && player.synthDivUpgs[0][3].eq(0) && player.zlab.empowerments.eq(0) && player.integration.chalCompletions[5] >= 1 && player.integration.chalCompletions[5] < 2) {player.integration.chalCompletions[5] = 2; return}
      if(player.synthDivUpgs[0][1].eq(0) && player.synthDivUpgs[0][2].eq(0) && player.synthDivUpgs[0][3].eq(0) && player.zlab.empowerments.eq(0) && player.b.eq(0) && player.integration.chalCompletions[5] >= 2 && player.integration.chalCompletions[5] < 3) {player.integration.chalCompletions[5] = 3; return}
      if(player.synthDivUpgs[0][1].eq(0) && player.synthDivUpgs[0][2].eq(0) && player.synthDivUpgs[0][3].eq(0) && player.zlab.empowerments.eq(0) && player.b.eq(0) && player.hypercompUpgs.dynamic.length < 4 && player.integration.chalCompletions[5] >= 3 && player.integration.chalCompletions[5] < 4) {player.integration.chalCompletions[5] = 4; return}
      if(player.synthDivUpgs[0][1].eq(0) && player.synthDivUpgs[0][2].eq(0) && player.synthDivUpgs[0][3].eq(0) && player.zlab.empowerments.eq(0) && player.b.eq(0) && player.hypercompUpgs.dynamic.length < 4 && (player.gamePrestigeTimes[6].lt(3.1536e13) || player.gamePrestigeTimes[8].lt(3.1536e13)) && player.integration.chalCompletions[5] >= 4 && player.integration.chalCompletions[5] < 5) {player.integration.chalCompletions[5] = 5; return}
      if(player.synthDivUpgs[0][1].eq(0) && player.synthDivUpgs[0][2].eq(0) && player.synthDivUpgs[0][3].eq(0) && player.zlab.empowerments.eq(0) && player.b.eq(0) && player.hypercompUpgs.dynamic.length < 4 && (player.gamePrestigeTimes[6].lt(3.1536e13) || player.gamePrestigeTimes[8].lt(3.1536e13)) && player.polynomials[10].amount.lt(1) && player.integration.chalCompletions[5] >= 5 && player.integration.chalCompletions[5] < 6) {player.integration.chalCompletions[5] = 6; return}
      if(player.synthDivUpgs[0][1].eq(0) && player.synthDivUpgs[0][2].eq(0) && player.synthDivUpgs[0][3].eq(0) && player.zlab.empowerments.eq(0) && player.b.eq(0) && player.hypercompUpgs.dynamic.length < 4 && (player.gamePrestigeTimes[6].lt(3.1536e13) || player.gamePrestigeTimes[8].lt(3.1536e13)) && player.polynomials[10].amount.lt(1) && player.integration.challenge == 3 && player.integration.chalCompletions[5] >= 6 && player.integration.chalCompletions[5] < 7) {player.integration.chalCompletions[5] = 7; return}
    }
  },
  attemptToFufillReqs() {
    let c = player.integration.chalCompletions[5]
    player.integration.autobuyers.synthDivUpgs = [null,false,false,false] // no rebuyable SDUs
    if(c >= 1) player.integration.autobuyers.zEmpowerments = false // no Z-Empowerments
    if(c >= 2) player.compAutobuyers[4] = false // no Y-Intercept
    if(c >= 3 && player.hypercompUpgs.dynamic.length > 4) HypercompUpgrades.respec(true) // at most 4 Hypercomplex Upgrades
    if(c >= 4) player.options[18] = false // Temporal Plane inactive
    if(c >= 5) player.integration.autobuyers.polynomials[10] = false // no x^10
    if(c >= 6) IntegrationChallenges.start(3) // must be in IC3
  }
}