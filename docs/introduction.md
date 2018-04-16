# API 

* [[entries]]: functions covering manager etc.
* [[leagues]]: functions to get league information.
* [[game]]: general game data reating to players, teams and events.
 
# TypeScript

fpl-api-node includes [TypeScript](http://www.typescriptlang.org/) definitions.

<!--
# Errors

There are 3 error scenarios.

* NOT_FOUND
* UPDATING
* ERROR
* -->

# Cache

Any outgoing http requests are cached for 30 mins. Stale data suh as past gameweeks will be cached forever. 

