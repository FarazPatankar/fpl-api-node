// import axios from 'axios';
import axios from 'axios';
import { expect } from 'chai';
import * as cache from 'memory-cache';
import 'mocha';
import * as sinon from 'sinon';

import * as dataService from '../src/data-service';
import * as fplapi from '../src/index';

// Entries

describe('Entry data:', () => {

  const entryId = 545548;

  it('should findEntry()', (done) => {
    fplapi.findEntry(entryId).then((data) => {
      expect(data.player_first_name).to.equal('Tom');
      expect(data.player_last_name).to.equal('Grey');
      done();
    });
  });

  it('should findEntryEvents()', (done) => {
    fplapi.findEntryEvents(entryId).then((data) => {
      expect(data[0].points).to.equal(69);
      done();
    });
  });

  it('should findEntryChips()', (done) => {
    fplapi.findEntryChips(entryId).then((data) => {
      done();
    });
  });

  it('should findEntryEvent()', (done) => {
    fplapi.findEntryEvent(entryId, 1).then((data) => {
      expect(data.entry).to.equal(entryId);
      expect(data.total_points).to.equal(69);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryPicksByEvent()', (done) => {
    fplapi.findEntryPicksByEvent(entryId, 1).then((data) => {
      expect(data[0].element).to.equal(421);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryTransferHistory', (done) => {
    fplapi.findEntryTransferHistory(entryId).then((data) => {
      expect(data[0].element_in).to.equal(106);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

// Elements

describe('Elements data:', () => {

  it('should getElements()', (done) => {
    fplapi.getElements().then((data) => {
      expect(data[0].web_name).to.equal('Ospina');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findElementsByEvent()', (done) => {
    fplapi.findElementsByEvent(1).then((data) => {
      expect(data['498'].stats.total_points).to.equal(6);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

// Events

describe('Event data:', () => {

  it('should getEvents()', (done) => {
    fplapi.getEvents().then((data) => {
      expect(data[0].id).to.equal(1);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

// Teams

describe('Team data:', () => {
  it('should getTeams()', (done) => {
    fplapi.getTeams().then((data) => {
      expect(data[0].name).to.equal('Arsenal');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

// Leagues

describe('Leagues:', () => {

  it('should find League', (done) => {
    fplapi.findLeague(313).then((data) => {
      expect(data.name).to.equal('Overall');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findLeagueStandings()', (done) => {
    fplapi.findLeagueStandings(313).then((data) => {
      expect(data.length).to.equal(50);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

// Utils

describe('General data:', () => {

  it('should getElementTypes()', (done) => {
    fplapi.getElementTypes().then((data) => {
      expect(data[1].id).to.equal(2);
      expect(data[1].plural_name).to.equal('Defenders');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should getGameData()', (done) => {
    fplapi.getGameData().then((data) => {
      expect(data.total_entries).to.be.a('number');
      expect(data.current_event).to.be.a('number');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

describe('should handle errors: ', () => {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(cache, 'get').returns(null);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should throw error with correct message when game is updating', (done) => {
    dataService.fetch('https://fantasy.premierleague.com/updating/').then((data) => {
      done(new Error('An error was expected'));
    }).catch((e) => {
      if (e === 'fpl-api-node: There was an error as the game is being updated') {
        done();
      } else {
        done(new Error());
      }
    });
  });

  it('should throw error with correct message when game is updating', (done) => {
    dataService.fetch('https://fantasy.premierleague.com/a/team/545548/event/4').then((data) => {
      done(new Error('An error was expected'));
    }).catch((e) => {
      done();
    });
  });

  it('should catch error on findEntry()', (done) => {
    catchError(fplapi.findEntry(0), done);
  });

  it('should catch error on findEntryEvents()', (done) => {
    catchError(fplapi.findEntryEvents(0), done);
  });

  it('should catch error on findEntryChips()', (done) => {
    catchError(fplapi.findEntryChips(0), done);
  });

  it('should catch error on findEntryEvent()', (done) => {
    catchError(fplapi.findEntryEvent(0, 0), done);
  });

  it('should catch error on findEntryPicksByEvent()', (done) => {
    catchError(fplapi.findEntryPicksByEvent(0, 0), done);
  });

  it('should catch error on findEntryEvent()', (done) => {
    catchError(fplapi.findEntryTransferHistory(0), done);
  });

  it('should catch error on getEvents()', (done) => {
    catchError(fplapi.findEntryEvent(0, 0), done);
  });

  it('should catch error on findElementsByEvent()', (done) => {
    catchError(fplapi.findElementsByEvent(0), done);
  });

  it('should catch error on findLeague()', (done) => {
    catchError(fplapi.findLeague(0), done);
  });

  it('should catch error on findLeagueStandings()', (done) => {
    catchError(fplapi.findLeagueStandings(0), done);
  });

  it('should catch error on getElements()', (done) => {
    sandbox.stub(axios, 'get').returns(Promise.reject('error'));
    catchError(fplapi.getElements(), done);
  });

  it('should catch error on getEvents()', (done) => {
    sandbox.stub(axios, 'get').returns(Promise.reject('error'));
    catchError(fplapi.getEvents(), done);
  });

  it('should catch error on getTeams()', (done) => {
    sandbox.stub(axios, 'get').returns(Promise.reject('error'));
    catchError(fplapi.getTeams(), done);
  });

  it('should catch error on getElementTypes()', (done) => {
    sandbox.stub(axios, 'get').returns(Promise.reject('error'));
    catchError(fplapi.getElementTypes(), done);
  });

  it('should catch error on getGameData()', (done) => {
    sandbox.stub(axios, 'get').returns(Promise.reject('error'));
    catchError(fplapi.getGameData(), done);
  });

});

// helper methods

function catchError(p, done) {
  p.then((data) => {
    done(new Error('An error was expected'));
  }).catch((e) => {
    done();
  });
}
