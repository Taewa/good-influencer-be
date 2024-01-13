import db from '../db/connection.mjs';
import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const collection = db.collection("Influencers");
  const results = await collection.findOne({addr: req.query.address})

  if (results) {
    return res
      .status(200)
      .json(results);
  } else {
    return res
      .status(404)
      .json({error: 'address not found'});
  }
});

router.get('/list', async (req, res, next) => {
  const collection = db.collection("Influencers");
  const results = await collection.find().toArray();

  if (results) {
    return res
      .status(200)
      .json(results);
  } else {
    return res
      .status(500)
      .json({error: 'getting influencer list error'});
  }
});

router.post('/register', async (req, res, next) => {
  const { addr, desc, photo } = req.body;

  if (!addr || !desc || !photo) {
    return res
      .status(400)
      .json({
        error: 'given data is not enough to process'
      })
  }

  const collection = db.collection("Influencers");
  const isAlreadyExist = await collection.findOne({addr,})
  
  if (isAlreadyExist) {
    return res
      .status(409)
      .json({
        error: 'address is already registered'
      })
  }

  try {
    await collection.insertOne({
      addr,
      desc,
      photo,
    });
  
    return res.status(200).json();
  } catch(err) {
    // TODO: error handling
    console.error('Error:', err);
  }
});

router.get('/test', async (req, res, next) => {
  return res
    .status(200)
    .json({test: true});
});

export default router;
