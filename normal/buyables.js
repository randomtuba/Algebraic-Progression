const BUYABLES = {
  1: {
    title: "Autoclickers",
    cost() {
      return new Decimal(25).mul(new Decimal(buildingCostScaling()).pow(player.buyables[1]))
    },
    eff() {
      let x = player.challenge == 1 || player.compChallenge == 8 ? new Decimal(0) : player.buyables[1].add(player.buyables[7].mul(player.challenge == 3 || player.challenge == 5 || player.challenge == 10 || player.compChallenge == 2 || player.compChallenge == 8 || (player.yChallenge == 2 && !player.inLostIntegration) || player.challenge == 14 || player.challenge == 16 ? 0 : 1)).mul(buildingMultipliers()).mul(hasQU(2) && player.yChallenge != 5 && !player.inLostIntegration?(hasChargedQU(2)?QUAD_UPGRADES[2].chargedEff():QUAD_UPGRADES[2].eff()):1).pow(buildingExponents())
      if(player.integration.chalCompletions[2] >= 3 && !player.inSqrt && x.gt(0)) x = Decimal.pow(10,x.log10().pow(NumberSets.sacrificeValueEffects(6)))
      if(player.yChallenge == 1 && player.inLostIntegration) x = new Decimal(0)
      return x
    },
    baseProd() {
      return player.challenge == 1 || player.compChallenge == 8 ? new Decimal(0) : buildingMultipliers().mul(hasQU(2) && player.yChallenge != 5 && !player.inLostIntegration?(hasChargedQU(2)?QUAD_UPGRADES[2].chargedEff():QUAD_UPGRADES[2].eff()):1).pow(buildingExponents())
    },
    effectDisplay() {
      return format(BUYABLES[1].eff()) + "/s";
    },
    unl() {
      return true;
    },
  },
  2: {
    title: "Point Factories",
    cost() {
      return new Decimal(200).mul(new Decimal(buildingCostScaling()).pow(player.buyables[2]))
    },
    eff() {
      let x = player.challenge == 1 || player.compChallenge == 8 ? new Decimal(0) : player.buyables[2].add(player.buyables[8].mul(player.challenge == 3 || player.challenge == 5 || player.challenge == 10 || player.compChallenge == 2 || player.compChallenge == 8 || (player.yChallenge == 2 && !player.inLostIntegration) || player.challenge == 14 || player.challenge == 16 ? 0 : 1)).mul(10).mul(buildingMultipliers()).mul(hasQU(4) && player.yChallenge != 5 && !player.inLostIntegration?(hasChargedQU(4)?QUAD_UPGRADES[4].chargedEff():QUAD_UPGRADES[4].eff()):1).pow(buildingExponents())
      if(player.integration.chalCompletions[2] >= 3 && x.gt(0)) x = Decimal.pow(10,x.log10().pow(NumberSets.sacrificeValueEffects(6)))
      if(player.yChallenge == 1 && player.inLostIntegration) x = new Decimal(0)
      return x
    },
    baseProd() {
      return player.challenge == 1 || player.compChallenge == 8 ? new Decimal(0) : buildingMultipliers().mul(10).mul(hasQU(4) && player.yChallenge != 5 && !player.inLostIntegration?(hasChargedQU(4)?QUAD_UPGRADES[4].chargedEff():QUAD_UPGRADES[4].eff()):1).pow(buildingExponents())
    },
    effectDisplay() {
      return format(BUYABLES[2].eff()) + "/s";
    },
    unl() {
      return player.buyables[1].gte(1) || hasQU(6) || player.totali.gte(1) || player.integrations.gte(1);
    },
  },
  3: {
    title: "Point Portals",
    cost() {
      return new Decimal(15000).mul(new Decimal(buildingCostScaling()).pow(player.buyables[3]))
    },
    eff() {
      let x = player.buyables[3].add(player.buyables[9].mul(player.challenge == 3 || player.challenge == 5 || player.challenge == 10 || player.compChallenge == 2 || player.compChallenge == 8 || (player.yChallenge == 2 && !player.inLostIntegration) || player.challenge == 14 || player.challenge == 16 ? 0 : 1)).mul(1000).mul(buildingMultipliers()).mul(hasQU(7) && player.yChallenge != 5 && !player.inLostIntegration?(hasChargedQU(7)?QUAD_UPGRADES[7].chargedEff():QUAD_UPGRADES[7].eff()):1).mul(hasQU(2) && player.inLostIntegration ? ResetTable[2].eff() : 1).pow(buildingExponents())
      if(player.integration.chalCompletions[2] >= 3 && !player.inSqrt && x.gt(0)) x = Decimal.pow(10,x.log10().pow(NumberSets.sacrificeValueEffects(6)))
      if(player.yChallenge == 1 && player.inLostIntegration) x = new Decimal(0)
      return x
    },
    baseProd() {
      return buildingMultipliers().mul(1000).mul(hasQU(7) && player.yChallenge != 5 && !player.inLostIntegration?(hasChargedQU(7)?QUAD_UPGRADES[7].chargedEff():QUAD_UPGRADES[7].eff()):1).mul(hasQU(2) && player.inLostIntegration ? ResetTable[2].eff() : 1).pow(buildingExponents())
    },
    effectDisplay() {
      return format(BUYABLES[3].eff()) + "/s";
    },
    unl() {
      return player.buyables[2].gte(1) || hasQU(6) || player.totali.gte(1) || player.integrations.gte(1);
    },
  },
  4: {
    title: "f(",
    cost() {
      return new Decimal(5000000).mul(new Decimal(functionCostScaling(1)).pow(player.buyables[4]))
    },
    formula(){return (hasQU(3) || hasChallenge(2)) && player.yChallenge != 2 ? "(n + 1)<sup>" + formatWhole(BUYABLES[4].exponent()) + "</sup>" : "n + 1"},
    eff() {
      let x = player.challenge == 5 || player.compChallenge == 8 ? new Decimal(1) : player.buyables[4].add(1).pow(BUYABLES[4].exponent())
      if(player.integration.challenge == 6 && player.integration.ic6Version == 0) x = x.pow(0.5)
      return x
    },
    exponent() {
      let exp = new Decimal(1)
      if(hasQU(3) && player.yChallenge != 5) exp = exp.mul(hasChargedQU(3) ? 10 : 2)
      if(hasChallenge(2)) exp = exp.mul(2)
      exp = exp.mul(sacEffect('z'))
      if(hasChargedUpgrade(2) && player.challenge != 5 && player.compChallenge != 8) exp = exp.mul(1.2)
      if(IntegrationUpgrades.points10.isBought()) exp = exp.add(IntegrationUpgrades.points10.eff())
      if(player.yChallenge == 2) exp = new Decimal(1)
      return exp
    },
    unl() {
      return hasUpgrade(4)
    },
  },
  5: {
    title: "g(",
    cost() {
      return new Decimal(30000000).mul(new Decimal(functionCostScaling(2)).pow(player.buyables[5]))
    },
    formula() {return player.buyables[5].gte(funcSoftcapStart()) ? format(BUYABLES[5].base()) + "<sup>" + formatWhole(funcSoftcapStart()) + "</sup>*" + format(BUYABLES[5].base()) + "<sup>(n-" + formatWhole(funcSoftcapStart()) + ")<sup>" + format(funcSoftcapExponent()) + "</sup></sup>" : format(BUYABLES[5].base()) + "<sup>n</sup>"},
    base() {
      let base = new Decimal(1.3)
      if(hasQU(9)) base = base.add(hasChargedQU(9) ? 5 : 0.2)
      base = base.add(sacEffect('y'))
      if(hasChallenge(6)) base = base.mul(2)
      if(hasCU(1,3)) base = base.mul(BCOMP_UPGRADES[3].eff())
      if(hasChargedUpgrade(2) && player.challenge != 5 && player.compChallenge != 8) base = base.mul(1.4)
      if(hasSDU(6)) base = base.mul(SYNTH_DIV_UPGRADES[6].eff())
      base = base.mul(NumberSets.sacrificeValueEffects(1))
      if(base.gte(5e7)) base = base.div(5e7).pow(0.5).mul(5e7)
      if(IntegrationUpgrades.points2.isBought()) base = base.mul(2)
      base = base.mul(Derivatives.buyables[6].eff())
      if(player.yChallenge == 2) base = new Decimal(1.3)
      return base
    },
    eff() {
      if(player.buyables[5].gte(funcSoftcapStart())){
        let x = player.challenge == 1 || player.challenge == 5 || player.compChallenge == 8 ? new Decimal(1) : new Decimal(BUYABLES[5].base()).pow(funcSoftcapStart()).mul(Decimal.pow(BUYABLES[5].base(),player.buyables[5].sub(funcSoftcapStart()).max(0).pow(funcSoftcapExponent())))
        if(player.integration.challenge == 6 && player.integration.ic6Version == 0) x = x.pow(0.5)
        return x
      }else{
        let x = player.challenge == 1 || player.challenge == 5 || player.compChallenge == 8 ? new Decimal(1) : new Decimal(BUYABLES[5].base()).pow(player.buyables[5])
        if(player.integration.challenge == 6 && player.integration.ic6Version == 0) x = x.pow(0.5)
        return x
      }
    },
    unl() {
      return hasUpgrade(4)
    },
  },
  6: {
    title: "h(",
    cost() {
      return new Decimal(100000000).mul(new Decimal(functionCostScaling(3)).pow(player.buyables[6]))
    },
    formula() {return player.buyables[6].gte(funcSoftcapStart()) ? format(BUYABLES[6].base()) + "<sup>" + formatWhole(funcSoftcapStart()) + "</sup>*" + format(BUYABLES[6].base()) + "<sup>(n-" + formatWhole(funcSoftcapStart()) + ")<sup>" + format(funcSoftcapExponent()) + "</sup></sup>" : format(BUYABLES[6].base()) + "<sup>n</sup>"},
    base() {
      let base = new Decimal(1.6)
      if(hasQU(9)) base = base.add(hasChargedQU(9) ? 5 : 0.2)
      base = base.add(sacEffect('y'))
      if(hasChallenge(6)) base = base.mul(2)
      if(hasYQU(4,'bought')) base = base.mul(BCOMP_UPGRADES[3].eff())
      if(hasChargedUpgrade(2) && player.challenge != 5 && player.compChallenge != 8) base = base.mul(1.4)
      if(hasSDU(6)) base = base.mul(SYNTH_DIV_UPGRADES[6].eff())
      base = base.mul(NumberSets.sacrificeValueEffects(1))
      if(base.gte(5e7)) base = base.div(5e7).pow(0.5).mul(5e7)
      if(IntegrationUpgrades.points2.isBought()) base = base.mul(2)
      base = base.mul(Derivatives.buyables[6].eff())
      if(player.yChallenge == 2) base = new Decimal(1.6)
      return base
    },
    eff() {
      if(player.buyables[6].gte(funcSoftcapStart())){
        let x = player.challenge == 5 || player.compChallenge == 8 ? new Decimal(1) : new Decimal(BUYABLES[6].base()).pow(funcSoftcapStart()).mul(Decimal.pow(BUYABLES[6].base(),player.buyables[6].sub(funcSoftcapStart()).max(0).pow(funcSoftcapExponent())))
        if(player.integration.challenge == 6 && player.integration.ic6Version == 0) x = x.pow(0.5)
        return x
      }else{
        let x = player.challenge == 5 || player.compChallenge == 8 ? new Decimal(1) : new Decimal(BUYABLES[6].base()).pow(player.buyables[6])
        if(player.integration.challenge == 6 && player.integration.ic6Version == 0) x = x.pow(0.5)
        return x
      }
    },
    unl() {
      return hasUpgrade(4)
    },
  },
  7: {
    title: "Point Quasars",
    cost() {
      return new Decimal(1000000).mul(new Decimal(buildingCostScaling()).pow(player.buyables[5]))
    },
    eff() {
      let x = player.buyables[5].add(player.buyables[6].mul(player.challenge == 14 || player.challenge == 16 ? 0 : 1)).mul(100000).mul(buildingMultipliers()).pow(buildingExponents())
      if(!player.inLostIntegration) x = new Decimal(0)
      return x
    },
    baseProd() {
      return buildingMultipliers().mul(100000).pow(buildingExponents())
    },
    effectDisplay() {
      return format(BUYABLES[7].eff()) + "/s";
    },
    unl() {
      return hasCU(0,1) && player.inLostIntegration;
    },
  },
};

