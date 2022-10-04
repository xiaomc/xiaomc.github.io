const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);

async function executeCommand(name) {
     let today = new Date()
     let dayStr = today.toISOString().split('T')[0]
     const fileName = dayStr + "-" + name + ".md";
     const { stdout, stderr } = await exec('/usr/local/bin/hugo new posts/' + fileName, {cwd: app.fileManager.vault.adapter.basePath});
     console.log('stdout:', stdout);
     console.log('stderr:', stderr);
     if (stdout) {
         new Notice("New Blog Created["+fileName+"]")
     }else{
         new Notice("New Blog Create Faild. "+stderr)
     }
}

module.exports = async (params) => {
    QuickAdd = params;
    const name = await QuickAdd.quickAddApi.inputPrompt("Blog - Article Name");
    await executeCommand(name);
}
