const { expect } = require("playwright/test");

class reportsPage{
    constructor(page){
        this.page = page;
        this.reportsIcon = page.locator('//span[@aria-label="Reports"]');
        this.selectReportType = page.locator('[id="select-report"]');
        this.selectVehicle = page.locator('[id="select-vehicle"]');
        this.startTime = page.locator('(//button[@aria-label="Choose date"])[1]');
        this.last7Days = page.locator('//div[@class="slot-times MuiPickersLayout-root css-192l38i"]/ul/li[2]/div');
        this.submit = page.locator('//button[@type="submit"]');
        this.scrolldown = page.locator('//div[@class="MuiTablePagination-root css-whi0l6"]');
        this.rowsPerPage = page.locator('//div[@role="combobox"]');
        this.RowsperPage20 = page.locator('//li[@data-value="20"]');
        this.nextPage = page.locator('//button[@aria-label="Go to next page"]');
        this.downloadButton = page.locator('//div[@role="group"]');
        this.downloadAsPDF = page.locator('(//li[@role="menuitem"])[1]');
        this.downloadAsExcel = page.locator('(//li[@role="menuitem"])[2]');
        this.pdfToaster = page.locator("//div[text()='PDF Downloaded successfully']");
        this.excelToaster = page.locator("//div[text()='Excel Downloaded successfully']");
        this.mailButton = page.locator('//div[@class="MuiStack-root css-1oc6si5"]/button');

        //Mail
         this.emailButton = page.locator('//button[text()="Mail"]');
        this.emailField = page.locator('[id="e-mail"]');
        this.scrollDown = page.locator('//p[@class="MuiTablePagination-selectLabel css-1chpzqh"]');
        this.documentType = page.locator("#document");
        this.sendMailButton = page.locator('(//button[@type="submit"])[2]');
        this.sendPDFToaster = page.locator('//div[text()="Report will be sent to rajalakshmi.r@datayaan.com."]');
        this.mailAlertMsg = page.locator('//p[text()="Enter valid email id"]');
        this.cancelButton = page.locator('//div[@class="MuiBox-root css-1czis7r"]/button[2]');
        this.AlertMsg_Email = page.locator('//p[text()="Email Id is required"]');
        this.AlertMsg_DocumentType = page.locator('//p[text()="Select document type"]');

        //Device Health Report
        this.clearIcon_reportType = page.locator('(//button[@aria-label="Clear"])[1]');
        this.alertMsgReportType = page.locator('//p[text()="Select report type"]');
        //this.last7Days = page.locator('//div[@class="MuiListItemText-root list-text css-1tsvksn"]/span[text()="Last 7 days"]');
        this.startDateAlert = page.locator('//p[text()="Start Date is required"]');
        this.endDateAlert = page.locator('//p[text()="End Date is required"]');
        this.startDateCalendarIcon = page.locator('(//button[@type="button"])[4]');
        this.endDateCalendarIcon = page.locator('(//button[@type="button"])[5]');
  

    }

    async loadsReportScreen(){
        await this.reportsIcon.click();
        await this.page.waitForTimeout(3000);
    }

    async alertReports(){
        await this.selectReportType.click();
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectVehicle.fill('PD3956');
        await this.selectVehicle.press('ArrowDown');
        await this.selectVehicle.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.startTime.click();
        await this.last7Days.click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(5000);
        await this.scrolldown.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.rowsPerPage.click();
        await this.RowsperPage20.click();
        await this.page.waitForTimeout(1000); 
        await this.scrolldown.click();
        await this.nextPage.click();
        await this.downloadButton.click();
        await this.downloadAsPDF.click();
        await this.page.waitForTimeout(2000);
        const tosterMsgforPDF = await this.pdfToaster.innerText();
        console.log(tosterMsgforPDF);
        await this.page.waitForTimeout(2000);
        await expect(tosterMsgforPDF.trim()).toContain('PDF Downloaded successfully');
        await this.page.waitForTimeout(2000);
        await this.downloadButton.click();
        await this.downloadAsExcel.click();
        await this.page.waitForTimeout(2000);
        const tosterMsgforExcel = await this.excelToaster.innerText();
        console.log(tosterMsgforExcel);
        await expect(tosterMsgforExcel.trim()).toContain("Excel Downloaded successfully");
        await this.page.waitForTimeout(2000);
        //await this.page.pause();
    }

    async sendEMail_PDFDocument(){
        await this.emailButton.click();
        await this.emailField.click();
        await this.emailField.clear();
        await this.page.waitForTimeout(1000);
        await this.emailField.fill('rajalakshmi.r@datayaan.com');
        await this.page.waitForTimeout(1000);
        await this.documentType.fill('PDF');
        await this.documentType.press('ArrowDown');
        await this.page.waitForTimeout(1000);
        await this.documentType.press('Enter');
        await this.sendMailButton.click();
        await this.page.waitForTimeout(2000);
        const PDF_Toaster = await this.sendPDFToaster.innerText();
        console.log(PDF_Toaster);
    }

