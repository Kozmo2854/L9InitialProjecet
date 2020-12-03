let RegisterPageRef = require('./pageObjectModels/registerPage');

describe('Register Demo Page',function() {
  
  let registerPage = new RegisterPageRef();

  let EC = protractor.ExpectedConditions;
  
  let currentDateTime = new Date().toJSON().replace(/-|T|Z|:/g,'').slice(0,14);


  let args = {
    "gender" : 0,
    "firstName" : '',
    "lastName" : '',
    "dayOfBirth" : 0,
    "monthOfBirth" : 0,
    "yearOfBirth" : 0,
    "email" : '',
    "company" : '',
    "password" : '',
    "confirmPassword" : ''
  };


  browser.waitForAngularEnabled(false);

  beforeEach(function(){
    browser.get('https://demo.nopcommerce.com/register?returnUrl=%2F')
  });
  
  it('Should register',function(){

    args.firstName = 'jovan';
    args.lastName = 'jovan';
    args.email = 'jz' + currentDateTime + '@yopmail.com';
    args.password = 'test123'
    args.confirmPassword = 'test123'


    browser.wait(EC.presenceOf(registerPage.registerButton,15000))

    registerPage.testRegister(args);

    browser.wait(EC.presenceOf($("div[class='result']")),15000);

    expect($("div[class='result']").getText()).toEqual('Your registration completed');
  })



  it('Should not register because email is the same',function(){

    browser.wait(EC.presenceOf(registerPage.registerButton,15000))

    registerPage.testRegister(args)

    browser.wait(EC.presenceOf($("div[class='message-error validation-summary-errors'] ul li")),15000);

    expect($("div[class='message-error validation-summary-errors'] ul li").getText()).toEqual('The specified email already exists');
  })

  it('Should not register because passwords do not match',function(){

    args.confirmPassword = 'test1234'

    browser.wait(EC.presenceOf(registerPage.registerButton,15000))

    registerPage.testRegister(args)

    browser.wait(EC.presenceOf($("span[id='ConfirmPassword-error']")),15000);

    expect($("span[id='ConfirmPassword-error']").getText()).toEqual('The password and confirmation password do not match.');
  })

  it('Should not register because firstName field is empty',function(){

    // let reqFields = ['firstName,lastName,email,password,confirmPassword']

    args.confirmPassword = args.password;

    args.firstName = ''

    browser.wait(EC.presenceOf(registerPage.registerButton,15000))

    registerPage.testRegister(args)

    browser.wait(EC.presenceOf($("span[id='FirstName-error']")),15000);

    expect($("span[id='FirstName-error']").getText()).toEqual('First name is required.');

  })

});