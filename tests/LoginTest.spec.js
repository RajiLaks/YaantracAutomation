const {test} = require ('@playwright/test');
const {LoginPage} = require ('../Pages/LoginPage');
const {ExcelReader} = require('../Utils/YaantracDataset');

test.describe('TS01', async()=>{

    test('TC_Login_001 - Login with valid credentials', async ({page})=>{
        const loginpage = new LoginPage(page);
        const excelReader = new ExcelReader();
        const urlData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Documents/AutomationforYaantrac/DatasetYaantrac.xlsx', 'Link');
        await loginpage.LandingPage(urlData[0].URL);
        await page.waitForTimeout(2000);
        const loginData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Documents/AutomationforYaantrac/DatasetYaantrac.xlsx','Login');
        const {Username, Password} = loginData[0];
        await loginpage.loginPage(Username, Password);
    })

    test('TC_Login_002 - Login with invalid Username and Invalid Password', async({page})=>{
    const loginpage = new LoginPage(page);
    const excelReader = new ExcelReader();
    const urlData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx', 'Link');
    await loginpage.LandingPage(urlData[0].URL);
    await page.waitForTimeout(2000);
    const loginData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx','Login');
    const {Username, Password} = loginData[1];
    await loginpage.LoginWithInvalidData(Username, Password);
})

test('TC_Login_003 - Login with Invalid Username and valid Password', async({page})=>{
    const loginpage = new LoginPage(page);
    const excelReader = new ExcelReader();
    const urlData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx', 'Link');
    await loginpage.LandingPage(urlData[0].URL);
    await page.waitForTimeout(2000);
    const loginData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx','Login');
    const {Username, Password} = loginData[2];
    await loginpage.LoginWithInvalidUsername(Username, Password);
})

test('TC_Login_004 - Login with valid Username and Invalid Password', async({page})=>{
    const loginpage = new LoginPage(page);
    const excelReader = new ExcelReader();
    const urlData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx', 'Link');
    await loginpage.LandingPage(urlData[0].URL);
    await page.waitForTimeout(2000);
    const loginData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx','Login');
    const {Username, Password} = loginData[3];
    await loginpage.LoginWithInvalidPassword(Username, Password);
})

test('TC_Login_005 - Login without enter the Username', async({page})=>{
    const loginpage = new LoginPage(page);
    const excelReader = new ExcelReader();
    const urlData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx', 'Link');
    await loginpage.LandingPage(urlData[0].URL);
    await page.waitForTimeout(2000);
    const loginData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx','Login');
    const {Password} = loginData[0];
    await loginpage.LoginWithoutUsername(Password);
})

test('TC_Login_006 - Login without enter the Password', async({page})=>{
    const loginpage = new LoginPage(page);
    const excelReader = new ExcelReader();
    const urlData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx', 'Link');
    await loginpage.LandingPage(urlData[0].URL);
    await page.waitForTimeout(2000);
    const loginData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx','Login');
    const {Username} = loginData[0];
    await loginpage.LoginWithoutPassword(Username);
})

test('TC_Login_007 - Login without enter the Username and Password', async({page})=>{
    const loginpage = new LoginPage(page);
    const excelReader = new ExcelReader();
    const urlData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx', 'Link');
    await loginpage.LandingPage(urlData[0].URL);
    await page.waitForTimeout(2000);
    //const loginData = await excelReader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/DatasetYaantrac.xlsx','Login');
    
    await loginpage.LoginWithoutAnyData();
})

});