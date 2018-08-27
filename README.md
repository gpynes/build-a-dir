# build-a-dir README

This extension simply builds a module-like directory that contains an index file and a named file input by you.

## Install

- clone down this repo.

- move it into your `~/.vscode/extensions/` directory alongside your other extensions.

- `cd ~/.vscode/extensions/build-a-dir`

- `npm i`

- `npm run compile`

- Then reload all open vsc editors or restart vscode and you should be good to go!

## Features

<br>
It takes two arguments:
- {name} - the name of module

- {ext} - the extension type to be used 
<br>
example:

```
${pathname}/${name}/
    ${name}.${ext}
    index.${ext}
```

There are two ways to invoke this command:
- selecting `Build A Module Directory` from the command palette
- selecting `Build A Module Directory` in the right-click menu of the explorer pane

The directory that the module will created is gathered from where you right-click:
- right-clicking a `file` will create the module next to the file 
- right-clicking a `folder` will create the module inside the clicked directory
- if run from the command-palette the project's root directory will be used 


examples:
![usage-gif](./build-a-dir-usage.gif)

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings
** **No Settings Yet** **
(keeping this part here because I would like to in the future)

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of `build-a-dir`

- Adds ability to create module by right-clicking explorer menu
- Adds ability to create module via the command palette
- Allows user to input module name
- Allows user to select extension type

-----------------------------------------------------------------------------------------------------------

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
