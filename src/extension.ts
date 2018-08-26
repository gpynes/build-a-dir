'use strict'
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { dirBuilder, VscodeFile } from './dirBuilder'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('"build-a-dir" is now active!')
    
    const extensionNames: vscode.QuickPickItem[] = [
        { label: '.js' },
        { label: '.jsx' },
        { label: '.ts' },
        { label: '.tsx' },
    ]
    const defaultFile: VscodeFile = {
        $mid: 0,
        fsPath: vscode.workspace.rootPath,
        path: vscode.workspace.rootPath,
        external: vscode.workspace.rootPath,
        scheme: 'file'
    }
    
    const buildDirDisposable = vscode.commands.registerCommand('extension.buildDir', async (file = defaultFile) => {
        const input_dir_name = await vscode.window.showInputBox()
        const file_ext = await vscode.window.showQuickPick(extensionNames, {placeHolder: 'ext type'})
        
        if (input_dir_name) {
            await dirBuilder.buildDir(file, input_dir_name, file_ext.label)
        } else {
            console.log('Canceled')
        }
    })

    context.subscriptions.push(buildDirDisposable)
}

// this method is called when your extension is deactivated
export function deactivate() {
}
