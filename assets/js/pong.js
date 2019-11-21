  
//devloped by joseph san nicolas

var canvas;
var ctx;
var ballX = 0;
var ballY = 32;
var ballspeedX = 5;
var ballspeedY = 5;
var Plyer_1score = 0;
var AI_Player2score = 0;
var paddlePlyer1 = 0;
var paddleAIPlayer2 = 0;
const paddle_width = 5;
const paddle_height = 40;
// getting the mouse
function relativeMousePos(evt){
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement
    var mouseX = evt.clientX - rect.left - root.scrollLeft
    var mouseY = evt.clientY - rect.top - root.scrollTop
    return{
        x:mouseX,
        y:mouseY
    }
}
var Pong =() =>{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    //this is the frames per second divided by 1 second.
    const fps = 60;
    //this is a set interval with the functions needed to draw and move 
    setInterval(function(){
        console.log(ballX)
        move();
        draw();
    },1000/fps);
    canvas.addEventListener("mousemove",function(evt){
        var mousePos = relativeMousePos(evt);
        paddlePlyer1 = mousePos.y-paddle_height/2;
        //paddleAIPlayer2 = mousePos.y - paddle_height/2;
    })
}

//ball logic 
function Computerlogic_mover(){
    var paddleCenter = paddleAIPlayer2 + (paddle_height/2)
    if(paddleCenter < ballY - 10){
        paddleAIPlayer2 += 4;
    }else if(paddleCenter < ballY +10){
        paddleAIPlayer2 -=10;
    }
}
function move(){
    Computerlogic_mover();
    ballX += ballspeedX;
    ballY += ballspeedY;
    if(ballX >= canvas.width){
        if(ballY > paddleAIPlayer2 && 
            ballY < paddleAIPlayer2 + paddle_height){
                 ballspeedX = -ballspeedX;
             }else{
                 ballreset()
                 AI_Player2score += 1;

             }
    }
    if(ballX < 0){
        if(ballY > paddlePlyer1 && 
           ballY < paddlePlyer1 + paddle_height){
                ballspeedX = -ballspeedX;
            }else{
                ballreset()
                Plyer_1score += 1;
            }
    }
    if(ballY >= canvas.height){
        ballspeedY = -ballspeedY;
    }
    if(ballY < 0){
        ballspeedY = -ballspeedY;
    }
    console.log(ballX)
}
function ballreset(){
    ballspeedX = -ballspeedX;
    ballX = canvas.width/2
    ballY = canvas.height/2
}
// draw declarations
function draw() {
    //makes a background black and resetting the last frame
    drawrect(0,0,canvas.width,canvas.height,"black");

    //draws the paddle
    drawrect(5,paddlePlyer1,paddle_width,paddle_height,"white")

    // draws the computers paddle
    drawrect(canvas.width-10,paddleAIPlayer2,paddle_width,paddle_height,"white")
    
    //draws the ball
    drawarc(ballX,ballY,5,0,Math.PI*2,true,"red");

    //score title
    drawScore("score",canvas.width/2,10,60,"white")

    // score player1
    drawScore("Player1:"+Plyer_1score,20,10,50,"red")

    //ai score
    drawScore("Player2:"+AI_Player2score,canvas.width-50,10,50,"red")

    
    
}
//simpler way to declare a draw
function drawarc(x,y,gx,gy,arc,bool,color){
    ctx.fillStyle = color;
    ctx.beginPath()
    ctx.arc(x,y,gx,gy,arc,bool);
    ctx.fill()
}
// lazy way to draw the paddles XD
function drawrect(x,y,sizex,sizey,color){
    ctx.fillStyle = color;
	ctx.fillRect(x,y,sizex,sizey);
}
function drawScore(text,x,y,width,color){
    ctx.fillStyle = color;
    ctx.fillText(text,x,y,width)
}