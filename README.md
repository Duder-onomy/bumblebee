![Bumblebee Logo](https://s3.amazonaws.com/SolidInteractive/images/bumblebee/bumblebee-hdr.png)

---------------------------------------------------------------

Bumblebee is a client/server REST api that is designed to manage continous deployment for projects hosted on gitlab.

[![Build Status](https://travis-ci.org/Solid-Interactive/bumblebee.png?branch=master)](https://travis-ci.org/Solid-Interactive/bumblebee) ALPHA - TO BE RELEASED OFFICIALLY EARLY 2014

### Bumblebee gives you the power to safely publish your code with a solutions that is both simple and scalable.

Github and gitlab both provide the concept of web hooks and building a script to listen to these web hooks and pull code is pretty trivial.

We built bumblebee because while it is trivial to setup a script for one project on one server, what happens when you want to scale to 100 projects and 100 servers. What happens if gitlab changes their payload and you have deployed to 100 servers. The problem of scale is why we built bumblebee.

Bumblebee creates a smart, easily maintainable system that can share information between servers hosting applications.

Here is an overly simplistic example:

![Bumblebee Summary](https://s3.amazonaws.com/SolidInteractive/images/bumblebee/bumblebee-overview.png)


Here is a more realistic complicated example:

![Bumblebee Summary](https://s3.amazonaws.com/SolidInteractive/images/bumblebee/bumblebee-complicated-overview.png)


### Features

------------------------------------------------------------------

TBD


### Steps required to setup a hive

------------------------------------------------------------------

TBD


### Roadmap

------------------------------------------------------------------

TBD


### Development Setup

------------------------------------------------------------------

* git clone <repo>
* npm install
* grunt db:test (seeds test database)
* npm test (runs test suite to prove that everything is setup right)


### Development Dependency Pre-requisites

------------------------------------------------------------------

* NodeJS `http://nodejs.org/`
* Grunt CLI `npm install -g grunt-cli`
* Mocha `npm install -g mocha`
* Mongodb `http://www.mongodb.org/downloads`


### Contributors

------------------------------------------------------------------

(git shortlog -s -n)

https://github.com/Solid-Interactive/bumblebee/graphs/contributors


### License

------------------------------------------------------------------

(The MIT License)

Copyright (c) 2014 Solid Interactive - Travis McHattie

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
