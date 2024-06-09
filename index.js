#!/usr/bin/env node

const readline = require('readline');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the version from package.json
const packageJson = require('./package.json');
const version = packageJson.version;

// Check for version flag
if (process.argv.includes('-v') || process.argv.includes('--version')) {
    console.log(`uthelp version ${version}`);
    process.exit(0);
}

// Determine the root directory based on the executed script
const scriptPath = process.argv[1]; // This gets the path of the executed script
const scriptDir = path.dirname(scriptPath);
// Use the current working directory and append 'uthelp'
const rootDir = path.join(process.cwd(), 'uthelp');
let currentDir = rootDir;

if (!fs.existsSync(rootDir)) {
    console.error("The 'uthelp' directory does not exist in the current path.");
    console.log(`
Please create a directory named 'uthelp' in your current working directory and place your scripts inside it.

To create the directory and an example script, run the following commands:

  mkdir uthelp
  printf '#!/bin/bash\\n# This is an example script\\necho "Hello, world!"\\n' > uthelp/example-script.sh
  chmod +x uthelp/example-script.sh

Would you like to create the directory and example script automatically? (y/n)
`);
    
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', (input) => {
        const answer = input.trim().toLowerCase();
        if (answer === 'y') {
            exec('mkdir uthelp && printf \'#!/bin/bash\\n# This is an example script\\necho "Hello, world!"\\n\' > uthelp/example-script.sh && chmod +x uthelp/example-script.sh', (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error creating directory and script: ${err.message}`);
                    process.exit(1);
                }
                console.log('uthelp directory and example script created successfully.');
                console.log('');
                console.log('please run the command "uthelp" again to start the utility menu.');
                process.exit(0);
            });
        } else {
            process.exit(1);
        }
    });

    return;
}


let menuItems = [];
let selectedIndexStack = [0];
let selectedIndex = 0;

const cursorIcon = '👉';
const folderIcon = '📦';

function hideCursor() {
    process.stdout.write('\x1B[?25l');
}

function showCursor() {
    process.stdout.write('\x1B[?25h');
}

function camelCaseToWords(str) {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) { return str.toUpperCase(); });
}

function loadMenuItems() {
    const items = fs.readdirSync(currentDir).filter(item => {
        const itemPath = path.join(currentDir, item);
        return fs.lstatSync(itemPath).isDirectory() || item.endsWith('.sh') || item.endsWith('.js');
    });
    menuItems = items.map((item, index) => {
        const itemPath = path.join(currentDir, item);
        const displayName = (camelCaseToWords(item.replace(/\.sh$|\.js$/, '')) + ` (${item})`).trim();
        if (fs.lstatSync(itemPath).isDirectory()) {
            return `${folderIcon} ${index + 1}. ${displayName}`.trim();
        } else {
            return `🔧 ${index + 1}. ${displayName}`.trim();
        }
    });
    if (currentDir !== rootDir) {
        menuItems.unshift('🔙 [ Go Back (Backspace) ]');
    }
    menuItems.push('🚪 [ Exit Program (ESC) ]');
}

function getBreadcrumb() {
    const relativePath = path.relative(rootDir, currentDir);
    if (!relativePath) {
        return 'Utilities';
    }
    return `Utilities > ${relativePath.split(path.sep).join(' > ')}`;
}

async function getFileDescription(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8').split('\n');
        const descriptionLines = [1, 2, 3, 4, 5, 6].map(lineNum => fileContent[lineNum - 1])
            .filter(line => line && line.length > 3 && (line.startsWith('//') || line.startsWith('#')));
        return descriptionLines.length > 0 ? '  ' + descriptionLines.map(line => line.replace(/^\/\/|^#/, '    ').trim()).join('\n') : 'No description available';
    } catch (error) {
        return '  No description available';
    }
}

async function getFolderDescription(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8').split('\n');
        const descriptionLines = fileContent;
        return descriptionLines.length > 0 ? '  ' + descriptionLines.map(line => line.replace(/^\/\/|^#/, '    ').trim()).join('\n') : 'No description available';
    } catch (error) {
        return '  No description available';
    }
}

function drawBorderedBox(text, startX, startY, width) {
    const lines = text.split('\n');
    const horizontalBorder = '─'.repeat(width - 2);
    process.stdout.write(`\x1B[${startY};${startX}H┌${horizontalBorder}┐`);
    lines.forEach((line, index) => {
        const paddedLine = '  ' + line.padEnd(width - 4); // Add 2 spaces padding on the left
        process.stdout.write(`\x1B[${startY + 1 + index};${startX}H│${paddedLine}│`);
    });
    process.stdout.write(`\x1B[${startY + 1 + lines.length};${startX}H└${horizontalBorder}┘`);
}

async function displayMenu() {
    console.clear();
    const breadcrumb = getBreadcrumb();
    console.log(`  ${breadcrumb}\n`);

    let maxWidth = 0;
    menuItems.forEach((item, index) => {
        if (item.length > maxWidth) {
            maxWidth = item.length;
        }
        if (index === selectedIndex) {
            if (item.startsWith('🔙')) {
                console.log(` \x1B[32m${cursorIcon}   ${item}\x1B[0m\n`);
            } else if (item.startsWith('🚪')) {
                console.log(`\n \x1B[32m${cursorIcon}   ${item}\x1B[0m`);
            } else {
                console.log(` \x1B[32m${cursorIcon}   ${item}\x1B[0m`);
            }
        } else if (item.startsWith('🔙')) {
            console.log(` \x1B[90m     ${item}\x1B[0m\n`);
        } else if (item.startsWith('🚪')) {
            console.log(`\n \x1B[31m     ${item}\x1B[0m`);
        } else {
            console.log(`      ${item}`);
        }
    });

    maxWidth += 10; // Add some padding

    let fileDescription = null;
    const selectedItem = menuItems[selectedIndex];
    if (selectedItem.startsWith('🔙')) {
        fileDescription = " Go back to the previous menu";
    } else if (selectedItem.startsWith('🚪')) {
        fileDescription = " Exit the program";
    } else {
        const match = selectedItem.match(/📦 (\d+)\. (.+) \((.+)\)|🔧 (\d+)\. (.+) \((.+)\)/);
        if (match) {
            const selectedPath = path.join(currentDir, match[3] || match[6]);
            if (fs.lstatSync(selectedPath).isDirectory()) {
                fileDescription = await getFolderDescription(selectedPath + '/readme.md');
            } else {
                fileDescription = await getFileDescription(selectedPath);
            }
        }
    }

    if (fileDescription) {
        const textDesc = 'Description:\n' + (fileDescription || 'No description available');
        const maxWidthDesc = Math.min(50, process.stdout.columns - maxWidth - 4);
        const wrappedDesc = textDesc.match(new RegExp(`.{1,${maxWidthDesc}}`, 'g')).join('\n');
        drawBorderedBox(wrappedDesc, maxWidth + 2, 2, maxWidthDesc + 4); // Adjusted width to accommodate padding
    }

    displayFooter();
}

function displayMenuItemProcess(index) {
    console.clear();
    const breadcrumb = getBreadcrumb();
    console.log(`  ${breadcrumb}\n`);
    console.log(`\x1B[42m\x1B[30m Processing -${menuItems[index]} \x1B[0m`);
    console.log(``);
}

function waitForEnter() {
    return new Promise((resolve) => {
        process.stdin.once('data', () => {
            resolve();
        });
    });
}

function executeFile(filePath) {
    displayMenuItemProcess(selectedIndex);
    return new Promise((resolve) => {
        const command = filePath.endsWith('.sh') ? `sh ${filePath}` : `node ${filePath}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                resolve();
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                resolve();
                return;
            }
            console.log(stdout);
            console.log('\x1B[42m\x1B[30m Press Keyboard to go back to the menu... \x1B[0m');
            waitForEnter().then(resolve);
        });
    });
}

function changeDirectory(newDir) {
    currentDir = newDir;
    loadMenuItems();
    if (selectedIndexStack.length > 0) {
        selectedIndex = selectedIndexStack[selectedIndexStack.length - 1];
    } else {
        selectedIndex = 0;
    }
}

async function processSelection() {
    const selectedItem = menuItems[selectedIndex];
    if (selectedItem.startsWith('🔙')) {
        selectedIndexStack.pop();
        changeDirectory(path.dirname(currentDir));
    } else if (selectedItem.startsWith('🚪')) {
        await exitProgram();
    } else {
        const match = selectedItem.match(/📦 (\d+)\. (.+) \((.+)\)|🔧 (\d+)\. (.+) \((.+)\)/);
        if (match) {
            const selectedPath = path.join(currentDir, match[3] || match[6]);
            console.log(`Processing path: ${selectedPath}`);
            if (fs.lstatSync(selectedPath).isDirectory()) {
                selectedIndexStack.push(selectedIndex);
                changeDirectory(selectedPath);
            } else {
                await executeFile(selectedPath);
            }
        }
    }
}

async function processGoIntoMenu() {
    const selectedItem = menuItems[selectedIndex];
    if (selectedItem.startsWith('🔙')) {
    } else if (selectedItem.startsWith('🚪')) {
    } else {
        const match = selectedItem.match(/📦 (\d+)\. (.+) \((.+)\)|🔧 (\d+)\. (.+) \((.+)\)/);
        if (match) {
            const selectedPath = path.join(currentDir, match[3] || match[6]);
            console.log(`Processing path: ${selectedPath}`);
            if (fs.lstatSync(selectedPath).isDirectory()) {
                selectedIndexStack.push(selectedIndex);
                changeDirectory(selectedPath);
            } else {
            }
        }
    }
}

function confirmExit() {
    console.clear();
    console.log('Are you sure you want to exit? (y/n)');
    return new Promise((resolve) => {
        process.stdin.once('data', (data) => {
            const input = data.toString().trim().toLowerCase();
            if (input === 'y') {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

async function exitProgram() {
    const confirm = await confirmExit();
    if (confirm) {
        showCursor();
        console.clear();
        process.exit();
    } else {
        displayMenu();
    }
}

async function handleKeyPress(str, key) {
    if (key.name === 'up') {
        selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
    } else if (key.name === 'down') {
        selectedIndex = (selectedIndex + 1) % menuItems.length;
    } else if (key.name === 'return') {
        process.stdin.removeListener('keypress', handleKeyPress);
        await processSelection();
        process.stdin.on('keypress', handleKeyPress);
    } else if (key.name === 'right') {
        process.stdin.removeListener('keypress', handleKeyPress);
        await processGoIntoMenu();
        process.stdin.on('keypress', handleKeyPress);
    } else if (key.name === 'backspace' || key.name === 'left') {
        if (currentDir !== rootDir) {
            selectedIndexStack.pop();
            changeDirectory(path.dirname(currentDir));
        }
    } else if (key.name === 'escape') {
        await exitProgram();
    } else if (key.sequence === '\u0003') { // Check for Control + C
        showCursor();
        process.exit();
    }
    displayMenu();
}

function displayFooter() {
    // Get terminal dimensions
    const { columns, rows } = process.stdout;

    // Move to bottom right position
    process.stdout.write(`\x1B[${rows};${columns - 14}HBy Maya Wizard`);
}

async function main() {
    hideCursor();
    loadMenuItems();
    displayMenu();
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', handleKeyPress);
}

main();

process.on('exit', showCursor);
process.on('SIGINT', () => {
    showCursor();
    process.exit();
});
