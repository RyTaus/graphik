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
  constructor(name, tag) {
    this.name = name;
    this.properties = {};
    this.interactions = {};
    this.tag = tag;
  }

  setTag(tag) {
    this.tag = tag;
    return this;
  }

  setDefault(prop, value) {
    this.properties[prop].value = value;
    return this;
  }

  addProperty(prop, update) {
    // Should I check to see if there is already a prop w that name?
    this.properties[prop] = {
      value: undefined,
      update: update || Template.renderFunction.self(prop)
    };
    return this;
  }

  addInteraction(interaction) {
    this.interactions[interaction.type] = interaction;
    return this;
  }

  generate(canvas, initialValues) {
    return new Component(canvas, this, initialValues);
  }
}

Template.renderFunction = {
  self: name => {
    return comp => {
      console.log(name, comp);
      return comp.node.attr(name, comp.properties[name])
    }
  }
};

// .addProperty('y', (d) => d.node.attr('y', d.properties.y.value), 0);


module.exports = Template;
