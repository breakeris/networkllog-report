
const axios = require("axios");
const dateformat = require("dateformat");
function run() {

    let outData = [];
    let errData = [];
    const { spawn } = require('child_process');
    const ls = spawn('ping', ["baidu.com"]);

    ls.stdout.on('data', (data) => {
        outData.push(`${ dateformat(new Date(),"yyyy-mm-dd HH:MM:ss") } ${data}`);
    });

    ls.stderr.on('data', (data) => {
        errData.push(`${ dateformat(new Date(),"yyyy-mm-dd HH:MM:ss")  } ${data}`);
    });

    ls.on('close', (code) => {
    });

    setInterval(()=>{

        axios.post("http://localhost:3010/api_v1/corporation/network/report/",{
            id:"095d44d0-1e42-4fa6-afe0-8d9a23639088",
            errData,
            outData
        },{timeout:1000})
            .then(res =>{

            })
            .catch(error =>{

            })
        errData = [];
        outData = [];
    },10000)
}


run();