#!/bin/bash

if [ "$1" == "--global" ]
then

    apt-get update \
    && apt-get install -y mongodb \
    && apt-get clean \
    && sed -i s/^journal=true/journal=false/ /etc/mongodb.conf \
    && echo nojournal=true >> /etc/mongodb.conf \
    && service mongodb start \
    && npm install -g express-generator gulpjs/gulp-cli#4.0 istanbul jasmine-node@2.0.0-beta4 nodemon

else

    npm prune \
        && npm install \
        && bower prune \
        && bower install

fi
