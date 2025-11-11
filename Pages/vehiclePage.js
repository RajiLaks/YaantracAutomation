const { expect } = require('@playwright/test');

class vehiclePage {
    constructor(page) {
        this.page = page;
        //Vehicle Module
        this.managementIcon = page.locator('[aria-label="Management"]');
        this.vehicleText = page.locator("[role='tablist']>a").nth(1);
        this.scrollDown_VehiclePage = page.locator('(//div[@class="vehicle-card MuiBox-root css-0"])[13]');
        this.scrollDown_VehiclePage1= page.locator('(//div[@class="vehicle-card MuiBox-root css-0"])[8]/div[3]');
        this.scrollDown_VehiclePage2=page.locator('(//div[@class="vehicle-card MuiBox-root css-0"])[10]/div[3]')
        this.scrollUp_VehiclePage = page.locator('(//div[@class="vehicle-card MuiBox-root css-0"])[1]');
        this.cards = this.page.locator("div.vehicle-card");

        //Single Vehicle
        this.singleCard = page.locator("(//div[@class='info MuiBox-root css-0'])[1]");
        this.scrollDown_Vehicle = page.locator("//p[@class='MuiTypography-root MuiTypography-body1 content1 css-9l3uo3'][5]");
        this.scrollUp_Vehicle = page.locator('//p[text() = "Vehicle Details"]');
        //Update Vehicle 
        this.updateButton = page.locator('//div[@class="update-btn MuiBox-root css-0"]/button');
        this.DOTinspectionDate = page.locator('(//input[@class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedEnd css-b52kj1"])[1]');
        this.InsuranceExpiryDate = page.locator('(//input[@class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedEnd css-b52kj1"])[2]');
        this.LastServiceDate = page.locator('(//input[@class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedEnd css-b52kj1"])[3]');
        this.freeway = page.locator('[placeholder="Free Way"]');
        this.nonFreeWay = page.locator('[placeholder="Non-Free Way"]');
        this.submitButton = page.locator('[type="submit"]');
        this.toasterMsg = page.locator('[role="alert"]');
        this.closeIcon = page.locator("(//div[@class='header-end MuiBox-root css-0'])/div[2]");
        this.cancelButton = page.locator("//button[text()='Cancel']");
        this.freewayAlert = page.locator("//p[text()='Free way speed limit  should be between 91 and 120']");
        this.nonFreewayAlert = page.locator('[id="6-helper-text"]');
        this.ErrorMsg = page.locator("//div[role='presentation']");
        this.cancelButton = page.locator("//div[@class='MuiBox-root css-1czis7r']/button[2]");
        //Error Alerts
        this.dotAlert = page.locator("//p[text()='Select DOT inspection date']");
        this.iedAlert = page.locator("//p[text()='Select insurance expiry date']");
        this.lsdAlert = page.locator("//p[text()='Select last service date']");
        this.FreewayAlert = page.locator("//p[text()='Enter  Freeway overspeed limit']");
        this.NonfreewayAlert = page.locator("//p[text()='Enter Non-freeway overspeed limit']");

    }
 
    async vehicle() {
        await this.managementIcon.click();
        await this.vehicleText.click();
        await this.page.waitForTimeout(1000);
        await this.scrollDown_VehiclePage1.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.scrollDown_VehiclePage2.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.scrollDown_VehiclePage.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        const getNoOfVehicle = await this.cards.count();
        await this.page.waitForTimeout(3000);
        console.log("Total Vehicle Cards:", getNoOfVehicle);
        await this.scrollUp_VehiclePage.scrollIntoViewIfNeeded();
    }
    
    async oneVehicleDetails(){
        await this.singleCard.click();
        await this.page.waitForTimeout(1000);
        await this.scrollDown_Vehicle.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.scrollUp_Vehicle.scrollIntoViewIfNeeded();
        await this.closeIcon.click();
    }

