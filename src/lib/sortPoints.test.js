const sortPoints = require("./sortPoints.js")

test("sortPoints() returns an empty array object if empty array is given", function() {
    // Arrange
    points = []
    // Act
    // Assert
    expect(sortPoints(points)).toStrictEqual([])
})

test("sortPoints() returns input array if array length is equal to 1", function() {
    // Arrange
    points = [{x:5, y:1}]
    // Act
    // Assert
    expect(sortPoints(points)).toStrictEqual([{x:5,y:1}])
})

test("sortPoints() returns swaped array if two elements are out of order (Array length is 2)", function() {
    // Arrange
    points = [{x:3,y:4},{x:2,y:10}]
    // Act
    // Assert
    expect(sortPoints(points)).toStrictEqual([{x:2,y:10},{x:3,y:4}])
})

test("sortPoints() returns an empty array object if empty array is given", function() {
    // Arrange
    points = []
    // Act
    // Assert
    expect(sortPoints(points)).toStrictEqual([])
})