function buyBuyable(x) {
  if(player.points.gte(BUYABLES[x].cost()) && (player.purchases > 0 || (player.challenge != 10 && player.compChallenge != 8))){
    if((!hasQU(8) && !player.inLostIntegration) || (player.inLostIntegration && !hasComplexMilestoneLI(10))) player.points = player.points.sub(BUYABLES[x].cost())
    if(x < 7) player.buyables[x] = player.buyables[x].add(1)
    if(x == 7) player.buyables[5] = player.buyables[5].add(1)
    player.chalExponents[0] = new Decimal(0)
    player.purchases -= 1
  }
}

function buildingMultipliers() {
  let mult = new Decimal(1);
  if(!player.inLostIntegration) mult = mult.mul(BUYABLES[4].eff()).mul(BUYABLES[5].eff()).mul(BUYABLES[6].eff())
  if(hasUpgrade(2) && player.challenge != 5 && player.compChallenge != 8 && (player.yChallenge != 3 || !player.inLostIntegration)) mult = mult.mul(player.inLostIntegration ? 3 : 2)
  if(hasQU(1) && player.yChallenge != 5 && !player.inLostIntegration) mult = mult.mul(hasChargedQU(1) ? QUAD_UPGRADES[1].chargedEff() : QUAD_UPGRADES[1].eff())
  if(hasQU(13) && !player.inLostIntegration) mult = mult.mul(hasChargedQU(13) ? QUAD_UPGRADES[13].chargedEff() : QUAD_UPGRADES[13].eff())
  if(hasSU(2)) mult = mult.mul(SQRT_UPGRADES[2].eff())
  if(player.challenge != 5 && player.compChallenge != 8 && hasUpgrade(5)) mult = mult.mul(1000)
  if(hasSU(9)) mult = mult.mul(SQRT_UPGRADES[9].eff()) // non-static
  if(hasSU(10)) mult = mult.mul(SQRT_UPGRADES[10].eff())
  if(hasChallenge(9)) mult = mult.mul(CHALLENGES[9].effect())
  if(player.challenge == 5 && player.compChallenge != 8) mult = mult.div(Decimal.pow(5**0.01,player.x))
  if(inSqrtLevel(2)) mult = mult.div("1e5000")
  if(inSqrtLevel(3)) mult = mult.div("1e1650")
  if(inSqrtLevel(4)) mult = mult.div("1e3650")
  if(hasCU(1,1) && player.compChallenge != 10 && player.integration.challenge != 2) mult = mult.mul(BCOMP_UPGRADES[1].eff())
  if(hasCU(0,3) && player.compChallenge != 10 && player.integration.challenge != 2 && !player.inLostIntegration) mult = mult.mul(COMP_UPGRADES[3].eff()) // non-static
  if(hasChargedUpgrade(5) && player.challenge != 5 && player.compChallenge != 8) mult = mult.mul("1e9997")
  if(hasPermUpgrade(1)) mult = mult.mul(PERM_UPGRADES[1].eff())
  if(player.compChallenge != 10 && player.integration.challenge != 2) mult = mult.mul(COMP_UPGRADES[13].eff())
  mult = mult.mul(NumberSets.effect(1,3))
  if(IntegrationUpgrades.points1.isBought()) mult = mult.mul(IntegrationUpgrades.points1.eff())
  if(IntegrationUpgrades.points5.isBought()) mult = mult.mul(IntegrationUpgrades.points5.eff())
  if(player.compChallenge == 2) mult = mult.div(player.antiSlope)
  if(player.compChallenge == 6 && !player.inLostIntegration) mult = mult.div("1e75000")
  if(IntegrationUpgrades.ic3.isBought() && mult.lt(1)) mult = new Decimal(1)

  if(player.inLostIntegration) {
    mult = mult.mul(GeneratorMultiplier.mult())
    if(hasQU(1)) mult = mult.mul(ResetTable[1].eff())
    mult = mult.mul(Decimal.pow(100,player.quadBuyables[3]))
    if(hasQU(13)) mult = mult.mul(ResetTable[13].eff())
    if(hasQU(14)) mult = mult.mul(ResetTable[14].eff())
    mult = mult.mul(SquareRootLI.milestoneEff(1))
    if(hasChallenge(11)) mult = mult.mul(player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).pow(3).add(1))
    if(hasCU(0,3)) mult = mult.mul(ComplexUpgradesLI[3].eff())
    mult = mult.mul(ComplexPlaneLI.effects(3))
    if(hasCU(1,2)) mult = mult.mul(BasicComplexUpgradesLI[2].eff())
    if(ComplexChallengesLI.milestones.has(1)) mult = mult.mul(ComplexChallengesLI.milestones[1].eff())
    mult = mult.mul(ComplexChallengesLI[7].eff())
    mult = mult.mul(YChallengesLI[5].eff())
    mult = mult.mul(MetaGenerators.metaPointsEffects(1))
  }
  return mult
}

