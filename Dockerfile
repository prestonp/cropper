FROM node:argon

RUN mkdir /src
WORKDIR /src

COPY . /src
RUN cd /src && npm install

EXPOSE 8000

CMD ["npm", "start"]
