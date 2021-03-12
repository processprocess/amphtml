/**
 * Copyright 2021 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @fileoverview Helper for amp-story rendering of page-attachment UI.
 */
import {LocalizedStringId} from '../../../src/localized-strings';
import {getLocalizationService} from './amp-story-localization-service';
import {htmlFor} from '../../../src/static-template';
import {isExperimentOn} from '../../../src/experiments';
import {setImportantStyles} from '../../../src/style';

/**
 * @param {!Element} element
 * @return {!Element}
 */
export const buildOpenDefaultAttachmentElement = (element) =>
  htmlFor(element)`
    <a class="
        i-amphtml-story-page-open-attachment i-amphtml-story-system-reset"
        role="button">
      <span class="i-amphtml-story-page-open-attachment-icon">
        <span class="i-amphtml-story-page-open-attachment-bar-left"></span>
        <span class="i-amphtml-story-page-open-attachment-bar-right"></span>
      </span>
      <span class="i-amphtml-story-page-open-attachment-label"></span>
    </a>`;

/**
 * @param {!Element} element
 * @return {!Element}
 */
export const buildOpenInlineAttachmentElement = (element) =>
  htmlFor(element)`
    <a class="
        i-amphtml-story-page-open-attachment i-amphtml-story-system-reset"
        role="button">
      <div class="i-amphtml-story-inline-page-attachment-chip">
        <div class="i-amphtml-story-inline-page-attachment-arrow"></div>
      </div>
    </a>`;

/**
 * Determines which open attachment UI to render.
 * @param {!Window} win
 * @param {!Element} pageEl
 * @param {!Element} attachmentEl
 * @return {!Element}
 */
export const renderPageAttachmentUI = (win, pageEl, attachmentEl) => {
  // return renderPageAttachmentExperiment(win, pageEl, attachmentEl);
  if (isPageAttachmentUiV2ExperimentOn(win)) {
    return renderPageAttachmentExperiment(win, pageEl, attachmentEl);
  } else {
    return renderDefaultPageAttachmentUI(pageEl, attachmentEl);
  }
};

/**
 * Renders default page attachment UI.
 * @param {!Element} pageEl
 * @param {!Element} attachmentEl
 * @return {!Element}
 */
const renderDefaultPageAttachmentUI = (pageEl, attachmentEl) => {
  const openAttachmentEl = buildOpenDefaultAttachmentElement(pageEl);
  // If the attachment is a link, copy href to the element so it can be previewed on hover and long press.
  const attachmentHref = attachmentEl.getAttribute('href');
  if (attachmentHref) {
    openAttachmentEl.setAttribute('href', attachmentHref);
  }

  const textEl = openAttachmentEl.querySelector(
    '.i-amphtml-story-page-open-attachment-label'
  );

  const openLabelAttr = attachmentEl.getAttribute('data-cta-text');
  const openLabel =
    (openLabelAttr && openLabelAttr.trim()) ||
    getLocalizationService(pageEl).getLocalizedString(
      LocalizedStringId.AMP_STORY_PAGE_ATTACHMENT_OPEN_LABEL
    );

  textEl.textContent = openLabel;
  return openAttachmentEl;
};

/**
 * Renders inline page attachment UI.
 * @param {!Window} win
 * @param {!Element} pageEl
 * @param {!Element} attachmentEl
 * @return {!Element}
 */
const renderPageAttachmentExperiment = (win, pageEl, attachmentEl) => {
  const openAttachmentEl = buildOpenInlineAttachmentElement(pageEl);

  // If the attachment is a link, copy href to the element so it can be previewed on hover and long press.
  const attachmentHref = attachmentEl.getAttribute('href');
  if (attachmentHref) {
    openAttachmentEl.setAttribute('href', attachmentHref);
  }

  // Append text and aria label.
  const openLabelAttr = attachmentEl.getAttribute('data-cta-text');
  const openLabel =
    (openLabelAttr && openLabelAttr.trim()) ||
    getLocalizationService(pageEl).getLocalizedString(
      LocalizedStringId.AMP_STORY_PAGE_ATTACHMENT_OPEN_LABEL
    );
  openAttachmentEl.setAttribute('aria-label', openLabel);
  if (openLabelAttr !== 'none') {
    const textEl = win.document.createElement('div');
    textEl.classList.add('i-amphtml-story-inline-page-attachment-label');
    openAttachmentEl.appendChild(textEl);
    textEl.textContent = openLabel;
  }

  // Append images if they are defined.
  const appendImageNode = (imgURL) => {
    const imgEl = win.document.createElement('div');
    imgEl.classList.add('i-amphtml-story-inline-page-attachment-img');
    setImportantStyles(imgEl, {
      'background-image': 'url(' + imgURL + ')',
    });
    return imgEl;
  };
  const chipNode = openAttachmentEl.querySelector(
    '.i-amphtml-story-inline-page-attachment-chip'
  );
  const arrowNode = openAttachmentEl.querySelector(
    '.i-amphtml-story-inline-page-attachment-arrow'
  );
  const openImgAttr1 = attachmentEl.getAttribute('cta-image');
  const openImgAttr2 = attachmentEl.getAttribute('cta-image-2');
  if (openImgAttr1) {
    chipNode.insertBefore(appendImageNode(openImgAttr1), arrowNode);
  }
  if (openImgAttr2) {
    chipNode.insertBefore(appendImageNode(openImgAttr2), arrowNode);
  }

  return openAttachmentEl;
};

/**
 * Returns true if new inline attachment UI is enabled.
 * @param {!Window} win
 * @return {boolean}
 */
export const isPageAttachmentUiV2ExperimentOn = (win) => {
  return isExperimentOn(win, 'amp-story-page-attachment-ui-v2');
};
