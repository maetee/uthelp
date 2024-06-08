#!/usr/bin/env node

const readline = require('readline');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'uthelp');
let currentDir = rootDir;

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

async function displayMenu() {
    console.clear();
    const breadcrumb = getBreadcrumb();
    console.log(`  ${breadcrumb}\n`);
    menuItems.forEach((item, index) => {
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
        const textDesc = '\nDescription:\n\x1B[90m' + (fileDescription || 'No description available') + '\x1B[0m';
        const textDescTab = textDesc.split('\n').map(line => `    ${line}`).join('\n');
        console.log(textDescTab);
    }
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
