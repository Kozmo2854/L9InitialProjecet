let RegisterPage = function(){

    this.genders = $$("input[name='Gender']")
    this.firstName = $('input[id="FirstName"]');
    this.lastName = $('input[id="LastName"]');
    this.dayOfBirth = $("select[name='DateOfBirthDay']");
    this.monthOfBirth = $("select[name='DateOfBirthMonth']");
    this.yearOfBirth = $("select[name='DateOfBirthYear']");
    this.email = $("input[id='Email']");
    this.company = $("input[id='Company']");
    this.newsletter = $("input[id='Newsletter']");
    this.password = $("input[id='Password']");
    this.confirmPassword = $("input[id='ConfirmPassword']");
    this.registerButton = $("input[id='register-button']");

    // this.registerConfirmation = $("div[class='result']");


    this.testRegister = function(args){
        let EC = protractor.ExpectedConditions;
      

        this.genders.get(args.gender).click();
        this.firstName.sendKeys(args.firstName)
        this.lastName.sendKeys(args.lastName)
        this.dayOfBirth.element(by.css('option[value="' + args.dayOfBirth + '"]')).click()
        this.monthOfBirth.element(by.css('option[value="' + args.monthOfBirth +'"]')).click()
        this.yearOfBirth.element(by.css('option[value="' + args.yearOfBirth +'"]')).click()
        this.email.sendKeys(args.email)
        this.company.sendKeys(args.company)
        this.newsletter.click()
        this.password.sendKeys(args.password)
        this.confirmPassword.sendKeys(args.confirmPassword)
        
        this.registerButton.click();
    }
}

module.exports = RegisterPage;