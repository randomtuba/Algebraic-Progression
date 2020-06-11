  var newsArray = [
  "Thank you for playing Algebraic Progression!",
  "Wait 5 hours for the update",
  "'OMG it's just a cookie clicker clone' -literally everyone",
  "At 69420 anti-points you unlock something really cool!",
  "@Pinglol#1337",
  "Click, click, click...",
  "lol get rekt",
  "<p onclick=\"window.location.href=\"https://www.youtube.com/watch?v=DLzxrzFCyOs\"\">Click me!</p>",
  "You can't reach 1.79e308",
  "That's a lot of x's",
  "Algebraic Progression NGUd'^^-----++++",
  "It'll be 5 hours until the update",
  "Fun fact: This game contains microtransaction repellent",
  "This is a bad game",
  "Thanks to TheMKeyHolder for helping (a lot)",
  "noice",
  "'I fixed the bug and it's now back' -randomtuba",
  "Do Alt+F4 for free Vbucks",
  "Somebody once told me that functions were gonna roll me",
  "Wait, how many news messages are there?",
  "Thanks for adding random_library.js",
  "*sigh* *sets up the camera* *gets fake tear into focus* I am super duper sorry for shouting 'Free Reset Points!' during an exam. The goal of my content is always to entertai-",
  "OMG HE ADDED MY NEWS TICKER WOAHHHHH",
  "[insert text here]",
  "showNews();",
  "'Can you put an array inside of an array?' -randomtuba",
  "'how do i make a table' -randomtuba",
  "Take the point portals from the shadow realm, and you're good to go!",
  "1e420.69",
  "Stop! Wait 5 hours",
  "randomtuba was slain by Xx_ThinkinW/Portalz420_xX using 'Buy for 15000 points'",
  "bruh moment",
  "Sometimes you just wanna [REDACTED] someone so hard they split into the fifteenth dimension",
  "Don't you hate when the message doesn't finish its sente",
  "Don't eat points. Eat paper instead.",
  "CHOCOLATE",
  "Whomst'd've'zh'bh'rh't'd've done this?!",
  "ono it broke again - TheMKeyHolder",
  "Is this good CSS or terrible CSS?",
  "ur not an epic gamer chad like me yuo noob",
  "pls like and scrubsibe for Algebraic Progression content",
  "'oops I broke it' -randomtuba",
  "Don't say that people shouldn't program. Don't say that this game is 'just a cookie clicker clone'. If you say both of those things, then fuck you.",
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  ":ripaarex:",
  "Scientists discovered that Point Portals can contain themselves. Oh no.",
  "'Just because this game doesn't have polynomial growth doesn't mean that this game is bad!!!' -randomtuba",
  "'I need triple exponential growth or else I'm not playing' -someone",
  "https://cookie-clickr.glitch.me",
  "'bet you can't reach 9.99e999' -someone from the AD server",
  "Algebraic Progression? More like Algebraic Depressio-",
  "@everyone @everyone @everyone @here",
  "h",
  "I can't believe this game still doesn't have any onion jokes. Yay!!!",
  "Is the secret value Z?",
  "'YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS' - randomtuba",
  "'I'm making the co-devs do the work for me lol' -randomtuba while chatting in a private DM",
  "Good x, good x, that's some good x there if I do say so myself",
  "This news ticker is not what you anticipated",
  "'smh my head' -Reinhardt",
  "Why did we skip A through W?",
  "'OFFLINE PROGRESS DOESN'T EVEN WORK 0/5' -some random guy that spends 1 second every day on AP",
  "What is there was an omniverse of points?",
  "the box is full of points",
  "Hmm yes, the points here are made out of points",
  "The secret to making points is preons, so maybe that's why the post-50x wall is slow. It's because of Nanofield!",
  "Did you just say that Antimatter Dimensions has better than Algebraic Progression? Are you seriously?!?!?! Algebraic Progression are much so better than Antimatter Dimensions. You be must taking drugs or something. go commit toaster bath"
   ];

function showNews() {
  let message = Math.floor(Math.random() * newsArray.length);

  if(Math.round(Math.random(100,1)) === 100
    ){
      $("newsTicker").innerHTML = "You have a 1% chance to get this news ticker. Woah!";
  }else{
      $("newsTicker").innerHTML = newsArray[message];
  }
}

setInterval(15000, showNews());
//pinglol uhhhh!
