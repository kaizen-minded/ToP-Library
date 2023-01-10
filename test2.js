function Hero(name, level) {
  this.name = name;
  this.level = level;
}

Hero.prototype.greet = function () {
  return `${this.name} says hello.`;
};

function Warrior(name, level, weapon) {
  // Chain constructor with call
  Hero.call(this, name, level);

  // Add a new property
  this.weapon = weapon;
}

// Initialize Healer constructor
function Healer(name, level, spell) {
  Hero.call(this, name, level);

  this.spell = spell;
}

[Warrior, Healer].forEach((user) => {
  Object.setPrototypeOf(user.prototype, Hero.prototype);
});

Warrior.prototype.attack = function () {
  return `${this.name} attacks with the ${this.weapon}.`;
};
Healer.prototype.heal = function () {
  return `${this.name} casts ${this.spell}.`;
};

const hero1 = new Warrior("Bjorn", 1, "axe");
const hero2 = new Healer("Kanin", 1, "cure");

console.log(hero1.hasOwnProperty("name"));
console.log(hero1.greet());
console.log(hero2.greet());
console.log(hero1.attack());
console.log(hero2.heal());
