# NETWORKING TOOLS WITH NODE JS
idk i think this project is useless, cuz it just have very minimum features about network programming
But, i will try add more tools like Remote SMTP server and Routing

## Let's start

the first u will see the options, here the list:

```bash
1. Network Information
2. ARP
3. Packet Sniffer [ Coming soon ]
4. Web HTTP Header requests
```
for the input, i have made it so that you don't have to execute the file repeatedly

```bash
[<your-device-arch>]-> // just input here
```
### Option 1
The first option u will see your network interace like as u typing "ifconfig" on Linux command line

```bash
["x64"]-> 1
[linux]->{Your server information}

Interface: eth0
IPv4: 192.168.10.178
IPv6: 0:0:0:0:0:ffff:c0a8:0ab2
[lo] -> MAC Address: 00:00:00:00:00:00
[eth0] -> MAC Address: 4c:bb:68:a2:e8:26

Interface: lo
RX packets 1271433 bytes 159077277
RX errors 0 dropped 0
TX packets 1271433 bytes 159077277
TX errors 0

Interface: eth0
RX packets 1994865 bytes 2065017458
RX errors 0 dropped 0
TX packets 965381 bytes 188868162
TX errors 171

["x64"]->
```
### Option 3
The features is like tools in linux command line, it's "arp -a"
if u typing `arp -a` it will display like this

```bash
_gateway (192.168.10.178) at 2e:d7:cc:1a:b8:71 [ether] on eth0
```
in my version, i modifed display like table
```
["x64"]-> 2
["IP Addresses"]-> 192.168.10.178
Interface: 192.168.10.178
┌─────────┬────┬──────────────────┬─────────────────────┐
│ (index) │ No │ Internet Address │ Physical Address    │
├─────────┼────┼──────────────────┼─────────────────────┤
│ 0       │ 1  │ '192.168.10.178' │ '2e:d7:cc:1a:b8:71' │
└─────────┴────┴──────────────────┴─────────────────────┘
```
but, in node js, module doesn't have a method for showing the network interface, i'm so sorry :(

### Option 3
it's Packet sniffer is coming soon

## Option 4
The features of Application TCP/IP, is a HTTP, here for architecture of TCP/IP protocol

```
+===================+
| Application Layer | <- [One of them is HTTP]
+===================+
| Transport Layer   |
+===================+
| Network Layer     |
+===================+
| Link Layer        |
+===================+
```
The network architecture using the TCP/IP protocol basically consists of 4 layers, a nested collection of protocols. physical equipment, radio, cables, modems, and LAN cards, often referred to as the final layer, layer 5. So, the 5 layers are:
1. App Layer
2. Transport Layer
3. Network Layer
4. Link Layer
5. Physical Layer

### How to use?

Simple, u just input the website domain and u can see the results bellow

```bash
["x64"]-> 4
["URL"]-> www.google.com

Processing request...

Request:
GET https://www.google.com HTTP/1.1
Host: www.google.com
Connection: Online

Response:
HTTP/1.1 200 OK
Date: 2024-12-23T16:33:56.456Z
Server: gws
Last-Modified: Not Available
Accept-Ranges: none
Content-Length: Not Available
Content-Type: text/html; charset=ISO-8859-1
X-Cache: Not Available
Proxy-Connection: Not Available
Connection Status: Online

Testing HTTP methods...

HTTP Method Status Codes:
GET: 200
POST: 405
PUT: 405
DELETE: 405
PATCH: 405
OPTIONS: 405

["x64"]-> 
```
it's like curl isn't?
,but i add some method for test request the server
last, for exit the program, just typin `exit` and program will be stopped
## Author
Name: &nbsp; Ibnu yasir
\
Skill: &nbsp; Web programmer |  Back  End dev
