/**
 * @jest-environment jsdom
 */


require("@testing-library/jest-dom/extend-expect");

const domTesting = require("@testing-library/dom");
const { getByText, getAllByLabelText } = domTesting;
const userEvent = require("@testing-library/user-event").default;

const fs = require("fs");
const generateChartImg = require("../src/lib/generateChartImg");

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
test('Enter values into X and Y fields, and click the plus button repeatedly', async function () {
    initDOMFromFiles(
        __dirname + "/../src/scatter/scatter.html",
        __dirname + "/../src/scatter/scatter.js",
    )

    var xValue = domTesting.getAllByLabelText(document, "X") // All X input fields
    var yValue = domTesting.getAllByLabelText(document, "Y") // All Y input fields
    const plusButton = domTesting.getByText(document, "+") // The + button
    const user = userEvent.setup()
    // Type into the most recent set of input fields, then click the plus button.
    await user.type(xValue[0], "1")
    await user.type(yValue[0], "2")
    await user.click(plusButton)
    // Update xValue and yValue to include the new field that was created by the + button
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")
    // Repeat 4 more times
    await user.type(xValue[1], "3")
    await user.type(yValue[1], "4")
    await user.click(plusButton)
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")
    await user.type(xValue[2], "5")
    await user.type(yValue[2], "6")
    await user.click(plusButton)
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")
    await user.type(xValue[3], "7")
    await user.type(yValue[3], "8")
    await user.click(plusButton)
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")
    await user.type(xValue[4], "9")
    await user.type(yValue[4], "10")
    // Click the + button several times
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    // Update xValue and yValue one last time
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")
    // There should be 9 sets of fields, since we clicked + button 9 times
    expect(xValue.length).toBe(9)
    expect(yValue.length).toBe(9)
    // The contents of each text box should match what we previously entered, completely unchanged
    expect(xValue[0].value).toBe("1")
    expect(yValue[0].value).toBe("2")
    expect(xValue[1].value).toBe("3")
    expect(yValue[1].value).toBe("4")
    expect(xValue[2].value).toBe("5")
    expect(yValue[2].value).toBe("6")
    expect(xValue[3].value).toBe("7")
    expect(yValue[3].value).toBe("8")
    expect(xValue[4].value).toBe("9")
    expect(yValue[4].value).toBe("10")
    expect(xValue[5].value).toBe("")
    expect(yValue[5].value).toBe("")
    expect(xValue[6].value).toBe("")
    expect(yValue[6].value).toBe("")
    expect(xValue[7].value).toBe("")
    expect(yValue[7].value).toBe("")
    expect(xValue[8].value).toBe("")
    expect(yValue[8].value).toBe("")
})

test('Give names to X & Y fields but no data, and generate a chart', async function () {
    initDOMFromFiles(
        __dirname + "/../src/scatter/scatter.html",
        __dirname + "/../src/scatter/scatter.js",
    )
        const xLabel = domTesting.getByLabelText(document, "X label") // X label fields
    const yLabel = domTesting.getByLabelText(document, "Y label") // Y label fields
    const generateButton = domTesting.getByText(document, "Generate chart") // The generate chart button
    const user = userEvent.setup()
    await user.type(xLabel, "Dogs")
    await user.type(yLabel, "Cats")
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
        __dirname + "/../src/scatter/scatter.html",
        __dirname + "/../src/scatter/scatter.js",
    )
        var xValue = domTesting.getAllByLabelText(document, "X") // All X input fields
    var yValue = domTesting.getAllByLabelText(document, "Y") // All Y input fields
    const plusButton = domTesting.getByText(document, "+") // The + button
    const generateButton = domTesting.getByText(document, "Generate chart") // The generate chart button
    const user = userEvent.setup()
    await user.type(xValue[0], "1")
    await user.type(yValue[0], "2")
    await user.click(plusButton)
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")
    await user.type(xValue[1], "3")
    await user.type(yValue[1], "4")
    await user.click(plusButton)
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")
    await user.type(xValue[2], "5")
    await user.type(yValue[2], "6")
    await user.click(plusButton)
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")
    await user.type(xValue[3], "7")
    await user.type(yValue[3], "8")
    const spy = jest.spyOn(window,"alert").mockImplementation(() => {})
    // Click "Generate chart" button
    await user.click(generateButton)
    // Does the spy detect the correct alert?
    expect(spy).toBeCalledWith("Error: Must specify a label for both X and Y!")
    expect(spy).not.toBeCalledWith("Error: No data specified!")
})

