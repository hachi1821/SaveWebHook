const express = require('express');
const dfff = require('dialogflow-fulfillment');
var moment = require('moment-timezone');
const firebase = require('firebase');
const app = express();

app.get('/', (req, res) => {
    res.send('Daborad IOT!');
})



const firebaseConfig = {
    apiKey: "AIzaSyCV1TXkXu5ZE7CkI-tFSnaH9WPSXv4CFbk",
    authDomain: "projectiot-c5a07.firebaseapp.com",
    databaseURL: "https://projectiot-c5a07-default-rtdb.firebaseio.com",
    projectId: "projectiot-c5a07",
    storageBucket: "projectiot-c5a07.appspot.com",
    messagingSenderId: "845797346987",
    appId: "1:845797346987:web:89c742cc39e125de9231ee",
    measurementId: "G-E3PBTVT1XQ"

    // apiKey: "AIzaSyBGEraC6jahEW40cjyMoMCX9u6e1BSxVjw",
    // authDomain: "myproject-91d3b.firebaseapp.com",
    // databaseURL: "https://myproject-91d3b-default-rtdb.firebaseio.com",
    // projectId: "myproject-91d3b",
    // storageBucket: "myproject-91d3b.appspot.com",
    // messagingSenderId: "1025002176789",
    // appId: "1:1025002176789:web:bfa8615a698b2b1070291c",
    // measurementId: "G-H7QS28Y2K5"

};

firebase.initializeApp(firebaseConfig);
var MyData = firebase.database().ref('/IOT-DEVICES');


app.post('/', express.json(), (req, res) => {
    const agent = new dfff.WebhookClient({
        request: req,
        response: res
    })
    function ControlLight1(agent) {
        const value = agent.parameters.status;
        var status = false;
        if (value == 'on' || value == 'bật') {
            status = true;
        }
        var timeZone = moment.tz("Asia/Ho_Chi_Minh");
        var date = timeZone.format("YYYY-MM-DD");
        var time = timeZone.format("HH:mm:ss");
        var dateTime = date + ", " + time;
        MyData.child('led1').push({
            'status': status,
            'time': dateTime
        })
        if (value == 'bật' || value == 'tắt') {
            agent.add(`Đèn phòng khách đã được ${value}`);
        } else {
            agent.add(`The living room is ${value}`);
        }
    }
    function ControlLight2(agent) {
        const value = agent.parameters.status;
        var status = false;
        if (value == 'on' || value == 'bật') {
            status = true;
        }
        var timeZone = moment.tz("Asia/Ho_Chi_Minh");
        var date = timeZone.format("YYYY-MM-DD");
        var time = timeZone.format("HH:mm:ss");
        var dateTime = date + ", " + time;
        MyData.child('led2').push({
            'status': status,
            'time': dateTime
        })
        if (value == 'bật' || value == 'tắt') {
            agent.add(`Đèn phòng ngủ đã được ${value}`);
        } else {
            agent.add(`The bedroom light is ${value}`);
        }
    }
    function ControlLight3(agent) {
        const value = agent.parameters.status;
        var status = false;
        if (value == 'on' || value == 'bật') {
            status = true;
        }
        var timeZone = moment.tz("Asia/Ho_Chi_Minh");
        var date = timeZone.format("YYYY-MM-DD");
        var time = timeZone.format("HH:mm:ss");
        var dateTime = date + ", " + time;
        MyData.child('led3').push({
            'status': status,
            'time': dateTime
        })
        if (value == 'bật' || value == 'tắt') {
            agent.add(`Đèn phòng bếp đã được ${value}`);
        } else {
            agent.add(`The kitchen room light is ${value}`);
        }
    }
    function ControlFan(agent) {
        const value = agent.parameters.status;
        var status = false;
        if (value == 'on' || value == 'bật') {
            status = true;
        }
        var timeZone = moment.tz("Asia/Ho_Chi_Minh");
        var date = timeZone.format("YYYY-MM-DD");
        var time = timeZone.format("HH:mm:ss");
        var dateTime = date + ", " + time;
        MyData.child('fan').push({
            'status': status,
            'time': dateTime
        })
        if (value == 'bật' || value == 'tắt') {
            agent.add(`Quạt đã ${value}`);
        } else {
            agent.add(`Fan is ${value}`);
        }
    }

    async function GetTemperature(agent) {
        const value = agent.parameters.devices;
        const temp = await MyData.child('temp').once('value');
        if (value == 'weather') {
            agent.add(`Weather today is ${temp.val()} degrees C`);
        } else {
            agent.add(`Nhiệt độ hôm nay là ${temp.val()} độ C`);
        }
    }
    // https://controlhouse.herokuapp.com/
    var interMap = new Map();
    interMap.set('ControlLight1', ControlLight1);
    interMap.set('ControlLight2', ControlLight2);
    interMap.set('ControlLight3', ControlLight3);
    interMap.set('ControlFan', ControlFan);
    interMap.set('GetTemperature', GetTemperature);
    agent.handleRequest(interMap);
})

app.listen(process.env.PORT || 4000, () => console.log('Server on 4000'));