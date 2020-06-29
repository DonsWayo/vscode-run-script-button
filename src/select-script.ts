import { window, workspace, Uri } from 'vscode';


export async function showScripts() {
    let wok = workspace.rootPath;

    if (wok) {
        let packageJsonPath = (`${wok}/package.json`);
        let readPakageJson = await workspace.fs.readFile(Uri.file(packageJsonPath));
        let jsonOutput = JSON.parse(readPakageJson.toString());
        window.showQuickPick(Object.keys(jsonOutput.scripts)).then(async response => {
            if (response) {
                window.showInformationMessage(response);
                //const terminal = window.createTerminal(`${response}`, '/bin/bash', 'npm run lint');
                const terminal = window.createTerminal({
                    cwd: wok,
                    hideFromUser: false,
                    name: response,
                });
                terminal.show();
                setTimeout(() => {
                    terminal.sendText(`npm run ${response}`);
                }, 1000);
            }
        });
    }

}