var util = require('util');
var spawn = require('child_process').spawn;
module.exports.getMAC = function(ipaddress, cb) {
	if(process.platform.indexOf('linux') == 0) {
		exports.readMACLinux(ipaddress, cb);
	}
	else if (process.platform.indexOf('win') == 0) {
		exports.readMACWindows(ipaddress, cb);
	}
	else if (process.platform.indexOf('darwin') == 0) {
		exports.readMACMac(ipaddress, cb);
	}
};
module.exports.readMACLinux = function(ipaddress, cb) {
	var ping = spawn("ping", [ "-c", "1", ipaddress ]);
	ping.on('close', function (code) {
		var arp = spawn("arp", [ "-n", ipaddress ]);
		var buffer = '';
		var errstream = '';
		arp.stdout.on('data', function (data) {
			buffer += data;
		});
		arp.stderr.on('data', function (data) {
			errstream += data;
		});
		arp.on('close', function (code) {
			if (code !== 0) {
				console.log("Error running arp " + code + " " + errstream);
				cb(true, code);
				return;
			}
			var table = buffer.split('\n');
			if (table.length >= 2) {
				var parts = table[1].split(' ').filter(String);
				cb(false, parts.length == 5 ? parts[2] : parts[1]);
				return;
			}
			cb(true, "Could not find ip in arp table: " + ipaddress);
		});
	});	
	
};
module.exports.readMACWindows = function(ipaddress, cb) {
	var ping = spawn("ping", ["-n", "1", ipaddress ]);
	ping.on('close', function (code) {
		var arp = spawn("arp", ["-a", ipaddress] );
		var buffer = '';
		var errstream = '';
		var lineIndex;
		
		arp.stdout.on('data', function (data) {
			buffer += data;
		});
		arp.stderr.on('data', function (data) {
			errstream += data;
		});
		arp.on('close', function (code) {
			if (code !== 0) {
				console.log("Error running arp " + code + " " + errstream);
				cb(true, code);
				return;
			}
			var table = buffer.split('\r\n');
			for (lineIndex = 3; lineIndex < table.length; lineIndex++) {	
				var parts = table[lineIndex].split(' ').filter(String);
				if (parts[0] === ipaddress) {
					var mac = parts[1].replace(/-/g, ':');
					cb(false, mac);
					return;
				}
			}
			cb(true, "Count not find ip in arp table: " + ipaddress); 
		});
	});	
};
module.exports.readMACMac = function(ipaddress, cb) {	
	var ping = spawn("ping", ["-c", "1", ipaddress ]);
	ping.on('close', function (code) {
		var arp = spawn("arp", ["-n", ipaddress] );
		var buffer = '';
		var errstream = '';
		arp.stdout.on('data', function (data) {
			buffer += data;
		});
		arp.stderr.on('data', function (data) {
			errstream += data;
		});
		arp.on('close', function (code) {
			if (code !== 0 && errstream !== '') {
				console.log("Error running arp " + code + " " + errstream);
				cb(true, code);
				return;
			}
			var parts = buffer.split(' ').filter(String);
			if (parts[3] !== 'no') {
				var mac = parts[3].replace(/^0:/g, '00:').replace(/:0:/g, ':00:').replace(/:0$/g, ':00').replace(/:([^:]{1}):/g, ':0$1:');
				cb(false, mac);
				return;
			}	
			cb(true, "Count not find ip in arp table: " + ipaddress);
		});
	});	
};