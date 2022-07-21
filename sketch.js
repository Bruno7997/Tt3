var canvas;
var p=[], Y=0
var m = [],mL=[], buls = [], bulsD=[]
var r = 1
var dx=[],dy=[]
var score=0
var indexX=1,indexY=1,indexL=0
var qdm = 1, Round = 0, nl=1,Boss=0,X=-1
var database, gameState=-2;
var form, player,mons, playerCount=0
var allPlayers,allMonsters
var round
var pi
var monsterIndex, indexm=1
var mpy=[0,0,0],mpx=[0,0,0]
var d=1
//GameState : -2=Espera por jogadores; -1=PERDEU; 0=pause; 1=start
function preload() {
  
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(200,200,200);
  //Cor do personagem e Nome mostrados
  if(gameState==-2&&player.color==null){
    textSize(70)
    fill("red")
    text(form.inputN.value(),width/2 - textSize()*2, height/2-height/2.5)
    form.showColor()
    //Parar de mostrar
  }else{form.sprite.remove()}
  if(gameState!=-2){form.res()}
  //Pontuação
textSize(windowHeight/50)
if(gameState==1){
  if(m.length<9&&round.a>0){
    round.rounds()
  }
  
  //Pontuação
  text("Pontuação: "+score,windowWidth/2,windowHeight/2-windowHeight/2.5)
    //Interface
    text("Rodada: "+Round+"\nInimigos restantes: "+m.length+"\nBosses: "+Boss+"\nVida: "+nl.toFixed(2),windowWidth/2,windowHeight/2-windowHeight/2.75)
  //Movimento
  if(keyIsDown(RIGHT_ARROW)){player.positionX+=1.5;player.move(); }
  else if(keyIsDown(LEFT_ARROW)){player.positionX-=1.5;player.move(); }
  if(keyIsDown(DOWN_ARROW)){player.positionY+=1.5;player.move(); }
  else if(keyIsDown(UP_ARROW)){player.positionY-=1.5;player.move(); }
  
  //Monstros
for (var i=0;i<m.length;i++){
  if(player.index!=null){
  //Perseguir o jogador mais perto
if(m[i].sprite.position.x>p[player.index-1].position.x){mpx[2]=m[i].sprite.position.x-p[player.index-1].position.x;mpx[3]=player.index-1}
else if(m[i].sprite.position.x<p[player.index-1].position.x){mpx[2]=p[player.index-1].position.x-m[i].sprite.position.x;mpx[3]=player.index-1}
if(m[i].sprite.position.x>p[m.indexX].position.x){mpx[1]=m[i].sprite.position.x-p[m.indexX].position.x;mpx[3]=player.index-1}
else if(m[i].sprite.position.x<p[m.indexX].position.x){mpx[1]=p[m.indexX].position.x-m[i].sprite.position.x;mpx[3]=player.index-1}
if(mpx[2]<mpx[1]){mpx[0]=mpx[3]}
else{mpx[0]=mpx[3]}

if(m[i].sprite.position.y>p[player.index-1].position.y){mpy[2]=m[i].sprite.position.y-p[player.index-1].position.y;mpy[3]=player.index-1}
if(m[i].sprite.position.y<p[player.index-1].position.y){mpy[2]=p[player.index-1].position.y-m[i].sprite.position.y;mpy[3]=player.index-1}
if(m[i].sprite.position.y>p[m.indexY].position.y){mpy[1]=m[i].sprite.position.y-p[m.indexX].position.y;mpy[3]=player.index-1}
if(m[i].sprite.position.y<p[m.indexY].position.y){mpy[1]=p[m.indexX].position.y-m[i].sprite.position.y;mpy[3]=player.index-1}
if(mpy[2]<mpy[1]){mpy[0]=mpy[3]}
else{mpy[0]=mpy[3]}
  //Velocidade
  m[i].speed(p[mpx[0]].position.x,p[mpy[0]].position.y,(i+1))
  //Radar (distancia entre o cinza e o preto mais proximo)
  if(r==1){
  if(m.length>0){
if(m[i].sprite.position.x>p[player.index-1].position.x){dx[i+1]=m[i].sprite.position.x-p[player.index-1].position.x;xx=1}
if(m[i].sprite.position.x<p[player.index-1].position.x){dx[i+1]=p[player.index-1].position.x-m[i].sprite.position.x;xx=-1}
if(dx[indexX]>dx[i+1]){indexX=i+1}
dx[0]=dx[indexX]
if(m[i].sprite.position.y>p[player.index-1].position.y){dy[i+1]=m[i].sprite.position.y-p[player.index-1].position.y;yy=-1}
if(m[i].sprite.position.y<p[player.index-1].position.y){dy[i+1]=p[player.index-1].position.y-m[i].sprite.position.y;yy=1}
if(dy[indexY]>dy[i+1]){indexY=i+1}
dy[0]=dy[indexY]
}else{dx=0;dy=0}
  radar(xx,yy)
}}
  //Colisão com o jogador
  if(m[i].sprite.collide(p[player.index-1])){retirarJ(mpx[3])}
}
//Balas
for (var i=0;i<buls.length;i++){
  buls[i].update(i)
  //Destruir balas
  if(buls[i].sprite.position.x>windowWidth || buls[i].sprite.position.x<0 || buls[i].sprite.position.y>windowHeight || buls[i].sprite.position.y<0){buls[i].Destroy(i)}
  //Colisão bala <=> monstro
  if(m.length>0&&buls.length>0){
  if(buls[i].sprite.collide(m[indexL].sprite)){
    indexm-=1,buls[i].Destroy(i);m[indexL].Life(indexL);indexL=0
  }
  if(i>=buls.length-1){
    indexL+=1
  }
  if(indexL>=m.length){
    indexL=0
  }
}
}
}
//gameState = 0/-1 => faça:
if(m.length==0){indexL=0
  for(var b=0;b<buls.length;b+=1){buls[b].Destroy(b)}

}
  if(gameState==0){game.r=0;text("Aperte A,W,S,D para atirar\nAperte as setas ↓, ←, →, ↑ para andar\nAperte R para ativar/desativar o radar\nAperte Z para ativar/desativar o tiro na diagonal (anti-horario)\nAssim: \t↓ => ↘, ← => ↙, → => ↗, ↑ => ↖\nAperte espaço para começar/terminar a rodada",windowWidth/2-windowWidth/4,windowHeight/2-windowHeight/4)}
  
  if (gameState === 0||gameState==1){game.play();}
  drawSprites()
}

