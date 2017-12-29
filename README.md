# cypress-hyperapp-unit-test

> Unit test [HyperApp](https://hyperapp.js.org/) components using [Cypress](https://www.cypress.io/)

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## TLDR

* What is this? This package allows you to use [Cypress](https://www.cypress.io/) test runner to unit test your Hyperapp components with zero effort. The component runs in the real browser with full power of Cypress E2E test runner: [live GUI, full API, screen recording, historical DOM snapshots, CI support, cross-platform](https://www.cypress.io/features/).

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save-dev cypress-hyperapp-unit-test
```

also requires peer dependencies

```sh
npm install cypress hyperapp
```

## API

```js
import { mount } from 'cypress-hyperapp-unit-test'
beforeEach(() => {
  mount(state, actions, view)
})
// you get fresh mini-app running in each test
```

## Use

In your Cypress spec files (this code is in [cypress/integration/hello-world-spec.js](cypress/integration/hello-world-spec.js)) mount the application, just like you would "normally".

```js
import { mount } from 'cypress-hyperapp-unit-test'
import { h } from 'hyperapp'
// view function we are testing
const view = (state, actions) =>
  h('div', { class: 'greeting' }, 'Hello, World'
describe('Hello World', () => {
  beforeEach(() => {
    const state = {}
    const actions = {}
    // no state or actions for this simple example
    mount(state, actions, view)
  })
  it('shows greeting', () => {
    // use any Cypress command - we have
    // real HyperApp application for testing
    cy.contains('.greeting', 'Hello, World')
  })
})
```

Start Cypress using `$(npm bin)/cypress open` and execute the spec. You have full end-to-end test run but with your component! Why waste time on unit testing if you could _see_ the result, _inspect_ the DOM, _investigate_ how it works using time-travelling debugger?

![Hello World shows greeting](images/hello-world.png)

## Repo organization

* [src/index.js](src/index.js) the main file implementing `mount`
* [components](components) different Hyper components for testing
* [cypress/integration](cypress/integration) example spec files showing  various test situations

## Examples

- [simple view function without any actions](cypress/integration/hello-world-spec.js)
- [components without and with actions](cypress/integration/hello-world-component-spec.js)
- [single TodoItem component](cypress/integrtion/todo-item-spec.js)

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-hyperapp-unit-test/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/cypress-hyperapp-unit-test.svg?downloads=true
[npm-url]: https://npmjs.org/package/cypress-hyperapp-unit-test
[ci-image]: https://travis-ci.org/bahmutov/cypress-hyperapp-unit-test.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/cypress-hyperapp-unit-test
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
