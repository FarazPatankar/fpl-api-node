[fpl-api-node](../README.md) > ["api/league"](../modules/_api_league_.md)



# External module: "api/league"


Methods relating to the leagues in general.

**Usage:**

    fplapi.entries.getClassicLeague(leagueId).then((data) => console.log(data));

## Index

### Functions

* [getClassicLeague](_api_league_.md#getclassicleague)
* [getClassicLeagueStandings](_api_league_.md#getclassicleaguestandings)



---
## Functions
<a id="getclassicleague"></a>

###  getClassicLeague

► **getClassicLeague**(leagueId: *`number`*): `Promise`.<[ClassicLeague](../interfaces/_types_.classicleague.md)>



*Defined in api/league.ts:24*



Returns specified details of a classic league


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| leagueId | `number`   |  The id of the league |





**Returns:** `Promise`.<[ClassicLeague](../interfaces/_types_.classicleague.md)>





___

<a id="getclassicleaguestandings"></a>

###  getClassicLeagueStandings

► **getClassicLeagueStandings**(leagueId: *`number`*, pageNumber?: *`number`*): `Promise`.<[ClassicLeagueStandings](../interfaces/_types_.classicleaguestandings.md)>



*Defined in api/league.ts:34*



Returns specified standings of a classic league


**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| leagueId | `number`  | - |   The id of the league |
| pageNumber | `number`  | 1 |   The page number of the standings (50 results per page) |





**Returns:** `Promise`.<[ClassicLeagueStandings](../interfaces/_types_.classicleaguestandings.md)>





___


