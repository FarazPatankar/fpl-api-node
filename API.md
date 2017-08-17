# fpl-api-node (Season 2017-18)

## Methods

* [getEntry](#getEntry)
* [getEntryEvent](#getEntryEvent)
* [getEntryPicksForEvent](#getEntryPicksForEvent)
* [getEntryTransferHistory](#getEntryTransferHistory)
* [getElements](#getElements)
* [getElement](#getElement)
* [getEvents](#getEvents)
* [getEvent](#getEvent)
* [getTeams](#getTeams)
* [getTeam](#getTeam)
* [getTotalNumberOfEntries](#getTotalNumberOfEntries)
___

<a name="getEntry"></a>
### ►  getEntry(entryId)

********
Entries
*******
Returns entry summary

```js
fplapi.getEntry(entryId).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|entryId|number|

#### Returns:
Promise&lt;Json&gt;: See <a href="#object-Entry">Entry</a> for data structure.

___
<a name="getEntryEvent"></a>
### ►  getEntryEvent(entryId, eventNumber)

Returns event details for an entry

```js
fplapi.getEntryEvent(entryId, eventNumber).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|entryId|number|
|eventNumber|number|

#### Returns:
Promise&lt;Json&gt;: See <a href="#object-EntryEvent">EntryEvent</a> for data structure.

___
<a name="getEntryPicksForEvent"></a>
### ►  getEntryPicksForEvent(entryId, eventNumber)

Returns picks for a specified event

```js
fplapi.getEntryPicksForEvent(entryId, eventNumber).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|entryId|number|
|eventNumber|number|

#### Returns:
Promise&lt;Json&gt;: See <a href="#object-EntryPick">EntryPick[]</a> for data structure.

___
<a name="getEntryTransferHistory"></a>
### ►  getEntryTransferHistory(entryId)

Returns transfer history of an entry

```js
fplapi.getEntryTransferHistory(entryId).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|entryId|number|

#### Returns:
Promise&lt;Json&gt;: See <a href="#object-EntryTransferHistory">EntryTransferHistory[]</a> for data structure.

___
<a name="getElements"></a>
### ►  getElements()

********
Elements
*******
Geta all elements

```js
fplapi.getElements().then((data) => console.log(data));
```

#### Returns:
Promise&lt;Json&gt;: See <a href="#object-Element">Element[]</a> for data structure.

___
<a name="getElement"></a>
### ►  getElement(elementId)

Returns a specific element

```js
fplapi.getElement(elementId).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|elementId|number|

#### Returns:
Promise&lt;Json&gt;: See <a href="#object-Element">Element</a> for data structure.

___
<a name="getEvents"></a>
### ►  getEvents()

********
Elements
*******
Geta all events

```js
fplapi.getEvents().then((data) => console.log(data));
```

#### Returns:
Promise&lt;Json&gt;: See <a href="#object-Event">Event[]</a> for data structure.

___
<a name="getEvent"></a>
### ►  getEvent(eventNumber)

Returns a specific event

```js
fplapi.getEvent(eventNumber).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|eventNumber|number|

#### Returns:
Promise&lt;Json&gt;: See <a href="#object-Event">Event</a> for data structure.

___
<a name="getTeams"></a>
### ►  getTeams()

********
Teams
*******
Geta all events

```js
fplapi.getTeams().then((data) => console.log(data));
```

#### Returns:
Promise&lt;Json&gt;: See <a href="#object-Team">Team[]</a> for data structure.

___
<a name="getTeam"></a>
### ►  getTeam(teamId)

Returns a specific event

```js
fplapi.getTeam(teamId).then((data) => console.log(data));
```
#### Parameters:

|Name|Type|
|---|---|
|teamId|number|

#### Returns:
Promise&lt;Json&gt;: See <a href="#object-Team">Team</a> for data structure.

___
<a name="getTotalNumberOfEntries"></a>
### ►  getTotalNumberOfEntries()

********
Utils
*******
Returns the total number of entries

```js
fplapi.getTotalNumberOfEntries().then((data) => console.log(data));
```

#### Returns:
Promise&lt;number&gt;

___

## Data structures

* [Element](#Element)
* [ElementStats](#ElementStats)
* [Entry](#Entry)
* [EntryEvent](#EntryEvent)
* [EntryPick](#EntryPick)
* [EntryTransferHistory](#EntryTransferHistory)
* [Event](#Event)
* [Team](#Team)
* [TeamFixture](#TeamFixture)


<a name="object-Element"></a>
### Element

|Property|Type|Description
|---|---|---|
|id|number|Id
|photo|string|Photo
|web_name|string|Web Name
|team_code|number|Team Code
|status|string|Status
|code|number|Code
|first_name|string|First Name
|second_name|string|Second Name
|squad_number|number|Squad Number
|news|string|News
|now_cost|number|Now Cost
|chance_of_playing_this_round|number|Chance Of Playing This Round
|chance_of_playing_next_round|number|Chance Of Playing Next Round
|value_form|string|Value Form
|value_season|string|Value Season
|cost_change_start|number|Cost Change Start
|cost_change_event|number|Cost Change Event
|cost_change_start_fall|number|Cost Change Start Fall
|cost_change_event_fall|number|Cost Change Event Fall
|in_dreamteam|boolean|In Dreamteam
|dreamteam_count|number|Dreamteam Count
|selected_by_percent|string|Selected By Percent
|form|string|Form
|transfers_out|number|Transfers Out
|transfers_in|number|Transfers In
|transfers_out_event|number|Transfers Out Event
|transfers_in_event|number|Transfers In Event
|loans_in|number|Loans In
|loans_out|number|Loans Out
|loaned_in|number|Loaned In
|loaned_out|number|Loaned Out
|total_points|number|Total Points
|event_points|number|Event Points
|points_per_game|string|Points Per Game
|ep_this|string|Ep This
|ep_next|string|Ep Next
|special|boolean|Special
|minutes|number|Minutes
|goals_scored|number|Goals Scored
|assists|number|Assists
|clean_sheets|number|Clean Sheets
|goals_conceded|number|Goals Conceded
|own_goals|number|Own Goals
|penalties_saved|number|Penalties Saved
|penalties_missed|number|Penalties Missed
|yellow_cards|number|Yellow Cards
|red_cards|number|Red Cards
|saves|number|Saves
|bonus|number|Bonus
|bps|number|Bps
|influence|string|Influence
|creativity|string|Creativity
|threat|string|Threat
|ict_index|string|Ict Index
|ea_index|number|Ea Index
|element_type|number|Element Type
|team|number|Team

<a href="#top">Back to top</a> 
___  

<a name="object-ElementStats"></a>
### ElementStats

|Property|Type|Description
|---|---|---|
|yellow_cards|number|Yellow Cards
|own_goals|number|Own Goals
|creativity|number|Creativity
|goals_conceded|number|Goals Conceded
|bonus|number|Bonus
|red_cards|number|Red Cards
|saves|number|Saves
|influence|number|Influence
|bps|number|Bps
|clean_sheets|number|Clean Sheets
|assists|number|Assists
|ict_index|number|Ict Index
|goals_scored|number|Goals Scored
|threat|number|Threat
|penalties_missed|number|Penalties Missed
|total_points|number|Total Points
|penalties_saved|number|Penalties Saved
|in_dreamteam|boolean|In Dreamteam
|minutes|number|Minutes

<a href="#top">Back to top</a> 
___  

<a name="object-Entry"></a>
### Entry

|Property|Type|Description
|---|---|---|
|id|number|Id
|player_first_name|string|Player First Name
|player_last_name|string|Player Last Name
|player_region_id|number|Player Region Id
|player_region_name|string|Player Region Name
|player_region_short_iso|string|Player Region Short Iso
|summary_overall_points|number|Summary Overall Points
|summary_overall_rank|number|Summary Overall Rank
|summary_event_points|number|Summary Event Points
|summary_event_rank|number|Summary Event Rank
|joined_seconds|number|Joined Seconds
|current_event|number|Current Event
|total_transfers|number|Total Transfers
|total_loans|number|Total Loans
|total_loans_active|number|Total Loans Active
|transfers_or_loans|string|Transfers Or Loans
|deleted|boolean|Deleted
|email|boolean|Email
|joined_time|Date|Joined Time
|name|string|Name
|bank|number|Bank
|value|number|Value
|kit|string|Kit
|event_transfers|number|Event Transfers
|event_transfers_cost|number|Event Transfers Cost
|extra_free_transfers|number|Extra Free Transfers
|started_event|number|Started Event
|player|number|Player

<a href="#top">Back to top</a> 
___  

<a name="object-EntryEvent"></a>
### EntryEvent

|Property|Type|Description
|---|---|---|
|id|number|Id
|movement|string|Movement
|points|number|Points
|total_points|number|Total Points
|rank|number|Rank
|rank_sort|number|Rank Sort
|overall_rank|number|Overall Rank
|event_transfers|number|Event Transfers
|event_transfers_cost|number|Event Transfers Cost
|value|number|Value
|points_on_bench|number|Points On Bench
|bank|number|Bank
|entry|number|Entry
|event|number|Event

<a href="#top">Back to top</a> 
___  

<a name="object-EntryPick"></a>
### EntryPick

|Property|Type|Description
|---|---|---|
|element|number|Element
|position|number|Position
|is_captain|boolean|Is Captain
|is_vice_captain|boolean|Is Vice Captain
|points|number|Points
|has_played|boolean|Has Played
|is_sub|boolean|Is Sub
|element_type|number|Element Type
|stats|ElementStats|Stats
|multiplier|number|Multiplier

<a href="#top">Back to top</a> 
___  

<a name="object-EntryTransferHistory"></a>
### EntryTransferHistory

|Property|Type|Description
|---|---|---|
|id|number|Id
|time_formatted|string|Time Formatted
|time|Date|Time
|element_in_cost|number|Element In Cost
|element_out_cost|number|Element Out Cost
|element_in|number|Element In
|element_out|number|Element Out
|entry|number|Entry
|event|number|Event

<a href="#top">Back to top</a> 
___  

<a name="object-Event"></a>
### Event

|Property|Type|Description
|---|---|---|
|id|number|Id
|name|string|Name
|deadline_time|Date|Deadline Time
|average_entry_score|number|Average Entry Score
|finished|boolean|Finished
|data_checked|boolean|Data Checked
|highest_scoring_entry|number|Highest Scoring Entry
|deadline_time_epoch|number|Deadline Time Epoch
|deadline_time_game_offset|number|Deadline Time Game Offset
|deadline_time_formatted|string|Deadline Time Formatted
|highest_score|number|Highest Score
|is_previous|boolean|Is Previous
|is_current|boolean|Is Current
|is_next|boolean|Is Next

<a href="#top">Back to top</a> 
___  

<a name="object-Team"></a>
### Team

|Property|Type|Description
|---|---|---|
|id|number|Id
|current_event_fixture|TeamFixture[]|Current Event Fixture
|next_event_fixture|TeamFixture[]|Next Event Fixture
|name|string|Name
|code|number|Code
|short_name|string|Short Name
|unavailable|boolean|Unavailable
|strength|number|Strength
|position|number|Position
|played|number|Played
|win|number|Win
|loss|number|Loss
|draw|number|Draw
|points|number|Points
|link_url|string|Link Url
|strength_overall_home|number|Strength Overall Home
|strength_overall_away|number|Strength Overall Away
|strength_attack_home|number|Strength Attack Home
|strength_attack_away|number|Strength Attack Away
|strength_defence_home|number|Strength Defence Home
|strength_defence_away|number|Strength Defence Away
|team_division|number|Team Division

<a href="#top">Back to top</a> 
___  

<a name="object-TeamFixture"></a>
### TeamFixture

|Property|Type|Description
|---|---|---|
|is_home|boolean|Is Home
|month|number|Month
|event_day|number|Event Day
|id|number|Id
|day|number|Day
|opponent|number|Opponent

<a href="#top">Back to top</a> 
___  

