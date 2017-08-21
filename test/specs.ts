import { expect } from 'chai';
import 'mocha';

import * as fplapi from '../src/index';

// helper methods
function catchError(p, done) {
  p.then((data) => {
    done(new Error('An error was expected'));
  }).catch((e) => {
    done();
  });
}

// Entries

describe('should return correct Entry data', () => {

  const entryId = 545548;

  it('should findEntry()', (done) => {
    fplapi.findEntry(entryId).then((data) => {
      expect(data.player_first_name).to.equal('Tom');
      expect(data.player_last_name).to.equal('Grey');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findEntry()', (done) => {
    catchError(fplapi.findEntry(0), done);
  });

  it('should findEntryGameweeks()', (done) => {
    fplapi.findEntryGameweeks(entryId).then((data) => {
      expect(data[0].points).to.equal(69);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findEntryGameweeks()', (done) => {
    catchError(fplapi.findEntryGameweeks(0), done);
  });

  it('should findEntryGameweek()', (done) => {
    fplapi.findEntryGameweek(entryId, 1).then((data) => {
      expect(data.entry).to.equal(entryId);
      expect(data.total_points).to.equal(69);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findEntryGameweek()', (done) => {
    catchError(fplapi.findEntryGameweek(0, 0), done);
  });

  it('should findEntryPicksByGameweek()', (done) => {
    fplapi.findEntryPicksByGameweek(entryId, 1).then((data) => {
      expect(data[0].element).to.equal(421);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findEntryPicksByGameweek()', (done) => {
    catchError(fplapi.findEntryPicksByGameweek(0, 0), done);
  });

  it('should findEntryTransferHistory', (done) => {
    fplapi.findEntryTransferHistory(entryId).then((data) => {
      expect(data[0].element_in).to.equal(106);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findEntryGameweek()', (done) => {
    catchError(fplapi.findEntryTransferHistory(0), done);
  });

});

// Players

describe('should return correct Player data', () => {

  it('should getAllPlayers()', (done) => {
    fplapi.getAllPlayers().then((data) => {
      expect(data[0].web_name).to.equal('Ospina');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findPlayer()', (done) => {
    fplapi.findPlayer(2).then((data) => {
      expect(data.web_name).to.equal('Cech');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findPlayer()', (done) => {
    catchError(fplapi.findPlayer(999), done);
  });

  it('should findPlayerStatsByGameweek()', (done) => {
    fplapi.findPlayerStatsByGameweek(38, 1).then((data) => {
      expect(data.total_points).to.equal(3);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findPlayerStatsByGameweek()', (done) => {
    catchError(fplapi.findPlayerStatsByGameweek(0, 0), done);
  });
});

// Gameweeks

describe('should return correct Gamweek data', () => {

  it('should getAllGameweeks', (done) => {
    fplapi.getAllGameweeks().then((data) => {
      expect(data[0].id).to.equal(1);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should find findGameweek()', (done) => {
    fplapi.findGameweek(1).then((data) => {
      expect(data.id).to.equal(1);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findGameweek()', (done) => {
    catchError(fplapi.findGameweek(0), done);
  });

  it('should findGameweekPlayerStats()', (done) => {
    fplapi.findGameweekPlayerStats(1).then((data) => {
      expect(data[1].total_points).to.equal(1);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findGameweekPlayerStats()', (done) => {
    catchError(fplapi.findGameweekPlayerStats(0), done);
  });
});

// Teams

describe('should return correct Team data', () => {
  it('should getAllTeams()', (done) => {
    fplapi.getAllTeams().then((data) => {
      expect(data[0].name).to.equal('Arsenal');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findTeam()', (done) => {
    fplapi.findTeam(1).then((data) => {
      expect(data.name).to.equal('Arsenal');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findTeam()', (done) => {
    catchError(fplapi.findTeam(0), done);
  });

});

// Leagues

describe('should findLeague()', () => {
  it('should find League', (done) => {
    fplapi.findLeague(313).then((data) => {
      expect(data.name).to.equal('Overall');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findLeague()', (done) => {
    catchError(fplapi.findLeague(0), done);
  });

  it('should findLeagueResults()', (done) => {
    fplapi.findLeagueResults(313).then((data) => {
      expect(data.length).to.equal(50);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findLeagueResults()', (done) => {
    catchError(fplapi.findLeagueResults(0), done);
  });

});

// Utils

describe('should return utils', () => {
  it('should getTotalNumberOfEntries()', (done) => {
    fplapi.getTotalNumberOfEntries().then((data) => {
      expect(data).to.be.a('number');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findPlayerType()', (done) => {
    fplapi.findPlayerType(4).then((data) => {
      expect(data.singular_name).to.equal('Forward');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error on findPlayerType()', (done) => {
    catchError(fplapi.findPlayerType(0), done);
  });
});
