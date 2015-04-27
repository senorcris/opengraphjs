# OpenGraphJS

OpenGraphJS builds a JSON object from a web page which follows the [Open Graph Protocol](http://ogp.me). The JavaScript object returned by this library contains important metadata such as the description, image, and title.

[![Code Climate](https://codeclimate.com/github/senorcris/opengraphjs/badges/gpa.svg)](https://codeclimate.com/github/senorcris/opengraphjs)
[![Build Status](https://travis-ci.org/senorcris/opengraphjs.svg)](https://travis-ci.org/senorcris/opengraphjs)

### Installation
```
npm install opengraphjs
```

### Expected ouput

#### Sample
```js
{ 
  title: 'Open Graph protocol',
  type: 'website',
  url: 'http://ogp.me/',
  description: 'The Open Graph protocol enables any web page to become a rich object in a social graph.',
  image: [{ 
    url: 'http://ogp.me/logo.png',
    type: 'image/png',
    width: '300',
    height: '300' 
  }]
}
```

#### Supported properties
<table class="tg">
  <tr>
    <th class="tg-031e">Property Name</th>
    <th class="tg-031e">JS Name</th>
    <th class="tg-031e">Type</th>
    <th class="tg-031e">Description</th>
  </tr>
  <tr>
    <td class="tg-031e">og:title</td>
    <td class="tg-031e">title</td>
    <td class="tg-031e">string</td>
    <td class="tg-031e">title set in og:title, if missing uses the page's title tag </td>
  </tr>
  <tr>
    <td class="tg-031e">og:type</td>
    <td class="tg-031e">type</td>
    <td class="tg-031e">string</td>
    <td class="tg-031e">open graph type for the current document</td>
  </tr>
  <tr>
    <td class="tg-031e">og:url</td>
    <td class="tg-031e">url</td>
    <td class="tg-031e">string</td>
    <td class="tg-031e">sharable url to content</td>
  </tr>
  <tr>
    <td class="tg-031e">og:description</td>
    <td class="tg-031e">description</td>
    <td class="tg-031e">string</td>
    <td class="tg-031e">describes the media/page being shared</td>
  </tr>
  <tr>
    <td class="tg-031e">og:determiner</td>
    <td class="tg-031e">determiner</td>
    <td class="tg-031e">string</td>
    <td class="tg-031e"></td>
  </tr>
  <tr>
    <td class="tg-031e">og:locale</td>
    <td class="tg-031e">locale</td>
    <td class="tg-031e">object</td>
    <td class="tg-031e">has two properties, `name` which contains the default locale <br>and `alternate` which is an array of strings with additional locales</td>
  </tr>
  <tr>
    <td class="tg-031e">og:site_name</td>
    <td class="tg-031e">siteName</td>
    <td class="tg-031e">string</td>
    <td class="tg-031e"></td>
  </tr>
  <tr>
    <td class="tg-031e">og:image</td>
    <td class="tg-031e">image</td>
    <td class="tg-031e">array</td>
    <td class="tg-031e">Array of objects <br><br>Properties:<br>- url (always present)<br>- secureUrl (optional)<br>- width (optional)<br>- height (optional)</td>
  </tr>
  <tr>
    <td class="tg-031e">og:video</td>
    <td class="tg-031e">video</td>
    <td class="tg-031e">array</td>
    <td class="tg-031e">Array of objects <br><br>Properties:<br>- url (always present)<br>- secureUrl (optional)<br>- width (optional)<br>- height (optional)</td>
  </tr>
  <tr>
    <td class="tg-031e">og:audio</td>
    <td class="tg-031e">audio</td>
    <td class="tg-031e">array</td>
    <td class="tg-031e">Array of objects <br><br>Properties:<br>- url (always present)<br>- secureUrl (optional)</td>
  </tr>
</table>

### Usage

#### Promise support
- Its easy, if you are using a version of node with Promises you are ready to go!
- Other versions of node:
  - define `global.Promise = require('bluebird');`
  - Feel free to substitute Bluebird with your perferred promise library

```js
// Include it
var ogjs = require('opengraphjs');
// Pass in a URL
ogjs({ url: 'http://senorcris.com' })
  .then(function (data) {
    console.log(data); // some share data parsed from metatags..
  }, function (err) {
    console.log('It seems that we have fumbled with an error', err);
  });
```

#### Callbacks
```js
// Include it
var ogjs = require('opengraphjs');
// Pass in a URL
ogjs({ url: 'http://senorcris.com' }, function (err, data) {
    if (err) {
      console.log('It seems that we have fumbled with an error', err);
      return;
    }
    
    console.log(data); // some share data parsed from metatags..
  });
```

### Credits and Acknowledgements
- Inspired by [openGraphScraper ](https://github.com/jshemas/openGraphScraper)
