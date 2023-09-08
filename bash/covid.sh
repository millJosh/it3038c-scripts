#!/bin/bash
# This script downloads covid data and displays it

DATA=$(curl https://api.covidtracking.com/v1/us/current.json)
POSITIVE=$(echo $DATA | jq '.[0].positive')
TODAY=$(date)
DEATHS=$(echo $DATA | jq '.[0].death')
TESTS=$(echo $DATA | jq '.[0].totalTestResults')
NEGATIVE=$(echo $DATA | jq '.[0].negative')

echo "On $TODAY, there were $POSITIVE positive COVID cases, $NEGATIVE negative COVID cases, $DEATHS total deaths, and $TESTS total tests."

