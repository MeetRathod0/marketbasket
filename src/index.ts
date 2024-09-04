import express from 'express';
import { dbInit } from './configs/db.configs';
import { env } from './configs/env.configs';
import cors from 'cors';
import { apiV1Routes } from './routes/api.routes';
import { viewRoutes } from './routes/public.routes';
import path from 'path';

const app = express();

dbInit();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(apiV1Routes);

app.use(viewRoutes);

app.listen(env.PORT, () => {
	console.log(`Server started on ${env.PORT}...`);
});
