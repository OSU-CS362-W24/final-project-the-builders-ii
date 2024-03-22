/**
 * @jest-environment jsdom
 */

const { getAllByLabelText, getByText } = require("@testing-library/dom");
const userEvent = require("@testing-library/user-event").default;
const fs = require("fs");
global.TextEncoder = require('util').TextEncoder;
global.Response = require('node-fetch').Response;
/*require("@testing-library/jest-dom/extend-expect");

*/
const domTesting = require("@testing-library/dom")

const initDOMFromFiles = (htmlPath, jsPath) => {
    const html = fs.readFileSync(htmlPath, 'utf8');
    document.open();
    document.write(html);
    document.close();
    jest.isolateModules(() => require(jsPath));
};

afterEach(() => {
    jest.restoreAllMocks();
    window.localStorage.clear();
});

const fillForm = async (user, xValue, yValue, plusButton, x, y) => {
    await user.type(xValue[0], x);
    await user.type(yValue[0], y);
    await user.click(plusButton);
};

test('Enter values into X and Y fields, and click the plus button repeatedly', async () => {
    initDOMFromFiles(
        __dirname + "/../src/line/line.html",
        __dirname + "/../src/line/line.js",
    );

    const user = userEvent.setup();
    const plusButton = getByText(document, "+");

    const values = [
        { x: "1", y: "2" },
        { x: "3", y: "4" },
        { x: "5", y: "6" },
        { x: "7", y: "8" },
        { x: "9", y: "10" },
    ];

    for (let value of values) {
        let xValue = getAllByLabelText(document, "X");
        let yValue = getAllByLabelText(document, "Y");
        await fillForm(user, xValue, yValue, plusButton, value.x, value.y);
    }

    for (let i = 0; i < 4; i++) {
        await user.click(plusButton);
    }
});

test('Give names to X & Y fields but no data, and generate a chart', async function () {
    initDOMFromFiles(
        __dirname + "/../src/line/line.html",
        __dirname + "/../src/line/line.js",
    )
    
    const xLabel = domTesting.getByLabelText(document, "X label") // X label fields
    const yLabel = domTesting.getByLabelText(document, "Y label") // Y label fields
    const generateButton = domTesting.getByText(document, "Generate chart") // The generate chart button

    const user = userEvent.setup()

    // Type into the x and y value fields
    await user.type(xLabel, "Apples")
    await user.type(yLabel, "Oranges")

    // Set up a spy
    const spy = jest.spyOn(window,"alert").mockImplementation(() => {})

    // Click "Generate chart" button
    await user.click(generateButton)

    // Does the spy detect the correct alert?
    expect(spy).toBeCalledWith("Error: No data specified!")
    expect(spy).not.toBeCalledWith("Error: Must specify a label for both X and Y!")
})

test('Give data but no names to X & Y fields, and generate a chart', async function () {
    initDOMFromFiles(
        __dirname + "/../src/line/line.html",
        __dirname + "/../src/line/line.js",
    )

    const user = userEvent.setup()
    const generateButton = domTesting.getByText(document, "Generate chart") // The generate chart button
    const plusButton = domTesting.getByText(document, "+"); // The plus button

    const values = [
        { x: "1", y: "2" },
        { x: "3", y: "4" },
        { x: "5", y: "6" },
        { x: "7", y: "8" },
        { x: "9", y: "10" },
    ];

    for (let value of values) {
        let xValue = domTesting.getAllByLabelText(document, "X");
        let yValue = domTesting.getAllByLabelText(document, "Y");
        await fillForm(user, xValue, yValue, plusButton, value.x, value.y);
    }

    // Set up a spy
    const spy = jest.spyOn(window,"alert").mockImplementation(() => {})

    // Click "Generate chart" button
    await user.click(generateButton)

    // Does the spy detect the correct alert?
    expect(spy).toBeCalledWith("Error: Must specify a label for both X and Y!")
    expect(spy).not.toBeCalledWith("Error: No data specified!")
})


test('Clicking the clear chart data button', async function () {
    initDOMFromFiles(
        __dirname + "/../src/line/line.html",
        __dirname + "/../src/line/line.js",
    )

    const user = userEvent.setup()
    const plusButton = domTesting.getByText(document, "+") // The + button
    const clearButton = domTesting.getByText(document, "Clear chart data") // The clear chart data button

    const values = [
        { x: "1", y: "2" },
        { x: "3", y: "4" },
        { x: "5", y: "6" },
    ];

    for (let value of values) {
        let xValue = domTesting.getAllByLabelText(document, "X");
        let yValue = domTesting.getAllByLabelText(document, "Y");
        await fillForm(user, xValue, yValue, plusButton, value.x, value.y);
    }

    // Click the clear button
    await user.click(clearButton)

    // There should now be only 1 (x,y) field
    let xValue = domTesting.getAllByLabelText(document, "X");
    let yValue = domTesting.getAllByLabelText(document, "Y");
    expect(xValue.length).toBe(1)
    expect(yValue.length).toBe(1)

    // Every other field should now be empty
    let chartTitle = domTesting.getByLabelText(document, "Chart title");
    let xLabel = domTesting.getByLabelText(document, "X label");
    let yLabel = domTesting.getByLabelText(document, "Y label");
    let chartColorButton = domTesting.getByLabelText(document, "Chart color");
    expect(chartTitle.value).toBe("");
    expect(xLabel.value).toBe("");
    expect(yLabel.value).toBe("");
    expect(xValue[0].value).toBe("")
    expect(yValue[0].value).toBe("")

    // The chart color should now be reverted back to the default orange
    expect(chartColorButton.value).toBe("#ff4500")
})

test('Data correctly sent to the chart generation function', async function () {
    initDOMFromFiles(
        __dirname + "/../src/line/line.html",
        __dirname + "/../src/line/line.js",
    )

    const user = userEvent.setup()
    const plusButton = domTesting.getByText(document, "+") // The + button
    const generateChartButton = domTesting.getByText(document, "Generate chart") // The generate chart button

    const values = [
        { x: "1", y: "2" },
        { x: "3", y: "4" },
        { x: "5", y: "6" },
    ];

    for (let value of values) {
        let xValue = domTesting.getAllByLabelText(document, "X");
        let yValue = domTesting.getAllByLabelText(document, "Y");
        await fillForm(user, xValue, yValue, plusButton, value.x, value.y);
    }

    // Import the function if it's defined in a module
    const { generateChart } = require('./generateChartImg.test.js');

    // Attach the function to the window object
    window.generateChart = generateChart;

    // Now you can spy on it
    const spy = jest.spyOn(window, "generateChart").mockImplementation(() => {});

    // Click "Generate chart" button
    await user.click(generateChartButton)

    // Check if the spy was called with the correct data
    expect(spy).toBeCalledWith({
        title: "Apples vs. Oranges",
        xLabel: "Apples",
        yLabel: "Oranges",
        data: [
            { x: "1", y: "2" },
            { x: "3", y: "4" },
            { x: "5", y: "6" },
        ],
        color: "#ff00ff",
    })
})