const ComplexChallengesLI = {
    1: {
        desc() {return "Reset Point gain is raised to an exponent based on your point amount (always less than 1)."},
        secondaryRequirement: {
            internal() {return player.points},
            name: "points",
            goals: [new Decimal("1e18000"),new Decimal("1e30700"),new Decimal("1e53700"),new Decimal(Infinity)],
        },
        goals: [new Decimal("1e740"),new Decimal("1e1270"),new Decimal("1e2650"),new Decimal(Infinity)],
        rewardDesc: "Power the rtu34 effect.",
        eff() {return player.yChallenge == 6 ? new Decimal(1) : Decimal.add(1,Decimal.div(1,3).mul(player.compChalCompletions[1] + (hasYQU(14,'lost') ? 1 : 0) + MandelbrotChallenges[5].eff()))},
        effectDisplay() {return "^" + format(this.eff())},
        unlockCost: new Decimal(10),
    },
    2: {
        desc() {return "X generation is raised ^0.5 and produced generators do nothing. Anti-points super-exponentially generate over time and divide point gain and divide RP gain at a reduced rate."},
        secondaryRequirement: {
            internal() {return player.buyables[7]},
            name: "produced Autoclickers",
            goals: [new Decimal("1e3000"),new Decimal("1e11300"),new Decimal("1e18500"),new Decimal(Infinity)],
        },
        goals: [new Decimal("1e1790"),new Decimal("1e5930"),new Decimal("1e8450"),new Decimal(Infinity)],
        rewardDesc: "Power production of generators.",
        eff() {return player.yChallenge == 6 ? new Decimal(1) : Decimal.add(1,(player.compChalCompletions[2] + (hasYQU(14,'lost') ? 1 : 0) + MandelbrotChallenges[5].eff()) / 25)},
        effectDisplay() {return "^" + format(this.eff())},
        unlockCost: new Decimal(15),
    },
    3: {
        desc() {return "X cost is ^10 and Y cost is ^4. X generation is raised ^0.75. If your purchased X and Y amounts share a GCF, point gain will be negatively affected based on the factor."},
        secondaryRequirement: {
            internal() {return player.x},
            name: "x",
            goals: [new Decimal("1e670"),new Decimal("1e2270"),new Decimal("1e7120"),new Decimal(Infinity)],
        },
        goals: [new Decimal("1e730"),new Decimal("1e3350"),new Decimal("1e11800"),new Decimal(Infinity)],
        rewardDesc: "Divide X cost scaling.",
        eff() {return player.yChallenge == 6 ? new Decimal(1) : Decimal.add(1,(player.compChalCompletions[3] + (hasYQU(14,'lost') ? 1 : 0) + MandelbrotChallenges[5].eff()) / 200)},
        effectDisplay() {return "/" + regularFormat(this.eff(),3)},
        unlockCost: new Decimal(20),
    },
    4: {
        desc() {return "Reset Table upgrades with dynamic effects and Exponential Curve effects are useless."},
        secondaryRequirement: {
            internal() {return player.x2},
            name: "reset points",
            goals: [new Decimal("1e3750"),new Decimal("1e4600"),new Decimal("1e8000"),new Decimal(Infinity)],
        },
        goals: [new Decimal("1e2100"),new Decimal("1e2650"),new Decimal("1e4370"),new Decimal(Infinity)],
        rewardDesc: "Multiply Reset Point gain.",
        eff() {return player.yChallenge == 6 ? new Decimal(1) : Decimal.pow(1e100,(player.compChalCompletions[4] + (hasYQU(14,'lost') ? 1 : 0) + MandelbrotChallenges[5].eff())).pow(player.compChalCompletions[4] >= 3 ? 1.5 : 1)},
        effectDisplay() {return format(this.eff()) + "x"},
        unlockCost: new Decimal(25),
    },
    5: {
        desc() {return "You cannot gain X and Y. The base Reset Points gain formula is 1, so only multipliers apply. You are also trapped in Square Root with Root Epicenter Task -1, just for fun."},
        secondaryRequirement: {
            internal() {return player.challengeEssence},
            name: "square roots",
            goals: [new Decimal(1e200),new Decimal("1e730"),new Decimal("1e850"),new Decimal(Infinity)],
        },
        goals: [new Decimal(1e210),new Decimal("1e1370"),new Decimal("1e1520"),new Decimal(Infinity)],
        rewardDesc: "Multiply X generation.",
        eff() {return player.yChallenge == 6 ? new Decimal(1) : Decimal.pow(1e50,(player.compChalCompletions[5] + MandelbrotChallenges[5].eff()) ** 2)},
        effectDisplay() {return format(this.eff()) + "x"},
        unlockCost: new Decimal(30),
    },
    6: {
        desc() {return "Square Root Upgrade 3 is disabled, and the generator multiplier is always 1x."},
        secondaryRequirement: {
            internal() {return player.rootEssence},
            name: "root essence",
            goals: [new Decimal(2e19),new Decimal(1e52),new Decimal(1e120),new Decimal(Infinity)],
        },
        goals: [new Decimal("1e440"),new Decimal("1e3180"),new Decimal("1e36000"),new Decimal(Infinity)],
        rewardDesc: "Multiply root essence gain.",
        eff() {return player.yChallenge == 6 ? new Decimal(1) : Decimal.pow(10000,player.compChalCompletions[6] + MandelbrotChallenges[5].eff())},
        effectDisplay() {return format(this.eff()) + "x"},
        unlockCost: new Decimal(40),
    },
    7: {
        desc() {return "Point gain is powered by an exponent based on a sine wave. The amplitude is multiplied based on your Reset Points."},
        secondaryRequirement: {
            internal() {return new Decimal(ccTiers())},
            name: "CC tiers",
            goals: [new Decimal(10),new Decimal(16),new Decimal(22),new Decimal(Infinity)],
        },
        goals: [new Decimal("1e3220"),new Decimal("1e7550"),new Decimal("1e34880"),new Decimal(Infinity)],
        rewardDesc: "Generators gain a multiplier based on time in this Complex.",
        eff() {return player.yChallenge == 6 ? new Decimal(1) : new Decimal(player.gamePrestigeTimes[2]).add(1).pow(Decimal.mul(300,Decimal.pow(player.compChalCompletions[7] >= 3 ? 3 : 2.5,player.compChalCompletions[7] + MandelbrotChallenges[5].eff()))).pow(player.compChalCompletions[7] > 0 ? 1 : 0)},
        effectDisplay() {return format(this.eff()) + "x"},
        unlockCost: new Decimal(50),
    },
    10: {
        desc() {return "Complex Upgrades are disabled, including Basic Complex Upgrades (excluding bcu13 and bcu23). Point gain is raised ^0.1."},
        secondaryRequirement: {
            internal() {return player.i},
            name: "i",
            goals: [new Decimal(1.79e308),new Decimal("3.23e616"),new Decimal("1.87e1541"),new Decimal(Infinity)],
        },
        goals: [new Decimal("1e1380"),new Decimal("1e2890"),new Decimal("1e4800"),new Decimal(Infinity)],
        rewardDesc: "Power i gain.",
        eff() {return player.yChallenge == 6 ? new Decimal(1) : Decimal.add(1,(player.compChalCompletions[10] + MandelbrotChallenges[5].eff()) / 50)},
        effectDisplay() {return "^" + format(this.eff())},
        unlockCost: new Decimal(60),
    },
    interactWithCC(x) {
        if(player.unlocked == 0 && !FractalMilestones.has(5) && ComplexChallengesLI[x].secondaryRequirement.internal().gte(ComplexChallengesLI[x].secondaryRequirement.goals[player.compChalCompletions[x]]) && player.upgradePoints[0].gte(ComplexChallengesLI[x].unlockCost)) { // unlock complex challenge
            player.upgradePoints[0] = player.upgradePoints[0].sub(ComplexChallengesLI[x].unlockCost);
            player.unlocked = x;
        } else if ((player.unlocked == x || FractalMilestones.has(5)) && player.compChallenge == 0) { // enter complex challenge
            player.compChallenge = x;
            ComplexPrestigeLI.goComplex(true);
            player.compChallenge = x;
        } else if ((player.unlocked == x || FractalMilestones.has(5)) && player.compChallenge == x) { // exit/complete complex challenge
            if(FractalMilestones.has(5) && player.x2.gte(ComplexChallengesLI[x].goals[player.compChalCompletions[x]]) && player.compChalCompletions[x] < 5) {
                while(player.x2.gte(ComplexChallengesLI[x].goals[player.compChalCompletions[x]])) {
                    player.compChalCompletions[x]++;
                }
                if(!FractalMilestones.has(5)) player.upgradePoints[0] = player.upgradePoints[0].add(ComplexChallengesLI[x].unlockCost);
                player.unlocked = 0
                ComplexPrestigeLI.goComplex(true);
            } else {
                if(player.x2.gte(ComplexChallengesLI[x].goals[player.compChalCompletions[x]])) {
                    player.compChalCompletions[x]++;
                    if(!FractalMilestones.has(5)) player.upgradePoints[0] = player.upgradePoints[0].add(ComplexChallengesLI[x].unlockCost);
                    player.unlocked = 0
                    if(ccTiers() == 12 && !player.zUnlocked) {
                        $.notify('The strange presence enters the Generation tab...', {
                            style: 'apcurrent',
                            className:'unlock',
                        });
                    }
                }
                ComplexPrestigeLI.goComplex(true);
            }
        }
        if(player.options[4] && player.compChallenge == 0 && player.unlocked > 0) {
            player.upgradePoints[0] = player.upgradePoints[0].add(ComplexChallengesLI[player.unlocked].unlockCost)
            player.unlocked = 0
            player.options[4] = false
        }
    },
    milestones: {
        1: {
            title: "3 CC tiers",
            desc: "Gain more points based on CC tiers",
            requirement: 3,
            eff() {return new Decimal(ccTiers()).add(1).pow(1000)},
            effectDisplay() {return format(this.eff()) + "x"},
        },
        2: {
            title: "6 CC tiers",
            desc: "Gain more root essence based on CC tiers",
            requirement: 6,
            eff() {return new Decimal(ccTiers()).add(1).pow(20)},
            effectDisplay() {return format(this.eff()) + "x"},
        },
        3: {
            title: "9 CC tiers",
            desc: "Gain more i based on unspent i",
            requirement: 9,
            eff() {return player.i.pow(0.01).add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
        },
        4: {
            title: "12 CC tiers",
            desc: "Gain more square roots based on total points",
            requirement: 12,
            eff() {return player.totalPoints.ln()},
            effectDisplay() {return format(this.eff()) + "x"},
        },
        5: {
            title: "16 CC tiers",
            desc: "Gain 1% of Reset Point gain on Reset every second",
            requirement: 16,
            effectDisplay() {return null},
        },
        6: {
            title: "24 CC tiers",
            desc: "Unlock X Powers",
            requirement: 24,
            effectDisplay() {return null},
        },
        has(x) {
            return ccTiers() >= ComplexChallengesLI.milestones[x].requirement
        }
    },
}