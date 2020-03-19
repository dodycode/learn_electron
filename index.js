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
	});

	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

const createWindowCreator = () => {
	createWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		},
		width: 504,
		height: 430,
		title: 'Create Appointments'
	});

	createWindow.setMenu(null);
	createWindow.loadURL(`file://${__dirname}/create.html`);
	createWindow.on('closed', () => {createWindow = null});
};

ipcMain.on('appointment:create', (event, appointment) => {
	console.log('(index.js) Current Appointments: '+appointment);
});

ipcMain.on('appointment:request:list', event => {
	console.log('Appointment Request List Here');
});

const listWindowCreator = () => {
	listWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		},
		width: 604,
		height: 430,
		title: 'All Appointments'
	});

	listWindow.setMenu(null);
	listWindow.loadURL(`file://${__dirname}/list.html`);
	listWindow.on('closed', () => {listWindow = null});
};

const menuTemplate = [
{
	label: 'File',
	submenu: [
		{
			label: 'New Appointment',
			click() {
				createWindowCreator();
			}
		},
		{
			label: 'All Appointments',
			click() {
				listWindowCreator();
			}
		},
		{
			label: 'Quit',
			accelerator: process.platform === 'darwin' ? 'Command+Q' : 'CTRL + Q',
			click() {
				app.quit();
			}
		}
	]
},
{
	label: 'View',
	submenu: [
		{
			role: 'reload'
		},
		{
			role: 'toggledevtools'
		}
	]
}
];