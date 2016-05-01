# Roundcube Shell

The Roundcube shell is responsible for doing authentication, providing the event-bus, UI routing, and common UI components;
essentially, features which are crucial requirements for most other apps.
It is meant to embed other big and small Roundcube applications, such as Mail, Calendar, Notifications, and so forth.
Running Roundcube means running the Shell with some applications enabled.

## Prerequisites

You need to have a JMAP server running somewhere. Currently, the Roundcube Server in conjunction with the perl JMAP proxy provides the most complete set of JMAP capabilities and the shell is developed against that.

* [Roundcube Server](https://github.com/roundcube-next/roundcube-server) connected to [JMAP Proxy](http://github.com/jmapio/jmap-perl)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/) (only for future tests)
* Ruby with [Bundler](http://bundler.io) (for generating the UI styleguide)

## Setup

Bring in all dependencies and set up the project:

* `bundle`
* `npm install`
* `bower install`

### Installing apps

The final Roundcube webmail will be a combination of this shell and a collection of apps. These apps are maintained in individual repository and need to be pulled in for development and building. As long as the apps are not published as finally build Ember addons, the best way to include them is with `npm link`.

This is how to pull everything together for running/building/developing Roundcube Next:

* Clone [roundcube-notifications](https://github.com/roundcube-next/roundcube-notifications) and follow the "Usage" guide in the README.
* Clone [roundcube-mail](https://github.com/roundcube-next/roundcube-mail.git) and follow the "Usage" guide in the README.
* Change to this directory and link the two repos into node_modules:  
    `npm link roundcube-notifications roundcube-mail`

## Running / Development

The JMAP proxy happens to only support a very basic sort of authentication at this moment. You can link your IMAP account with the proxy server, and it should provide a secret UUID that identifies you.

* `export JMAP_HOST=http://ip:port && STYLEGUIDE=true && ember server`
* Open Roundcube at `http://localhost:4200`
* See the pretty styleguide at `http://localhost:4200/assets/styleguide.html`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## License

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see [www.gnu.org/licenses/](http://www.gnu.org/licenses/gpl-3.0).
