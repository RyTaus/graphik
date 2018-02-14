const d3 = require('d3');

const Component = require('./../src/component.js');
const Canvas = require('./../src/canvas.js');
const Interaction = require('./../src/interaction.js');
const Template = require('./../src/template.js');


const svg = d3.select('svg');

const canvas = new Canvas(svg);

/**
* Enter Code Here:
*/

canvas.render();
