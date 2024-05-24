const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function runTest() {
  // Initialize the WebDriver
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigate to your application URL
    await driver.get('http://localhost:5173'); 

    // Testing a city name, lowercase
    let cityInput = await driver.findElement(By.id('cidade'));
    await cityInput.sendKeys('jundiai');

    // Clicks "Consultar" button 
    let consultarButton = await driver.findElement(By.id('consultar'));
    await consultarButton.click();

    // Wait for the information div to be displayed
    await driver.wait(until.elementLocated(By.id('informacoes')), 10000);
    let informacoesDiv = await driver.findElement(By.id('informacoes'));

    // Wait for the h2 element to be present and get the text
    let cityNameElement = await driver.wait(
      until.elementLocated(By.css('#informacoes h2')),
      10000
    );
    let cityName = await cityNameElement.getText();

    // Verify that the information contains the expected city name
    assert.strictEqual(cityName, 'Jundiaí');

    // Verify for wrong names
    assert.notStrictEqual(cityName, 'Campinas');
    assert.notStrictEqual(cityName, 'São Paulo')

    console.log('All tests passed successfully!');
  } catch (err) {
    console.error('Test failed!', err);
  } finally {
    // Quit the WebDriver instance
    await driver.quit();
  }
}

runTest();
