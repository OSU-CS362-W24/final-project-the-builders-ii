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

test("sortPoints() returns input array if elements have same x value (Array length is 2)", function() {
    // Arrange
    points = [{x:10,y:20},{x:10,y:5}]
    // Act
    // Assert
    expect(sortPoints(points)).toStrictEqual([{x:10,y:20},{x:10,y:5}])
})

test("sortPoints() returns a sorted array in ascending order (Array length is 10)", function() {
    // Arrange
    points = [
        {x:5,y:513},
        {x:3,y:35},
        {x:61,y:13},
        {x:713,y:1},
        {x:10,y:74},
        {x:1,y:167},
        {x:642,y:12},
        {x:62,y:1},
        {x:1516,y:11},
        {x:732,y:162}
            ]
    // Act
    // Assert
    expect(sortPoints(points)).toStrictEqual([
        {x:1,y:167},
        {x:3,y:35},
        {x:5,y:513},
        {x:10,y:74},
        {x:61,y:13},
        {x:62,y:1},
        {x:642,y:12},
        {x:713,y:1},
        {x:732,y:162},
        {x:1516,y:11}
            ])
})