var newsArray;

function updateNewsArray() {
newsArray = [
  ["Welcome to Algebraic Progression, the game where math becomes fun",true,"a1"],
  ["Here's a homework assignment for you: Prestige for 1 b",true,"a2"],
  ["X marks the spot!",true,"a3"],
  ["Therapist: 'Z isn't real, it can't hurt you' Z:",true,"a4"],
  ["i am a news ticker, fear me",true,"a5"],
  ["when the variable is sus! :flushed:",true,"a6"],
  ["when tuba doesn't update his game :flushed:",true,"a7"],
  ["Pi: 'Be real for once' i: 'No, let's be rational here.'",true,"a8"],
  ["'If AP doesn't have triple exponential growth, I'm calling the police' -a human(?), 2021",true,"a9"],
  ["Press Alt+F4 to die simultaneously",true,"a10"],
  ["Algebraic Progression NGUd^^^++++---- when?",true,"a11"],
  ["Weeee, look at me go!",true,"a12"],
  ["Don't you dare divide by zero",true,"a13"],
  ["Everyone talks about pi, but no one talks about tau :saddening:",true,"a14"],
  ["'My power grows, Gordon.' -Dr. Coomer, 2020(?)",true,"a15"],
  ["@Pinglol",true,"a16"],
  ["When your game inflates so hard your numbers reach the Small Dropping Ordinal :sus:",true,"a17"],
  ["AP Desmos% Speedrun",true,"a18"],
  ["But Y?",true,"a19"],
  ["Z might be real, but W isn't",true,"a20"],
  ["Calculus do what AP don't",true,"a21"],
  ["Unreal Engine should be renamed to Imaginary Engine",true,"a22"],
  ["imagine not having spaghetti code",true,"a23"],
  ["BREAKING NEWS: Point Portal malfunction caused 15 deaths and 3 injuries. Point Portal manager says 'we will be more careful next time'.",true,"a24"],
  ["BREAKING NEWS: Randomtuba announces removal of the Buy Max button, riots ensue.",true,"a25"],
  ["BREAKING NEWS: Obamium discovered in local mine!",true,"a26"],
  ["BREAKING NEWS: Famous celebrity Joe Schmirzstein says 'I can't stop dreaming about complex mathematical functions. I need help.'",true,"a27"],
  ["BREAKING NEWS: We ran out of ideas",true,"a28"],
  ["BREAKING NEWS: Florida Man rents Point Portal, causes hole in space-time",true,"a29"],
  ["BREAKING NEWS: Algebraic Progression saves leaked across the nation by a professional hacker. Investigation is ongoing.",true,"a30"],
  ["Why does the news ticker line break news messages?",true,"a31"],
  ["^",true,"a32"],
  ["It's important that the news ticker can't be disabled. The news ticker will never disappear and you will get tired of it faster.",true,"a32"],
  ["Part 2: Tuba fucks up",true,"a33"],
  ["The action of adding news tickers is like drugs. It's pleasure, but you can't do too much of it.",true,"a34"],
  ["You know what this game needs more of? It needs more protein",true,"a35"],
  ["Say it with me: X, Y, Z, W, A, B, C...",true,"a36"],
  ["Hey all, Scott here! My thoughts are being broadcasted on a news ticker now! No reason, just felt like it.",true,"a37"],
  ["Fact: tuba is not a furry",true,"a38"],
  ["0/10 quadratic layer needs more parabolas",true,"a39"],
  ["You can't kill News Ticker Man, look at me go!",true,"a40"],
  ["Square Root is just Time Dilation but harder, deal with it",true,"a41"],
  ["Is this a Synergism reference???????",true,"a42"],
  ["Fun Fact: Offline time exists! You'll get a boost to production when you go back online based on how long you spend away from the game.",true,"a43"],
  ["'hmmm today I will dev AP' -randomtuba, 5 seconds before disaster struck",true,"a44"],
  ["Want another game to play while you're idling? Check out Tuba's Tree! Game Link: https://randomtuba.github.io/Tubas-Tree/",true,"a45"],
  ["Fun Fact: A main GitHub page for Tuba's incremental games is in the works!",true,"a46"],
  ["If you're wondering about new content, there is going to be a 2nd prestige layer eventually added into this game.",true,"a47"],
  ["'shit game remove timewalls' -reda",true,"a48"],
  ["if i see one more 5 hours joke i will fucking snap",true,"a49"],
  ["BREAKING NEWS: Tuba finally fixed Max All",true,"a50"],
];}
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

  try {
    do {nextMsgIndex = Math.floor(Math.random() * newsArray.length)} while (!eval(newsArray[nextMsgIndex][1]))
  } catch(e) {
      console.error("Newsarray doesn't work at idx " + nextMsgIndex)
  }

  scrollTimeouts.forEach(function(v) {clearTimeout(v);});
  scrollTimeouts = [];
    
  //set the text
  s.textContent = newsArray[nextMsgIndex][0]; //im going to test this
  //get the parent width so we can start the message beyond it
  let parentWidth = s.parentElement.clientWidth;

  //set the transition to blank so the move happens immediately
  s.style.transition = '';
  //move div_text to the right, beyond the edge of the div_container
  s.style.transform = 'translateX('+parentWidth+'px)';

  //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
  scrollTimeouts.push(setTimeout( function() {
    //distance to travel is s.parentElement.clientWidth + s.clientWidth + parent padding
    //we want to travel at rate pixels per second so we need to travel for (distance / rate) seconds
    let dist = s.parentElement.clientWidth + s.clientWidth + 20; //20 is div_container padding
    let rate = 140; //change this value to change the scroll speed
    let transformDuration = dist / rate;


    //set the transition duration
    s.style.transition = 'transform '+transformDuration+'s linear';
    let textWidth = s.clientWidth;
    //we need to move it to -(width+parent padding) before it won't be visible
    s.style.transform = 'translateX(-'+(textWidth+5)+'px)';
    //automatically start the next message scrolling after this one finishes
    //you could add more time to this timeout if you wanted to have some time between messages
    scrollTimeouts.push(setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000)));
  }, 100));
}
