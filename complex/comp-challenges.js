const COMP_CHALLENGES = {
  1: {
    title: "Incomplete Square",
    desc() {return "x² gain is raised to an exponent based on your point amount (always less than 1)."},
    goals: [new Decimal("1e14200"),new Decimal("1e21800"),new Decimal("1e23100"),new Decimal("1e24000"),new Decimal("1e24700"),new Decimal("1e7.7777e11"),new Decimal(Infinity)],
    rewardDesc: "Add to the exponent of Quadratic Bonus.",
    eff() {return player.compChalCompletions[1] >= 6 ? new Decimal(0.3) : new Decimal(0.03).mul(player.compChalCompletions[1])},
    effectDisplay() {return "+" + format(COMP_CHALLENGES[1].eff()) + " Quadratic Bonus exponent" + (player.compChalCompletions[1] >= 6 ? ", and the Quadratic Bonus hardcap is removed" : "")},
    unlockCost: new Decimal(10),
  },
  2: {
    title: "Anti-Graphing",
    desc() {return "Slope and b are disabled. Produced buildings do nothing. Anti-slope super-exponentially rises over time and divides point gain and divides x² gain at a reduced rate."},
    goals: [new Decimal("1e5600"),new Decimal("1e6100"),new Decimal("1e8610"),new Decimal("1e9010"),new Decimal("1e18400"),new Decimal("1e1.95e12"),new Decimal(Infinity)],
    rewardDesc: "Multiply the hardcap starts of the 2nd and 3rd effects of b.",
    eff() {return player.compChalCompletions[2] >= 6 ? new Decimal(1.24) : new Decimal(1).add(Decimal.pow(2,player.compChalCompletions[2] - 1).div(100))},
    effectDisplay() {return format(COMP_CHALLENGES[2].eff()) + "x b effect hardcaps"},
    unlockCost: new Decimal(15),
  },
  3: {
    title: "Greatest Common Factor",
    desc() {return "X cost is ^10 and Y cost is ^4. If your X and Y amounts share a Greatest Common Factor (GCF), point gain will be negatively affected based on the factor."},
    goals: [new Decimal("1e9060"),new Decimal("1e9800"),new Decimal("1e10800"),new Decimal("1e11200"),new Decimal("1e11600"),new Decimal("1e2.05e12")],
    rewardDesc: "Divide the X and Y cost scalings.",
    eff() {return new Decimal(1).add(Decimal.mul(0.03,player.compChalCompletions[3]))},
    effectDisplay() {return "/" + format(COMP_CHALLENGES[3].eff()) + " X and Y cost scalings"},
    unlockCost: new Decimal(20),
  },
  4: {
    title: "The Failable One",
    desc() {return "All boosts based on times gone Quadratic and boosts to Quadratics gain are disabled. You also must beat the challenge in " + formatWhole(new Decimal(20).sub(player.compChalCompletions[4]*5).max(0)) + " Quadratics or less, or else you fail the challenge."},
    goals: [new Decimal("1e34100"),new Decimal("1e40800"),new Decimal("1e42400"),new Decimal("1e63800"),new Decimal("1e92700"),new Decimal("1e1.18e12"),new Decimal(Infinity)],
    rewardDesc: "Multiply Quadratics gain, and power all Quadratic-based effects.",
    eff() {return player.compChalCompletions[4] >= 6 ? new Decimal("1e50000") : Decimal.pow(2,player.compChalCompletions[4])},
    eff2() {return Decimal.add(1,player.compChalCompletions[4] / 8)},
    effectDisplay() {return format(COMP_CHALLENGES[4].eff()) + "x Quadratics, ^" + format(COMP_CHALLENGES[4].eff2()) + " Quadratic-based effects" + (player.compChalCompletions[1] >= 6 ? ", ^1.05 x² gain" : "")},
    unlockCost: new Decimal(30),
  },
  5: {
    title: "Constance",
    desc() {return "You cannot gain " + (player.zUnlocked ? "X, Y, and Z" : "X and Y") + ". The base x² gain formula is 1, so only multipliers apply. You are also trapped in Root Epicenter Level √" + (player.compChalCompletions[5] >= 4 ? "-1" : player.compChalCompletions[5]+1) + ", just for fun."},
    goals: [new Decimal("1e2620"),new Decimal("1e3800"),new Decimal("1e4650"),new Decimal("1e6200"),new Decimal("1e8000"),new Decimal("1e2.15e12"),new Decimal(Infinity)],
    rewardDesc: "Multiply the gains of sacrificed X and Y.",
    eff() {return player.compChalCompletions[5] >= 6 ? new Decimal(1e9) : Decimal.pow(1.2,player.compChalCompletions[5])},
    effectDisplay() {return format(COMP_CHALLENGES[5].eff()) + "x sacrificed X and Y gain"},
    unlockCost: new Decimal(40),
  },
  6: {
    title: "Inequality",
    desc() {return "If you have more Buildings bought than Functions bought, your number and points per second will be \"less than\" their amounts, halting point generation. Point gain is divided by 1e75,000, but you start with 1e9 Points."},
    goals: [new Decimal("1e6800"),new Decimal("1e13700"),new Decimal("1e95500"),new Decimal("1e454000"),new Decimal("1e1140000"),new Decimal("1e5.9e12"),new Decimal(Infinity)],
    rewardDesc: "Delay the g(n) and h(n) softcap starts based on total Buildings bought.",
    eff() {return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).add(1).pow((player.compChalCompletions[6] > 0 ? 0.3+(player.compChalCompletions[6] > 3 ? 0.12+((player.compChalCompletions[6]-3) * 0.02) : player.compChalCompletions[6]*0.04) : 0) + (player.compChalCompletions[6] >= 6 ? 0.15 : 0)).sub(1).min(hasYQU(16,'bought') ? Infinity : 10000).floor()},
    effectDisplay() {return "+" + formatWhole(COMP_CHALLENGES[6].eff()) + " g(n) and h(n) softcaps"},
    unlockCost: new Decimal(50),
  },
  7: {
    title: "Sine Wave",
    desc() {return "Point gain is powered by an exponent based on a sine wave. The amplitude is multiplied based on your slope."},
    goals: [new Decimal("1e16800"),new Decimal("1e22900"),new Decimal("1e68000"),new Decimal("1e100000"),new Decimal("1e318000"),new Decimal("1e2.16e12"),new Decimal(Infinity)],
    rewardDesc: "Gain more x² based on time in this Complex.",
    eff() {return new Decimal(player.gamePrestigeTimes[2]).add(1).pow(Decimal.mul(100,Decimal.pow(2.5,player.compChalCompletions[7]))).pow(player.compChalCompletions[7] > 0 ? 1 : 0).pow(SinusoidalUpgrades[12].eff()).pow(player.compChalCompletions[7] >= 6 ? 3000 : 1)},
    effectDisplay() {return format(COMP_CHALLENGES[7].eff()) + "x x² gain"},
    unlockCost: new Decimal(50),
  },
  8: {
    title: "Sadistic",
    desc() {return "Quadratic Challenges 1-8 and 10 are all applied at the same time. However, buying X and Y no longer spend purchases, and you start with 2 Point Portals."},
    goals: [new Decimal("1e6100"),new Decimal("1e13800"),new Decimal("1e82300"),new Decimal("1e145000"),new Decimal("1e195000"),new Decimal("1e2.06e12")],
    rewardDesc: "Power the Challenge 1 hardcap start.",
    eff() {return player.compChalCompletions[8] >= 4 ? (player.compChalCompletions[8] >= 6 ? new Decimal(500000000) : Decimal.pow(1.6,player.compChalCompletions[8]).floor()) : Decimal.add(1,player.compChalCompletions[8])},
    effectDisplay() {return "^" + format(COMP_CHALLENGES[8].eff()) + " C1 hardcap"},
    unlockCost: new Decimal(50),
  },
  9: {
    title: "Quadratic Power Outage",
    desc() {return "The multiplier from \"Quadratic Bonus\" is 1x. QP gain is raised ^0.5. You can only buy up to " + formatWhole(new Decimal(20).sub(player.compChalCompletions[9]*5).max(0)) + " Quadratic Formula buyables, and the Quadratic Formula Buyable autobuyer is disabled."},
    goals: [new Decimal("1e41400"),new Decimal("1e70700"),new Decimal("1e150300"),new Decimal("1e520000"),new Decimal("1e570000"),new Decimal("1e1.1e12"),new Decimal(Infinity)],
    rewardDesc: "Power Quadratic Power gain.",
    eff() {return player.compChalCompletions[9] >= 6 ? new Decimal(3.6) : Decimal.add(1,new Decimal(player.compChalCompletions[9]).mul(0.3))},
    effectDisplay() {return "^" + format(COMP_CHALLENGES[9].eff()) + " Quadratic Power gain"},
    unlockCost: new Decimal(50),
  },
  10: {
    title: "Upgradeless",
    desc() {return "Complex Upgrades are disabled, including Basic Complex Upgrades 1-5 and 7-9. Point gain is raised ^0.1."},
    goals: [new Decimal("1e15000"),new Decimal("1e32000"),new Decimal("1e57000"),new Decimal("1e71000"),new Decimal("1e79000"),new Decimal("1e4.7e12"),new Decimal(Infinity)],
    rewardDesc: "Power i gain.",
    eff() {return player.compChalCompletions[10] >= 6 ? new Decimal(1.13) : Decimal.add(1,new Decimal(player.compChalCompletions[10]).mul(0.02))},
    effectDisplay() {return "^" + format(COMP_CHALLENGES[10].eff()) + " i gain"},
    unlockCost: new Decimal(60),
  },
}

