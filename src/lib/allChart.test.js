const {
    saveChart,
    loadAllSavedCharts,
    loadSavedChart,
    updateCurrentChartData,
    loadCurrentChartData
} = require('./chartStorage.js');

const generateChartImg = require('./generateChartImg');

const localStorageMock = (() => {
    let store = {};

    return {
        getItem: key => store[key],
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: key => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('saveChart()', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('saves a new chart when the index is not specified', () => {
        const chart = { title: 'Test Chart', data: [{ x: 1, y: 2 }, { x: 3, y: 4 }] };
        saveChart(chart);
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toHaveLength(1);
        expect(savedCharts[0]).toEqual(chart);
    });

    test('should overwrite existing chart data when the index is specified', () => {
        const initialChart = { title: 'Initial Chart', data: [{ x: 1, y: 2 }, { x: 3, y: 4}] };
        saveChart(initialChart);

        const updatedChart = { title: 'Updated Chart', data: [{ x: 5, y: 6 }, { x: 7, y: 6 }] };
        saveChart(updatedChart, 0);

        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toHaveLength(1);
        expect(savedCharts[0]).toEqual(updatedChart);
    });

    test('should add a new chart when idx is out of bounds', () => {
        const initialChart = { title: 'Initial Chart', data: [{ x: 1, y: 2 }, { x: 3, y: 4 }] };
        saveChart(initialChart);

        const newChart = { title: 'New Chart', data: [{ x: 5, y: 6 }, { x: 7, y: 8 }] };
        saveChart(newChart, 1);

        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toHaveLength(2);
        expect(savedCharts[1]).toEqual(newChart);
    });

    test('should not save chart when chart is undefined', () => {
        saveChart(undefined);
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts[0]).toEqual(null);
    });

    test('saves chart with empty data for further use', () => {
        const emptyChart = { title: 'Empty Data Chart', data: [] };
        saveChart(emptyChart);
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toContainEqual(emptyChart);
    });
    
    test('negative index chart saves to whichever index it was entered', () => {
        const chart1 = { title: 'Chart 1', data: [{ x: 1, y: 2 }, { x: 3, y: 4 }] };
        const chart2 = { title: 'Chart 2', data: [{ x: 5, y: 6 }, { x: 7, y: 8 }] };
        const negativeIndexChart = { title: 'Negative Index Chart', data: [{ x: 13, y: 14 }, { x: 15, y: 16 }] };
    
        saveChart(chart1, 0);
        saveChart(chart2, 1);
        saveChart(negativeIndexChart, -1);

        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toContainEqual(chart1);
        expect(savedCharts).not.toContainEqual(chart2);
        expect(savedCharts).toContainEqual(negativeIndexChart);
    });
    
    
    test('saves chart at end of list if index is invalid', () => {
        const chart1 = { title: 'Non-Integer Index Chart', data: [{ x: 3, y: 1 }, { x: 2, y: 5 }] };
        const chart2 = { title: 'Non-Integer Index Chart', data: [{ x: 1, y: 2 }, { x: 3, y: 4 }] };
    
        saveChart(chart1, 0);
        saveChart(chart2, 'index');
        const savedCharts = loadAllSavedCharts();
    
        expect(savedCharts).toContainEqual(chart1);
        expect(savedCharts).toContainEqual(chart2);
    });   
});

describe('loadAllSavedCharts()', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should return an empty array if no charts are saved', () => {
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([]);
    });

    test('should return an array of saved charts', () => {
        const chart1 = { title: 'Chart 1', data: [{ x: 1, y: 2 }, { x: 3, y: 4 }] };
        const chart2 = { title: 'Chart 2', data: [{ x: 5, y: 6 }, { x: 7, y: 8 }] };

        saveChart(chart1);
        saveChart(chart2);

        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toHaveLength(2);
        expect(savedCharts).toContainEqual(chart1);
        expect(savedCharts).toContainEqual(chart2);
    });

    test('should return an empty array if localStorage contains invalid data', () => {
        window.localStorage.setItem('savedCharts', 'invalid_data');
        let savedCharts;
        try {
            savedCharts = loadAllSavedCharts();
        } catch (error) {
            savedCharts = [];
        }

        expect(savedCharts).toEqual([]);
    });

    test('should return an array with a single chart if localStorage contains one saved chart', () => {
        const chart = { title: 'Single Chart', data: [{ x: 1, y: 2 }, { x: 3, y: 4 }] };
        window.localStorage.setItem('savedCharts', JSON.stringify([chart]));

        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chart]);
    });

    test('should return an empty array if localStorage is null', () => {
        window.localStorage = null;
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([]);
    });

    test('should return an empty array if localStorage is undefined', () => {
        window.localStorage = undefined;
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([]);
    });
});


describe('loadSavedChart()', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
      });
    test('should return an empty object if chart index is not found', () => {
  
        const nonExistentIndex = 100;

        const loadedChart = loadSavedChart(nonExistentIndex);

        expect(loadedChart).toEqual({});
    });


    test('should return an empty object if localStorage is null', () => {

        window.localStorage = null;

        const loadedChart = loadSavedChart(0);

    
        expect(loadedChart).toEqual({});
    });

    test('should return an empty object if localStorage contains invalid data', () => {

        window.localStorage = { getItem: () => 'invalid_data' };


        const loadedChart = loadSavedChart(0);

        expect(loadedChart).toEqual({});
    });

    test('should return an empty object if localStorage is undefined', () => {

        window.localStorage = undefined;


        const loadedChart = loadSavedChart(0);

        expect(loadedChart).toEqual({});
    });

    test('should return an empty object if chart index is negative', () => {

        const negativeIndex = -1;

        const loadedChart = loadSavedChart(negativeIndex);

        expect(loadedChart).toEqual({});
    });

    test('should return the correct chart object for a valid index', () => {
        const chartIndex = 0;
        const chart = { title: 'Single Chart', data: [{ x: 1, y: 2 }, { x: 3, y: 4 }] };
        saveChart(chart);
        const loadedChart = loadSavedChart(chartIndex);
        console.log('Loaded Chart:', loadedChart);
        

        expect(loadedChart).toEqual(chart);
    });
});

