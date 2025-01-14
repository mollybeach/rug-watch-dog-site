import * as net from 'net';
import * as dotenv from 'dotenv';
import { exec } from 'child_process';
import { promisify } from 'util';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const execAsync = promisify(exec);

async function checkDatabaseAccess() {
    const host = 'rugwatchdog-db.cbsgow8mwtmh.us-east-2.rds.amazonaws.com';
    const port = 5432;

    console.log('\n🔍 Checking Database Access...\n');

    // 1. Check DNS resolution
    try {
        console.log('1️⃣ Checking DNS resolution...');
        const { stdout } = await execAsync(`dig ${host}`);
        console.log('✅ DNS Resolution successful');
        console.log('IP Addresses found:', stdout.match(/IN\s+A\s+([0-9.]+)/g)?.map(x => x.split(/\s+/).pop()));
    } catch (error) {
        console.error('❌ DNS Resolution failed:', error);
    }

    // 2. Test TCP connection
    console.log('\n2️⃣ Testing TCP connection...');
    return new Promise((resolve) => {
        const socket = new net.Socket();
        
        socket.setTimeout(5000);  // 5 second timeout

        socket.on('connect', () => {
            console.log('✅ TCP Connection successful');
            socket.end();
            resolve(true);
        });

        socket.on('timeout', () => {
            console.error('❌ Connection timeout');
            socket.destroy();
            resolve(false);
        });

        socket.on('error', (error) => {
            console.error('❌ Connection failed:', error.message);
            resolve(false);
        });

        console.log(`Attempting to connect to ${host}:${port}...`);
        socket.connect(port, host);
    });
}

// Run the check
checkDatabaseAccess().then(success => {
    if (!success) {
        console.log('\n⚠️  Action Required:');
        console.log('1. Add these IPs to your RDS security group:');
        console.log('   - IPv4: (run: curl -4 ifconfig.me)');
        console.log('   - IPv6: (run: curl -6 ifconfig.me)');
        console.log('2. Allow inbound traffic on port 5432');
        process.exit(1);
    }
    process.exit(0);
}); 