test('Clicking the Clear Chart Data button clears all data', async function () {
    initDOMFromFiles(
        __dirname + "/../src/scatter/scatter.html",
        __dirname + "/../src/scatter/scatter.js",
    )
    
    const chartTitle = domTesting.getByLabelText(document, "Chart title") // Chart title field
    const xLabel = domTesting.getByLabelText(document, "X label") // X label fields
    const yLabel = domTesting.getByLabelText(document, "Y label") // Y label fields
    var xValue = domTesting.getAllByLabelText(document, "X") // All X input fields
    var yValue = domTesting.getAllByLabelText(document, "Y") // All Y input fields
    const plusButton = domTesting.getByText(document, "+") // The + button
    const clearChartButton = domTesting.getByText(document, "Clear chart data") // The generate chart button
    const chartColorButton = domTesting.getByLabelText(document, "Chart color") // The chart color button

    const user = userEvent.setup()

    // Change the chart color
    await user.click(chartColorButton)
    domTesting.fireEvent.change(chartColorButton, {value: "#ff00ff"})

    // Type into Chart title
    await user.type(chartTitle, "Dogs vs. Cats")

    // Type into the x and y value fields
    await user.type(xLabel, "Cats")
    await user.type(yLabel, "Cats")

    // Type into the most recent set of input fields, then click the plus button.
    await user.type(xValue[0], "1")
    await user.type(yValue[0], "2")

    await user.click(plusButton)

    // Refresh xValue and yValue to include the new field that was created by the + button
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")

    // Repeat a couple more times
    await user.type(xValue[1], "3")
    await user.type(yValue[1], "4")

    await user.click(plusButton)

    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")

    await user.type(xValue[2], "5")
    await user.type(yValue[2], "6")

    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")

    // There should be 3 (x,y) fields
    expect(xValue.length).toBe(3)
    expect(yValue.length).toBe(3)

    // Click "Generate chart" button
    await user.click(clearChartButton)

    // Refresh jest-dom data
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")

    // There should now be only 1 (x,y) field
    expect(xValue.length).toBe(1)
    expect(yValue.length).toBe(1)

    // Every other field should now be empty
    expect(chartTitle).toBeEmptyDOMElement()
    expect(xLabel).toBeEmptyDOMElement()
    expect(yLabel).toBeEmptyDOMElement()
    expect(xValue[0].value).toBe("")
    expect(yValue[0].value).toBe("")
    expect(xLabel).toBeEmptyDOMElement()

    // The chart color should now be reverted back to the default orange
    expect(chartColorButton.value).toBe("#ff4500")
})

test('Data correctly sent to the chart generation function', async function () {
    initDOMFromFiles(
        __dirname + "/../src/scatter/scatter.html",
        __dirname + "/../src/scatter/scatter.js",
    )
    
    const chartTitle = domTesting.getByLabelText(document, "Chart title") // Chart title field
    const xLabel = domTesting.getByLabelText(document, "X label") // X label fields
    const yLabel = domTesting.getByLabelText(document, "Y label") // Y label fields
    var xValue = domTesting.getAllByLabelText(document, "X") // All X input fields
    var yValue = domTesting.getAllByLabelText(document, "Y") // All Y input fields
    const plusButton = domTesting.getByText(document, "+") // The + button
    const generateChartButton = domTesting.getByText(document, "Generate chart") // The generate chart button
    const chartColorButton = domTesting.getByLabelText(document, "Chart color") // The chart color button

    const user = userEvent.setup()

    // Change the chart color
    await user.click(chartColorButton)
    domTesting.fireEvent.change(chartColorButton, {value: "#ff00ff"})
    // Type into Chart title
    await user.type(chartTitle, "Cats vs. Dogs")
    // Type into the x and y value fields
    await user.type(xLabel, "Cats")
    await user.type(yLabel, "Dogs")
    // Type into the most recent set of input fields, then click the plus button.
    await user.type(xValue[0], "1")
    await user.type(yValue[0], "2")
    await user.click(plusButton)
    // Refresh xValue and yValue to include the new field that was created by the + button
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")
    // Repeat a couple more times
    await user.type(xValue[1], "3")
    await user.type(yValue[1], "4")
    await user.click(plusButton)
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")
    await user.type(xValue[2], "5")
    await user.type(yValue[2], "6")
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")

    // Spy URL if time allows
})