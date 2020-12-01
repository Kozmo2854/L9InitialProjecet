describe('slow calculator', function() {

  beforeEach(function() {
    browser.get('http://localhost:3456');
  });

  let first = element(by.model('first'));
  let second = element(by.model('second'));
  let goButton = element(by.id('gobutton'));
  let options = element.all(by.tagName('option'));
  let memory = element.all(by.repeater('result in memory'));

  it('should do all operations wth correct inputs ', async function() {
    
    sendInputs(10,5);

    expect(memory.count()).toEqual(5);

    checkAllOperations()
    
    checkResultsForAllOperations('15','2','0','50','5');
  });

  it('should do all operations but with wroung inputs', async function() {
    
    sendInputs(13,6);

    expect(memory.count()).toEqual(5);
    
    checkAllOperations()

    checkResultsForAllOperations('15','2','0','50','5');
  });

  it('should do all operations wth negative inputs ', async function() {

    sendInputs(-1,-2)

    expect(memory.count()).toEqual(5);

    checkAllOperations()
    
    checkResultsForAllOperations('-3','0.5','-1','2','1');
  });

  function sendInputs(intput1,input2){
    options.each(function(element){
      first.sendKeys(intput1);
      second.sendKeys(input2);
      element.click();
      goButton.click();
    });
  }

  async function checkAllOperations(){

    let resultsOperations = await memory.all(by.css('tr td:nth-child(2) span:nth-child(2)')).getText();

    expect(resultsOperations[4]).toEqual('+');
    expect(resultsOperations[3]).toEqual('/');
    expect(resultsOperations[2]).toEqual('%');
    expect(resultsOperations[1]).toEqual('*');
    expect(resultsOperations[0]).toEqual('-');
  }

  async function checkResultsForAllOperations(first,second,third,fourth,fifth){
    
    let results = await memory.all(by.css('tr td:nth-child(3)')).getText()
    
    expect(results[4]).toEqual(first);
    expect(results[3]).toEqual(second);
    expect(results[2]).toEqual(third);
    expect(results[1]).toEqual(fourth);
    expect(results[0]).toEqual(fifth);
  }

});
