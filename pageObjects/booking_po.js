//'use strict';
const EC = protractor.ExpectedConditions;
const commonHelper = browser.params.commonHelperAbsPath;
let autoReloadJson = require("auto-reload-json");
const { element, ExpectedConditions } = require("protractor");
let dataJSONPageInfo = browser.params.dataConfigJSONPageStaticInfo;
let dataJSONPageInfoRead = autoReloadJson(dataJSONPageInfo);
const automationPractice_PO = function () {
	//Elements in the page
	let elm_HomePage_welcomeText = element(
		by.cssContainingText(".jumbotron", "Welcome to the Simple Travel Agency!")
	);
	let elm_fromPort = element(by.name("fromPort"));
	let elm_toPort = element(by.name("toPort"));
	let elm_findFlights_button = element(
		by.css('input[value="Find Flights"][type="submit"]')
	);
	let elm_reserve_page = element(by.css("div.container>h3"));
	let elm_purchase_page = element(by.css("div.container>h2"));
	let elm_name = element(by.id("inputName"));
	let elm_address = element(by.id("address"));
	let elm_city = element(by.id("city"));
	let elm_state = element(by.id("state"));
	let elm_zipCode = element(by.id("zipCode"));
	let elm_creditCardNumber = element(by.id("creditCardNumber"));
	let elm_creditCardMonth = element(by.id("creditCardMonth"));
	let elm_creditCardYear = element(by.id("creditCardYear"));
	let elm_nameOnCard = element(by.id("nameOnCard"));
	let elm_purchaseFlight_button = element(
		by.css('input[value="Purchase Flight"]')
	);
	let elm_confirmation_page = element(by.css("div.container>h1"));
	//Expected Conditions
	let ecWaitForIndexPageToLoad = EC.and(
		EC.visibilityOf(elm_HomePage_welcomeText)
	);
	let ecWaitForReservePage = EC.presenceOf(elm_reserve_page);
	let ecWaitForPurchasePage = EC.presenceOf(elm_purchase_page);
	let ecWaitForConfirmationPage = EC.presenceOf(elm_confirmation_page);
	//Functions to use
	this.fn_URLNavigation = async () => {
		await browser.get(dataJSONPageInfoRead.indexPage.pageURL);
		await browser.wait(
			ecWaitForIndexPageToLoad,
			20000,
			"Timeout: PageLoadError"
		);
		return browser.getTitle();
	};
	this.fn_PortSelection = async () => {
		await commonHelper.selectDropDownByValue(
			elm_fromPort,
			dataJSONPageInfoRead.indexPage.departureCity
		);
		await commonHelper.selectDropDownByValue(
			elm_toPort,
			dataJSONPageInfoRead.indexPage.destinationCity
		);
		await elm_findFlights_button.click();
		await browser.wait(ecWaitForReservePage, 20000, "Timeout: PageLoadError");
		let tempText =
			"Flights from " +
			dataJSONPageInfoRead.indexPage.departureCity +
			" to " +
			dataJSONPageInfoRead.indexPage.destinationCity +
			":";
		await elm_reserve_page.getText().then(async (text) => {
			if (text.trim() === tempText) {
				await expect(true).toBe(true,`reserve page loaded`);
				return true;
			} else {
				await expect(true).toBe(false,`reserve page loading failed`);
				return false;
			}
		});
	};
	this.fn_chooseFlight = async () => {
		let flag = 0;
		let element_temp;
		await element.all(by.css("table tbody tr")).filter(async (elm, index) => {
			await elm
				.element(by.tagName("form"))
				.getAttribute("name")
				.then(async (text) => {
					if (text === dataJSONPageInfoRead.indexPage.flightNumber) {
						element_temp = elm;
						flag = 1;
					}
				});
		});
		if (flag) {
			await element_temp.element(by.css('input[type="submit"]')).click();
			await expect(true).toBe(true,`Flight Selection Successful`);
			return true;
		}
		else{
			await expect(true).toBe(false,`Flight Selection is not Successful`);
			return false;
		}
	};
	this.fn_fillingUserInfo = async () => {
		await browser.wait(ecWaitForPurchasePage, 20000, "Timeout: PageLoadError");
		await elm_name.sendKeys(dataJSONPageInfoRead.indexPage.name);
		await elm_address.sendKeys(dataJSONPageInfoRead.indexPage.address);
		await elm_city.sendKeys(dataJSONPageInfoRead.indexPage.city);
		await elm_state.sendKeys(dataJSONPageInfoRead.indexPage.state);
		await elm_zipCode.sendKeys(dataJSONPageInfoRead.indexPage.zipcode);
		await elm_creditCardNumber.sendKeys(
			dataJSONPageInfoRead.indexPage.creditCardNumber
		);
		await elm_creditCardMonth.sendKeys(dataJSONPageInfoRead.indexPage.month);
		await elm_creditCardYear.sendKeys(dataJSONPageInfoRead.indexPage.year);
		await elm_nameOnCard.sendKeys(dataJSONPageInfoRead.indexPage.cardName);
		await elm_purchaseFlight_button.click();
		await browser.wait(
			ecWaitForConfirmationPage,
			20000,
			"Timeout: PageLoadError"
		);
		let elm_id = element(by.cssContainingText('table[class="table"] td', "Id"));
		await elm_id.isPresent().then(async (text) => {
			await expect(true).toBe(true,`Successfully booked the flight`);
			return true;
		}).catch(async(error)=>{
			await expect(true).toBe(false,`Failed to book the flight`);
			return false;
		})
		
	};
	
};
module.exports = new automationPractice_PO();
