const FractalArm = {
    1: {
        1: {
            desc: "Square roots and X Powers boost each other",
            cost: new Decimal(2),
            type: "normal",
            requirement() {return true},
            eff() {return XPowers.xPowerProduct().pow(1.5).mul(100)}, // square roots
            eff2() {return player.challengeEssence.pow(0.0003).add(1).mul(3)}, // x powers
            effectDisplay() {return format(this.eff()) + "x square roots, " + format(this.eff2()) + "x all X Powers"},
            connections: [11]
        },
    },
    2: {
        1: {
            desc: "Gain more i based on total ME",
            cost: new Decimal(1),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(11)},
            eff() {return player.integration.totaldx.pow(100).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [11],
        },
        2: {
            desc: "Meta-Generators gain a multiplier based on total ME",
            cost: new Decimal(2),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(11)},
            eff() {return player.integration.totaldx.sqrt().add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [11],
        },
        3: {
            desc: "Gain more y² based on total ME",
            cost: new Decimal(2),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(11)},
            eff() {return player.integration.totaldx.pow(5).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [11],
        },
    },
    3: {
        1: {
            desc: "Particles boost their own gain",
            cost: new Decimal(5),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(21)},
            eff() {return player.zlab.particles[1].add(player.zlab.particles[2]).add(player.zlab.particles[3]).pow(0.25).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [21],
        },
        2: {
            desc: "Square the YQU5 effect",
            cost: new Decimal(6),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(23)},
            effectDisplay() {return null},
            connections: [23],
        },
        3: {
            desc: "Start with 1 Point Quasar in Y Challenge 1",
            cost: new Decimal(5),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(23)},
            effectDisplay() {return null},
            connections: [23],
        },
    },
    4: {
        1: {
            desc: "X Powers Boosters are twice as effective",
            cost: new Decimal(18),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(31) || FractalArm.hasUpgrade(33)},
            effectDisplay() {return null},
            connections: [31,33],
        },
    },
    5: {
        1: {
            desc: "Gain 5x more Mandelbrot Essence",
            cost: new Decimal(4),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(41)},
            effectDisplay() {return null},
            connections: [41],
        },
        2: {
            desc: "Unlock Mandelbrot Challenge 3",
            cost: new Decimal(1080),
            type: "mchallenge",
            requirement() {return FractalArm.hasUpgrade(51)},
            effectDisplay() {return null},
            connections: [51],
        },
    },
    6: {
        1: {
            desc: "Delay the generator multiplier softcap to 1e800,000x",
            cost: new Decimal(11),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(62)},
            effectDisplay() {return null},
            connections: [62],
        },
        2: {
            desc: "Add 0.2 to the generator multiplier mult gain",
            cost: new Decimal(5),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(51)},
            effectDisplay() {return null},
            connections: [51],
        },
        3: {
            desc: "Meta-Generators gain a multiplier based on generator multiplier",
            cost: new Decimal(10),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(62)},
            eff() {return GeneratorMultiplier.mult().pow(1/500000)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [62],
        },
    },
    7: {
        1: {
            desc: "y² boosts its own gain",
            cost: new Decimal(8),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(72)},
            eff() {
                let x = player.y2.pow(0.125).add(1)
                if(x.gt(1e200)) x = x.div(1e200).pow(1/3).mul(1e200)
                return x
            },
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [72],
        },
        2: {
            desc: "Gain 100,000x more y²",
            cost: new Decimal(10),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(73)},
            effectDisplay() {return null},
            connections: [73],
        },
        3: {
            desc: "Raise all meta-point multiplier effects ^1.5",
            cost: new Decimal(13),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(62)},
            effectDisplay() {return null},
            connections: [62],
        },
        4: {
            desc: "Raise the YQU11 and YQU13 effects ^1.1",
            cost: new Decimal(5),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(73)},
            effectDisplay() {return null},
            connections: [73],
        },
        5: {
            desc: "Multiply X generation based on Y",
            cost: new Decimal(36),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(74)},
            eff() {return player.y.pow(50).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [74],
        },
    },
    8: {
        1: {
            desc: "You can generate Minibrots",
            cost: new Decimal(60),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(71) || FractalArm.hasUpgrade(75)},
            effectDisplay() {return null},
            connections: [71,75],
        },
    },
    9: {
        1: {
            desc: "Gain more Reset Points based on total ME",
            cost: new Decimal(45),
            type: "resetting",
            requirement() {return FractalArm.hasUpgrade(81) && (!FractalArm.hasUpgrade(92) || FractalArm.hasUpgrade(222))},
            eff() {return player.integration.totaldx.pow(500).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [81],
        },
        2: {
            desc: "Raise the YQU9 effect ^10",
            cost: new Decimal(45),
            type: "yquadratic",
            requirement() {return FractalArm.hasUpgrade(81) && (!FractalArm.hasUpgrade(91) || FractalArm.hasUpgrade(222))},
            effectDisplay() {return null},
            connections: [81],
        },
    },
    10: {
        1: {
            desc: "Unlock Mandelbrot Challenge 1",
            cost: new Decimal(480),
            type: "mchallenge",
            requirement() {return FractalArm.hasUpgrade(102)},
            effectDisplay() {return null},
            connections: [102],
        },
        2: {
            desc: "Multiply X generation based on Minibrots",
            cost: new Decimal(75),
            type: "resetting",
            requirement() {return FractalArm.hasUpgrade(91)},
            eff() {return player.integration.derivatives[0].pow(5).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [91],
        },
        3: {
            desc: "X Powers gain a multiplier based on y²",
            cost: new Decimal(75),
            type: "yquadratic",
            requirement() {return FractalArm.hasUpgrade(92)},
            eff() {return player.y2.pow(0.025).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [92],
        },
    },
    11: {
        1: {
            desc: "Multiply square roots based on i",
            cost: new Decimal(120),
            type: "squareroot",
            requirement() {return FractalArm.hasUpgrade(102) && (!FractalArm.hasUpgrade(112) || FractalArm.hasUpgrade(222))},
            eff() {return player.i.pow(0.15).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [102],
        },
        2: {
            desc: "Gain more i based on Minibrots",
            cost: new Decimal(120),
            type: "complex",
            requirement() {return FractalArm.hasUpgrade(102) && (!FractalArm.hasUpgrade(111) || FractalArm.hasUpgrade(222))},
            eff() {return player.integration.derivatives[0].pow(2).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [102],
        },
        3: {
            desc: "Square the YQU2 effect",
            cost: new Decimal(120),
            type: "yquadratic",
            requirement() {return FractalArm.hasUpgrade(103)},
            effectDisplay() {return null},
            connections: [103],
        },
        4: {
            desc: "Unlock Mandelbrot Challenge 2",
            cost: new Decimal(520),
            type: "mchallenge",
            requirement() {return FractalArm.hasUpgrade(113)},
            effectDisplay() {return null},
            connections: [113],
        },
    },
    12: {
        1: {
            desc: "Minimum Square Root milestone threshold is 1.7x",
            cost: new Decimal(140),
            type: "squareroot",
            requirement() {return FractalArm.hasUpgrade(111)},
            effectDisplay() {return null},
            connections: [111],
        },
        2: {
            desc: "The CU9 formula is better",
            cost: new Decimal(140),
            type: "complex",
            requirement() {return FractalArm.hasUpgrade(112)},
            effectDisplay() {return null},
            connections: [112],
        },
        3: {
            desc: "Gain more y² based on total fractal spirals",
            cost: new Decimal(140),
            type: "yquadratic",
            requirement() {return FractalArm.hasUpgrade(113)},
            eff() {return Decimal.pow(10,player.quaternions[1])},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [113],
        },
    },
    13: {
        1: {
            desc: "You can generate Nanobrots, and generate Minibrots 3x faster",
            cost: new Decimal(220),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(121) || FractalArm.hasUpgrade(122) || FractalArm.hasUpgrade(123)},
            effectDisplay() {return null},
            connections: [121,122,123],
        },
    },
    14: {
        1: {
            desc: "Mandelbrot Essence boosts its own gain",
            cost: new Decimal(680),
            type: "messence",
            requirement() {return FractalArm.hasUpgrade(131) && (!(FractalArm.hasUpgrade(142) || FractalArm.hasUpgrade(143)) || FractalArm.hasUpgrade(202))},
            eff() {return player.integration.dx.pow(0.02).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [131],
        },
        2: {
            desc: "The Minibrots effect is raised ^5",
            cost: new Decimal(680),
            type: "mgenerators",
            requirement() {return FractalArm.hasUpgrade(131) && (!(FractalArm.hasUpgrade(141) || FractalArm.hasUpgrade(143)) || FractalArm.hasUpgrade(202))},
            effectDisplay() {return null},
            connections: [131],
        },
        3: {
            desc: "Double max Riemann spheres",
            cost: new Decimal(680),
            type: "rspheres",
            requirement() {return FractalArm.hasUpgrade(131) && (!(FractalArm.hasUpgrade(141) || FractalArm.hasUpgrade(142)) || FractalArm.hasUpgrade(202))},
            effectDisplay() {return null},
            connections: [131],
        },
    },
    15: {
        1: {
            desc: "Unlock Mandelbrot Challenge 4",
            cost: new Decimal(1300),
            type: "mchallenge",
            requirement() {return FractalArm.hasUpgrade(152)},
            effectDisplay() {return null},
            connections: [152],
        },
        2: {
            desc: "Gain 1% of i gain on Complex and y² gain on Y-Quadratic every second, and Z is not spent when sacrificed",
            cost: new Decimal(480),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(141) || FractalArm.hasUpgrade(142) || FractalArm.hasUpgrade(143)},
            effectDisplay() {return null},
            connections: [141,142,143],
        },
    },
    16: {
        1: {
            desc: "Mandelbrot Essence and Y Powers boost each other",
            cost: new Decimal(125),
            type: "messence",
            requirement() {return FractalArm.hasUpgrade(152) && (!(FractalArm.hasUpgrade(162) || FractalArm.hasUpgrade(163)) || FractalArm.hasUpgrade(202))},
            eff() {return YPowers.yPowerProduct().pow(0.25)}, // mandelbrot essence
            eff2() {return player.integration.dx.max(1).ln()}, // Y Powers
            effectDisplay() {return format(this.eff()) + "x ME, " + format(this.eff2()) + "x Y Powers"},
            connections: [152],
        },
        2: {
            desc: "Meta-Generators gain a multiplier based on the Y Power product",
            cost: new Decimal(125),
            type: "mgenerators",
            requirement() {return FractalArm.hasUpgrade(152) && (!(FractalArm.hasUpgrade(161) || FractalArm.hasUpgrade(163)) || FractalArm.hasUpgrade(202))},
            eff() {return YPowers.yPowerProduct().pow(1.5)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [152],
        },
        3: {
            desc: "Riemann spheres divide Z cost scaling, caps at /1.03",
            cost: new Decimal(125),
            type: "rspheres",
            requirement() {return FractalArm.hasUpgrade(152) && (!(FractalArm.hasUpgrade(161) || FractalArm.hasUpgrade(162)) || FractalArm.hasUpgrade(202))},
            eff() {return Decimal.add(1,player.integration.derivatives[1].div(750)).min(1.03)},
            effectDisplay() {return "/" + regularFormat(this.eff(),3)},
            connections: [152],
        },
    },
    17: {
        1: {
            desc: "Bought Meta-Clickers produce Meta-Quasars",
            cost: new Decimal(900),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(161) || FractalArm.hasUpgrade(162) || FractalArm.hasUpgrade(163)},
            effectDisplay() {return null},
            connections: [161,162,163],
        },
    },
    18: {
        1: {
            desc: "Gain more ME based on your fastest Mandelbrot",
            cost: new Decimal(375),
            type: "messence",
            requirement() {return FractalArm.hasUpgrade(171) && (!(FractalArm.hasUpgrade(182) || FractalArm.hasUpgrade(183)) || FractalArm.hasUpgrade(202))},
            eff() {return Decimal.div(1,player.gamePrestigeTimes[7].max(0.025)).pow(10)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [171],
        },
        2: {
            desc: "Meta-Generators gain a multiplier based on time in this Mandelbrot",
            cost: new Decimal(375),
            type: "mgenerators",
            requirement() {return FractalArm.hasUpgrade(171) && (!(FractalArm.hasUpgrade(181) || FractalArm.hasUpgrade(183)) || FractalArm.hasUpgrade(202))},
            eff() {return player.gamePrestigeTimes[6].pow(30).max(0).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [171],
        },
        3: {
            desc: "Riemann spheres raise the Minibrots cap",
            cost: new Decimal(375),
            type: "rspheres",
            requirement() {return FractalArm.hasUpgrade(171) && (!(FractalArm.hasUpgrade(181) || FractalArm.hasUpgrade(182)) || FractalArm.hasUpgrade(202))},
            eff() {return player.integration.derivatives[1].pow(0.1).add(1)},
            effectDisplay() {return "^" + format(this.eff())},
            connections: [171],
        },
    },
    19: {
        1: {
            desc: "The second CU5 effect is uncapped, but its effect is heavily reduced",
            cost: new Decimal(1120),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(181) || FractalArm.hasUpgrade(182) || FractalArm.hasUpgrade(183)},
            effectDisplay() {return null},
            connections: [181,182,183],
        },
        2: {
            desc: "Unlock Mandelbrot Challenge 5",
            cost: new Decimal(250),
            type: "mchallenge",
            requirement() {return FractalArm.hasUpgrade(191)},
            effectDisplay() {return null},
            connections: [191],
        },
    },
    20: {
        1: {
            desc: "Keep Riemann spheres on Mandelbrot, even if your current amount exceeds the cap",
            cost: new Decimal(1000),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(202)},
            effectDisplay() {return null},
            connections: [202],
        },
        2: {
            desc: "You can buy all upgrades from the second split",
            cost: new Decimal(1150),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(191)},
            effectDisplay() {return null},
            connections: [191],
        },
        3: {
            desc: "All Minibrot upgrade costs are raised ^0.8",
            cost: new Decimal(2900),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(202)},
            effectDisplay() {return null},
            connections: [202],
        },
    },
    21: {
        1: {
            desc: "Y Powers gain a multiplier based on the Y Powers product",
            cost: new Decimal(3850),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(201) || FractalArm.hasUpgrade(202)},
            eff() {return YPowers.yPowerProduct().add(1).max(1).ln().pow(4)},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [201,202],
        },
        2: {
            desc: "Y Powers gain a multiplier based on Riemann spheres",
            cost: new Decimal(3850),
            type: "normal",
            requirement() {return FractalArm.hasUpgrade(202) || FractalArm.hasUpgrade(203)},
            eff() {return Decimal.pow(2,player.integration.derivatives[1])},
            effectDisplay() {return format(this.eff()) + "x"},
            connections: [202,203],
        },
    },
    22: {
        1: {
            desc: "Beat the game! (12,345 total fractal spirals required)",
            cost: new Decimal(0),
            type: "normal",
            requirement() {return (FractalArm.hasUpgrade(211) || FractalArm.hasUpgrade(212)) && player.quaternions[1].gte(12345)},
            effectDisplay() {return null},
            connections: [211,212],
        },
    },
    buy(x,y) {
        if(player.quaternions[0].gte(FractalArm[x][y].cost) && FractalArm[x][y].requirement() && !FractalArm.hasUpgrade(x.toString() + y.toString())) {
            player.quaternions[0] = player.quaternions[0].sub(FractalArm[x][y].cost)
            player.hypercompUpgs.dynamic.push(x.toString() + y.toString())
        }
    },
    hasUpgrade(x) {
        return player.hypercompUpgs.dynamic.includes(x.toString())
    },
    spiralCost(x) {
        switch (x) {
            case 1:
                return new Decimal(1e112).mul(Decimal.pow(1e32,player.hypercompUpgs.purchases[x-1]))
            break;
            case 2:
                return new Decimal(1e125).mul(Decimal.pow(1e50,player.hypercompUpgs.purchases[x-1]))
            break;
            case 3:
                return Decimal.pow(2,player.hypercompUpgs.purchases[x-1] + 1).mul(Decimal.pow(2,player.hypercompUpgs.purchases[x-1] ** 2))
            break;
        }
    },
    buySpiral(x) {
        switch (x) {
            case 1:
                if(player.y2.gte(this.spiralCost(x))) {
                    player.y2 = player.y2.sub(this.spiralCost(x))
                    player.quaternions[0] = player.quaternions[0].add(1)
                    player.quaternions[1] = player.quaternions[1].add(1)
                    player.hypercompUpgs.purchases[x-1] += 1
                }
            break;
            case 2:
                if(player.zlab.zpower.gte(this.spiralCost(x))) {
                    player.zlab.zpower = player.zlab.zpower.sub(this.spiralCost(x))
                    player.quaternions[0] = player.quaternions[0].add(1)
                    player.quaternions[1] = player.quaternions[1].add(1)
                    player.hypercompUpgs.purchases[x-1] += 1
                }
            break;
            case 3:
                if(player.integration.dx.gte(this.spiralCost(x))) {
                    player.integration.dx = player.integration.dx.sub(this.spiralCost(x))
                    player.quaternions[0] = player.quaternions[0].add(1)
                    player.quaternions[1] = player.quaternions[1].add(1)
                    player.hypercompUpgs.purchases[x-1] += 1
                }
            break;
        }
    },
    buyMaxSpirals() {
        while(player.y2.gte(this.spiralCost(1))) {
            this.buySpiral(1)
        }
        while(player.zlab.zpower.gte(this.spiralCost(2))) {
            this.buySpiral(2)
        }
        while(player.integration.dx.gte(this.spiralCost(3))) {
            this.buySpiral(3)
        }
    },
    respec(force) {
        if(force || confirm("Are you sure you want to respec your Fractal Arm? You will enter the Mandelbrot with no reward!")) {
            player.quaternions[0] = player.quaternions[1]
            if(player.hypercompUpgs.dynamic.length == 0 && !hasSecretAchievement(28) && force == false) {
              player.secretAchievements.push('28')
              $.notify("Secret Achievement Unlocked: This Again?", {
                style: 'apcurrent',
                className:'secretAchieves',
              });
            }
            player.hypercompUpgs.dynamic = []
            if(!force) MandelbrotPrestige.enterMandelbrot(true)
        }
    },
    export() {
        let str = player.hypercompUpgs.dynamic.toString();
        const el = document.createElement("textarea");
        el.value = str;
        document.body.appendChild(el);
        el.select();
        el.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.body.removeChild(el);
        $.notify('Fractal Arm preset exported!', {
            style: 'apcurrent',
            className:'saving',
        });
    },
    load(imported = undefined) {
        if (imported === undefined) imported = prompt("Paste your Fractal Arm preset in the input box below! (This will reset your run with no reward!)")
        let arr = imported.split(",");
        player.quaternions[0] = player.quaternions[1]
        player.hypercompUpgs.dynamic = []
        this.respec(true)
        MandelbrotPrestige.enterMandelbrot(true)
        for (let i = 0; i < arr.length; i++) {
            let str = arr[i].toString()
            let str1 = str.length == 3 ? str.substring(0,2) : str.substring(0,1)
            let str2 = str.substring(str.length == 3 ? 2 : 1)
            FractalArm.buy(+str1,+str2)
        }
    },
    savePreset(x) {
        const answer = prompt("Type your exported Fractal Arm preset in here!\nIf you type nothing, it will save your current preset")
        if (answer===null) return false
        let str = player.hypercompUpgs.dynamic.toString();
        player.presets.info[x] = answer||str
    },
    loadPreset(x) {
        this.load(player.presets.info[x])
    },
    class(x,y) {
        let type = FractalArm[x][y].type
        let buyable = player.quaternions[0].gte(FractalArm[x][y].cost) && FractalArm[x][y].requirement() && !FractalArm.hasUpgrade(x.toString()+y.toString())
        let bought = FractalArm.hasUpgrade(x.toString()+y.toString())
        if((player.quaternions[0].lt(FractalArm[x][y].cost) || !FractalArm[x][y].requirement()) && !FractalArm.hasUpgrade(x.toString()+y.toString())) return "upgradeLockedLI"
        switch (type) {
            case "normal":
                if(buyable) return "upgradeBuyableLI"
                if(bought) return "upgradeBoughtLI"
            break;
            case "yquadratic":
                if(buyable) return "yquadUpgradeBuyableLI"
                if(bought) return "yquadUpgradeBoughtLI"
            break;
            default:
                if(buyable) return type + "FAUpgradeBuyable"
                if(bought) return type + "FAUpgradeBought"
            break;
        }
    },
}

