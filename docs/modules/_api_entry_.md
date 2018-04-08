[fpl-api-node](../README.md) > ["api/entry"](../modules/_api_entry_.md)


Methods relating to 'entries' (fpl managers).

**Usage:**

    fplapi.entries.getManagerDetails(123).then((data) => console.log(data));

---
# Functions
<a name="getgameweekhistory" id="getgameweekhistory"></a>

##  getGameweekHistory

► **getGameweekHistory**(entryId: *`number`*): `Promise`.<[Gameweek](../interfaces/_types_.gameweek.md)[]>



*Defined in api/entry.ts:55*



Returns a collection of picks for a specified event


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entryId | `number`   |  The id of entry |





**Returns:** `Promise`.<[Gameweek](../interfaces/_types_.gameweek.md)[]>





___

<a id="getmanagerdetails"></a>

##  getManagerDetails

► **getManagerDetails**(entryId: *`number`*): `Promise`.<[ManagerDetails](../interfaces/_types_.managerdetails.md)>



*Defined in api/entry.ts:34*



Returns entry summary / details.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entryId | `number`   |  The id of entry |





**Returns:** `Promise`.<[ManagerDetails](../interfaces/_types_.managerdetails.md)>





___

<a id="getmanagerstats"></a>

##  getManagerStats

► **getManagerStats**(entryId: *`number`*): `Promise`.<[ManagerStats](../interfaces/_types_.managerstats.md)>



*Defined in api/entry.ts:203*



Returns some general stats


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entryId | `number`   |  - |





**Returns:** `Promise`.<[ManagerStats](../interfaces/_types_.managerstats.md)>





___


<a id="getseasonpicks"></a>

##  getSeasonPicks

► **getSeasonPicks**(entryId: *`number`*): `Promise`.<[SeasonPick](../interfaces/_types_.seasonpick.md)[]>



*Defined in api/entry.ts:83*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entryId | `number`   |  - |





**Returns:** `Promise`.<[SeasonPick](../interfaces/_types_.seasonpick.md)[]>





___

<a id="gettransferhistory"></a>

##  getTransferHistory

► **getTransferHistory**(entryId: *`number`*): `Promise`.<[TransferHistory](../interfaces/_types_.transferhistory.md)[]>



*Defined in api/entry.ts:285*



Returns transfer history of an entry


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entryId | `number`   |  The id of entry |





**Returns:** `Promise`.<[TransferHistory](../interfaces/_types_.transferhistory.md)[]>





___

<a id="getusedchips"></a>

##  getUsedChips

► **getUsedChips**(entryId: *`number`*): `Promise`.<[Chip](../interfaces/_types_.chip.md)[]>



*Defined in api/entry.ts:44*



Returns chip details of a specified entry


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entryId | `number`   |  The id of entry |





**Returns:** `Promise`.<[Chip](../interfaces/_types_.chip.md)[]>





___


