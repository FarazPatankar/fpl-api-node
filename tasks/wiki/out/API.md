

## Methods

<a name="findEntry"></a>
### findEntry

Returns entry summary.

#### ►  findEntry(entryId):```Promise```.&lt;[Entry](#type_Entry)&gt;

```js
fplapi.findEntry(entryId).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|entryId|number|

#### Returns:
Promise.&lt;[Entry](#type_Entry)&gt;

___
<a name="findEntryGameweek"></a>
### findEntryGameweek

Returns a details of a specified gameweek

#### ►  findEntryGameweek(entryId, gameweek):```Promise```.&lt;[EntryGameweek](#type_EntryGameweek)&gt;

```js
fplapi.findEntryGameweek(entryId, gameweek).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|entryId|number|
|gameweek|number|

#### Returns:
Promise.&lt;[EntryGameweek](#type_EntryGameweek)&gt;

___
<a name="findEntryPicksByGameweek"></a>
### findEntryPicksByGameweek

Returns a collection of picks for a specified gameweek

#### ►  findEntryPicksByGameweek(entryId, gameweek):```Promise```.&lt;[EntryPick](#type_EntryPick)[]&gt;

```js
fplapi.findEntryPicksByGameweek(entryId, gameweek).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|entryId|number|
|gameweek|number|

#### Returns:
Promise.&lt;[EntryPick](#type_EntryPick)[]&gt;

___
<a name="findEntryTransferHistory"></a>
### findEntryTransferHistory

Returns transfer history of an entry

#### ►  findEntryTransferHistory(entryId):```Promise```.&lt;[EntryTransferHistory](#type_EntryTransferHistory)[]&gt;

```js
fplapi.findEntryTransferHistory(entryId).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|entryId|number|

#### Returns:
Promise.&lt;[EntryTransferHistory](#type_EntryTransferHistory)[]&gt;

___
<a name="findPlayers"></a>
### findPlayers

Returns a collection of all players.

#### ►  findPlayers():```Promise```.&lt;[Player](#type_Player)[]&gt;

```js
fplapi.findPlayers().then((data) => console.log(data));
```

#### Returns:
Promise.&lt;[Player](#type_Player)[]&gt;

___
<a name="findPlayer"></a>
### findPlayer

Returns stats for a specified player.

#### ►  findPlayer(playerId):```Promise```.&lt;[Player](#type_Player)&gt;

```js
fplapi.findPlayer(playerId).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|playerId|number|

#### Returns:
Promise.&lt;[Player](#type_Player)&gt;

___
<a name="findPlayerStatsByGameweek"></a>
### findPlayerStatsByGameweek

Returns a stats for a specified gameweek

#### ►  findPlayerStatsByGameweek(playerId, gameweek):```Promise```.&lt;[PlayerStats](#type_PlayerStats)&gt;

```js
fplapi.findPlayerStatsByGameweek(playerId, gameweek).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|playerId|number|
|gameweek|number|

#### Returns:
Promise.&lt;[PlayerStats](#type_PlayerStats)&gt;

___
<a name="findGameweeks"></a>
### findGameweeks

Returns a collection of all gameweeks

#### ►  findGameweeks():```Promise```.&lt;[Gameweek](#type_Gameweek)[]&gt;

```js
fplapi.findGameweeks().then((data) => console.log(data));
```

#### Returns:
Promise.&lt;[Gameweek](#type_Gameweek)[]&gt;

___
<a name="findGameweek"></a>
### findGameweek

Returns a specific gameweek

#### ►  findGameweek(gameweek):```Promise```.&lt;[Gameweek](#type_Gameweek)&gt;

```js
fplapi.findGameweek(gameweek).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|gameweek|number|

#### Returns:
Promise.&lt;[Gameweek](#type_Gameweek)&gt;

___
<a name="findTeams"></a>
### findTeams

Returns a collection of all teams

#### ►  findTeams():```Promise```.&lt;[Team](#type_Team)[]&gt;

```js
fplapi.findTeams().then((data) => console.log(data));
```

#### Returns:
Promise.&lt;[Team](#type_Team)[]&gt;

___
<a name="findTeam"></a>
### findTeam

Returns a specified team

#### ►  findTeam(teamId):```Promise```.&lt;[Team](#type_Team)&gt;

```js
fplapi.findTeam(teamId).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|teamId|number|

#### Returns:
Promise.&lt;[Team](#type_Team)&gt;

___
<a name="getTotalNumberOfEntries"></a>
### getTotalNumberOfEntries

Returns the total number of entries

#### ►  getTotalNumberOfEntries():```Promise```.

```js
fplapi.getTotalNumberOfEntries().then((data) => console.log(data));
```

#### Returns:
Promise&lt;number&gt;

___


## Data Types


<a name="type_Entry"></a>

### Entry

|Property|Type|Description
|---|---|---|
|id|```number```|Id
|player_first_name|```string```|Player First Name
|player_last_name|```string```|Player Last Name
|player_region_id|```number```|Player Region Id
|player_region_name|```string```|Player Region Name
|player_region_short_iso|```string```|Player Region Short Iso
|summary_overall_points|```number```|Summary Overall Points
|summary_overall_rank|```number```|Summary Overall Rank
|summary_event_points|```number```|Summary Event Points
|summary_event_rank|```number```|Summary Event Rank
|joined_seconds|```number```|Joined Seconds
|current_event|```number```|Current Event
|total_transfers|```number```|Total Transfers
|total_loans|```number```|Total Loans
|total_loans_active|```number```|Total Loans Active
|transfers_or_loans|```string```|Transfers Or Loans
|deleted|```boolean```|Deleted
|email|```boolean```|Email
|joined_time|```Date```|Joined Time
|name|```string```|Name
|bank|```number```|Bank
|value|```number```|Value
|kit|```string```|Kit
|event_transfers|```number```|Event Transfers
|event_transfers_cost|```number```|Event Transfers Cost
|extra_free_transfers|```number```|Extra Free Transfers
|started_event|```number```|Started Event
|player|```number```|Player

<a href="#top">Back to top</a> 
___  

<a name="type_EntryGameweek"></a>

### EntryGameweek

|Property|Type|Description
|---|---|---|
|id|```number```|Id
|movement|```string```|Movement
|points|```number```|Points
|total_points|```number```|Total Points
|rank|```number```|Rank
|rank_sort|```number```|Rank Sort
|overall_rank|```number```|Overall Rank
|event_transfers|```number```|Event Transfers
|event_transfers_cost|```number```|Event Transfers Cost
|value|```number```|Value
|points_on_bench|```number```|Points On Bench
|bank|```number```|Bank
|entry|```number```|Entry
|event|```number```|Event

<a href="#top">Back to top</a> 
___  

<a name="type_EntryPick"></a>

### EntryPick

|Property|Type|Description
|---|---|---|
|element|```number```|Element
|position|```number```|Position
|is_captain|```boolean```|Is Captain
|is_vice_captain|```boolean```|Is Vice Captain
|points|```number```|Points
|has_played|```boolean```|Has Played
|is_sub|```boolean```|Is Sub
|element_type|```number```|Element Type
|stats|[Player Stats](#type_PlayerStats)|Stats
|multiplier|```number```|Multiplier

<a href="#top">Back to top</a> 
___  

<a name="type_EntryTransferHistory"></a>

### EntryTransferHistory

|Property|Type|Description
|---|---|---|
|id|```number```|Id
|time_formatted|```string```|Time Formatted
|time|```Date```|Time
|element_in_cost|```number```|Element In Cost
|element_out_cost|```number```|Element Out Cost
|element_in|```number```|Element In
|element_out|```number```|Element Out
|entry|```number```|Entry
|event|```number```|Event

<a href="#top">Back to top</a> 
___  

<a name="type_Gameweek"></a>

### Gameweek

|Property|Type|Description
|---|---|---|
|id|```number```|Id
|name|```string```|Name
|deadline_time|```Date```|Deadline Time
|average_entry_score|```number```|Average Entry Score
|finished|```boolean```|Finished
|data_checked|```boolean```|Data Checked
|highest_scoring_entry|```number```|Highest Scoring Entry
|deadline_time_epoch|```number```|Deadline Time Epoch
|deadline_time_game_offset|```number```|Deadline Time Game Offset
|deadline_time_formatted|```string```|Deadline Time Formatted
|highest_score|```number```|Highest Score
|is_previous|```boolean```|Is Previous
|is_current|```boolean```|Is Current
|is_next|```boolean```|Is Next

<a href="#top">Back to top</a> 
___  

<a name="type_Player"></a>

### Player

|Property|Type|Description
|---|---|---|
|id|```number```|Id
|photo|```string```|Photo
|web_name|```string```|Web Name
|team_code|```number```|Team Code
|status|```string```|Status
|code|```number```|Code
|first_name|```string```|First Name
|second_name|```string```|Second Name
|squad_number|```number```|Squad Number
|news|```string```|News
|now_cost|```number```|Now Cost
|chance_of_playing_this_round|```number```|Chance Of Playing This Round
|chance_of_playing_next_round|```number```|Chance Of Playing Next Round
|value_form|```string```|Value Form
|value_season|```string```|Value Season
|cost_change_start|```number```|Cost Change Start
|cost_change_event|```number```|Cost Change Event
|cost_change_start_fall|```number```|Cost Change Start Fall
|cost_change_event_fall|```number```|Cost Change Event Fall
|in_dreamteam|```boolean```|In Dreamteam
|dreamteam_count|```number```|Dreamteam Count
|selected_by_percent|```string```|Selected By Percent
|form|```string```|Form
|transfers_out|```number```|Transfers Out
|transfers_in|```number```|Transfers In
|transfers_out_event|```number```|Transfers Out Event
|transfers_in_event|```number```|Transfers In Event
|loans_in|```number```|Loans In
|loans_out|```number```|Loans Out
|loaned_in|```number```|Loaned In
|loaned_out|```number```|Loaned Out
|total_points|```number```|Total Points
|event_points|```number```|Event Points
|points_per_game|```string```|Points Per Game
|ep_this|```string```|Ep This
|ep_next|```string```|Ep Next
|special|```boolean```|Special
|minutes|```number```|Minutes
|goals_scored|```number```|Goals Scored
|assists|```number```|Assists
|clean_sheets|```number```|Clean Sheets
|goals_conceded|```number```|Goals Conceded
|own_goals|```number```|Own Goals
|penalties_saved|```number```|Penalties Saved
|penalties_missed|```number```|Penalties Missed
|yellow_cards|```number```|Yellow Cards
|red_cards|```number```|Red Cards
|saves|```number```|Saves
|bonus|```number```|Bonus
|bps|```number```|Bps
|influence|```string```|Influence
|creativity|```string```|Creativity
|threat|```string```|Threat
|ict_index|```string```|Ict Index
|ea_index|```number```|Ea Index
|element_type|```number```|Element Type
|team|```number```|Team

<a href="#top">Back to top</a> 
___  

<a name="type_PlayerStats"></a>

### PlayerStats

|Property|Type|Description
|---|---|---|
|yellow_cards|```number```|Yellow Cards
|own_goals|```number```|Own Goals
|creativity|```number```|Creativity
|goals_conceded|```number```|Goals Conceded
|bonus|```number```|Bonus
|red_cards|```number```|Red Cards
|saves|```number```|Saves
|influence|```number```|Influence
|bps|```number```|Bps
|clean_sheets|```number```|Clean Sheets
|assists|```number```|Assists
|ict_index|```number```|Ict Index
|goals_scored|```number```|Goals Scored
|threat|```number```|Threat
|penalties_missed|```number```|Penalties Missed
|total_points|```number```|Total Points
|penalties_saved|```number```|Penalties Saved
|in_dreamteam|```boolean```|In Dreamteam
|minutes|```number```|Minutes

<a href="#top">Back to top</a> 
___  

<a name="type_Team"></a>

### Team

|Property|Type|Description
|---|---|---|
|id|```number```|Id
|current_event_fixture|[Team Fixture](#type_TeamFixture)|Current Event Fixture
|next_event_fixture|[Team Fixture](#type_TeamFixture)|Next Event Fixture
|name|```string```|Name
|code|```number```|Code
|short_name|```string```|Short Name
|unavailable|```boolean```|Unavailable
|strength|```number```|Strength
|position|```number```|Position
|played|```number```|Played
|win|```number```|Win
|loss|```number```|Loss
|draw|```number```|Draw
|points|```number```|Points
|link_url|```string```|Link Url
|strength_overall_home|```number```|Strength Overall Home
|strength_overall_away|```number```|Strength Overall Away
|strength_attack_home|```number```|Strength Attack Home
|strength_attack_away|```number```|Strength Attack Away
|strength_defence_home|```number```|Strength Defence Home
|strength_defence_away|```number```|Strength Defence Away
|team_division|```number```|Team Division

<a href="#top">Back to top</a> 
___  

<a name="type_TeamFixture"></a>

### TeamFixture

|Property|Type|Description
|---|---|---|
|is_home|```boolean```|Is Home
|month|```number```|Month
|event_day|```number```|Event Day
|id|```number```|Id
|day|```number```|Day
|opponent|```number```|Opponent

<a href="#top">Back to top</a> 
___  

