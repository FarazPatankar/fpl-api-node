# fpl-api-node (Season 2017-18)

[![npm](https://img.shields.io/npm/v/fpl-api-node.svg)](https://www.npmjs.com/package/fpl-api-node)

**Please note this library is currently being re-written in anticipation for the 2017-2018 season.**

A node API wrapper for the Fantasy Premier League (fantasy.premierleague.com) web apis. 

## Getting Started

```js
npm install fpl-api-node --save
```

### Typescript

The package includes TypeScript definitions

```js
import * as fplapi from 'fpl-api-node';
```

### Javascript

```js
const fplapi = require('fpl-api-node');
```

## Usage

### Entries

```js
fplapi.entries.getSummary(545548).then((data)=>{
    // handle data
    console.log(data);
});
```


## API

Documentation is being updated for 2017-2018 season.