    async sendEMail_ExcelDocument(){
        await this.emailButton.click();
        await this.emailField.click();
        await this.emailField.clear();
        await this.page.waitForTimeout(1000);
        await this.emailField.fill('rajalakshmi.r@datayaan.com');
        await this.page.waitForTimeout(1000);
        await this.documentType.fill('Excel');
        await this.documentType.press('ArrowDown');
        await this.page.waitForTimeout(1000);
        await this.documentType.press('Enter');
        await this.sendMailButton.click();
        await this.page.waitForTimeout(2000);
        const PDF_Toaster = await this.sendPDFToaster.innerText();
        console.log(PDF_Toaster);
        await this.page.waitForTimeout(1000);
    }

    async deviceHealthReport(){
        //await this.clearIcon_reportType.click();
        await this.selectReportType.click();
        await this.selectReportType.fill('Device Health')
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
    }

    async driverScoreCardReport(){
        await this.selectReportType.click();
        await this.selectReportType.fill('Driver Score')
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.startTime.click();
        await this.last7Days.click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);

    }

    async engineReport(){
        await this.selectReportType.click();
        await this.selectReportType.fill('Engine')
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectVehicle.click();
        await this.selectVehicle.press('ArrowDown');
        await this.selectVehicle.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.startTime.click();
        await this.last7Days.click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
    }

    async idleReport(){
        await this.selectReportType.click();
        await this.selectReportType.fill('Idle')
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectVehicle.click();
        await this.selectVehicle.press('ArrowDown');
        await this.selectVehicle.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.startTime.click();
        await this.last7Days.click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
    }

    async kmReport(){
        await this.selectReportType.click();
        await this.selectReportType.fill('KM')
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectVehicle.click();
        await this.selectVehicle.press('ArrowDown');
        await this.selectVehicle.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.startTime.click();
        await this.last7Days.click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
    }

    async movementReport(){
        await this.selectReportType.click();
        await this.selectReportType.fill('Movement')
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectVehicle.click();
        await this.selectVehicle.press('ArrowDown');
        await this.selectVehicle.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.startTime.click();
        await this.last7Days.click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
    }

    async overallReport(){
        await this.selectReportType.click();
        await this.selectReportType.fill('Overall')
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectVehicle.click();
        await this.selectVehicle.press('ArrowDown');
        await this.selectVehicle.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.startTime.click();
        await this.last7Days.click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
    }

    async overspeedReport(){
        await this.selectReportType.click();
        await this.selectReportType.fill('Overspeed')
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectVehicle.click();
        await this.selectVehicle.press('ArrowDown');
        await this.selectVehicle.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.startTime.click();
        await this.last7Days.click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
    }

    async parkedReport(){
        await this.selectReportType.click();
        await this.selectReportType.fill('Parked')
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectVehicle.click();
        await this.selectVehicle.press('ArrowDown');
        await this.selectVehicle.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.startTime.click();
        await this.last7Days.click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
    }

    async stoppageReport(){
        await this.selectReportType.click();
        await this.selectReportType.fill('Stoppage')
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectVehicle.click();
        await this.selectVehicle.press('ArrowDown');
        await this.selectVehicle.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.startTime.click();
        await this.last7Days.click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
    }

    async vehicleDetailsReport(){
        await this.selectReportType.click();
        await this.selectReportType.fill('Vehicle Details')
        await this.selectReportType.press('ArrowDown');
        await this.selectReportType.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectVehicle.click();
        await this.selectVehicle.press('ArrowDown');
        await this.selectVehicle.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.startTime.click();
        await this.last7Days.click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
    }

    async InvalidDataforEMailField(){
        await this.emailButton.click();
        await this.emailField.click();
        await this.emailField.clear();
        await this.page.waitForTimeout(1000);
        await this.emailField.fill('123@#jhgjh');
        await this.page.waitForTimeout(1000);
        await this.documentType.fill('Excel');
        await this.documentType.press('ArrowDown');
        await this.page.waitForTimeout(1000);
        await this.documentType.press('Enter');
        await this.sendMailButton.click();
        const emailAlertMessage = await this.mailAlertMsg.innerText();
        console.log(emailAlertMessage);
        await this.cancelButton.click();
        await this.page.waitForTimeout(1000);
    }

    async withoutMailandDocumentType(){
        await this.emailButton.click();
        await this.emailField.click();
        await this.emailField.clear();
        await this.page.waitForTimeout(1000);
        await this.sendMailButton.click();
        const Email_AlertMessage = await this.AlertMsg_Email.innerText();
        const DocumentType_AlertMessage = await this.AlertMsg_DocumentType.innerText();
        console.log(Email_AlertMessage);
        console.log(DocumentType_AlertMessage);
        await this.page.waitForTimeout(1000);
        await this.cancelButton.click();
        await this.page.waitForTimeout(1000);

    }

    async checkAlertMsg(){
        await this.selectReportType.clear();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
        const reportTypeAlert = await this.alertMsgReportType.innerText();
        console.log(reportTypeAlert);
        await this.page.waitForTimeout(1000);
        const alertForStartDate = await this.startDateAlert.innerText();
        console.log(alertForStartDate);
        await this.page.waitForTimeout(1000);
        const alertForEndDate = await this.endDateAlert.innerText();
        console.log(alertForEndDate);
        await this.page.waitForTimeout(1000);
    }


}

module.exports = {reportsPage};