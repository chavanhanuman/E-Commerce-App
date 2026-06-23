describe("Ecommerce Home Page", () => {

  it("Loads Home Page", () => {

    cy.visit("http://localhost:3000");

    cy.contains("Products");

  });

});



describe("Product Details Content", () => {

  it("Displays Product Information", () => {

    cy.visit("http://localhost:3000");

    cy.contains("View Details")
      .first()
      .click();

    cy.get("h1").should("exist");

    cy.contains("Add To Cart");

  });

});





describe("Product Details Content", () => {

  it("Displays Product Information", () => {

    cy.visit("http://localhost:3000");

    cy.contains("View Details")
      .first()
      .click();

    cy.get("h1").should("exist");

    cy.contains("Add To Cart");

  });

});



describe("Add To Cart", () => {

  it("Adds Product To Cart", () => {

    cy.visit("http://localhost:3000/product/1");

    cy.contains("Add To Cart")
      .click();

    cy.visit("http://localhost:3000/cart");

    cy.contains("Total Items");

  });

});




describe("Remove Product", () => {

  it("Removes Product From Cart", () => {

    cy.visit("http://localhost:3000");

    cy.contains("View Details")
      .first()
      .click();

    cy.contains("Add To Cart")
      .click();

    cy.on("window:alert", () => {});

    cy.visit("http://localhost:3000/cart");

    cy.contains("Remove").click();

  });

});





describe("Category Filter", () => {

  it("Select Category", () => {

    cy.visit("http://localhost:3000");

    cy.get("select")
      .first()
      .select(1);

  });

});



describe("Sort Products", () => {

  it("Sort Low To High", () => {

    cy.visit("http://localhost:3000");

    cy.get("select")
      .last()
      .select("asc");

  });

});