/*
  A template describes a set of functionality and look that can be used across
  multiple components.

*/
const Component = require('./component.js');

class Template {
  // props should be list of
  //   { key: {value, update} } if affects render
  //   or { key: value } if doesnt affect render
  // Maybe split these up into constants and dynamic objects?
  constructor(name) {
    this.name = name;
    this.properties = {};
    this.interactions = {};
    this.tag = null;
  }

  setTag(tag) {
    this.tag = tag;
  }

  addProperty(prop, value, update) {
    // Should I check to see if there is already a prop w that name?
    this.properties[prop] = {
      value,
      update
    };
  }

  addInteraction(interaction) {
    this.interactions[interaction.type] = interaction;
  }

  generate(canvas, initialValues) {
    return new Component(canvas, this, initialValues);
  }
}

module.exports = Template;
