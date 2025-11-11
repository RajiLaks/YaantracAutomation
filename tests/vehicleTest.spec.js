const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');
const { vehiclePage } = require('../Pages/vehiclePage');
const {ExcelReader} = require('../Utils/YaantracDataset');
let page;
let context;

test.describe('TS02', async()=>{

test.beforeAll('Login', async ({ browser }) => {
    context = await browser.newContext({
      viewport: { width: 1200, height: 600 },  
      geolocation: {latitude: 12.939965304673995, longitude: 80.11990807936198}, 
      permissions: ['geolocation'],
    });
    page = await context.newPage();
    
});

test('TC_Login_001 - Login with valid credentials', async()=>{
    const loginpage = new LoginPage(page);
    const excelReader = new ExcelReader();
    const urlData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx', 'Link');
    await loginpage.LandingPage(urlData[0].URL);
    await page.waitForTimeout(2000);
    const loginData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx','Login');
    const {Username, Password} = loginData[0];
    await loginpage.loginPage(Username, Password);
})

test('TC_Vehicle_001 - Verify that the Vehicle module loads successfully and displays vehicle data correctly.', async () => {
    const vehicleModule = new vehiclePage(page);
    await vehicleModule.vehicle(); 
});

test('TC_Vehicle_002 - Verify that the vehicle card displays the vehicle details.', async()=>{
    const singleVehicleDetails = new vehiclePage(page);
    await singleVehicleDetails.oneVehicleDetails();
})

test('TC_Vehicle_003 - Verify that the application allows updating the vehicle details with valid data.',async()=>{
    const updatevehicle = new vehiclePage(page);
    const excelReader = new ExcelReader();
    const vehicleData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx', 'Vehicle');
    const {DOT, IED, LSD, Freeway, NonFreeWay} = vehicleData[0];
    await updatevehicle.vehicleUpdate(DOT, IED, LSD, Freeway, NonFreeWay);
}) 

test('TC_Vehicle_004 - Ensure the application shows an alert message when updating vehicle details with invalid data.',async()=>{
    const updateInvalidData = new vehiclePage(page);
    const excelReader = new ExcelReader();
    const vehicleData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx', 'Vehicle');
    const {DOT, IED, LSD, Freeway, NonFreeWay} = vehicleData[1];
    await updateInvalidData.vehicleUpdate_InvalidData(DOT, IED, LSD, Freeway, NonFreeWay);
    const {DOT: DOT1, IED: IED1, LSD: LSD1, Freeway: Freeway1, NonFreeWay: NonFreeWay1} = vehicleData[2];
    await updateInvalidData.vehicleUpdate_InvalidData1(DOT1, IED1, LSD1, Freeway1, NonFreeWay1);
}) 

test('TC_Vehicle_005 - Verify that the Vehicle page displays an alert message when the user does not enter data in any field.', async()=>{
    const updateWithoutData = new vehiclePage(page);
    await updateWithoutData.vehicle_WithoutData();
})

});


