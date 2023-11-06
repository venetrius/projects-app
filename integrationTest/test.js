const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  let options = new chrome.Options();
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get('http://localhost:3000/projects/new');

    const nameField = await driver.findElement(By.id('newProject_name'));
    await nameField.sendKeys('hello there');

    const descriptionField = await driver.findElement(By.id('newProject_description'));
    await descriptionField.sendKeys('hello there');

    const expectedLengthField = await driver.findElement(By.id('newProject_expected_length'));
    await expectedLengthField.sendKeys('hello there');

    await driver.sleep(10000);
    
  } finally {
    await driver.quit();
  }
}

runTest().catch(console.error);
