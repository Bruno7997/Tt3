class Monster{
    constructor(x,y,w,h,c){
        this.X=0
        this.Y=0
    this.sprite = createSprite(x,y,w,h)
    this.sprite.shapeColor = c
    this.sprite.setCollider("rectangle", 0, 0, w,h)
    //this.sprite.debug=true
    this.indexX=null
    this.indexY=null
    var monsterIndex = "monsters/monster" + indexm;
    database.ref(monsterIndex).set({
      positionX: x,
      positionY: y,
    });
    
}
speed(px,py,i){
if(this.sprite.position.x>=px){this.X=-1}else if(this.sprite.position.x<=px){this.X=1}
if(this.sprite.position.y>=py){this.Y=-1}else if(this.sprite.position.y<=py){this.Y=1}
this.sprite.setVelocity(this.X,this.Y)


if(i<indexm){
    var monsterIndex = "monsters/monster"+i
    database.ref(monsterIndex).update({
       positionX: this.sprite.position.x,
       positionY: this.sprite.position.y,
     });
}

}
Destroy(i){

    m[i].sprite.remove();m.splice(i,1);var ref = database.ref("monsters/monster"+(i+1));ref.remove()
    score++
}
Life(i){
    mL[i]-=1
    if(mL[i]<=0){
        mL.splice(i,1);m[i].Destroy(i)
    }
}
static getMonstersInfo(){
    var monsterInfoRef=database.ref("monsters");
    monsterInfoRef.on("value", data=>{
      allMonsters=data.val()
    })
    }
}