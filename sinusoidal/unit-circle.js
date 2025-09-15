const UnitCircle = {
  unlock() {
    if(player.triangles.gte(2e55)) {
      player.unitCircle.unlocked = true
      $.notify('A new subtab appears...check the Y-Quadratic tab!', {
        style: 'apcurrent',
        className:'unlock',
      });
    }
  },
  trigFunctionsEffectText(x) {
    switch (x) {
      case 1:
        if(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 4) {
          return "sine, cosine, and tangent power production is powered ^1.05, but their effects are powered ^0.75"
        } else if (player.unitCircle.quadrant == 3 && Alterations.has(1)) {
          return "sin(θ), cos(θ), and tan(θ) effects are powered ^1.05, and their power production is powered ^1.05"
        } else if (player.unitCircle.quadrant == 2 || player.unitCircle.quadrant == 3) {
          return "sin(θ), cos(θ), and tan(θ) effects are powered ^1.05, but their power production is powered ^0.75"
        } else {
          return "No trigonometric function effect active"
        }
      break;
      case 2:
        if(player.unitCircle.quadrant == 1 || player.unitCircle.quadrant == 2) {
          return "cosecant, secant, and cotangent power production is powered ^1.05, but their effects are powered ^0.75"
        } else if (player.unitCircle.quadrant == 3 && Alterations.has(1)) {
          return "csc(θ), sec(θ), and cot(θ) effects are powered ^1.05, and their power production is powered ^1.05"
        } else if (player.unitCircle.quadrant == 3 || player.unitCircle.quadrant == 4) {
          return "csc(θ), sec(θ), and cot(θ) effects are powered ^1.05, but their power production is powered ^0.75"
        } else {
          return "No trigonometric function effect active"
        }
      break;
    }
  },
  secondEffectText() {
    if(Alterations.has(1)) {
      return "Multiplying dx, derivatives, TW, and triangles gain by " + format(UnitCircle.effect()) + "x"
    }
    switch (player.unitCircle.quadrant) {
      case 0:
        return "No secondary effect active"
      break;
      case 1:
        return "Multiplying dx gain by " + format(UnitCircle.effect()) + "x"
      break;
      case 2:
        return "Multiplying derivatives gain by " + format(UnitCircle.effect()) + "x"
      break;
      case 3:
        return "Multiplying TW gain by " + format(UnitCircle.effect()) + "x"
      break;
      case 4:
        return "Multiplying triangles gain by " + format(UnitCircle.effect()) + "x"
      break;
    }
  },
  effect() {
    return player.trigFunctions.waves.pow(0.05).add(1).mul(Decimal.pow(10,player.unitCircle.purchases[0].add(player.unitCircle.purchases[1]))).pow(HypercompUpgrades.has(15) ? HypercompUpgrades[15].eff() : 1).pow(PythagoreanTriples.hasMilestone(9) ? PythagoreanTriples.barMilestones[9].eff() : 1)
  },
  costs(x) {
    if(x == 0) {
      return new Decimal(1e63).mul(Decimal.pow(1e12,player.unitCircle.purchases[0].pow(2)))
    } else {
      return new Decimal(1e70).mul(Decimal.pow(1e15,player.unitCircle.purchases[1].pow(2)))
    }
  },
  upgrade(x) {
    if(x == 0) {
      if(player.trigFunctions.waves.gte(UnitCircle.costs(x))) {
        player.trigFunctions.waves = player.trigFunctions.waves.sub(UnitCircle.costs(x))
        player.unitCircle.purchases[x] = player.unitCircle.purchases[x].add(1)
      }
    } else {
      if(player.triangles.gte(UnitCircle.costs(x))) {
        player.triangles = player.triangles.sub(UnitCircle.costs(x))
        player.unitCircle.purchases[x] = player.unitCircle.purchases[x].add(1)
      }
    }
  },
  addRotation(prev) {
    let next = player.unitCircle.quadrant
    switch (prev) {
      case 1:
        if(next == 4) tmp.unitCircleRotations += 0.25
        else if(next == 2) tmp.unitCircleRotations -= 0.25
        else tmp.unitCircleRotations = 0
      break;
      case 2:
        if(next == 1) tmp.unitCircleRotations += 0.25
        else if(next == 3) tmp.unitCircleRotations -= 0.25
        else tmp.unitCircleRotations = 0
      break;
      case 3:
        if(next == 2) tmp.unitCircleRotations += 0.25
        else if(next == 4) tmp.unitCircleRotations -= 0.25
        else tmp.unitCircleRotations = 0
      break;
      case 4:
        if(next == 3) tmp.unitCircleRotations += 0.25
        else if(next == 1) tmp.unitCircleRotations -= 0.25
        else tmp.unitCircleRotations = 0
      break;
    }
  },
}