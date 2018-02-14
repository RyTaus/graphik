const Component = require('./component.js');

class Template {
  /**
  * A template is effectively a listing of the properties you want a type of
  * component to have as well as the interactions or events.
  * @param {String, String} name is what the class of objects is called, also
  *   the elements will be syled aaccording to that class. tag is the html tag
  *   of the element.
  */
  constructor(name, tag) {
    this.name = name;
    this.properties = {};
    this.interactions = {};
    this.tag = tag;
  }

  /**
  * set the default value a component should take for a property if not specified
  * upon creation of the component
  */
  setDefault(prop, value) {
    this.properties[prop].value = value;
    return this;
  }

  /**
  * add a property to the component.
  * @param {String, Function} prop should be the name of the property. update
  *   is the function that is called when the value of the component is updated.
  *   Defaults to setting the attr of the html element equal to the new value.
  */
  addProperty(prop, update) {
    // Should I check to see if there is already a prop w that name?
    this.properties[prop] = {
      value: undefined,
      update: update || Template.renderFunction.self(prop)
    };
    return this;
  }

  /**
  * Add an interaction (event), to the template. Only one interaction of type.
  */
  addInteraction(interaction) {
    // Maybe have a list of interactions that are all handled??
    this.interactions[interaction.type] = interaction;
    return this;
  }
  /**
  * Create a component with the specified initial values.
  * @param {Object} initialValues is the initial values of the properties of the
  *   component generated.
  */
  generate(initialValues) {
    return new Component(this, initialValues);
  }
}

/**
* The ibject that holds the built in update functions.
*   * self: set the attribute to the value of the property.
*/
Template.renderFunction = {
  self: name =>
    comp => comp.node.attr(name, comp.properties[name])
};


module.exports = Template;
