/* eslint-env mocha */
describe('Todo App E2E', () => {
  beforeEach(() => {
    // optional stubbing of todos from a server
    // cy.server()
    // cy
    //   .route('/todos?_limit=3', [
    //     {
    //       id: 100,
    //       completed: true,
    //       titke: 'stub server'
    //     }
    //   ])
    //   .as('todos')

    // note this is end-to-end test for entire applicsation
    // instead of loading individusl components
    // we are just visiting a page - we assume the
    // application has been bundled, loaded and initialized
    cy.visit('apps/todo.html')
  })

  it('loads Todo app', () => {
    cy.contains('h1', 'Todo')
  })

  it('shows 2 todos', () => {
    cy.get('.todo').should('have.length', 2)
  })

  it('toggles second todo several times', () => {
    cy
      .get('.todo')
      .eq(1)
      .click()
      .click()
      .click()
      .find('.toggle')
      .should('be.checked')
  })

  it('completes first todo', () => {
    cy.get('.todo').first().click().find('.toggle').should('be.checked')
    // second item is still not checked
    cy.get('.todo').eq(1).find('.toggle').should('not.be.checked')
  })
})
