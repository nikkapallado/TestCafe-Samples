const conf = require("../config/conf.json");
const example_page_data = require("../test-data/examplePageData.json");
// const {home_page_object} = require("../page-objects/homePageObject.js");
import { Selector, ClientFunction } from 'testcafe';

const developer_name = Selector('#developer-name');
const os_option = Selector('#windows');
const submit_button = Selector('#submit-button');
const header = Selector('h1');
const dropdown = Selector('select#preferred-interface');
const options = dropdown.find('option');
const triedTestCafeCheckbox = Selector('input#tried-test-cafe');
const slider = Selector('div#slider');
const populateButton = Selector('input#populate');

const getPageURL = ClientFunction(() => window.location.href);

fixture('First fixture')
    .meta('version', '1.0.0')
    .beforeEach(async test_controller => {
        await test_controller
            .maximizeWindow()
            .setTestSpeed(0.75)
            .setPageLoadTimeout(0)
    })
    .page(conf.base_url);

test.meta('env', 'production')
    .page(`${conf.base_url}/example/`)
    ('First test', async test_controller => {
        await test_controller
            .setTestSpeed(0.1)
            .expect(developer_name.value).eql('', 'Developer name is not empty')
            .typeText(developer_name, example_page_data.first_test.dev_name)
            .expect(developer_name.value).eql(example_page_data.first_test.dev_name, `The developer name is not ${example_page_data.first_test.dev_name}`)
            .click(os_option)
            .click(submit_button)
            .expect(getPageURL()).contains('/thank-you.html');
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
            .click(submit_button)
            .expect(getPageURL()).contains('/thank-you.html');
    });

test.timeouts({ pageLoadTimeout: 2000, })
    ('Navigate to example page', async test_controller => {
        await test_controller
            .navigateTo(`${conf.base_url}/example/`)
            .expect(getPageURL()).contains(`${conf.base_url}/example/`)
            .expect(header.textContent).eql('Example');
    });

test.page(`${conf.base_url}/example/`)
    ('Select Javascript API as interface', async test_controller => {
        await test_controller
            .click(dropdown)
            .click(options.withText('JavaScript API'))
            .expect(dropdown.value).eql('JavaScript API', 'Dropdown does not contain JavaScript API');
    });

test.page(`${conf.base_url}/example/`)
    ('Test Drag', async test_controller => {
        await test_controller
            .click(triedTestCafeCheckbox)
            .dragToElement(slider, Selector('div.slider-value').withText('2'));
    })

test.page(`${conf.base_url}/example/`)
    ('Test Hover', async test_controller => {
        await test_controller
            .hover(populateButton);
    })