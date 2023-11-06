const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { faker } = require('@faker-js/faker');
const generateProjectData = () => ({
    name: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    expectedLength: faker.number.int(100) + " days",
})

async function testCreateProject() {
  let options = new chrome.Options();
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  const projectData = generateProjectData();
  try {
    await driver.get('http://localhost:3000/projects/new');

    const nameField = await driver.findElement(By.id('newProject_name'));
    await nameField.sendKeys(projectData.name);

    const descriptionField = await driver.findElement(By.id('newProject_description'));
    await descriptionField.sendKeys(projectData.description);

    const expectedLengthField = await driver.findElement(By.id('newProject_expected_length'));
    await expectedLengthField.sendKeys(projectData.expectedLength);

    const submitButton = await driver.findElement(By.id('create_button'));
    await submitButton.click();
    await driver.sleep(2000);
    
    await driver.get('http://localhost:3000/');
    await driver.sleep(2000);

    await driver.findElement(By.xpath(`//td[text()="${projectData.name}"]`));
    console.log("Found the element with text: " + projectData.name);
    
    await driver.sleep(2000);

  } finally {
    await driver.quit();
  }
}

testCreateProject().catch(console.error);
