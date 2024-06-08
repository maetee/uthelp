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

### Configuring Your Directory

1. Create a directory named `uthelp` in your current working directory.
2. Place your utility scripts (e.g., `.sh` and `.js` files) inside the `uthelp` directory.

Your directory structure should look like this:

```
your-project/
├── uthelp/
│   ├── script1.sh
│   ├── script2.js
│   └── DeployServer
│       ├── readme.md
│       └── deployProduction.sh
```

### Running the Tool

Navigate to the root directory of your project and run the tool:

```sh
uthelp
```

You will be presented with a navigable menu of your utility scripts. Use the arrow keys to navigate, `Enter` to select and execute a script, and `Backspace` to go back. Press `ESC` to exit the program with a confirmation prompt, or `Control + C` to exit immediately.

### Displaying the Version

To display the current version of the tool, use the `-v` or `--version` option:

```sh
uthelp -v
```

## Example

Once you have your `uthelp` directory set up with scripts, running `uthelp` will show a menu like this:

```
Utilities

👉 1. 📦 Example Folder (example-folder)
   2. 🔧 Example Script (example-script.sh)
   3. 🔧 Another Script (another-script.js)

Description:
  Example Script
```

### Detailed Menu Navigation

- **Arrow Keys**: Navigate through the menu items.
- **Enter**: Select and execute the highlighted script or navigate into a directory.
- **Backspace**: Go back to the previous menu.
- **ESC**: Exit the program with a confirmation prompt.
- **Control + C**: Exit the program immediately without a confirmation prompt.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Submit a pull request with a description of your changes.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.

## Source Code

The source code for this project can be found at the following GitHub repository:

[https://github.com/maetee/uthelp](https://github.com/maetee/uthelp)

### Notes

- Ensure that the `uthelp` directory is created in the root of your project or the directory from which you run the `uthelp` command.
- Each script in the `uthelp` directory should have a descriptive comment at the top to provide information when selected in the menu. For example:

```sh
#!/bin/bash
# This is a sample script that does something useful
echo "Hello, world!"
```
