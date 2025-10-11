
let currentOrbs = ['quas', 'quas', 'quas']; 
const desiredSpell = document.getElementById('desiredSpell');
const keyPressSound = new Audio('./assets/Ui_buttonclick.mp3.mpeg');
const invokeSound = new Audio('./assets/Invoke.mp3.mpeg');
const scoreDisplay = document.getElementById('score');

 const spell_info = {
        'quas,quas,quas':   ['Cold Snap', './assets/icons/Cold_Snap_icon.png'],
        'quas,quas,wex':    ['Ghost Walk', './assets/icons/Ghost_Walk_icon.png'],
        'exort,quas,quas':  ['Ice Wall', './assets/icons/Ice_Wall_icon.png'],
        'wex,wex,wex':      ['E.M.P.', './assets/icons/E.M.P._icon.png'],
        'quas,wex,wex':     ['Tornado', './assets/icons/Tornado_icon.png'],
        'exort,wex,wex':    ['Alacrity', './assets/icons/Alacrity_icon.png'],
        'exort,quas,wex':   ['Deafening Blast', './assets/icons/Deafening_Blast_icon.png'],
        'exort,exort,quas': ['Forge Spirit', './assets/icons/Forge_Spirit_icon.png'],
        'exort,exort,exort':['Sun Strike', './assets/icons/Sun_Strike_icon.png'],
        'exort,exort,wex':  ['Chaos Meteor', './assets/icons/Chaos_Meteor_icon.png'],
};
let score = 0; 

keyPressSound.volume = 0.1;
invokeSound.volume = 0.1;

// TODO: ADD A SOUND SLIDER

// Listen for key presses
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    if (key === 'q' || key === 'w' || key === 'e') {
        castOrb(key);
        play(keyPressSound);
    }
    if (key === 'r') {
        invokeSpell(); 
        play(invokeSound);
    }
    
}

function play(sound) {
    sound.currentTime = 0;  // fixes sound delay when spamming
    sound.play();
}


// Update castedOrbs array 
function castOrb(key) {
    const orbMap = {
        'q': ['quas', './assets/icons/Quas_icon.png'],
        'w': ['wex', './assets/icons/Wex_icon.png'],
        'e': ['exort', './assets/icons/Exort_icon.png']
    };
    const name = orbMap[key][0];
    
    currentOrbs.shift();  // remove the oldest orb
    currentOrbs.push(name);  // add the new orb

    renderOrbs();

}

// renders the current state of the orbs in this file onto the html
function renderOrbs() {
    const orbImageMap = {
        'quas': './assets/icons/Quas_icon.png',
        'wex': './assets/icons/Wex_icon.png',
        'exort': './assets/icons/Exort_icon.png'
    };

    const orbsImg = document.querySelectorAll('.spell-orbs img');
    currentOrbs.forEach((name, index) => {
        orbsImg[index].name = name;
        orbsImg[index].src = orbImageMap[name];
    });

}

// Invoke spell based on casted orbs
function invokeSpell() {

    const orb_combination = [...currentOrbs].sort().join(',');  // sort since order does not matter e -> q -> w
    
    // update with invoked spell icon
    if (desiredSpell.name === spell_info[orb_combination][0]) {
        score += 1;
        scoreDisplay.textContent = `Score: ${score}`;
        console.log("Correct! Score: ", score);
    }
    else { return; }  // do nothing if the spell is incorrect
    
    // randomize new desired spell
    // get random spell from spell_info 
    const currSpell = desiredSpell.name;
    // keep randomizing until a new spell is found
    while (desiredSpell.name === currSpell) {   
        randomizeSpell(spell_info);
    }

    console.log(orb_combination, spell_info[orb_combination], score);

}

function randomizeSpell() {
    const spellKeys = Object.keys(spell_info);
    const randIndex = spellKeys[Math.floor(Math.random() * spellKeys.length)];

    desiredSpell.name = spell_info[randIndex][0];
    desiredSpell.src = spell_info[randIndex][1];
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    randomizeSpell();
}

