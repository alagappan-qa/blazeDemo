let autoReloadJson = require ('auto-reload-json');

let dataJSONPageInfo = browser.params.dataConfigJSONPageStaticInfo;
let dataJSONPageInfoRead = autoReloadJson(dataJSONPageInfo);

let PO_booking = require('./../pageObjects/booking_po')

beforeEach(async () => {
	await browser.waitForAngularEnabled(false);
});

describe('Testing Blaze Demo Practice site', () => {

it('Load the Home Page', async () =>{
	expect(await PO_booking.fn_URLNavigation()).toEqual(dataJSONPageInfoRead.indexPage.pageTitle);
});

it('Choosing the port from the drop down', async () => {
	await PO_booking.fn_PortSelection();
});

it('Choosing the flight from the list', async () => {
	await PO_booking.fn_chooseFlight();
});

it('User information for flight booking', async () => {
	await PO_booking.fn_fillingUserInfo();
});

});