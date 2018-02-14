const Component = require('./component.js');
const Canvas = require('./canvas.js');
const Interaction = require('./interaction.js');

class Graphik {
  constructor() {
    this.name = 'hi';
  }

  addComponent(component) {
    this.components.push(component);
  }
}

Graphik.Component = Component;
Graphik.Canvas = Canvas;
Graphik.Interaction = Interaction;

module.exports = Graphik;
