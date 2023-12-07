#!/bin/bash

day=$1
if [ -z ${day} ]; then echo "Must provide day" && exit 1; fi

touch input/day${day}Input
touch src/day${day}.ts
touch test/day${day}.test.ts
