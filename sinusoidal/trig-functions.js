const TrigFunctions = {
  waveGen() {
    let wav = player.triangles.sqrt()
    wav = wav.mul(this[1].trigEff())
    wav = wav.mul(SinusoidalUpgrades[7].eff())
    wav = wav.mul(Decimal.pow(10,player.integration.rebuyableUpgrades[8]))
    if(player.unitCircle.quadrant == 3 || Alterations.has(1)) wav = wav.mul(UnitCircle.effect())
    if(HypercompUpgrades.has(14)) wav = wav.mul(HypercompUpgrades[14].eff())
    if(BasicHypercompUpgrades.has(8)) wav = wav.mul(TemporalPlane.totalEffect())
    return wav
  },
  1: {
    title: "sin(θ)",
    powerName: "sine",
    cost() {return new Decimal(100).mul(Decimal.pow(100,player.trigFunctions.buyables[1]))},
    trigEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : player.trigFunctions.powers[1].pow(0.25).add(1).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 4 ? 0.75 : (player.unitCircle.quadrant == 2 || player.unitCircle.quadrant == 3 ? 1.05 : 1))},
    setEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : Decimal.add(1,player.trigFunctions.powers[1].add(1).log10().add(1).log10().div(2)).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 4 ? 0.75 : (player.unitCircle.quadrant == 2 || player.unitCircle.quadrant == 3 ? 1.05 : 1))},
    effectDisplay() {return format(this.trigEff()) + "x TW generation and ^" + format(this.setEff()) + " 4th Natural Set effect"},
  },
  2: {
    title: "cos(θ)",
    powerName: "cosine",
    cost() {return new Decimal(10000).mul(Decimal.pow(1000,player.trigFunctions.buyables[2]))},
    trigEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : player.trigFunctions.powers[2].pow(0.25).add(1).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 4 ? 0.75 : (player.unitCircle.quadrant == 2 || player.unitCircle.quadrant == 3 ? 1.05 : 1))},
    setEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : Decimal.add(1,player.trigFunctions.powers[2].add(1).log10()).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 4 ? 0.75 : (player.unitCircle.quadrant == 2 || player.unitCircle.quadrant == 3 ? 1.05 : 1))},
    effectDisplay() {return format(this.trigEff()) + "x sine power and ^" + format(this.setEff()) + " 2nd Rational Set effect"},
  },
  3: {
    title: "tan(θ)",
    powerName: "tangent",
    cost() {return new Decimal(1e6).mul(Decimal.pow(10000,player.trigFunctions.buyables[3]))},
    trigEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : player.trigFunctions.powers[3].pow(0.25).add(1).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 4 ? 0.75 : (player.unitCircle.quadrant == 2 || player.unitCircle.quadrant == 3 ? 1.05 : 1))},
    setEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : Decimal.add(1,player.trigFunctions.powers[3].add(1).log2()).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 4 ? 0.75 : (player.unitCircle.quadrant == 2 || player.unitCircle.quadrant == 3 ? 1.05 : 1))},
    effectDisplay() {return format(this.trigEff()) + "x cosine power and ^" + format(this.setEff()) + " 1st Complex Set effect"},
  },
  4: {
    title: "csc(θ)",
    powerName: "cosecant",
    cost() {return new Decimal(1e7).mul(Decimal.pow(100000,player.trigFunctions.buyables[4]))},
    trigEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : player.trigFunctions.powers[4].pow(0.25).add(1).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 2 ? 0.75 : (player.unitCircle.quadrant == 3 || player.unitCircle.quadrant == 4 ? 1.05 : 1))},
    setEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : Decimal.add(1,player.trigFunctions.powers[4].add(1).log2().sqrt()).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 2 ? 0.75 : (player.unitCircle.quadrant == 3 || player.unitCircle.quadrant == 4 ? 1.05 : 1))},
    effectDisplay() {return format(this.trigEff()) + "x tangent power and ^" + format(this.setEff()) + " 1st Real Set effect"},
  },
  5: {
    title: "sec(θ)",
    powerName: "secant",
    cost() {return new Decimal(1e9).mul(Decimal.pow(1e6,player.trigFunctions.buyables[5]))},
    trigEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : player.trigFunctions.powers[5].pow(0.25).add(1).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 2 ? 0.75 : (player.unitCircle.quadrant == 3 || player.unitCircle.quadrant == 4 ? 1.05 : 1))},
    setEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : Decimal.add(1,player.trigFunctions.powers[5].add(1).log10().add(1).log(3)).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 2 ? 0.75 : (player.unitCircle.quadrant == 3 || player.unitCircle.quadrant == 4 ? 1.05 : 1))},
    effectDisplay() {return format(this.trigEff()) + "x cosecant power and " + format(this.setEff()) + "x 3rd Integer Set effect"},
  },
  6: {
    title: "cot(θ)",
    powerName: "cotangent",
    cost() {return new Decimal(1e12).mul(Decimal.pow(1e8,player.trigFunctions.buyables[6]))},
    trigEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : player.trigFunctions.powers[6].pow(0.25).add(1).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 2 ? 0.75 : (player.unitCircle.quadrant == 3 || player.unitCircle.quadrant == 4 ? 1.05 : 1))},
    setEff() {return player.integration.challenge == 6 && player.integration.ic6Version == 1 ? new Decimal(1) : Decimal.add(1,player.trigFunctions.powers[6].add(1).log10().add(1).log10()).pow(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 2 ? 0.75 : (player.unitCircle.quadrant == 3 || player.unitCircle.quadrant == 4 ? 1.05 : 1))},
    effectDisplay() {return format(this.trigEff()) + "x secant power and " + format(this.setEff()) + "x holes gain"},
  },
  buy(x) {
    if(player.trigFunctions.waves.gte(this[x].cost())) {
      player.trigFunctions.waves = player.trigFunctions.waves.sub(this[x].cost())
      player.trigFunctions.buyables[x] = player.trigFunctions.buyables[x].add(1)
    }
  },
  powerGen(x) {
    let gain = player.trigFunctions.buyables[x].gte(1) ? Decimal.pow(2,player.trigFunctions.buyables[x]).div(2) : new Decimal(0)
    if(x < 6) gain = gain.mul(this[x+1].trigEff())
    if(SinusoidalUpgrades.has(9)) gain = gain.mul(10)
    gain = gain.mul(IntegrationChallenges[3].eff())
    gain = gain.mul(HypercompFlune[6].eff())
    if((player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 4) && (x == 1 || x == 2 || x == 3)) gain = gain.pow(1.05)
    if((player.unitCircle.quadrant == 2 || (player.unitCircle.quadrant == 3 && !Alterations.has(1))) && (x == 1 || x == 2 || x == 3)) gain = gain.pow(0.75)
    if((player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 2) && (x == 4 || x == 5 || x == 6)) gain = gain.pow(1.05)
    if(((player.unitCircle.quadrant == 3 && !Alterations.has(1)) || player.unitCircle.quadrant == 4) && (x == 4 || x == 5 || x == 6)) gain = gain.pow(0.75)
    if(player.unitCircle.quadrant == 3 && Alterations.has(1)) gain = gain.pow(1.05)
    if(BasicHypercompUpgrades.has(8)) gain = gain.mul(TemporalPlane.totalEffect())
    return gain
  },
}