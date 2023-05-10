/* import os from 'os';
const networkInterfaces = os.networkInterfaces();
const ipv4Interfaces = networkInterfaces['Ethernet'].filter(
	(iface) => iface.family === 'IPv4'
);

if (ipv4Interfaces.length > 0) {
	const ipAddress = ipv4Interfaces[0].address;
	console.log(`IP address: ${ipAddress}`);
} else {
	console.error('No IP address found');
}

export default ipAddress; */

export const API_URL = `http://${window.location.hostname}:3000`;
