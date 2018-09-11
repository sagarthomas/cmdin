# cmdin 
[![Build Status](https://travis-ci.org/sagarthomas/cmdin.svg?branch=master)](https://travis-ci.org/sagarthomas/cmdin)
[![Coverage Status](https://coveralls.io/repos/github/sagarthomas/cmdin/badge.svg?branch=master)](https://coveralls.io/github/sagarthomas/cmdin?branch=master)
[![npm version](https://badge.fury.io/js/cmdin.svg)](https://badge.fury.io/js/cmdin)

## About
Cmdin is a simple wrapper over the node ` child_process.exec() ` utilizing ES6 Promises to execute shell commands.

## Install

```
npm install cmdin --save
```

## Usage
The most simplest usage is as follows:

```javascript

const cmd = require('cmdin');

cmd.run('ls').then((res) => {
    console.log(res.stdout); 
}).catch(e => {
    console.log(e);
});

```
### Arguments

Arguments can be written inline:


```javascript
cmd.run('ls -a -l').then((res) => {
    console.log(res.stdout); 
}).catch(e => {
    console.log(e);
});

```

or passed as an array structure:

```javascript
cmd.run('ls',['-l', '-a']).then((res) => {
    console.log(res.stdout); 
}).catch(e => {
    console.log(e);
});

```
