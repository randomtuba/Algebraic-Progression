function sacEffect(x) {
  switch (x) {
    case 'x':
      let x = player.sacX.add(1).log(3).add(1).log2().div(hasQU(15)?1.5:3)
      if(hasSU(4)) x = x.mul(1.1)
      x = x.mul(bEffect(2))
      if(player.transformations.activated == 1 || player.transformations.extrusions.includes(1)) x = x.mul(transformEffect(1))
      x = x.add(1)
      if(player.challenge == 7 || inSqrtLevel(5)) x = new Decimal(1)
      return x
    break;
    case 'y':
      let base = player.sacY.mul(0.02)
      if(hasQU(14)) base = base.mul(1.5)
      if(hasSU(4)) base = base.mul(1.1)
      base = base.mul(bEffect(2))
      if(player.transformations.activated == 2 || player.transformations.extrusions.includes(2)) base = base.mul(transformEffect(2))
      if(base.gt(1.5) && !hasQU(17)) base = base.div(1.5).pow(0.25).mul(1.5)
      if(player.challenge == 7 || inSqrtLevel(5)) base = new Decimal(0)
      return base
    break;
    case 'x2':
      let x2 = player.sacX2.max(0).div(1e21).pow(0.5).mul(bEffect(1))
      if(hasCU(1,1) && player.compChallenge != 10) x2 = x2.mul(100)
      if(x2.gt(1e150)) player.x2.div(1e150).pow(0.7).mul(1e150)
      if(hasCU(0,2) && player.compChallenge != 10) x2 = x2.mul(COMP_UPGRADES[2].eff())
      if(x2.gt("1e1000")) player.x2.div("1e1000").pow(0.5).mul("1e1000")
      if(player.transformations.activated == 3 || player.transformations.extrusions.includes(3)) x2 = x2.pow(transformEffect(3))
      if(hasYQU(10,'bought')) x2 = x2.pow(YQUAD_UPGRADES[10].eff())
      if(hasChargedUpgrade(6) && player.challenge != 5 && player.compChallenge != 8) x2 = x2.pow(1.1)
      if(player.compChallenge != 10) x2 = x2.pow(COMP_UPGRADES[14].eff())
      if(player.compChallenge == 2) x2 = new Decimal(0)
      return x2
    break;
    case 'z':
      let z = player.sacZ.div(5).pow(1.5).add(1)
      if(z.gt(200)) z = z.div(200).pow(0.3).mul(200)
      if(player.transformations.activated == 4) z = z.mul(transformEffect(4))
      z = z.floor()
      return z
    break;
  }
}

function switchSacrifice() {
  if(player.sacrifice === 'x'){
    player.sacrifice = 'y'
    return;
  }
  if(player.sacrifice === 'y'){
    if(hasSU(6)){
      player.sacrifice = 'x<sup>2</sup>'
      return;
    }else{
      player.sacrifice = 'x'
      return;
    }
  }
  if(player.sacrifice === 'x<sup>2</sup>'){
    if(player.zUnlocked){
      player.sacrifice = 'z'
      return;
    }else{
      player.sacrifice = 'x'
      return;
    }
  }
  if(player.sacrifice === 'z'){
    player.sacrifice = 'x'
    return;
  }
}

function sacrifice(x){
  switch (x) {
    case 'x':
      if(player.x.gt(player.sacX.div(compPlaneEffects(2).mul(COMP_CHALLENGES[5].eff())))){
        player.sacX = player.x.mul(compPlaneEffects(2).mul(COMP_CHALLENGES[5].eff()))
        if(!hasSU(6)) player.x = new Decimal(0)
      }
    break;
    case 'y':
      if(player.y.gt(player.sacY.div(compPlaneEffects(2).mul(COMP_CHALLENGES[5].eff())))){
        player.sacY = player.y.mul(compPlaneEffects(2).mul(COMP_CHALLENGES[5].eff()))
        if(!hasSU(6)) player.y = new Decimal(0)
      }
    break;
    case 'x<sup>2</sup>':
      player.sacX2 = player.sacX2.add(player.x2.mul(hasCU(0,8) && player.compChallenge != 10 ? COMP_UPGRADES[8].eff() : 1))
      if(!hasQU(19)) player.x2 = new Decimal(0)
    break;
    case 'z':
      if(player.z.gt(player.sacZ.div(compPlaneEffects(2)))){
        player.sacZ = player.z.mul(compPlaneEffects(2))
        if(!hasQU(19)) player.z = new Decimal(0)
      }
    break;
  }
}

// calculates the multiplier to polynomial building production based on slope
function slopeEffect() {
  let mult = player.slope.pow(Decimal.add(1.5,bEffect(3))).add(1)
  if(mult.gt(1e15)) mult = mult.div(1e15).pow(0.5).mul(1e15)
  if(mult.gt("1e1111")) mult = mult.div("1e1111").pow(0.5).mul("1e1111")
  if(mult.gt("1e20000")) mult = hasZlabMilestone(3,5) ? mult.div("1e20000").pow(0.004).mul("1e20000") : mult.log10().div(2).pow(5000)
  if(player.challenge == 7) mult = new Decimal(1)
  return mult
}

