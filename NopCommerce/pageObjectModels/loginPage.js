let LoginPage = function(){
    
    this.logOutLink = element(by.css('a[class="ico-logout"]'));
    this.loginLink = element(by.css('a[class="ico-login"]'));
    this.errorMsg = element(by.css('div[class="message-error validation-summary-errors"] ul li'));
    this.emptyEmailErrorMsg = element(by.css('span[id="Email-error"]'))
    this.usernameInput =  element(by.css('input[class="email"]'));
    this.passwordInput = element(by.css('input[class="password"]'));
    this.loginButton = element(by.css('input[class="button-1 login-button"]'));


    this.testSignIn = function(username,password){
        let EC = protractor.ExpectedConditions;
      
        browser.wait(EC.presenceOf(usernameInput,5000))
        usernameInput.sendKeys(username);
        passwordInput.sendKeys(password);
        
        loginButton.click();
    }
}

module.exports = LoginPage;