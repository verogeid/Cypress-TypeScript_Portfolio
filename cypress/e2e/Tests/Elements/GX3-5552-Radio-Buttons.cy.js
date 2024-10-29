describe('US GX3-55542 | ToolsQA | Elements | Radio Buttons', () => {
	cy.on('uncaught:exception', (err, runnable) => {
		return false;
	});

	beforeEach('PRC: Abrir la url radio buttons de ToolsQA', () => {
		cy.visit('https://demoqa.com/radio-button');
		cy.url().should('contain', 'radio-button');
	});

	it('US # GX3-5552 | TC#01: Validar existencia de los radio', () => {
		cy.get('input[type=radio]').should('exist').and('have.length', 3);

		cy.contains('Yes').should('be.visible');
		cy.contains('Impressive').should('be.visible');
		cy.contains('No').should('be.visible');
	});

	it('US # GX3-5552 | TC#02 Validar que ningún botón este seleccionado por defecto', () => {
		cy.get('#yesRadio.custom-control-input').should('not.be.checked');
		cy.get('#impressiveRadio.custom-control-input').should('not.be.checked');
		cy.get('#noRadio.custom-control-input').should('not.be.checked');
	});

	it('US # GX3-5552 | TC#03: Validar seleccionar el radio button “Yes” y visualizar mensaje', () => {
		cy.get('label[for="yesRadio"]').click();
		cy.get('.text-success').should('have.text', 'Yes').and('be.visible');
	});

	it('US # GX3-5552 | TC#04: Validar seleccionar el radio button “Impressive” y visualizar mensaje', () => {
		cy.get('label[for="impressiveRadio"]').click();
		cy.get('.text-success').should('have.text', 'Impressive').and('be.visible');
	});

	it('US # GX3-5552 | TC#05: Validar que no se puede seleccionar el radio button “No”', () => {
		cy.get('#noRadio').should('be.disabled');
	});
});
