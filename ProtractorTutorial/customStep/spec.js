describe('Protractor Demo App', function() {
  it('should divide 6 by 3', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
    element(by.model('first')).sendKeys(6);
    element(by.model('second')).sendKeys(3);

    var select = element(by.model('operator'));

    select.all(by.css('option[value="DIVISION"')).click();

    element(by.id('gobutton')).click();

    expect(element(by.binding('latest')).getText()).
        toEqual('2');
  });
});