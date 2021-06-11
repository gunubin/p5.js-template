/*!
 * Licence: MIT
 * Copyright (c) 2020 Shanord Inc.
 * https://shanord.com/
 */
/* @flow */
import {domLoaded} from './lib/promisfy'


const applicationSequence = async () => {
  await domLoaded()
  // do something
}

applicationSequence()

