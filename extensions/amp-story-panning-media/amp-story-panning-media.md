---
$category@: media
formats:
  - stories
teaser:
  text: >-
    Transition an image's position and zoom between pages.
draft:
  - true
tags:
  - immersive
  - panning
  - zooming
  - animation
  - media
  - transitions
author: processprocess
toc: true
$title: amp-story-panning-media
version: '0.1'
versions:
  - '0.1'
latest_version: '0.1'
is_current: true
$path: /documentation/components/amp-story-panning-media.html
$localization:
  path: '/{locale}/documentation/components/amp-story-panning-media.html'
scripts:
  - >-
    <script async custom-element="amp-story-panning-media"
    src="https://cdn.ampproject.org/v0/amp-story-panning-media-0.1.js"></script>
layouts:
  - Fill
---

<!---
Copyright 2021 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<figure class="centered-fig">
  <amp-anim alt="amp-story-panning-media example" width="304" height="548" layout="fixed" src="https://raw.githubusercontent.com/processprocess/amphtml/panning-media-docs/extensions/amp-story-panning-media/img/amp-story-panning-media.gif">
    <noscript>
    <img alt="amp-story-panning-media example" src="https://raw.githubusercontent.com/processprocess/amphtml/panning-media-docs/extensions/amp-story-panning-media/img/amp-story-panning-media.gif" />
  </noscript>
  </amp-anim>
</figure>

The `amp-story-panning-media` component provides a way to pan and zoom an image between pages in [Web Stories](https://amp.dev/documentation/guides-and-tutorials/start/create_successful_stories/?format=stories).

## Usage

Use the `amp-story-panning-media` to transition an image between pages. The component can animate between position and zoom.

### Environment setup

Add the following script tag to the head of your Web Story:

```html
<script async custom-element="amp-story-panning-media" src="https://cdn.ampproject.org/v0/amp-story-panning-media-0.1.js"><script>
```

#### Configuration

The `amp-story-panning-media` component accepts 1 descendant. This descendant must be an [amp-img](https://amp.dev/documentation/components/amp-img/?format=stories). Components transition between pages when their child has the same `src` value.

```html
<amp-story-page>
  <amp-story-grid-layer>
    <amp-story-panning-media layout="fill" x="-10%" y="-20%" zoom=".8">
      <amp-img layout="fill" src="assets/world-map.jpg" width="4000" height="3059" ></amp-img>
    </amp-story-panning-media>
  </amp-story-grid-layer>
</amp-story-page>

<amp-story-page>
  <amp-story-grid-layer>
    <amp-story-panning-media layout="fill" x="20%" y="30%" zoom="2">
      <amp-img layout="fill" src="assets/world-map.jpg" width="4000" height="3059" ></amp-img>
    </amp-story-panning-media>
  </amp-story-grid-layer>
</amp-story-page>
```

## Attributes

### x (optional)

Specifies the horizontal position in percentage.  
Centered on 0 (default) with positive values moving the image to the right (50% centering left edge of image) and negative to the left (-50% centering right edge of image).

### y (optional)

Specifies the vertical position in percentage.
Centered on 0 (default) with positive values moving the image down (50% centering top edge of image) and negative upward (-50% centering bottom edge of image).

### zoom (optional)

Specifies the level of zoom.
The default is 1. This corresponds to the image fitting the viewport with [`layout=fill`](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/?format=stories).
A higher value scales the image up (zooms in). A lower value scales the image down (zooms out).

### lock-bounds (optional)

Prevents the image from panning beyond the viewport. When using `lock-bounds` `width` and `height` must be specified on the `amp-img` child.

## Demos

With these components we wanted to help users create more entertaining and immersive experiences, and to facilitate that, we have created demos with good use cases of the components. Feel free to ~~steal~~ implement any ideas from these demos into your own stories (or check the source code).

<table>
  <tr>
   <td><strong>The Northern Sky Constellations:</strong> This story uses a star chart for the entire story by panning and zooming into different constellations. A parallax transition effect is also acheived by layering two png star images with transparency.
<br><br>
<a href="https://philipbell-panning-media.web.app/examples/amp-story/northern-sky-constellations.html">The Northern Sky Constellations</a>
   </td>
<td>
<img src="https://raw.githubusercontent.com/processprocess/amphtml/panning-media-docs/extensions/amp-story-panning-media/img/constellations-screenshot.jpg">
   </td>
  </tr>
<tr>
<td>
<img src="https://raw.githubusercontent.com/processprocess/amphtml/panning-media-docs/extensions/amp-story-panning-media/img/controls.jpg">
   </td>
   <td>Story featuring sliders to modify the attributes of the panning-media component on the current page. This is an example of how a gui in a creation tool could configure the component.
<br><br>
<a href="https://philipbell-panning-media.web.app/examples/amp-story/controls.html">https://webstoriesinteractivity-beta.web.app/animals-polls.html</a>
   </td>
</tr>
</table>

You can check the roadmap in https://github.com/ampproject/amphtml/projects/121

## FAQ

**Can we have more than one component per page?**

Yes, the components will automatically be associated with each other by sharing the same `src` value.

**I have found a bug or have questions / comments / issues, how do I contact you?**

If you have found a bug or have an issue request, file a [Github issue](https://github.com/ampproject/amphtml/issues?q=is%3Aissue+is%3Aopen+label%3A%22WG%3A+stories%22+) and tag the @ampproject/wg-stories working group.

For questions / disscusion, join the [amp-story slack channel](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#discussion-channels) and ping us!.

## Validation

This component is still under development. Validation details will be defined before launch.