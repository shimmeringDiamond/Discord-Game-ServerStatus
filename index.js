import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import {spawn} from "node:child_process";

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnvFile(filePath) {
    try {
        const envConfig = fs.readFileSync(filePath, 'utf8').split('\n');

        for (const line of envConfig) {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        }

        console.log('Environment variables loaded successfully.');
    } catch (error) {
        console.error('Error loading .env file:', error);
    }
}

async function compileAndRun() {
    try {
        // Load environment variables
        const envPath = path.join(__dirname, '.env');
        loadEnvFile(envPath);

        // Compile TypeScript
        console.log('Compiling TypeScript...');
        await execAsync('npx tsc');
        console.log('Compilation successful.');

        // Run compiled TypeScript
        const child = spawn('node', ['build/main.js'], {
            stdio: 'inherit',
            env: process.env
        });

        child.on('close', (code) => {
            console.log(`Child process exited with code ${code}`);
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

compileAndRun();