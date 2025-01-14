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
exports.maxDuration = void 0;
var postgres_1 = require("@vercel/postgres");
var dotenv = require("dotenv");
// Load environment variables from .env files
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
// Type guard for error objects
function isErrorWithDetails(error) {
    return error instanceof Error || (typeof error === 'object' &&
        error !== null &&
        'message' in error);
}
function testDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var client, result, error_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n🔍 Starting Database Tests...\n');
                    client = (0, postgres_1.createClient)({
                        connectionString: process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL + '?pgbouncer=true&connect_timeout=10'
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 9]);
                    console.log('Connecting to database...');
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    console.log('Testing basic connectivity...');
                    return [4 /*yield*/, client.query('SELECT NOW() as time')];
                case 3:
                    result = _a.sent();
                    console.log('✅ Basic connectivity successful:', result.rows[0]);
                    return [3 /*break*/, 9];
                case 4:
                    error_1 = _a.sent();
                    console.error('❌ Database error:', {
                        message: isErrorWithDetails(error_1) ? error_1.message : 'Unknown error',
                        code: isErrorWithDetails(error_1) ? error_1.code : undefined,
                        stack: isErrorWithDetails(error_1) ? error_1.stack : undefined
                    });
                    process.exit(1);
                    return [3 /*break*/, 9];
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, client.end()];
                case 6:
                    _a.sent();
                    console.log('Connection closed successfully');
                    return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    console.error('Error closing connection:', err_1);
                    return [3 /*break*/, 8];
                case 8: return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// Set max duration for function
exports.maxDuration = 60; // 60 seconds max duration
testDatabaseConnection().catch(function (error) {
    console.error('Uncaught error:', isErrorWithDetails(error) ? error.message : 'Unknown error');
    process.exit(1);
});
