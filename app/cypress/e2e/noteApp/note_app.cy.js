describe("Note App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.request("POST", "http://localhost:3030/api/testing/reset");

    const user = {
      name: "test",
      username: "ciiiesTest",
      password: "c123t",
    };

    cy.request("POST", "http://localhost:3030/api/users", user);
  });

  it("frontpage can be opened", () => {
    cy.contains("Players");
  });

  it("user can login", () => {
    cy.contains("Mostrar Login").click();
    cy.get('[Placeholder="Username"]').type("ciiiesTest");
    cy.get('[Placeholder="Password"]').type("c123t");
    cy.get("#formLoginButton").click();
    cy.contains("nuevo jugador");
  });

  it("login fails with wrong password", () => {
    cy.contains("Mostrar Login").click();
    cy.get('[Placeholder="Username"]').type("ciiiesTest");
    cy.get('[Placeholder="Password"]').type("malamia");
    cy.get("#formLoginButton").click();

    cy.contains(
      "problemas al autenticar, ingrese usuario y/o contraseña válidos"
    );
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.login({ username: "ciiiesTest", password: "c123t" });
    });

    it("a new player can be created", () => {
      cy.contains("nuevo jugador").click();
      cy.get('[Placeholder="escribe el nombre del jugador"]').type("cypres");
      cy.get('[Placeholder="escribe el equipo del jugador"]').type("testing");
      cy.contains("Save").click();
      cy.contains("cypres");
      cy.contains("testing");
    });
  });
});
