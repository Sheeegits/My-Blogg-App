import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from '../database/db.js';
import Router from '../routes/route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Establish database connection once
Connection(username, password);

// Exporting the serverless function handler
export default async (req, res) => {
  await new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  }).catch((err) => {
    console.error('Error:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  });
};