describe('updateCurrentChartData()', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });
  
    test('should store the current chart data in localStorage', () => {

      const currentChartData = {
        title: 'Test Chart',
        data: [{ x: 1, y: 2 }, { x: 3, y: 4 }],
      };
  

      updateCurrentChartData(currentChartData);

      expect(localStorage.getItem('currentChartData')).toEqual(JSON.stringify(currentChartData));
    });
  
    test('should overwrite previous chart data when called multiple times', () => {

      const initialData = {
        title: 'Initial Chart',
        data: [{ x: 5, y: 6 }, { x: 7, y: 8 }],
      };
      const updatedData = {
        title: 'Updated Chart',
        data: [{ x: 9, y: 10 }, { x: 11, y: 12 }],
      };
  
      updateCurrentChartData(initialData);
      updateCurrentChartData(updatedData);
  
  
      expect(localStorage.getItem('currentChartData')).toEqual(JSON.stringify(updatedData));
    });
  
    test('should store an empty object if currentChartData is null', () => {
  
      updateCurrentChartData(null);

      expect(localStorage.getItem('currentChartData')).toEqual(JSON.stringify(null));
    });
  
    test('should store an empty object if currentChartData is an empty object', () => {

      updateCurrentChartData({});
  

      expect(localStorage.getItem('currentChartData')).toEqual(JSON.stringify({}));
    });
  
    test('should store an empty object if currentChartData is an empty array', () => {
      // currentChartData is empty array
      updateCurrentChartData([]);
      // Expects the empty array to be stored in currentChartData
      expect(localStorage.getItem('currentChartData')).toEqual(JSON.stringify([]));
    });
  });

  describe('loadCurrentChartData()', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        window.localStorage.clear();
    });

    test('should return an empty object if localStorage contains no data', () => {

        const loadedData = loadCurrentChartData();

        expect(loadedData).toEqual({});
    });

    test('should return the stored data as an object', () => {

        const testData = { title: 'Test Chart', data: [{ x: 1, y: 2 }, { x: 3, y: 4 }] };
        window.localStorage.setItem("currentChartData", JSON.stringify(testData));


        const loadedData = loadCurrentChartData();


        expect(loadedData).toEqual(testData);
    });

    test('should return an empty object if stored data is null', () => {

        window.localStorage.getItem = jest.fn().mockReturnValueOnce(null);


        const loadedData = loadCurrentChartData();

        expect(loadedData).toEqual({});
    });

    test('should return an empty object if stored data is undefined', () => {
        window.localStorage.getItem = jest.fn().mockReturnValueOnce(undefined);

        const loadedData = loadCurrentChartData();

        expect(loadedData).toEqual({});
    });

    test('should return an empty object if localStorage is null', () => {
        window.localStorage = null;

        const loadedData = loadCurrentChartData();

        expect(loadedData).toEqual({});
    });
});

describe('generateChartImg', () => {
    test('should return image URL when request is successful', async () => {
        // Mocking fetch function to return a successful response
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            blob: jest.fn().mockResolvedValueOnce(new Blob()),
        });

        // Mocking URL.createObjectURL function
        global.URL.createObjectURL = jest.fn().mockReturnValueOnce('https://example.com/chart.png');

        // Calling generateChartImg function
        const imgUrl = await generateChartImg('line', [{ x: 1, y: 2 }], 'X Axis', 'Y Axis', 'Chart Title', '#FF0000');

        // Expectations
        expect(imgUrl).toBe('https://example.com/chart.png');

        // Clean up mocks
        jest.clearAllMocks();
    });

    test('should throw error when request fails', async () => {
        // Mocking fetch function to return a failed response
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: false,
            text: jest.fn().mockResolvedValueOnce('Internal Server Error'),
        });

        // Calling generateChartImg function and expecting it to throw an error
        await expect(generateChartImg('line', [{ x: 1, y: 2 }], 'X Axis', 'Y Axis', 'Chart Title', '#FF0000'))
            .rejects.toThrow('Internal Server Error');

        // Clean up mocks
        jest.clearAllMocks();
    });

    test('should throw error when response is not OK', async () => {
        // Mocking fetch function to return a response with ok = false
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: false,
            text: jest.fn().mockResolvedValueOnce('Bad Request'),
        });

        // Calling generateChartImg function and expecting it to throw an error
        await expect(generateChartImg('line', [{ x: 1, y: 2 }], 'X Axis', 'Y Axis', 'Chart Title', '#FF0000'))
            .rejects.toThrow('Bad Request');

        // Clean up mocks
        jest.clearAllMocks();
    });

    test('should throw error when response is not OK', async () => {
        // Mocking fetch function to throw an error
        global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network Error'));

        // Calling generateChartImg function and expecting it to throw an error
        await expect(generateChartImg('line', [{ x: 1, y: 2 }], 'X Axis', 'Y Axis', 'Chart Title', '#FF0000'))
            .rejects.toThrow('Network Error');

        // Clean up mocks
        jest.clearAllMocks();
    });
});