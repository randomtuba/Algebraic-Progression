const themes = {
  Light:{
    textColor: "black",
    bgColor: "white",
    buildBG: "black",
    buildColor: "white",
  },
  Dark:{
    textColor: "#eeeeee",
    bgColor: "#111111",
    buildBG: "white",
    buildColor: "black",
  }
}

function changeTheme(name){
  let vals = Object.values(themes[name])
  let keys = Object.keys(themes[name])
  
  vals.forEach((val,i)=>{
    document.documentElement.style.setProperty("--"+keys[i],val)
  })
  
  app.player.theme=name
}

const themeList = Object.keys(themes)
const themeNum = themeList.length