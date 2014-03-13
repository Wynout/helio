#!/usr/bin/env bash
sudo stop helio
git pull origin master
npm install
bower install
gulp
gulp cachebusting
sudo start helio