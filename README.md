# uthelp

**uthelp** is a command-line utility script navigation tool designed to simplify the process of browsing and executing utility scripts. This tool provides an intuitive, menu-driven interface that allows users to navigate through directories, view script descriptions, and execute scripts with ease.

## Features

- **Menu-Driven Interface**: Navigate through your utility scripts using a simple, cursor-based menu.
- **Script Descriptions**: View descriptions of scripts to understand their functionality before executing them.
- **Supports Shell and JavaScript Scripts**: Execute `.sh` and `.js` scripts directly from the menu.
- **Breadcrumb Navigation**: Easily keep track of your current location within the directory structure.
- **Exit Confirmation**: Prevent accidental exits with a confirmation prompt, or use `Control + C` to exit immediately.

## Installation

Install the tool globally using npm:

```sh
npm install -g utility-help
```

## Usage

Run the tool with the following command:

```sh
uthelp
```

You will be presented with a navigable menu of your utility scripts. Use the arrow keys to navigate, Enter to select and execute a script, and Backspace to go back. Press ESC to exit the program with a confirmation prompt, or Control + C to exit immediately.

## Screenshot

```
  Utilities

 👉   📦 1. Do Something (DoSomething)
      🔧 2. Deploy Prisma (deployPrisma.sh)

      🚪 [ Exit Program (ESC) ]

    Description:
      Test Descriptions
    2nd line of descriptions
```
