const conf = require("../config/conf.json");
const example_page_data = require("../test-data/examplePageData.json");
// const {home_page_object} = require("../page-objects/homePageObject.js");
import {Selector} from 'testcafe';

const developer_name = Selector('#developer-name');
const os_option = Selector('#windows');
const submit_button = Selector('#submit-button');

fixture('First fixture')
    .meta('version','1.0.0')
    .page(conf.base_url);

test.meta('env','production')
    .page(`${conf.base_url}/example/`)
    ('First test', async test_controller => {
        await test_controller
            .typeText(developer_name, example_page_data.first_test.dev_name)
            .click(os_option)
            .click(submit_button);
        // home_page = new home_page_object(test_controller);
        // home_page.enterDevName(home_page_data.first_test.dev_name);
        // home_page.chooseOsOption();
        // home_page.clickSubmitButton();
} );

test.page(`${conf.base_url}/example/`)
    ('Second test', async test_controller => {
        await test_controller
            .typeText(developer_name, 'Bett Lafea')
            .click(os_option)
            .click(submit_button);
} );