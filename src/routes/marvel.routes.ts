const Router = require('express').Router;

const router = Router();

router.get('/', (req:any, res:any) => {
  res.send('Hello from Marvel routes');
});

export {}