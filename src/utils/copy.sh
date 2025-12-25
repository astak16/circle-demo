#!/bin/sh

cd /Users/uccs/Desktop/project/blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log