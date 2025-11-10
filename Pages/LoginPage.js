const {expect} = require ('@playwright/test');

class LoginPage{

    constructor(page){
        this.page=page;
        this.LoginButton = page.locator("//div[@class='MuiStack-root navbar-data-parent css-kzi4bb']//button");
        this.UsernameField = page.locator("#username");
        this.PasswordField = page.locator("#password");
        this.SubmitButton = page.locator('[type="submit"]');
        this.ErrorMessage = page.locator('//div[@role="alert"]');
        this.UsernameAlert = page.locator('#username-helper-text');
        this.PasswordAlert = page.locator('#password-helper-text');
    };

    async LandingPage(URL){
        await this.page.goto(URL);
        await this.LoginButton.click();
        await this.page.waitForTimeout(1000);
    };

    async loginPage(Username, Password){
        await this.UsernameField.fill(Username);
        await this.PasswordField.fill(Password);
        await this.SubmitButton.click();
    }

    
    async LoginWithInvalidData(Username, Password){
        await this.UsernameField.fill(Username);
        await this.PasswordField.fill(Password);
        await this.SubmitButton.click();  
        await expect(this.ErrorMessage).toHaveText('Invalid Username or Password');
        return this.ErrorMessage;
    };

    async LoginWithInvalidUsername(Username, Password){
        await this.UsernameField.fill(Username);
        await this.PasswordField.fill(Password);
        await this.SubmitButton.click();  
        await expect(this.ErrorMessage).toHaveText('Invalid Username or Password');
        return this.ErrorMessage;
    };

    async LoginWithInvalidPassword(Username, Password){
        await this.UsernameField.fill(Username);
        await this.PasswordField.fill(Password);
        await this.SubmitButton.click();  
        await expect(this.ErrorMessage).toHaveText('Invalid Username or Password');
        return this.ErrorMessage;
    };

    async LoginWithoutUsername(Password){
        await this.UsernameField.fill("");
        await this.PasswordField.fill(Password);
        await this.SubmitButton.click();
        
        await expect(this.UsernameAlert).toHaveText('Enter username');
        return this.UsernameAlert;        
    };

    async LoginWithoutPassword(Username){
        await this.UsernameField.fill(Username);
        await this.PasswordField.fill("");
        await this.SubmitButton.click();
        await expect(this.PasswordAlert).toHaveText('Enter password');
        return this.PasswordAlert;        
    };

    async LoginWithoutAnyData(){
        await this.UsernameField.fill("");
        await this.PasswordField.fill("");
        await this.SubmitButton.click();
        await expect(this.UsernameAlert).toHaveText('Enter username');
        await expect(this.PasswordAlert).toHaveText('Enter password');
        return this.UsernameAlert && this.PasswordAlert; 
               
    };
}

module.exports = { LoginPage }