function bCost() {
  return new Decimal(1e23).mul(Decimal.pow(10000,player.b)).mul(Decimal.pow(10,player.b.pow(2)))
}

function buyB() {
  if(player.slope.gte(bCost())){
    player.slope = player.slope.sub(bCost())
    player.b = player.b.add(1)
  }
}

// the 3 effects of b
function bEffect(x) {
if(player.challenge == 5 || player.compChallenge == 2) return new Decimal(1)
  switch (x) {
    case 1:
      return Decimal.pow(3,player.b).pow(1.5)
    case 2:
      return new Decimal(1).add(player.b.pow(1.2).div(10)).min(new Decimal(8.87).mul(COMP_CHALLENGES[2].eff()).mul(hasChargedUpgrade(8) && player.challenge != 5 && player.compChallenge != 8 ? 1.1 : 1)) 
    case 3:
      return player.b.div(20).add(1).pow(1.2).sub(1).mul(hasChallenge(7)?1.05:1).min(new Decimal(2.72).mul(COMP_CHALLENGES[2].eff()).mul(hasChargedUpgrade(8) && player.challenge != 5 && player.compChallenge != 8 ? 1.1 : 1))
  }
}

// the effect for each Transformation: 1 is translation, 2 is reflection, 3 is rotation, etc.
function transformEffect(x) {
  if (x == 1) {
    let x = new Decimal(1.03).pow(player.transformations.bought[1])
    if(x.gte(1.2) && !hasZlabMilestone(3,1)) x.div(1.2).pow(0.8).mul(1.2)
    x = x.mul(transformEffect(5))
    return x
  } else if (x == 2) {
    let x = new Decimal(1.05).pow(player.transformations.bought[2].min(40))
    if(x.gte(3)) x.div(3).pow(0.8).mul(3)
    x = x.mul(transformEffect(5))
    return x
  } else if (x == 3) {
    let x = Decimal.add(1,Decimal.mul(0.02,player.transformations.bought[3].min(40)))
    if(x.gte(1.4)) x.div(1.4).pow(0.8).mul(1.4)
    x = x.mul(transformEffect(5))
    return x
  } else if (x == 4) {
    let x = new Decimal(1.03).pow(player.transformations.bought[4].min(40))
    if(x.gte(1.3)) x.div(1.3).pow(0.8).mul(1.3)
    return x
  } else {
    return Decimal.add(1,player.transformations.bought[4].div(100)).min(1.15)
  }
}

function transformCosts(x) {
  if(player.transformations.bought[x].gte(40) && x != 1) {
    return new Decimal(Infinity);
  }
  switch (x) {
    case 1:
      return new Decimal("1e30000").mul(Decimal.pow("1e1600",player.transformations.bought[x].pow(Decimal.add(1.3,player.transformations.bought[x].sub(25).div(100).max(0))).floor())).pow(hasZlabMilestone(4,4)?0.9:1)
    break;
    case 2:
      return new Decimal("1e23500").mul(Decimal.pow("1e300",player.transformations.bought[x].pow(Decimal.add(1.3,player.transformations.bought[x].sub(25).div(100).max(0))).floor()))
    break;
    case 3:
      return new Decimal("1e21000").mul(Decimal.pow("1e500",player.transformations.bought[x].pow(Decimal.add(1.3,player.transformations.bought[x].sub(25).div(100).max(0))).floor()))
    break;
    case 4:
      return new Decimal("1e80000").mul(Decimal.pow("1e2500",player.transformations.bought[x].pow(Decimal.add(1.3,player.transformations.bought[x].sub(25).div(100).max(0))).floor()))
    break;
  }
}

// is called when the "Activate" button for a Transformation type is clicked
function activateTransform(x) {
  if ((!player.options[5] || confirm("Are you sure you want to switch your activated Transformation? You will go Complex with no reward!")) && !player.transformations.extrusions.includes(x)) {
    player.transformations.activated = x
    goComplex(true)
  }
}

function buyTransform(x) {
  if(player.slope.gte(transformCosts(x))){
    player.slope = player.slope.sub(transformCosts(x))
    player.transformations.bought[x] = player.transformations.bought[x].add(1)
  }
}

function extrudeCosts(x) {
  switch (x) {
    case 1:
      return new Decimal("1e423000")
    break;
    case 2:
      return new Decimal("1e2430000")
    break;
    case 3:
      return new Decimal("1e1140000")
    break;
  }
}

function extrudeTransform(x) {
  if(player.slope.gte(extrudeCosts(x))){
    player.slope = player.slope.sub(extrudeCosts(x))
    player.transformations.extrusions.push(x)
    if(player.transformations.activated == x) player.transformations.activated = 0
  }
}