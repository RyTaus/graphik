/*
  A canvas manages an individual svg element. Components can be added to the
  canvas. Additionally, the canvas can hold certain implication of a user action
  to be fed to events;

*/
class Canvas {
  constructor(svg) {
    this.svg = svg;
    this.components = [];
  }

  addComponent(component) {
    this.components.push(component.addTo(this));
    return this;
  }

  render() {
    this.components.forEach(c => c.render());
  }
}

Canvas.event = {
  Drag: 'Drag'
};

module.exports = Canvas;
