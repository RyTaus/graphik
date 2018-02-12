/*
  Component is the root of the program. everything that is rendered onto the
  svg is a component.

  Maybe this is component template, which can create a component from the given
  properties?? That way you can easily generate new Components.
*/

class Component {
  constructor(canvas, template, initialValues = {}) {
    this.canvas = canvas;
    this.svg = canvas.svg;
    this.id = Component.makeId(template.name);
    this.initialize(template.tag);

    this.children = [];

    // properties contains all the properties to a specific component and how
    // or if the render of the component changes on change.
    // prop: { value, update }
    this.properties = {};
    Object.keys(template.properties).forEach((key) => {
      this.properties[key].value = initialValues[key] || template.properties[key].value;
      this.properties[key].update = template.properties[key].update;
    });

    Object.keys(template.interactions).forEach((key) => {
      this.node.on(key, template.interactions[key].action);
    });

    this.interactions = template.interactions;
  }

  initialize(tag) {
    this.node = this.svg.append(tag).attr('id', this.id);
  }

  update(prop, value) {
    // What if prop doesnt exist??
    this.properties[prop].value = value;
    this.properties[prop].update(this.properties);
    return this;
  }

  addChild(component) {
    component.setParent(this);
    this.children.push(component);
    return this;
  }

  render() {
    this.properties.forEach(prop => prop.update(this.properties));
    return this;
  }
}

Component.idMap = {};
Component.makeId = (name) => {
  if (!Component.idMap[name]) {
    Component.idMap[name] = 0;
  }
  return `comp_${Component.idMap[name]++}`;
};

module.exports = Component;
