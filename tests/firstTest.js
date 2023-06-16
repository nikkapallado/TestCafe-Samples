const test_url = require("../config/url.json");
const home_page_data = require("../test-data/homePageData.json");
const {home_page_object} = require("../page-objects/homePageObject.js");
import {Selector} from 'testcafe';

const developer_name = Selector('#developer-name');
const os_option = Selector('#windows');
const submit_button = Selector('#submit-button');

fixture('First fixture')
    .page(test_url.base_url);

test('First test', async test_controller => {
    await test_controller
        .typeText(developer_name,home_page_data.first_test.dev_name)
        .click(os_option)
        .click(submit_button);
    // home_page = new home_page_object(test_controller);
    // home_page.enterDevName(home_page_data.first_test.dev_name);
    // home_page.chooseOsOption();
    // home_page.clickSubmitButton();
} );