function buildingExponents() {
  let exp = new Decimal(1);
  if(player.inSqrt) exp = exp.max(0).mul(hasSU(8) || (player.inLostIntegration && hasQU(19)) ? 0.55 : 0.5)
  if(player.challenge == 4 || player.compChallenge == 8) exp = exp.max(0).mul(0.75)
  if(hasUpgrade(7) && player.challenge != 5 && player.compChallenge != 8 && (!hasChargedUpgrade(7) || player.inSqrt) && (player.yChallenge != 3 || !player.inLostIntegration)) exp = exp.mul(player.inLostIntegration ? 1.04 : 1.01)
  if(hasChargedUpgrade(7) && player.challenge != 5 && player.compChallenge != 8 && !player.inSqrt) exp = exp.mul(1.02)
  if(hasChallenge(4)) exp = exp.mul(1.03)
  if(player.challenge == 2 || player.compChallenge == 8) exp = exp.mul(player.chalExponents[0])
  if(player.challenge == 9) exp = exp.mul(player.chalExponents[1])
  if(hasCU(0,1) && player.compChallenge != 10 && player.integration.challenge != 2 && !player.inLostIntegration) exp = exp.mul(COMP_UPGRADES[1].eff())
  exp = exp.mul(polyPowerEffect())
  exp = exp.mul(NumberSets.effect(1,1)) 
  if(HypercompUpgrades.has(1)) exp = exp.mul(HypercompUpgrades[1].eff())
  if(player.inLostIntegration) {
    exp = exp.mul(YChallengesLI[3].eff())
    exp = exp.mul(XPowers.xPowerProductEffect())
    exp = exp.mul(MetaGenerators.metaPointsEffects(2))
  }
  if(player.compChallenge == 3) exp = exp.mul(Decimal.div(1,new Decimal(gcd_two_numbers(player.inLostIntegration ? player.abc[1].toNumber() : player.x.toNumber(),player.inLostIntegration ? player.abc[2].toNumber() : player.y.toNumber())).sqrt().max(1)))
  if(player.compChallenge == 7) exp = exp.mul(new Decimal(player.chalExponents[2]).max(0))
  if(player.compChallenge == 10 || player.integration.challenge == 2) exp = exp.mul(0.1)
  if(player.inSynthDiv) exp = exp.max(0).mul(hasSDU(9)?0.025:0.02)
  if(player.integration.inTheLimit) exp = exp.mul(Limit.challengeFactorEffects(1))
  if(player.challenge == 11 || player.challenge == 16) exp = exp.mul(0.9)
  if(player.challenge == 15 || player.challenge == 16) exp = exp.mul(0.5)
  if(player.yChallenge == 5 && player.inLostIntegration) exp = exp.mul(0.01)
  return exp
}

