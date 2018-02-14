/*
  Component is the root of the program. everything that is rendered onto the
  svg is a component.

  Maybe this is component template, which can create a component from the given
  properties?? That way you can easily generate new Components.
*/

class Component {
  constructor(template, initialValues = {}) {
    this.id = Component.makeId(template.name);
    this.name = template.name;
    this.tag = template.tag;
    this.interactions = template.interactions;


    this.children = [];

    this.properties = {};
    this.updates = {};

    Object.keys(template.properties).forEach((key) => {
      this.properties[key] = initialValues[key] || template.properties[key].value;
      this.updates[key] = template.properties[key].update;
    });
  }

  addTo(canvas) {
    this.node = canvas.svg.append(this.tag).attr('id', this.id);
    Object.keys(this.interactions).forEach((key) => {
      this.interactions[key].applyTo(this);
      this.node.on(key, () => this.interactions[key].action(this));
    });
    // delete this.interactions;
    return this;
  }

  /**
  * This function updates a property to the value, then calls the perspective update function.
  * @param {String, Any}
  * @returns {Component}
  */
  update(prop, value) {
    // What if prop doesnt exist??
    // console.log(prop, this.updates[prop]);
    this.properties[prop] = value;
    this.updates[prop](this);
    return this;
  }

  addChild(component) {
    component.setParent(this);
    this.children.push(component);
    return this;
  }

  render() {
    Object.keys(this.properties).forEach(
      (prop) => {
        this.updates[prop](this);
      }
    );
    this.node.classed(this.name, true);
    return this;
  }
}

Component.idMap = {};
Component.makeId = (name) => {
  if (!Component.idMap[name]) {
    Component.idMap[name] = 0;
  }
  return `${name}_${Component.idMap[name]++}`;
};

module.exports = Component;
