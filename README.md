# Roundcube Shell

The Roundcube shell is responsible for doing authentication, providing the event-bus, UI routing, and common UI components;
essentially, features which are crucial requirements for most other apps.
It is meant to embed other big and small Roundcube applications, such as Mail, Calendar, Notifications, and so forth.
Running Roundcube means running the Shell with some applications enabled.

## Prerequisites

You need to have a JMAP server running somewhere. Currently, the most mature server is the perl JMAP proxy, and the shell is developed against that.

* [JMAP Proxy](http://github.com/jmapio/jmap-perl)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/) (only for future tests)
* Ruby with [Bundler](http://bundler.io) (for generating the UI styleguide)

## Setup

First, clone all the Roundcube apps you'll be using and run `npm link` inside each of their directories:

* `git clone https://github.com/roundcube-next/roundcube-notifications` etc
* `cd roundcube-notifications && npm link` etc

Next, change into the `roundcube-shell` directory and run `npm link <app-name>` for each Roundcube app you'll be using:

* `npm link roundcube-notifications` etc

Third, bring in all dependencies and set up the project:

* `bundle`
* `npm install`
* `bower install`

## Running / Development

The JMAP proxy happens to only support a very basic sort of authentication at this moment. You can link your IMAP account with the proxy server, and it should provide a secret UUID that identifies you.

* `export JMAP_HOST=http://ip:port && STYLEGUIDE=true && ember server`
* Open Roundcube at `http://localhost:4200`
* See the pretty styleguide at `http://localhost:4200/assets/styleguide.html`

### Building

* `ember build` (development)
* `ember build --environment production` (production)
