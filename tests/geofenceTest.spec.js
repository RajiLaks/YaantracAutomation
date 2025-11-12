const {test} = require ('@playwright/test');
const {LoginPage} = require ('../Pages/LoginPage');
const {geofencePage} = require ('../Pages/geofencePage');
const {ExcelReader} = require ('../Utils/YaantracDataset');

let page;
let context;

test.describe('TS_03', async()=>{
    //To launch the Browser
    test.beforeAll('Geofence Module', async({browser})=>{
        context = await browser.newContext({
        viewport: { width: 1200, height: 600 },  
        geolocation: {latitude: 12.939965304673995, longitude: 80.11990807936198}, 
        permissions: ['geolocation'],
        });
        page = await context.newPage();
    })

    //Login the Application with valid data
    test('TC_Login_01 - Login with valid credentials', async()=>{
        const loginpage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const appURL = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Documents/AutomationforYaantrac/DatasetYaantrac.xlsx','Link');
        await loginpage.LandingPage(appURL[0].URL);
        await page.waitForTimeout(2000);
        const loginData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Documents/AutomationforYaantrac/DatasetYaantrac.xlsx', 'Login');
        const {Username, Password} = loginData[0];
        await loginpage.loginPage(Username, Password);

    })

    //Check the Geofence page loads successfully
    test('TC_Geofence_001 - Verify that the goefence page loads successfully', async()=>{
        const geofence = new geofencePage(page);
        await geofence.geofenceModule();
    })
    
    //Add a Geofence with valid data
    test('TC_Geofence_002 - Add a new circular geofence with valid data.', async()=>{
        const geofence = new geofencePage(page);
        const excelReader = new ExcelReader();
        const geoData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Documents/AutomationforYaantrac/DatasetYaantrac.xlsx', 'Geofence');
        const {GeofenceName, Radius} = geoData[0];
        await geofence.addGeofence(GeofenceName, String(Radius));  
    })
    
    //Add a Geofence with Invalid data
    test('TC_Geofence_003 - Ensure that the application displays an alert message when the user adds a new geofence with invalid data.', async()=>{
        const geofence = new geofencePage(page);
        const excelReader = new ExcelReader();
        const geoData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Documents/AutomationforYaantrac/DatasetYaantrac.xlsx', 'Geofence');
        const {GeofenceName, Radius} = geoData[1];
        await geofence.invalidDataForGeofence(GeofenceName, Radius);

    })

    //Add a Geofence without data
    test('TC_Geofence_004 - Ensure that the application displays an alert message when the user adds a new geofence without data.', async()=>{
        const geofence = new geofencePage(page);
        await geofence.withoutDataForGeofence();
    })

    //Update the Geofence with valid data
    test('TC_Geofence_005 - Verify that the geofence can be updated with valid data.', async()=>{
        const geofence = new geofencePage(page);
        const excelReader = new ExcelReader();
        const geoData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Documents/AutomationforYaantrac/DatasetYaantrac.xlsx', 'Geofence');
        const {GeofenceName, Radius} = geoData[2];
        await geofence.updateGeofence(GeofenceName, String(Radius));
    })
    
    //Update the Geofence with Invalid data
    test('TC_Geofence_006 - Verify that the geofence can be updated with Invalid data.', async()=>{
        const geofence = new geofencePage(page);
        const excelReader = new ExcelReader();
        const geoData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Documents/AutomationforYaantrac/DatasetYaantrac.xlsx', 'Geofence');
        const {GeofenceName, Radius} = geoData[3];
        await geofence.invalidDataForGeofence(GeofenceName, String(Radius));
    }) 

    //Assign single vehicle to the created geofence
    test('TC_Geofence_007 - Verify that the application allows the user to assign single vehicle to the geofence.', async()=>{
        const geofence = new geofencePage(page);
        await geofence.assignSingleVehicle();
    })

    //Assign multiple vehicles to the created geofence
    test('TC_Geofence_008 - Verify that the application allows the user to assign all vehicles to the geofence.', async()=>{
        const geofence = new geofencePage(page);
        await geofence.assignAllVehicle();
    })

    //Check the Mapped vehicle details
    test('TC_Geofence_009 - To check the Mapped vehicle details and geofence Summary.', async()=>{
        const geofence = new geofencePage(page);
        await geofence.GeofenceDetails();
    })
        
    test('TC_Geofence_10 - Verify that the Geofence Name field displays an error message when the user enters an existing geofence name while creating a new geofence.', async()=>{
        const geofence = new geofencePage(page);
        const excelReader = new ExcelReader();
        const geoData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Documents/AutomationforYaantrac/DatasetYaantrac.xlsx', 'Geofence');
        const {GeofenceName, Radius} = geoData[4];
        await geofence.ExistingGeofenceName(GeofenceName, String(Radius));

    })


    //Deactivate the geofence
    test('TC_Geofence_011 - Verify that the application allows the user to deactivate the geofence.', async()=>{
        const geofence = new geofencePage(page);
        await geofence.deactivate();
    })

    //Activate the geofence
    test('TC_Geofence_012 - Verify that the application allows the user to activate the geofence.', async()=>{
        const geofence = new geofencePage(page);
        await geofence.activate();
    })

  //Delete the Geofence
    test('TC_Geofence_013 - Verify that the application allows the user to delete the geofence.', async()=>{
        const geofence = new geofencePage(page);
        const excelReader = new ExcelReader();
        const geoData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Documents/AutomationforYaantrac/DatasetYaantrac.xlsx', 'Geofence');
        const {GeofenceName, Radius} = geoData[5];
        await geofence.deleteGeofence(GeofenceName, String(Radius));
    })


    
});