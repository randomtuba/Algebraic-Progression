const MILESTONES = {
  1: {
    title: "1 Complex",
    desc: "Unlock an autobuyer for the x² Doubler when unlocked.",
    requirement: 1,
  },
  2: {
    title: "2 Complexes",
    desc: "Unlock new Auto-Quadratic options.",
    requirement: 2,
  },
  3: {
    title: "3 Complexes",
    desc: "Start with all Quadratic Upgrades bought.",
    requirement: 3,
  },
  4: {
    title: "4 Complexes",
    desc: "Keep sacrificed currencies on Complex.",
    requirement: 4,
  },
  5: {
    title: "5 Complexes",
    desc: "Start with all Square Root Upgrades bought, and unlock an autobuyer for the RE Doubler.",
    requirement: 5,
  },
  6: {
    title: "6 Complexes",
    desc: "Keep your best Root Essence and Challenge Essence on reset.",
    requirement: 6,
  },
  7: {
    title: "7 Complexes",
    desc: "Start with all Challenges completed.",
    requirement: 7,
  },
  8: {
    title: "8 Complexes",
    desc: "Unlock an autobuyer for b.",
    requirement: 8,
  },
  9: {
    title: "10 Complexes",
    desc: "Unlock autobuyers for QP Buyables, and Root Epicenter Level √4 and √-1 completions are kept.",
    requirement: 10,
  },
  10: {
    title: "12 Complexes",
    desc: "Unlock Auto-Adjust.",
    requirement: 12,
  },
  11: {
    title: "15 Complexes",
    desc: "Double i gain.",
    requirement: 15,
  },
  12: {
    title: "20 Complexes",
    desc: "Unlock Auto-Complex (located above the Complex subtabs) and the Complex Plane.",
    requirement: 20,
  },
  13: {
    title: "5 CC tiers",
    desc: "Permanently keep 10% of Quadratics sacrificed on Complex as Banked Quadratics.",
    requirement: 5,
  },
  14: {
    title: "10 CC tiers",
    desc: "Unlock Transformations (found in the Coordinate Plane subtab).",
    requirement: 10,
  },
  15: {
    title: "15 CC tiers",
    desc: "Passively gain root essence by simulating a Square Root run in the background.",
    requirement: 15,
  },
  16: {
    title: "20 CC tiers",
    desc: "Passively gain challenge essence by simulating a Root Epicenter Level √4 run in the background.",
    requirement: 20,
  },
}

function hasMilestone(x) {
  if(x < 13) {
    return player.complexes.gte(MILESTONES[x].requirement)
  } else {
    return ccTiers() >= MILESTONES[x].requirement
  }
}