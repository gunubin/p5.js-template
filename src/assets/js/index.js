/*!
 * Licence: MIT
 * Copyright (c) 2020 Shanord Inc.
 * https://shanord.com/
 */
/* @flow */
import {domLoaded} from './lib/promisfy'
import ComponentLifecycle from './lib/ComponentLifecycle'
import App from './components/App'


const applicationSequence = async () => {
  await domLoaded()

  const componentLifecycle = new ComponentLifecycle({
    // '.js-app': App,
  })
  componentLifecycle.start()
}

applicationSequence()