function buildingCostScaling() {
  let scale = new Decimal(1.15)
  if(hasUpgrade(1) && player.challenge != 5 && player.compChallenge != 8) scale = scale.sub(0.05)
  if(hasChallenge(3)) scale = scale.sub(0.025)
  if(hasChargedUpgrade(1) && player.challenge != 5 && player.compChallenge != 8) scale = scale.sub(0.025)
  if(player.challenge == 3 || player.compChallenge == 8) scale = scale.mul(3)

  if(player.inLostIntegration) {
    scale = new Decimal(1.1)
    if(hasUpgrade(1) && player.yChallenge != 3) scale = scale.sub(0.04)
  }

  return scale
}

function polyGrowthMults() {
  let poly = new Decimal(1)
  if(!player.inLostIntegration) {
    if(hasChallenge(1)) poly = poly.mul(CHALLENGES[1].effect())
    poly = poly.mul(QP_BUYABLES[6].eff())
    poly = poly.mul(NumberSets.effect(1,3))
    if(IntegrationUpgrades.points4.isBought()) poly = poly.mul(IntegrationUpgrades.points4.eff())
  }
  if(player.inLostIntegration) {
    if(hasChallenge(14)) poly = poly.mul(player.rootEssence.pow(2).add(1))
    if(hasCU(0,5)) poly = poly.mul(ComplexUpgradesLI[5].eff())
  }
  return poly
}

