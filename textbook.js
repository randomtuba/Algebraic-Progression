/*
Welcome to textbook.js! This is where the Textbook tab data is stored. In here you will find:
- The conditions for textbook entries to unlock
- All of the text in the Textbook stored in a comically long array
*/

function tbookConditions(x,world) {
  let conditions;
  if(world == 1) {
    conditions = [null,true,true,true,true,player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),hasUpgrade(4) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),hasQU(12) || player.totali.gte(1) || player.integrations.gte(1),hasQU(16) || player.totali.gte(1) || player.integrations.gte(1),hasSU(12) || player.totali.gte(1) || player.integrations.gte(1),hasQU(20) || player.totali.gte(1) || player.integrations.gte(1),hasSU(16) || player.totali.gte(1) || player.integrations.gte(1),player.totali.gte(1) || player.integrations.gte(1),player.totali.gte(1) || player.integrations.gte(1),player.totali.gte(1) || player.integrations.gte(1),player.complexes.gte(20) || player.integrations.gte(1),hasCU(1,6) || player.integrations.gte(1),player.zUnlocked || player.integrations.gte(1),hasYQU(8,'bought') || player.integrations.gte(1),player.varSynth.unlocked[0] || player.integrations.gte(1),player.yChalsUnlocked[1] || player.integrations.gte(1),ccTiers() >= 50 || player.integrations.gte(1),player.polynomials[6].bought.gte(1) || player.integrations.gte(1),player.integrations.gte(1),player.integrations.gte(1),player.integrations.gte(1),player.integration.temporalPlane.unlocked,player.integrations.gte(15),IntegrationUpgrades.integration4.isBought(),player.integration.totaldx.gte(1e27),IntegrationUpgrades.ic1.isBought(),player.sinusoidals.gte(1),player.integration.chalCompletions[3] >= 10,player.integration.chalCompletions[3] >= 10,player.unitCircle.unlocked,player.integration.chalCompletions[4] >= 1,player.wUnlocked,Alterations.has(2),BasicHypercompUpgrades.has(6)]
  } else {
    conditions = [null,true,true,true,player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),hasUpgrade(4) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),hasQU(5) || player.totali.gte(1) || player.integrations.gte(1),hasQU(15) || player.totali.gte(1) || player.integrations.gte(1),hasQU(20) || player.totali.gte(1) || player.integrations.gte(1),hasQU(23) || player.totali.gte(1) || player.integrations.gte(1),player.totali.gte(1) || player.integrations.gte(1),player.totali.gte(1) || player.integrations.gte(1),player.totali.gte(1) || player.integrations.gte(1),hasComplexMilestoneLI(11) || player.integrations.gte(1),hasCU(1,6) || player.integrations.gte(1),player.zUnlocked || player.integrations.gte(1),hasYQU(8,'lost') || player.integrations.gte(1),hasYQU(16,'lost') || player.integrations.gte(1),ccTiers() >= 24 || player.integrations.gte(1),player.integrations.gte(1),player.integrations.gte(1),player.integrations.gte(1),player.integrations.gte(1),player.quaternions[1].gte(180),player.quaternions[1].gte(750),FractalMilestones.has(12)]
  }
  return conditions[x];
}

