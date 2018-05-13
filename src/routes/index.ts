
const Router = require('router');
import * as dataService from '../data/data.service';
export function routes() {

  const app = Router();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/entries/:entryId', (req, res) => {
    const entryId = req.params.entryId;
    dataService.fetchEntryRoot(entryId).then((data) => {
      res.send(data.entry);
    });
  });

  return app;

}