function functionCostScaling(x) {
  switch (x) {
    case 1:
      let scale1 = 2
      if(hasChallenge(3)) scale1 = scale1 / 1.25
      if(hasChargedUpgrade(1) && player.challenge != 5 && player.compChallenge != 8) scale1 = scale1 / 1.2
      if(player.challenge == 3 || player.compChallenge == 8) scale1 = scale1 * 3
      if(player.challenge == 6 || player.compChallenge == 8) scale1 = scale1 * 10
      return scale1
    break;
    case 2:
      let scale2 = 5
      if(hasChallenge(3)) scale2 = scale2 / 1.25
      if(hasChargedUpgrade(1) && player.challenge != 5 && player.compChallenge != 8) scale2 = scale2 / 1.2
      if(player.challenge == 3 || player.compChallenge == 8) scale2 = scale2 * 3
      if(player.challenge == 6 || player.compChallenge == 8) scale2 = scale2 * 10
      if(player.yChallenge == 2) scale2 = 5
      return scale2
    break;
    case 3:
      let scale3 = 7
      if(hasChallenge(3)) scale3 = scale3 / 1.25
      if(hasChargedUpgrade(1) && player.challenge != 5 && player.compChallenge != 8) scale3 = scale3 / 1.2
      if(player.challenge == 3 || player.compChallenge == 8) scale3 = scale3 * 3
      if(player.challenge == 6 || player.compChallenge == 8) scale3 = scale3 * 10
      if(player.yChallenge == 2) scale3 = 7
      return scale3
    break;
  }
}

function funcSoftcapStart() {
  let softcap = new Decimal(15)
  if(hasQU(11) && player.yChallenge != 5) softcap = softcap.add(hasChargedQU(11) ? 5e9 : 10)
  if(hasChallenge(3)) softcap = softcap.add(25)
  softcap = softcap.add(QP_BUYABLES[2].eff())
  if(hasCU(0,9) && player.compChallenge != 10 && player.integration.challenge != 2) softcap = softcap.add(player.compUpgs[2][0]+player.compUpgs[2][1]+player.compUpgs[2][2])
  softcap = softcap.add(COMP_CHALLENGES[6].eff())
  softcap = softcap.add(NumberSets.effect(1,2))
  if(IntegrationUpgrades.points3.isBought()) softcap = softcap.add(IntegrationUpgrades.points3.eff())
  if(hasChargedUpgrade(4) && player.challenge != 5 && player.compChallenge != 8) softcap = softcap.mul(1.05)
  if(player.yChallenge == 2) softcap = new Decimal(15)
  return softcap
}

function funcSoftcapExponent() {
  let exp = new Decimal(0.5)
  exp = exp.add(Derivatives.buyables[4].eff())
  return exp
}