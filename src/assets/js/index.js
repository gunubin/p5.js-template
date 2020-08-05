/*!
 * Licence: MIT
 * Copyright (c) 2020 Shanord Inc.
 * https://shanord.com/
 */
/* @flow */
import {domLoaded} from './lib/promisfy'
import Time from './lib/Time'
import ComponentLifecycle from './lib/ComponentLifecycle'
import App from './components/App'


Time.create().start('init')

const applicationSequence = async () => {
  await domLoaded()

  const componentLifecycle = new ComponentLifecycle({
    '.js-app': App,
  })
  componentLifecycle.start()
}

applicationSequence()

