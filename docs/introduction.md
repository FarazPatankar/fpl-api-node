# Documentation

A simple node API wrapper for the Fantasy Premier League (fantasy.premierleague.com) web apis. 

## API

The API is split into 3 core modules:

### [[entries]] »

Methods relating to FPL managers and their team entries:

```js
import { entries } from 'fpl-api-node';


entries.getManager(entryId).then((data) => console.log(data));

```

### [[leagues]] »

Lookup FPL classic leagues:

```js

import { leagues } from 'fpl-api-node';


entries.getClassicLeague(leagueId).then((data) => console.log(data));

```

### [[game]] »

Methods relating to genersl FPL game data such as players, teams and gameweeks:

```js

import { game } from 'fpl-api-node';


game.getPlayers().then((data) => console.log(data));

```

## Error Codes

### EFPLUPDATING

The game is updating and the web apis are not available.

### EFPLREQUESTNOTFOUND

The requested data was not found likely because some params were invalid.

### EFPLNORESPONSE

There was no response.

## TypeScript

* fpl-api-node is packaged with [TypeScript](http://www.typescriptlang.org/) interfaces.

## Cache

* Outgoing http requests are cached by default for 30 minutes. 
* Requests that will never change (such as finished gameweeks) will be cached forever.