const MandelbrotChallenges = {
    // Effective Mandelbrot Challenge is "Integration Challenge n+8"
    // Therefore, Mandelbrot Challenge 1 in the game's data is "Integration Challenge 9"
    1: {
        desc() {return "i and y² gain are both raised ^0.25."},
        logarithmDivisor() {return new Decimal(3e7)},
        rewardDesc: "Power the YQU6 effect.",
        eff() {return Decimal.add(1,(120 - player.integration.chalCompletions[9][1]) / 100)},
        effectDisplay() {return "^" + format(this.eff())},
        unlocked() {return FractalArm.hasUpgrade(101)},
    },
    2: {
        desc() {return "Particles cannot be generated."},
        logarithmDivisor() {return new Decimal(5e7)},
        rewardDesc: "Power Particles gain.",
        eff() {return Decimal.add(1,(120 - player.integration.chalCompletions[9][2]) / 500)},
        effectDisplay() {return "^" + format(this.eff())},
        unlocked() {return FractalArm.hasUpgrade(114)},
    },
    3: {
        desc() {return "X and Y generation are both raised ^0.5."},
        logarithmDivisor() {return new Decimal(3e7)},
        rewardDesc: "Power X generation.",
        eff() {
            let x = Decimal.add(1,(120 - player.integration.chalCompletions[9][3]) / 500)
            if(x.gt(1.03)) x = x.sub(1.03).div(4).add(1.03)
            return x
        },
        effectDisplay() {return "^" + format(this.eff())},
        unlocked() {return FractalArm.hasUpgrade(52)},
    },
    4: {
        desc() {return "The gain formulas for i and y² get worse the more times you go Complex/Y-Quadratic. Passive generation is disabled."},
        logarithmDivisor() {return new Decimal(7e7)},
        rewardDesc: "Gain more i based on time in this Mandelbrot.",
        eff() {return player.gamePrestigeTimes[6].pow((120 - player.integration.chalCompletions[9][4]) * 100)},
        effectDisplay() {return format(this.eff()) + "x"},
        unlocked() {return FractalArm.hasUpgrade(151)},
    },
    5: {
        desc() {return "You cannot generate X Powers past x⁵."},
        logarithmDivisor() {return new Decimal(1.5e8)},
        rewardDesc: "Add effective completions to all CC rewards.",
        eff() {return (120 - player.integration.chalCompletions[9][5]) / 120},
        effectDisplay() {return "+" + format(this.eff())},
        unlocked() {return FractalArm.hasUpgrade(192)},
    },
    interactWithMC(x) {
        if (player.integration.challenge != x+8 && MandelbrotChallenges[x].unlocked()) { // enter mandelbrot challenge
            MandelbrotPrestige.enterMandelbrot(true);
            player.integration.challenge = x+8;
        } else if (player.integration.challenge == x+8) { // exit mandelbrot challenge
            player.integration.challenge = 0
            MandelbrotPrestige.enterMandelbrot(true);
        }
    },
}

