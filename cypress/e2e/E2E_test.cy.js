it("Line chart is correctly generated", function () {
  // Create a chart
  cy.visit("/");
  cy.contains("Line").click();
  cy.contains("Chart title").type("dogs vs. cats");
  cy.get("#x-label-input").type("dogs"); // Input label for X-axis
  cy.get("#y-label-input").type("cats"); // Input label for Y-axis
  cy.get(".x-value-input").type("1"); // Input value for X-axis
  cy.get(".y-value-input").type("3"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(1).type("2"); // Input value for X-axis
  cy.get(".y-value-input").eq(1).type("7"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(2).type("3"); // Input value for X-axis
  cy.get(".y-value-input").eq(2).type("15"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(3).type("4"); // Input value for X-axis
  cy.get(".y-value-input").eq(3).type("25"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(4).type("5"); // Input value for X-axis
  cy.get(".y-value-input").eq(4).type("40"); // Input value for Y-axis
  cy.contains("Generate chart").click();
  // Confirm
  cy.get("#chart-display").should("exist");
});


it("Scatter chart is correctly generated", function () {
  // Create a chart
  cy.visit("/")
  cy.contains("Scatter").click()
  cy.contains("Chart title").type("dogs vs. cats");
  cy.get("#x-label-input").type("dogs"); // Input label for X-axis
  cy.get("#y-label-input").type("cats"); // Input label for Y-axis
  cy.get(".x-value-input").type("1"); // Input value for X-axis
  cy.get(".y-value-input").type("3"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(1).type("2"); // Input value for X-axis
  cy.get(".y-value-input").eq(1).type("7"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(2).type("3"); // Input value for X-axis
  cy.get(".y-value-input").eq(2).type("15"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(3).type("4"); // Input value for X-axis
  cy.get(".y-value-input").eq(3).type("25"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(4).type("5"); // Input value for X-axis
  cy.get(".y-value-input").eq(4).type("40"); // Input value for Y-axis
  cy.contains("Generate chart").click();
  // Confirm
  cy.get("#chart-display").should("exist");
})

it("Bar chart is correctly generated", function () {
  // Create a chart
  cy.visit("/")
  cy.contains("Bar").click()
  cy.contains("Chart title").type("dogs vs. cats");
  cy.get("#x-label-input").type("dogs"); // Input label for X-axis
  cy.get("#y-label-input").type("cats"); // Input label for Y-axis
  cy.get(".x-value-input").type("1"); // Input value for X-axis
  cy.get(".y-value-input").type("3"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(1).type("2"); // Input value for X-axis
  cy.get(".y-value-input").eq(1).type("7"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(2).type("3"); // Input value for X-axis
  cy.get(".y-value-input").eq(2).type("15"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(3).type("4"); // Input value for X-axis
  cy.get(".y-value-input").eq(3).type("25"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(4).type("5"); // Input value for X-axis
  cy.get(".y-value-input").eq(4).type("40"); // Input value for Y-axis
  cy.contains("Generate chart").click();
  // Confirm
  cy.get("#chart-display").should("exist");
})

it("Chart data is maintained across pages", function () {
  // Create a chart
  cy.visit("/")
  cy.contains("Line").click()
  cy.contains("Bar").click()
  cy.contains("Chart title").type("dogs vs. cats");
  cy.get("#x-label-input").type("dogs"); // Input label for X-axis
  cy.get("#y-label-input").type("cats"); // Input label for Y-axis
  cy.get(".x-value-input").type("1"); // Input value for X-axis
  cy.get(".y-value-input").type("3"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(1).type("2"); // Input value for X-axis
  cy.get(".y-value-input").eq(1).type("7"); // Input value for Y-axis

  // Switch to scatter page and confirm same info
  cy.contains("Scatter").click()
  cy.get("#chart-title-input").should("have.value", "dogs vs. cats");
  cy.get("#x-label-input").should("have.value", "dogs");
  cy.get("#y-label-input").should("have.value", "cats");
  cy.get(".x-value-input").should("have.value", 1);
  cy.get(".y-value-input").should("have.value", 3);
  cy.get(".x-value-input").eq(1).should("have.value", 2);
  cy.get(".y-value-input").eq(1).should("have.value", 7);

    // Switch to scatter page and confirm same info
    cy.contains("Bar").click()
    cy.get("#chart-title-input").should("have.value", "dogs vs. cats");
    cy.get("#x-label-input").should("have.value", "dogs");
    cy.get("#y-label-input").should("have.value", "cats");
    cy.get(".x-value-input").should("have.value", 1);
    cy.get(".y-value-input").should("have.value", 3);
    cy.get(".x-value-input").eq(1).should("have.value", 2);
    cy.get(".y-value-input").eq(1).should("have.value", 7);


})


it("Saving a line chart to the gallery", function () {
  // Create a chart
  cy.visit("/")
  cy.contains("Line").click()
  cy.contains("Chart title").type("dogs vs. cats");
  cy.get("#x-label-input").type("dogs"); // Input label for X-axis
  cy.get("#y-label-input").type("cats"); // Input label for Y-axis
  cy.get(".x-value-input").type("1"); // Input value for X-axis
  cy.get(".y-value-input").type("3"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(1).type("2"); // Input value for X-axis
  cy.get(".y-value-input").eq(1).type("7"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(2).type("3"); // Input value for X-axis
  cy.get(".y-value-input").eq(2).type("15"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(3).type("4"); // Input value for X-axis
  cy.get(".y-value-input").eq(3).type("25"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(4).type("5"); // Input value for X-axis
  cy.get(".y-value-input").eq(4).type("40"); // Input value for Y-axis
  cy.contains("Generate chart").click();
  cy.get("#chart-img").should("exist")
  // Save the chart
  cy.contains("Save chart").click()
  cy.contains("Chart saved").should("exist")
  // Go to gallery to confirm
  cy.contains("Gallery").click()
  cy.contains("dogs vs. cats").should("exist")
})


it("Saving a scatter chart to the gallery", function () {
  // Create a chart
  cy.visit("/")
  cy.contains("Scatter").click()
  cy.contains("Chart title").type("dogs vs. cats");
  cy.get("#x-label-input").type("dogs"); // Input label for X-axis
  cy.get("#y-label-input").type("cats"); // Input label for Y-axis
  cy.get(".x-value-input").type("1"); // Input value for X-axis
  cy.get(".y-value-input").type("3"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(1).type("2"); // Input value for X-axis
  cy.get(".y-value-input").eq(1).type("7"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(2).type("3"); // Input value for X-axis
  cy.get(".y-value-input").eq(2).type("15"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(3).type("4"); // Input value for X-axis
  cy.get(".y-value-input").eq(3).type("25"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(4).type("5"); // Input value for X-axis
  cy.get(".y-value-input").eq(4).type("40"); // Input value for Y-axis
  cy.contains("Generate chart").click();
  cy.get("#chart-img").should("exist")
  // Save the chart
  cy.contains("Save chart").click()
  cy.contains("Chart saved").should("exist")
  // Go to gallery to confirm
  cy.contains("Gallery").click()
  cy.contains("dogs vs. cats").should("exist")
})

it("Saving a bar chart to the gallery", function () {
  // Create a chart
  cy.visit("/")
  cy.contains("Bar").click()
  cy.contains("Chart title").type("dogs vs. cats");
  cy.get("#x-label-input").type("dogs"); // Input label for X-axis
  cy.get("#y-label-input").type("cats"); // Input label for Y-axis
  cy.get(".x-value-input").type("1"); // Input value for X-axis
  cy.get(".y-value-input").type("3"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(1).type("2"); // Input value for X-axis
  cy.get(".y-value-input").eq(1).type("7"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(2).type("3"); // Input value for X-axis
  cy.get(".y-value-input").eq(2).type("15"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(3).type("4"); // Input value for X-axis
  cy.get(".y-value-input").eq(3).type("25"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(4).type("5"); // Input value for X-axis
  cy.get(".y-value-input").eq(4).type("40"); // Input value for Y-axis
  cy.contains("Generate chart").click();
  cy.get("#chart-img").should("exist")
  // Save the chart
  cy.contains("Save chart").click()
  cy.contains("Chart saved").should("exist")
  // Go to gallery to confirm
  cy.contains("Gallery").click()
  cy.contains("dogs vs. cats").should("exist")
})

it("Re-opening a saved line chart", function () {
  // Create a chart
  cy.visit("/")
  cy.contains("Line").click()
  cy.contains("Chart title").type("dogs vs. cats");
  cy.get("#x-label-input").type("dogs"); // Input label for X-axis
  cy.get("#y-label-input").type("cats"); // Input label for Y-axis
  cy.get(".x-value-input").type("1"); // Input value for X-axis
  cy.get(".y-value-input").type("3"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(1).type("2"); // Input value for X-axis
  cy.get(".y-value-input").eq(1).type("7"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(2).type("3"); // Input value for X-axis
  cy.get(".y-value-input").eq(2).type("15"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(3).type("4"); // Input value for X-axis
  cy.get(".y-value-input").eq(3).type("25"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(4).type("5"); // Input value for X-axis
  cy.get(".y-value-input").eq(4).type("40"); // Input value for Y-axis
  cy.contains("Generate chart").click();
  cy.get("#chart-img").should("exist")
  // Save the chart
  cy.contains("Save chart").click()
  cy.contains("Chart saved").should("exist")
  // Clear chart data
  cy.contains("Clear chart data").click()
  // Re-open the saved chart from the gallery
  cy.contains("Gallery").click()
  cy.contains("dogs vs. cats").click()

})


it("Re-opening a saved scatter chart", function () {
  // Create a chart
  cy.visit("/")
  cy.contains("Scatter").click();
  cy.contains("Chart title").type("dogs vs. cats");
  cy.get("#x-label-input").type("dogs"); // Input label for X-axis
  cy.get("#y-label-input").type("cats"); // Input label for Y-axis
  cy.get(".x-value-input").type("1"); // Input value for X-axis
  cy.get(".y-value-input").type("3"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(1).type("2"); // Input value for X-axis
  cy.get(".y-value-input").eq(1).type("7"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(2).type("3"); // Input value for X-axis
  cy.get(".y-value-input").eq(2).type("15"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(3).type("4"); // Input value for X-axis
  cy.get(".y-value-input").eq(3).type("25"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(4).type("5"); // Input value for X-axis
  cy.get(".y-value-input").eq(4).type("40"); // Input value for Y-axis
  cy.contains("Generate chart").click();
  cy.get("#chart-img").should("exist")
  // Save the chart
  cy.contains("Save chart").click()
  cy.contains("Chart saved").should("exist")
  // Clear chart data
  cy.contains("Clear chart data").click()
  // Re-open the saved chart from the gallery
  cy.contains("Gallery").click()
  cy.contains("dogs vs. cats").click()

})

it("Re-opening a saved bar chart", function () {
  // Create a chart
  cy.visit("/")
  cy.contains("Bar").click()
  cy.contains("Chart title").type("dogs vs. cats");
  cy.get("#x-label-input").type("dogs"); // Input label for X-axis
  cy.get("#y-label-input").type("cats"); // Input label for Y-axis
  cy.get(".x-value-input").type("1"); // Input value for X-axis
  cy.get(".y-value-input").type("3"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(1).type("2"); // Input value for X-axis
  cy.get(".y-value-input").eq(1).type("7"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(2).type("3"); // Input value for X-axis
  cy.get(".y-value-input").eq(2).type("15"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(3).type("4"); // Input value for X-axis
  cy.get(".y-value-input").eq(3).type("25"); // Input value for Y-axis
  cy.get("#add-values-btn").click(); // Click the add values button
  cy.get(".x-value-input").eq(4).type("5"); // Input value for X-axis
  cy.get(".y-value-input").eq(4).type("40"); // Input value for Y-axis
  cy.contains("Generate chart").click();
  cy.get("#chart-img").should("exist")
  // Save the chart
  cy.contains("Save chart").click()
  cy.contains("Chart saved").should("exist")
  // Clear chart data
  cy.contains("Clear chart data").click()
  // Re-open the saved chart from the gallery
  cy.contains("Gallery").click()
  cy.contains("dogs vs. cats").click()
})