const sortPoints = require("./sortPoints.js")

test("sortPoints() returns an empty array object if empty array is given", function() {
    expect(sortPoints([])).toStrictEqual([])
})