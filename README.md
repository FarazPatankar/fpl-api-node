# fpl-api-node

[![Greenkeeper badge](https://badges.greenkeeper.io/tgreyuk/fpl-api-node.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/tgreyuk/fpl-api-node.svg?branch=master)](https://travis-ci.org/tgreyuk/fpl-api-node)
[![npm](https://img.shields.io/npm/v/fpl-api-node.svg)](https://www.npmjs.com/package/fpl-api-node)

A simple node API wrapper for the Fantasy Premier League (fantasy.premierleague.com) web apis, updated for the 2017/18 season. 

## Installation

```js
npm install fpl-api-node --save
```

## Usage

```js
import * as fplapi from 'fpl-api-node';

fplapi.findEntry(entryId).then((data) => console.log(data));
```

## Documentation

Please refer to the [Wiki for further documentation](https://github.com/tgreyuk/fpl-api-node/wiki).

