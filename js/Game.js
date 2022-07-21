class Game {
  constructor() {
    this.r=0
    this.color
  }
  //Fazendo referencia ao valor do gameState
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
 //Atualizando o gameState
  update(state) {
    database.ref("/").update({
      gameState: state
    })
    
  }

  
  start() {
    if(gameState==-2){
    player = new Player();
   playerCount = player.getCount();
    form = new Form();
    form.display();
  }
  }

  //Esconder o formulário
  handleElements() {
    form.hide();
  }

  //Criando os jogadores
  play() {
    this.handleElements();

    Player.getPlayersInfo();
    Monster.getMonstersInfo()

  
  for(var i=1;p.length!=playerCount;i++){
  this.sprite=createSprite(windowWidth/2, windowHeight/2,windowWidth/16, windowHeight/16)
  var pC1 = database.ref("players/player"+i+"/color1")
  pC1.on("value", data =>{var info1 = data.val()
    this.color = info1})
  var pC2 = database.ref("players/player"+i+"/color2")
  pC2.on("value", data =>{var info2 = data.val()
    this.color = info2})
  var pC3 = database.ref("players/player"+i+"/color3")
  pC3.on("value", data =>{var info3 = data.val()
    this.color = info3})
  console.log(this.color)
  this.sprite.shapeColor = rgb(this.color)
  this.sprite.setCollider("rectangle", 0, 0, windowWidth/16,windowHeight/16)
  p.push(this.sprite)
  }
  
  var indexp = 0;
for(var plr in allPlayers){
  var x=allPlayers[plr].positionX
  var y=allPlayers[plr].positionY
  if(p[indexp]!=undefined){
  p[indexp].position.x = x
  p[indexp].position.y = y
  indexp+=1
  }
}
var indexmm = 0;
if(gameState==1&&this.r==0){round = new Rounds();round.a=qdm;if(round.a>50){nl+=nl/2.25}}
/*if(m.length>0){
for(var plr in allMonsters){
  var x=allMonsters[plr].positionX
  var y=allMonsters[plr].positionY
  if(m[indexmm]!=undefined){
  m[indexmm].sprite.position.x = x
  m[indexmm].sprite.position.y = y
  indexmm+=1
  }
}
}*/
    }
    jnNpe(){
      if(gameState!=-2){
        clear()
        background(200,200,200);
        fill("red");textSize(25)
text("O jogo ja começou, você não pode mais entrar",windowWidth/2-windowWidth/4,windowHeight/2-windowHeight/4)
    fill("black")
    this.r=1}
    else{this.r=0}
}

  }

