const conf = require("../config/conf.json");
const example_page_data = require("../test-data/examplePageData.json");
// const {home_page_object} = require("../page-objects/homePageObject.js");
import { Selector } from 'testcafe';

const developer_name = Selector('#developer-name');
const os_option = Selector('#windows');
const submit_button = Selector('#submit-button');
const header = Selector('h1');
const dropdown = Selector('select#preferred-interface');
const options = dropdown.find('option');
const triedTestCafeCheckbox = Selector('input#tried-test-cafe');
const slider = Selector('div#slider');
const populateButton = Selector('input#populate');

fixture('First fixture')
    .meta('version', '1.0.0')
    .page(conf.base_url);

test.meta('env', 'production')
    .page(`${conf.base_url}/example/`)
    ('First test', async test_controller => {
        await test_controller
            .setTestSpeed(0.1)
            .typeText(developer_name, example_page_data.first_test.dev_name)
            .click(os_option)
            .click(submit_button);
        // home_page = new home_page_object(test_controller);
        // home_page.enterDevName(home_page_data.first_test.dev_name);
        // home_page.chooseOsOption();
        // home_page.clickSubmitButton();
    });

test.page(`${conf.base_url}/example/`)
    ('Second test', async test_controller => {
        await test_controller
            .typeText(developer_name, 'Betty Lafea')
            .click(os_option)
            .click(submit_button);
    });

test.timeouts({ pageLoadTimeout: 2000, })
    ('Navigate to example page', async test_controller => {
        await test_controller
            .navigateTo(`${conf.base_url}/example/`)
            .expect(header.textContent).eql('Example')
    });

test.page(`${conf.base_url}/example/`)
    ('Select Javascript API as interface', async test_controller => {
        await test_controller
            .click(dropdown)
            .click(options.withText('JavaScript API'))
            .expect(dropdown.value).eql('JavaScript API');
    });

test.page(`${conf.base_url}/example/`)
    ('Test Drag', async test_controller => {
        await test_controller
            .setTestSpeed(0.5)
            .click(triedTestCafeCheckbox)
            .dragToElement(slider, Selector('div.slider-value').withText('2'));
    })

test.only.page(`${conf.base_url}/example/`)
    ('Test Hover', async test_controller => {
        await test_controller
            .setTestSpeed(0.5)
            .hover(populateButton);
    })