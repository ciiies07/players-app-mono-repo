Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3030/api/login", {
    username,
    password,
  }).then((res) => {
    localStorage.setItem("loggedPlayerAppUser", JSON.stringify(res.body));
    cy.visit("http://localhost:3000");
  });
});
