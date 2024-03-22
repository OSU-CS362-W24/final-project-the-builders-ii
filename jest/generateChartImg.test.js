const fs = require("fs")
const rest = require("msw").rest

const setupServer = require("msw/node").setupServer

const generateChartImg = require("../src/lib/generateChartImg.js")

const server = setupServer(
    rest.post(
        `https://quickchart.io/chart`,
        function (req, res, ctx) {
            return res(
                ctx.status(301),
                ctx.set('Content-Type', 'image/png'),
                ctx.body(
                    fs.readFileSync("../bin/chart_image.png")
                )
            )
        }
    )
)

beforeAll(function () {
    server.listen()
})

afterAll(function () {
    server.close()
})

// Make sure everything is reset after each test
afterEach(() => {
    jest.restoreAllMocks()
})

test("Returns image", function() {
    const chart = generateChartImg(
        "line",
        [
            {x:2,y:3},
            {x:-1,y:-4}
        ],
        "X Label",
        "Y Label",
        "Title",
        "red"
    )
    expect(chart).toBeDefined()
})