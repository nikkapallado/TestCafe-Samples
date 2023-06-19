import {Selector} from 'testcafe';

exports.home_page_object = class home_page_object {
    constructor(test_controller) {
        this.test_controller = test_controller;
        this.developer_name = Selector('#developer-name');
        this.os_option = Selector('#windows');
        this.submit_button = Selector('#submit-button');
    }

    async enterDevName(dev_name){
        await this.test_controller.typeText(this.developer_name, dev_name);
    }

    async chooseOsOtion(){
        await this.test_controller.click(this.os_option);
    }

    async clickSubmitButton(){
        await this.test_controller.click(this.submit_button);
    }
}