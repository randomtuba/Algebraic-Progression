function tbookConditions(x) {
  let conditions = [null,true,true,true,player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1),player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1),hasUpgrade(4) || player.totalx2.gte(1) || player.totali.gte(1),player.totalx2.gte(1) || player.totali.gte(1),hasQU(12) || player.totali.gte(1),hasQU(16) || player.totali.gte(1),hasSU(12) || player.totali.gte(1),hasQU(20) || player.totali.gte(1),hasSU(16) || player.totali.gte(1),player.totali.gte(1),player.totali.gte(1),player.totali.gte(1),player.complexes.gte(20),hasCU(1,6),player.zUnlocked,hasYQU(8,'bought'),player.varSynth.unlocked[0],player.yChalsUnlocked[1]]
  return conditions[x];
}

function tbookDescriptions(x) {
  let descs = [
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
      <b>5)</b> This game is not finished yet. There may still be things that need to be polished.<br><br>
      Anyway, good luck and enjoy the ride!`, // preface
      `<b>Autobuyer:</b> A togglable device that automates a specific feature<br>
      <b>Buyable:</b> A repeatable upgrade<br>
      <b>Cost Scaling:</b> The multiplier that is applied to a cost when the item correlated to it is purchased<br>
      <b>Inflation:</b> Uncontrollable and unbalanced progress<br>
      <b>Mechanic:</b> An independent, unlockable feature<br>
      <b>News Message:</b> The scrolling text in the News Ticker<br>
      <b>News Ticker:</b> The rectangle at the top of the screen with scrolling text<br>
      <b>Power:</b> Another word for "exponent" and/or "exponentiate"<br>
      <b>Resource:</b> Another word for "currency"<br>
      <b>Softcap:</b> A debuff applied to a resource at a certain point, usually takes the form of an exponent less than 1<br>
      <b>Subtab:</b> The small buttons within a tab that allow you to travel to other pages<br>
      <b>Tab:</b> The large buttons at the top of the screen`, //terminology
      `Buildings are the primary production units for Point generation. There are three buildings, each one costing and producing more<br>
      than the previous. By default, Building costs scale by 1.15x per purchase.
      ${hasUpgrade(6) || player.totalx2.gte(1) || player.totali.gte(1) ? `<br><br>After buying X Upgrade 6, Buildings now produce the previous Building based on their bought amount.<br>For example, if you have 100 Point Portals, you would produce 100 Point Factories per second. This production can be<br>sped up with a resource unlocked later.` : ``}`, // buildings
      `Variables are another currency alongside Points that also increase your Number. There are two Variables in the game.<br><br>
      <b>X:</b> x is bought with Points. Its starting cost is 100,000 Points, and its cost is multiplied by 1.11 per purchase.<br>
      X can be used to purchase X Upgrades, which can be found in the Upgrades tab. These are very helpful for progressing.<br>
      While there are 4 X Upgrades visible at first, four more are unlocked much later.
      ${player.y.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) ? `<br><br><b>Y:</b> y is bought with x. Its starting cost is 100x, and its cost is multiplied by 1.25 per purchase, rounded down.<br>
      While y may not seem very helpful at first (since it has no upgrades), it plays a major role for x<sup>2</sup> gain and for upgrade<br>
      effects in the future.
      ${player.zUnlocked ? `<br><br><b>Z:</b> z is bought with y. Its starting cost is 2,222y, and its cost scales cubically.<br>
      <b>Z Cost Formula:</b> 2,222+((111+((z-1)*10))*z)` : ``}
      ${player.y.gte(100) || player.totali.gte(1) ? `<br><br>The ${player.zUnlocked ? `fourth` : `third`} variable does not exist.` : ``}` : ``}`, // variables
      `Upgrades are very important in Algebraic Progression, and are present throughout the entire game in many different forms.<br>
      This section is updated as you unlock new Upgrade types. ${player.totali.gte(1) ? `The exception is Complex Upgrades, which have their own section.` : ``}<br><br>
      <b>X Upgrades:</b> X Upgrades are upgrades that can be bought with x. There are eight in total. ${player.totalx2.gte(1) || player.totali.gte(1) ? `They also reset on Quadratic.` : ``}
      ${player.totalx2.gte(1) || player.totali.gte(1) ? `<br><b>Quadratic Upgrades:</b> Quadratic Upgrades are upgrades that can be bought with x<sup>2</sup>.<br>They are kept on Quadratic, and there are 20 in total. ${player.totali.gte(1) ? `However, they reset on Complex.` : ``}` : ``}
      ${hasQU(16) || player.totali.gte(1) ? `<br><b>Square Root Upgrades:</b> Square Root Upgrades are upgrades that can be bought with Root Essence.<br>They are kept on Quadratic, and there are 16 in total. ${player.totali.gte(1) ? `However, they reset on Complex, just like Quadratic Upgrades.` : ``}` : ``}
      ${player.totali.gte(1) ? `<br><b>Basic Complex Upgrades:</b> Basic Complex Upgrades are upgrades that can be bought with i.<br>They are kept on Quadratic and Complex, and there are 9 in total.` : ``}
    ${player.totaly2.gte(1) ? `<br><b>Y-Quadratic Upgrades:</b> Y-Quadratic Upgrades are upgrades that can be bought with y<sup>2</sup>.<br>They are kept on Quadratic, Complex, and Y-Quadratic, and there are 12 in total.<br>Each Y-Quadratic Upgrade has a unique requirement for you to fulfill before you can buy them.` : ``}
      ${player.totalx2.gte(1) || player.totali.gte(1) ? `<br><b>Resource Multipliers:</b> Resource multipliers are usually put along with certain upgrade types, but are endlessly repeatable.<br>They multiply a currency by a static amount per purchase. There are two resource doublers and one resource tripler.` : ``}`, // upgrades
      `Functions are the secondary production units for Point generation. There are three functions: f(x), g(x), and h(x). Together,<br>
      they multiply the production of Buildings. f(x) gives a linear and later polynomial bonus, while g(x) and h(x) both give an<br>
      exponential bonus.<br><br>
      <b>Cost Scaling:</b> 2x, 5x, and 7x respectively<br>
      <b>Bases:</b> By default, the g(x) and h(x) bases are 1.3x and 1.6x, respectively. These bases can be increased and even multiplied<br>
      later on.<br>
      <b>Softcaps:</b> At 15 purchases of g(x) and/or h(x), the formulas of g(x) and/or h(x) are modified to prevent inflation.<br>
      These softcaps can be delayed with upgrades and bonuses later on.
      ${BUYABLES[5].base().gte(1e7) && hasZlabMilestone(1,2) ? `<br>Additionally, the g(x) and h(x) bases are softcapped at 50,000,000 if you have Dilations active.` : ``}`, // functions
      `Once you obtain 1 y, you can go Quadratic to gain x<sup>2</sup>. Quadratic resets almost all previous content, so it is considered<br>
      as the first Prestige Layer. There is another prestige layer after this, but it will not be unlocked for a long time.<br><br>
      <b>Base x<sup>2</sup> Gain Formula:</b> 1.25<sup>(x/100)-1</sup> * 2<sup>y</sup><br><br>
      x<sup>2</sup> can be spent on permanent upgrades that are kept on Quadratic. Once 16 Quadratic Upgrades have been bought,<br>
      an "x<sup>2</sup> Doubler" is unlocked. Its starting cost is 1e9 x<sup>2</sup>, and its cost multiplies by 10 per purchase.<br>
      It doubles x<sup>2</sup> gain per purchase, hence the name. After 290 purchases, it will start scaling faster.`, // quadratic
      `In Coordinate ${player.zUnlocked ? `Realm` : `Plane`}, x${hasSU(6)?", x²,":""} ${player.zUnlocked ? `y, and z` : `and y`} can be sacrificed to gain additional bonuses. You can only increase your sacrificed x/y${player.zUnlocked ? `/z` : ``}<br>
      if your current x/y${player.zUnlocked ? `/z` : ``} amount is greater than the sacrificed amount. Don't let the word "sacrifice" deter you from using<br>
      this feature, as your autobuyers will purchase your variables back instantly.<br><br>
      As this mechanic is expanded many times throughout the game, consider checking back on this section every now and then.<br><br>
      <b>Base Sacrificed x Effect Formula:</b> log<sub>2</sub>(log<sub>3</sub>(sac. x+1)+1)<br>
      <b>Base Sacrificed y Effect Formula:</b> sac. y*0.02, softcaps when the effect ≥ 1.5
      ${hasSU(6) || player.totali.gte(1) ? `<br><b>Base Sacrificed x<sup>2</sup> Effect Formula:</b> √(max(sac. x<sup>2</sup>,0)/1e21), softcaps when the effect ≥ 1e150 and 1e1000<br><br>
      Sacrificed x<sup>2</sup> allows you to generate Slope, a new resource that boosts the polynomial growth of Building production.<br>
      <b>Slope Effect Formula:</b> slope<sup>1.5${hasUpgrade(8) || player.totali.gte(1) ?"+(b/20+1)<sup>1.2</sup>-1":""}</sup>, softcaps when effect ≥ 1e15, 1e1111, and 1e20000<br>
      This will eventually become a large multiplier to your Point gain.` : ``}
      ${player.zUnlocked ? `<br><b>Base Sacrificed z Effect Formula:</b> (sac. z / 5)^1.5 + 1, softcaps when effect ≥ 200` : ``}
      ${hasUpgrade(8) || player.totali.gte(1) ? `<br><br><b>Y-Intercept (b):</b> b is a three-effect purchaseable resource that can be bought with slope.<br>
      Due to the immense power of b, its last two effects are eventually hardcapped. These hardcaps can be delayed later on.<br>
      <b>Y-Intercept Cost Formula:</b> 1e23 * 10,000<sup>b</sup> * 10<sup>b<sup>2</sup></sup>` : ``}
      ${hasMilestone(14) ? `<br><br><b>Transformations:</b> Transformations are additional purchaseable resources that are also bought with slope.<br>
      Each Transformation boosts a specific sacrificed currency, but only one can be active at a time.<br>
      Unlike the previous extensions to Coordinate ${player.zUnlocked ? `Realm` : `Plane`}, Transformations are kept on Complex.` : ``}
      ${hasZlabMilestone(1,2) ? `<br><br><b>Dilations:</b> Eventually, you unlock Dilations, which boost the sacrificed Z effect.<br>
      Also, each Dilation adds 0.01 to a multiplier to all other Transformation effects, capping at 1.15x, even if Dilations aren't active.
      ${hasZlabMilestone(1,4) ? `<br><br><b>Extrusions:</b> Later, you also unlock Extrusions. Each Extrusion extends a Transformation type into the 3rd Dimension,<br>
      making them permanently active. Extrusions have very high slope costs, due to the fact that they are very powerful.<br>
      Once an Extrusion is bought, it cannot be undone.` : ``}` : ``}`, // coord plane
      `Square Root is a modified Quadratic that can be exited to gain Root Essence (commonly abbreviated as RE).<br>
      While in Square Root, your points are raised ^0.5 (hence the name "Square Root"). You gain RE based on how far you get.<br>
      However, Root Essence is not farmable. Your Root Essence gained in a Square Root run is based on your X and Y, minus your<br>
      current Root Essence, so you have to get farther to gain more.<br><br>
      <b>Base RE Gain Formula:</b> (1.1<sup>(x/100)-1</sup> * 1.25<sup>y</sup>) - current RE<br><br>
      Root Essence can be used to purchase Square Root Upgrades, along with a Root Essence doubler, which works like the x<sup>2</sup><br>
      Doubler. Its starting cost is 200, multiplying by 5 per purchase, and starts scaling faster at 100 purchases.`, // square root
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
      ${hasZlabMilestone(1,3) ? `<br><br><b>Imaginary Power (IP):</b> Imaginary Power, when unlocked, only generates if ax<sup>2</sup>+bx+c=0 outputs a nonreal solution.<br>
      IP generation uses the same base formula, but is generally not affected by external QP multipliers.<br>
      Imaginary Power can be spent on its own four buyables, although the first buyable can only be bought once, making it more of an upgrade.<br>
      <b>"Production Augmenter" Cost Formula:</b> 1e730 * 1e40<sup>purchases</sup> * 10<sup>purchases<sup>2</sup></sup><br>
      <b>"Chemical Accelerator" Cost Formula:</b> 1e800 * 1e80<sup>purchases</sup> * 100<sup>purchases<sup>2</sup></sup> (caps at 10 purchases)<br>
      <b>"Imaginary Duplicator" Cost Formula:</b> 1e760 * 1e60<sup>purchases</sup> * 50<sup>purchases<sup>2</sup></sup>` : ``}`, // quad formula
      `Root Epicenter is the final mechanic for the Quadratic prestige layer. You can now increase the difficulty of your<br>
      Square Root run. Level √1 is a regular Square Root run, with Level √2 being harder than Level √1, Level √3 being harder than Level √2,<br>
      and so on. Level √-1 is the hardest level, and reaching 1e12 points in it unlocks the second prestige layer.<br>
      Inside levels √2 and above, you gain Challenge Essence (CE) based on how far you get. Unlike RE, CE is gained based on Points.<br><br>
      <b>Base CE Gain Formula:</b> ((points/1e12)<sup>A</sup>) - current CE, softcaps at 1e8 and 1e2000 CE (both can be delayed later on)<br>
      "A" is a dynamic exponent that changes based on the Root Epicenter level. In Level √2, A = 0.002. In Level √3, A = 0.01.<br>
      Finally, in Level √4, A = 0.06. Level √-1 does not increase A.<br><br>
      While CE cannot be used to buy upgrades, it does multiply the gains of RE (CE<sup>2</sup>) and QP (CE<sup>1.2</sup>).<br>
      The RE boost softcaps when the effect ≥ 1e35 and 1e1500, and the QP boost softcaps when the effect ≥ 1e20 and 1e900.`, // root epicenter
      `Once you obtain 1e2950 x<sup>2</sup>, 1e660 RE, and a Root Epicenter Level √-1 completion, you can go Complex for i.<br>
      Complex, similarly to Quadratic, resets almost everything before it. You keep your Achievements, your Challenge records,<br>
      and some things underneath the General header in the Statistics tab. i will be your most important currency from this point forward.<br><br>
      <b>Base i Gain Formula:</b> (((x<sup>2</sup>/1e2950)<sup>0.002</sup>)/2 + ((RE/1e660)<sup>0.004</sup>)/2)<sup>0.4</sup><br><br>
      i has many more uses than x<sup>2</sup>, but two important uses for it is for purchasing Basic Complex Upgrades and Upgrade Points.<br>
      The second Complex (the run after you go Complex) will feel quite slow, but Milestones and Complex Upgrades will speed up things quickly.`, // complex
      `To make Complexes faster and more convenient, you gain Milestones based on the amount of times you have gone Complex.<br>
      Milestones usually give quality of life features, such as Autobuyers, and being able to keep mechanics and resources on reset.
      ${hasCU(1,6) ? `<br><br>After unlocking Complex Challenges, new Milestones become visible. These Milestones are based on the<br>
      amount of Complex Challenge tiers you have completed. These Milestones are for filling in the gaps of automation, such as<br>
      unlocking Banked Quadratics and passive RE and CE generation.` : ``}`, // milestones
      `<b>Note:</b> This section does not talk about Basic Complex Upgrades. Read the "Upgrades" section for more information.<br><br>
      Complex Upgrades (CUs) are a table of ${hasZlabMilestone(1,5) ? `16` : `12`} upgrades that require Upgrade Points (UP) to be purchased. Upgrade Points can be bought<br>
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
      ${hasZlabMilestone(1,5) ? `<br><br><b>Fourth-Row Complex Upgrades:</b> Fourth-row Complex Upgrades act very similar to the other Complex Upgrades, except<br>
      that they can be bought multiple times. Each fourth-row Complex Upgrade's cost starts at 5 UP, and doubles for every purchase.<br>
      Also, fourth-row Complex Upgrades ignore the themes of the columns in the other three rows. Other than this,<br>
      fourth-row Complex Upgrades can be respecced, exported, and loaded just like the other Complex Upgrades. You can even<br>
      respec fourth-row Complex Upgrades specifically, meaning that you keep the Complex Upgrades in the other rows, if desired.` : ``}`, // complex upgrades
      `In Complex Plane, you can use i to purchase xi, yi, ${player.varSynth.unlocked[3] ? `x<sup>2</sup>i, and zi` : `and x<sup>2</sup>i`} once they are unlocked. Each Complex Plane currency<br>
      produces their own Complex Plane power, which boost other aspects of the game. Each Complex Plane currency is unlocked with i<br>
      and the sacrificed currency corresponding to it. Complex Plane does not have any interaction with Coordinate ${player.zUnlocked ? `Realm` : `Plane`} other than this.<br><br>
      <b>xi Power Effect Formula:</b> floor(log<sub>10</sub>(power+1)<sup>0.9</sup>)<br>
      <b>yi Power Effect Formula:</b> log<sub>100</sub>(power+1)+1<br>
      <b>x<sup>2</sup>i Power Effect Formula:</b> log<sub>3</sub>(log<sub>10</sub>(power+1)+1)<br><br>
      <b>xi Cost Formula:</b> 100,000 * 1.5<sup>xi</sup><br>
      <b>yi Cost Formula:</b> 1e8 * 1.75<sup>yi</sup><br>
      <b>x<sup>2</sup>i Cost Formula:</b> 1e18 * 2<sup>x<sup>2</sup>i</sup>
      ${player.varSynth.unlocked[3] ? `<br><b>zi Cost Formula:</b> 1e2500 * 1e10<sup>zi</sup> * 10<sup>zi<sup>2</sup></sup>` : ``}
      ${player.compPlane[0][3].gt(0) ? `<br><br>Using all of the Complex Plane powers${player.varSynth.unlocked[3] ? ` (except zi power)` : ``}, you can buy from the i Tripler. Its starting cost is 10,000, and<br>
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
      y<sup>2</sup> can be spent on Y-Quadratic Upgrades, but later you will mostly use it for unlocking new mechanics in the Y-Quadratic tab.`, // y-quadratic
      `After buying the 8th Y-Quadratic Upgrade "Chemical Expansion", the Z Lab will be unlocked.<br>
      Your current z amount will generate Z-Power. By default, 0 z produces 1 Z-Power per second, with each z obtained allowing you to<br>
      produce 2x more Z-Power per second. So, 7 z would produce 128 (2<sup>7</sup>) Z-Power per second. This multiplier can be<br>
      increased with Z Empowerments, which are bought with i. Each one adds 0.25 to this multiplier. So, having 2 Z Empowerments<br>
      would increase the multiplier to 2.5x, making 7 z produce 2.5<sup>7</sup> Z-Power per second.<br><br>
      <b>Z Empowerment Cost Formula:</b> 1e110 * 100,000<sup>purchases<sup>2</sup></sup><br><br>
      <b>Z-Colliders:</b> There are four Z-Colliders, but you can only charge one of them at a time. Charging a Z-Collider<br>
      allows you to produce Z-Particles of its corresponding type. These Z-Particles can be used to level up each Z-Collider,<br>
      which allows you to gain milestones that give powerful bonuses and extend previous mechanics.<br><br>
      <b>Expansion Z-Collider Cost Formula:</b> 2,000 * 8<sup>level</sup> * 2<sup>max(level-15,0)<sup>2</sup></sup>, cost is set to 1e34 at level 19<br>
      <b>Propulsion Z-Collider Cost Formula:</b> 8,000 * 16<sup>level</sup> * 2<sup>max(level-15,0)<sup>2</sup></sup><br>
      <b>Inflation Z-Collider Cost Formula:</b> 40,000 * 32<sup>level</sup> * 2<sup>max(level-15,0)<sup>2</sup></sup><br>
      <b>Reduction Z-Collider Cost Formula:</b> 200,000 * 64<sup>level</sup> * 2<sup>max(level-15,0)<sup>2</sup></sup>`, // z lab
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
      At 8 xy, you cannot buy any more of them.
      ${player.varSynth.unlocked[1] ? `<br><br><b>x<sup>2</sup>y<sup>2</sup>:</b> x<sup>2</sup>y<sup>2</sup> can be gained from sacrificing your x<sup>2</sup> and y<sup>2</sup>. You'll get your<br>
      x<sup>2</sup> back instantly, but you'll have to grind a bit to get your y<sup>2</sup> back again. x<sup>2</sup>y<sup>2</sup> produce Circles,<br>
      which boost the gains of various different currencies, and you unlock new bonuses based on your Circles.<br><br>
      <b>x<sup>2</sup>y<sup>2</sup> Gain Formula:</b> max(((x<sup>2</sup>)<sup>0.000001</sup> * (y<sup>2</sup>)<sup>0.02</sup>)<sup>1.2</sup> - x<sup>2</sup>y<sup>2</sup>,0)` : ``}
      ${player.varSynth.unlocked[2] ? `<br><br><b>i Exponentiation:</b> Over time, your expression's exponent will increase from 0 to 4, resetting back to 0 when reaching 4.<br>
      Every time it does this, you gain 1 revolution. Additionally, based on the i exponent, you gain a bonus to Complex Plane powers.<br>
      These multipliers rise and fall as the exponent increases from 0 to 4, but there is a maximum possible multiplier for each<br>
      Complex Plane power, which is 1.00e10x by default.<br><br>
      Revolutions can be spent on two Revolution Buyables. These buyables boost the main i Exponentiation mechanic, and help you get more revolutions.<br><br>
      <b>Revolution Buyable 1 Cost Formula:</b> 10 * 4<sup>purchases</sup><br>
      <b>Revolution Buyable 2 Cost Formula:</b> 100 * 3<sup>purchases</sup>` : ``}
      ${player.varSynth.unlocked[3] ? `<br><br><b>zi:</b> zi is the fourth Complex Plane currency, and is not affected by multipliers to Complex Plane currencies.<br>
      zi power gives free Upgrade Points, and is the only source of extra UP in the game.` : ``}`, // variable synthesizer
      `Y-Challenges (YCs) are the third and final type of Challenges. Y-Challenges take place in Y-Quadratics, and require x to complete.<br>
      The first Y-Challenge is unlocked by default. Each Y-Challenge after must be unlocked with y<sup>2</sup>, and will be unlocked permanently.<br>
      Unlike the other two Challenge variants, Y-Challenges have no completion cap, and their goals scale linearly. As usual, the more completions you have,<br>
      the greater the reward gets.<br><br>
      <b>Note:</b> There will be 4 Y-Challenges, but only 2 are added in-game. v2.3 will add the remaining two.`, // y-challenges
    ]
    return descs[x];
}