    async vehicleUpdate(DOT, IED, LSD, Freeway, NonFreeWay){
        await this.singleCard.click();
        await this.updateButton.click();
        await this.DOTinspectionDate.fill(DOT);
        await this.page.waitForTimeout(1000);
        await this.InsuranceExpiryDate.fill(IED);
        await this.page.waitForTimeout(1000);
        await this.LastServiceDate.fill(LSD);
        await this.page.waitForTimeout(1000);
        await this.freeway.clear();
        await this.freeway.fill(Freeway);
        await this.page.waitForTimeout(1000);
        await this.nonFreeWay.clear();
        await this.nonFreeWay.fill(NonFreeWay);
        await this.page.waitForTimeout(1000);
        await this.submitButton.click();
        //Print the toaster
        await this.toasterMsg.waitFor({state: 'visible', timeout: 5000});
        const msg = await this.toasterMsg.innerText();
        console.log(msg);
        await this.closeIcon.click();

    }

    async vehicleUpdate_InvalidData(DOT, IED, LSD, Freeway, NonFreeWay){
        await this.singleCard.click();
        await this.updateButton.click();
        await this.DOTinspectionDate.fill(DOT);
        await this.page.waitForTimeout(1000);
        await this.InsuranceExpiryDate.fill(IED);
        await this.page.waitForTimeout(1000);
        await this.LastServiceDate.fill(LSD);
        await this.page.waitForTimeout(1000);
        await this.freeway.clear();
        await this.freeway.fill(Freeway);
        await this.page.waitForTimeout(1000);
        await this.nonFreeWay.clear();
        await this.nonFreeWay.fill(NonFreeWay);
        await this.page.waitForTimeout(1000);
        await this.submitButton.click();
        await this.page.waitForTimeout(1000);
        await this.cancelButton.click();
        await this.page.waitForTimeout(1000);
        await this.closeIcon.click();
        await this.page.waitForTimeout(1000);

    }

    async vehicleUpdate_InvalidData1(DOT, IED, LSD, Freeway, NonFreeWay){
        await this.singleCard.click();
        await this.page.waitForTimeout(1000);
        await this.updateButton.click();
        await this.page.waitForTimeout(1000);
        await this.DOTinspectionDate.fill(DOT);
        await this.page.waitForTimeout(1000);
        await this.InsuranceExpiryDate.fill(IED);
        await this.page.waitForTimeout(1000);
        await this.LastServiceDate.fill(LSD);
        await this.page.waitForTimeout(1000);
        await this.freeway.clear();
        await this.freeway.fill(Freeway);
        await this.page.waitForTimeout(1000);
        await this.nonFreeWay.clear();
        await this.nonFreeWay.fill(NonFreeWay);
        await this.page.waitForTimeout(1000);
        await this.submitButton.click();
        await this.page.waitForTimeout(1000);
        const freewaymsg = await this.freewayAlert.innerText();
        console.log(freewaymsg);
        const nonfreewayMSG = await this.nonFreewayAlert.innerText();
        console.log(nonfreewayMSG);
        await this.cancelButton.click();
        await this.page.waitForTimeout(1000);
        await this.closeIcon.click();
        await this.page.waitForTimeout(1000);

    }

    async vehicle_WithoutData(){
        await this.singleCard.click();
        await this.page.waitForTimeout(1000);
        await this.updateButton.click();
        await this.page.waitForTimeout(1000);
        await this.DOTinspectionDate.clear();
        await this.InsuranceExpiryDate.clear();
        await this.LastServiceDate.clear();
        await this.freeway.clear();
        await this.nonFreeWay.clear();
        await this.submitButton.click();
        const DOTAlert = await this.dotAlert.innerText();
        console.log(DOTAlert);
        const IEDAlert = await this.iedAlert.innerText();
        console.log(IEDAlert);
        const LSDAlert = await this.lsdAlert.innerText();
        console.log(LSDAlert);
        const FREEWAY_Alert = await this.FreewayAlert.innerText();
        console.log(FREEWAY_Alert);
        const NonFREEWAY_Alert = await this.NonfreewayAlert.innerText();
        console.log(NonFREEWAY_Alert);
        await this.cancelButton.click();
        await this.closeIcon.click();


    }

}

module.exports = { vehiclePage };