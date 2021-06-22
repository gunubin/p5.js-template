/*!
 * Licence: MIT
 * Copyright (c) 2020 Shanord Inc.
 * https://shanord.com/
 */
const {draw, setup} = require(`./sketches/${process.sketchName}`)

window.setup = setup
window.draw = draw
