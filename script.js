let gameScore= document.getElementById("score");
let gameStart=false;

let dino = document.getElementById("dino");
let dinoPosition=0;
let isJumping=false;

let background=document.getElementById("background");

function handleKeyUp(event){
    const acceptedKeys={
        32:spacePressed,
    }  
    const spaceFunction = acceptedKeys[event.keyCode];
    spaceFunction&&!isJumping?spaceFunction():null
}
function spacePressed(){
    console.log(gameStart)
    if(!gameStart){
        gameControl(true)
    }else{
        isJumping=true;
        let dinoJump=setInterval(()=>{
            if(gameStart){
                if(dinoPosition>=80){
                    clearInterval(dinoJump); 
                    let dinoDown=setInterval(()=>{
                        if(dinoPosition<=0){
                            clearInterval(dinoDown)
                            isJumping=false
                        }else{
                            dinoPosition-=15;
                            dino.style.bottom=`${dinoPosition}px`
                        }
                    },30)
                }else{
                    dinoPosition+=15;
                    dino.style.bottom=`${dinoPosition}px`;
                }
            }else{
                isJumping=false;
                clearInterval(dinoJump)
            }
        },30)
    }
}
function createCactus(){
    let cactusInterval
    if(gameStart){
        let randomTime=Math.random()*6000;
        let cactusPosition=620;

        const cactus=document.createElement("div");
        cactus.classList.add("cactus");
        cactus.style.left=`${cactusPosition}px`;
        background.appendChild(cactus)
        
        cactusInterval=setInterval(()=>{
            if(gameStart){
                if(cactusPosition<-60){
                    clearInterval(cactusInterval)
                    background.removeChild(cactus)
                }else if(cactusPosition>0 && cactusPosition<60 && dinoPosition<35){
                    clearInterval(cactusInterval)
                    gameControl(false)
                }else{
                    cactusPosition-=18;
                    cactus.style.left=`${cactusPosition}px`
                }
            }else{
                clearInterval(cactusInterval)
            }
        },30)
        setTimeout(createCactus,randomTime);
    }
}
function gameControl(verifier){
    let score=0;
    let backgroundPosition=525;
    if(verifier){
        if(document.getElementById("end-game-message")){
            background.innerHTML="";
            background.appendChild(gameScore);
            background.appendChild(dino);
            dino.id="dino"
            dinoPosition=0;
            dino.style.bottom=`${dinoPosition}px`
        }
        gameStart=true
        
        let gameLoop=setInterval(()=>{
            !gameStart?clearInterval(gameLoop):
            score++;
            gameScore.innerText=score;
        },100)

        let backgroundLoop=setInterval(() => {
            !gameStart?clearInterval(backgroundLoop):
            backgroundPosition-=12;
            background.style.backgroundPosition=`${backgroundPosition}px`
        }, 40);

        createCactus();
    }else{
        gameStart=false

        let endGameMessage=document.createElement("h3")
        endGameMessage.id="end-game-message"
        endGameMessage.innerText="Game Over"
        background.appendChild(endGameMessage)

        dino.id="dino-dead"
    }
}


document.addEventListener('keyup',handleKeyUp)
