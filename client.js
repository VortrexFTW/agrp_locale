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

bindEventHandler("OnResourceStart", thisResource, function(event, resource) {
	localeStrings = loadLocaleStrings();

	exportFunction("getRawLocaleString", getRawLocaleString);
	exportFunction("getRawGroupedLocaleString", getRawGroupedLocaleString);
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
	for(let i in locales) {
		let localeStringFile = loadTextFile(`locales/${locales[i].localeStringFile}`);
		if(localeStringFile != null) {
			let localeId = locales[i].id;
			localeStrings[localeId] = JSON.parse(localeStringFile);
		}
	}
}

// ===========================================================================

function loadLocales() {
	let localesFile = loadTextFile(`locales.json`);
	if(localesFile != null) {
		locales = JSON.parse(localesFile);
	}
}

// ===========================================================================