import { window, workspace, Uri } from 'vscode';
import { existsSync } from 'fs';

export async function showScripts() {
    const wok = workspace.rootPath;

    if (wok) {
        const packageJsonPath = (`${wok}/package.json`);
        const checkPkgManager = existsSync(`${wok}/package-lock.json`);
        const useNpm = checkPkgManager ? true : false;
        const runCommand = useNpm ? 'npm' : 'yarn';
        const readPakageJson = await workspace.fs.readFile(Uri.file(packageJsonPath));
        const jsonOutput = JSON.parse(readPakageJson.toString());
        window.showQuickPick(Object.keys(jsonOutput.scripts)).then(async response => {
            if (response) {
                const terminal = window.createTerminal({
                    cwd: wok,
                    hideFromUser: false,
                    name: response,
                });
                terminal.show();
                setTimeout(() => {
                    terminal.sendText(`${runCommand} run ${response}`);
                }, 1000);
            }
        });
    } else {
        window.showErrorMessage('Workspace not found');
    }

}