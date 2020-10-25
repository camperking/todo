import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

import bodyParser from 'body-parser';
import dbInit from './db';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

dbInit().then(()=> {

	polka() // You can also use Express
	.use(
		bodyParser.json(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
		)
		.listen(PORT, err => {
			if (err) console.log('error', err);
		});
		
});