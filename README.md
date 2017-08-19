# fpl-api-node

[![npm](https://img.shields.io/npm/v/fpl-api-node.svg)](https://www.npmjs.com/package/fpl-api-node)
[![Build Status](https://travis-ci.org/tgreyuk/fpl-api-node.svg?branch=master)](https://travis-ci.org/tgreyuk/fpl-api-node)
[![Greenkeeper badge](https://badges.greenkeeper.io/tgreyuk/fpl-api-node.svg)](https://greenkeeper.io/)

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

## API

Please refer to the [Wiki for API docs](https://github.com/tgreyuk/fpl-api-node/wiki).

## Other 

### Caching

There is in-built request caching currently set to 2 hours but looking at options to make this more intelligent.


### TypeScript

fpl-api-node is packaged with [TypeScript](http://www.typescriptlang.org/) definitions.





