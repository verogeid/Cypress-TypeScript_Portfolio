describe('US GX3-5552 | ToolsQA | Elements | Radio Buttons', () => {
	beforeEach('PRC: Abrir la url radio buttons de ToolsQA', () => {
		cy.visit('https://demoqa.com/radio-button');
		cy.url().should('contain', 'radio-button');
	});

	it('US # GX3-5552 | TC#01: Validar selección del radio button “Yes” y visualizar mensaje', () => {
		cy.get('input[type=radio]').should('exist');
		cy.get('#yesRadio.custom-control-input').should('not.be.checked');
		cy.get('#yesRadio').should('be.enabled');
		cy.get('label[for="yesRadio"]').click();

		cy.get('.text-success').should('have.text', 'Yes').and('be.visible');
	});

	it('US # GX3-5552 | TC#02: Validar selección del radio button “Impressive” y visualizar mensaje', () => {
		cy.get('input[type=radio]').should('exist');
		cy.contains('Impressive').should('be.visible');
		cy.get('#impressiveRadio.custom-control-input').should('not.be.checked');
		cy.get('#impressiveRadio').should('be.enabled');
		cy.get('label[for="impressiveRadio"]').click();

		cy.get('.text-success').should('have.text', 'Impressive').and('be.visible');
	});

	it('US # GX3-5552 | TC#03: Validar que NO se puede seleccionar el radio button “No”', () => {
		cy.get('input[type=radio]').should('exist');
		cy.contains('No').should('be.visible');
		cy.get('#noRadio.custom-control-input').should('not.be.checked');
		cy.get('#noRadio').should('be.disabled');
	});
});
