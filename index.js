const b = require('./src/h');
const arp = require('./src/mdz');
const fs = require('fs');
const os = require('os');
const https = require('https');
const url = require('url');
let e = new b();
let _j = {
    o: require('readline-sync'),
    b: "+=================================+ \n" +
        "| {{ Networking Tools: By Kurt }} |\n" +
        "+=================================+\n\n",
    op: "1. Network information \n" +
        "2. ARP { PC / ROOTED Android only } \n" +
        "3. Packet Sniffer { Coming soon } \n" +
        "4. Web HTTP Header requests \n"
};
console.log(_j.b + _j.op);
let _tr_REPLACE = (str) => {
    return str.trim().replace(/\s+/g, ' ');
};
let _fl_JOIN = (arr) => {
    return arr.filter(Boolean).join('\n');
};
let __RegFirst_Char = (urlStr) => {
    return !urlStr.match(/^https?:\/\//i) ? 'https://' + urlStr : urlStr;
};
let Rand_i_String = (length) => {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.exp(Math.log(Math.random() * chars.length)))];
    }
    return result;
};
let __mk_Req = async (urlStr, method = 'GET') => {
    return new Promise((resolve, reject) => {
        let parsedUrl = url.parse(urlStr);
        let options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.path,
            method: method,
            headers: {
                'Accept': '/'
            }
        };
        let req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    data: data,
                    reason: res.statusMessage
                });
            });
        });
        req.on('error', (error) => {
            reject(error);
        });
        req.end();
    });
};
let __process_rs = (response, connectionStatus, urlStr) => {
    let parsedUrl = url.parse(urlStr);
    let metadata = {
        'Server': response.headers['server'] || 'Not Available',
        'Last-Modified': response.headers['last-modified'] || 'Not Available',
        'Accept-Ranges': response.headers['accept-ranges'] || 'Not Available',
        'Content-Length': response.headers['content-length'] || 'Not Available',
        'Content-Type': response.headers['content-type'] || 'Not Available',
        'X-Cache': response.headers['x-cache'] || 'Not Available',
        'Proxy-Connection': response.headers['proxy-connection'] || 'Not Available'
    };
    let requestDetails = [
        `GET ${urlStr} HTTP/1.1`,
        `Host: ${parsedUrl.hostname}`,
        `Connection: ${connectionStatus}`
    ];
    let responseDetails = [
        `HTTP/1.1 ${response.statusCode} ${response.reason}`,
        `Date: ${new Date().toISOString()}`
    ].concat(
        Object.entries(metadata).map(([key, value]) => `${key}: ${value}`),
        [`Connection Status: ${connectionStatus}`]
    );
    return {
        request: _fl_JOIN(requestDetails),
        response: _fl_JOIN(responseDetails)
    };
};
let test_Method = async (urlStr) => {
    let methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
    let results = [];
    for (let method of methods) {
        try {
            let response = await __mk_Req(urlStr, method);
            results.push(`${method}: ${response.statusCode}`);
        } catch (error) {
            results.push(`${method}: Failed (${error.message})`);
        }
    }
    return results.join('\n');
};
let check_status = async () => {
    try {
        let response = await __mk_Req('https://www.google.com');
        return response.statusCode === 200 ? 'Online' : 'Offline';
    } catch (error) {
        return 'Offline';
    }
};
let main = async () => {
    let urlInput = _j.o.question('["URL"]-> ');
    let urlStr = __RegFirst_Char(urlInput);
    let connectionStatus = await check_status();
    console.log('\nProcessing request...');
    try {
        let response = await __mk_Req(urlStr);
        let processed = __process_rs(response, connectionStatus, urlStr);
        console.log('\nRequest:\n' + processed.request);
        console.log('\nResponse:\n' + processed.response);
    } catch (error) {
        let errorMessage = _tr_REPLACE(`Error: ${error.message}. You are currently ${connectionStatus}.`);
        console.log(errorMessage);
    }
    console.log('\nTesting HTTP methods...');
    try {
        let methodResults = await test_Method(urlStr);
        console.log('\nHTTP Method Status Codes:\n' + methodResults + "\n");
    } catch (error) {
        console.log(`Error testing HTTP methods: ${error.message}`);
    }
};
let arp_a_table = async () => {
    let ips = _j.o.question(`["IP Addresses"]-> `).split(',').map(ip => ip.trim());
    let tableData = [];
    let i = 1;
    let promises = ips.map(ip => 
        new Promise((resolve, reject) => {
            arp.getMAC(ip, function (err, mac) {
                let net_if = os.networkInterfaces();
                let names = Object.keys(net_if);
                if (err || !mac) {
                    if (net_if.lo)
                    tableData.push({
                        'No': i++,
                        'Internet Address': ip,
                        'Physical Address': 'Not Found',
                    });
                } else {
                    tableData.push({
                        'No': i++,
                        'Internet Address': ip,
                        'Physical Address': mac
                    });
                }
                resolve();
            });
        })
    );
    await Promise.all(promises);
    console.log(`Interface: ${ips[0]}`);
    console.table(tableData);
};
let check_network_interface = async () => {
    console.log(`\n[${os.platform()}]->{Your server information}\n`);
    try {
        e.__gni();
        let _interface = os.networkInterfaces();
        for (let [name, info] of Object.entries(_interface)) {
            let mac = info.find((i) => i.mac)?.mac || 'N/A';
            console.log(`[${name}] -> MAC Address: ${mac}`);
        }
        let data = await fs.promises.readFile('/proc/net/dev', 'utf8');
        let lines = data.split('\n').slice(2);
        lines.forEach((line) => {
            let [nm_interface, stats] = line.split(':').map((str) => str.trim());
            if (nm_interface && stats) {
                let [
                    rxBytes, rxPackets, rxErrors, rxDropped,
                    , , , , txBytes, txPackets, txErrors
                ] = stats.split(/\s+/);
                console.log(
                    `\nInterface: ${nm_interface}\n` +
                    `RX packets ${rxPackets} bytes ${rxBytes}\n` +
                    `RX errors ${rxErrors} dropped ${rxDropped}\n` +
                    `TX packets ${txPackets} bytes ${txBytes}\n` +
                    `TX errors ${txErrors}\n`
                );
            }
        });
    } catch (err) {
        console.error("Err:", err.message);
    }
};
let main_select = async () => {
    let con_loop = true;
    while (con_loop) {
        let k = _j.o.question(`["${os.arch()}"]-> `);
        if (k === "exit") {
            con_loop = false;
            break;
        }
        switch (k) {
            case "1":
                await check_network_interface();
                break;
            case "2":
                await arp_a_table();
                break;
            case "3":
                console.log("Features is unavailable..");
                break;
            case "4":
                await main().catch(console.error);    
                break;
            default:
                console.log("Invalid syntax, please try again");
        }
    }
    console.log("Bye!");
};
main_select();