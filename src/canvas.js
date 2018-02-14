/**
* A canvas manages an individual svg element. Components can be added to the
* canvas. Additionally, the canvas can hold certain implication of a user action
* to be fed to events;
*/
class Canvas {
  /**
  * create a graphik canvas to interact and draw on the diven svg.
  * @param {Selection} svg should be a d3 selection of an svg.
  * @returns {canvas}
  */
  constructor(svg) {
    this.svg = svg;
    this.components = [];
  }

  addComponent(component) {
    this.components.push(component.addTo(this));
    return this;
  }
  /**
  * Everything is drawn via the render funciton. However, components have their
  * own render funciton, so don't call this unless you have changed components.
  * This wipes the canvas and starts new.
  */
  render() {
    // TODO wipe the canvas??
    this.components.forEach(c => c.render());
  }
}

Canvas.event = {
  Drag: 'Drag'
};

module.exports = Canvas;
