class Hero {
    constructor(name,hp){
        this.name = name;
        this.hp = hp;
        this.canFly = false;
        this.shield = false;
    }

    attacked(damage){
        if(this.canFly){
            let chance = Math.random();
            if(chance > 0.5){
                console.log(this.name + " flew away");
                damage = 0;
            }
        }

        if(this.shield){
            damage *= 0.8;
            console.log(this.name + " defends with a shield");
        }

        this.hp -= damage;
        console.log(this.name + " has been attacked. hp reduced by " + damage + ". hp remaining: " + this.hp + ".");
    }
}

class Vigilantes extends Hero{
    constructor(name, hp){
        super(name, hp);
        this.shield = true;
    }
    attack(otherHero){
        let damage = 10;
        console.log(this.name + " attacked with damage: " +  damage + ".");
        otherHero.attacked(damage);
    }
}

class Shapeshifter extends Hero{
    constructor(name, hp){
        super(name, hp);
        this.canFly = true;
    }
    attack(otherHero){
        let damage = 15;
        console.log(this.name + " attacked with damage: " + damage + ".");
        otherHero.attacked(damage);
    }
}

class Witch extends Hero{
    constructor(name, hp){
        super(name, hp);
        this.shield = true;
        this.canFly = true;
    }
    attack(otherHero){
        let damage = 5;
        console.log(this.name + " attacked with damage: " + damage + ".");
        otherHero.attacked(damage);
    }
}

class Fight{
    constructor(hero1, hero2){
        this.hero1 = hero1;
        this.hero2 = hero2;
        this.turn = 0;
    }

    performAttack(){
        if(this.turn === 0){
            this.hero1.attack(this.hero2);
        } else {
            this.hero2.attack(this.hero1);
        }
    }

    changeTurn(){
        this.turn = 1 - this.turn;
    }
    
    findWinner() {
        let winner = '';
        if(this.hero1.hp > 0) {
            winner = `${this.hero1.name} won the battle with ${this.hero1.hp} HP left!`;
            console.log(winner);
            return winner;
        } else if (this.hero2.hp > 0) {
            winner = `${this.hero2.name} won the battle with ${this.hero2.hp} HP left!`;
            console.log(winner);
            return winner;
        } else {
            winner = `No heroes left alive.`;
            console.log(`No heroes left alive.`);
            return winner;
        }
    }

    go(){
        do{
            this.performAttack();
            this.changeTurn();
        } while(this.hero1.hp > 0 && this.hero2.hp > 0);

        this.findWinner();
    }
}

const showHeroesButton = document.getElementById("show-heroes");
const startFightButton = document.getElementById("start-fight");
const heroesContainer = document.querySelector(".heroes-container");
const winnerText = document.getElementById("show-winner");
const containerOnClick = document.querySelectorAll(".hero-container");
let vigilantes = new Vigilantes("Robin", 50);
let shapeshifter = new Shapeshifter("Beastboy", 40);
let witch = new Witch("Raven", 60);

let selectedHeroes = [];

function handleHeroSelection(heroContainer) {
  if (selectedHeroes.length < 2) {
    heroContainer.classList.toggle("selected");

    const heroName = heroContainer.querySelector(".hero-name").textContent;
    const selectedHeroIndex = selectedHeroes.indexOf(heroName);
      if (selectedHeroIndex === -1) {
      selectedHeroes.push(heroName);
    } else {
      selectedHeroes.splice(selectedHeroIndex, 1);
    }
  }
}

containerOnClick.forEach(containerOnClick => {
  containerOnClick.addEventListener("click", () => {
      containerOnClick.classList.toggle("clicked");
  });
});

const heroContainers = document.querySelectorAll(".hero-container");
heroContainers.forEach((heroContainer) => {
  heroContainer.addEventListener("click", () => {
    handleHeroSelection(heroContainer);
  });
});

showHeroesButton.addEventListener("click", function () {
  heroesContainer.classList.toggle("hidden");
  showHeroesButton.classList.add("hidden");
  startFightButton.classList.remove("hidden");
});

startFightButton.addEventListener("click", function () {
  if (selectedHeroes.length !== 2) {
    alert("You must select 2 heroes for the Epic Fight!");
  } else {
    startFightButton.classList.add("hidden");
    winnerText.classList.remove("hidden");

    const hero1Name = selectedHeroes[0];
    const hero2Name = selectedHeroes[1];

    const hero1 = getHeroByName(hero1Name);
    const hero2 = getHeroByName(hero2Name);

    const epicFight = new Fight(hero1, hero2);
    epicFight.go();

    // Afișează eroul câștigător în elementul "winnerText"
    winnerText.textContent = epicFight.findWinner();
  }
});

function getHeroByName(name) {
    if (name === "Robin") {
        return vigilantes;
    } else if (name === "Raven") {
        return witch;
    } else if (name === "BeastBoy") {
        return shapeshifter;
    } 
    return null;
}