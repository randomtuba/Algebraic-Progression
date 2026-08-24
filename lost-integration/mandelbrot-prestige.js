const MandelbrotPrestige = {
    meFormula() {
        let me = player.i.div("1e4400").pow(0.0005).mul(player.y2.div(1e112).pow(0.01))
        if(me.gt(1e100)) me = me.div(1e100).pow(0.5).mul(1e100)
        if(XPowers.mandelbrotEnginePercentage().lt(100) || player.i.lt("1e4400") || player.y2.lt(1e112)) me = new Decimal(0)
        if(FractalArm.hasUpgrade(51)) me = me.mul(5)
        if(FractalArm.hasUpgrade(141)) me = me.mul(FractalArm[14][1].eff())
        if(FractalArm.hasUpgrade(161)) me = me.mul(FractalArm[16][1].eff())
        if(FractalArm.hasUpgrade(181)) me = me.mul(FractalArm[18][1].eff())
        if(hasPermUpgrade(22)) me = me.mul(PERM_UPGRADES[22].eff())
        me = me.floor()
        return me
    },
    enterMandelbrot(force) {
        if(this.meFormula().gte(1) || force) {
            if(force || !player.options[19] || confirm("Entering the Mandelbrot will reset everything Complex resets, and will also reset all Complex-level and Y-Quadratic-level content, but you will receive Mandelbrot Essence in return. Are you sure you want to do this?")) {
                if(!force) {
                    let m = this.meFormula()
                    player.integration.dx = player.integration.dx.add(m)
                    player.integration.totaldx = player.integration.totaldx.add(m)
                    player.last10runs.integration.splice(0,0,{gain:m,time:player.prestigeTimes[6],gameTime:player.gamePrestigeTimes[6]})
                    player.last10runs.integration = player.last10runs.integration.slice(0,-1)
                    player.integrations = player.integrations.add(1)
                }
                player.pointsThisIntegration = new Decimal(0)
                player.sacZ = new Decimal(0)
                player.doublers = new Decimal(0)
                if(player.complexes.lt(player.integration.holes) && !force && !player.options[15]) player.integration.holes = player.complexes
                player.complexes = new Decimal(0)
                if(!FractalMilestones.has(7)) player.compUpgs[0] = []
                if(!FractalMilestones.has(4)) player.compUpgs[1] = []
                if(!FractalMilestones.has(7)) player.compUpgs[2] = [0,0,0]
                if(!FractalMilestones.has(7)) player.upgradePoints = [new Decimal(0),new Decimal(0)]
                if(!FractalMilestones.has(3)) player.compAutobuyers[3] = false
                if(!FractalMilestones.has(3)) player.compAutobuyers[7] = false
                if(!FractalMilestones.has(3)) player.compAutobuyers[10] = 0
                player.compPlane[0] = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
                player.triplers = new Decimal(0)
                if(!FractalMilestones.has(11)) player.compChalCompletions = [null,0,0,0,0,0,0,0,0,0,0]
                player.compChallenge = 0
                player.unlocked = 0
                player.y2 = new Decimal(0)
                player.totaly2 = new Decimal(0)
                player.yQuadratics = new Decimal(0)
                if(!FractalMilestones.has(6)) player.yQuadUpgs[0] = []
                player.zlab = {
                    zpower: new Decimal(0),
                    levels: [null,0,0,0,0,0],
                    particles: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
                    empowerments: new Decimal(0),
                    charged: 0,
                }
                player.varSynth.iExpBuyables[1] = new Decimal(0)
                if(!FractalMilestones.has(8)) player.yChalCompletions = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
                player.yChallenge = 0
                if(!FractalMilestones.has(11)) player.extraUP = new Decimal(0)
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
                if(!FractalMilestones.has(11)) player.currentSubtab[1] = "upgrades"
                if(!FractalMilestones.has(6)) player.currentSubtab[3] = "upgrades"
                ComplexPrestigeLI.goComplex(true)
                player.i = new Decimal(0)
                player.totali = new Decimal(0)
                player.complexes = new Decimal(0)
                if(player.prestigeTimes[6] < player.prestigeTimes[7]) player.prestigeTimes[7] = player.prestigeTimes[6]
                if(player.gamePrestigeTimes[6].lt(player.gamePrestigeTimes[7])) player.gamePrestigeTimes[7] = player.gamePrestigeTimes[6]
                player.prestigeTimes[6] = 0
                player.gamePrestigeTimes[6] = new Decimal(0)
                if(player.options[15]) {
                    FractalArm.respec(true)
                    player.options[15] = false
                }
                player.integration.derivatives[0] = new Decimal(1)
                if(!FractalArm.hasUpgrade(201)) player.integration.derivatives[1] = new Decimal(0)
                player.triangles = new Decimal(0)
                player.integration.challenge = 0
            }
        }
    }
}

