const canvas = document.querySelector('canvas')
const soundButton = document.getElementById('music')
const audio = document.getElementById('audio')
const c = canvas.getContext('2d')

canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576
audio.volume = 0.05

let parsedCollisions
let collisionblocks
let backgroud
let doors 

function changeImage(){
    
    if(soundButton.src.match("img/svg/sound-svgrepo-com.svg")){
        soundButton.src = "img/svg/mute-svgrepo-com.svg"
        audio.pause()
    } else {
        soundButton.src = "img/svg/sound-svgrepo-com.svg"
        audio.play()
    }
    
}

const player = new Player({
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: './img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: './img/king/runLeft.png',
        },
        attack: {
            frameRate: 3,
            frameBuffer: 6,
            loop: false,
            imageSrc: './img/king/attack.png',
            onComplete: () => {
                player.switchSprite('idleRight')
                player.preventInput = false
            }
        },
        attackLeft: {
            frameRate: 3,
            frameBuffer: 6,
            loop: false,
            imageSrc: './img/king/attackLeft.png',
            onComplete: () => {
                player.switchSprite('idleLeft')
                player.preventInput = false
            }
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 8,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
            
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    
                    onComplete: () => {
                        level ++
                        if (level === 4 ) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {opacity: 0, delay: 1})
                        
                    }
                })
            },
        },
    }
})


let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionblocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionblocks

            if(player.currentAnimation){
                player.currentAnimation.isActive = false
            }

            backgroud = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel1.png'
            })

            doors = [
                new Sprite({
                    position:{
                        x: 767,
                        y: 270,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 10,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
            collisionblocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionblocks
            player.position.x = 96
            player.position.y = 140


            if(player.currentAnimation){
                player.currentAnimation.isActive = false
            }

            backgroud = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel2.png'
            })

            doors = [
                new Sprite({
                    position:{
                        x: 772,
                        y: 336,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 10,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D()
            collisionblocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionblocks
            player.position.x = 750
            player.position.y = 180

            if(player.currentAnimation){
                player.currentAnimation.isActive = false
            }

            backgroud = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel3.png'
            })

            doors = [
                new Sprite({
                    position:{
                        x: 176,
                        y: 335,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 10,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    }
}


const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    space: {
        pressed: false,
    }
}

const overlay = {
    opacity: 0,
    delay: 2,
}

function animate(){
    window.requestAnimationFrame(animate)

    backgroud.draw()
    // collisionblocks.forEach((collisionblock) => {
    //     collisionblock.draw()
    // })

    doors.forEach((door) => {
        door.draw()
    })
    // c.fillRect(player.position.x, player.position.y, player.width, player.height)
    // c.fillStyle = 'red'
    player.handleInput(keys)
    player.draw()
    player.update()
    
    c.save()
    c.globalAlpha = overlay.opacity
    c.globalAlpha = overlay.delay
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()
}

levels[level].init()
animate()