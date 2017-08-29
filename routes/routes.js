/**
 * Created by Maxime Baconnais on 29/08/2017.
 */

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const proxy = require('../core/proxy');
const redirect = require('../core/redirect');

//Dash routes
router.get('/video/:/transcode/universal/start.mpd', redirect);
router.get('/video/:/transcode/universal/dash/:sessionId/:streamId/initial.mp4', redirect);
router.get('/video/:/transcode/universal/dash/:sessionId/:streamId/:partId.m4s', redirect);

//Stream mode
router.get('/video/:/transcode/universal/start', redirect);
router.get('/video/:/transcode/universal/subtitles', redirect);

//m3u8 mode
router.get('/video/:/transcode/universal/session/:sessionId/base/index.m3u8', redirect);
router.get('/video/:/transcode/universal/session/:sessionId/:fileType/:partId.ts', redirect);
router.get('/video/:/transcode/universal/session/:sessionId/:fileType/:partId.vtt', redirect);

//Universal endpoints
router.get('/video/:/transcode/universal/stop', redirect);
router.get('/video/:/transcode/universal/ping', redirect);
router.get('/:/timeline', redirect);

// Download files
router.get('/library/parts/:id1/:id2/file.*', redirect);

//Transcoder progression
router.post('/video/:/transcode/session/:sessionId/seglist', bodyParser.text({ type: () => {return true} }), redirect);
router.post('/video/:/transcode/session/:sessionId/*/seglist', bodyParser.text({ type: () => {return true} }), redirect);
router.post('/video/:/transcode/session/:sessionId/manifest', bodyParser.text({ type: () => {return true} }), redirect);
router.post('/video/:/transcode/session/:sessionId/*/manifest', bodyParser.text({ type: () => {return true} }), redirect);

// Reverse all others to plex
router.all('*', bodyParser.raw({ type: () => {return true} }), proxy);

module.exports = router;