const FractalMilestones = {
    1: {
        title: "∞ Complexes",
        desc: "Unlock an autobuyer for the y² doubler, unlock Auto-Complex Challenges, and always keep Complex Milestone 10",
        requirement: Infinity,
    },
    2: {
        title: "250 Complexes",
        desc: "Unlock new modes for the Y-Quadratic Automator",
        requirement: 250,
    },
    3: {
        title: "100 Complexes",
        desc: "Keep Complex Milestones on Mandelbrot",
        requirement: 100,
    },
    4: {
        title: "75 Complexes",
        desc: "Keep Basic Complex Upgrades on Mandelbrot and unlock an autobuyer for steps",
        requirement: 75,
    },
    5: {
        title: "50 Complexes",
        desc: "You can bulk complete Complex Challenges and Complex Challenges no longer have unlock requirements",
        requirement: 50,
    },
    6: {
        title: "20 Complexes",
        desc: "Keep Y-Quadratic Upgrades on Mandelbrot and Coordinate Plane autobuyer automates sacrificing Z",
        requirement: 20,
    },
    7: {
        title: "15 Complexes",
        desc: "Unlock an autobuyer for the UP purchase buttons and keep UP and Complex Upgrades on Mandelbrot",
        requirement: 15,
    },
    8: {
        title: "10 Complexes",
        desc: "Keep Y Challenge completions on Mandelbrot and Z-Power never decays",
        requirement: 10,
    },
    9: {
        title: "6 Complexes",
        desc: "Produce all Particles at once, Z doesn't reset when Z-Power sacrificing, and unlock an autobuyer for Z-Power Sacrifice",
        requirement: 6,
    },
    10: {
        title: "4 Complexes",
        desc: "Unlock autobuyers for X Powers Buyables and X Powers Boosters",
        requirement: 4,
    },
    11: {
        title: "2 Complexes",
        desc: "Keep CC completions on Mandelbrot and unlock Auto-Mandelbrot",
        requirement: 2,
    },
    12: {
        title: "0 Complexes",
        desc: "Unlock Y Powers (found in Y-Quadratic tab)",
        requirement: 0,
    },
    has(x) {
        return player.inLostIntegration && player.integrations.gte(1) && player.integration.holes.lte(this[x].requirement)
    }
}

