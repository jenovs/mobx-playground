[![Build Status](https://travis-ci.org/jenovs/mobx-playground.svg?branch=master)](https://travis-ci.org/jenovs/mobx-playground)
[![codecov](https://codecov.io/gh/jenovs/mobx-playground/branch/master/graph/badge.svg)](https://codecov.io/gh/jenovs/mobx-playground)

## Mobx-playground

Simple app created to learn Mobx.

It consumes [CryptoCompare API](https://www.cryptocompare.com/api) to show [Crypto]currency exchange rates (refreshed every 11 seconds).
User can add and delete currency pairs, change the amount of currency, reorder items. Data is persisted in the browser's Local Storage.

It uses TypeScript, mostly to be able to use decorators without ejecting create-react-app (some types are still `any`).

Tests inspired by [this Pivotal blogpost](http://engineering.pivotal.io/post/tdd-mobx/).

### Installation

Clone/download repo, install dependencies with `npm i` then run `npm start` to start the app.
