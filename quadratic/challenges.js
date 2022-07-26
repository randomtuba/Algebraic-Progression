const CHALLENGES = {
  1: {
    title: "Building Maintenance",
    desc: "Autoclickers, Point Factories, and g(x) are useless.",
    goal: new Decimal(1e165),
    effect() {return new Decimal(1.0005).pow(player.buyables[1].add(player.buyables[2]).add(player.buyables[3]))},
    rewardDesc: "Buildings produce more based on total Buildings bought this Quadratic.",
  },
  2: {
    title: "Generation Slowdown",
    desc: "There's an exponent on point production that increases linearly from 0 to 1 in 30 seconds. If you buy a Building or Function, the exponent resets to 0.",
    goal: new Decimal("1e920"),
    rewardDesc: "Square f(x) again, and unlock a new row of Quadratic Upgrades.",
  },
  3: {
    title: "(scaled)",
    desc: "Buildings and Functions scale 3 times faster. Produced buildings do nothing.",
    goal: new Decimal("5.55e555"),
    rewardDesc: "Building cost scaling is 1.075x, Function cost scaling is divided by 1.25, and the g(x) and h(x) softcaps start 75 purchases later.",
  },
  4: {
    title: "Time Dilation",
    desc: "Point gain is raised to the 0.75th.",
    goal: new Decimal(1e200),
    rewardDesc: "Points are now raised ^1.03.",
  },
  5: {
    title: "Weighted Xs",
    desc: "X Upgrades are useless (that also means Functions do nothing), and every time you buy an X, production is divided by about 1.016 (5^0.01).",
    goal: new Decimal(Infinity),
    rewardDesc: "Divide the X cost by 1e9, and unlock 4 new Square Root upgrades.",
  },
  6: {
    title: "Hyperinflation",
    desc: "Every time you buy a Function, all Functions increase one cost step.",
    goal: new Decimal(Infinity),
    rewardDesc: "Add 1 to the g(x) and h(x) bases.",
  },
  7: {
    title: "Atheism",
    desc: "Sacrificed X, sacrificed Y, and slope do nothing.",
    goal: new Decimal("1e1820"),
    rewardDesc: "The sacrificed X and Y effects are 1.1x more effective.",
  },
  8: {
    title: "Primed Production",
    desc: "Buildings only produce points if the number of total Buildings and Functions is prime. Point gain is also divided by 1e1000.",
    goal: new Decimal(Infinity),
    rewardDesc: "Halve the Y cost.",
  },
  9: {
    title: "Diminishing Returns",
    desc: "Production gets slower over time.",
    goal: new Decimal("1e430"),
    effect() {return new Decimal(player.prestigeTimes[0]).pow(10).max(1)},
    rewardDesc: "Gain more points based on time in this Quadratic.",
  },
  10: {
    title: "Minimum Space",
    desc: "You have 75 purchases. A purchase is lost when you buy a Building, Function, X, or Y. If you have 0 purchases, you cannot buy anything. Produced buildings do nothing.",
    goal: new Decimal(Infinity),
    rewardDesc: "Unlock the next prestige layer.",
  },
}

function startChallenge(x) {
  if(player.challenge == 0){
    goQuadratic()
    player.challenge = x
  }else{
    if(player.points.gte(CHALLENGES[x].goal) && !hasChallenge(x)) player.chalCompletions.push(x)
    goQuadratic()
  }
}

function hasChallenge(x) {
  return player.chalCompletions.includes(x)
}