function tbookConditions(x) {
  let conditions = [null,true,true,true,player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1),player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1),hasUpgrade(4) || player.totalx2.gte(1) || player.totali.gte(1),player.totalx2.gte(1) || player.totali.gte(1),hasQU(12) || player.totali.gte(1),hasQU(16) || player.totali.gte(1),hasSU(12) || player.totali.gte(1),hasQU(20) || player.totali.gte(1),hasSU(16) || player.totali.gte(1),player.totali.gte(1),player.totali.gte(1),player.totali.gte(1),player.complexes.gte(20),hasCU(1,6)]
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
      ${player.y.gte(100) ? `<br><br>The third variable does not exist.` : ``}` : ``}`, // variables
      `Upgrades are very important in Algebraic Progression, and are present throughout the entire game in many different forms.<br>
      This section is updated as you unlock new Upgrade types. ${player.totali.gte(1) ? `The exception is Complex Upgrades, which have their own section.` : ``}<br><br>
      <b>X Upgrades:</b> X Upgrades are upgrades that can be bought with x. There are eight in total. ${player.totalx2.gte(1) || player.totali.gte(1) ? `They also reset on Quadratic.` : ``}
      ${player.totalx2.gte(1) || player.totali.gte(1) ? `<br><b>Quadratic Upgrades:</b> Quadratic Upgrades are upgrades that can be bought with x<sup>2</sup>.<br>They are kept on Quadratic, and there are 20 in total. ${player.totali.gte(1) ? `However, they reset on Complex.` : ``}` : ``}
      ${hasQU(16) || player.totali.gte(1) ? `<br><b>Square Root Upgrades:</b> Square Root Upgrades are upgrades that can be bought with Root Essence.<br>They are kept on Quadratic, and there are 16 in total. ${player.totali.gte(1) ? `However, they reset on Complex, just like Quadratic Upgrades.` : ``}` : ``}
      ${player.totali.gte(1) ? `<br><b>Basic Complex Upgrades:</b> Basic Complex Upgrades are upgrades that can be bought with i.<br>They are kept on Quadratic and Complex, and there are 9 in total.` : ``}
      ${player.totalx2.gte(1) || player.totali.gte(1) ? `<br><b>Resource Multipliers:</b> Resource multipliers are usually put along with certain upgrade types, but are endlessly repeatable.<br>They multiply a currency by a static amount per purchase. There are two resource doublers and one resource tripler.` : ``}`, // upgrades
      `Functions are the secondary production units for Point generation. There are three functions: f(x), g(x), and h(x). Together,<br>
      they multiply the production of Buildings. f(x) gives a linear and later polynomial bonus, while g(x) and h(x) both give an<br>
      exponential bonus.<br><br>
      <b>Cost Scaling:</b> 2x, 5x, and 7x respectively<br>
      <b>Bases:</b> By default, the g(x) and h(x) bases are 1.3x and 1.6x, respectively. These bases can be increased and even multiplied<br>
      later on.<br>
      <b>Softcaps:</b> At 15 purchases of g(x) and/or h(x), the formulas of g(x) and/or h(x) are modified to prevent inflation. These softcaps<br>
      can be delayed with upgrades and bonuses later on.`, // functions
      `Once you obtain 1 y, you can go Quadratic to gain x<sup>2</sup>. Quadratic resets almost all previous content, so it is considered<br>
      as the first Prestige Layer. There is another prestige layer after this, but it will not be unlocked for a long time.<br><br>
      <b>Base x<sup>2</sup> Gain Formula:</b> 1.25<sup>(x/100)-1</sup> * 2<sup>y</sup><br><br>
      x<sup>2</sup> can be spent on permanent upgrades that are kept on Quadratic. Once 16 Quadratic Upgrades have been bought,<br>
      an "x<sup>2</sup> Doubler" is unlocked. Its starting cost is 1e9 x<sup>2</sup>, and its cost multiplies by 10 per purchase.<br>
      It doubles x<sup>2</sup> gain per purchase, hence the name. After 290 purchases, it will start scaling faster.`, // quadratic
      `In Coordinate Plane, X and Y can be sacrificed to gain additional bonuses. You can only increase your sacrificed X/Y<br>
      if your current X/Y amount is greater than the sacrificed amount. Don't let the word "sacrifice" deter you from using<br>
      this feature, as your autobuyers will purchase your X and Y back instantly.<br><br>
      As this mechanic is expanded many times throughout the game, consider checking back on this section every now and then.<br><br>
      <b>Base Sacrificed x Effect Formula:</b> log<sub>2</sub>(log<sub>3</sub>(sac. x+1)+1)<br>
      <b>Base Sacrificed y Effect Formula:</b> sac. y*0.02, softcaps when the effect ≥ 1.5
      ${hasSU(6) || player.totali.gte(1) ? `<br><b>Base Sacrificed x<sup>2</sup> Effect Formula:</b> √(max(sac. x<sup>2</sup>,0)/1e21), softcaps when the effect ≥ 1e150 and 1e1000<br><br>
      Sacrificed x<sup>2</sup> allows you to generate Slope, a new resource that boosts the polynomial growth of Building production.<br>
      This will eventually become one of the largest multipliers to your Point gain.` : ``}
      ${hasUpgrade(8) || player.totali.gte(1) ? `<br><br><b>Y-Intercept (b):</b> b is a three-effect purchaseable resource that can be bought with slope.<br>
      Due to the immense power of b, its last two effects are eventually hardcapped. These hardcaps can be delayed later on.<br>
      <b>Y-Intercept Cost Formula:</b> 1e23 * 10,000<sup>b</sup> * 10<sup>b<sup>2</sup></sup>` : ``}
      ${hasMilestone(14) ? `<br><br><b>Transformations:</b> Transformations are additional purchaseable resources that are also bought with slope.<br>
      Each Transformation boosts a specific sacrificed currency, but only one can be active at a time.<br>
      Unlike the previous extensions to Coordinate Plane, Transformations are kept on Complex.` : ``}`, // coord plane
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
      The values of a, b, and c can be set to a nonnegative integer below the cap. To generate QP, you need ax<sup>2</sup>+bx+c=0 to<br>
      output a real solution for x when solved, which means that there cannot be square roots of negative numbers.<br>
      <b>Hint:</b> 4ac must be ≤ b<sup>2</sup> to have a real solution for x.<br><br>
      QP can be used to purchase Quadratic Formula buyables. The first three boost other aspects of the game, while the fourth one<br>
      increases the cap of a, b, and c. The first buyable caps at 4 levels, since it is very powerful compared to the rest.<br>
      <b>"Variable Coupler" Cost Formula:</b> 1,000 * 300<sup>purchases</sup> * 2<sup>purchases<sup>2</sup></sup><br>
      <b>"Function Enhancer" Cost Formula:</b> 10,000 * 100<sup>purchases</sup> * 1.7<sup>purchases<sup>2</sup></sup><br>
      <b>"Challenge Amplifier" Cost Formula:</b> 100,000 * 40<sup>purchases</sup> * 1.5<sup>purchases<sup>2</sup></sup><br>
      <b>"Limit Expander" Cost Formula:</b> 1,000 * 10<sup>purchases</sup> * 1.2<sup>purchases<sup>2</sup></sup><br><br>
      <b>Note:</b> "b" in Quadratic Formula should not be confused with Y-Intercept.`, // quad formula
      `Root Epicenter is the final mechanic for the Quadratic prestige layer. You can now increase the difficulty of your<br>
      Square Root run. Level √1 is a regular Square Root run, with Level √2 being harder than Level √1, Level √3 being harder than Level √2,<br>
      and so on. Level √-1 is the hardest level, and reaching 1e12 points in it unlocks the second prestige layer.<br>
      Inside levels √2 and above, you gain Challenge Essence (CE) based on how far you get. Unlike RE, CE is gained based on Points.<br><br>
      <b>Base CE Gain Formula:</b> ((points/1e12)<sup>A</sup>) - current CE, softcaps at 1e8 and 1e2000 CE (both can be delayed later on)<br>
      "A" is a dynamic exponent that changes based on the Root Epicenter level. In Level √2, A = 0.002. In Level √3, A = 0.01.<br>
      Finally, in Level √4, A = 0.06. Level √-1 does not increase A.<br><br>
      While CE cannot be used to buy upgrades, it does multiply the gains of RE (CE<sup>2</sup>) and QP (CE<sup>1.2</sup>).<br>
      The RE boost softcaps when the effect ≥ 1e35 and 1e1500, and the QP boost softcaps when the effect ≥ 1e20 and 1e900.<br><br>
      <b>Bug:</b> Be careful when switching to another tab in Root Epicenter Level √-1, as this can cause the game to freeze.`, // root epicenter
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
      Complex Upgrades (CUs) are a table of 12 upgrades that require Upgrade Points (UP) to be purchased. Upgrade Points can be bought<br>
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
      which will do an automatic respec. You can also rename presets using the "Rename" button.`, // complex upgrades
      `In Complex Plane, you can use i to purchase xi, yi, and x<sup>2</sup>i once they are unlocked. Each Complex Plane currency<br>
      produces their own Complex Plane power, which boost other aspects of the game. Each Complex Plane currency is unlocked with i<br>
      and the sacrificed currency corresponding to it. Complex Plane does not have any interaction with Coordinate Plane other than this.<br><br>
      <b>xi Power Effect Formula:</b> floor(log<sub>10</sub>(power+1)<sup>0.9</sup>)<br>
      <b>yi Power Effect Formula:</b> log<sub>100</sub>(power+1)+1<br>
      <b>x<sup>2</sup>i Power Effect Formula:</b> log<sub>3</sub>(log<sub>10</sub>(power+1)+1)<br><br>
      <b>xi Cost Formula:</b> 100,000 * 1.5<sup>xi</sup><br>
      <b>yi Cost Formula:</b> 1e8 * 1.75<sup>yi</sup><br>
      <b>x<sup>2</sup>i Cost Formula:</b> 1e18 * 2<sup>x<sup>2</sup>i</sup>
      ${player.compPlane[0][3].gt(0) ? `<br><br>Using all of the Complex Plane powers, you can buy from the i Tripler. Its starting cost is 10,000, and<br>
      its cost multiplies by 50 per purchase.` : ``}`, // complex plane
      `Complex Challenges (CCs) are very similar to regular Challenges, but have a few key differences:<br>
      <b>1)</b> Complex Challenges require x<sup>2</sup> to complete, and take place within a Complex.<br>
      <b>2)</b> A Complex Challenge must be unlocked with UP before you can enter it.<br>
      <b>3)</b> Each Complex Challenge can be completed up to 5 times. The reward and goal increase for each completion.<br>
      Each unique Complex Challenge completion is called a Complex Challenge tier, usually shortened to "CC tier".<br><br>
      You can only have one Complex Challenge unlocked at a time.<br><br>
      By unlocking Complex Challenges, you have also unlocked new Milestones. Read the "Milestones" section for more information.`, // complex challenges
    ]
    return descs[x];
}