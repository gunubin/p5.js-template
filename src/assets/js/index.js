/*!
 * Licence: MIT
 * Copyright (c) 2020 Shanord Inc.
 * https://shanord.com/
 */
import {domLoaded} from './lib/promisfy'
import ComponentLifeCycle from './lib/ComponentLifeCycle'
// import {draw, setup} from './sketches/sketch'
import {draw, setup} from './sketches/exp'
// import {draw, setup} from './sketches/marchingSquares'

window.setup = setup
window.draw = draw

const applicationSequence = async () => {
  await domLoaded()
  // do something
  const componentLifeCycle = new ComponentLifeCycle(
    {},
    {
      // '.js-test': Test,
    },
  )

  componentLifeCycle.start()

}

applicationSequence()

