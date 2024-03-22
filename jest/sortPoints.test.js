/**
 * @jest-environment jsdom
 */

const sortPoints = require("../src/lib/sortPoints.js")

test("Sorts an array of length 2", () => {
    input_value = [
        {x:2,y:3},
        {x:-1,y:-4}
    ]
    expected_value = [
        {x:-1,y:-4},
        {x:2,y:3}
    ]
    sorted = sortPoints(input_value)
    expect(sorted).toStrictEqual(expected_value)
});

test("Sorts an array of length 3", () => {
    input_value = [
        {x:2,y:3},
        {x:-1,y:-4},
        {x:-12,y:24}
    ]
    expected_value = [
        {x:-12,y:24},
        {x:-1,y:-4},
        {x:2,y:3}
    ]
    sorted = sortPoints(input_value)
    expect(sorted).toStrictEqual(expected_value)
});

test("Sorts an array with data points in all 4 quadrants", () => {
    input_value = [
        {x:5,y:5},
        {x:-5,y:-5},
        {x:-5,y:5},
        {x:5,y:-5}
    ]
    expected_value = [
        {x:-5,y:-5},
        {x:-5,y:5},
        {x:5,y:5},
        {x:5,y:-5}
    ]
    sorted = sortPoints(input_value)
    expect(sorted).toStrictEqual(expected_value)
});

test("Sorts a large data set correctly", () => {
    input_value = [
        {x:-10,y:10},
        {x:2,y:-2},
        {x:5,y:5},
        {x:10,y:10},
        {x:-5,y:5},
        {x:2,y:2},
        {x:0,y:0},
        {x:-10,y:-10},
        {x:-5,y:2},
        {x:10,y:-10},
        {x:999,y:0},
        {x:-2,y:-2},
        {x:5,y:-5},
        {x:-5,y:-5},
        {x:0,y:12}
    ]
    expected_value = [
        {x:-10,y:10},
        {x:-10,y:-10},
        {x:-5,y:5},
        {x:-5,y:2},
        {x:-5,y:-5},
        {x:-2,y:-2},
        {x:0,y:0},
        {x:0,y:12},
        {x:2,y:-2},
        {x:2,y:2},
        {x:5,y:5},
        {x:5,y:-5},
        {x:10,y:10},
        {x:10,y:-10},
        {x:999,y:0}
    ]
    sorted = sortPoints(input_value)
    expect(sorted).toStrictEqual(expected_value)
});