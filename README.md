# fpl-api-node

[![npm](https://img.shields.io/npm/v/fpl-api-node.svg)](https://www.npmjs.com/package/fpl-api-node)
[![Build Status](https://travis-ci.org/tgreyjs/fpl-api-node.svg?branch=master)](https://travis-ci.org/tgreyjs/fpl-api-node)
[![Greenkeeper badge](https://badges.greenkeeper.io/tgreyjs/fpl-api-node.svg)](https://greenkeeper.io/)

A simple node API wrapper for the Fantasy Premier League (fantasy.premierleague.com) web apis, updated for the 2017/18 season. 

## Installation

```js
npm install fpl-api-node --save
```

## Usage

```js
const fplapi = require('fpl-api-node');

fplapi.entries.getManagerDetails(entryId).then((entry) => console.log(entry));
```

## Documentation

Please refer to the [Wiki for API documentation](https://github.com/tgreyjs/fpl-api-node/wiki).
