import express from 'express';

const router = express('router');


router.get('/test', (req, res) => {
    console.log(`post wokrs`)
})

export default router