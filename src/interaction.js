/**
* Interaction class handles events. Pretty much just a wrapped for d3's on that
* The only requirement for an interaction is that it has a function applyTo.
* There are several Interactions built in.
*/
const d3 = require('d3');

const Component = require('./component.js');
/**
* Interaction class is the generic action class. This is used for most events
* such as click, mouseover, contex-menu, etc...
*/
class Interaction {
  constructor(type, action, bubble) {
    this.type = type;
    this.bubble = bubble;
    this.action = action;
  }

  applyTo(component) {
    component.node.on(this.type, this.action);
  }
}

/**
* Interaction.Drag is the default way to add a drag event.
*/
Interaction.Drag = class Drag {
  constructor(onStart = () => {}, onMove = () => {}, onEnd = () => {}) {
    this.type = 'drag';
    this.start = onStart;
    this.move = onMove;
    this.end = onEnd;
  }

  applyTo(component) {
    component.node.call(d3.drag()
      .on('start', () => this.start(component))
      .on('drag', () => this.move(component))
      .on('end', () => this.end(component))
    );
  }
};

/**
* Adding the draggable makes an element draggable.
*/
Interaction.Drag.draggable = () => new Interaction.Drag(
  () => {},
  (comp) => { comp.update('x', comp.properties.x + d3.event.dx); comp.update('y', comp.properties.y + d3.event.dy); },
  () => {}
);

/**
* Adding the spawn makes an element spawn the chosen component type, and then
* drag that when moving mouse in this drag function.
*/
Interaction.Drag.Spawn = class SpawnDrag {
  constructor(template, canvas) {
    this.component = new Component(template);
    this.canvas = canvas;
  }

  applyTo(component) {
    component.node.call(d3.drag()
      .on('start', () => {
        this.canvas.addComponent(this.component);
        this.component.update('x', component.properties.x);
        this.component.update('y', component.properties.y);
        this.component.render();
      })
      .on('drag', () => {
        console.log('dragging');
        this.component.update('x', this.component.properties.x + d3.event.dx);
        this.component.update('y', this.component.properties.y + d3.event.dy);
      })
    );
  }
};

Interaction.type = {

};

module.exports = Interaction;
