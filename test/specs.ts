import { expect } from 'chai';
import 'mocha';
import * as fplapi from '../src/index';

// Entries

describe('should return correct Entry data', () => {

  const entryId = 545548;

  it('should return entry', (done) => {
    fplapi.findEntry(entryId).then((data) => {
      expect(data.player_first_name).to.equal('Tom');
      expect(data.player_last_name).to.equal('Grey');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should find Gameweeks', (done) => {
    fplapi.findEntryGameweeks(entryId).then((data) => {
      expect(data[0].points).to.equal(69);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should return entry gameweek', (done) => {
    fplapi.findEntryGameweek(entryId, 1).then((data) => {
      expect(data.entry).to.equal(entryId);
      expect(data.total_points).to.equal(69);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should return entry picks', (done) => {
    fplapi.findEntryPicksByGameweek(entryId, 1).then((data) => {
      expect(data[0].element).to.equal(421);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should return entry transfer history', (done) => {
    fplapi.findEntryTransferHistory(entryId).then((data) => {
      expect(data[0].element_in).to.equal(106);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should catch error correctly', (done) => {
    fplapi.findEntry(0).then((data) => {
      done(new Error('An error was expected'));
    }).catch((e) => {
      done();
    });
  });

});

// Players

describe('should return correct Player data', () => {
  it('should return all players entry', (done) => {
    fplapi.findAllPlayers().then((data) => {
      expect(data[0].web_name).to.equal('Ospina');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
  it('should find Player', (done) => {
    fplapi.findPlayer(2).then((data) => {
      expect(data.web_name).to.equal('Cech');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
  it('should find Player Stats By Gameweek', (done) => {
    fplapi.findPlayerStatsByGameweek(38, 1).then((data) => {
      expect(data.total_points).to.equal(3);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
});

// Gameweeks

describe('should return correct Gamweek data', () => {
  it('should find Gameweeks', (done) => {
    fplapi.findAllGameweeks().then((data) => {
      expect(data[0].id).to.equal(1);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
  it('should find Gameweek', (done) => {
    fplapi.findGameweek(1).then((data) => {
      expect(data.id).to.equal(1);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
  it('should find Gameweek player stats', (done) => {
    fplapi.findGameweekPlayerStats(1).then((data) => {
      expect(data[1].total_points).to.equal(1);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
});

// Teams

describe('should return correct Team data', () => {
  it('should find Teams', (done) => {
    fplapi.findAllTeams().then((data) => {
      expect(data[0].name).to.equal('Arsenal');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
  it('should find a Team', (done) => {
    fplapi.findTeam(1).then((data) => {
      expect(data.name).to.equal('Arsenal');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
});

// Leagues

describe('should return correct League data', () => {
  it('should find League', (done) => {
    fplapi.findLeague(313).then((data) => {
      expect(data.name).to.equal('Overall');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
  it('should find League Standings', (done) => {
    fplapi.findLeagueResults(313).then((data) => {
      expect(data.length).to.equal(50);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
});

// Utils

describe('should return utils', () => {
  it('should get Total Number Of Entries', (done) => {
    fplapi.getTotalNumberOfEntries().then((data) => {
      expect(data).to.be.a('number');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
  it('should get a Player type', (done) => {
    fplapi.getPlayerType(4).then((data) => {
      expect(data.singular_name).to.equal('Forward');
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
});
