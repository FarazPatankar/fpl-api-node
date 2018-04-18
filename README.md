# fpl-api-node

[![npm](https://img.shields.io/npm/v/fpl-api-node.svg)](https://www.npmjs.com/package/fpl-api-node)
[![Build Status](https://travis-ci.org/tgreyjs/fpl-api-node.svg?branch=master)](https://travis-ci.org/tgreyjs/fpl-api-node)
[![Greenkeeper badge](https://badges.greenkeeper.io/tgreyjs/fpl-api-node.svg)](https://greenkeeper.io/)

A simple node API wrapper for the Fantasy Premier League (fantasy.premierleague.com) web apis. 

## Installation

```js
npm install fpl-api-node --save
```

## Usage

```js
import {entries } from 'fpl-api-node';

entries.getManager(entryId).then((data) => console.log(data));
```

## Documentation

Further usage and API details can be found at http://www.gitbook.com.
