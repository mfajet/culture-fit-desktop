const {app, BrowserWindow} = require('electron');

let win;

function createWindow(){
	win = new BrowserWindow({width: 420, height: 420});
	win.loadURL(`file://${__dirname}/newIndex.html`);

	win.on('closed', () =>{
		win = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if(process.platform!=='darwin'){
		app.quit();
	}
});

app.on('activate', () => {
	if(win===null){
		createWindow();
	}
});