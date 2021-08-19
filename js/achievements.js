const achs = {
  0:{
    name: "Cheater",
    desc: "Get an autoclicker.",
    complete(){return app.player.buildings[0]>0.5}
  },
  1:{
    name: "Factory Incremental",
    desc: "Get a point factory.",
    complete(){return app.player.buildings[1]>0.5}
  },
  2:{
    name: "Magic?",
    desc: "Get a point portal.",
    complete(){return app.player.buildings[2]>0.5}
  },
  3:{
    name: "Algebra Class",
    desc: "Get 1x.",
    complete(){return app.player.x>0.5}
  },
  4:{
    name: "Function()",
    desc: "Unlock functions.",
    complete(){return !!app.player.upgrades[3]}
  },
  5:{
    name: "Doubler",
    desc: "Get g(x) to 1.",
    complete(){return app.player.functions[1]>0.5}
  },
  6:{
    name: "Tripler",
    desc: "Get h(x) to 1.",
    complete(){return app.player.functions[2]>0.5}
  },
  7:{
    name: "{softcapped}",
    desc: "Get g(x) to 50.",
    complete(){return app.player.functions[1]>49.5}
  },
  8:{
    name: "Getting Squared",
    desc: "Go quadratic",
    complete(){return app.player.x2>0.5}
  },
  9:{
    name: "A few upgrades later",
    desc: "Get the first row of quadratic upgrades.",
    complete(){return hasQuadUpg(0)&&hasQuadUpg(1)&&hasQuadUpg(2)&&hasQuadUpg(3)}
  },
  10:{
    name: "Actually Automation",
    desc: "Get the second row of quadratic upgrades.",
    complete(){return hasQuadUpg(4)&&hasQuadUpg(5)&&hasQuadUpg(6)&&hasQuadUpg(7)}
  },
  11:{
    name: "A new feature?",
    desc: "Get the third row of quadratic upgrades.",
    complete(){return hasQuadUpg(8)&&hasQuadUpg(9)&&hasQuadUpg(10)&&hasQuadUpg(11)}
  },
  12:{
    name: "Sacrifices to randomtuba",
    desc: "Sacrifice x and y.",
    complete(){return app.player.sacx>0.5&&app.player.sacy>0.5}
  },
  13:{
    name: "Auto Quadratic",
    desc: "Unlock auto quadratic.",
    complete(){return hasQuadUpg(14)}
  },
  14:{
    name: "End Game",
    desc: "...for now.",
    complete(){return hasQuadUpg(15)}
  },
}

const achNum = Object.keys(achs).length