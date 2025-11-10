class geofencePage{

    constructor(page){
        this.page = page;
        this.geofenceIcon = page.locator('[aria-label="Geofence"]');
        this.AddGeofence = page.locator('[class="add-icon iconify iconify--icon-park-solid"]');
        this.geofenceName = page.locator('#geoZoneName');
        this.searchLocation = page.locator('#location');
        this.radius = page.locator('#radius');
        this.addButton = page.locator('[type="submit"]');
        this.AddGeofenceToaster = page.locator("//div[text()='Geofence was created Successfully']");
        this.updateIcon = page.locator('[aria-label="Update"]');
        this.submitButton = page.locator('[type="submit"]');
        this.UpdateGeofenceToaster = page.locator("//div[text()='Geofence updated successfully']");
        this.AlertGeofenceName = page.locator("#geoZoneName-helper-text");
        this.AlertSearchlocation = page.locator('//p[@class="warning MuiBox-root css-0"]');
        this.AlertRadius = page.locator("#radius-helper-text");
        this.CancelButton = page.locator("//button[text()='Cancel']");
        this.AssignIcon = page.locator('[aria-label="Assign"]');
        this.vehicleIcon = page.locator('#vehicle');
        this.assignToster = page.locator("//div[text()='Geofence Mapping updated successfully']");
        this.clearIcon = page.locator('[aria-label="Clear"]');
        this.vehicleMappedCount = page.locator('(//p[@class="MuiTypography-root MuiTypography-body1 css-9l3uo3"])[1]/span');
        this.goefenceScreen = page.locator('(//div[@class="MuiCardHeader-root css-faujvq"])[1]');
        this.mapVehicle = page.locator('(//div[@class="cluster"])[1]');
        this.mappedvehicleicon = page.locator('[aria-label="PC6694C"]');
        this.closeButton = page.locator('[aria-label="Close"]');
        this.GeofenceSummary = page.locator('[class="icon-accordin MuiBox-root css-0"]');
        this.eyeIcon = page.locator('[class="eye-right MuiBox-root css-0"]');
        this.VehicleNumber = page.locator('//div[@class="mapping-vehicles col-items MuiBox-root css-0"]');
        this.SearchMappedVehicle = page.locator('#geofence-name');
        this.closeIcon = page.locator('[class="vehicle-mapping-icon iconify iconify--mingcute"]');
        this.NoDataText = page.locator('//div[text()="No Data Found"]');
        this.GSCloseIcon = page.locator('[class="geofence-card-closeIcon MuiBox-root css-0"]');
        this.DeleteIcon = page.locator('[aria-label="Delete"]');
        this.DeleteButton = page.locator('//div[@class="MuiStack-root delete-btn css-j7qwjs"]/div');
        this.cancelbutton = page.locator('//div[@class="MuiStack-root delete-btn css-j7qwjs"]/button');
        this.DeleteToaster = page.locator('//div[text()="Geofence deleted successfully"]');
        this.GeofenceNameErrorMsg = page.locator('//div[@class="MuiAlert-message css-1xsto0d"]');
        this.Cancelbutton = page.locator('//div[@class="geofence-cancel MuiBox-root css-0"]/button[2]');
        this.DeactivateIcon = page.locator('(//button[@aria-label="settings"])[1]');
        this.DeactivateYesButton = page.locator('//div[@class="MuiStack-root activate-btn css-j7qwjs"]/div');
        this.DeactivateNoButton = page.locator('//div[@class="MuiStack-root activate-btn css-j7qwjs"]/button');
        this.ToasterforDeactivate = page.locator("//div[text()='Geo Fence was deactivated successfully']");
        this.ToasterforActivate = page.locator('//div[text()="Geo Fence was activated successfully"]');
    }

    async geofenceModule(){
        await this.geofenceIcon.click();
        await this.page.waitForTimeout(5000);
    }

    async addGeofence(GeofenceName, Radius){
        await this.AddGeofence.click();
        await this.geofenceName.fill(GeofenceName);
        await this.page.waitForTimeout(1000);
        await this.searchLocation.fill('Hotel Boss');
        await this.page.waitForTimeout(2000);
        await this.searchLocation.press('ArrowDown');
        await this.page.waitForTimeout(1000);
        await this.searchLocation.press('Enter');
        await this.page.waitForTimeout(3000);
        await this.radius.click();
        await this.radius.clear();
        await this.radius.type(Radius);
        await this.addButton.click();
        await this.page.waitForTimeout(5000);
        const Geo_toasterMsg = await this.AddGeofenceToaster.innerText();
        console.log(Geo_toasterMsg);
        await this.page.waitForTimeout(1000);
    }

    async invalidDataForGeofence(GeofenceName, Radius){
        await this.AddGeofence.click();
        await this.geofenceName.fill(GeofenceName);
        await this.page.waitForTimeout(1000);
        await this.searchLocation.fill('Hotel Boss');
        await this.page.waitForTimeout(2000);
        await this.searchLocation.press('Enter');
        await this.radius.click();
        await this.radius.clear();
        await this.radius.type(Radius);
        await this.addButton.click();
        const alertgeofencename = await this.AlertGeofenceName.innerText();
        console.log(alertgeofencename);
        const alertsearchLocation = await this.AlertSearchlocation.innerText();
        console.log(alertsearchLocation);
        const alertRadius = await this.AlertRadius.innerText();
        console.log(alertRadius);
        await this.page.waitForTimeout(2000);
        await this.CancelButton.click();
    }

    async withoutDataForGeofence(){
        await this.AddGeofence.click();
        await this.page.waitForTimeout(1000);
        await this.addButton.click();
        await this.addButton.click();
        const alertgeofencename = await this.AlertGeofenceName.innerText();
        console.log(alertgeofencename);
        const alertsearchLocation = await this.AlertSearchlocation.innerText();
        console.log(alertsearchLocation);
        const alertRadius = await this.AlertRadius.innerText();
        console.log(alertRadius);
        await this.page.waitForTimeout(2000);
        await this.CancelButton.click();
    }

    async updateGeofence(GeofenceName, Radius){
        await this.updateIcon.nth(0).click();
        await this.page.waitForTimeout(1000);
        await this.geofenceName.clear(); 
        await this.page.waitForTimeout(1000);
        await this.geofenceName.fill(GeofenceName); 
        await this.page.waitForTimeout(1000);
        await this.searchLocation.clear();
        await this.page.waitForTimeout(1000);
        await this.searchLocation.fill('novena singapore');
        await this.page.waitForTimeout(2000);
        await this.searchLocation.press('ArrowDown');
        await this.page.waitForTimeout(1000);
        await this.searchLocation.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.radius.click();
        await this.radius.clear();
        await this.radius.type(Radius);
        await this.page.waitForTimeout(1000);
        await this.submitButton.click();
        await this.page.waitForTimeout(3000);
        const Geo_toasterMsg = await this.UpdateGeofenceToaster.innerText();
        console.log(Geo_toasterMsg);
        await this.page.waitForTimeout(1000);
    }

    async InvalidDataforUpdateGeofence(){
        await this.updateIcon.nth(0).click();
        await this.geofenceName.fill(GeofenceName);
        await this.page.waitForTimeout(1000);
        await this.searchLocation.fill('boss hotel');
        await this.page.waitForTimeout(2000);
        await this.searchLocation.press('Enter');
        await this.radius.click();
        await this.radius.clear();
        await this.radius.type(Radius);
        await this.page.waitForTimeout(1000);
        await this.addButton.click();
        await this.page.waitForTimeout(2000);
        const alertgeofencename = await this.AlertGeofenceName.innerText();
        console.log(alertgeofencename);
        const alertsearchLocation = await this.AlertSearchlocation.innerText();
        console.log(alertsearchLocation);
        const alertRadius = await this.AlertRadius.innerText();
        console.log(alertRadius);
        await this.page.waitForTimeout(2000);
        await this.CancelButton.click();
        await this.page.waitForTimeout(1000);
    }

    
    async assignSingleVehicle(){
        await this.AssignIcon.nth(0).click();
        await this.vehicleIcon.click();
        await this.page.waitForTimeout(1000);
        await this.vehicleIcon.press('ArrowDown');
        await this.page.waitForTimeout(1000);
        await this.vehicleIcon.press('ArrowDown');
        await this.page.waitForTimeout(1000);
        await this.vehicleIcon.press('ArrowDown');
        await this.page.waitForTimeout(1000);
        await this.vehicleIcon.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.vehicleIcon.click();
        await this.page.waitForTimeout(1000);
        await this.submitButton.click();
        await this.page.waitForTimeout(2000);
        const toastermsg = await this.assignToster.innerText();
        console.log(toastermsg);
        await this.page.waitForTimeout(2000);
        const VehicleMapped = await this.vehicleMappedCount.innerText();
        console.log(VehicleMapped);
        await this.page.waitForTimeout(2000);
    }

    async assignAllVehicle(){
        await this.AssignIcon.nth(0).click();
        await this.vehicleIcon.click();
        await this.page.waitForTimeout(2000);
        await this.clearIcon.click();
        await this.page.waitForTimeout(1000);
        await this.vehicleIcon.press('ArrowUp');
        await this.vehicleIcon.press('ArrowUp');
        await this.vehicleIcon.press('Enter');
        await this.vehicleIcon.click();
        await this.submitButton.click();
        await this.page.waitForTimeout(2000);
        const toastermsg = await this.assignToster.innerText();
        console.log(toastermsg);
        await this.page.waitForTimeout(2000);
        const VehicleMapped = await this.vehicleMappedCount.innerText();
        console.log(VehicleMapped);
        await this.page.waitForTimeout(2000);

    }

    async GeofenceDetails(){
        await this.goefenceScreen.click();
        await this.page.waitForTimeout(1000);
        await this.mapVehicle.click();
        await this.page.waitForTimeout(2000);
        await this.mappedvehicleicon.click();
        await this.page.waitForTimeout(2000);
        await this.closeButton.click();
        await this.GeofenceSummary.click();
        await this.eyeIcon.click();
        await this.page.waitForTimeout(1000);
        const printVehicleNumber = await this.VehicleNumber.innerText();
        console.log(printVehicleNumber);
        await this.page.waitForTimeout(1000);
        await this.SearchMappedVehicle.fill('PD8161E');
        await this.page.waitForTimeout(1000);
        const printSearchVehicle = await this.page.locator('//div[@class="mapping-vehicles col-items MuiBox-root css-0"]').innerText();
        console.log(printSearchVehicle);
        await this.closeIcon.click();
        await this.page.waitForTimeout(1000);
        const nodataText = await this.NoDataText.innerText();
        console.log(nodataText);
        await this.page.waitForTimeout(1000);
        await this.GSCloseIcon.click(); 
        await this.page.waitForTimeout(2000);

    }

    async ExistingGeofenceName(GeofenceName, Radius){
        await this.AddGeofence.click();
        await this.geofenceName.fill(GeofenceName);
        await this.page.waitForTimeout(1000);
        await this.searchLocation.fill('Hotel Boss');
        await this.page.waitForTimeout(2000);
        await this.searchLocation.press('ArrowDown');
        await this.page.waitForTimeout(1000);
        await this.searchLocation.press('Enter');
        await this.page.waitForTimeout(3000);
        await this.radius.click();
        await this.radius.clear();
        await this.radius.type(Radius);
        await this.addButton.click();
        await this.page.waitForTimeout(5000);
        const ErrorMessage = await this.GeofenceNameErrorMsg.innerText();
        console.log(ErrorMessage);
        await this.page.waitForTimeout(1000);
        await this.Cancelbutton.click();
    }

    async deactivate(){
        await this.DeactivateIcon.click();
        await this.page.waitForTimeout(1000);
        await this.DeactivateNoButton.click();
        await this.page.waitForTimeout(1000);
        await this.DeactivateIcon.click();
        await this.page.waitForTimeout(1000);
        await this.DeactivateYesButton.click();
        await this.page.waitForTimeout(3000);
        const DeactivateToaster = await this.ToasterforDeactivate.innerText();
        console.log(DeactivateToaster);
        await this.page.waitForTimeout(1000);
    }

    async activate(){
        await this.DeactivateIcon.click();
        await this.page.waitForTimeout(1000);
        await this.DeactivateNoButton.click();
        await this.page.waitForTimeout(1000);
        await this.DeactivateIcon.click();
        await this.page.waitForTimeout(1000);
        await this.DeactivateYesButton.click();
        await this.page.waitForTimeout(3000);
        const ActivateToaster = await this.ToasterforActivate.innerText();
        console.log(ActivateToaster);
        await this.page.waitForTimeout(1000);
    }

    async deleteGeofence(GeofenceName, Radius){
        await this.AddGeofence.click();
        await this.geofenceName.fill(GeofenceName);
        await this.page.waitForTimeout(1000);
        await this.searchLocation.fill('Hotel Boss');
        await this.page.waitForTimeout(2000);
        await this.searchLocation.press('ArrowDown');
        await this.page.waitForTimeout(1000);
        await this.searchLocation.press('Enter');
        await this.page.waitForTimeout(3000);
        await this.radius.click();
        await this.radius.clear();
        await this.radius.type(Radius);
        await this.addButton.click();
        await this.page.waitForTimeout(5000);
        await this.DeleteIcon.nth(0).click();
        await this.page.waitForTimeout(1000);
        await this.cancelbutton.click();
        await this.page.waitForTimeout(1000);
        await this.DeleteIcon.nth(0).click();
        await this.page.waitForTimeout(1000);
        await this.DeleteButton.click();
        await this.page.waitForTimeout(3000);
        const deleteToasterMessage = await this.DeleteToaster.innerText();
        console.log(deleteToasterMessage);
        await this.page.waitForTimeout(3000);
    }

    
       
}

module.exports = {geofencePage};