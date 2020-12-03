let LoginPageRef = require('./pageObjectModels/loginPage');

describe('Login Demo Page',function() {
  
  let loginPage = new LoginPageRef();

  let EC = protractor.ExpectedConditions;

  let currentDateTime = new Date().toJSON().replace(/-|T|Z|:/g,'').slice(0,14);


  browser.waitForAngularEnabled(false);

  beforeEach(function(){
    browser.get('https://demo.nopcommerce.com/login?returnUrl=%2F')
  });

  it('Should open the homepage link',async function(){

    browser.get('http://demo.nopcommerce.com/');

    expect(browser.getCurrentUrl()).toBe('https://demo.nopcommerce.com/');
  })


  it('Should open up the login page',function()
  {    
    expect(browser.getCurrentUrl()).toContain('login');
  })
  
  it('Should login',async function(){
    loginPage.testSignIn('jz97@yopmail.com','test123');

    browser.wait(EC.presenceOf(loginPage.logOutLink),15000)

    browser.wait(EC.elementToBeClickable(loginPage.logOutLink),15000)

    expect(loginPage.logOutLink.getText()).toEqual('LOG OUT');
    
    loginPage.logOutLink.click();

    browser.wait(EC.elementToBeClickable(loginPage.loginLink),15000)
  })



  it('Should not login because email is wrong',async function(){
    let fakeEmail = 'jz' + currentDateTime + '@yopmail.com';

    loginPage.testSignIn(fakeEmail,'test1234');

    browser.wait(EC.presenceOf(loginPage.errorMsg),15000)

    expect(loginPage.errorMsg.getText()).toEqual('No customer account found');
  })

  it('Should not login because password is wrong',function(){
    let fakePassword = 'test' + currentDateTime;

    loginPage.testSignIn('jz97@yopmail.com',fakePassword);
    
    browser.wait(EC.presenceOf(loginPage.errorMsg),15000)

    expect(loginPage.errorMsg.getText()).toEqual('The credentials provided are incorrect');
  })

  it('Should not login because fields are empty',function(){

    loginPage.testSignIn('','');
    
    browser.wait(EC.presenceOf(loginPage.emptyEmailErrorMsg),15000)

    expect(loginPage.emptyEmailErrorMsg.getText()).toEqual('Please enter your email');
  })

  it('Should not login because password field is empty', function(){

    loginPage.testSignIn('jz97@yopmail.com','');

    browser.wait(EC.presenceOf(loginPage.errorMsg),15000)

    expect(loginPage.errorMsg.getText()).toEqual('The credentials provided are incorrect');
  })

  it('Should not login because email field is empty',function(){

    loginPage.testSignIn('','test123');
    
    browser.wait(EC.presenceOf(loginPage.emptyEmailErrorMsg),15000)

    expect(loginPage.emptyEmailErrorMsg.getText()).toEqual('Please enter your email');
  })

});