function jumpSoundEffect(){
    var audio = new Audio('./sounds/jump.wav');
    audio.volume = .3
    audio.play();
}

function attackSoundEffect(){
    var audio = new Audio('./sounds/attack.mp3');
    audio.volume = .3
    audio.play();
}

function doorSoundEffect(){
    var audio = new Audio('./sounds/door.mp3');
    audio.volume = .3
    audio.play();
}

function ballSh() {
    let canvas = document.getElementById('canva')
    if (canvas.className === 'shake' ){
        canvas.classList.remove("shake");
        canvas.classList.add("shakee")
        
    }else {
        canvas.classList.remove("shakee")
        canvas.classList.add("shake")
    };
    
}

window.addEventListener('keydown', (event) => {

    if(player.preventInput) return

    switch (event.key){
        case 'w':
            
            for(let i =0; i < doors.length; i++){
                const door = doors[i]

                if(
                    player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width && 
                    player.hitbox.position.x >= door.position.x && 
                    player.hitbox.position.y + player.hitbox.height >= door.position.y && 
                    player.hitbox.position.y <= door.position.y + door.height
                ){
                    player.velocity.x = 0
                    player.velocity.y = 0
                    player.preventInput = true
                    player.switchSprite('enterDoor')
                    audio.paused ? '' : doorSoundEffect()
                    door.play()
                    return
                }
            }

            if(player.velocity.y === 0 ) {
                player.velocity.y = -15
                audio.paused ? '' : jumpSoundEffect()
            }
        break
        
        case 'a':
            // move player to the left
            keys.a.pressed = true
        break

        case 'd':
            // move player to the right
            keys.d.pressed = true
        break

        case 'm':
            audio.paused ? audio.play() : audio.pause();
            changeImage()
            soundButton.style.opacity = "1"
            setTimeout(function(){
                soundButton.style.opacity = "0";
            }, 2 * 1000);
        break

        case ' ':
           
            if(player.lastDirection === 'left'){
                player.preventInput = true
                player.switchSprite('attackLeft')
            }
            else if(player.lastDirection === 'right'){
                player.preventInput = true
                player.switchSprite('attack')
            }else {
                player.preventInput = true
                player.switchSprite('attack') 
            }

            audio.paused ? '' : attackSoundEffect()
            
            ballSh()
        break

    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key){
       
        case 'a':
            // move player to the left
            keys.a.pressed = false
        break

        case 'd':
            // move player to the right
            keys.d.pressed = false
        break
    }
})