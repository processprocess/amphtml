/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {TimestampDef, parseDate} from '../types/date';
import {devAssert, userAssert} from '../assert';

/** @typedef {function(string):!TimestampDef} */
let DateParserDef;

/**
 * Map from attribute names to their parsers.
 * @type {Object<string, !DateParserDef>}
 */
const dateAttrParsers = {
  'datetime': (datetime) =>
    userAssert(parseDate(datetime), 'Invalid date: %s', datetime),
  'end-date': (datetime) =>
    userAssert(parseDate(datetime), 'Invalid date: %s', datetime),
  'timeleft-ms': (timeleftMs) => Date.now() + Number(timeleftMs),
  'timestamp-ms': (ms) => Number(ms),
  'timestamp-seconds': (timestampSeconds) => 1000 * Number(timestampSeconds),
};

/**
 * @param {!Element} element
 * @param {!Array<string>} dateAttrs list of attribute names
 * @return {?TimestampDef}
 */
export function parseDateAttrs(element, dateAttrs) {
  const epoch = userAssert(
    parseEpoch(element, dateAttrs),
    'One of attributes [%s] is required',
    dateAttrs.join(', ')
  );

  const offsetSeconds =
    (Number(element.getAttribute('offset-seconds')) || 0) * 1000;
  return epoch + offsetSeconds;
}

/**
 * Parse epoch from list of possible element attributes, returning the first one
 * that is truthy.
 * @param {!Element} element
 * @param {!Array<string>} dateAttrs list of attribute names
 * @return {?TimestampDef}
 */
function parseEpoch(element, dateAttrs) {
  // Validate provided dateAttrs outside the loop so it will fail when an
  // invalid attr is provided, even if that attribute isn't present on the
  // element.
  /** @type {!Array<!DateParserDef>} */
  const parsers = dateAttrs.map((attrName) =>
    devAssert(
      dateAttrParsers[attrName],
      'Invalid date attribute "%s"',
      attrName
    )
  );

  for (let i = 0; i < dateAttrs.length; ++i) {
    const attrVal = element.getAttribute(dateAttrs[i]);
    if (attrVal) {
      return parsers[i](attrVal);
    }
  }

  return null;
}
