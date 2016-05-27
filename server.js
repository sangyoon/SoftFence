'use strict';

const Socket     = require('socket.io')(3000);
const SerialPort = require('serialport');
const MongoDB    = require('mongodb');
const Assert     = require('assert');
const Colors     = require('colors');

const DATABASE_URL  = 'mongodb://222.116.135.139:27017/';
const DATABASE_NAME = 'virtualfence';

const PORT     = '\\\\.\\COM4';
const BAUDRATE = 9600;
const PARSER   = SerialPort.parsers.readline('\n');

let XBEE = new SerialPort.SerialPort(PORT, {
  "baudRate": BAUDRATE,
  "parser": PARSER,
});

XBEE.on('open', () => {
  Socket.on('connection', (socket) => {
    let client = socket.request.connection._peername;
    console.log('CONNECT'.bgRed, client.address + ':' + client.port);

    XBEE.on('data', (nmea) => {
      let data = JSON.parse(nmea.toString());
      if(data.uuid.length == 6) socket.emit('data', data);
    });

    Socket.on('create fence', () => {});
    Socket.on('modify fence', () => {});
    Socket.on('remove fence', () => {});

    Socket.on('alert', (data) => {
      console.log(data.uuid.bgGreen, data.status);

      if(data.status === 'Safety')       XBEE.write('0');
      else if(data.status === 'Warning') XBEE.write('1');
      else if(data.status === 'Danger')  XBEE.write('2');
      else                               XBEE.write('3');
    });

    Socket.on('disconnect', () => { console.log('DISCONNECT'.bgRed, client.address); });
  });
});
