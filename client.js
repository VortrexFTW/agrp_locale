// ===========================================================================
// Asshat Gaming Roleplay - Locale Resource
// https://github.com/VortrexFTW/agrp_locale
// Copyright (C) 2022 by Asshat Gaming (GTAC-RP Division)
// ===========================================================================
// FILE: client.js
// DESC: Provides locale functions and usage
// TYPE: Client (JavaScript)
// ===========================================================================

"use strict";

// ===========================================================================

let localeStrings = [];
let locales = {};

// ===========================================================================

bindEventHandler("OnResourceReady", thisResource, function (event, resource) {
	loadLocales();
	loadLocaleStrings();

	exportFunction("getRawLocaleString", getRawLocaleString);
	exportFunction("getRawGroupedLocaleString", getRawGroupedLocaleString);
	exportFunction("getLocaleString", getLocaleString);
	exportFunction("getGroupedLocaleString", getGroupedLocaleString);
	exportFunction("getAvailableLocaleOptions", getAvailableLocaleOptions);
	exportFunction("getLocales", getLocales);
	exportFunction("getLocaleFromParams", getLocaleFromParams);
	exportFunction("doesLocaleStringExist", doesLocaleStringExist);
});

// ===========================================================================

function getRawLocaleString(localeId, stringName) {
	return localeStrings[localeId][stringName];
}

// ===========================================================================

function getRawGroupedLocaleString(localeId, stringName, index) {
	return localeStrings[localeId][stringName][index];
}

// ===========================================================================

function loadLocaleStrings() {
	for (let i in locales) {
		let localeStringFile = loadTextFile(`locales/${locales[i].localeStringFile}`);
		if (localeStringFile != null) {
			let localeId = locales[i].id;
			localeStrings[localeId] = JSON.parse(localeStringFile);
		}
	}
}

// ===========================================================================

function loadLocales() {
	let localesFile = loadTextFile(`locales.json`);
	if (localesFile != null) {
		locales = JSON.parse(localesFile);
	}
}

// ===========================================================================

function getLocales() {
	return locales;
}

// ===========================================================================

function getLocaleString(localeId, stringName, ...args) {
	let tempString = getRawLocaleString(localeId, stringName);

	if (tempString == "" || tempString == null || tempString == undefined) {
		return "";
	}

	for (let i = 1; i <= args.length; i++) {
		tempString = tempString.replace(`{${i}}`, args[i - 1]);
	}

	return tempString;
}

// ===========================================================================

function doesLocaleStringExist(localeId, stringName) {
	let tempString = getRawLocaleString(localeId, stringName);

	if (tempString == "" || tempString == null || tempString == undefined) {
		return "";
	}
}

// ===========================================================================

function getGroupedLocaleString(localeId, stringName, index, ...args) {
	let tempString = getRawGroupedLocaleString(localeId, stringName, index);

	if (tempString == "" || tempString == null || tempString == undefined) {
		return "";
	}

	for (let i = 1; i <= args.length; i++) {
		tempString = tempString.replace(`{${i}}`, args[i - 1]);
	}

	return tempString;
}

// ===========================================================================

function getAvailableLocaleOptions() {
	return locales.filter(locale => locale.requiresUnicode == false);
}

// ===========================================================================

function getLocaleFromParams() {
	let locales = getLocales();
	if (isNaN(params)) {
		for (let i in locales) {
			if (toLowerCase(locales[i].isoCode).indexOf(toLowerCase(params)) != -1) {
				return i;
			}

			if (toLowerCase(locales[i].englishName).indexOf(toLowerCase(params)) != -1) {
				return i;
			}
		}
	}

	return -1;
}

// ===========================================================================