function keyPressed() {
  
  //Esc => recomeçar
  if(keyCode==27){
    game.update(-2)
    playerCount = 0;
    player.index = playerCount;
    player.updateCount(playerCount)
    var ref = database.ref("players")
    ref.remove()
    var ref = database.ref("monsters")
    ref.remove()
    var ref = database.ref("Bullets")
    ref.remove()
    form.res();player.res()
    //Recomeçando o jogo (chama o setup)
    setup()
  }
  //Enter
  if(gameState==-2&&keyCode==13){game.update(0)}
  //Espaço:
  
  //Sem monstro => gameState = 0
if(m.length==0&&keyCode==32&&gameState==1){game.update(0);qdm+=qdm/5}
else if(gameState==0&&keyCode==32){game.update(1);}
  if(gameState==1){
  //W:
if(keyCode===87&&X!=1){var bul = new Bullet(p[player.index-1].position.x,p[player.index-1].position.y,0,-2,d);buls.push(bul)}
  //S:
if(keyCode===83&&X!=1){var bul = new Bullet(p[player.index-1].position.x,p[player.index-1].position.y,0,2,d);buls.push(bul)}
  //A:
if(keyCode===65&&X!=1){var bul = new Bullet(p[player.index-1].position.x,p[player.index-1].position.y,-2,0,d);buls.push(bul)}
  //D:
if(keyCode===68&&X!=1){var bul = new Bullet(p[player.index-1].position.x,p[player.index-1].position.y,2,0,d);buls.push(bul)}

//Contrario do Relogio
//W:
if(keyCode===87&&X==1){var bul = new Bullet(p[player.index-1].position.x,p[player.index-1].position.y,-2,-2,d);buls.push(bul)}
  //S:
if(keyCode===83&&X==1){var bul = new Bullet(p[player.index-1].position.x,p[player.index-1].position.y,2,2,d);buls.push(bul)}
  //A:
if(keyCode===65&&X==1){var bul = new Bullet(p[player.index-1].position.x,p[player.index-1].position.y,-2,2,d);buls.push(bul)}
  //D:
if(keyCode===68&&X==1){var bul = new Bullet(p[player.index-1].position.x,p[player.index-1].position.y,2,-2,d);buls.push(bul)}
}

//X: Ativar/Desativar tiro na diagonal
if(keyCode==90){X=-X}
//R: Radar
if(keyCode===82){r=-r}
}
function radar(mx,my){
fill("red");textSize(windowHeight/50);stroke(200,200,200);strokeWeight(0.5)
  text(Math.round(dx[0]*mx)+"  /  "+Math.round(dy[0]*my),windowWidth/2,windowHeight/2-windowHeight/2.25)
}
function retirarJ(i){
  p[i].remove();p.splice(i,1)
  var ref = database.ref("players/player"+(i+1))
   ref.remove()
   player.updateCount((playerCount-1))
  if(playerCount==0){
  game.update(-1)
  var ref = database.ref("monsters")
    ref.remove()
  for(var b=0;b<buls.length;b+=1){buls[b].Destroy(b)}
  for(var b=0;b<m.length;b+=1){m[b].Destroy(b);}
}
}
