FROM node:4-onbuild

RUN mkdir /src
WORKDIR /src

COPY . /src
RUN cd /src && npm install

EXPOSE 8000

CMD ["npm", "start"]
