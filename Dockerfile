FROM scardon/ruby-node-alpine
LABEL MAINTAINER John Sloan <jwsloan@gmail.com>

WORKDIR /usr/src/app

RUN apk add --update --no-cache \
        build-base \
        icu-dev \
        cmake \
        git

COPY Gemfile /usr/src/app/
COPY Gemfile.lock /usr/src/app/
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install --production \
    && bundle install --no-cache \
    && apk del --update build-base

COPY ./lib /usr/src/app/lib
COPY ./bin /usr/src/app/bin
COPY ./index.js /usr/src/app/index.js
COPY ./repolinter.json /usr/src/app/repolinter.json
COPY ./engine.json /usr/src/app/engine.json

RUN adduser -u 9000 -D app

VOLUME /code
WORKDIR /code

RUN chown -R app:app /usr/src/app && \
    chmod +x /usr/src/app/bin/codeclimate-repolinter.js

USER app

CMD ["/usr/src/app/bin/codeclimate-repolinter.js", "/code"]
