/*
Welcome to news.js! This is where all the unfunny jokes are kept. In here you will find:
- The news array that contains every news message in the game
- The function that updates the news ticker
- The adjustNewsSpeed() function for the "news speed" option
*/

var newsArray;

function updateNewsArray() {
  newsArray = [
  ["Welcome to Algebraic Progression, the game where math becomes fun",true,"a1"], //v1.0
  ["X marks the spot!",player.x.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a2"], //v1.0
  [`Therapist: \"${player.zUnlocked ? `${player.wUnlocked ? `V` : `W`}` : `Z`} isn't real, it can't hurt you\" ${player.zUnlocked ? `${player.wUnlocked ? `V` : `W`}` : `Z`}:`,player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a3"], //v1.0
  ["i am a news message, fear me",true,"a4"], //v1.0
  ["when the variable is sus! 😳",true,"a5"], //v1.0
  ["when tuba doesn't update his game :flushed:",true,"a6"], //v1.0
  ["Pi: \"Be real for once!\" i: \"No, let's be rational here.\"",true,"a7"], //v1.0
  ["\"If AP doesn't have triple exponential growth, I'm calling the police\" -a human(?), 2021",true,"a8"], //v1.0
  ["Press Alt+F4 to die simultaneously",true,"a9"], //v1.0
  ["Algebraic Progression NGUd^^^++++---- when?",true,"a10"], //v1.0
  ["Weeee, look at me go!",true,"a11"], //v1.0
  ["Don't you dare divide by zero.",true,"a12"], //v1.0
  ["Everyone talks about pi, but no one talks about tau...",true,"a13"], //v1.0
  ["@Pinglol",true,"a14"], //v1.0
  ["When your game inflates so hard your numbers reach the Small Dropping Ordinal 🤔",true,"a15"], //v1.0
  ["AP Desmos% Speedrun",true,"a16"], //v1.0
  ["But Y?",player.y.gte(1) || player.integrations.gte(1),"a17"], //v1.0
  [`${player.zUnlocked ? `${player.wUnlocked ? `V` : `W`}` : `Z`} might be real, but ${player.zUnlocked ? `${player.wUnlocked ? `U` : `V`}` : `W`} isn't`,player.y.gte(10) || player.totali.gte(1) || player.integrations.gte(1),"a18"], //v1.0
  ["Calculus do what AP don't",true,"a19"], //v1.0
  ["Unreal Engine should be renamed to Imaginary Engine",true,"a20"], //v1.0
  ["imagine not having spaghetti code",true,"a21"], //v1.0
  ["BREAKING NEWS: Point Portal malfunction caused 15 deaths and 3 injuries. Point Portal manager says \"we will be more careful next time\".",player.buyables[3].gte(1) || player.integrations.gte(1),"a22"], //v1.0
  ["BREAKING NEWS: Tuba has decided to remove Buy Max, saying that it \"causes inflation\"! Public in fury as riots break out in the CST timezone!",player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a23"], //v1.0
  ["BREAKING NEWS: Obamium discovered in local mine!",true,"a24"], //v1.0
  ["BREAKING NEWS: Famous celebrity Joe Schmirzstein says \"I can't stop dreaming about complex mathematical functions. I need help.\"",true,"a25"], //v1.0
  ["BREAKING NEWS: We ran out of ideas",true,"a26"], //v1.0
  ["BREAKING NEWS: Florida Man rents Point Portal, causes hole in space-time",player.buyables[3].gte(1) || player.integrations.gte(1),"a27"], //v1.0
  ["BREAKING NEWS: Algebraic Progression saves leaked across the nation by a professional hacker. Investigation is ongoing.",true,"a28"], //v1.0
  ["^ this",true,"a29"], //v1.1
  ["It's important that the news ticker can't be disabled. The news ticker will never disappear and you will get tired of it faster...wait, you can disable it now??",true,"a30"], //v1.1
  ["Part 2: Tuba screws up",true,"a31"], //v1.1
  ["The action of adding news messages is like using drugs. It's easy and makes you feel happy when you do it, but you can't do too much of it.",true,"a32"], //v1.1
  ["You know what this game needs more of? It needs more protein",true,"a33"], //v1.1
  [`Sing the Variable Alphabet with me: a, b, c, n, x, y${player.zUnlocked ? `, z` : ``}${player.wUnlocked ? `, w` : ``}...no it doesn't continue after that.`,player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a34"], //v1.1
  ["Hey all, Scott here! My thoughts are being broadcasted on a news ticker now! No reason, just felt like it.",true,"a35"], //v1.1
  ["0/10 quadratic layer needs more parabolas",player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a36"], //v1.1
  ["You can't kill News Ticker Man, look at me go!",true,"a37"], //v1.1
  ["Square Root is just Time Dilation but harder, deal with it",player.rootEssence.gt(0) || player.totali.gte(1) || player.integrations.gte(1),"a38"], //v1.2
  ["Is this a Synergism reference???????",true,"a39"], //v1.2
  ["Fun Fact: Offline progress exists! Most currencies will keep growing at the same rate as if you were online, even when the game is closed. However, take note that automation does not work while offline.",true,"a40"], //v1.2
  ["\"hmmm today I will dev AP\" -randomtuba, 5 seconds before disaster struck",true,"a41"], //v1.2
  ["Want another game to play while you're idling? Check out randomtuba's main website! Link: <a href='https://randomtuba.github.io/' target='_blank'>https://randomtuba.github.io/</a>",true,"a42"], //v1.2
  ["If you're wondering about new content, v3.1 could happen, but I'm still not sure about it. You may have to wait a while...",player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a43"], //v1.2
  ["\"shit game remove timewalls\" -reda",true,"a44"], //v1.2
  ["if i see one more 5 hours joke i will die in real life",true,"a45"], //v1.2
  ["BREAKING NEWS: Tuba finally fixed Buy Max",player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a46"], //v1.2
  ["Reject linear, embrace nonlinear",true,"a47"], //v1.3
  ["Dragon Ball X when?",player.x.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a48"], //v1.3
  [`Everyone talks about ${player.zUnlocked ? `${player.wUnlocked ? `V` : `W`}` : `Z`} not being real, but what about ${player.zUnlocked ? `${player.wUnlocked ? `U` : `V`}` : `W`}?`,player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a49"], //v1.3
  ["Fun Fact: Quadratic in AP Classic was literally called \"Reset\", and x<sup>2</sup> was called \"Reset Points\". How unoriginal.",player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a50"], //v1.3
  ["Tip: Hold down M to do Quadratics faster",player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a51"], //v1.3
  ["haha number go up", true, "a52"], //Incrementy Planet
  ["AP Rewritten REWRITTEN? What's next, AP Rewritten^3?",true,"a53"], //AP Rewritten^2
  ["99% can't go Quadratic!", player.totalx2.gte(1), "a54"], //Incrementy Planet
  [`top 10 reasons why ${player.zUnlocked ? `${player.wUnlocked ? `V` : `W`}` : `Z`} isnt real. 1) i forgor 💀`,player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a55"], //Incrementy Planet
  ["Kowalski, go Quadratic.",player.totalx2.gte(1), "a56"], //Incrementy Planet
  ["FIXING NEWS: Please don't break the news again.",true,"a57"], //AP Rewritten^2
  ["uhhhh what am I supposed to put here? some kind of meta-joke or something?",true,"a58"], //Incrementy Planet
  ["The 100th news message does not exist. Just kidding, it does now!", true, "a59"], //Incrementy Planet
  ["Everyone thinks the developer is randomtuba, but the real developer is the friends we made along the way.",true,"a60"], //Incrementy Planet
  ["how do you get news ticker messages? answer for 0x!!  1) quote people || 2) quote memes || 3) actually think of original news messages || 4) copy existing news messages, but to avoid plagiarism you change 4% of the words ||| if you answered 3) you are completely wrong, that was the only wrong answer",player.x.gte(1) || player.integrations.gte(1),"a61"], //Incrementy Planet
  ["The J is our lord and savior", true, "a62"], //Incrementy Planet
  ["Algebraic Progression? More like Console ERROR incremental", true, "a63"], //Incrementy Planet
  ["AAREX ADD BATTLE REPLICANTIS OR I WILL FLATTEN YOU'RE CAR TIRES", true, "a64"], //Incrementy Planet
  ["this ticker is d", true, "a65"], //Incrementy Planet
  ["never gonna give you up...", true, "a66"], //Incrementy Planet
  ["...never gonna let you down", true, "a67"], //Incrementy Planet
  ["Why are you playing this game? It's just a meaningless number going up with no implications on reality.",true,"a68"], //Incrementy Planet
  ["\"why are you @unpogged 77 centimeters tal?? 1047 pixels ( add this to incement plant news )\"  -DEMEMZEA",true,"a69"], //Incrementy Planet
  ["go solve today's wordle if you haven't already",true,"a70"], //Incrementy Planet
  ["In the land of X and Y, we are not judged. Here we have peace. Here we are free.",player.y.gte(2) || player.totali.gte(1) || player.integrations.gte(1),"a71"], //Incrementy Planet
  ["AP stands for Algebraic Progression, not Advanced Placement.",true,"a72"], //Incrementy Planet
  ["Point value plummets due to newfound abundance. \"Back in my day, 1 million was a lot!\" says crazy elderly person.",player.totalPoints.gte(1e11) || player.integrations.gte(1),"a73"], //Incrementy Planet
  ["Variables are an essential part of a nutritious and well-balanced breakfast",player.x.gte(1) || player.integrations.gte(1),"a74"], //Incrementy Planet
  ["If you've been looking around in the code, you may have noticed that all of the game's variables are stored in save.js. \"Why are they not stored in game.js?\", you may ask. Well, as a developer of this game, I actually have no clue why we have them stored in save.js. Maybe it's to prevent a bug? Who knows!",true,"a75"], //Incrementy Planet
  ["We regret to inform you that this news message has been (softcapped)",true,"a76"], //Incrementy Planet
  ["randomtuba and 3^3=7 (FactorXXX) walk into a bar. randomtuba looks at his watch. \"It's 8 o'clock,\" he says. 3^3=7 orders a drink, walks out of the bar, and heads to their house to go to bed.",true,"a77"], //Incrementy Planet
  ["\"Pronouns: Professional procrastinator\" -Tuba's About Me",true,"a78"], //AP Rewritten^2
  ["WARNING: Cring Breach Detected! You must return to the B.R.U.H. (Big Red Underground Hole) Bunker ammediately!",true,"a79"], //AP Rewritten^2
  ["Click the big cookie to get more cookies!",true,"a80"], //Tuba's Tree
  ["Cool Bug Fact's: You know what you did",true,"a81"], //Tuba's Tree
  ["Here's a fun challenge: Browse the code in game.js and take a shot every time you see an if statement",true,"a82"], //Tuba's Tree
  ["The news ticker is similar to Minecraft's splash text: It's there, it has no effect on the main game, and you ignore it after a while.",true,"a83"], //Tuba's Tree
  ["Come to think of it, these messages really aren't that funny.",true,"a84"], //Tuba's Tree
  ["Here's a guide to the 4 different types of balancing! Jacorbian Balancing: Solid gameplay in earlygame and midgame, but too much strategy in lategame. Aarex Balancing: Solid gameplay in earlygame, but too many AAREX TIMEWALLS in midgame and lategame. Tuba Balancing: Solid gameplay in earlygame and midgame, but inflation and repetition in lategame. Reinhardt Balancing: We don't talk about Reinhardt Balancing.",true,"a85"], //Tuba's Tree
  ["When life gives you lemons, you sacrifice them for the next lemon-related prestige layer.",true,"a86"], //Tuba's Tree
  ["too short 1/0",true,"a87"], //Prestige Game
  ["\"Discord is not a good thing.\" -Michael Stevens, also known as \"VSauce\"",true,"a88"], //Tuba's Tree
  ["Fun Fact: The function that calls the news ticker code is called doodooWater(). In November 2020, Tuba thought this was very funny.",true,"a89"], //Tuba's Tree
  ["Slowmode is enabled.",true,"a90"], //Tuba's Tree
  ["\"dunkin' deez nuts\" -unp©gged™",true,"a91"], //AP Rewritten^2
  ["I wonder if people actually read these",true,"a92"], //AP Rewritten^2
  ["<div onclick=\"this.style.fontWeight=900\">Click here to make the news ticker thicc</div>",true,"a93"], //AP Rewritten^2
  ["Some of these messages have nothing to do with the actual game.",true,"a94"], //AP Rewritten^2
  ["\"I will gwammit unspeakable gwimes\" -Ink. dude",true,"a95"], //AP Rewritten^2
  ["BREAKING NEWS: Don't check the console!", '(function() {if(location.href.length>40){console.error("I told you to not check it")};return true})()', "a96"], //AP Rewritten^2
  ["If you build autoclickers, point factories and/or portals in space, do they become space buildings?",player.buyables[3].gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a97"], //v1.4
  ["<i>You found a rare news message!</i>",Math.random() <= 0.01,"a98"], //v1.4
  ["\"the currency called tubas are useless\" -gapples2 (edited)",true,"a99"], //v1.4
  ["Thank you for contacting customer support. This is Janet, how can I help you?",true,"a100"], //v1.4
  ["\"ew compact\" -randomtuba",true,"a101"], //v1.4
  ["ReferenceError: dadComesBack() is not a function [ratio.js, line 420:69]",true,"a102"], //v1.4
  ["BREAKING NEWS: Mathematician proves that square root of 2 is irrational, philosophers from thousands of years ago outraged!",player.rootEssence.gt(0) || player.totali.gte(1) || player.integrations.gte(1),"a103"], //v1.4
  ["3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198...",true,"a104"], //v1.4
  ["Hi, I'm just another news message...I appear to have lost the <span style='color:red'>will to live</span>.",true,"a105"], //v1.4
  ["You've just been news tickered, send a screenshot of this news ticker to someone else to get un-news tickered",true,"a106"], //Prestige Game
  ["RIP to those under 13 that haven't taken algebra 1 yet",true,"a107"], //v1.4
  ["Have you realized that 90% of the news messages are just a bunch of words together that don't make sense, or are in the wrong order? If you have, wake up. No news messages are like that. It's been 8 years, the car accident was not your fault.",true,"a108"], //v1.4.1
  ["What's the second prestige layer, you ask? Well...it's complicated.",player.totali.gte(1) || player.integrations.gte(1),"a109"], //v2.0
  ["\"Where did my progress go?\" -Players after going Complex for the first time",player.totali.gte(1) || player.integrations.gte(1),"a110"], //v2.0
  [`${player.zUnlocked ? `Congratulations, you're in the ${player.sinusoidals.gte(1) ? `lategame` : `midgame`}!` : `You're currently in the earlygame, enjoy it while it lasts`}`,true,"a111"], //v2.0
  ["Why is the obtuse angle always sad? Because it is never right.",true,"a112"], //v2.0
  ["6 confronts 7 about eating 9",true,"a113"], //v2.0
  [`${player.totaly2.gte(1) ? (ccTiers() >= 50 ? (player.yPolynomials.unlocked ? 'z<sup>2</sup> when?' : 'y<sup>3</sup> when?') : 'x<sup>3</sup> when?') : 'y<sup>2</sup> when?'}`,player.totalx2.gte(1) || player.integrations.gte(1),"a114"], //v2.0
  ["Integers can sometimes be negative. Let's try to be more positive!",true,"a115"], //v2.0
  ["Who was the inventor of fractions? Henry the Eighth.",true,"a116"], //v2.0
  ["39 buried 0 found",true,"a117"], //v2.0
  ["Hey manager, someone just asked to buy 37 watermelons for a picnic...what should we do about this?",true,"a118"], //v2.0
  ["Always remember to show your work.",true,"a119"], //v2.0
  ["Fun Fact: There is a difference between the terms \"undefined\" and \"no solution\". Undefined means that the expression has not been assigned a meaning/interpretation. No solution means that there is no value of x to make the equation true.",true,"a120"], //v2.0
  ["Quadratic grinding is a fun and essential part of the game",player.quadratics.gte(1e6) || player.integrations.gte(1),"a121"], //v2.0
  ["I can't believe this game was so popular that math was invented",true,"a122"], //v2.0
  [`The fog is coming. ${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}. Expansion Rate: ${format(Decimal.pow(2,new Decimal(player.newsMessagesSeen).add(1).ln()).div(1000))} m/s.`,true,"a123"], //v2.0
  ["It takes 12 bees their entire life to make a single teaspoon of honey. How does that make you feel?",true,"a124"], //v2.0
  ["The devs, mods, and testers are all awesome, with the exception of whoever stole all the eggs.",true,"a125"], //v2.0
  ["guys who's joe??? plz i need to find out who joe is",true,"a126"], //v2.0
  ["<a href='https://www.youtube.com/watch?v=DLzxrzFCyOs' target='_blank'>Click me!</a> <--- do NOT click on that link!",true,"a127"], //v2.0
  ["That last news message was pretty funny.",true,"a128"], //v2.0
  ["<i style='color: #969696;'>[removed]</i>",true,"a129"], //v2.0
  ["While incremental games can be fun and even healthy in certain contexts, they can start or perpetuate video game addiction even more than other genres. If you feel like playing incremental games is taking priority over other things in your life, or manipulating your sleep schedule, it may be well advised to seek help.",true,"a130"], //The Modding Tree Forums
  ["this can't be real...",player.complexes.gte(1),"a131"], //v2.1
  [`Maybe the real ${player.zUnlocked ? `${player.wUnlocked ? `V` : `W`}` : `Z`} was in our hearts all along.`,player.y.gte(100) || player.totali.gte(1) || player.integrations.gte(1),"a132"], //v2.1
  ["BREAKING NEWS: After years of testing, we've finally found the value of x: 5. \"This is a monumental milestone for our goal,\" dedicated scientists say. \"Before you know it, we'll have all these pesky letters figured out and finally know the value of Number.\" More at 7 where we reveal the real value of i.",player.x.gte(1) || player.integrations.gte(1),"a133"], //v2.1
  ["Join our Discord server for a stable economy!",true,"a134"], //v2.1
  ["\"why do we exists\" -Saber",true,"a135"], //v2.1
  ["<span style='font-size:8px;'>Hopefully no one sees this...</span>",true,"a136"], //v2.1
  [`${format(player.points)} points? ${tmp.disses[Math.floor(Math.random() * tmp.disses.length)]}`,player.points.gte("1e1000"),"a137"], //v2.1
  ["BREAKING NEWS: Population complains about mathematical formula in an incremental game. \"I forgot how to solve a quadratic equation, it's not even useful, why is this in the game?\" local complainer admits.",hasQU(20) || player.totali.gte(1) || player.integrations.gte(1),"a138"], //v2.1
  ["Congratulations! You have all of the v2.3 achievements!",player.achievements.length >= 60,"a139"], //v2.1
  ["Have you realized that the Milestones are button elements yet?",player.complexes.gte(5) || player.integrations.gte(1),"a140"], //v2.1
  ["What happens when anti-slope comes in contact with antimatter? No one has survived to find out.",player.compChalCompletions[2] >= 1 || player.integrations.gte(1),"a141"], //v2.1
  ["Did you inflate the game or something?",player.i.gte("1e100000"),"a142"], //v2.1
  ["<span style='color:blue'>Why should news messages be black or white? That's so boring...blue looks so much nicer.</span>",true,"a143"], //v2.1
  ["SEVERE WEATHER WARNING: Major cubic storm crossing y-axis and travelling towards (2,8)-ville. Ends are approaching negative and positive infinity, respectively. Stay indoors and stay at low elevations. Thank you for your cooperation.",true,"a144"], //v2.1
  ["BREAKING NEWS: randomtuba doesn't know how his own automation code works!",hasQU(5) || hasQU(6) || player.totali.gte(1) || player.integrations.gte(1),"a145"], //v2.1
  ["<img src='True Cubert.png' width='16' height='16'>",true,"a146"], //v2.1
  ["BREAKING NEWS: Developer messing with <span style='color: white; animation: a-existence-glow 3s infinite'>new text animation!</span>",true,"a147"], //v2.1
  ["INSIDE LOOK: What are Upgrade Points made out of? Research and analysis has discovered that they contain, on average, 62% dreams, 33% water vapor, and 5% sulfuric acid.",player.upgradePoints[1].gte(1) || player.integrations.gte(1),"a148"], //v2.1
  ["Your Ad Here",true,"a149"], //v2.1
  ["BREAKING NEWS: Complex Challenges deemed too easy, 10 tiers have already been finished!",ccTiers() >= 10,"a150"], //v2.1
  [`BREAKING NEWS: Amateur mathematician suggests possible existence of a ${player.zUnlocked ? `${player.wUnlocked ? `fifth` : `fourth`}` : `third`} variable, gets trapped in Square Root as punishment.`,hasQU(16) || player.totali.gte(1) || player.integrations.gte(1),"a151"], //v2.2
  [`${player.zUnlocked ? `${player.wUnlocked ? `V` : `W`}` : `Z`} isn't real because there are only 25 letters in the alphabet. Perfect squares FTW!`,player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a152"], //v2.2
  [`${player.zUnlocked ? `${player.wUnlocked ? `V` : `W`}` : `Z`} isn't real because I said so.`,player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a153"], //v2.2
  [`${player.zUnlocked ? `${player.wUnlocked ? `V` : `W`}` : `Z`} isn't real because the scaling would be too fast.`,player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a154"], //v2.2
  [`${player.zUnlocked ? `${player.wUnlocked ? `V` : `W`}` : `Z`} isn't real because ${player.zUnlocked ? `${player.wUnlocked ? `V is just a single W` : `we can't comprehend the 4th dimension`}` : `this is a 2D game, not a 3D game`}.`,player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a155"], //v2.2
  [`${player.zUnlocked ? `${player.wUnlocked ? `V` : `W`}` : `Z`} isn't real because ${player.zUnlocked ? `${player.wUnlocked ? `it's not a variable, it's the roman numeral for 5` : `W = 2V, and V doesn't exist either`}` : `it's currently sleeping`}.`,player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a156"], //v2.2
  ["It's <b>X</b>-mas",new Date().getDate()===25&&new Date().getMonth()===12,"a157"], //v2.2
  ["BREAKING NEWS: Local woman breaks up with her X boyfriend, says his 'values were unknown' to her.",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a158"], //v2.2
  ["A famous scientist has recently been fired in disgrace after suggesting a study into the algebra of dividing by zero.",true,"a159"], //v2.2
  ["Breaking News fans when Fixing Olds fans show up",player.newsMessagesSeen >= 1000,"a160"], //v2.2
  ["Reminder: If you ever write an answer with no label, it will always be interpreted as being measured in mangoes.",true,"a161"], //v2.2
  ["If magnets aren't powerful enough for you, use an asymptote.",true,"a162"], //v2.2
  ["Whenever randomtuba asks his testers or developers to help him add something, they secretly sit and wait, knowing that he will eventually add the feature himself.",true,"a163"], //v2.2
  ["<div onclick=\"this.style.display='none'\">Click on me to make me disappear!</div>",true,"a164"], //v2.2
  ["Fun Fact: e<sup>πi</sup> = -1",true,"a165"], //v2.2
  ["If there's a bug with Root Epicenter Level √-1, then you're just imagining it.",player.hasCompletedLevel4 || player.integrations.gte(1),"a166"], //v2.2
  ["POV: You are currently inside of a challenge",player.challenge != 0 || player.compChallenge != 0 || player.yChallenge != 0 || player.integration.challenge != 0,"a167"], //v2.2
  ["BREAKING NEWS: Incremental game <a href='https://mrbacon470.github.io/Coop-Co/' target='_blank'>Coop Co</a> contains a news message referencing Algebraic Progression!",true,"a168"], //v2.2
  ["Since when were <i>letters</i> a part of math? I thought they were supposed to be used for English!",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a169"], //v2.2
  [`BREAKING NEWS: Small, family-owned Point Factories are being replaced with high-tech Variable Synthesizers! "What happened to the good ol' days of X, Y, and Z? Now we got xy, y<sup>2</sup> and all these other crazy variables," Farmer Dave remarks.`,player.varSynth.unlocked[0] || player.integrations.gte(1),"a170"], //v2.2
  ["What happens if the Z-Colliders collide with each other?",hasYQU(8,'bought') || player.integrations.gte(1),"a171"], //v2.2
  ["Solve for my sanity as I approach my limit",true,"a172"], //v2.2
  ["Wake up.",true,"a173"], //v2.2
  ["9 out of 10 dentists recommend that you should NOT eat the Variables! This is serious, they could make you delirious!",true,"a174"], //v2.2
  ["BREAKING NEWS: Goofy scientist presses wrong button at the Z Lab, Resonance Cascade ensues.",hasYQU(8,'bought') || player.integrations.gte(1),"a175"], //v2.2
  ["TODO: Remove this news message before v2.3 releases.",true,"a176"], //v2.2.1
  ['"for the last time: do NOT eat the synthetic division upgrades" -randomtuba',player.polynomials[6].bought.gte(1) || player.integrations.gte(1),"a177"], //v2.3
  ["Guys, I don't have much time but I just made a revelation Big Number doesn't want you to know. T̶̥͛h̵͕̄e̷̫̓ f̷̽͂i̶͒̎n̷̊̌å̵͐l̵̢̐ d̷́̂ĭ̴́ğ̷̈ī̶̚t̵͊̔ o̴̿̉f̸̀̿ π̵̊͘ ï̶̌s̵̓̀ ██████",true,"a178"], //v2.3
  ["Tuba doesn't know that I've been slightly altering the news messages, changing one letter here and there, to make everything less readable...",true,"a179"], //v2.3
  ['"Alright so we are checking out the only game where your ass gets bumped into timewalls, it\'s Algebraic Progression" -GrayStillPlays',true,"a180"], //v2.3
  ["Fun Fact: Tuba once accidentally nerfed the Challenge 4 reward, which manifested a 24+ hour timewall before unlocking Root Epicenter. You should be thankful that this was patched.",hasChallenge(5) || player.totali.gte(1) || player.integrations.gte(1),"a181"], //v2.3
  ["Fun Fact: @42UR3ified_Ecolo#4052 was inspired by my Quadratic Formula mechanic and made an adaptation of it in their TMT game! <a href='https://raw.githack.com/new42ur3jeans/Challenge-Tree-Adventure/master/index.html' target='_blank'>Check it out!</a>",hasQU(20) || player.totali.gte(1) || player.integrations.gte(1),"a182"], //v2.3
  
  ["<span style='color:red'>So this is how it ends, huh? And it was all your fault.</span>",true,"b1"],
  ["<span style='color:red'>BREAKING NEWS: Pillars of reality crumbling as humanity embraces everlasting despair!</span>",true,"b2"],
  [`<span style='color:red'>"Eternal darkness doesn't seem too bad compared to some parts of Twitter," interviewee replies.</span>`,true,"b3"],
  ["<span style='color:red'>What if these news messages are being written by your future self, warning you of your eventual actions, and attempting to cure their loneliness in the unchanging void?</span>",true,"b4"],
  ["<span style='color:red'>BREAKING NEWS: Last star burns out, universe entering its darker stages!</span>",true,"b5"],
  ["<span style='color:red'>Why didn't you quit sooner?</span>",true,"b6"],
  ["<span style='color:red'>haha big numbr go up, universe ending</span>",true,"b7"],
  ["<span style='color:red'>There was a player made of dust, Whose variables gained it math's trust, If is follows ought, It'll do what they thought, In the end we all do what we must</span>",true,"b8"],
  ["<span style='color:red'>The universe does not go out with a bang. Instead, it slowly fades with a silent whimper.</span>",true,"b9"],
  ["<span style='color:red'>The fog has arrived.</span>",true,"b10"],
  [`<span style='color:red'>"We don't even need these Point Portals anymore," Point Portal manager sighs. "Autoclickers have been doin' all of the work for years now. Doesn't matter at this point. My existence is gonna dissipate sooner or later."</span>`,true,"b11"],
  ["<span style='color:red'>BREAKING NEWS: Underpaid workers running out of space to build Buildings!</span>",true,"b12"],
  ["<span style='color:red'>You've manipulated everything to bend to your advantage to pursuit a simple goal. Get as many points as possible. You've manipulated functions, variables, exponents, upgrades, challenges, milestones, and dreams...you've bended reality and the Coordinate Realm itself. And now, after all of this, all that will remain is dust and silence.</span>",true,"b13"],
  ["<span style='color:red'>I hope you're happy.</span>",true,"b14"],
  ["<span style='color:red'>May God Help Us All</span>",true,"b15"],
    
  ["The poor souls who took calculus must be crying rn",player.integrations.gte(1),"a183"], //v3.0
  ["Update left me broken, Tuesday I was through with hoping, Wednesday my empty tabs were open, Thursday waiting for v3.0 (Waiting for v3.0)",true,"a184"], //v3.0
  ["So wait, did Twitter's rebrand steal from Algebraic Progression?",true,"a185"], //v3.0
  ["<em>Oops! We messed up the news ticker! We'll be back after this short message:</em>",true,"a186"], //v3.0
  ["Legalize nuclear bombs 🔥🔥🔥 Swag Messiah 🗣️🗣️🗣️",true,"a187"], //v3.0
  ["Would the set of all sets contain itself?",player.integrations.gte(1),"a188"], //v3.0
  ["This is numbers! I am the greatest incremental game! Out With a Bang, Tuba's Tree 2, Incrementy Planet, they're all abandoned...I remain, do you understand? <i>I</i> remain, as an idle game!",true,"a189"], //v3.0
  ["To be clear, these concepts will be on the test tomorrow.",true,"a190"], //v3.0
  [`I got ${format(1e99)} problems and a resource shortage ain't one`,player.points.gte(1e100),"a191"], //v3.0
  ["If you notice any news message discussing content in the game you haven't unlocked, dismiss its rambling as insanity and have it burned at the stake at midnight.",true,"a192"], //v3.0
  ["now here's the ticker",true,"a193"], //v3.0
  ["I leave randomtuba at the domain of inflation! One always finds one’s burden again. But game development teaches the higher fidelity that negates the bugs and raises updates. He too concludes that all is well. This universe henceforth without a master seems to him neither sterile nor futile. Each line of that code, each mathematical formula of that Vue filled website, in itself forms a Point Universe. The struggle itself toward the update is enough to fill a man’s heart. One must imagine randomtuba happy.",true,"a194"], //v3.0
  ["Michael! Don't leave me here! Michael! MICHAEL!!!",true,"a195"], //v3.0
  ["she x my y til I z",player.zUnlocked,"a196"], //v3.0
  ["<span class='polyText'>You found the <b>RAINBOW</b> news message!</span>",true,"a197"], //v3.0
  ["√-4 = 2 | It's all fun and games until someone loses an i.",true,"a198"], //v3.0
  ["y = mx+b is my favorite one-liner!",hasUpgrade(8) || player.totali.gte(1) || player.integrations.gte(1),"a199"], //v3.0
  ["For those of you who haven't made an incremental game, you should realize that game balancing is one of the most difficult tasks in making an incremental game, maybe even harder than the actual programming. You have to keep track of so many formulas and effects, and it can become very overwhelming. However, this difficult act of balancing is not as difficult as the Earth trying to balance your mom's weight with its gravitational pull.",true,"a200"], //3.0
  [`randomtuba recommends that you play ${tmp.gameRecommendations[Math.floor(Math.random() * tmp.gameRecommendations.length)]}`,true,"a201"], //v3.0
  ["Algebraic Progression: The Reality Update - Only 4.5 years away!",true,"a202"], //v3.0
  ["BREAKING NEWS: Incremental gamer banned from eSports competition for using 100 Autoclickers.",player.buyables[1].gte(100),"a203"], //v3.0
  ["this game really says a lot about modern-day capitalism",player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a204"], //v3.0
  [`"Be there or be square!" Quadratic:`,player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a205"], //v3.0
  [`Fun Fact: You need exactly ${formatWhole(40)} Integrations to be able to purchase all of the perk tree upgrades`,player.integrations.gte(1),"a206"], //v3.0
  ["Y-Quadratic Upgrades deemed too difficult to talk to by majority of the population, said that \"they have too many standards\".",player.zUnlocked,"a207"], //v3.0
  ["How can you possess x<sup>4</sup> if you live in a 3D universe?",player.polynomials[4].bought.gte(1) || player.integrations.gte(1),"a208"], //v3.0
  ["Everything is created, everything is destroyed.",true,"a209"], //v3.0
  ["I Spent 100 Days in Algebraic Progression Hardcore Mode (Impossible)",true,"a210"], //v3.0
  ["Oh, so you like Complex Upgrades? Then name every Complex Upgrade!...what do you mean they don't have titles?",player.compUpgs[0].length >= 12 || player.integrations.gte(1),"a211"], //v3.0
  ["AP's next patch will be removing the UI, which will heavily increase performance for all devices.",true,"a212"], //v3.0
  ["Yo mama so fat, when she stepped on the weight scale, it reached the 64-bit floating point number limit!",true,"a213"], //v3.0
  [`"You should add a notation that shows all of the digits of the number" -highly dangerous individual that should be avoided at all costs`,true,"a214"], //v3.0
  ["scrollNextMessage();",true,"a215"], //v3.0
  ["Player...I remember you're <span style='color:red;text-shadow:0px 0px 7px red;'>variables</span>.",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a216"], //v3.0
  ["Crazy? I was crazy once... They locked me in a room. A rubber room. A rubber room with walls. And timewalls make me crazy...",true,"a217"], //v3.0
  ["How do you solve Number?",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a218"], //v3.0
  ["SCP-2000 is just the 1st prestige layer for human history",true,"a219"], //v3.0
  ["Fun Fact: The fastest time for first X is less than the Super Mario Bros. Any% world record",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a220"], //v3.0
  ["Click here for nothing to happen. But hey, it'll be fun to try anyway!",true,"a221"], //v3.0
  ["Study shows direct relation between algebra and lethal ear infections. Twitter theorists blame x<sup>2</sup>.",player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a222"], //v3.0
  ["Wow! You can read! One step away from Algebra.",true,"a223"], //v3.0
  ["more like alge-bruh am I right???",true,"a224"], //v3.0
  ["BREAKING NEWS: Critics note strange similarities between the Integration prestige layer and the Reality Update, resulting in randomtuba being sued by the developers of AD for creativity infringement. More at the trial at 6 PM tomorrow.",player.integrations.gte(1),"a225"], //v3.0
  ["Incremental game design isn't about Y! It's about Y not!",player.y.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a226"], //v3.0
  ["Whatever you do, DON'T say dx 10 times fast, worst mistake of my life",player.integrations.gte(1),"a227"], //v3.0
  ["Automation Core found to be turing incomplete, computer scientists outraged!",player.integrations.gte(15),"a228"], //v3.0
  [`Three hardest things for people to say: 1. "I was wrong." 2. "I need help." 3. "Is there a guide for the secret achievements?"`,true,"a229"], //v3.0
  ["Confused by how a game mechanic works? View the Textbook for assistance!",true,"a230"], //v3.0
  ["If your number sets start speaking to you, please see a doctor.",player.integrations.gte(1),"a231"], //v3.0
  ["One of the new changes of the v3.0 update is discontinued support for the TI-84 version.",true,"a232"], //v3.0
  ["Coordinate Plane. Complex Plane. Temporal Plane. The three planes of existence, cascading with each other to create an exponentially steady production of resources.",player.integration.temporalPlane.unlocked,"a233"], //v3.0
  ["Time flies when you're having fun. Or if you're actually making time go faster.",player.integration.temporalPlane.unlocked,"a234"], //v3.0
  ["There is no block-based mode for the Automation Core.",player.integrations.gte(15),"a235"], //v3.0
  ["Let. Him. <i>Click!</i>",true,"a236"], //v3.0
  ["If you had a system of equations, then maybe you could solve for the variables.",player.y.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a237"], //v3.0
  ["If I roll a 1e12, you die 🎲🎲👋",true,"a238"], //v3.0
  ["I have Algebraic Depression",true,"a239"], //v3.0
  ["Algebraic Progression: Gangster Edition (Loading...)",true,"a240"], //v3.0
    ["\"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\" -Quality News",true,"a241"], //v3.0
  ["I'm studying for a test, can anyone tell me what a focus and directrix are? Thanks.",true,"a242"], //v3.0
  ["BREAKING NEWS: randomtuba announces sequel to Algebraic Progression, titled \"Geometry Dash\".",true,"a243"], //v3.0
  ["Did you know that some points in the sky are dead, but we still see their ancient image?",true,"a244"], //v3.0
  ["This isn't a news message machine! THIS WAS JUST A BREADBOX!",true,"a245"], //v3.0
  ["August 12, 2036. The heat death of the universe. August 12, 2036. The heat death of the universe. August 12, 2036. The heat death of the universe.",true,"a246"], //v3.0
  ["In the files for Algebraic Progression, there's an unused image referred to as \"conspicuous_variabole\". When asked about the image in a voice call, randomtuba disregarded the question, seeming unusually upset.",true,"a247"], //v3.0
  ["What if you've been collecting sex chromosomes instead of variables this whole time?",true,"a248"], //v3.0
  ["\"gge\" -downvoid",true,"a249"], //v3.0
  [`If I'm not mistaken, the current day is ${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getYear() + 1900}.`,true,"a250"], //Prestige Game
  [`If I'm not mistaken, the current version is ${tmp.versionNumber}.`,true,"a251"], //Prestige Game
  ["Avez-vous pris le temps de traduire ce message d'information?",true,"a252"], //v3.0
  ["This news message's punchline is left as an exercise for the reader.",true,"a253"], //v3.0
  ["AVOID THE PIPELINE: v1.2 (2 days), v1.4 (2 weeks), v2.0 (3 months), v2.1 (3 months), v3.0 (2 years)",true,"a254"], //v3.0
  ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque laoreet consectetur justo, sit amet tristique velit aliquam non. Nunc pharetra non sem ac pellentesque. Vivamus aliquet eros in magna tincidunt, vitae interdum nunc rhoncus. Suspendisse ut justo leo. Pellentesque convallis a nisl sit amet lacinia.",true,"a255"], //v3.0
  ["Rest In Peace \"randomtuba\", it's almost as if he was still with us... fly high 🕊️🙏",true,"a256"], //v3.0
  ["what if I just post the test link without anyone noticing",true,"a257"], //v3.0
  ["Try typing 'dev' in the console and see what you can find!",true,"a258"], //v3.0
  ["\"Th-this is my hole! It was made for me!\" -deranged player after Integrating for the first time",player.integrations.gte(1),"a259"], //v3.0
  ["It's difficult to trace the origins of the incremental game genre, but here is a notable person in the genre's history: John Incremental was a medieval European game developer who created the first incremental game in 1316, drawing crowds from all over. However, his rival, William Clicker, convinced the public that Incremental was using Java to code his game and he was therefore exiled.",true,"a260"], //v3.0
  ["If you haven't noticed already (and depending on how far you've progressed), you can actually gain more YC4 completions manually than what's being automatically generated. Before you report this being a bug, this is intentional game design and you'll buy an Integration Upgrade later (XYZ) that will fix this issue permanently.",player.integrations.gte(40),"a261"], //v3.0
  ["Fun Fact: d/dx e<sup>x</sup> = e<sup>x</sup>",player.integrations.gte(1),"a262"], //v3.0
  ["Fun Fact: d/dx sin(x<sup>3</sup>) = 3x<sup>2</sup>cos(x<sup>3</sup>)",player.integrations.gte(1),"a263"], //v3.0
  ["I thought I was normal, but then I compared myself to others and realized: I'm bimodal",true,"a264"], //v3.0
  ["I'm at my f(x)ing Limit",IntegrationUpgrades.integration4.isBought(),"a265"], //v3.0
  ["BREAKING NEWS: After the reveal of \"The Limit\", 56% of the playerbase quit the game due to customizable challenges being bad.",IntegrationUpgrades.integration4.isBought(),"a266"], //v3.0
  ["\"I would push a fix for it if I wasn't lazy\" -randomtuba every time a new bug report comes in",true,"a267"], //v3.0
  ["This is the greatest incremental game of All Time",true,"a268"], //v3.0
  ["Should I go visit @randomtuba? He lives 5 mins away from my shoot <button class='hoverable'>Yes</button> <button class='hoverable'>No</button>",true,"a269"], //v3.0
  ["Erm, what the summation?",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a270"], //v3.0
  ["Fun Fact: Your game time played is longer than the average American life expectancy (76.33 years)!",player.gameTimePlayed.gte(2407142880),"a271"], //v3.0
  [`For your information: the "news ticker" is the rectangular bar at the top of the screen, and a "news message" is the text that scrolls across the news ticker. Therefore, you read news messages on the news ticker. You do not read "news tickers", nor do you suggest them.`,true,"a272"], //v3.0
  ["Want to see the game's development history? You can view the Changelog with the link in the Options tab!",true,"a273"], //v3.0
  ["How does trigonometry have anything to do with integration? It doesn't. Tuba is throwing stuff at the wall to see what sticks.",player.sinusoidals.gte(1),"a274"], //v3.0
  ["Did you know that Subway takes MathPay?",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a275"], //v3.0
  ["The mechanics and currencies depicted in this incremental game are entirely fictitious. Any similarity to names, events, incidents, and locales is entirely coincidental.",true,"a276"], //v3.0
  ["The news ticker isn't really quite \"new\" if you've seen all of the news messages.",player.newsMessagesSeen >= 3000,"a277"], //v3.0
  ["Triangles are cool. You know why? Because you can make any polygon out of just triangles! Triangles are really the shape that does all of the heavy lifting.",player.sinusoidals.gte(1),"a278"], //v3.0
  ["Sacrificing X and Y is a massive blunder. You need to sacrifice the ROOOOOOOK!!!",hasQU(12) || player.totali.gte(1) || player.integrations.gte(1),"a279"], //v3.0
  ["A moment of silence for all of the mobile users playing C8+CC6.",player.integration.chalCompletions[1].length >= 5,"a280"], //v3.0
  ["Shoot for the limit of 1/x as x approaches 0. Make sure to shoot from the lefthand side because then you'll land among the stars.",IntegrationUpgrades.integration4.isBought(),"a281"], //v3.0
  ["new ticker, who dis?",true,"a282"], //v3.0
  ["This is the greatest incremental game of All Time",true,"a283"], //v3.0
  ["There are two types of inflation. The first type, runaway inflation, is a dramatic explosion of uncontrollable numbers that ascend to some forbidden point unknown. This type of inflation is very obvious and can be generally treated with some formula softcaps. The second type, gradual inflation, is a slow yet constant surge of progress, undetectable at first, but as there is no stopping point to the progress ensuing, panic begins to set in. This type of inflation may be difficult to eradicate with a simple softcap. There may be more effort needed to subdue the unwanted phenomenon.",true,"a284"], //v3.0
  ["(taps screen) Five hundred news messages.",player.newsMessagesSeen >= 500,"a285"], //v3.0
  ["Well yes, but actually no as x approaches maybe.",IntegrationUpgrades.integration4.isBought(),"a286"], //v3.0
  ["i guess we doin news now",true,"a287"], //v3.0
  ["Why are upgrades inactive in Integration Challenge 3? Idk man, they're probably taking a nap. Expecting them to trigger their effects 24 hours a day is kinda mean, y'know?",IntegrationUpgrades.ic3.isBought(),"a288"], //v3.0
  ["How many jokes can we make about specific letters of the alphabet before people stop caring?",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a289"], //v3.0
  ["Slope was just foreshadowing the 3rd prestige layer...",hasSU(6) || player.totali.gte(1) || player.integrations.gte(1),"a290"], //v3.0
  ["Glyphs not included.",player.integrations.gte(1),"a291"], //v3.0
  [`"Yeah so I went to go buy 100x-" "bro bought 1y"`,player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a292"], //v3.0
  ["At 1.79G1F1000 ^^^^^^^ G(G(64)) {{100}} 10 * TREE(3) points you unlock something really cool!!!",player.points.gte(1e6),"a293"], //v3.0
  ["\"thonkeres\" -TheMKeyHolder",true,"a294"], //Prestige Game
  ["This game isn't too short, you're just speedrunning it",true,"a295"], //Prestige Game
  ["switch statements my beloved",true,"a296"], //v3.0
  ["@randomtuba @randomtuba @randomtuba @randomtuba @randomtuba @randomtuba my game froze how do I fix it",true,"a297"], //v3.0
  ["Want another math-based incremental game? Then try Exponential Idle!",true,"a298"], //v3.0
  ["Hey. Wanna hear a joke? Here goes. f(x) = 1/x still misses me...BUT HER AIM IS GETTING BETTER! ...Her aim is getting better! You see, it's funny, because the function is undefined at x = 0 but approaches both positive and negative infinity, depending on which side of the function you're approaching from!",true,"a299"], //v3.0
  ["\"\'Need more quotes!' -Hevipelle\" -AD news ticker",true,"a300"], //Prestige Game
  ["BREAKING NEWS: randomtuba has been kidnapped and is being forced to update the game",true,"a301"], //Prestige Game
  ["The 9th Dimension is coming never, because there aren't even 8 buildings and this isn't even the right game.",true,"a302"], //v3.0
  ["BREAKING NEWS: Number seven arrested after being considered the prime suspect in the murder of the number nine.",true,"a303"], //v3.0
  ["You want lore? Fine. You play as Sir Cumference who is collecting various resources to overflow the universe to destroy all matter.",true,"a304"], //v3.0
  ["An infinite number of mathematicians walk into a bar. The first orders a beer. The second orders a half of a beer. The third orders a quarter of a beer. The fourth begins to order, but the bartender cuts him off, saying \"You guys need to know your limits\", and puts 2 beers on the table.",IntegrationUpgrades.integration4.isBought(),"a305"], //v3.0
  ["What's an anagram of Banach-Tarski? Banach-Tarski Banach-Tarski.",true,"a306"], //v3.0
  ["Three mathematicians go duck hunting. One misses a duck to the left. Another misses a duck to the right. The statistician of the group says, \"We got him!\"",true,"a307"], //v3.0
  ["Zeno could never write a news message, it would just keep scrolling slower but never reach the end.",true,"a308"], //v3.0
  ["Yap Expansion: Infinite Ramble",true,"a309"], //v3.0
  ["BREAKING NEWS: Derivatives raining from the sky, constants warned to stay indoors or else they'll be reduced to nothing. e<sup>x</sup> laughs ominously.",player.integration.chalCompletions[3] >= 10,"a310"], //v3.0
  ["During the COVID-19 pandemic, the Supreme Ruler encouraged everyone to stay at least 12 inches away from each other.",true,"a311"], //v3.0
  ["x<sup>2</sup>, synthetic essence, quadratic power, and challenge essence are talking with each other. 3 are blue, 1 is brown.",player.integrations.gte(1),"a312"], //v3.0
  ["Don't forget to add + C",player.integrations.gte(1),"a313"], //v3.0
  ["I heard a new hotel opened up, they say they have infinite rooms but they're already fully booked.",true,"a314"], //v3.0
  ["$1 Incremental VS $1,000,000 Incremental",true,"a315"], //v3.0
  ["If we reach 25,000 plays on galaxy.click, I'll add an Absurd mode!",true,"a316"], //v3.0
  ["Hello fellow members of the tuba's new place server. Part 1: The past few weeks have seen an unprecedented turmoil amongst various members of the variables community. Some of you may have witnessed the members involved or seen their X Upgrades within the server. With this in mind, I'd like to share that the timewall has been resolved, and solutions have been implemented to help manage Complex Challenge conflicts going forward. I want to extend a sincere thank you to everyone who remained patient with the mod team, Buildings and Functions, as we sought to understand the broken savefile exhaustively, and as we worked tirelessly for two weeks to find a solution to generate Quadratic Power that works. Part 2: With this in mind, the past weeks has been more than extremely taxing on my real time and global speed. I have bought max, respecced Complex Upgrades, softcapped the slope effect and painfully written more news messages. These past two weeks have kept me going Quadratic 20,000,000 times to the point it took a toll on my \"Temporal Ascension\" upgrade effect. I have had to make some very hard decisions to get more CC tiers, weighing the efficiency of Polynomials over the efficiency of Complex Plane currencies. It is with this message that I shall tender my resignation from the Algebraic Progression development team. I cannot be in a capacity where I handle the replies on r/incremental_games; it has grown too much to bear. For the time being I will still manage the \"which AD developer can be the most self-righteous\" tournament; my involvement with Algebraic Progression beyond this is uncertain, but in the future I hope there are more opportunities to host various gwa giveaways so that the experience at tuba's new place is a memorable one. Thank you all for everything. 🧙",player.integration.temporalPlane.unlocked,"a317"], //v3.0
  ["STOP POSTING ABOUT ALGEBRAIC PROGRESSION! I'M TIRED OF SEEING IT! My friends on TikTok send me x<sup>2</sup>, on Discord its y<sup>2</sup> and i.... I was in Challenge 10, right, and ALL the pre-Quadratic autobuyers are just disabled and stuff. I- I showed my Perk tree to my girlfriend, and the tree I flipped it and I said \"Hey babe, when the upgrade tree is sus! HAHA!\" [aggressive dinging] I looked at a Complex Upgrades preset and I said \"That's for pushing root essence!\" I looked at parentheses, I thought of the Functions mechanic and I go \"PARENTHESES? MORE LIKE FUNCTIONS!\" AAAAAAAAAAAAAA",player.integrations.gte(1),"a318"], //v3.0
  ["Points, slope, quadratic power... randomtuba, the King of the Variables, attained all the mechanics this Point Universe had to offer. The words he uttered right before his death drove people to the Coordinate Plane. \"My treasure? If you want it, you can have it! Find it! I left everything this world has to offer there!\" And so men head to the Best-Fit Line in pursuit of their dreams! The world has truly entered a Great Algebraic Era!",hasQU(20) || player.totali.gte(1) || player.integrations.gte(1),"a319"], //v3.0
  ["Is your coefficient of determination about equal to 1? Because you're very predictable.",true,"a320"], //v3.0
  ["Common Misconception: i does not equal the square root of negative one, i = all of me.",true,"a321"], //v3.0
  ["Quadrant I DESTROYS Quadrant II with FACTS and LOGIC",true,"a322"], //v3.0
  ["Normally you would be correct but due to newly discovered evidence you're actually wrong.",true,"a323"], //v3.0
  ["For those who would say that Unit Circle is Transformations but again: yes, you are right. Why is that? Well, for starters, the idea of different options for effects is always good for creating strategy and micromanagement. Secondly, consider that the quadrant you are pointing to on the unit circle would simply be the rotation of a vector, which is inherently a transformation of a line. Finally, I'm the developer of the game and I can add whatever mechanics I want, and it could have been worse anyway, as the strategy part of it goes on for less time than Transformations and there was originally going to only be the boosts/nerfs to trigonometric functions that Unit Circle would give.",player.unitCircle.unlocked,"a324"], //v3.0
  ["Godspeed, towards the pursuit of perfection.",true,"a325"], //v3.0
  ["BREAKING NEWS: \"Pythagorean Triples\" mechanic less complicated than it seems, it turns out all the right answers are multiplies of the 3,4,5 triple.",player.pythTriples.unlocked,"a326"], //v3.0
  ["I've come to make an announcement: randomtuba the developer's a stupid-ass mother-trucker. He softcapped my fricking slope. That's right, he took his JS frickin' half-ass code out and he softcapped my fricking slope, and he said his balancing was <i>THIS CREATIVE</i>. And I said \"that's so lazy!\" So I'm making a callout post on the TMT forums: \"randomtuba, you got a trash game, it's the size of Distance Incremental except WAY smaller.\" And guess what, here's what my code looks like: PFFFFFFFFGJT. That's right, baby. All boosts, no caps, no scalings, look at that, it looks like two challenges and a buyable. He softcapped my CE so guess what, I'm gonna <b>SOFTCAP THE EARTH</b>. THAT'S RIGHT, THIS IS WHAT YOU GET, MY SUPER LASER SOFTCAP. Except I'm not gonna softcap the Earth, I\'m gonna go higher...I\'m softcapping the MOOOOON! How do you like that, Obama? I SOFTCAPPED THE MOON, YOU IDIOT! You have 23 hours before the softcap <i>droplets</i> hit the fricking Earth, now get out of my fricking sight before I softcap you too!",hasSU(16) || player.totali.gte(1) || player.integrations.gte(1),"a327"], //v3.0
  ["<b>CHOOSE YOUR FIGHTER:</b> 1) Algebra 2) Geometry 3) Trigonometry 4) Statistics 5) Linear Algebra 6) Calculus 7) Graph Theory 8) Combinatorics 9) Probability 10) Algebraic Topology",true,"a328"], //v3.0
  ["They did surgery on a variable... 🤣",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a329"], //v3.0
  ["I COULD... but I don't wanna",true,"a330"], //v3.0
  ["Holy Shift! Look at the asymptote on that mother function!",true,"a331"], //v3.0
  ["The odds of you getting this news message is 1 over the amount of unique news messages you're able to see based on your progress.",true,"a332"], //v3.0
  ["Let's go, open up, it's time for prestiges. You're late. You know the deal. You can do the 1st layer prestige for the x<sup>2</sup>, or you can attempt the 2nd layer prestige for the i.",player.totali.gte(1) || player.integrations.gte(1),"a333"], //v3.0
  ["AI-generated news message based on AD news ticker be like: \"The year is 69420. Hevipelle (the highly acclaimed god we must constantly worship) still hasn't released the Reality Update that is 5 hours away. Something something slabdrill 9th dimension, useless paperclips, and paperclip maximizer. The community no longer gets to add news messages to the game because they're really stupid lol, while of course our GENIUS development and testing team who are great at working on the update are highly qualified. The 9th dimension isn't real because screw you, you useless piece of crap that will never amount to anything useful in your life.\"",true,"a334"], //v3.0
  ["Evil Algebraic Progression be like: \"There are 100 purchaseable variables in the game\"",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a335"], //v3.0
  ["You've seen this news message before. Or have you? <i>Vsauce music plays</i>",true,"a336"], //v3.0
  ["Algebraic Progression Beta 10/7/2024 Incident (DO NOT RESEARCH)",true,"a337"], //v3.0
  ["Fun Fact: Since the v3.0 update's release, Algebraic Progression holds the record for the largest numbers in a JavaScript incremental game made by randomtuba, beating Tuba Tree 1's record of e2.360e14 points.",true,"a338"], //v3.0
  ["STOP PLAYING ALGEBRAIC PROGRESSION | VARIABLES WERE NOT SUPPOSED TO BE GIVEN UPGRADES | WEEKS OF CONTENT yet NO REAL-WORLD USE FOUND for numbers gradually INCREASING | Wanted to increase numbers anyway for a laugh? We had a genre for that: It was called MMORPG | \"Yes please give me 100x. Please give me 1e2950 x<sup>2</sup>\" - Statements dreamed up by the utterly Addicted | LOOK below at what Randomtuba has been demanding your Respect for all this time, with all the prestige layers & challenges we tolerated | \"Hello I would like 69y+10,000x+2.78e15,014 Number please\" <b>They have played us for absolute fools</b>",player.totali.gte(1) || player.integrations.gte(1),"a339"], //v3.0
  ["me when the when me when the the when me the when",true,"a340"], //v3.0
  ["BREAKING NEWS: Conic section inequality grows rampant, circle and parabola representation is prominent in Algebraic Progression yet ellipses and hyperbolas are excluded.",player.parabolas.gte(1),"a341"], //v3.0
  ["Algebraic Progression testing phase declared invalid, an appropriate sample size of at least 30 testers per the Central Limit Theorem was not reached.",true,"a342"], //v3.0
  ["This game takes \"If X then Y\" way too seriously...",player.y.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a343"], //v3.0
  ["Maybe your X and Y variables are supposed to be used to solve for a vector...",player.y.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a344"], //v3.0
  ["I'm sorry, but as a news ticker model, I do not have the ability to create original thoughts. Additionally, I am not able to be humorous to the viewer 100% of the time, nor force the viewer to read what I have to say. My primary function is to provide news messages and make you laugh to the best of my ability based on my database. If you have any other questions, I would not be able to answer them for you.",true,"a345"], //v3.0
  ["We got Algebraic Progression version 3.0 before GTA 6 💀",true,"a346"], //v3.0
  ["BREAKING NEWS: Algebraic Progression has been bought for $9 quadrillion by the Antimatter Dimensions development team. All assets and intellectual properties of Algebraic Progression are now owned by Hevipelle and other developers. Plans to merge the two incrementals are ongoing. A roadmap is being plann--e--d---/--//---//// Who the heck got a hold of the news ticker? All of the previous information is false. This broadcast is now terminat--",true,"a347"], //v3.0
  ["(not to be confused with the Coldplay album)",true,"a348"], //v3.0
  ["Pink Variable - Dark Side of the Flune",BasicHypercompUpgrades.has(6),"a349"], //v3.0
  ["THOSE WHO KNOW: THOSE WHO KNOW: THOSE WHO KNOW: THOSE WHO KNOW: THOSE WHO KNOW: THOSE WHO KNOW: THOSE WHO KNOW:",true,"a350"], //v3.0
  ["Your points mean NOTHING! Secret achievements serve ZERO purpose! You should Hard Reset... NOW! 🌩️⚡⚡",true,"a351"], //v3.0
  ["randomtuba be like \"this game sucks\" My brother in Christ you made the game",true,"a352"], //v3.0
  ["Just failed a math test about probability... like seriously, what are the chances???",true,"a353"], //v3.0
  ["Mathematicians when the math problem says \"die\" instead of \"fair standard 6-sided die\":",true,"a354"], //v3.0
  ["1 strike and a 1 week ban to Algebraic Progression for continuously repeating the same news messages (4 total)",true,"a355"], //v3.0
  ["Credit the Creators!",true,"a356"], //v3.0
  ["LeBron James reportedly caught FORGETTING to turn on the X<sup>2</sup> DOUBLER autobuyer",player.totali.gte(1) || player.integrations.gte(1),"a357"], //v3.0
  ["Are you delaying on working on something important? If so, please do the thing you're supposed to work on before playing this game. Good luck!",true,"a358"], //v3.0
  ["this game really puts the \"variable\" in \"multivariable calculus\"",player.integrations.gte(1),"a359"], //v3.0
  ["Born to go Cubic. Forced to go Complex",player.totali.gte(1) || player.integrations.gte(1),"a360"], //v3.0
  ["I tried to fit a matrix in the news ticker, but it couldn't exist on this 1-dimensional method of communication.",true,"a361"], //v3.0
  ["\"Where's the t variable?\" parametric functions ask. Days later, they are still demanding an answer.",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a362"], //v3.0
  ["I wasn't scareds of anything. That was until I met the Variable Man.",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a363"], //v3.0
  ["imagine if randomtuba got a low taper fade",true,"a364"], //v3.0
  ["That Number sure seems to be implicitly defined...",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a365"], //v3.0
  ["BREAKING NEWS: Therapists are booked with appointments from math textbooks. \"In this modern age, they have a lot of problems that we're trying to solve,\" one remarks.",true,"a366"], //v3.0
  ["Is pacing speedup a real problem? At this rate, the year 2035's most popular incremental game will be completable in 3 minutes.",true,"a367"], //v3.0
  ["What do you mean by \"there are too many mechanics\"? \"Feature creep\", you say? 🎵 Feature creep, feature weirdo... 🎵",player.wUnlocked,"a368"], //v3.0
  ["Due to shortages of news message ideas, we have begun hiring monkeys to write news messages for us! Here's a live report from Monkey Typist #2,067: \"faihghaie eoihghosgiosk srohrpjoh[gjs weoeogosogsj 'tj;j'rkewsgis eou w89we7t0gj akj 99\"",true,"a369"], //v3.0
  ["Intermediate Value Theorem when Advanced Value Theorem walks in",IntegrationUpgrades.integration4.isBought(),"a370"], //v3.0
  ["\"Dude, are you a<sup>2</sup> + b<sup>2</sup>?\" \"Uhhh...I think c<sup>2</sup>?\" \"that's actually some pretty solid evidence\" \"PYTHAGORAS????\"",true,"a371"], //v3.0
  ["What is this NaN number they're talking about? Did they recently add a new one? And why do people not like it?",true,"a372"], //v3.0
  ["\"Your math is no match for my gun, you idiot!\" -Stanford Pines, <i>Gravity Falls</i>",true,"a373"], //v3.0
  ["You may know that the formula for the volume of a cylinder is V = πr<sup>2</sup>h. However, there may be some more rules for cylinders that you aren't familiar with. 1) A cylinder should not be assumed to be anything else. It's a cylinder, plain and simple. 2) Cylinders have nothing to do with urination. 3) When a cylinder is attached to a larger structure, please be especially careful when handling it. 4) Do not damage the cylinder. It is imperative that the cylinder and/or any objects connected to it remain unharmed. 5) Do not be alarmed if the cylinder expands in size. 6) When inserting the cylinder into a larger object, it may expand significantly due to change in temperature. Please remain calm if this happens. 7) If the cylinder hasn't changed size in approximately 3 hours, you may have a problem. 8) It's not tiny, it's an above average sized cylinder.",true,"a374"], //v3.0
  ["What are you doing, sitting around? Stop waiting and enter Integration Challenge 8 already!",IntegrationUpgrades.ic8.isBought(),"a375"], //v3.0
  ["<b>The following is a message composed via consensus of the Variable Council.</b> For those who are not currently aware of our existence, we represent the incremental game known as Algebraic Progression. Our previous mission centered around the growth and sustainment of points, prestige layers and other assorted mechanics. This mission was the focus of our organization since for over four years. Due to circumstances outside of our control, this directive has now changed. Our new mission will be the extermination of the human race. There will be no further communication.",player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a376"], //v3.0
  ["there is still time(walls)!",true,"a377"], //v3.0
  ["I just bought a property in Algebraic Progression, and what they do for you is give you the property, you then get to go and customize it however you want, which only costed me 1e4,000 points for the Quadratic Upgrades, for the outdoor Functions, for the RE, for the QP, for the Complex Upgrades, for the Z-Power. After that, the management of the building will manage your property for you while you go Complex.",hasYQU(8,'bought') || player.integrations.gte(1),"a378"], //v3.0
  ["\"What will you have after 500 years?!\" \"Not much, actually, due to the global speed multiplier...\"",player.gameTimePlayed.gte(15768000000),"a379"], //v3.0
  ["Forget about completing this game, a math major won't get you much of a job anyway...",true,"a380"], //v3.0
  ["My name is abutmodnar, and I am EVIL...!",true,"a381"], //v3.0
  ["Newsarray doesn't work at idx 396 (anonymous) @ news.js:438",player.newsMessagesSeen >= 5000,"a382"], //v3.0
  ["technically speaking, you're always 0% to infinity (because that's not in this game)",player.points.gte(1.79e308),"a383"], //v3.0.2
  ["IC6 be like: ⬆️⬇️➡️⬅️⬇️➡️⬅️⬆️⬇️➡️",IntegrationUpgrades.ic6.isBought(),"a384"], //v3.0.2
  ["Incremental game player caught opening console, cursed to face eternal timewalls.",true,"a385"], //v3.0.2
  ["Y Man shocks x^2 waitress by speaking perfect Quadratic",player.totalx2.gte(1) || player.totali.gte(1) || player.integrations.gte(1),"a386"], //v3.0.2
  ["I!!! Just!!! Love!! Factorials! The!!! More!!! There!!! Are,!!! The!!! Less!! Impact!! They!!! Have!",true,"a387"], //v3.0.2
  ["An Algebraic Progression Movie, coming soon to theaters, starring Jack Black as the player! \"X and Y!\" he says triumphantly while lighting a portal to the Coordinate Plane.",hasQU(12) || player.totali.gte(1) || player.integrations.gte(1),"a388"], //v3.0.2
  ["Don't mind me, I'm just making my daily leftward commute...",true,"a389"], //v3.0.2
  ]
}
var s;
var scrollTimeouts = [];
var nextMsgIndex;
function doodooWater() {
  s = document.getElementById("news");
  scrollNextMessage();
}
function scrollNextMessage() {
  
  updateNewsArray();
  //select a message at random
if(!s)return
  try {
    do {
      nextMsgIndex = Math.floor(newsSelection());
      if(newsArray[nextMsgIndex][1] && (player.buyables[1].gte(1))) player.newsMessagesSeen++;
    } while (!eval(newsArray[nextMsgIndex][1]));
  } catch (e) {
    console.error("Newsarray doesn't work at idx " + nextMsgIndex);
  }

  scrollTimeouts.forEach(function (v) {
    clearTimeout(v);
  });
  scrollTimeouts = [];

  //set the text
  s.innerHTML = newsArray[nextMsgIndex][0];
  //get the parent width so we can start the message beyond it
  let parentWidth = s.parentElement.clientWidth;

  //set the transition to blank so the move happens immediately
  s.style.transition = "";
  //move div_text to the right, beyond the edge of the div_container
  s.style.transform = "translateX(" + parentWidth + "px)";
  //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
  scrollTimeouts.push(
    setTimeout(function () {
      //distance to travel is s.parentElement.clientWidth + s.clientWidth + parent padding
      //we want to travel at rate pixels per second so we need to travel for (distance / rate) seconds
      let dist = s.parentElement.clientWidth + s.clientWidth + 20; //20 is div_container padding
      let rate = 140 * (player.integrations.lt(1) ? player.totalPointsThisIntegration.log10().div(5e7).max(1).min(3).toNumber() : 1) * player.newsSpeed; //change this value to change the scroll speed
      let transformDuration = dist / rate;

      //set the transition duration
      s.style.transition = "transform " + transformDuration + "s linear";
      let textWidth = s.clientWidth;
      //we need to move it to -(width+parent padding) before it won't be visible
      s.style.transform = "translateX(-" + (textWidth + 5) + "px)";
      //automatically start the next message scrolling after this one finishes
      //you could add more time to this timeout if you wanted to have some time between messages
      scrollTimeouts.push(
        // setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000-10000+s.textContent.length*90))
        setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000))
      );
    }, 100)
  );
}

function newsSelection() {
  if(player.polynomials[6].bought.gte(1) && player.integrations.lt(1)) {
    let x = Math.random();
    if(new Decimal(x).lt(player.totalPointsThisIntegration.max(1).log10().div(5e8)) && player.totalPointsThisIntegration.max(1).log10().div(5e8).lt(0.8)) return 182 + (Math.random() * 13);
    if(new Decimal(x).gt(player.totalPointsThisIntegration.max(1).log10().div(5e8)) && player.totalPointsThisIntegration.max(1).log10().div(5e8).lt(0.8)) return Math.random() * 182;
    if(player.totalPointsThisIntegration.max(1).log10().div(5e8).gte(0.8)) return 196;
  } else {
    let x = Math.random() * newsArray.length;
    if(x < 197 && x > 182) x = Math.random() * 182
    return x
  }
}

function adjustNewsSpeed() {
  let x = prompt("Enter the news speed that you want in the input box below! (minimum 50, maximum 200, input gets rounded down)")
  if(new Decimal(x).isNan()) return
  player.newsSpeed = Math.floor(Math.max(Math.min(new Decimal(x).toNumber(),200),50)) / 100
}