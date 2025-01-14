"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var net = require("net");
var dotenv = require("dotenv");
var child_process_1 = require("child_process");
var util_1 = require("util");
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
var execAsync = (0, util_1.promisify)(child_process_1.exec);
function checkDatabaseAccess() {
    return __awaiter(this, void 0, void 0, function () {
        var host, port, stdout, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    host = 'rugwatchdog-db.cbsgow8mwtmh.us-east-2.rds.amazonaws.com';
                    port = 5432;
                    console.log('\n🔍 Checking Database Access...\n');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    console.log('1️⃣ Checking DNS resolution...');
                    return [4 /*yield*/, execAsync("dig ".concat(host))];
                case 2:
                    stdout = (_b.sent()).stdout;
                    console.log('✅ DNS Resolution successful');
                    console.log('IP Addresses found:', (_a = stdout.match(/IN\s+A\s+([0-9.]+)/g)) === null || _a === void 0 ? void 0 : _a.map(function (x) { return x.split(/\s+/).pop(); }));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error('❌ DNS Resolution failed:', error_1);
                    return [3 /*break*/, 4];
                case 4:
                    // 2. Test TCP connection
                    console.log('\n2️⃣ Testing TCP connection...');
                    return [2 /*return*/, new Promise(function (resolve) {
                            var socket = new net.Socket();
                            socket.setTimeout(5000); // 5 second timeout
                            socket.on('connect', function () {
                                console.log('✅ TCP Connection successful');
                                socket.end();
                                resolve(true);
                            });
                            socket.on('timeout', function () {
                                console.error('❌ Connection timeout');
                                socket.destroy();
                                resolve(false);
                            });
                            socket.on('error', function (error) {
                                console.error('❌ Connection failed:', error.message);
                                resolve(false);
                            });
                            console.log("Attempting to connect to ".concat(host, ":").concat(port, "..."));
                            socket.connect(port, host);
                        })];
            }
        });
    });
}
// Run the check
checkDatabaseAccess().then(function (success) {
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
