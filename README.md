My Personal Site
================

[![Greenkeeper badge](https://badges.greenkeeper.io/johngeorgewright/j-g-w.info.svg)](https://greenkeeper.io/)

(j-g-w.info)[http://jgw.herokuapps.com]

I'm currently in the process of moving all my work from Dreamhost onto cloud based services. This means some of the hosting will be free and I can also start moving away from PHP and using more exciting tehnologies. Here's a rework of my site using Express.js.

Known Issues
------------

- I'm currently deploying this site to Heroku, and until 123-reg sort their admin systems out, I'll have to use the above URL and not the prefered j-g-w.info.
- Heroku is a read only system, which means that my less caching is not working. Might just have to give in and add the compiled css in to the repo.

Installation
------------

The site is a typical node setup. 

```sh
# Install node.js and npm (if you haven't already done so).
# Then clone this repo:
$ git clone https://github.com/johngeorgewright/j-g-w.info.git

# Install all dependencies
$ cd j-g-w.info
$ npm i

# Run the server
$ npm start
```