// The sum of all of your Complex Challenge completions
function ccTiers() {
  return player.compChalCompletions[1]+player.compChalCompletions[2]+player.compChalCompletions[3]+player.compChalCompletions[4]+player.compChalCompletions[5]+player.compChalCompletions[6]+player.compChalCompletions[7]+player.compChalCompletions[8]+player.compChalCompletions[9]+player.compChalCompletions[10]
}

function interactWithCC(x) {
  if(player.integration.challenge != 1 && player.integration.challenge != 2 && (player.integration.challenge != 4 || !player.integration.ic4Prestiges[1])) {
    if(player.unlocked == 0 && player.upgradePoints[0].gte(COMP_CHALLENGES[x].unlockCost)) { // unlock complex challenge
      player.upgradePoints[0] = player.upgradePoints[0].sub(COMP_CHALLENGES[x].unlockCost);
      player.unlocked = x;
    } else if (player.unlocked == x && player.compChallenge == 0) { // enter complex challenge
      player.compChallenge = x;
      goComplex(true);
      player.compChallenge = x;
      if(player.compChallenge == 6) {
        player.points = new Decimal(1e9)
      }
      if(player.compChallenge == 8) {
        player.buyables[3] = new Decimal(2)
      }
    } else if (player.unlocked == x && player.compChallenge == x) { // exit/complete complex challenge
      if(IntegrationUpgrades.ccb.isBought() && player.x2.gte(COMP_CHALLENGES[x].goals[player.compChalCompletions[x]]) && player.compChalCompletions[x] < 5) {
        if(player.dailyAchievements[0].includes('93') && !player.dailyAchievements[1].includes('93') && estimatedCompletions(x) == 5){
          player.dailyAchievements[1].push('93')
          $.notify("Daily Achievement Unlocked: " + DailyAchievements.standardize('93').name, {
            style: 'apcurrent',
            className:'dailyAchieves',
          });
        }
        while(player.x2.gte(COMP_CHALLENGES[x].goals[player.compChalCompletions[x]])) {
          player.compChalCompletions[x]++;
        }
        player.upgradePoints[0] = player.upgradePoints[0].add(COMP_CHALLENGES[x].unlockCost);
        player.unlocked = 0
        goComplex(true);
      } else {
        if(player.x2.gte(COMP_CHALLENGES[x].goals[player.compChalCompletions[x]])) {
          player.compChalCompletions[x]++;
          player.upgradePoints[0] = player.upgradePoints[0].add(COMP_CHALLENGES[x].unlockCost);
          player.unlocked = 0
        }
        goComplex(true);
      }
    }
    if(player.options[4] && player.compChallenge == 0 && player.unlocked > 0) {
      player.upgradePoints[0] = player.upgradePoints[0].add(COMP_CHALLENGES[player.unlocked].unlockCost)
      player.unlocked = 0
      player.options[4] = false
    }
  } else if (player.integration.challenge == 1 && player.dailyAchievements[0].includes('123') && !player.dailyAchievements[1].includes('123')) {
      player.dailyAchievements[1].push('123')
      $.notify("Daily Achievement Unlocked: " + DailyAchievements.standardize('123').name, {
        style: 'apcurrent',
        className:'dailyAchieves',
      });
  }
}

function cc1Exponent() {
  return new Decimal(1).sub(new Decimal(1).div(player.points.add(1).log10().add(1).log(1000).add(1)))
}

// Used for CC3
function gcd_two_numbers(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

// pending CC completions estimator
function estimatedCompletions(x) {
  let comps = 0
  for (let i = 0; i < (player.inLostIntegration ? 3 : (Alterations.has(3) ? 6 : 5)); i++) {
    if(player.x2.gte(player.inLostIntegration ? ComplexChallengesLI[x].goals[i] : COMP_CHALLENGES[x].goals[i])) {
      comps++
    }
  }
  return comps - player.compChalCompletions[x]
}

function maxAutoCCTimer() {
  if(!player.inLostIntegration) {
    let x = IntegrationUpgrades.pcc2.isBought() ? 600 : 1800
    x /= IntegrationChallenges[4].eff2()
    return x
  } else {
    return 1800 / player.integrations.toNumber()
  }
}