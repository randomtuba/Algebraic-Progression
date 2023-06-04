var newsArray;

function updateNewsArray() {
  newsArray = [
  ["Welcome to Algebraic Progression, the game where math becomes fun",true,"a1"], //v1.0
  ["X marks the spot!",player.x.gte(1) || player.totali.gte(1),"a2"], //v1.0
  [`Therapist: \"${player.zUnlocked ? `W` : `Z`} isn't real, it can't hurt you\" ${player.zUnlocked ? `W` : `Z`}:`,player.totalx2.gte(1) || player.totali.gte(1),"a3"], //v1.0
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
  ["But Y?",player.y.gte(1),"a17"], //v1.0
  [`${player.zUnlocked ? `W` : `Z`} might be real, but ${player.zUnlocked ? `V` : `W`} isn't`,player.y.gte(10) || player.totali.gte(1),"a18"], //v1.0
  ["Calculus do what AP don't",true,"a19"], //v1.0
  ["Unreal Engine should be renamed to Imaginary Engine",true,"a20"], //v1.0
  ["imagine not having spaghetti code",true,"a21"], //v1.0
  ["BREAKING NEWS: Point Portal malfunction caused 15 deaths and 3 injuries. Point Portal manager says \"we will be more careful next time\".",player.buyables[3].gte(1),"a22"], //v1.0
  ["BREAKING NEWS: Tuba has decided to remove Buy Max, saying that it \"causes inflation\"! Public in fury as riots break out in the CST timezone!",player.totalx2.gte(1) || player.totali.gte(1),"a23"], //v1.0
  ["BREAKING NEWS: Obamium discovered in local mine!",true,"a24"], //v1.0
  ["BREAKING NEWS: Famous celebrity Joe Schmirzstein says \"I can't stop dreaming about complex mathematical functions. I need help.\"",true,"a25"], //v1.0
  ["BREAKING NEWS: We ran out of ideas",true,"a26"], //v1.0
  ["BREAKING NEWS: Florida Man rents Point Portal, causes hole in space-time",player.buyables[3].gte(1),"a27"], //v1.0
  ["BREAKING NEWS: Algebraic Progression saves leaked across the nation by a professional hacker. Investigation is ongoing.",true,"a28"], //v1.0
  ["^",true,"a29"], //v1.1
  ["It's important that the news ticker can't be disabled. The news ticker will never disappear and you will get tired of it faster...wait, you can disable it now??",true,"a30"], //v1.1
  ["Part 2: Tuba screws up",true,"a31"], //v1.1
  ["The action of adding news messages is like using drugs. It's easy and makes you feel happy when you do it, but you can't do too much of it.",true,"a32"], //v1.1
  ["You know what this game needs more of? It needs more protein",true,"a33"], //v1.1
  [`Sing the Variable Alphabet with me: a, b, c, n, x, y${player.zUnlocked ? `, z` : ``}...no it doesn't continue after that.`,player.totalx2.gte(1) || player.totali.gte(1),"a34"], //v1.1
  ["Hey all, Scott here! My thoughts are being broadcasted on a news ticker now! No reason, just felt like it.",true,"a35"], //v1.1
  ["0/10 quadratic layer needs more parabolas",player.totalx2.gte(1) || player.totali.gte(1),"a36"], //v1.1
  ["You can't kill News Ticker Man, look at me go!",true,"a37"], //v1.1
  ["Square Root is just Time Dilation but harder, deal with it",player.rootEssence.gt(0) || player.totali.gte(1),"a38"], //v1.2
  ["Is this a Synergism reference???????",true,"a39"], //v1.2
  ["Fun Fact: Offline progress exists! Most currencies will keep growing at the same rate as if you were online, even when the game is closed. However, take note that automation does not work while offline.",true,"a40"], //v1.2
  ["\"hmmm today I will dev AP\" -randomtuba, 5 seconds before disaster struck",true,"a41"], //v1.2
  ["Want another game to play while you're idling? Check out randomtuba's main website! Link: <a href='https://randomtuba.github.io/' target='_blank'>https://randomtuba.github.io/</a>",true,"a42"], //v1.2
  ["If you're wondering about new content, v2.3 was the last content update. Sorry.",player.totalx2.gte(1) || player.totali.gte(1),"a43"], //v1.2
  ["\"shit game remove timewalls\" -reda",true,"a44"], //v1.2
  ["if i see one more 5 hours joke i will die in real life",true,"a45"], //v1.2
  ["BREAKING NEWS: Tuba finally fixed Buy Max",player.totalx2.gte(1) || player.totali.gte(1),"a46"], //v1.2
  ["Reject linear, embrace nonlinear",true,"a47"], //v1.3
  ["Dragon Ball X when?",player.x.gte(1) || player.totali.gte(1),"a48"], //v1.3
  [`Everyone talks about ${player.zUnlocked ? `W` : `Z`} not being real, but what about ${player.zUnlocked ? `V` : `W`}?`,player.totalx2.gte(1) || player.totali.gte(1),"a49"], //v1.3
  ["Fun Fact: Quadratic in AP Classic was literally called \"Reset\", and x<sup>2</sup> was called \"Reset Points\". How unoriginal.",player.totalx2.gte(1) || player.totali.gte(1),"a50"], //v1.3
  ["Tip: Hold down M to do Quadratics faster",player.totalx2.gte(1) || player.totali.gte(1),"a51"], //v1.3
  ["haha number go up", true, "a52"], //Incrementy Planet
  ["AP Rewritten REWRITTEN? What's next, AP Rewritten^3?",true,"a53"], //AP Rewritten^2
  ["99% can't go Quadratic!", player.totalx2.gte(1), "a54"], //Incrementy Planet
  [`top 10 reasons why ${player.zUnlocked ? `W` : `Z`} isnt real. 1) i forgor 💀`,player.totalx2.gte(1) || player.totali.gte(1),"a55"], //Incrementy Planet
  ["Kowalski, go Quadratic.",player.totalx2.gte(1), "a56"], //Incrementy Planet
  ["FIXING NEWS: Please don't break the news again.",true,"a57"], //AP Rewritten^2
  ["uhhhh what am I supposed to put here? some kind of meta-joke or something?",true,"a58"], //Incrementy Planet
  ["The 100th news message does not exist. Just kidding, it does now!", true, "a59"], //Incrementy Planet
  ["Everyone thinks the developer is randomtuba, but the real developer is the friends we made along the way.",true,"a60"], //Incrementy Planet
  ["how do you get news ticker messages? answer for 0x!!  1) quote people || 2) quote memes || 3) actually think of original news messages || 4) copy existing news messages, but to avoid plagiarism you change 4% of the words ||| if you answered 3) you are completely wrong, that was the only wrong answer",player.x.gte(1),"a61"], //Incrementy Planet
  ["The J is our lord and savior", true, "a62"], //Incrementy Planet
  ["Algebraic Progression? More like Console ERROR incremental", true, "a63"], //Incrementy Planet
  ["AAREX ADD BATTLE REPLICANTIS OR I WILL FLATTEN YOU'RE CAR TIRES", true, "a64"], //Incrementy Planet
  ["this ticker is d", true, "a65"], //Incrementy Planet
  ["never gonna give you up...", true, "a66"], //Incrementy Planet
  ["...never gonna let you down", true, "a67"], //Incrementy Planet
  ["Why are you playing this game? It's just a meaningless number going up with no implications on reality.",true,"a68"], //Incrementy Planet
  ["\"why are you @unpogged 77 centimeters tal?? 1047 pixels ( add this to incement plant news )\"  -DEMEMZEA",true,"a69"], //Incrementy Planet
  ["go solve today's wordle if you haven't already",true,"a70"], //Incrementy Planet
  ["In the land of X and Y, we are not judged. Here we have peace. Here we are free.",player.y.gte(2) || player.totali.gte(1),"a71"], //Incrementy Planet
  ["AP stands for Algebraic Progression, not Advanced Placement.",true,"a72"], //Incrementy Planet
  ["Point value plummets due to newfound abundance. \"Back in my day, 1 million was a lot!\" says crazy elderly person.",player.totalPoints.gte(1e11),"a73"], //Incrementy Planet
  ["Variables are an essential part of a nutritious and well-balanced breakfast",player.x.gte(1),"a74"], //Incrementy Planet
  ["If you've been looking around in the code, you may have noticed that all of the game's variables are stored in save.js. \"Why are they not stored in game.js?\", you may ask. Well, as a developer of this game, I actually have no clue why we have them stored in save.js. Maybe it's to prevent a bug? Who knows!",true,"a75"], //Incrementy Planet
  ["We regret to inform you that this news message has been (softcapped)",true,"a76"], //Incrementy Planet
  ["randomtuba and 3^3=7 (FactorXXX) walk into a bar. randomtuba looks at his watch. \"It's 8 o'clock,\" he says. 3^3=7 orders a drink, walks out of the bar, and heads to their house to go to bed.",true,"a77"], //Incrementy Planet
  ["\"Pronouns: he/him\" -Tuba's About Me",true,"a78"], //AP Rewritten^2
  ["WARNING: Cring Breach Detected! You must return to the B.R.U.H. (Big Red Underground Hole) Bunker ammediately!",true,"a79"], //AP Rewritten^2
  ["Click the big cookie to get more cookies!",true,"a80"], //Tuba's Tree
  ["Cool Bug Fact's: You know what you did",true,"a81"], //Tuba's Tree
  ["Here's a fun challenge: Browse the code in game.js and take a shot every time you see an if statement",true,"a82"], //Tuba's Tree
  ["The news ticker is similar to Minecraft's splash text: It's there, it has no effect on the main game, and you ignore it after a while.",true,"a83"], //Tuba's Tree
  ["Come to think of it, these messages really aren't that funny.",true,"a84"], //Tuba's Tree
  ["Here's a guide to the 4 different types of balancing! Jacorbian Balancing: Solid gameplay in earlygame and midgame, but too much strategy in lategame. Aarex Balancing: Solid gameplay in earlygame, but too many AAREX TIMEWALLS in midgame and lategame. Tuba Balancing: Solid gameplay in earlygame and midgame, but inflation and repetition in lategame. Reinhardt Balancing: We don't talk about Reinhardt Balancing.",true,"a85"], //Tuba's Tree
  ["When life gives you lemons, you sacrifice it for the next lemon-related prestige layer.",true,"a86"], //Tuba's Tree
  ["too short 1/0",true,"a87"], //Prestige Game
  ["\"Discord is not a good thing.\" -Michael Stevens, also known as 'VSauce'",true,"a88"], //Tuba's Tree
  ["Fun Fact: The function that calls the news ticker code is called doodooWater(). In November 2020, Tuba thought this was very funny.",true,"a89"], //Tuba's Tree
  ["Slowmode is enabled.",true,"a90"], //Tuba's Tree
  ["\"dunkin' deez nuts\" -unp©gged™",true,"a91"], //AP Rewritten^2
  ["I wonder if people actually read these",true,"a92"], //AP Rewritten^2
  ["<div onclick=\"this.style.fontWeight=900\">Click here to make the news ticker thicc</div>",true,"a93"], //AP Rewritten^2
  ["Some of these messages have nothing to do with the actual game.",true,"a94"], //AP Rewritten^2
  ["\"I will gwammit unspeakable gwimes\" -Ink. dude",true,"a95"], //AP Rewritten^2
  ["BREAKING NEWS: Don't check the console!", '(function() {if(location.href.length>40){console.error("I told you to not check it")};return true})()', "a96"],
  ["If you build autoclickers, point factories and/or portals in space, do they become space buildings?",player.buyables[3].gte(1) || player.totali.gte(1),"a97"], //v1.4
  ["<i>You found a rare news message!</i>",Math.random() <= 0.01,"a98"], //v1.4
  ["\"the currency called tubas are useless\" -gapples2 (edited)",true,"a99"], //v1.4
  ["Thank you for contacting customer support. This is Janet, how can I help you?",true,"a100"], //v1.4
  ["\"ew compact\" -randomtuba",true,"a101"], //v1.4
  ["ReferenceError: dadComesBack() is not a function [ratio.js, line 420:69]",true,"a102"], //v1.4
  ["BREAKING NEWS: Mathematician proves that square root of 2 is irrational, philosophers from thousands of years ago outraged!",player.rootEssence.gt(0) || player.totali.gte(1),"a103"], //v1.4
  ["3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679",true,"a104"], //v1.4
  ["Hi, I'm just another news message...I appear to have lost the <span style='color:red'>will to live</span>.",true,"a105"], //v1.4
  ["You've just been news tickered, send a screenshot of this news ticker to someone else to get un-news tickered",true,"a106"], //Prestige Game
  ["RIP to those under 13 that haven't taken algebra 1 yet",true,"a107"], //v1.4
  ["Have you realized that 90% of the news messages are just a bunch of words together that don't make sense, or are in the wrong order? If you have, wake up. No news messages are like that. It's been 8 years, the car accident was not your fault.",true,"a108"], //v1.4.1
  ["What's the second prestige layer, you ask? Well...it's complicated.",player.totali.gte(1),"a109"], //v2.0
  ["\"Where did my progress go?\" -Players after going Complex for the first time",player.totali.gte(1),"a110"], //v2.0
  [`${hasQU(20) || player.totali.gte(1) ? `Congratulations, you're in the ${player.zUnlocked ? `lategame` : `midgame`}!` : `You're currently in the earlygame, enjoy it while it lasts`}`,true,"a111"], //v2.0
  ["Why is the obtuse angle always sad? Because it is never right.",true,"a112"], //v2.0
  ["6 confronts 7 about eating 9",true,"a113"], //v2.0
  [`${player.totaly2.gte(1) ? (ccTiers() >= 50 ? 'y<sup>3</sup> when?' : 'x<sup>3</sup> when?') : 'y<sup>2</sup> when?'}`,player.totalx2.gte(1),"a114"], //v2.0
  ["Integers can sometimes be negative. Let's try to be more positive!",true,"a115"], //v2.0
  ["Who was the inventor of fractions? Henry the Eighth.",true,"a116"], //v2.0
  ["39 buried 0 found",true,"a117"], //v2.0
  ["Hey manager, someone just asked to buy 37 watermelons for a picnic...what should we do about this?",true,"a118"], //v2.0
  ["Always remember to show your work.",true,"a119"], //v2.0
  ["Fun Fact: There is a difference between the terms \"undefined\" and \"no solution\". Undefined means that the expression has not been assigned a meaning/interpretation. No solution means that there is no value of x to make the equation true.",true,"a120"], //v2.0
  ["Quadratic grinding is a fun and essential part of the game",player.quadratics.gte(1e6),"a121"], //v2.0
  ["I can't believe this game was so popular that math was invented",true,"a122"], //v2.0
  [`The fog is coming. ${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}. Expansion Rate: ${format(Decimal.pow(2,new Decimal(player.newsMessagesSeen).add(1).ln()).div(1000))} m/s.`,true,"a123"], //v2.0
  ["It takes 12 bees their entire life to make a single teaspoon of honey. How does that make you feel?",true,"a124"], //v2.0
  ["The devs, mods, and testers are all awesome, with the exception of whoever stole all the eggs.",true,"a125"], //v2.0
  ["guys who's joe??? plz i need to find out who joe is",true,"a126"], //v2.0
  ["<a href='https://cdn.discordapp.com/attachments/996258737037787236/997538359658426459/unknown.png' target='_blank'>Click me!</a> <--- do NOT click on that link!",true,"a127"], //v2.0
  ["That last news message was pretty funny.",true,"a128"], //v2.0
  ["<i style='color: #969696;'>[removed]</i>",true,"a129"], //v2.0
  ["While incremental games can be fun and even healthy in certain contexts, they can start or perpetuate video game addiction even more than other genres. If you feel like playing incremental games is taking priority over other things in your life, or manipulating your sleep schedule, it may be well advised to seek help.",true,"a130"], //The Modding Tree Forums
  ["this can't be real...",player.complexes.gte(1),"a131"], //v2.1
  [`Maybe the real ${player.zUnlocked ? `W` : `Z`} was in our hearts all along.`,player.y.gte(100) || player.totali.gte(1),"a132"], //v2.1
  ["BREAKING NEWS: After years of testing, we've finally found the value of x: 5. \"This is a monumental milestone for our goal,\" dedicated scientists say. \"Before you know it, we'll have all these pesky letters figured out and finally know the value of Number.\" More at 7 where we reveal the real value of i.",player.x.gte(1),"a133"], //v2.1
  ["Join our Discord server for a stable economy!",true,"a134"], //v2.1
  ["\"why do we exists\" -Saber",true,"a135"], //v2.1
  ["<span style='font-size:8px;'>Hopefully no one sees this...</span>",true,"a136"], //v2.1
  [`${format(player.points)} points? ${tmp.disses[Math.floor(Math.random() * tmp.disses.length)]}`,player.points.gte("1e1000"),"a137"], //v2.1
  ["BREAKING NEWS: Population complains about mathematical formula in an incremental game. 'I forgot how to solve a quadratic equation, it's not even useful, why is this in the game?' local complainer admits.",hasQU(20) || player.totali.gte(1),"a138"], //v2.1
  ["Congratulations! You have all of the achievements!",player.achievements.length >= 60,"a139"], //v2.1
  ["Have you realized that the Milestones are button elements yet?",player.complexes.gte(5),"a140"], //v2.1
  ["What happens when anti-slope comes in contact with antimatter? No one has survived to find out.",player.compChalCompletions[2] >= 1,"a141"], //v2.1
  ["Did you inflate the game or something?",player.i.gte("1e100000"),"a142"], //v2.1
  ["<span style='color:blue'>Why should news messages be black or white? So boring. Blue looks so much nicer.</span>",true,"a143"], //v2.1
  ["SEVERE WEATHER WARNING: Major cubic storm crossing y-axis and travelling towards (2,8)-ville. Ends are approaching negative and positive infinity, respectively. Stay indoors and stay at low elevations. Thank you for your cooperation.",true,"a144"], //v2.1
  ["BREAKING NEWS: randomtuba doesn't know how his own automation code works!",hasQU(5) || hasQU(6) || player.totali.gte(1),"a145"], //v2.1
  ["<img src='https://cdn.glitch.global/f11707a7-4c2e-4e11-b957-162b8f56f334/True%20Cubert.png?v=1675015469227' width='16' height='16'>",true,"a146"], //v2.1
  ["BREAKING NEWS: Developer messing with <span style='color: white; animation: a-existence-glow 3s infinite'>new text animation!</span>",true,"a147"], //v2.1
  ["INSIDE LOOK: What are Upgrade Points made out of? Research and analysis has discovered that they contain, on average, 62% dreams, 33% water vapor, and 5% sulfuric acid.",player.upgradePoints[1].gte(1),"a148"], //v2.1
  ["Your Ad Here",true,"a149"], //v2.1
  ["BREAKING NEWS: Complex Challenges deemed too easy, 10 tiers have already been finished!",ccTiers() >= 10,"a150"], //v2.1
  [`BREAKING NEWS: Amateur mathematician suggests possible existence of a ${player.zUnlocked ? `fourth` : `third`} variable, gets trapped in Square Root as punishment.`,hasQU(16) || player.totali.gte(1),"a151"], //v2.2
  [`${player.zUnlocked ? `W` : `Z`} isn't real because there are only 25 letters in the alphabet. Perfect squares FTW!`,player.totalx2.gte(1) || player.totali.gte(1),"a152"], //v2.2
  [`${player.zUnlocked ? `W` : `Z`} isn't real because I said so.`,player.totalx2.gte(1) || player.totali.gte(1),"a153"], //v2.2
  [`${player.zUnlocked ? `W` : `Z`} isn't real because the scaling would be too fast.`,player.totalx2.gte(1) || player.totali.gte(1),"a154"], //v2.2
  [`${player.zUnlocked ? `W` : `Z`} isn't real because ${player.zUnlocked ? `we can't comprehend the 4th dimension` : `this is a 2D game, not a 3D game`}.`,player.totalx2.gte(1) || player.totali.gte(1),"a155"], //v2.2
  [`${player.zUnlocked ? `W` : `Z`} isn't real because ${player.zUnlocked ? `W = 2V, and V doesn't exist either` : `it's currently sleeping`}.`,player.totalx2.gte(1) || player.totali.gte(1),"a156"], //v2.2
  ["It's <b>X</b>-mas",new Date().getDate()===25&&new Date().getMonth()===12,"a157"], //v2.2
  ["BREAKING NEWS: Local woman breaks up with her X boyfriend, says his 'values were unknown' to her.",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1),"a158"], //v2.2
  ["A famous scientist has recently been fired in disgrace after suggesting a study into the algebra of dividing by zero.",true,"a159"], //v2.2
  ["Breaking News fans when Fixing Olds fans show up",player.newsMessagesSeen >= 1000,"a160"], //v2.2
  ["Reminder: If you ever write an answer with no label, it will always be interpreted as being measured in mangoes.",true,"a161"], //v2.2
  ["If magnets aren't powerful enough for you, use an asymptote.",true,"a162"], //v2.2
  ["Whenever randomtuba asks his testers or developers to help him add something, they secretly sit and wait, knowing that he will eventually add the feature himself.",true,"a163"], //v2.2
  ["<div onclick=\"this.style.display='none'\">Click on me to make me disappear!</div>",true,"a164"], //v2.2
  ["Fun Fact: e<sup>πi</sup> = -1",true,"a165"], //v2.2
  ["If there's a bug with Root Epicenter Level √-1, then you're just imagining it.",player.hasCompletedLevel4,"a166"], //v2.2
  ["POV: You are currently inside of a challenge",player.challenge != 0 || player.compChallenge != 0,"a167"], //v2.2
  ["BREAKING NEWS: Incremental game <a href='https://mrbacon470.github.io/Coop-Co/' target='_blank'>Coop Co</a> contains a news message referencing Algebraic Progression!",true,"a168"], //v2.2
  ["Since when were <i>letters</i> a part of math? I thought they were supposed to be used for English!",player.x.gte(1) || player.totalx2.gte(1) || player.totali.gte(1),"a169"], //v2.2
  [`BREAKING NEWS: Small, family-owned Point Factories are being replaced with high-tech Variable Synthesizers! "What happened to the good ol' days of X, Y, and Z? Now we got xy, y<sup>2</sup> and all these other crazy variables," Farmer Dave remarks.`,player.varSynth.unlocked[0],"a170"], //v2.2
  ["What happens if the Z-Colliders collide with each other?",hasYQU(8,'bought'),"a171"], //v2.2
  ["Solve for my sanity as I approach my limit",true,"a172"], //v2.2
  ["Wake up.",true,"a173"], //v2.2
  ["9 out of 10 dentists recommend that you should NOT eat the Variables! This is serious, they could make you delirious!",true,"a174"], //v2.2
  ["BREAKING NEWS: Goofy scientist presses wrong button at the Z Lab, Resonance Cascade ensues.",hasYQU(8,'bought'),"a175"], //v2.2
  ["TODO: Remove this news message before v2.3 releases.",true,"a176"], //v2.2.1
  ['"for the last time: do NOT eat the synthetic division upgrades" -randomtuba',player.polynomials[6].bought.gte(1),"a177"], //v2.3
  ["Guys, I don't have much time but I just made a revelation Big Number doesn't want you to know. T̶̥͛h̵͕̄e̷̫̓ f̷̽͂i̶͒̎n̷̊̌å̵͐l̵̢̐ d̷́̂ĭ̴́ğ̷̈ī̶̚t̵͊̔ o̴̿̉f̸̀̿ π̵̊͘ ï̶̌s̵̓̀ ██████",true,"a178"], //v2.3
  ["Tuba doesn't know that I've been slightly altering the news messages, changing one letter here and there, to make everything less readable...",true,"a179"], //v2.3
  ['"Alright so we are checking out the only game where your ass gets bumped into timewalls, it\'s Algebraic Progression" -GrayStillPlays',true,"a180"], //v2.3
  ["Fun Fact: Tuba once accidentally nerfed the Challenge 4 reward, which manifested a 24+ hour timewall before unlocking Root Epicenter. You should be thankful that this was patched.",hasChallenge(5) || player.totali.gte(1),"a181"], //v2.3
  ["Fun Fact: @42UR3ified_Ecolo#4052 was inspired by my Quadratic Formula mechanic and made an adaptation of it in their TMT game! <a href='https://raw.githack.com/new42ur3jeans/Challenge-Tree-Adventure/master/index.html' target='_blank'>Check it out!</a>",hasQU(20) || player.totali.gte(1),"a182"], //v2.3
  
    
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
      let rate = 140 * player.totalPoints.log10().div(5e7).max(1).min(3).toNumber() * player.newsSpeed; //change this value to change the scroll speed
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
  if(player.polynomials[6].bought.gte(1)) {
    let x = Math.random();
    if(new Decimal(x).lt(player.totalPoints.max(1).log10().div(5e8)) && player.totalPoints.max(1).log10().div(5e8).lt(0.8)) return 182 + (Math.random() * 13);
    if(new Decimal(x).gt(player.totalPoints.max(1).log10().div(5e8)) && player.totalPoints.max(1).log10().div(5e8).lt(0.8)) return Math.random() * 181;
    if(player.totalPoints.max(1).log10().div(5e8).gte(0.8)) return 196;
  } else {
    return Math.random() * 180;
  }
}

function adjustNewsSpeed() {
  let x = prompt("Enter the news speed that you want in the input box below! (minimum 50, maximum 200, input gets rounded down)")
  player.newsSpeed = Math.floor(Math.max(Math.min(new Decimal(x).toNumber(),200),50)) / 100
}