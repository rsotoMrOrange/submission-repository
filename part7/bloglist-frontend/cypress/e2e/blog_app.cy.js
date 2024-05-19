describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Ricardo Soto",
      username: "ricasoto",
      password: "tenet",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("user is able to login", function () {
      cy.contains("login").click();
      cy.get("#username").type("ricasoto");
      cy.get("#password").type("tenet");
      cy.get("#login-button").click();
      cy.contains("Ricardo Soto logged in");
    });

    it("login fails with wrong password", function () {
      cy.contains("login").click();
      cy.get("#username").type("ricasoto1");
      cy.get("#password").type("tenet");
      cy.get("#login-button").click();
      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Ricardo Soto logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "ricasoto", password: "tenet" });
    });

    it("a new blog can be created", () => {
      cy.contains("new blog").click();
      cy.get(".title").type("Testing blog");
      cy.get(".author").type("Fname Lname");
      cy.get(".url").type("url");
      cy.get(".likes").type(98);
      cy.contains("save").click();
      // eslint-disable-next-line quotes
      cy.contains(`new blog added 'Testing blog' written by Fname Lname`);
    });

    it("user can like a blog", function () {
      const blog = {
        title: "React+NodeJS+MongoDB",
        author: "Helsinki University",
        url: "https://fullstackopen.com/en/",
        likes: 1,
      };
      cy.createBlog(blog);
      cy.get(".blogStyle").contains(blog.title).children("button").click();

      cy.get(".blogStyle").children("ul").get("li > button").click();

      cy.get(".blogStyle")
        .children("ul")
        .get("li:nth-child(2)")
        .contains(blog.likes + 1);
    });

    it("a user who created a blog can delete it", function () {
      const blog = {
        title: "React+NodeJS+MongoDB",
        author: "Helsinki University",
        url: "https://fullstackopen.com/en/",
        likes: 1,
      };
      cy.createBlog(blog);
      cy.get(".blogStyle")
        .contains(`${blog.title} - ${blog.author}`)
        .contains("view")
        .click();

      cy.get(".blogStyle").contains("remove").click();

      cy.get("html").should("not.contain", `${blog.title} - ${blog.author}`);
    });
  });

  describe("when a blog already existis by another user", function () {
    beforeEach(function () {
      cy.login({ username: "ricasoto", password: "tenet" });
      cy.createBlog({
        title: "React+NodeJS+MongoDB",
        author: "Helsinki University",
        url: "https://fullstackopen.com/en/",
        likes: 1000000,
      });
      const user = {
        name: "Milo",
        username: "milo",
        password: "tenet",
      };
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
      cy.login({ username: "milo", password: "tenet" });
      cy.visit("");
    });

    it("another user should not be able to delete it", function () {
      cy.get(".blogStyle").contains("view").click();

      cy.get(".blogStyle")
        .children("ul")
        .get("li:nth-child(3)")
        .should("not.contain", "milo");

      cy.get(".blogStyle").should("not.contain", "remove");
    });
  });

  describe("when two or more blogs already exist", function () {
    beforeEach(function () {
      cy.login({ username: "ricasoto", password: "tenet" });
      cy.createBlog({
        title: "The title with 1 likes",
        author: "Helsinki University",
        url: "https://fullstackopen.com/en/",
        likes: 1,
      });
      cy.createBlog({
        title: "The title with 2 likes",
        author: "Helsinki University",
        url: "https://fullstackopen.com/en/",
        likes: 2,
      });
      cy.createBlog({
        title: "The title with 3 likes",
        author: "Helsinki University",
        url: "https://fullstackopen.com/en/",
        likes: 3,
      });
    });

    it("when liking a blog, blogs should display appropiately", function () {
      cy.get(".blogStyle").eq(0).should("contain", "The title with 3 likes");

      cy.get(".blogStyle").eq(2).as("testBlog");

      cy.get("@testBlog").contains("view").click();

      cy.get("@testBlog")
        .children("ul")
        .get("li:nth-child(2)")
        .contains("like")
        .click();

      cy.wait(2000);

      cy.get("@testBlog")
        .children("ul")
        .get("li:nth-child(2)")
        .contains("like")
        .click();

      cy.wait(2000);

      cy.get(".blogStyle").eq(1).should("contain", "The title with 1 likes");
    });
  });
});