const MetaGenerators = {
    1: {
        title: "Meta-Clickers",
        cost() {
        return player.integration.rebuyableUpgrades[1].gte(10000) ? new Decimal(Infinity) : Decimal.pow(1.5,player.integration.rebuyableUpgrades[1]).floor()
        },
        eff() {
            let eff = player.integration.rebuyableUpgrades[1].add(player.integration.rebuyableUpgrades[5]).mul(Decimal.pow(1.1,player.integration.rebuyableUpgrades[1])).mul(MetaGenerators.mults())
            if(hasPermUpgrade(23)) eff = eff.gt(1e200) ? eff.pow(1.01) : eff.mul(100)
            return eff
        },
        effectDisplay() {
            return format(this.eff()) + "/s";
        },
    },
    2: {
        title: "Meta-Factories",
        cost() {
        return player.integration.rebuyableUpgrades[2].gte(10000) ? new Decimal(Infinity) : Decimal.pow(1.5,player.integration.rebuyableUpgrades[2]).mul(20).floor()
        },
        eff() {
            let eff = player.integration.rebuyableUpgrades[2].add(player.integration.rebuyableUpgrades[6]).mul(Decimal.pow(1.1,player.integration.rebuyableUpgrades[2])).mul(MetaGenerators.mults())
            if(hasPermUpgrade(23)) eff = eff.gt(1e200) ? eff.pow(1.01) : eff.mul(100)
            return eff
        },
        effectDisplay() {
            return format(this.eff()) + "/s";
        },
    },
    3: {
        title: "Meta-Portals",
        cost() {
        return player.integration.rebuyableUpgrades[3].gte(10000) ? new Decimal(Infinity) : Decimal.pow(1.5,player.integration.rebuyableUpgrades[3]).mul(1500).floor()
        },
        eff() {
            let eff = player.integration.rebuyableUpgrades[3].add(player.integration.rebuyableUpgrades[7]).mul(Decimal.pow(1.1,player.integration.rebuyableUpgrades[3])).mul(MetaGenerators.mults())
            if(hasPermUpgrade(23)) eff = eff.gt(1e200) ? eff.pow(1.01) : eff.mul(100)
            return eff
        },
        effectDisplay() {
            return format(this.eff()) + "/s";
        },
    },
    4: {
        title: "Meta-Quasars",
        cost() {
        return player.integration.rebuyableUpgrades[4].gte(10000) ? new Decimal(Infinity) : Decimal.pow(1.5,player.integration.rebuyableUpgrades[4]).mul(1e8).floor()
        },
        eff() {
            let eff = player.integration.rebuyableUpgrades[4].add(player.integration.rebuyableUpgrades[8]).mul(Decimal.pow(1.1,player.integration.rebuyableUpgrades[4])).mul(MetaGenerators.mults())
            if(hasPermUpgrade(23)) eff = eff.gt(1e200) ? eff.pow(1.01) : eff.mul(100)
            return eff
        },
        effectDisplay() {
            return format(this.eff()) + "/s";
        },
    },
    buy(x) {
        if(player.integration.dx.gte(this[x].cost())) {
            player.integration.dx = player.integration.dx.sub(this[x].cost())
            player.integration.rebuyableUpgrades[x] = player.integration.rebuyableUpgrades[x].add(1)
        }
    },
    buyMax() {
        while (player.integration.dx.gte(this[4].cost())) {
            this.buy(4)
        }
        while (player.integration.dx.gte(this[3].cost())) {
            this.buy(3)
        }
        while (player.integration.dx.gte(this[2].cost())) {
            this.buy(2)
        }
        while (player.integration.dx.gte(this[1].cost())) {
            this.buy(1)
        }
    },
    metaPointsEffects(x) {
        if(player.integration.challenge == 14) return new Decimal(1)
        let effectiveMetaPoints = player.integration.emptySets
        if(effectiveMetaPoints.gt("1e9000")) effectiveMetaPoints.div("1e9000").pow(0.5).mul("1e9000")
        switch (x) {
            case 1:
                return player.integration.emptySets.pow(10).add(1).pow(FractalArm.hasUpgrade(73) ? 1.5 : 1) // points mult
            break;
            case 2:
                return Decimal.add(1,effectiveMetaPoints.add(1).log10().add(1).log10().div(50)) // points exponent
            break;
            case 3:
                return effectiveMetaPoints.pow(3).add(1).pow(FractalArm.hasUpgrade(73) ? 1.5 : 1) // RP mult
            break;
            case 4:
                return effectiveMetaPoints.pow(1.5).add(1).pow(FractalArm.hasUpgrade(73) ? 1.5 : 1) // i mult
            break;
            case 5:
                return effectiveMetaPoints.pow(0.75).add(1).pow(FractalArm.hasUpgrade(73) ? 1.5 : 1) // y^2 mult
            break;
        }
    },
    mults() {
        let mult = new Decimal(1)
        if(FractalArm.hasUpgrade(22)) mult = mult.mul(FractalArm[2][2].eff())
        if(FractalArm.hasUpgrade(63)) mult = mult.mul(FractalArm[6][3].eff())
        mult = mult.mul(Minibrots.effect())
        if(FractalArm.hasUpgrade(162)) mult = mult.mul(FractalArm[16][2].eff())
        if(FractalArm.hasUpgrade(182)) mult = mult.mul(FractalArm[18][2].eff())
        return mult
    }
}

