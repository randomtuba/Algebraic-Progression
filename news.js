var newsArray;

function updateNewsArray() {
  newsArray = [
  ["Welcome to Algebraic Progression, the game where math becomes fun",true,"a1"], //v1.0
  ["X marks the spot!",player.x.gte(1),"a2"], //v1.0
  ["Therapist: 'Z isn't real, it can't hurt you' Z:",player.totalx2.gte(1),"a3"], //v1.0
  ["i am a news ticker, fear me",true,"a4"], //v1.0
  ["when the variable is sus! 😳",true,"a5"], //v1.0
  ["when tuba doesn't update his game :flushed:",true,"a6"], //v1.0
  ["Pi: 'Be real for once' i: 'No, let's be rational here.'",true,"a7"], //v1.0
  ["'If AP doesn't have triple exponential growth, I'm calling the police' -a human(?), 2021",true,"a8"], //v1.0
  ["Press Alt+F4 to die simultaneously",true,"a9"], //v1.0
  ["Algebraic Progression NGUd^^^++++---- when?",true,"a10"], //v1.0
  ["Weeee, look at me go!",true,"a11"], //v1.0
  ["Don't you dare divide by zero.",true,"a12"], //v1.0
  ["Everyone talks about pi, but no one talks about tau...",true,"a13"], //v1.0
  ["@Pinglol",true,"a14"], //v1.0
  ["When your game inflates so hard your numbers reach the Small Dropping Ordinal :sus:",true,"a15"], //v1.0
  ["AP Desmos% Speedrun",true,"a16"], //v1.0
  ["But Y?",player.y.gte(1),"a17"], //v1.0
  ["Z might be real, but W isn't",player.totalx2.gte(1),"a18"], //v1.0
  ["Calculus do what AP don't",true,"a19"], //v1.0
  ["Unreal Engine should be renamed to Imaginary Engine",true,"a20"], //v1.0
  ["imagine not having spaghetti code",true,"a21"], //v1.0
  ["BREAKING NEWS: Point Portal malfunction caused 15 deaths and 3 injuries. Point Portal manager says 'we will be more careful next time'.",player.buyables[3].gte(1),"a22"], //v1.0
  ["BREAKING NEWS: Tuba has decided to remove Buy Max, saying that it 'causes inflation'! Public in fury as riots break out in the CST timezone!",true,"a23"], //v1.0
  ["BREAKING NEWS: Obamium discovered in local mine!",true,"a24"], //v1.0
  ["BREAKING NEWS: Famous celebrity Joe Schmirzstein says 'I can't stop dreaming about complex mathematical functions. I need help.'",true,"a25"], //v1.0
  ["BREAKING NEWS: We ran out of ideas",true,"a26"], //v1.0
  ["BREAKING NEWS: Florida Man rents Point Portal, causes hole in space-time",player.buyables[3].gte(1),"a27"], //v1.0
  ["BREAKING NEWS: Algebraic Progression saves leaked across the nation by a professional hacker. Investigation is ongoing.",true,"a28"], //v1.0
  ["^",true,"a29"], //v1.1
  ["It's important that the news ticker can't be disabled. The news ticker will never disappear and you will get tired of it faster.",true,"a30"], //v1.1
  ["Part 2: Tuba screws up",true,"a31"], //v1.1
  ["The action of adding news tickers is like drugs. It's pleasure, but you can't do too much of it.",true,"a32"], //v1.1
  ["You know what this game needs more of? It needs more protein",true,"a33"], //v1.1
  ["Say it with me: X, Y, Z, W, A, B, C...",player.totalx2.gte(1),"a34"], //v1.1
  ["Hey all, Scott here! My thoughts are being broadcasted on a news ticker now! No reason, just felt like it.",true,"a35"], //v1.1
  ["0/10 quadratic layer needs more parabolas",player.totalx2.gte(1),"a36"], //v1.1
  ["You can't kill News Ticker Man, look at me go!",true,"a37"], //v1.1
  ["Square Root is just Time Dilation but harder, deal with it",player.rootEssence.gt(0),"a38"], //v1.2
  ["Is this a Synergism reference???????",true,"a39"], //v1.2
  ["Fun Fact: Offline time exists! You'll get a boost to production when you go back online based on how long you spend away from the game.",true,"a40"], //v1.2
  ["'hmmm today I will dev AP' -randomtuba, 5 seconds before disaster struck",true,"a41"], //v1.2
  ["Want another game to play while you're idling? Check out randomtuba's main website! Link: https://randomtuba.github.io/ (Warning: outdated and under renovation)",true,"a42"], //v1.2
  ["If you're wondering about new content, there is going to be a 2nd prestige layer eventually added into this game.",player.totalx2.gte(1),"a43"], //v1.2
  ["'shit game remove timewalls' -reda",true,"a44"], //v1.2
  ["if i see one more 5 hours joke i will die in real life",true,"a45"], //v1.2
  ["BREAKING NEWS: Tuba finally fixed Buy Max",player.totalx2.gte(1),"a46"], //v1.2
  ["Reject linear, embrace nonlinear",true,"a47"], //v1.3
  ["Dragon Ball X when?",player.x.gte(1),"a48"], //v1.3
  ["Everyone talks about Z and W, but what about V?",player.y.gte(100),"a49"], //v1.3
  ["Fun Fact: Quadratic in AP Classic was literally called 'Reset', and x^2 was called 'Reset Points'. How unoriginal.",player.totalx2.gte(1),"a50"], //v1.3
  ["Tip: Hold down M to do Quadratics faster",player.totalx2.gte(1),"a51"], //v1.3
  ["haha number go up", true, "a52"], //Incrementy Planet
  ["AP Rewritten REWRITTEN? What's next, AP Rewritten^3?",true,"a53"], //AP Rewritten^2
  ["99% can't go Quadratic!", player.totalx2.gte(1), "a54"], //Incrementy Planet
  ["top 10 reasons why Z isnt real. 1) i forgor 💀",player.totalx2.gte(1),"a55"], //Incrementy Planet
  ["Kowalski, go Quadratic.",player.totalx2.gte(1), "a56"], //Incrementy Planet
  ["FIXING NEWS: Please don't break the news again.",true,"a57"], //AP Rewritten^2
  ["uhhhh what am I supposed to put here? some kind of meta-joke or something?",true,"a58"], //Incrementy Planet
  ["The 100th news ticker does not exist. Just kidding, it does now!", true, "a59"], //Incrementy Planet
  ["Everyone thinks the developer is randomtuba, but the real developer is the friends we made along the way.",true,"a60"], //Incrementy Planet
  ["how do you get news ticker messages? answer for 0x!!  1) quote people || 2) quote memes || 3) actually think of original news tickers || 4) copy existing news tickers, but to avoid plagiarism you change 4% of the words ||| if you answered 3) you are completely wrong, that was the only wrong answer",player.x.gte(1),"a61"], //Incrementy Planet
  ["The J is our lord and savior", true, "a62"], //Incrementy Planet
  ["Algebraic Progression? More like Console ERROR incremental", true, "a63"], //Incrementy Planet
  ["AAREX ADD BATTLE REPLICANTIS OR I WILL FLATTEN YOU'RE CAR TIRES", true, "a64"], //Incrementy Planet
  ["this ticker is d", true, "a65"], //Incrementy Planet
  ["never gonna give you up...", true, "a66"], //Incrementy Planet
  ["...never gonna let you down", true, "a67"], //Incrementy Planet
  ["Why are you playing this game? It's just a meaningless number going up with no implications on reality.",true,"a68"], //Incrementy Planet
  ["'why are you @unpogged 77 centimeters tal?? 1047 pixels ( add this to incement plant news )' -DEMEMZEA",true,"a69"], //Incrementy Planet
  ["go solve today's wordle if you haven't already",true,"a70"], //Incrementy Planet
  ["In the land of X and Y, we are not judged. Here we have peace. Here we are free.",player.y.gte(2),"a71"], //Incrementy Planet
  ["AP stands for Algebraic Progression, not Advanced Placement.",true,"a72"], //Incrementy Planet
  ["Point value plummets due to newfound abundance. 'Back in my day, 1 million was a lot!' says crazy elderly person.",player.totalPoints.gte(1e11),"a73"], //Incrementy Planet
  ["Variables are an essential part of a nutritious and well-balanced breakfast",player.x.gte(1),"a74"], //Incrementy Planet
  ["If you've been looking around in the code, you may have noticed that all of the game's variables are stored in save.js. 'Why are they not stored in game.js?', you may ask. Well, as a developer of this game, I actually have no clue why we have them stored in save.js. Maybe it's to prevent a bug? Who knows!",true,"a75"], //Incrementy Planet
  ["We regret to inform you that this news message has been (softcapped)",true,"a76"], //Incrementy Planet
  ["randomtuba and 3^3=7 (FactorXXX) walk into a bar. randomtuba looks at his watch. 'It's 8 o'clock,' he says. 3^3=7 orders a drink, walks out of the bar, and heads to their house to go to bed.",true,"a77"], //Incrementy Planet
  ["'Pronouns: he/him' -Tuba's About Me",true,"a78"], //AP Rewritten^2
  ["WARNING: Cring Breach Detected! You must return to the B.R.U.H. (Big Red Underground Hole) Bunker ammediately!",true,"a79"], //AP Rewritten^2
  ["Click the big cookie to get more cookies!",true,"a80"], //Tuba's Tree
  ["Cool Bug Fact's: You know what you did",true,"a81"], //Tuba's Tree
  ["Here's a fun challenge: Browse the code in game.js and take a shot every time you see an if statement",true,"a82"], //Tuba's Tree
  ["The news ticker is similar to Minecraft's splash text: It's there, it can't be disabled, and you ignore it after a while.",true,"a83"], //Tuba's Tree
  ["Come to think of it, these messages really aren't that funny.",true,"a84"], //Tuba's Tree
  ["Here's a guide to the 4 different types of balancing! Jacorbian Balancing: Solid gameplay in earlygame and midgame, but too much strategy in lategame. Aarex Balancing: Solid gameplay in earlygame, but too many AAREX TIMEWALLS in midgame and lategame. Tuba Balancing: Solid gameplay in earlygame and midgame, but inflation and repetition in lategame. Reinhardt Balancing: We don't talk about Reinhardt Balancing.",true,"a85"], //Tuba's Tree
  ["When life gives you lemons, you sacrifice it for the next lemon-related prestige layer.",true,"a86"], //Tuba's Tree
  ["too short 1/0",true,"a87"], //Prestige Game
  ["'Discord is not a good thing.' -Michael Stevens, also known as 'VSauce'",true,"a88"], //Tuba's Tree
  ["Fun Fact: The function that calls the news ticker code is called doodooWater(). In November 2020, Tuba thought this was very funny.",true,"a89"], //Tuba's Tree
  ["Slowmode is enabled.",true,"a90"], //Tuba's Tree
  ["\"dunkin' deez nuts\" -unp©gged™",true,"a91"], //AP Rewritten^2
  ["I wonder if people actually read these",true,"a92"], //AP Rewritten^2
  ["<div onclick=\"this.style.fontWeight=900\">Click here to make the news ticker thicc</div>",true,"a93"], //AP Rewritten^2
  ["Some of these messages have nothing to do with the actual game.",true,"a94"], //AP Rewritten^2
  ["'I will gwammit unspeakable gwimes' -Ink. dude",true,"a95"], //AP Rewritten^2
  ["BREAKING NEWS: Don't check the console!",'(function() {console.error("I told you to not check it");return true})()',"a96"], //AP Rewritten^2
  ["If you build autoclickers, point factories and/or portals in space, do they become space buildings?",player.buyables[3].gte(1),"a97"], //v1.4
  ["<i>You found a rare news ticker!</i>",Math.random() <= 0.01,"a98"], //v1.4
  ["\"the currency called tubas are useless\" -gapples2 (edited)",true,"a99"], //v1.4
  ["Thank you for contacting customer support. This is Janet, how can I help you?",true,"a100"], //v1.4
  ["\"ew compact\" -randomtuba",true,"a101"], //v1.4
  ["ReferenceError: dadComesBack() is not a function [ratio.js, line 420:69]",true,"a102"], //v1.4
  ["BREAKING NEWS: Mathematician proves that square root of 2 is irrational, philosophers from thousands of years ago outraged!",player.rootEssence.gt(0),"a103"], //v1.4
  ["3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679",true,"a104"], //v1.4
  ["Hi, I'm just another news ticker...I appear to have lost the <span style='color:red'>will to live</span>.",true,"a105"], //v1.4
  ["You've just been news tickered, send a screenshot of this news ticker to someone else to get un-news tickered",true,"a106"], //Prestige Game
  ["RIP to those under 13 that haven't taken algebra 1 yet",true,"a107"], //v1.4
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
      nextMsgIndex = Math.floor(Math.random() * newsArray.length);
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
      let rate = 140; //change this value to change the scroll speed
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
