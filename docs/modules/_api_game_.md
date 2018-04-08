[fpl-api-node](../README.md) > ["api/game"](../modules/_api_game_.md)



# External module: "api/game"


Methods relating to the game in general.

**Usage:**

    fplapi.entries.getPlayers().then((data) => console.log(data));

## Index

### Functions

* [getGameweeks](_api_game_.md#getgameweeks)
* [getPlayerTypes](_api_game_.md#getplayertypes)
* [getPlayers](_api_game_.md#getplayers)
* [getPlayersStatsByGameweek](_api_game_.md#getplayersstatsbygameweek)
* [getSummary](_api_game_.md#getsummary)
* [getTeams](_api_game_.md#getteams)



---
## Functions
<a id="getgameweeks"></a>

###  getGameweeks

► **getGameweeks**(): `Promise`.<`Gameweek`[]>



*Defined in api/game.ts:70*



Returns a collection of all events




**Returns:** `Promise`.<`Gameweek`[]>





___

<a id="getplayertypes"></a>

###  getPlayerTypes

► **getPlayerTypes**(): `Promise`.<[PlayerType](../interfaces/_types_.playertype.md)[]>



*Defined in api/game.ts:62*



Returns a collection of all element types in the game




**Returns:** `Promise`.<[PlayerType](../interfaces/_types_.playertype.md)[]>





___

<a id="getplayers"></a>

###  getPlayers

► **getPlayers**(): `Promise`.<[Player](../interfaces/_types_.player.md)[]>



*Defined in api/game.ts:42*



Returns a collection of all elements.




**Returns:** `Promise`.<[Player](../interfaces/_types_.player.md)[]>





___

<a id="getplayersstatsbygameweek"></a>

###  getPlayersStatsByGameweek

► **getPlayersStatsByGameweek**(gameweek: *`number`*): `Promise`.<[PlayerStatsMap](../interfaces/_types_.playerstatsmap.md)>



*Defined in api/game.ts:51*



Returns all element data for a specified event


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| gameweek | `number`   |  The event number |





**Returns:** `Promise`.<[PlayerStatsMap](../interfaces/_types_.playerstatsmap.md)>





___

<a id="getsummary"></a>

###  getSummary

► **getSummary**(): `Promise`.<[GameSummary](../interfaces/_types_.gamesummary.md)>



*Defined in api/game.ts:28*



Returns the total number of entries




**Returns:** `Promise`.<[GameSummary](../interfaces/_types_.gamesummary.md)>





___

<a id="getteams"></a>

###  getTeams

► **getTeams**(): `Promise`.<[Team](../interfaces/_types_.team.md)[]>



*Defined in api/game.ts:78*



Returns a collection of all teams




**Returns:** `Promise`.<[Team](../interfaces/_types_.team.md)[]>





___


