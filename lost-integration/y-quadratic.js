const YQuadraticPrestigeLI = {
    y2Formula() {
        let yFactor = player.y
        if(yFactor.gt("1e10000")) yFactor = yFactor.div("1e10000").pow(0.5).mul("1e10000")
        let y2 = yFactor.div(70000).add(player.z)
        if(player.sqrtDoublers.gte(6)) y2 = y2.mul(ExponentialCurve.effects(6))
        y2 = y2.mul(ZLabLI.effects(3))
        y2 = y2.mul(Decimal.pow(2,player.doublers))
        y2 = y2.mul(MetaGenerators.metaPointsEffects(5))
        if(FractalArm.hasUpgrade(23)) y2 = y2.mul(FractalArm[2][3].eff())
        if(FractalArm.hasUpgrade(71)) y2 = y2.mul(FractalArm[7][1].eff())
        if(FractalArm.hasUpgrade(72)) y2 = y2.mul(1e6)
        if(FractalArm.hasUpgrade(123)) y2 = y2.mul(FractalArm[12][3].eff())
        y2 = y2.pow(XPowers.buyables[6].eff())
        if(player.integration.challenge == 9) y2 = y2.pow(0.25)
        if(player.integration.challenge == 12) y2 = y2.pow(Decimal.div(1,player.yQuadratics.add(1).max(1)))
        if(hasPermUpgrade(6)) y2 = y2.mul(PERM_UPGRADES[6].eff())
        if(player.y.lt(70000) || player.z.lt(1)) y2 = new Decimal(0)
        y2 = y2.floor()
        return y2
    },
    goYQuadratic(force) {
        if(this.y2Formula().gte(1) || force) {
            if(force || !player.options[8] || player.compAutobuyers[12] || confirm("Going Y-Quadratic will reset everything Complex resets but you will receive y² in return. Are you sure you want to do this?")) {
                if(!force) {
                    let y = this.y2Formula()
                    player.y2 = player.y2.add(y)
                    player.totaly2 = player.totaly2.add(y)
                    player.last10runs.yQuadratic.splice(0,0,{gain:y,time:player.prestigeTimes[4],gameTime:player.gamePrestigeTimes[4]})
                    player.last10runs.yQuadratic = player.last10runs.yQuadratic.slice(0,-1)
                    player.yQuadratics = player.yQuadratics.add(1)
                }
                player.buyables[6] = new Decimal(0)
                player.buyables[7] = new Decimal(0)
                player.buyables[8] = new Decimal(0)
                player.buyables[9] = new Decimal(0)
                player.z = new Decimal(0)
                player.abc[3] = new Decimal(0)
                if(!hasComplexMilestoneLI(2)) player.quadUpgs = []
                if(hasComplexMilestoneLI(2) && !hasComplexMilestoneLI(3)) player.quadUpgs = player.quadUpgs.filter(id => id % 5 == 0)
                if(!hasComplexMilestoneLI(2)) player.autobuyers = [null,false,false,false,false,false,false,false,false,false,false]
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
                if(!hasComplexMilestoneLI(3)) player.currentSubtab[0] = "upgrades"
                ResetPrestige.reset(true)
                player.x2 = new Decimal(0)
                player.totalx2 = new Decimal(0)
                player.quadratics = new Decimal(0)
                if(player.prestigeTimes[4] < player.prestigeTimes[5]) player.prestigeTimes[5] = player.prestigeTimes[4]
                if(player.gamePrestigeTimes[4].lt(player.gamePrestigeTimes[5])) player.gamePrestigeTimes[5] = player.gamePrestigeTimes[4]
                player.prestigeTimes[4] = 0
                player.gamePrestigeTimes[4] = new Decimal(0)
            }
        }
    }
}

