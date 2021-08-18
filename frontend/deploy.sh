#!/bin/bash
export PORT=3000
export VIDEO_PATH_FOLDER=/Videos
export LOGGER_LEVEL=debug
cd frontend
npm install
npm run build
cd ../backend
npm start
