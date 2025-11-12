const {test} = require ('@playwright/test');
const {LoginPage} = require ('../Pages/LoginPage');
const {reportsPage} = require ('../Pages/reportsPage');
const {ExcelReader} = require ('../Utils/YaantracDataset');
let page;
let context;

test.describe('TS_04', async()=>{
    test.beforeAll('Reports Module', async({browser})=>{
        context = await browser.newContext({
        viewport: { width: 1200, height: 600 },  
        geolocation: {latitude: 12.939965304673995, longitude: 80.11990807936198}, 
        permissions: ['geolocation'],
        });
        page = await context.newPage();
    })

    test('TC_Login_001 - Login with valid credentials', async ()=>{
    const loginpage = new LoginPage(page);
    const excelReader = new ExcelReader();
    const urlData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx', 'Link');
    await loginpage.LandingPage(urlData[0].URL);
    await page.waitForTimeout(2000);
    const loginData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx','Login');
    const {Username, Password} = loginData[0];
    await loginpage.loginPage(Username, Password);  
    })

    test ('TC001 - Verify that the Reports module loads successfully', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.loadsReportScreen();
    })

    test('TC002 - Verify that the Reports module loads successfully and displays all the required fields.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.alertReports();
    })

    test('TC003 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
        })

    test('TC004 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })

    test('TC005 - Verify that the Device Health report displays the data.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.deviceHealthReport();
    })
    
    test('TC006 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
    })

    test('TC007 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })

    test('TC008 - Verify that the Device Health report displays the data.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.driverScoreCardReport();
    })

    test('TC009 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
        })

    test('TC010 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })

    test('TC011 - Verify that the Driver Score report displays the data.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.engineReport();
    })

    test('TC012 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
    })

    test('TC013 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })

    test('TC014 - Verify that the Driver Score report displays the data.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.idleReport();
    })

    test('TC015 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
    })

    test('TC016 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })

    test('TC017 - Verify that the Driver Score report displays the data.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.kmReport();
    })

    test('TC018 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
    })

    test('TC019 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })
  
    test('TC020 - Verify that the Driver Score report displays the data.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.movementReport();
    })

    test('TC021 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
    })

    test('TC022 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })

    test('TC023 - Verify that the Driver Score report displays the data.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.overallReport();
    })

    test('TC024 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
    })

    test('TC025 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })

    test('TC026 - Verify that the Driver Score report displays the data.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.overspeedReport();
    })

    test('TC027 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
    })

    test('TC028 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })

    test('TC029 - Verify that the Driver Score report displays the data.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.parkedReport();
    })

    test('TC030 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
    })

    test('TC031 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })

    test('TC032 - Verify that the Driver Score report displays the data.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.stoppageReport();
    })

    test('TC033 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
    })

    test('TC034 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })

    test('TC035 - Verify that the Driver Score report displays the data.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.vehicleDetailsReport();
    })

    test('TC036 - Send the PDF document via email.', async()=>{
            const reportsModule = new reportsPage(page);
            await reportsModule.sendEMail_PDFDocument();
    })

    test('TC037 - Send the Excel document via email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.sendEMail_ExcelDocument();
    })

    test('TC038 - verify that the alert message display when the user enters invalid email.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.InvalidDataforEMailField();
    })

    test('TC039 - Verify that the send mail screen displays the alert message when the user without select the email and document type.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.withoutMailandDocumentType();
    })

    test('TC040 - Verify that an alert message is shown when the user does not select the mandatory fields.', async()=>{
        const reportsModule = new reportsPage(page);
        await reportsModule.checkAlertMsg();
    })
});