const YQuadraticUpgradesLI = {
    1: {
        desc: "Unlock new modes for Auto-Complex",
        cost: new Decimal(20),
        effectDisplay() {return null},
    },
    2: {
        desc: "Add to e based on total geometric sequences",
        cost: new Decimal(40),
        eff() {return player.imagPower.div(10).pow(FractalArm.hasUpgrade(113) ? 2 : 1)},
        effectDisplay() {return "+" + format(this.eff())},
    },
    3: {
        desc: "Power square roots gain based on your Achievements",
        cost: new Decimal(200),
        eff() {return Decimal.add(1,new Decimal(player.achievements.length).div(1000))},
        effectDisplay() {return "^" + format(this.eff())},
    },
    4: {
        desc: "Unlock an autobuyer for Z",
        cost: new Decimal(1500),
        effectDisplay() {return null},
    },
    5: {
        desc: "CC tiers boost Y generation",
        cost: new Decimal(30000),
        eff() {return new Decimal(ccTiers()).pow(1.5).add(1).pow(FractalArm.hasUpgrade(32) ? 2 : 1)},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    6: {
        desc: "Gain more i based on y²",
        cost: new Decimal(5e6),
        eff() {return player.y2.pow(1.25).add(1).pow(MandelbrotChallenges[1].eff())},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    7: {
        desc: "Square Root Upgrade 3 also boosts square roots gain",
        cost: new Decimal(1e7),
        effectDisplay() {return null},
    },
    8: {
        desc: "Unlock the Z Lab",
        cost: new Decimal(22222222),
        effectDisplay() {return null},
    },
    9: {
        desc: "Particles gain a multiplier based on total UP",
        cost: new Decimal(1e8),
        eff() {return player.upgradePoints[1].pow(2).add(1).pow(FractalArm.hasUpgrade(92) ? 10 : 1)},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    10: {
        desc: "Complex Plane effects are based on total steps purchased",
        cost: new Decimal(3e9),
        effectDisplay() {return null},
    },
    11: {
        desc: "Multiply Y generation based on total i",
        cost: new Decimal(6e9),
        eff() {return player.totali.pow(0.01).add(1).pow(FractalArm.hasUpgrade(74) ? 1.1 : 1)},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    12: {
        desc: "Unlock the Y-Quadratic Automator",
        cost: new Decimal(1e17),
        effectDisplay() {return null},
    },
    13: {
        desc: "Multiply Y generation based on total y²",
        cost: new Decimal(4e17),
        eff() {return player.totaly2.pow(0.2).add(1).pow(FractalArm.hasUpgrade(74) ? 1.1 : 1)},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    14: {
        desc: "Boost the reward of the first 4 Complex Challenges",
        cost: new Decimal(1e23),
        effectDisplay() {return null},
    },
    15: {
        desc: "Improve the formula for gaining Z-Power",
        cost: new Decimal(5e24),
        effectDisplay() {return null},
    },
    16: {
        desc: "Unlock Y Challenges",
        cost: new Decimal(1e27),
        effectDisplay() {return null},
    },
    buy(x) {
        if(player.y2.gte(YQuadraticUpgradesLI[x].cost)) {
            player.y2 = player.y2.sub(YQuadraticUpgradesLI[x].cost)
            player.yQuadUpgs[0].push(x)
        }
    },
    doublerCost() {
        return new Decimal(1e27).mul(Decimal.pow(1e6,player.doublers))
    },
    buyDoubler() {
        if(player.y2.gte(this.doublerCost())) {
            player.y2 = player.y2.sub(this.doublerCost())
            player.doublers = player.doublers.add(1)
        }
    }
}

const YChallengesLI = {
    1: {
        desc: "Only Point Quasars can produce points.",
        goal() {return new Decimal("1e214000")},
        rewardDesc: "Power produced generator production.",
        eff() {return player.yChalCompletions[1].gte(2) ? new Decimal(1.09) : Decimal.add(1,player.yChalCompletions[1].div(15))},
        effectDisplay() {return "^" + format(this.eff())},
    },
    2: {
        desc: "You cannot gain reset points.",
        goal() {return new Decimal("1e147000")},
        rewardDesc: "Power RP gain.",
        eff() {return Decimal.add(1,player.yChalCompletions[2].div(20))},
        effectDisplay() {return "^" + format(this.eff())},
    },
    3: {
        desc: "Generator multiplier and X Upgrades 1, 2, and 7 are disabled.",
        goal() {return new Decimal("1e193000")},
        rewardDesc: "Power point gain.",
        eff() {return Decimal.add(1,player.yChalCompletions[3].div(20))},
        effectDisplay() {return "^" + format(this.eff())},
    },
    4: {
        desc: "You cannot gain root essence.",
        goal() {return new Decimal("1e400000")},
        rewardDesc: "Power square root gain.",
        eff() {return Decimal.add(1,player.yChalCompletions[4].div(40))},
        effectDisplay() {return "^" + format(this.eff())},
    },
    5: {
        desc: "Point gain is raised ^0.01.",
        goal() {return new Decimal("1e2500")},
        rewardDesc: "Multiply point gain.",
        eff() {return Decimal.pow("1e20000",player.yChalCompletions[5])},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    6: {
        desc: "All Complex Challenge rewards are disabled.",
        goal() {return new Decimal("1e213000")},
        rewardDesc: "Multiply i gain.",
        eff() {return Decimal.pow("1e20",player.yChalCompletions[6])},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    interactWithYC(x) {
        if (player.yChallenge != x) { // enter y-challenge
            YQuadraticPrestigeLI.goYQuadratic(true);
            player.yChallenge = x;
            if(player.yChalCompletions[x].eq(2) && !hasSecretAchievement(29)) {
                player.secretAchievements.push('29')
                $.notify("Secret Achievement Unlocked: No Infinite Completions", {
                    style: 'apcurrent',
                    className:'secretAchieves',
                });
            }
        } else if (player.yChallenge == x) { // exit/complete y-challenge
            if(player.points.gte(this[x].goal()) && player.yChalCompletions[x].lt(1)) player.yChalCompletions[x] = new Decimal(1)
            if(player.points.gte(this[x].goal()) && player.yChalCompletions[x].lt(2) && player.inSqrt && player.epicenterLevel == 6) player.yChalCompletions[x] = new Decimal(2)
            player.yChallenge = 0
            YQuadraticPrestigeLI.goYQuadratic(true);
        }
    },
}