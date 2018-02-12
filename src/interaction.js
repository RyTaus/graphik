/*
  Interaction class handles events. Pretty much just a wrapped for d3's on that
  makes some things a bit easier.
*/
class Interaction {
  constructor(type, action, bubble) {
    this.type = type;
    this.bubble = bubble;
    this.action = action;
  }

  applyTo(component) {
    component.getNode().on(this.type, this.action);
  }
}

Interaction.type = {

};

module.exports = Interaction;
