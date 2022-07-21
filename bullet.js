class Bullet{
constructor(x,y,vx,vy,d){
    this.d=d
    this.sprite=createSprite(x,y,windowWidth/32, windowHeight/32)
    this.sprite.shapeColor="yellow"
    this.sprite.setVelocity(vx,vy)
    this.sprite.setCollider("rectangle", 0, 0, windowWidth/32, windowHeight/32)
    bulsD.push(d)
    var bulletIndex = "Bullets/"+player.name+"/b"+buls.length;
      database.ref(bulletIndex).set({
        positionX: x,
        positionY: y,
        damage: this.d,
      })
}

Destroy(i){
    console.log(i)
    buls[i].sprite.remove();buls.splice(i,1)
    var ref = database.ref("Bullets/"+player.name+"/b"+(i+1))
    ref.remove()
}
update(i){
    var bulletIndex = "Bullets/"+player.name+"/b"+i;
      database.ref(bulletIndex).set({
        positionX: this.sprite.position.x,
        positionY: this.sprite.position.y,
        damage: this.d,
      })
}
}