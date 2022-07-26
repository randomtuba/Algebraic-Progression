function sacEffect(x) {
  switch (x) {
    case 'x':
      let x = player.sacX.add(1).log(3).add(1).log2().div(hasQU(15)?1.5:3)
      if(hasSU(4)) x = x.mul(1.1)
      x = x.mul(bEffect(2))
      if(hasChallenge(7)) x = x.mul(1.1)
      x = x.add(1)
      if(player.challenge == 7) x = new Decimal(1)
      return x
    break;
    case 'y':
      let base = player.sacY.mul(0.02)
      if(hasQU(14)) base = base.mul(1.5)
      if(hasSU(4)) base = base.mul(1.1)
      base = base.mul(bEffect(2))
      if(hasChallenge(7)) base = base.mul(1.1)
      let softcap = new Decimal(1.5)
      if(hasQU(17)) softcap = softcap.add(0.2)
      if(base.gt(softcap)) base = base.div(softcap).pow(0.25).mul(softcap)
      if(player.challenge == 7) base = new Decimal(0)
      return base
    break;
    case 'x2':
      let x2 = player.sacX2.max(0).div(1e21).pow(0.5).mul(bEffect(1))
      if(x2.gt(1e50)) x2 = x2.div(1e50).pow(0.7).mul(1e50)
      return x2
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
    player.sacrifice = 'x'
    return;
  }
}

function sacrifice(x){
  switch (x) {
    case 'x':
      if(player.x.gt(player.sacX)){
        player.sacX = player.x
        if(!hasQU(19)) player.x = new Decimal(0)
      }
    break;
    case 'y':
      if(player.y.gt(player.sacY)){
        player.sacY = player.y
        if(!hasQU(19)) player.y = new Decimal(0)
      }
    break;
    case 'x<sup>2</sup>':
      if(player.x2.gt(player.sacX2)){
        player.sacX2 = player.sacX2.add(player.x2)
        if(!hasQU(19)) player.x2 = new Decimal(0)
      }
    break;
  }
}

function slopeEffect() {
  let mult = player.slope.pow(Decimal.add(1.5,player.b.div(2))).add(1)
  if(mult.gt(1e15)) mult = mult.pow(0.5).mul(31622776.6016837)
  if(mult.gt("1e400")) mult = mult.pow(0.25).mul(1e300)
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

function bEffect(x) {
  switch (x) {
    case 1:
      return Decimal.pow(3,player.b).pow(1.5)
    break;
    case 2:
      let base = new Decimal(1).add(player.b.pow(1.2).div(50))
      if(base.gte(1.2)) base = base.div(1.2).pow(0.8).mul(1.2)
      return base
    break;
  }
}