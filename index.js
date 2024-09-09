import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

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
        await execAsync('tsc');
        console.log('Compilation successful.');

        // Run the compiled JavaScript
        console.log('Running the compiled JavaScript...');
        const { stdout, stderr } = await execAsync('node build/main.js');

        if (stdout) console.log('Output:', stdout);
        if (stderr) console.error('Errors:', stderr);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

compileAndRun();