const Minibrots = {
    multPerSecond() {
        let mult = new Decimal(1e5)
        mult = mult.mul(Decimal.pow(1e5,player.integration.derivatives.buyables[1]))
        if(FractalArm.hasUpgrade(131)) mult = mult.pow(3)
        mult = mult.pow(this.nanobrotsEffect())
        if(hasPermUpgrade(24)) mult = mult.pow(10)
        return mult
    },
    cap() {
        let cap = new Decimal("1e2950")
        cap = cap.pow(Decimal.add(1,player.integration.derivatives.buyables[2].div(20)))
        if(FractalArm.hasUpgrade(183)) cap = cap.pow(FractalArm[18][3].eff())
        return cap
    },
    effect() {
        let eff = player.integration.derivatives[0].pow(0.01).max(1).pow(FractalArm.hasUpgrade(142) ? 5 : 1)
        return eff
    },
    buyables: {
        1: {
            desc: "Multiply the replication multiplier per second by 100,000",
            cost() {return new Decimal(1e70).mul(Decimal.pow(1e15,player.integration.derivatives.buyables[1])).pow(FractalArm.hasUpgrade(203) ? 0.8 : 1)},
            effectDisplay() {return format(Minibrots.multPerSecond()) + "x"},
        },
        2: {
            desc: "Raise the Minibrots cap by +0.05",
            cost() {return player.integration.derivatives.buyables[2].gte(80) ? new Decimal(Infinity) : new Decimal(1e90).mul(Decimal.pow(1e20,player.integration.derivatives.buyables[2])).pow(FractalArm.hasUpgrade(203) ? 0.8 : 1)},
            effectDisplay() {return "^" + format(Decimal.add(1,player.integration.derivatives.buyables[2].div(20)))},
        },
        3: {
            desc: "+1 max Riemann spheres",
            cost() {return player.integration.derivatives.buyables[3].gte(15) ? new Decimal(Infinity) : new Decimal(1e100).mul(Decimal.pow(1e10,player.integration.derivatives.buyables[3].pow(2))).pow(FractalArm.hasUpgrade(203) ? 0.8 : 1)},
            effectDisplay() {return formatWhole(player.integration.derivatives.buyables[3].mul(FractalArm.hasUpgrade(143) ? 2 : 1)) + " max RSpheres"},
        },
        buy(x) {
            if(player.integration.dx.gte(Minibrots.buyables[x].cost())) {
                player.integration.dx = player.integration.dx.sub(Minibrots.buyables[x].cost())
                player.integration.derivatives.buyables[x] = player.integration.derivatives.buyables[x].add(1)
            }
        },
    },
    buyRiemannSphere() {
        if(player.integration.derivatives[0].gte(Minibrots.cap()) && player.integration.derivatives[1].lt(player.integration.derivatives.buyables[3].mul(FractalArm.hasUpgrade(143) ? 2 : 1)) && player.integration.challenge < 9) {
            player.integration.derivatives[0] = new Decimal(1)
            player.integration.derivatives[1] = player.integration.derivatives[1].add(1)
            if(FractalArm.hasUpgrade(131)) player.integration.derivatives[2] = player.integration.derivatives[2].mul(Minibrots.cap().log10().div(2950))
        }
    },
    riemannSphereEffect() {
        if (player.integration.challenge > 8) return new Decimal(1)
        else return Decimal.pow(1e100,player.integration.derivatives[1])
    },
    nanobrotsEffect() {
        return player.integration.derivatives[2].max(1).log10().add(1)
    }
}