function tbookDescriptions(x,world) {
  let descs;
  if(!player.inLostIntegration) {
    descs = [
        null,
        `Welcome to the Algebraic Progression Textbook! This tab serves as an in-game guide that updates as you progress throughout the game.<br><br>
        Algebraic Progression is an incremental game where the goal is to get all of the Achievements and win the game. The game's mechanics<br>
        are inspired by various aspects of algebra in mathematics, however most mechanics do not faithfully represent how they actually work.<br>
        The game also features common incremental game mechanics, such as Upgrades, Challenges, Buildings, Automation, and Milestones.<br><br>
        Each section afterward covers every important mechanic in the game that may require explaining. There are a few things that you should<br>
        know before your start your journey:<br><br>
        <b>1)</b> While there are some idle sections, this game is active and grindy.<br>
        <b>2)</b> This game has offline progress! This means that resources keep producing while you're away. Use this to your advantage.<br>
        <b>3)</b> If you ever feel stuck, keep waiting and grinding, or ask for help on the Discord server. (linked in the Options tab)<br>
        <b>4)</b> Before you complain about something not having very many uses or ask for a QoL mechanic, it might already be in the game,<br>
        but is unlocked later.<br>
        <b>5)</b> There may still be things that need to be polished. Don't be scared if you encounter issues!<br><br>
        Anyway, good luck and enjoy the ride!`, // preface
        `<b>Autobuyer:</b> A togglable device that automates a specific feature<br>
        <b>Buyable:</b> A repeatable upgrade<br>
        <b>Cost Scaling:</b> The multiplier that is applied to a cost when the item correlated to it is purchased<br>
        <b>Inflation:</b> Uncontrollable and unbalanced progress<br>
        <b>Mechanic:</b> An independent, unlockable feature<br>
        <b>News Message:</b> The scrolling text in the News Ticker<br>
        <b>News Ticker:</b> The rectangle at the top of the screen with scrolling text<br>
        <b>Power:</b> Another word for "exponent" and/or "exponentiate"<br>
        <b>Prestige:</b> A mechanic or action that resets previous progress for a bonus<br>
        <b>Prestige Layer:</b> A more specific term for "Prestige", higher prestige layers reset lower prestige layers<br>
        <b>Resource:</b> Another word for "currency"<br>
        <b>Softcap:</b> A debuff applied to a resource at a certain point, usually takes the form of an exponent less than 1<br>
        <b>Subtab:</b> The small buttons within a tab that allow you to travel to other pages<br>
        <b>Tab:</b> The large buttons at the top of the screen`, // terminology
        `<b>1:</b> Buy Autoclicker
        ${player.buyables[1].gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>2:</b> Buy Point Factory` : ``}
        ${player.buyables[2].gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>3:</b> Buy Point Portal` : ``}
        ${hasUpgrade(4) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>4:</b> Buy f(n)<br><b>5:</b> Buy g(n)<br><b>6:</b> Buy h(n)` : ``}
        ${player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>X:</b> Buy X variable` : ``}
        ${player.y.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>Y:</b> Buy Y variable` : ``}
        ${player.zUnlocked ? `<br><b>Z:</b> Buy Z variable` : ``}
        ${player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>Q:</b> Go Quadratic` : ``}
        ${player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>M:</b> Buy Max` : ``}
        ${hasQU(16) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>S:</b> Enter Square Root` : ``}
        ${hasUpgrade(8) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>B:</b> Buy Y-Intercept` : ``}
        ${player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>C:</b> Go Complex` : ``}
        ${player.zUnlocked ? `<br><b>U:</b> Go Y-Quadratic` : ``}
        ${ccTiers() >= 50 || player.integrations.gte(1) ? `<br><b>P:</b> Buy Max Polynomials` : ``}
        ${player.polynomials[6].bought.gte(1) || player.integrations.gte(1) ? `<br><b>D:</b> Enter Synthetic Division` : ``}
        ${player.integrations.gte(1) ? `<br><b>I:</b> Integrate` : ``}
        ${player.integration.temporalPlane.unlocked ? `<br><b>T:</b> Toggle Temporal Plane activation` : ``}
        ${IntegrationUpgrades.integration4.isBought() ? `<br><b>L:</b> Enter The Limit` : ``}
        ${IntegrationUpgrades.polynomials4.isBought() ? `<br><b>F:</b> Factor Polynomials` : ``}
        ${player.sinusoidals.gte(1) ? `<br><b>N:</b> Go Sinusoidal` : ``}
        <br><b>Shift+S:</b> Save Game
        <br><b>Shift+E:</b> Export Save
        <br>You can use <b>Alt</b> + certain other hotkeys to toggle their respective autobuyers.`, // hotkeys
        `Buildings are the primary production units for Point generation. There are three buildings, each one costing and producing more<br>
        than the previous. By default, Building costs scale by 1.15x per purchase.<br><br>
        The only thing stopping you from producing more points is the universe's maximum capacity. Once the percentage at the top<br>
        reaches 100%, it is impossible to gain any more points.${player.integrations.gte(1) ? `..unless you did something drastic.` : ``}
        ${hasUpgrade(6) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><br>After buying X Upgrade 6, Buildings now produce the previous Building based on their bought amount.<br>For example, if you have 100 Point Portals, you would produce 100 Point Factories per second. This production can be<br>sped up with a resource unlocked later.` : ``}`, // buildings
        `Variables are another currency alongside Points that also increase your Number. There are ${player.zUnlocked ? (player.wUnlocked ? `four` : `three`) : `two`} Variables in the game.<br><br>
        <b>X:</b> x is bought with Points. Its starting cost is 100,000 Points, and its cost is multiplied by 1.11 per purchase.<br>
        X can be used to purchase X Upgrades, which can be found in the Upgrades tab. These are very helpful for progressing.<br>
        While there are 4 X Upgrades visible at first, four more are unlocked much later.
        ${player.y.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><br><b>Y:</b> y is bought with x. Its starting cost is 100x, and its cost is multiplied by 1.25 per purchase, rounded down.<br>
        While y may not seem very helpful at first (since it has no upgrades), it plays a major role for x<sup>2</sup> gain and for upgrade<br>
        effects in the future.
        ${player.zUnlocked ? `<br><br><b>Z:</b> z is bought with y. Its starting cost is 2,222y, and its cost scales quadratically.<br>
        <b>Z Cost Formula:</b> 2,222+((111+((z-1)*10))*z)` : ``}
        ${player.wUnlocked ? `<br><br><b>W:</b> w is bought with z. Its starting cost is 79,000z, and its cost scales quadratically.<br>
        You generate j and k (the two main Hypercomplex currencies) based on the amount of w you have.<br>
        w is also the only variable to never reset.<br>
        <b>W Cost Formula:</b> 100w<sup>2</sup> + 12,000w + 79,000` : ``}
        ${player.y.gte(100) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><br>The ${player.zUnlocked ? (player.wUnlocked ? `fifth` : `fourth`) : `third`} variable does not exist.` : ``}` : ``}`, // variables
        `Upgrades are very important in Algebraic Progression, and are present throughout the entire game in many different forms.<br>
        This section is updated as you unlock new Upgrade types.${player.integrations.gte(1) ? `<br>` : ` `}${player.totali.gte(1) || player.integrations.gte(1) ? `The exception${player.integrations.gte(1) ? `s are` : ` is`} Complex Upgrades${player.integrations.gte(1) ? (Alterations.has(2) ? `, Integration Upgrades, and Hypercomplex Upgrades` : ` and Integration Upgrades`) : ``}, which have their own section${player.integrations.gte(1) ? `s` : ``}.` : ``}<br>
        Upgrade types are in subtabs with an identical or similar name, with ${player.totali.gte(1) ? `` : `the`} exception${player.totali.gte(1) ? "s" : ""} being X Upgrades (found in the Upgrades tab)
        ${player.totali.gte(1) || player.integrations.gte(1) ? "<br>and Basic Complex Upgrades (found in the Complex Upgrades tab)." : ""}<br><br>
        <b>X Upgrades:</b> X Upgrades are upgrades that can be bought with x. There are eight in total. ${player.totalx2.gte(1) || player.totali.gte(1) ? `They also reset on Quadratic.` : ``}
        ${player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>Quadratic Upgrades:</b> Quadratic Upgrades are upgrades that can be bought with x<sup>2</sup>.<br>They are kept on Quadratic, and there are 20 in total. ${player.totali.gte(1) || player.integrations.gte(1) ? `However, they reset on Complex.` : ``}` : ``}
        ${hasQU(16) || player.totali.gte(1) ? `<br><b>Square Root Upgrades:</b> Square Root Upgrades are upgrades that can be bought with Root Essence.<br>They are kept on Quadratic, and there are 16 in total. ${player.totali.gte(1) || player.integrations.gte(1) ? `However, they reset on Complex, just like Quadratic Upgrades.` : ``}` : ``}
        ${player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>Basic Complex Upgrades:</b> Basic Complex Upgrades are upgrades that can be bought with i.<br>They are kept on Quadratic and Complex, and there are 9 in total.` : ``}
        ${player.totaly2.gte(1) || player.integrations.gte(1) ? `<br><b>Y-Quadratic Upgrades:</b> Y-Quadratic Upgrades are upgrades that can be bought with y<sup>2</sup>.<br>They are kept on Quadratic, Complex, and Y-Quadratic, and there are 12 in total.<br>Each Y-Quadratic Upgrade has a unique requirement for you to fulfill before you can buy them.` : ``}
        ${player.polynomials[6].bought.gte(1) || player.integrations.gte(1) ? `<br><b>Synthetic Division Upgrades:</b> Synthetic Division Upgrades are upgrades that can be bought with SE.<br>They are kept on Quadratic, Complex, and Y-Quadratic, and there are 10 in total.<br>The top three are infinitely repeatable, and the rest are bought once.` : ``}
        ${player.sinusoidals.gte(1) ? `<br><b>Sinusoidal Upgrades:</b> Sinusoidal Upgrades are upgrades that can be bought with triangles, and most can be purchased<br>multiple times. They are kept on Quadratic, Complex, Y-Quadratic, Integration, and Sinusoidal, and there are 36 in total.<br>You can unlock new groups of Sinusoidal Upgrades with the top row of "Graphing Cookbook" upgrades.` : ``}
        ${Alterations.has(2) ? `<br><b>Basic Hypercomplex Upgrades:</b> Basic Hypercomplex Upgrades are upgrades that can be bought with k.<br>They are kept on Quadratic, Complex, Y-Quadratic, Integration, and Sinusoidal, and there are 12 in total.` : ``}
        ${player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>Resource Multipliers:</b> Resource multipliers are usually put along with certain upgrade types, but are endlessly repeatable.<br>They multiply a currency by a static amount per purchase. There are two resource doublers and one resource tripler.` : ``}`, // upgrades
        `Functions are the secondary production units for Point generation. There are three functions: f(n), g(n), and h(n). Together,<br>
        they multiply the production of Buildings. f(n) gives a linear and later polynomial bonus, while g(n) and h(n) both give an<br>
        exponential bonus.<br><br>
        <b>Cost Scaling:</b> 2x, 5x, and 7x respectively<br>
        <b>Bases:</b> By default, the g(n) and h(n) bases are 1.3x and 1.6x, respectively. These bases can be increased and even multiplied<br>
        later on.<br>
        <b>Softcaps:</b> At 15 purchases of g(n) and/or h(n), the formulas of g(n) and/or h(n) are modified to prevent inflation.<br>
        These softcaps can be delayed with upgrades and bonuses later on.
        ${BUYABLES[5].base().gte(1e7) && hasZlabMilestone(1,2) || player.integrations.gte(1) ? `<br>Additionally, the g(n) and h(n) bases are softcapped at 50,000,000 if you have Dilations active.` : ``}`, // functions
        `Once you obtain 1 y, you can go Quadratic to gain x<sup>2</sup>. Quadratic resets almost all previous content, so it is considered<br>
        as the first Prestige Layer. There is another prestige layer after this, but it will not be unlocked for a long time.<br><br>
        <b>Base x<sup>2</sup> Gain Formula:</b> 1.25<sup>(x/100)-1</sup> * 1.5<sup>y</sup>
        ${player.totalPoints.gte("1e5e8") || player.integrations.gte(1) ? `<br><b>X Factor Softcap:</b> After 1.5e11 x, their value in the formula becomes softcapped.` : ``}<br><br>
        x<sup>2</sup> can be spent on permanent upgrades that are kept on Quadratic. Once 16 Quadratic Upgrades have been bought,<br>
        an "x<sup>2</sup> Doubler" is unlocked. Its starting cost is 1e9 x<sup>2</sup>, and its cost multiplies by 10 per purchase.<br>
        It doubles x<sup>2</sup> gain per purchase, hence the name. After 290 purchases, it will start scaling faster.`, // quadratic
        `In Coordinate ${player.zUnlocked ? `Realm` : `Plane`}, x${hasSU(6) || player.integrations.gte(1)?", x²,":""} ${player.zUnlocked ? `y, and z` : `and y`} can be sacrificed to gain additional bonuses. You can only increase your sacrificed x/y${player.zUnlocked ? `/z` : ``}<br>
        if your current x/y${player.zUnlocked ? `/z` : ``} amount is greater than the sacrificed amount. Don't let the word "sacrifice" deter you from using<br>
        this feature, as your autobuyers will purchase your variables back instantly.<br><br>
        As this mechanic is expanded many times throughout the game, consider checking back on this section every now and then.<br><br>
        <b>Base Sacrificed x Effect Formula:</b> log<sub>2</sub>(log<sub>3</sub>(sac. x+1)+1), softcaps when the effect ≥ 1,000,000<br>
        <b>Base Sacrificed y Effect Formula:</b> sac. y*0.02, softcaps when the effect ≥ 1.5
        ${hasSU(6) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>Base Sacrificed x<sup>2</sup> Effect Formula:</b> √(max(sac. x<sup>2</sup>,0)/1e21), softcaps when the effect ≥ 1e150 and 1e1000<br><br>
        Sacrificed x<sup>2</sup> allows you to generate Slope, a new resource that boosts the polynomial growth of Building production.<br>
        <b>Slope Effect Formula:</b> slope<sup>1.5${hasUpgrade(8) || player.totali.gte(1) || player.integrations.gte(1) ?"+(b/20+1)<sup>1.2</sup>-1":""}</sup>, softcaps when effect ≥ 1e15, 1e1111, and 1e20000<br>
        This will eventually become a large multiplier to your Point gain.` : ``}
        ${player.zUnlocked ? `<br><b>Base Sacrificed z Effect Formula:</b> (sac. z / 5)^1.5 + 1, softcaps when effect ≥ 200` : ``}
        ${hasUpgrade(8) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><br><b>Y-Intercept (b):</b> b is a three-effect purchaseable resource that can be bought with slope.<br>
        Due to the immense power of b, its last two effects are eventually hardcapped. These hardcaps can be delayed later on.<br>
        <b>Y-Intercept Cost Formula:</b> 1e23 * 10,000<sup>b</sup> * 10<sup>b<sup>2</sup></sup>` : ``}
        ${hasMilestone(14) || player.integrations.gte(1) ? `<br><br><b>Transformations:</b> Transformations are additional purchaseable resources that are also bought with slope.<br>
        Each Transformation boosts a specific sacrificed currency, but only one can be active at a time.<br>
        Unlike the previous extensions to Coordinate ${player.zUnlocked ? `Realm` : `Plane`}, Transformations are kept on Complex.` : ``}
        ${hasZlabMilestone(1,2) || player.integrations.gte(1) ? `<br><br><b>Dilations:</b> Eventually, you unlock Dilations, which boost the sacrificed Z effect.<br>
        Also, each Dilation adds 0.01 to a multiplier to all other Transformation effects, capping at 1.15x, even if Dilations aren't active.
        ${hasZlabMilestone(1,4) || player.integrations.gte(1) ? `<br><br><b>Extrusions:</b> Later, you also unlock Extrusions. Each Extrusion extends a Transformation type into the 3rd Dimension,<br>
        making them permanently active. Extrusions have very high slope costs, due to the fact that they are very powerful.<br>
        Once an Extrusion is bought, it cannot be undone.` : ``}` : ``}`, // coordinate plane
        `Square Root is a modified Quadratic that can be exited to gain Root Essence (commonly abbreviated as RE).<br>
        While in Square Root, your points are raised ^0.5 (hence the name "Square Root"). You gain RE based on how far you get.<br>
        However, Root Essence is not farmable. Your Root Essence gained in a Square Root run is based on your X and Y, minus your<br>
        current Root Essence, so you have to get farther to gain more.<br><br>
        <b>Base RE Gain Formula:</b> (1.1<sup>(x/100)-1</sup> * 1.25<sup>y</sup>) - current RE<br><br>
        Root Essence can be used to purchase Square Root Upgrades, along with a Root Essence doubler, which works like the x<sup>2</sup><br>
        Doubler. Its starting cost is 200, multiplying by 5 per purchase, and starts scaling faster at 100 purchases.
        ${player.totalPoints.gte("1e5e8") || player.integrations.gte(1) ? `<br><br><b>Square Root Hardcap:</b> You can only gain up to ${format("1e5e8")} points in Square Root, including Root Epicenter levels.` : ``}`, // square root
        `Challenges are also modified Quadratics, but work differently from Square Root. Each Challenge has its own set of nerfs,<br>
        and you must reach the Challenge's point goal to complete it. When a Challenge is completed, you gain its reward.<br><br>
        It should be noted that the Challenge order is not sequential. You, the player, have to figure out the Challenge<br>
        order for yourself. A good tip is to look at the point goal for each Challenge, and save Challenges with higher<br>
        point goals for later.<br><br>
        Some Challenge completions have long progression walls between them, so only try completing a Challenge when you<br>
        are completely stuck. If you still can't complete it, try waiting or grinding more.`, // challenges
        `Under the American education system, you learn the "Quadratic Formula", which allows you to solve any quadratic equation<br>
        in the form of ax<sup>2</sup>+bx+c. However, in this game, you will use it to generate Quadratic Power (QP).<br><br>
        The values of a, b, and c can be set to a nonnegative integer below the cap. To generate QP (by default), you need ax<sup>2</sup>+bx+c=0 to<br>
        output a real solution for x when solved, which means that there cannot be square roots of negative numbers.<br>
        <b>Hint:</b> 4ac must be ≤ b<sup>2</sup> to have a real solution for x.<br><br>
        QP can be used to purchase Quadratic Formula buyables. The first three boost other aspects of the game, while the fourth one<br>
        increases the cap of a, b, and c. The first buyable caps at 4 levels, since it is very powerful compared to the rest.<br>
        <b>"Variable Coupler" Cost Formula:</b> 1,000 * 300<sup>purchases</sup> * 2<sup>purchases<sup>2</sup></sup><br>
        <b>"Function Enhancer" Cost Formula:</b> 10,000 * 100<sup>purchases</sup> * 1.7<sup>purchases<sup>2</sup></sup><br>
        <b>"Challenge Amplifier" Cost Formula:</b> 100,000 * 40<sup>purchases</sup> * 1.5<sup>purchases<sup>2</sup></sup><br>
        <b>"Limit Expander" Cost Formula:</b> 1,000 * 10<sup>purchases</sup> * 1.2<sup>purchases<sup>2</sup></sup><br><br>
        <b>Note:</b> "b" in Quadratic Formula should not be confused with Y-Intercept.
        ${hasZlabMilestone(1,3) || player.integrations.gte(1) ? `<br><br><b>Imaginary Power (IP):</b> Imaginary Power, when unlocked, only generates if ax<sup>2</sup>+bx+c=0 outputs a nonreal solution.<br>
        IP generation uses the same base formula, but is generally not affected by external QP multipliers.<br>
        Imaginary Power can be spent on its own four buyables, although the first buyable can only be bought once, making it more of an upgrade.<br>
        <b>"Production Augmenter" Cost Formula:</b> 1e730 * 1e40<sup>purchases</sup> * 10<sup>purchases<sup>2</sup></sup><br>
        <b>"Chemical Accelerator" Cost Formula:</b> 1e800 * 1e80<sup>purchases</sup> * 100<sup>purchases<sup>2</sup></sup> (caps at 10 purchases)<br>
        <b>"Imaginary Duplicator" Cost Formula:</b> 1e760 * 1e60<sup>purchases</sup> * 50<sup>purchases<sup>2</sup></sup>` : ``}`, // quadratic formula
        `Root Epicenter is the final mechanic for the Quadratic prestige layer. You can now increase the difficulty of your<br>
        Square Root run. Level √1 is a regular Square Root run, with Level √2 being harder than Level √1, Level √3 being harder than Level √2,<br>
        and so on. Level √-1 is the hardest level, and reaching 1e12 points in it unlocks the second prestige layer.<br>
        Inside levels √2 and above, you gain Challenge Essence (CE) based on how far you get. Unlike RE, CE is gained based on Points.<br><br>
        <b>Base CE Gain Formula:</b> ((points/1e12)<sup>A</sup>) - current CE, softcaps at 1e8 and 1e2000 CE (both can be delayed later on)<br>
        "A" is a dynamic exponent that changes based on the Root Epicenter level. In Level √2, A = 0.002. In Level √3, A = 0.01.<br>
        Finally, in Level √4, A = 0.06. Level √-1 does not increase A.<br><br>
        While CE cannot be used to buy upgrades, it does multiply the gains of RE (CE<sup>2</sup>) and QP (CE<sup>1.2</sup>).<br>
        The RE boost softcaps when the effect ≥ 1e35 and 1e1500, and the QP boost softcaps when the effect ≥ 1e20 and 1e900.<br>
        Unfortunately, the RE boost hardcaps at 1e200,000, and the QP boost hardcaps at 1e120,000.`, // root epicenter
        `Once you obtain 1e2950 x<sup>2</sup>, 1e660 RE, and a Root Epicenter Level √-1 completion, you can go Complex for i.<br>
        Complex, similarly to Quadratic, resets almost everything before it. You keep your Achievements, your Challenge records,<br>
        and some things underneath the General header in the Statistics tab. i will be your most important currency from this point forward.<br><br>
        <b>Base i Gain Formula:</b> (((x<sup>2</sup>/1e2950)<sup>0.002</sup>)/2 + ((RE/1e660)<sup>0.004</sup>)/2)<sup>0.4</sup><br><br>
        i has many more uses than x<sup>2</sup>, but two important uses for it is for purchasing Basic Complex Upgrades and Upgrade Points.<br>
        The second Complex (the run after you go Complex) will feel quite slow, but Milestones and Complex Upgrades will speed up things quickly.`, // complex
        `To make Complexes faster and more convenient, you gain Milestones based on the amount of times you have gone Complex.<br>
        Milestones usually give quality of life features, such as Autobuyers, and being able to keep mechanics and resources on reset.
        ${hasCU(1,6) || player.integrations.gte(1) ? `<br><br>After unlocking Complex Challenges, new Milestones become visible. These Milestones are based on the<br>
        amount of Complex Challenge tiers you have completed. These Milestones are for filling in the gaps of automation, such as<br>
        unlocking Banked Quadratics and passive RE and CE generation.` : ``}`, // milestones
        `<b>Note:</b> This section does not talk about Basic Complex Upgrades. Read the "Upgrades" section for more information.<br><br>
        Complex Upgrades (CUs) are a table of ${hasZlabMilestone(1,5) || player.integrations.gte(1) ? `16` : `12`} upgrades that require Upgrade Points (UP) to be purchased. Upgrade Points can be bought<br>
        with Points, x<sup>2</sup>, and i. The first row focuses on point gain, the second row focuses on x<sup>2</sup> and RE gain,<br>
        and the third row focuses on i gain. Each column also has a theme for it, that being a specific mechanic from the game.<br><br>
        <b>1st UP Purchase Button Cost Formula:</b> 1e17000<sup>(1.25<sup>purchases</sup>)</sup><br>
        <b>2nd UP Purchase Button Cost Formula:</b> 1e2950<sup>(1.15<sup>purchases</sup>)</sup><br>
        <b>3rd UP Purchase Button Cost Formula:</b><br>
        Starting Cost: 1<br>
        Cost After 1st Purchase: ceil(2<sup>(1.4<sup>max(purchases-1,0)</sup>)</sup>)<br><br>
        <b>Respec:</b> Since different Complex Upgrades boost different aspects of the game, you may want to reset them every once<br>
        in a while. This is why there is a "Respec" feature. Clicking the Respec button will reset your Complex with no reward, but<br>
        you will get your UP back, and your Complex Upgrades will be reset. The "Respec on Complex" button, when toggled on, does<br>
        exactly what it says.<br><br>
        <b>Export/Load Upgrades:</b> Exporting your Complex Upgrades allows you to load your Complex Upgrade build at any time. Note<br>
        that loading CUs will do an automatic respec.<br><br>
        <b>Presets:</b> When you are frequently switching between builds, it can be annoying to buy all of the upgrades again. This is<br>
        why presets exist. Clicking the "Show Presets" button allows you to use CU presets. Clicking on a preset button will select it.<br>
        Clicking "Save" will overwrite the preset data to your Complex Upgrade build, and clicking "Load" will load the preset data,<br>
        which will do an automatic respec. You can also rename presets using the "Rename" button.
        ${hasZlabMilestone(1,5) || player.integrations.gte(1) ? `<br><br><b>Fourth-Row Complex Upgrades:</b> Fourth-row Complex Upgrades act very similar to the other Complex Upgrades, except<br>
        that they can be bought multiple times. Each fourth-row Complex Upgrade's cost starts at 5 UP, and doubles for every purchase.<br>
        Also, fourth-row Complex Upgrades ignore the themes of the columns in the other three rows. Other than this,<br>
        fourth-row Complex Upgrades can be respecced, exported, and loaded just like the other Complex Upgrades. You can even<br>
        respec fourth-row Complex Upgrades specifically, meaning that you keep the Complex Upgrades in the other rows, if desired.` : ``}`, // complex upgrades
        `In Complex Plane, you can use i to purchase xi, yi, ${player.varSynth.unlocked[3] || player.integrations.gte(1) ? `x<sup>2</sup>i, and zi` : `and x<sup>2</sup>i`} once they are unlocked. Each Complex Plane currency<br>
        produces their own Complex Plane power, which boost other aspects of the game. Each Complex Plane currency is unlocked with i<br>
        and the sacrificed currency corresponding to it. Complex Plane does not have any interaction with Coordinate ${player.zUnlocked ? `Realm` : `Plane`} other than this.<br><br>
        <b>xi Power Effect Formula:</b> floor(log<sub>10</sub>(power+1)<sup>0.9</sup>)<br>
        <b>yi Power Effect Formula:</b> log<sub>100</sub>(power+1)+1<br>
        <b>x<sup>2</sup>i Power Effect Formula:</b> log<sub>3</sub>(log<sub>10</sub>(power+1)+1)
        ${player.varSynth.unlocked[3] || player.integrations.gte(1) ? `<br><b>zi Power Effect Formula:</b> log<sub>10</sub>(power+1)` : ``}<br><br>
        <b>xi Cost Formula:</b> 100,000 * 1.5<sup>xi</sup><br>
        <b>yi Cost Formula:</b> 1e8 * 1.75<sup>yi</sup><br>
        <b>x<sup>2</sup>i Cost Formula:</b> 1e18 * 2<sup>x<sup>2</sup>i</sup>
        ${player.varSynth.unlocked[3] || player.integrations.gte(1) ? `<br><b>zi Cost Formula:</b> 1e2500 * 1e10<sup>zi</sup> * 10<sup>zi<sup>2</sup></sup>` : ``}
        ${player.compPlane[0][3].gt(0) || player.integrations.gte(1) ? `<br><br>Using all of the Complex Plane powers${player.varSynth.unlocked[3] || player.integrations.gte(1) ? ` (except zi power)` : ``}, you can buy from the i Tripler. Its starting cost is 10,000, and<br>
        its cost multiplies by 50 per purchase.` : ``}`, // complex plane
        `Complex Challenges (CCs) are very similar to regular Challenges, but have a few key differences:<br>
        <b>1)</b> Complex Challenges require x<sup>2</sup> to complete, and take place within a Complex.<br>
        <b>2)</b> A Complex Challenge must be unlocked with UP before you can enter it.<br>
        <b>3)</b> Each Complex Challenge can be completed up to 5 times. The reward and goal increase for each completion.<br>
        Each unique Complex Challenge completion is called a Complex Challenge tier, usually shortened to "CC tier".<br><br>
        You can only have one Complex Challenge unlocked at a time.<br><br>
        By unlocking Complex Challenges, you have also unlocked new Milestones. Read the "Milestones" section for more information.<br>
        Once you have completed 20 CC tiers, you will unlock 5 additional Complex Challenges, so there is a total of 50 completable CC tiers.
        <br><br><b>Bug:</b> When in Complex Challenge 7, staying on the Complex Challenges subtab can cause the display to freeze.<br>
        However, you can usually still navigate to other tabs.`, // complex challenges
        `Once you obtain 2,222y and 1 z, you can go Y-Quadratic for y<sup>2</sup>.<br>
        Y-Quadratic resets everything that Complex resets, but also resets your sacrificed x, y, and x<sup>2</sup>. However, Y-Quadratic<br>
        is <i>not</i> the third prestige layer! It is on the same layer as Complex, as they both mostly reset the same content.<br><br>
        <b>Base y<sup>2</sup> Gain Formula:</b> 1.25<sup>(y-2,222)/100</sup> * 1.5<sup>z</sup><br><br>
        y<sup>2</sup> can be spent on Y-Quadratic Upgrades, but later you will mostly use it<br>
        for unlocking new mechanics in the Y-Quadratic tab.`, // y-quadratic
        `After buying the 8th Y-Quadratic Upgrade "Chemical Expansion", the Z Lab will be unlocked.<br>
        Your current z amount will generate Z-Power. By default, 0 z produces 1 Z-Power per second, with each z obtained allowing you<br>
        to produce 2x more Z-Power per second. So, 7 z would produce 128 (2<sup>7</sup>) Z-Power per second. This multiplier can be<br>
        increased with Z Empowerments, which are bought with i. Each one adds 0.25 to this multiplier. So, having 2 Z Empowerments<br>
        would increase the multiplier to 2.5x, making 7 z produce 2.5<sup>7</sup> Z-Power per second.<br><br>
        <b>Z Empowerment Cost Formula:</b> 1e110 * 100,000<sup>purchases<sup>2</sup></sup><br><br>
        <b>Z-Colliders:</b> There are ${IntegrationUpgrades.complex9.isBought() ? `five` : `four`} Z-Colliders, but you can only charge one of them at a time. Charging a Z-Collider<br>
        allows you to produce Z-Particles of its corresponding type. These Z-Particles can be used to level up each Z-Collider,<br>
        which allows you to gain milestones that give powerful bonuses and extend previous mechanics.<br><br>
        <b>Expansion Z-Collider Cost Formula:</b> 2,000 * 8<sup>level</sup> * 2<sup>max(level-15,0)<sup>2</sup></sup>, cost is set to 1e34 at level 19<br>
        <b>Propulsion Z-Collider Cost Formula:</b> 8,000 * 16<sup>level</sup> * 2<sup>max(level-15,0)<sup>2</sup></sup><br>
        <b>Inflation Z-Collider Cost Formula:</b> 40,000 * 32<sup>level</sup> * 2<sup>max(level-15,0)<sup>2</sup></sup><br>
        <b>Reduction Z-Collider Cost Formula:</b> 200,000 * 64<sup>level</sup> * 2<sup>max(level-15,0)<sup>2</sup></sup>
        ${IntegrationUpgrades.complex9.isBought() ? `<br><b>Perpetuity Z-Collider Cost Formula:</b> 1e3800 * 1e10<sup>level</sup>` : ``}`, // z lab
        `The Variable Synthesizer can be unlocked at 1e17 y<sup>2</sup> and 35 CC tiers. The Variable Synthesizer allows you to "synthesize"<br>
        products of previous currencies, excluding i Exponentiation. In this section, each micro-mechanic unlocked from the<br>
        Variable Synthesizer will be explained in detail as you unlock them.<br><br>
        <b>xy:</b> xy is unlocked by default when unlocking the Variable Synthesizer. xy can be bought with, well, x and y.<br>
        Each xy can be used to "charge" an X Upgrade (found in the long-forgotten Upgrades tab). Charged X Upgrades are significantly<br>
        more powerful than their regular counterparts. Hovering over an uncharged X Upgrade with at least 1 xy allows you to see its<br>
        charged counterpart. Charged X Upgrades also can be respecced on Y-Quadratic, if desired.<br><br>
        <b>xy Cost Formulas:</b><br>
        <i>X Portion:</i> 180,000,000 * 1.4<sup>xy</sup><br>
        <i>Y Portion:</i> 9,500 * 1.18<sup>xy</sup><br>
        At 8 xy, you cannot buy any more of them${player.integrations.gte(1) ? ` unless you buy the Integration Upgrade "xy Bonus"` : ``}.
        ${player.varSynth.unlocked[1] || player.integrations.gte(1) ? `<br><br><b>x<sup>2</sup>y<sup>2</sup>:</b> x<sup>2</sup>y<sup>2</sup> can be gained from sacrificing your x<sup>2</sup> and y<sup>2</sup>. You'll get your<br>
        x<sup>2</sup> back instantly, but you'll have to grind a bit to get your y<sup>2</sup> back again. x<sup>2</sup>y<sup>2</sup> produce Circles,<br>
        which boost the gains of various different currencies, and you unlock new bonuses based on your Circles.<br><br>
        <b>x<sup>2</sup>y<sup>2</sup> Gain Formula:</b> max(((x<sup>2</sup>)<sup>0.000001</sup> * (y<sup>2</sup>)<sup>0.02</sup>)<sup>1.2</sup> - x<sup>2</sup>y<sup>2</sup>,0)` : ``}
        ${player.varSynth.unlocked[2] || player.integrations.gte(1) ? `<br><br><b>i Exponentiation:</b> Over time, your expression's exponent will increase from 0 to 4, resetting back to 0 when reaching 4.<br>
        Every time it does this, you gain 1 revolution. Additionally, based on the i exponent, you gain a bonus to Complex Plane powers.<br>
        These multipliers rise and fall as the exponent increases from 0 to 4, but there is a maximum possible multiplier for each<br>
        Complex Plane power, which is 1.00e10x by default.<br><br>
        Revolutions can be spent on two Revolution Buyables.<br>
        These buyables boost the main i Exponentiation mechanic, and help you get more revolutions.<br><br>
        <b>Revolution Buyable 1 Cost Formula:</b> 10 * 4<sup>purchases</sup><br>
        <b>Revolution Buyable 2 Cost Formula:</b> 100 * 3<sup>purchases</sup>` : ``}
        ${player.varSynth.unlocked[3] || player.integrations.gte(1) ? `<br><br><b>zi:</b> zi is the fourth Complex Plane currency, and is not affected by multipliers to Complex Plane currencies.<br>
        zi power gives free Upgrade Points, and is the only source of extra UP in the game.` : ``}`, // variable synthesizer
        `Y-Challenges (YCs) are the third type of Challenges. Y-Challenges take place in Y-Quadratics, and<br>
        require x to complete. The first Y-Challenge is unlocked by default. Each Y-Challenge after must be<br>
        unlocked with y<sup>2</sup>, and will be unlocked permanently.<br>
        Unlike the other two Challenge variants, Y-Challenges have no completion cap, and their goals scale linearly.<br>
        As usual, the more completions you have, the greater the reward gets.`, // y-challenges
        `When you complete all 10 Complex Challenges fully (equating to 50 CC tiers), you unlock Polynomials.<br>
        The first polynomial is x<sup>3</sup>, which produces Polynomial Power (PP), which gives an exponent to point gain.<br>
        x<sup>4</sup> produces x<sup>3</sup>, and x<sup>5</sup> produces x<sup>4</sup>, and so on. The last polynomial is x<sup>10</sup>.<br><br>
        Additionally, each polynomial costs an amount of the polynomial tier before it. For example, x<sup>5</sup> requires<br>
        x<sup>4</sup> to be purchased. Polynomials also have an "efficiency" stat that multiplies the production of that tier.<br>
        The efficiency of a polynomial doubles per purchase. After 1e3,000,000x efficiency, the efficiency stat becomes softcapped.<br>
        Over time, you'll also unlock buyables that can be purchased with polynomials.<br><br>
        <b>Polynomial Power Effect Formula:</b> 1 + (log<sub>10</sub>(PP+1)<sup>0.75</sup> / 500), hardcaps at 1.42<br>
        <b>x<sup>3</sup> Buyable Cost Formula:</b> 100,000 * 100<sup>purchases</sup> * 10<sup>(purchases * (purchases + 1)) / 2</sup><br>
        <b>x<sup>4</sup> Buyable Cost Formula:</b> 10,000 * 1,000<sup>purchases</sup> * 10<sup>(purchases * (purchases + 1)) / 2</sup><br>
        <b>x<sup>5</sup> Buyable Cost Formula:</b> 100,000 * 10,000<sup>purchases</sup> * 10<sup>(purchases * (purchases + 1)) / 2</sup><br>
        <b>x<sup>6</sup> Buyable Cost Formula:</b> 1,000,000 * 1,000<sup>purchases</sup> * 10<sup>(purchases * (purchases + 1)) / 2</sup><br>
        <b>x<sup>7</sup> Buyable Cost Formula:</b> 1,000,000 * 10,000<sup>purchases</sup> * 10<sup>(purchases * (purchases + 1)) / 2</sup><br>
        <b>x<sup>8</sup> Buyable Cost Formula:</b> 1.00e15 * 1,000,000<sup>purchases</sup> * 100<sup>(purchases * (purchases + 1)) / 2</sup>
        ${IntegrationUpgrades.polynomials4.isBought() ? `<br><br>
        <b>Polynomial Factoring:</b> Upon purchasing the Integration Upgrade "Dimensional Sacrifice", you unlock the ability to<br>
        factor your Polynomials. Factoring your Polynomials resets Polynomials and Polynomial Buyables but provides a boost to x<sup>10</sup> efficiency.<br><br>
        <b>Base Polynomial Factoring Multiplier Formula:</b> PP<sup>0.01</sup>+1` : ``}`, // polynomials
        `Synthetic Division is, in simple terms, Complex's version of Square Root. Upon entering Synthetic Division, your point gain and x<sup>2</sup><br>
        gain are both powered ^0.02, and you gain Synthetic Essence (SE) based on how many points you have in Synthetic Division.<br><br>
        Synthetic Essence boosts the efficiency of all polynomials, and can also be spent on Synthetic Division Upgrades.<br>
        Read the "Upgrades" section for more information about Synthetic Division Upgrades.<br><br>
        <b>Base Synthetic Essence Gain Formula:</b> (log<sub>10</sub>(max(points / 1e95000,1)) / 5) - unspent SE<br>
        <b>Base Synthetic Essence Effect Formula:</b> SE<sup>0.5</sup> + 1<br>
        <b>S.D. Upgrade 1 Base Cost Formula:</b> 1,000 * 10<sup>purchases</sup><br>
        <b>S.D. Upgrade 2 Base Cost Formula:</b> 3,000 * 20<sup>purchases</sup><br>
        <b>S.D. Upgrade 3 Base Cost Formula:</b> 7,500 * 30<sup>purchases</sup><br><br>
        The second repeatable Synthetic Divsion Upgrade caps at 20 purchases and<br>
        the third repeatable Synthetic Division Upgrade caps at 14 purchases.`, // synthetic division
        `Once you obtain 1e270,000 i, 1e500 y<sup>2</sup>, and 1 x<sup>10</sup>, you can Integrate for dx, empty sets, and 1 hole.<br>
        Integration, similarly to previous layers, resets almost everything before it, including the first 60 Achievements.<br>
        You still keep your Challenge records and some things underneath the General header in the Statistics tab. dx and empty sets<br>
        will become your most important currencies from this point forward.<br><br>
        <b>Base dx Gain Formula:</b> 5 * (1000<sup>(log<sub>10</sub>(max(i,1))/270000)-1</sup>) * (10<sup>(log<sub>10</sub>(max(y<sup>2</sup>,1e510))/510)-1</sup>)<br>
        <b>Base Empty Sets Gain Formula:</b> i<sup>1/270000</sup>/10 * log<sub>10</sub>(PP+1)/500 * max(SE<sup>1/50</sup>/10,1) * max(complexes<sup>1/10</sup>/10,1)<br>
        <b>Base Holes Gain Formula:</b> max(log<sub>10</sub>(pending dx + 1) / 100,1)<br><br>
        Holes are used for purchasing Integration Upgrades on the Perk Tree.<br>
        Empty sets are used for assigning Number Sets.<br>
        dx is used for unlocking effect slots and type slots and purchasing Integration Upgrades on the Production Tree.`, // integration
        `Number Sets are a group of 20 effects split into 5 groups known as Set types. Each Set type and Set effect must be activated<br>
        with type slots and effect slots, respectively. Type slots and effect slots can be bought with dx. Each Number Set type focuses on<br>
        a unique section of the game. For example, Natural Set effects focus on Pre-Quadratic content,<br>
        and Real Set effects focus on Y-Quadratic content. Similar to Complex Upgrades, you can respec your Number Sets to<br>
        get your type slots and effect slots back if you'd like to try a different build.<br><br>
        <b>Assigning Empty Sets:</b> To make your Set effects more powerful, you can assign your empty sets to various Set types.<br>
        Click the "Assort" button to assign 1 empty set to a specific Set type. You can also click the "Distribute Empty Sets"<br> button if you have at least 5 empty sets, and it will divide your empty sets evenly across your Set types.
        ${IntegrationUpgrades.integration3.isBought() ? `<br><br><b>Set Sacrifice:</b> Upon purchasing the Integration Upgrade "In The Soul Set", Set Sacrifice is unlocked.<br>
        Using the buttons in each Set type, you can sacrifice a percentage of your assigned sets from that type to be converted into<br>
        a sacrifice value that provides a unique 5th effect based on its type.` : ``}`, // number sets
        `Integration Upgrades are 3 groups of upgrades that are kept on Integration.<br><br>
        <b>Rebuyable Integration Upgrades:</b> These are a group of 5 infinitely repeatable upgrades that cost dx to purchase.<br><br>
        <b>Temporal Integrator Cost Formula:</b> 20<sup>purchases</sup><br>
        <b>Exponential Integrator Cost Formula:</b> 30<sup>purchases</sup><br>
        <b>Synthetic Integrator Cost Formula:</b> 40<sup>purchases</sup><br>
        <b>Quadratic Integrator Cost Formula:</b> (50<sup>purchases</sup>) * 2<br>
        <b>Imaginary Integrator Cost Formula:</b> (60<sup>purchases</sup>) * 2<br><br>
        <b>Production Tree:</b> The Production Tree contains 6 branches of upgrades, each representing a section of the game.<br>
        All Production Tree upgrades cost dx, but some (usually upgrades away from the main path) have requirements that you must<br>
        complete before being able to purchase them, similar to Y-Quadratic Upgrades.<br>
        For both upgrade trees, you must buy (one of) the previous upgrade(s) connected to it to purchase the upgrade as well.<br><br>
        <b>Perk Tree:</b> The Perk Tree contains 40 "perks", and each perk provides a quality of life unlock or improvement.<br>
        Unlike all other Integration Upgrades, each perk costs 1 hole to purchase.`, // integration upgrades
        `In the Temporal Plane, you can use dx to purchase xt, yt, x<sup>2</sup>t, zt, and y<sup>2</sup>t. Each Temporal Plane currency<br>
        produces their own Temporal Plane power to provide a multiplier to global speed. Unlike Complex Plane, there are no<br>
        unlock requirements for Temporal Plane currencies.<br><br>
        <b>Temporal Plane Power Multiplier Formula:</b> log<sub>2</sub>(power+1)<sup>1.25</sup>+1<br><br>
        <b>Global Speed:</b> Global speed affects the generation of all currencies. This includes passive generation of currencies<br>
        (such as passive x<sup>2</sup> generation), total time played, and prestige times. From now on, "game time" refers to<br>
        time affected under global speed multipliers, and "real time" refers to the actual passage of time in real life. Unless otherwise<br>
        specified, all times from now on should be recognized as in "game time".<br><br>
        <b>Uncertainty Exponent:</b> Your total Temporal Plane multiplier is constantly affected by an oscillating "uncertainty exponent".<br>
        For 15 real-time seconds, your uncertainty exponent will linearly increase from 0 to 1. For the next 15 real-time seconds,<br>
        your uncertainty exponent will linearly decrease from 1 to 0. This cycle repeats continuously.
        ${player.integration.temporalPlane.buyables[4].gte(1) ? `<br><br><b>Time-Jump:</b> Using holes, you can skip forward in real time by 5 minutes for each hole spent.<br>
        When you time-jump, you'll have to wait at least 6 hours (scaling based on time-jump length) before you can time-jump again.` : ``}`, // temporal plane
        `The Automation Core is unlocked by Integrating 15 times. The Automation Core has various options that allow you to<br>
        automate all of the mechanics that aren't fully automated by the perks alone. This includes automatically unlocking,<br>
        entering, and completing Complex Challenges, automatically loading Complex Upgrades, automatically entering and exiting<br>
        Synthetic Divison, and automatically grinding Quadratics when necessary. The Automation Core might not be optimal to use<br>
        immediately once unlocked due to it being designed for use after all upgrades in the Perk Tree have been bought.<br><br>
        <b>Note:</b> In a post-release update, the Automation Core will be replaced with a more flexible scripting language.`, // automation core
        `The Limit is a fully customizable Integration where you gain Limit Score (LS) based on its difficulty. You must reach<br>
        all of the requirements for Integration to be able to gain Limit Score.<br><br>
        <b>Climate:</b> There are eight customizable Challenge Factors, each nerfing a certain currency. The higher your total<br>
        Challenge Factor levels is, the weaker your Polynomials will become. Each Challenge Factor level provides a 1.5x multiplier to Limit<br>
        to Limit Score gain.<br><br>
        <b>Convergence:</b> You can set the "convergence goal" to a value in i. The closer your i amount approaches your convergence goal,<br>
        the higher your convergence multiplier will be, up to a maximum of 10. However, if your i amount surpasses your convergence goal,<br>
        your convergence multiplier will go down to 1.<br><br>
        <b>Collective:</b> The third multiplier encompasses all other multipliers to your Limit Score gain.<br>
        These will come from other upgrades that you buy.`, // the limit
        `Once you obtain 1e4000 circles and 1e2650 revolutions, you can go Sinusoidal for triangles.<br>
        Sinusoidal resets everything that Integration resets. Similarly to Y-Quadratic, Sinusoidal is on the same layer as Integration,<br>
        as they both mostly reset the same content. Triangles produce Trigonometric Waves (TW) and can purchase new upgrades.<br><br>
        <b>Base Triangles Gain Formula:</b> 100<sup>(log<sub>10</sub>(circles)/4000) - 1</sup> * 100<sup>(log<sub>10</sub>(revolutions)/2650) - 1</sup>`, // sinusoidal
        `Integration Challenges (ICs) are the fourth type of Challenges. Integration Challenges take place in Integrations, and<br>
        each Integration Challenge works uniquely compared to the rest. Most ICs require i to be completed, but some require y<sup>2</sup>.<br>
        Integration Challenges are unlocked through the Production Tree in the "Integration Upgrades" subtab. You need to<br>
        fulfill a requirement or set of requirements to unlock the Integration Challenge. Once unlocked, you do not need to<br>
        unlock it again. Once you've completed all eight Integration Challenges, you will win the game.`, // integration challenges
        `You can use Trigonometric Waves (TW) to purchase Trigonometric Functions. They produce their own powers, which provide a bonus<br>
        to a Set effect (or a multiplier to holes, in the case of cot(θ)) and a multiplier to the gain of the previous Trigonometric Function's<br>
        power (or TW gain, in the case of sin(θ)). Both generation of TW and Trigonometric Function powers are not affected by global speed.<br><br>
        <b>Trigonometric Function Starting Costs:</b> 100, 10,000, 1,000,000, 10,000,000, 1e9, 1e12<br>
        <b>Trigonometric Function Cost Scalings:</b> 100, 1,000, 10,000, 100,000, 1,000,000, 100,000,000<br><br>
        <b>sin(θ) Set Effect Formula:</b> (log<sub>10</sub>(log<sub>10</sub>(power+1)+1) / 2) + 1<br>
        <b>cos(θ) Set Effect Formula:</b> log<sub>10</sub>(power+1) + 1<br>
        <b>tan(θ) Set Effect Formula:</b> log<sub>2</sub>(power+1) + 1<br>
        <b>csc(θ) Set Effect Formula:</b> √(log<sub>2</sub>(power+1)) + 1<br>
        <b>sec(θ) Set Effect Formula:</b> log<sub>3</sub>(log<sub>10</sub>(power+1)+1) + 1<br>
        <b>cot(θ) Set Effect Formula:</b> log<sub>10</sub>(log<sub>10</sub>(power+1)+1) + 1`, // trigonometric functions
        `<b>>j(n):</b> Based on your variable amounts in The Limit with all Challenge Factors maxed, you'll gain j(n).<br>
        j(n) normally produces second derivatives, but it starts producing third derivatives after reaching 5,000,000 j(n).<br><br>
        <b>Base j(n) Gain Formula:</b> (x*y*z)<sup>0.25</sup><br>
        <b>Base Second Derivatives Generation Formula:</b> (j(n) / 10,000)<sup>0.5</sup><br>
        <b>Base Third Derivatives Generation Formula:</b> (j(n) / 1e10)<sup>0.75</sup><br><br>
        Similar to Polynomials, each derivative tier produces the previous one, except for antiderivatives, which<br>
        are unlocked later. Each derivative tier can be used to purchase Derivative Buyables.<br>
        Also, Derivatives are normally not affected by global speed.<br><br>
        <b>"Constant Rule" Cost Formula:</b> 100 * (100<sup>purchases</sup>) * (100<sup>max(purchases - 19,0)<sup>2</sup></sup>)<br>
        <b>"Constant Multiple Rule" Cost Formula:</b> 1,000,000 * (1000<sup>purchases</sup>) * (100<sup>max(purchases - 11,0)<sup>2</sup></sup>)<br>
        <b>"Power Rule" Cost Formula:</b> 100 * (100<sup>purchases</sup>)<br>
        <b>"Sum Rule" Cost Formula:</b> 1,000,000 * (1000<sup>purchases</sup>)<br>
        <b>"Difference Rule" Cost Formula:</b> 10,000 * (10,000<sup>purchases</sup>) * (100<sup>max(purchases - 24,0)<sup>2</sup></sup>)<br>
        <b>"Product Rule" Cost Formula:</b> 100,000 * (100,000<sup>purchases</sup>) * (100<sup>max(purchases - 19,0)<sup>2</sup></sup>)
        ${PythagoreanTriples.hasMilestone(6) ? `<br><b>"Quotient Rule" Cost Formula:</b> 1e110 * (1e10<sup>purchases</sup>) * (100<sup>max(purchases - 29,0)<sup>2</sup></sup>)<br><b>"Chain Rule" Cost Formula:</b> 1e115 * (1e10<sup>purchases</sup>) * (10<sup>purchases<sup>2</sup></sup>)` : ``}`, // derivatives
        `The Unit Circle can be unlocked at 2e55 triangles. Its subtab is visible after completing Integration Challenge 3 ten times.<br>
        The Unit Circle gives a boost and nerf to Trigonometric Functions and a secondary effect based on the quadrant selected.<br>
        You can normally only have 1 quadrant active at a time, and changing your quadrant does a Sinusoidal reset.<br>
        You can improve the secondary effect with buyables that cost TW and triangles, respectively.<br><br>
        <b>Base Secondary Effect Formula:</b> TW<sup>0.05</sup> + 1<br>
        <b>1st Unit Circle Buyable Cost Formula:</b> 1e63 * 1e12<sup>purchases<sup>2</sup></sup><br>
        <b>2nd Unit Circle Buyable Cost Formula:</b> 1e70 * 1e15<sup>purchases<sup>2</sup></sup>`, // unit circle
        `When you reach 1e1,425,000 polynomial power, you can unlock Y-Polynomials.<br>
        The first Y-Polynomial is y<sup>3</sup>, which produces Y-Polynomial Power, which gives an exponent to Polynomial efficiencies.<br>
        Y-Polynomials work similarly to Polynomials, with each tier costing and producing the tier before it.<br>
        The efficiency of a Y-Polynomial doubles per purchase, until it reaches 1e9, which then it's softcapped.<br>
        Additionally, Y-Polynomials are normally not affected by global speed.<br><br>
        <b>Y-Polynomial Power Effect Formula:</b> (log<sub>10</sub>(power + 1)<sup>0.75</sup> / 500) + 1, hardcaps at 1.58`, // y-polynomials
        `"Pythagorean Triples" are sets of three positive integers in which a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>.<br><br>
        The values of d, e, and f can be set to a nonnegative integer below the cap. To generate Pythagorean Essence (PE), you need the rule<br>
        above to apply. If you don't want to do this yourself, simply click the "Do it for me!" button and the values will be optimally set.<br><br>
        <b>Hint:</b> Multiples of the "3,4,5" triple are always the most optimal.<br><br>
        PE can be used to purchase Pythagorean Triples buyables. The first three boost other aspects of the game, while the fourth one<br>
        increases the cap of d, e, and f.<br><br>
        <b>"Variable Extruder" Cost Formula:</b> 100,000 * 3,000<sup>purchases</sup> * 3<sup>purchases<sup>2</sup></sup><br>
        <b>"Synthetic Enhancer" Cost Formula:</b> 5,000,000 * 1,000<sup>purchases</sup> * 2.5<sup>purchases<sup>2</sup></sup><br>
        <b>"Challenge Revitalizer" Cost Formula:</b> 1e20 * 400<sup>purchases</sup> * 1.75<sup>purchases<sup>2</sup></sup><br>
        <b>"Horizon Shifter" Cost Formula:</b> 1,000,000 * 1,000<sup>purchases</sup> * 2<sup>purchases<sup>2</sup></sup>, cost is powered ^1.5 after 58 purchases<br><br>
        <b>Note:</b> "e" in Pythagorean Triples should not be confused with the exponential constant (2.71828...).
        ${player.integration.chalCompletions[4] >= 3 ? `<br><br>After completing Integration Challenge 4 three times, you unlock three fillable bars that provide a bonus after<br>the 1st bar milestone is reached. Depending on the bar's percentage filled, you can reach milestones<br>that provide additional bonuses.<br><br><b>Bar Caps:</b> 1e1.7e10, 1e5.5e9, 3.165e3100<br><b>QP Bar Effect Formula (< 1,000):</b> 3<sup>percentage</sup><br><b>QP Bar Effect Formula (≥ 1,000):</b> 1,000 * 1.25<sup>percentage - 6.288</sup>, base changes to 1.75 after the 2nd QP bar milestone<br><b>IP Bar Effect Formula:</b> 1.5<sup>percentage</sup> * 100, effect powered by 5 after the 4th IP bar milestone<br><b>PE Bar Effect Formula:</b> (percentage / (100 / 3)) + 1, hardcaps at 3.15` : ``}`, // pythagorean triples
        `You gain Alterations based on your W amount. Alterations unlock large mechanical extensions and quality of life bonuses.
        ${Alterations.has(2) ? `<br><br><b>Parabolas:</b> Upon reaching the 2nd Alteration, you unlock Parabolas. Parabolas allow you to weaken and delay the X Factor Softcap<br>
        by spending x<sup>2</sup>. The cost of Parabolas increase super-exponentially, but Parabolas are incredibly strong to compensate. Parabola count<br>
        is never reset, meaning that once purchased, you do not need to reach the x<sup>2</sup> cost again to receive the powerful bonuses. You can see<br>
        your current Parabola count and the cost of the next one in the Quadratic tab.` : ``}
        ${Alterations.has(3) ? `<br><br><b>6-Completion Complex Challenges:</b> Upon reaching the 3rd Alteration, all Complex Challenges can be completed a sixth time.<br>
        Complex Challenges after having their 6th tier completed can have their reward significantly boosted or even unlock new rewards.` : ``}
        ${Alterations.has(4) ? `<br><br><b>Charged Quadratic Upgrades:</b> Upon reaching the 4th Alteration, you unlock y<sup>2</sup>z<sup>2</sup>, which works similarly to xy but it's bought with y<sup>2</sup><br>
        and used to charge Quadratic Upgrades. Charged Quadratic Upgrades can be respecced on Integration and Sinusoidal.` : ``}
        ${Alterations.has(6) ? `<br><br><b>Quaternion Sets:</b> Upon reaching the 6th Alteration, you unlock Quaternion Sets, the 7th set type. Instead of requiring<br>
        a type slot or effect slots to activate its effects, its effects are unlocked depending on the amount of quaternion sets assigned to it.` : ``}`, // alterations
        `<b>Note:</b> This section does not talk about Basic Hypercomplex Upgrades. Read the "Upgrades" section for more information.<br><br>
        Hypercomplex Upgrades (HCUs) are a table of 16 upgrades that require quaternions to be purchased. Quaternions can be bought<br>
        with dx, triangles, and j. The first row focuses on general production bonuses, the second row focuses on Polynomials,<br>
        the third row focuses on Integration content, and the fourth row generally focuses on Sinusoidal content.<br><br>
        <b>1st Quaternion Purchase Button Cost Formula:</b> 1e3250<sup>(1.25<sup>purchases</sup>)</sup><br>
        <b>2nd Quaternion Purchase Button Cost Formula:</b> 1e230<sup>(1.2<sup>purchases</sup>)</sup><br>
        <b>3rd Quaternion Purchase Button Cost Formula:</b> 500<sup>(1.15<sup>purchases</sup>)</sup><br><br>
        Once Hypercomplex Upgrades are unlocked, you will begin producing j and k, the main currencies of Hypercomplex.<br>
        j and k are used for different purposes, and are both generated based on your W amount and i amount.<br><br>
        <b>Base j Generation Formula:</b> 2.25<sup>w</sup> * ((log<sub>10</sub>(i + 1) / 2e8) + 1)<br>
        <b>Base k Generation Formula:</b> 1.75<sup>w</sup> * ((log<sub>10</sub>(i + 1) / 4e8) + 1)<br><br>
        Similar to Complex Upgrades, you can respec Hypercomplex Upgrades, export<br>
        and load Hypercomplex Upgrade strings, and save Hypercomplex Upgrade presets.`, // hypercomplex upgrades
        `In Hypercomplex Flune, you can use j and k to purchase 8 different currencies. Each Hypercomplex Flune currency<br>
        produces their own Hypercomplex Flune power, which boost other aspects of the game. Hypercomplex Flune power<br>
        generation is not affected by global speed.<br><br>
        <b>xj Power Base Effect Formula:</b> power<sup>3</sup> + 1<br>
        <b>yj Power Base Effect Formula:</b> (log<sub>10</sub>(log<sub>10</sub>(power + 1) + 1) / 25) + 1<br>
        <b>zj Power Base Effect Formula:</b> (log<sub>10</sub>(log<sub>10</sub>(power + 1) + 1) / 20) + 1<br>
        <b>wj Power Base Effect Formula:</b> (log<sub>10</sub>(log<sub>10</sub>(power + 1) + 1) / 10) + 1<br>
        <b>xk Power Base Effect Formula:</b> floor(log<sub>2</sub>(power + 1)<sup>0.9</sup>)<br>
        <b>yk Power Base Effect Formula:</b> power<sup>5</sup> + 1<br>
        <b>zk Power Base Effect Formula:</b> (log<sub>10</sub>(log<sub>10</sub>(power + 1) + 1) / 20) + 1<br>
        <b>wk Power Base Effect Formula:</b> power<sup>100</sup> + 1<br><br>
        <b>xj Cost Formula:</b> 1e35 * 3<sup>xj<sup>2</sup></sup><br>
        <b>yj Cost Formula:</b> 1e35 * 6<sup>yj<sup>2</sup></sup><br>
        <b>zj Cost Formula:</b> 2e38 * 9<sup>zj<sup>2</sup></sup><br>
        <b>wj Cost Formula:</b> 1e93 * 12<sup>wj<sup>2</sup></sup><br>
        <b>xk Cost Formula:</b> 1e26 * 4<sup>xk<sup>2</sup></sup><br>
        <b>yk Cost Formula:</b> 1e51 * 7<sup>yk<sup>2</sup></sup><br>
        <b>zk Cost Formula:</b> 3e126 * 11<sup>zk<sup>2</sup></sup><br>
        <b>wk Cost Formula:</b> 1e188 * 15<sup>wk<sup>2</sup></sup>`, // hypercomplex flune
      ]
    } else {
      descs = [
        null,
        `Welcome to the Lost Integration! (otherwise known as World 2!)<br><br>
        This is an entirely different version of the game. Most mechanics are overhauled or entirely replaced. This world's mechanics are<br>
        inspired by the plans for "Algebraic Progression Classic", the first iteration of the game made in 2020, and also scrapped ideas<br>
        for mechanics that never made it into the current version of the game.<br><br>
        Each section afterward covers every important mechanic in the game that may require explaining. There are a few things that you<br>
        should know before you continue your journey:<br><br>
        <b>1)</b> Some aspects of this world may have been rushed during development. If you find any bugs, report them to the developer!<br>
        <b>2)</b> There are several visual changes of this world compared to the first. Can you find them all?<br>
        <b>3)</b> If you ever feel stuck, keep waiting and grinding, or ask for help on the Discord server. (linked in the Options tab)<br>
        <b>4)</b> Once unlocked, most autobuyers can be found in a single tab instead of being scattered across all of the tabs.<br>
        <b>5)</b> There may still be things that need to be polished. Don't be scared if you encounter issues!<br><br>
        Anyway, good luck and enjoy the ride!`, // world 2 preface
        `<b>1:</b> Buy Autoclicker
        ${player.buyables[1].gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>2:</b> Buy Point Factory` : ``}
        ${player.buyables[2].gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>3:</b> Buy Point Portal` : ``}
        ${hasCU(0,1) || player.integrations.gte(1) ? `<br><b>4:</b> Buy Point Quasar` : ``}
        ${hasUpgrade(4) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>G:</b> Buy Generator Multiplier` : ``}
        ${player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>X:</b> Buy X variable` : ``}
        ${player.y.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>Y:</b> Buy Y variable` : ``}
        ${player.zUnlocked ? `<br><b>Z:</b> Buy Z variable` : ``}
        ${player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>R:</b> Reset` : ``}
        ${player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>M:</b> Buy Max` : ``}
        ${hasQU(15) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>S:</b> Enter Square Root` : ``}
        ${player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>C:</b> Go Complex` : ``}
        ${player.zUnlocked ? `<br><b>U:</b> Go Y-Quadratic` : ``}
        ${player.integrations.gte(1) ? `<br><b>F:</b> Enter the Mandelbrot` : ``}
        ${player.quaternions[1].gte(180) ? `<br><b>I:</b> Buy Riemann sphere` : ``}
        <br><b>Shift+S:</b> Save Game
        <br><b>Shift+E:</b> Export Save`, // hotkeys
        `Generators are the production units for Point generation. There are ${hasCU(0,1) || player.integrations.gte(1) ? `four` : `three`} Generators, each one costing and producing more<br>
        than the previous. By default, Generator costs scale by 1.1x per purchase.
        ${hasUpgrade(6) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><br>After buying X Upgrade 6, Generators now produce the previous Generator based on their bought amount.<br>For example, if you have 100 Point Portals, you would produce 100 Point Factories per second. This production can be<br>sped up with various upgrades.` : ``}`, // generators
        `Variables are another currency alongside Points that also increase your Number. There are ${player.zUnlocked ? `three` : `two`} Variables in the game.<br><br>
        <b>X:</b> x is bought with Points. Its starting cost is 100,000 Points, and its cost is multiplied by 1.1 per purchase.<br>
        X can be used to purchase X Upgrades, which can be found in the Upgrades tab. These are very helpful for progressing.<br>
        While there are 4 X Upgrades visible at first, four more are unlocked much later.
        ${player.y.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><br><b>Y:</b> y is bought with x. Its starting cost is 100x, and its cost is multiplied by 1.15 per purchase, rounded down.<br>
        While y may not seem very helpful at first (since it has no upgrades), it plays a major role for<br>
        affecting your X amount in the future.
        ${player.zUnlocked ? `<br><br><b>Z:</b> z is bought with y. Its starting cost is 70,000y, and its cost is multiplied by 1.2 per purchase, rounded down.` : ``}
        ${player.y.gte(100) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><br>The ${player.zUnlocked ? `fourth` : `third`} variable does not exist.` : ``}` : ``}`, // variables
        `Upgrades are very important in Algebraic Progression, and are present throughout the entire game in many different forms.<br>
        This section is updated as you unlock new Upgrade types.${player.integrations.gte(1) ? `<br>` : ` `}${player.totali.gte(1) || player.integrations.gte(1) ? `The exception${player.integrations.gte(1) ? `s are` : ` is`} Complex Upgrades${player.integrations.gte(1) ? ` and Fractal Arm Upgrades` : ``}, which have their own section${player.integrations.gte(1) ? `s` : ``}.` : ``}<br>
        Upgrade types are in subtabs with an identical or similar name, with ${player.totali.gte(1) ? `` : `the`} exception${player.totali.gte(1) ? "s" : ""} being X Upgrades (found in the Upgrades tab)
        ${player.totali.gte(1) || player.integrations.gte(1) ? "<br>and Basic Complex Upgrades (found in the Complex Upgrades tab)" : ""}.<br><br>
        <b>X Upgrades:</b> X Upgrades are upgrades that can be bought with x. There are eight in total. ${player.totalx2.gte(1) || player.totali.gte(1) ? `They also reset on Reset.` : ``}
        ${player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>Reset Table Upgrades:</b> Reset Table Upgrades are upgrades that can be bought with RP.<br>Some have requirements to be met before they can be bought.<br>They are kept on Reset, and there are 25 in total. ${player.totali.gte(1) || player.integrations.gte(1) ? `However, they reset on Complex.` : ``}` : ``}
        ${player.totali.gte(1) || player.integrations.gte(1) ? `<br><b>Basic Complex Upgrades:</b> Basic Complex Upgrades are upgrades that can be bought with i.<br>They are kept on Reset and Complex, and there are 9 in total.` : ``}
        ${player.totaly2.gte(1) || player.integrations.gte(1) ? `<br><b>Y-Quadratic Upgrades:</b> Y-Quadratic Upgrades are upgrades that can be bought with y<sup>2</sup>.<br>They are kept on Reset, Complex, and Y-Quadratic, and there are 16 in total.<br>Upon purchasing the last Y-Quadratic Upgrade, Y Challenges are unlocked.` : ``}`, // upgrades
        `Generator Multiplier multiplies Generator production, hence the name.<br>
        Generator Multiplier can be upgraded with x. By default, the cost starts at 50x and increases by 5x per purchase.<br>
        After 200x, the cost becomes ((cost)/200)<sup>1.25</sup> * 200.<br><br>
        <b>Multiplier Per Purchase:</b> By default, the generator multiplier per purchase is 1.3x. This base can be increased<br>
        later on.<br>
        <b>Softcap:</b> After a generator multiplier of 1e400,000x, the multiplier is softcapped.<br>
        This softcap can eventually be delayed to 1e800,000x.`, // generator multiplier
        `Once you obtain 1 y, you can Reset to gain Reset Points. This resets almost all previous content, so it is considered<br>
        as the first Prestige Layer. There is another prestige layer after this, but it will not be unlocked for a long time.<br><br>
        <b>Base RP Gain Formula:</b> (x/100) + y<br><br>
        RP can be spent on permanent upgrades that are kept on Reset, along with other uses.`, // resetting
        `In Coordinate ${player.zUnlocked ? `Realm` : `Plane`}, y, points, ${player.zUnlocked ? `RP, and z` : `and RP`} can be sacrificed to gain additional bonuses.<br>
        Sacrificing y will be a permanent loss of y for that run, so only sacrifice y if you're not pushing for RP for that run.<br><br>
        Sacrificed y allows you to generate x. Generated x does not increase the cost of purchasing x. Since x is a part of the<br>
        RP gain formula, Coordinate ${player.zUnlocked ? `Realm` : `Plane`} (more specifically, X generation) is an influential component<br>
        of boosting RP gain.<br><br>
        Sacrificing points and RP give more general bonuses.${player.zUnlocked ? ` Sacrificed z, however, helps you generate y.` : ``}`, // coordinate plane
        `Square Root is a modified Reset run that can be exited to gain Root Essence (commonly abbreviated as RE).<br>
        While in Square Root, your points are raised ^0.5 (hence the name "Square Root"). You gain RE based on how far you get.<br>
        However, Root Essence is not farmable. Your Root Essence gained in a Square Root run is based on your X and Y, minus your<br>
        current Root Essence, so you have to get farther to gain more.<br><br>
        <b>Base RE Gain Formula:</b> ((x/100) + y) - current RE<br><br>
        Root Essence produces square roots, which are used to purchase 3 repeatable Square Root Upgrades. Additionally,<br>
        square roots provide milestones that boost Generator production and X generation.<br><br>
        <b>Square Root Upgrade Starting Costs:</b> 1,000, 10,000, 100,000<br>
        <b>Square Root Upgrade Cost Scalings:</b> 6x, 4x, 10x<br>
        <b>Note:</b> Past 20 purchases, Square Root Upgrade 3 starts scaling quadratically.`, // square root
        `Root Epicenter is a set of tasks (Root Epicenter Tasks, or RETs) that are effective in Square Root.<br>
        Each RET has its own set of nerfs, and you must reach the RET's point goal to complete it. When a Root Epicenter Task<br>
        is completed, you gain its reward.<br><br>
        Some RET completions have progression walls between them, so only try completing a Root Epicenter Task when you<br>
        are completely stuck. If you still can't complete it, try waiting or grinding more.<br><br>
        <b>Note:</b> If you complete the final Root Epicenter Task, you'll be eligible to unlock Complex.`, // root epicenter
        `Exponential Curve is a mechanic unique to the Lost Integration. For every challenge tier you complete,<br>
        you'll gain 10 geometric sequences (GS) that can be spent on respeccable buyables. Based on e and n,<br>
        the number generated will provide a multiplier to a variety of currencies based on the number of effects<br>
        you've unlocked.<br><br>
        <b>Exponential Curve Buyable 3 Cost Formula:</b> 10 + (purchases * (20 + (max(purchases - 2,0) * 5)))<br>
        <b>Power Conversions for Each Effect:</b> 2, 15, 0.25, 0.75, 3, 0.025, 0.3, 0.1, 0.15`, // exponential curve
        `Once you obtain 1e175 RP, 1e42 square roots, and rtu55 purchased, you can go Complex for i.<br>
        Complex, similarly to Resetting, resets almost everything before it. You keep your Achievements<br>
        and some things underneath the General header in the Statistics tab. i will be your most important currency from this<br>
        point forward.<br><br>
        <b>Base i Gain Formula:</b> (RP/1e175)<sup>0.025</sup> * (SR/1e42)<sup>0.004</sup><br>
        After 1e200 i, base i gain past 1e200 has a square root applied. This does not affect multipliers to i gain.<br><br>
        i has many more uses than RE, but two important uses for it is for purchasing Basic Complex Upgrades and Upgrade Points.<br>
        The second Complex (the run after you go Complex) will feel quite slow, but Milestones and Complex Upgrades will<br>
        speed up things quickly.`, // complex
        `To make Complexes faster and more convenient, you gain Complex Milestones based on the amount of times you have<br>
        gone Complex. Complex Milestones usually give quality of life features, such as Autobuyers, and being able to keep<br>
        mechanics and resources on reset.`, // complex milestones
        `<b>Note:</b> This section does not talk about Basic Complex Upgrades. Read the "Upgrades" section for more information.<br><br>
        Complex Upgrades (CUs) are a table of 12 upgrades that require Upgrade Points (UP) to be purchased. Upgrade Points can be<br>
        bought with Points, RP, and i. The first row focuses on Points-level content, the second row focuses on Reset-level content,<br>
        and the third row focuses on Complex-level content.<br><br>
        <b>1st UP Purchase Button Cost Formula:</b> 1e2000<sup>(1.25<sup>purchases</sup>)</sup><br>
        <b>2nd UP Purchase Button Cost Formula:</b> 1e175<sup>(1.15<sup>purchases</sup>)</sup><br>
        <b>3rd UP Purchase Button Cost Formula:</b><br>
        Starting Cost: 1<br>
        Cost After 1st Purchase: ceil(2<sup>(1.4<sup>max(purchases-1,0)</sup>)</sup>)<br><br>
        <b>Respec:</b> Since different Complex Upgrades boost different aspects of the game, you may want to reset them every once<br>
        in a while. This is why there is a "Respec" feature. Clicking the Respec button will reset your Complex with no reward, but<br>
        you will get your UP back, and your Complex Upgrades will be reset. The "Respec on Complex" button, when toggled on, does<br>
        exactly what it says.<br><br>
        <b>Export/Load Upgrades:</b> Exporting your Complex Upgrades allows you to load your Complex Upgrade build at any time. Note<br>
        that loading CUs will do an automatic respec.<br><br>
        <b>Presets:</b> When you are frequently switching between builds, it can be annoying to buy all of the upgrades again. This is<br>
        why presets exist. Clicking the "Show Presets" button allows you to use CU presets. Clicking on a preset button will select it.<br>
        Clicking "Save" will overwrite the preset data to your Complex Upgrade build, and clicking "Load" will load the preset data,<br>
        which will do an automatic respec. You can also rename presets using the "Rename" button.`, // complex upgrades
        `In Complex Plane, you can use i to purchase steps. Steps can be used to travel in both the real and imaginary directions.<br>
        Depending on how the direction you travel on each axis, you'll get multipliers to various resources.<br><br>
        <b>i Gain Effect Formula:</b> 3<sup>positive real part</sup><br>
        <b>RP Gain Effect Formula:</b> 1e15<sup>negative real part</sup><br>
        <b>Generator Boost Effect Formula:</b> 1.79e308<sup>positive imaginary part</sup><br>
        <b>Square Roots Gain Effect Formula:</b> 100<sup>negative imaginary part</sup><br>
        <b>Step Cost Formula:</b> 5e10 * 100<sup>steps</sup> * 4<sup>steps<sup>2</sup></sup>`, // complex plane
        `Complex Challenges (CCs) have the following attributes:<br>
        <b>1)</b> Complex Challenges require RP to complete, and take place within a Complex.<br>
        <b>2)</b> A Complex Challenge must be unlocked with UP and a secondary requirement before you can enter it.<br>
        <b>3)</b> Each Complex Challenge can be completed up to 3 times. The reward and goal increase for each completion.<br>
        Each unique Complex Challenge completion is called a Complex Challenge tier, usually shortened to "CC tier".<br><br>
        You can only have one Complex Challenge unlocked at a time.<br><br>
        Based on Complex challenge completions, you will gain geometric sequences and unlock new milestones.<br>
        There are a total of 24 completable CC tiers.`, // complex challenges
        `Once you obtain 70,000y and 1 z, you can go Y-Quadratic for y<sup>2</sup>.<br>
        Y-Quadratic resets everything that Complex resets.<br><br>
        <b>Base y<sup>2</sup> Gain Formula:</b> y/70,000 + z<br><br>
        y<sup>2</sup> can be spent on Y-Quadratic Upgrades.`, // y-quadratic
        `After buying the 8th Y-Quadratic Upgrade, the Z Lab will be unlocked.<br>
        Your current z amount can be sacrificed for Z-Power. Z-Power decays over time.<br>
        You can produce one Particle type of your choice with Z-Power that can be changed at any time.<br>
        Particles are produced based on (Z-Power * 25)<sup>0.5</sup>.<br><br>
        <b>Z Empowerment Cost Formula:</b> 1e110 * 100,000<sup>purchases<sup>2</sup></sup><br><br>
        <b>1st W Particle Effect Formula:</b> particles<sup>1.25</sup> + 1<br>
        <b>2nd W Particle Effect Formula:</b> particles<sup>0.1</sup> + 1<br>
        <b>1st Y Particle Effect Formula:</b> particles<sup>0.15</sup> + 1<br>
        <b>2nd Y Particle Effect Formula:</b> particles<sup>0.1</sup> + 1<br>
        <b>1st Z Particle Effect Formula:</b> (ln(log<sub>10</sub>(particles + 1) + 1)<sup>1.25</sup> / 10) + 1<br>
        <b>2nd Z Particle Effect Formula:</b> particles<sup>0.1</sup> + 1`, // z lab
        `Y Challenges (YCs) take place in Y-Quadratics, and require points to complete.<br>
        Y Challenges can only be completed once. However, if you complete a Y Challenge in RET -1,<br>
        the Y Challenge's effect becomes stronger.`, // y-challenges
        `When you complete all 8 Complex Challenges fully (equating to 24 CC tiers), you unlock X Powers.<br>
        Your X Powers multiplied together form an X Power Product, which gives an exponent to point gain.<br>
        x<sup>2</sup> is produced based on x, and x<sup>3</sup> is produced based on x<sup>2</sup>, and so on.<br>
        The last X Powers tier is x<sup>9</sup>.<br><br>
        Additionally, each X Powers tier can be used to purchase 3 different buyables. All X Powers buyables<br>
        scale quadratically, and a lot of the buyables share similar cost formulas. The first 2 X Powers buyables<br>
        for each X Powers tier boost the gain for that tier, and the final X Powers buyable for each X Powers tier<br>
        provides a unique effect.<br><br>
        <b>Base x<sup>2</sup> Gain Formula:</b> x<sup>1/5000</sup><br>
        <b>Base x<sup>n</sup> Gain Formula (iff n > 2):</b> x<sup>n-1</sup> ^ 0.3<br><br>
        <b>Mandelbrot Engine:</b> Once you reach 1e10 x<sup>6</sup>, you'll unlock Mandelbrot Engine. Mandelbrot<br>
        Engine provides a multiplier to all X Powers. Once you reach 100% Mandelbrot Engine power, you'll unlock the<br>
        next prestige layer.<br><br>
        <b>Mandelbrot Engine Effect Formula:</b> (X Power Product)<sup>0.02</sup>, caps at 1e370 X Power Product`, // x powers
        `Once you obtain 1e4400 i, 1e112 y<sup>2</sup>, and 100% Mandelbrot Engine power, you can enter the Mandelbrot for<br>
        Mandelbrot Essence (ME).<br>
        Mandelbrot, similarly to previous layers, resets almost everything before it. You still keep some things underneath the<br>
        General header in the Statistics tab. ME will become your most important currency from this point forward.<br><br>
        <b>Base ME Gain Formula:</b> (i/1e4400)<sup>0.0005</sup> * (y<sup>2</sup>/1e112)<sup>0.01</sup><br>
        After 1e100 ME, base ME gain past 1e100 has a square root applied. This does not affect multipliers to ME gain.<br>
        ME is used for purchasing Meta-Generators and fractal spirals.`, // mandelbrot
        `To make Mandelbrots faster and more convenient, you gain Fractal Milestones based on the least amount of times you have<br>
        gone Complex in a Mandelbrot run. Fractal Milestones usually give quality of life features, similarly to Complex Milestones.<br><br>
        <b>Tip:</b> To minimize on Complex usage during a Mandelbrot run, when you need to reset stuff, go Y-Quadratic instead.<br>
        Also, use "Respec" instead of "Respec on Complex" for Complex Upgrades, because a force respec doesn't<br>
        add to your Complex count.`, // fractal milestones
        `Meta-Generators are the second tier of Generators. Meta-Clicker produce meta-points, and each Meta-Generator<br>
        after produces the previous Meta-Generator, with a 1.1x multiplier to the total production of a Meta-Generator type<br>
        for each purchase. Meta-Generator costs start like Generator costs, but they scale by 1.5x per purchase.<br>
        Meta-points provide several bonuses. After having 10,000 of a Meta-Generator type, you cannot purchase<br>
        that type any further.<br><br>
        <b>Generator Boost Effect Formula:</b> MP<sup>10</sup> + 1<br>
        <b>Point Exponent Effect Formula:</b> (log<sub>10</sub>(log<sub>10</sub>(MP + 1) + 1) / 50) + 1<br>
        <b>RP Multiplier Effect Formula:</b> MP<sup>3</sup> + 1<br>
        <b>i Multiplier Effect Formula:</b> MP<sup>1.5</sup> + 1<br>
        <b>y<sup>2</sup> Multiplier Effect Formula:</b> MP<sup>0.75</sup> + 1<br>
        All meta-point effects except the first one are reduced past 1e9000 meta-points.`, // meta-generators
        `The Fractal Arm is a large upgrade tree. Upgrades on the Fractal Arm cost fractal spirals.<br>
        Fractal Arm Upgrades boost pretty much everything in World 2. Fractal spirals can be bought with y<sup>2</sup>,<br>
        Z-Power, and Mandelbrot Essence. Each cost increases by a set factor per purchase, except for the ME cost,<br>
        which scales quadratically.<br><br>
        Due to the Fractal Arm being an upgrade tree, you must buy prerequisites before continuing. The only upgrade<br>
        you can buy initially is the top upgrade, and then from there you can purchase any upgrade directly below it which<br>
        you can afford. However, there are two 3-way splits on the Fractal Arm that prevent upgrades from being bought<br>
        based on which path you go.<br><br>
        Additionally, you can respec Fractal Arm and use Fractal Arm presets, similar to Complex Upgrades.<br><br>
        <b>1st FS Purchase Button Cost Formula:</b> 1e112 * 1e32<sup>purchases</sup><br>
        <b>2nd FS Purchase Button Cost Formula:</b> 1e125 * 1e50<sup>purchases</sup><br>
        <b>3rd FS Purchase Button Cost Formula:</b> 2<sup>purchases + 1</sup> * 2<sup>purchases<sup>2</sup></sup><br><br>
        <b>Note:</b> If you purchase the final Fractal Arm Upgrade, you beat the game! I do understand that this ending<br>
        is anticlimactic. So, in an eventual future content update, I will rebalance Mandelbrot (due to some current balancing<br>
        issues) and create a more satisfying ending for World 2. Sorry for the inconvenience!`, // fractal arm
        `Upon reaching 180 total fractal spirals, the Minibrots subtab is unlocked. However, you need Fractal Arm Upgrade 81<br>
        to be bought for Minibrots to start generating. Minibrots are a self-producing resource that replicates by a static<br>
        multiplier each second. Once you reach the Minibrots cap, you cannot gain any more.<br><br>
        At the Minibrots cap, you can reset your Minibrots for a Riemann sphere as long as your Riemann sphere count is<br>
        below the max. Riemann spheres are reset on Mandelbrot.<br><br>
        ${FractalArm.hasUpgrade(131) || player.integration.derivatives[2].gt(1) ? `<b>Nanobrots:</b> Every time you gain a Riemann sphere, Nanobrots will multiply themselves. Nanobrots provide<br>a multiplier to Minibrot replication speed. Unlike Minibrots, Nanobrots do not reset on Mandelbrot. Also, Nanobrots only<br>generate while Fractal Arm Upgrade 131 is bought.` : ``}<br><br>
        <b>Minibrots Upgrade 1 Cost Formula:</b> 1e70 * 1e15<sup>purchases</sup><br>
        <b>Minibrots Upgrade 2 Cost Formula:</b> 1e90 * 1e20<sup>purchases</sup>, caps at 80 purchases<br>
        <b>Minibrots Upgrade 3 Cost Formula:</b> 1e100 * 1e10<sup>purchases</sup>, caps at 15 purchases`, // minibrots
        `Mandelbrot Challenges are unlocked on the Fractal Arm, and can only be entered when their respective upgrade is bought.<br>
        Mandelbrot Challenges don't have completions. Instead, you try to reach 100% Challenge Power within a Mandelbrot Challenge<br>
        as fast as possible. Your best time strengthens the reward. Challenge Power is generated based on the exponent of your<br>
        point amount. There are a total of 5 Mandelbrot Challenges.<br><br>
        If you spend more time in a Mandelbrot Challenge than your best time, you'll be kicked out automatically.`, // mandelbrot challenges
        `If you enter the Mandelbrot with 0 Complexes, you unlock Y Powers.<br>
        Your Y Powers multiplied together form a Y Power Product, which gives an exponent to gain of all X Powers.<br>
        y<sup>3</sup> is produced based on y<sup>2</sup>, and y<sup>4</sup> is produced based on y<sup>3</sup>, and so on.<br>
        The last Y Powers tier is y<sup>10</sup>.<br><br>
        Additionally, each Y Powers tier can be used to purchase 2 different buyables. All Y Powers buyables<br>
        scale quadratically, and a lot of the buyables share similar cost formulas. The first Y Powers buyable<br>
        for each Y Powers tier boost the gain for that tier, and the second Y Powers buyable for each Y Powers tier<br>
        provides a unique effect.<br><br>
        <b>Base y<sup>3</sup> Gain Formula:</b> y<sup>2</sup> ^ 1/5000<br>
        <b>Base y<sup>n</sup> Gain Formula (iff n > 3):</b> y<sup>n-1</sup> ^ 0.3` // y powers
      ]
    }
    return descs[x];
}