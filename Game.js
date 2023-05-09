/** Variable declaration first */
let health = 100;
let xp = 0;
let gold = 50;
let currentWeapon = 0;
let fighting = 0;
let monsterHealth;
let inventory = ["stick"]; /*USing array to store different weapons*/

// Creating Javascript access to HTML elements so I can work with them.
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xptext = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText= document.querySelector("#monsterHealth");

//Update function  array to store locations, WE use objects
const locations = [
    {
        name: "town square",
        "button text": ["Go to Store", "Go to Cave", "Fight Dragon!"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"!",
    },
    {
        name:"store",
        "button text":["Buy 10 health (10 Gold)", "Buy Weapon (30 Gold)", "Go to town square" ],
        "button functions":[buyHealth, buyWeapon, goTown],
        text: "You entered the Store!",
    },
    {
        name:"cave",
        "button text":["Fight evil demon", "Fight fanged beast", "Go to town square" ],
        "button functions":[FightDemon, FightBeast, goTown],
        text: "You entered the cave. You are surrounded by monsters.",

    },
    {
        name: "fight",
        "button text":["Attack", "Dodge", "Run" ],
        "button functions":[attack, dodge, goTown],
        text: "You are fighting a monster!",


    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square!"],
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold'
    },
    {
        name: "lose",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: 'You die.💀'
    },
    {
        name: "win",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, easterEgg],
        text: 'You defeat the dragon! YOU WIN THE GAME! 😸',
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: 'You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number matches one of the random numbers, you win!',
    }
];

// Const to store weapons
const weapons = [ 
    {
        name: "stick",
        power: 5,
    },
    {
        name: "dagger",
        power: 30,
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100,
    },
];


// Monsters
const monsters = [
    {
        name: "demon",
        level: 2,
        health: 25,
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60,
    },
    {
        name: "dragon",
        level: 20,
        health: 300,
    },
]

// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Functions
function update(locations) {
    monsterStats.style.display = "none";
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];
    button1.onclick = locations["button functions"][0];
    button2.onclick = locations["button functions"][1];
    button3.onclick = locations["button functions"][2];
    text.innerText = locations.text;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
   update(locations[2]);
}


function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "Purchased!";
    }else{
        text.innerText = "You don't have enough gold to purchase health!";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1){ //Minus one because index order, so now we access all existing elements!
        if (gold >= 30){
            gold -= 30;
            currentWeapon ++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = `You know own a ${newWeapon}!`;
            inventory.push(newWeapon); //adding elements to inventory array.
            text.innerText = `You know own a ${newWeapon}! In your inventory you have: ${inventory}!`;
        }else {
            text.innerText = "You don't have enough gold to purchase a weapon!";
        }
    } else {
        text.innerText = "You already bought all weapons!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellweapon;

    }

    
}

function sellweapon () {
    if (inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift(); //let can be used out a code block, while var it is only locally
        text.innerText = `You sold a ${currentWeapon}.`;
        text.innerText = `In your inventory you have: ${inventory}`;
    }else {
        text.innerText = "Don't dare to sell your only weapon!";
    }
}

function FightDemon() {
    fighting = 0;
    goFight();

}

function FightBeast() {
    fighting = 1;
    goFight();

}

function fightDragon() {
    fighting = 2;
    goFight();

}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block"; //We update stat from display non, to block
    // in this way we can use it to be displayed when fighting a monster.
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = `The monster ${monsters[fighting].name} attacks!`;
    text.innerText = `You attack it with your ${weapons[currentWeapon].name}.`;
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level); // check function cxomment
    }else {
        text.innerText += "You miss.";
    }
    healthText.innerText = health;
    // substracting from the moster's health the power of the weapon having in count
    // the experience. we will have a random number between0 and 1 , we round the whole number tothe floor.
    // we take 0 and 1 becuase at the beggining our exp is 0.
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) +1;
    monsterHealthText.innerText = monsterHealth;

    if (health <= 0) {
        healthText.innerText = 0;
        lose();
    }else if (monsterHealth <= 0) {
        monsterHealthText.innerText = "0";
        // avoid using another if by usiung ternary operator!
        fighting === 2 ? winGame() : defeatMonster();
    }

    if (Math.random() <= .1 && inventory.length !== 1) { 
        // if this is true, the current weapon is removed form the inventory.
        text.innerText += `Your ${inventory.pop()} breaks!`
        currentWeapon --;
    }
}

function dodge() {
    text.innerText = `You dodge the attack from the ${monsters[fighting].name}.`
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText= gold;
    xptext.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xptext.innerText = xp;
    goTown();
}

function getMonsterAttackValue (level){
    // This functino takes the monster's level in order to calculate the damaged based on level

    let hit = (level * 5) - (Math.floor(Math.random()* xp));
    
    console.log(hit);

    return hit; //returning the result of the ecuation's result.
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20 // 20 percent of the time
    // returns true if meath random is greather than .2
    // pr player health is lower than 20.
}

function easterEgg () {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    let numbers = [];
    
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = `You picked ${guess}. Here the random numbers: \n`;

    for (let i = 0; i < 10; i ++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.indexOf(guess) !== -1) { //looking for the index of the guess number inside our numbers array.
        text.innerText += `Right! You win 20 gold!`;
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText = "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}
