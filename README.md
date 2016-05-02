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
* `ember g roundcube-mail`

## Running / Development

The JMAP proxy happens to only support a very basic sort of authentication at this moment. You can link your IMAP account with the proxy server, and it should provide a secret UUID that identifies you.

* `export JMAP_HOST=http://ip:port && STYLEGUIDE=true && ember server`
* Open Roundcube at `http://localhost:4200`
* See the pretty styleguide at `http://localhost:4200/assets/styleguide.html`

### Installing apps for development

For development, Roundcube apps (aka Ember addons) from other repositories can be symlinked into the shell root with `npm link` as suggested in the [ember-cli guide](http://ember-cli.com/extending/#link-to-addon-while-developing).

This is how to pull everything together for developing Roundcube Next:

* Clone [roundcube-notifications](https://github.com/roundcube-next/roundcube-notifications) and export it with `npm link`.
* Clone [roundcube-mail](https://github.com/roundcube-next/roundcube-mail.git) and export it with `npm link`.
* Change to this directory and link the two repos into node_modules:  
    `npm link roundcube-notifications roundcube-mail`
* Pull bower dependencies from modules into shell project by generating from blueprints:  
    `ember g roundcube-mail`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## License

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see [www.gnu.org/licenses/](http://www.gnu.org/licenses/gpl-3.0).
