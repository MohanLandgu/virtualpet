//Create variables here
var dog,dogimage,happydogimage,database,firebase,foods,foodStock;

function preload()
{
	//load images here
  dogimage=loadImage("images/dogimg.png")
  happydogimage=loadImage("images/dogimg1.png")
}

function setup() {
	createCanvas(500, 500);
  database =firebase.database();
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  foodStock.set(20);

  dog=createSprite(250,350,10,60)
  dog.addImage(dogimage)
  dog.scale =0.2;
}


function draw() { 
  background("green") 
  if(foods!== undefiend){
     
    textSize(20)
    fill(255)
    text("Note :Press UP ARROW  to feed Drago Milk",50,50)
    text("Food Remaining : "+foods,150,150)

      
    if(keyWentDown(UP_ARROW)){

      writeStock(foods)
      dog.addImage(happydogimage)
    }

    if(keyWentUp(UP_ARROW)){

      dog.addImage(dogimage)
    }

    if(foods === 0){

       foods =20 
    }


    drawSprites();
    
  } 
}

function writeStock(x){

  if(x<=0){

    x=0
  }
  else{

    x= x-1
  }
  database.ref('/').update({
    Food:x
  })
}

function readStock(data){
  foods = data.val();
}