let canvas3, ctx3, arr, upgarr, btn1, btn2;
upgarr = ["11","21","22","23","31","32","33","41","51","52","61","62","63","71","72","73","74","75","81","91","92","101","102","103","111","112","113","114","121","122","123","131","141","142","143","151","152","161","162","163","171","181","182","183","191","192","201","202","203","211","212","221"]

setInterval(() => {
    if(player.inLostIntegration) {
        canvas3 = document.querySelector("#fractalArmDiv canvas")
        ctx3 = canvas3.getContext("2d")
        canvas3.width = 2000;
        canvas3.height = 5000;
        ctx3.strokeStyle = "#bbbbbb";
        ctx3.lineWidth = 15;
        ctx3.clearRect(0, 0, 100000, 100000)

        arr = document.getElementById("fractalArmDiv").querySelectorAll("button")
        for (let i = 0; i < arr.length; i++) {
            btn1 = document.getElementById(arr[i].id)

            let str1 = upgarr[i].length == 3 ? upgarr[i].substring(0,2) : upgarr[i].substring(0,1)
            let str2 = upgarr[i].substring(upgarr[i].length == 3 ? 2 : 1)

            for (let j = 0; j < FractalArm[+str1][+str2].connections.length; j++) {
                btn2 = document.getElementById("fractalArmUpgrade" + FractalArm[+str1][+str2].connections[j])

                // Start a new Path
                ctx3.beginPath();
                ctx3.moveTo(btn1.getBoundingClientRect().x + 100, btn1.getBoundingClientRect().y + 80);
                ctx3.lineTo(btn2.getBoundingClientRect().x + 100, btn2.getBoundingClientRect().y + 80);

                // Draw the Path
                ctx3.stroke();
            }
        }
    }
},0)