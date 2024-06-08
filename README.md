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

# uthelp ฉบับภาษาไทย

**uthelp** เป็นเครื่องมือสำหรับการนำทางและเรียกใช้สคริปต์จากบรรทัดคำสั่ง ซึ่งออกแบบมาเพื่อช่วยให้การเรียกใช้สคริปต์ในโปรเจกต์ของคุณง่ายขึ้น โดยมีอินเตอร์เฟซที่ใช้งานง่าย ช่วยให้คุณสามารถนำทางผ่านไดเรกทอรี ดูคำอธิบายของสคริปต์ และเรียกใช้สคริปต์ได้อย่างสะดวก

## คุณสมบัติ

- **อินเตอร์เฟซแบบเมนู**: นำทางผ่านสคริปต์ของคุณด้วยเมนูที่ใช้งานง่าย
- **คำอธิบายสคริปต์**: ดูคำอธิบายของสคริปต์เพื่อเข้าใจการทำงานก่อนที่จะเรียกใช้
- **รองรับสคริปต์ Shell และ JavaScript**: เรียกใช้สคริปต์ `.sh` และ `.js` ได้โดยตรงจากเมนู
- **การนำทางแบบ Breadcrumb**: ติดตามตำแหน่งปัจจุบันของคุณในโครงสร้างไดเรกทอรีได้อย่างง่ายดาย
- **การยืนยันการออก**: ป้องกันการออกโดยไม่ได้ตั้งใจด้วยการยืนยัน หรือใช้ `Control + C` เพื่อออกทันที

## การติดตั้ง

ติดตั้งเครื่องมือโดยใช้ npm:

```sh
npm install -g utility-help
```

## การใช้งาน

### การตั้งค่าไดเรกทอรีของคุณ

1. สร้างไดเรกทอรีชื่อ `uthelp` ในไดเรกทอรีทำงานปัจจุบันของคุณ
2. วางสคริปต์ของคุณ (เช่น ไฟล์ `.sh` และ `.js`) ไว้ในไดเรกทอรี `uthelp`

โครงสร้างไดเรกทอรีของคุณควรมีลักษณะดังนี้:

```
your-project/
├── uthelp/
│   ├── script1.sh
│   ├── script2.js
│   └── DeployServer
│       ├── readme.md
│       └── deployProduction.sh
```

### การเรียกใช้เครื่องมือ

นำทางไปยังไดเรกทอรีรากของโปรเจกต์ของคุณและเรียกใช้เครื่องมือ:

```sh
uthelp
```

คุณจะเห็นเมนูของสคริปต์ที่สามารถนำทางได้ ใช้ปุ่มลูกศรเพื่อเลือก `Enter` เพื่อเลือกและเรียกใช้สคริปต์ และ `Backspace` เพื่อกลับไปยังเมนูก่อนหน้า กด `ESC` เพื่อออกจากโปรแกรมพร้อมกับการยืนยัน หรือ `Control + C` เพื่อออกทันที

### การแสดงเวอร์ชัน

เพื่อแสดงเวอร์ชันปัจจุบันของเครื่องมือ ให้ใช้ตัวเลือก `-v` หรือ `--version`:

```sh
uthelp -v
```

## ตัวอย่าง

เมื่อคุณตั้งค่าไดเรกทอรี `uthelp` ของคุณพร้อมกับสคริปต์ การเรียกใช้ `uthelp` จะแสดงเมนูเช่นนี้:

```
Utilities

👉 1. 📦 Example Folder (example-folder)
   2. 🔧 Example Script (example-script.sh)
   3. 🔧 Another Script (another-script.js)

Description:
  Example Script
```

### การนำทางเมนูโดยละเอียด

- **ปุ่มลูกศร**: นำทางผ่านรายการเมนู
- **Enter**: เลือกและเรียกใช้สคริปต์ที่ไฮไลต์ หรือเข้าสู่ไดเรกทอรี
- **Backspace**: กลับไปยังเมนูก่อนหน้า
- **ESC**: ออกจากโปรแกรมพร้อมกับการยืนยัน
- **Control + C**: ออกจากโปรแกรมทันทีโดยไม่ต้องยืนยัน

## การร่วมพัฒนา

หากคุณต้องการร่วมพัฒนาโปรเจกต์นี้ กรุณาทำตามขั้นตอนดังนี้:

1. Fork รีโพสิทอรี
2. สร้างสาขาใหม่สำหรับฟีเจอร์หรือการแก้ไขบั๊กของคุณ
3. ทำการเปลี่ยนแปลงของคุณ
4. ส่ง pull request พร้อมกับคำอธิบายการเปลี่ยนแปลงของคุณ

## ใบอนุญาต

โปรเจกต์นี้มีใบอนุญาตภายใต้ ISC License ดูไฟล์ [LICENSE](LICENSE) สำหรับรายละเอียดเพิ่มเติม

## ซอร์สโค้ด

ซอร์สโค้ดสำหรับโปรเจกต์นี้สามารถพบได้ที่รีโพสิทอรี GitHub ต่อไปนี้:

[https://github.com/maetee/uthelp](https://github.com/maetee/uthelp)

### หมายเหตุ

- ตรวจสอบให้แน่ใจว่าได้สร้างไดเรกทอรี `uthelp` ในไดเรกทอรีรากของโปรเจกต์ของคุณ หรือไดเรกทอรีที่คุณเรียกใช้คำสั่ง `uthelp`
- แต่ละสคริปต์ในไดเรกทอรี `uthelp` ควรมีคอมเมนต์อธิบายอยู่ด้านบนเพื่อให้ข้อมูลเมื่อถูกเลือกในเมนู เช่น:

```sh
#!/bin/bash
# This is a sample script that does something useful
echo "Hello, world!"
```
