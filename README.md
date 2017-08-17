# fpl-api-node (Season 2017-18)

[![npm](https://img.shields.io/npm/v/fpl-api-node.svg)](https://www.npmjs.com/package/fpl-api-node)

A simple node API wrapper for the Fantasy Premier League (fantasy.premierleague.com) web apis. 

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

Please refer to the [Wiki for API docs](https://github.com/tgreyuk/fpl-api-node/wiki/API).

