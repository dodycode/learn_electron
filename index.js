const electron = require('electron');

const {
	app,
	BrowserWindow,
	Menu,
	ipcMain
} = electron;

let mainWindow, createWindow, listWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		},
		title: 'Aplikasi Dokter'
	});

	mainWindow.loadURL(`file://${__dirname}/main.html`);
	mainWindow.on('closed', () => {
		app.quit();
		mainWindow = null;
	})
})