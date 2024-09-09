import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function compileAndRun() {
    try {
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