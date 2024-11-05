describe('US # GX3-5646 | ToolsQA | Elements | Checkbox', () => {
	beforeEach('PRC: Abrir url de Checkbox en ToolsQA', () => {
		cy.visit('https://demoqa.com/checkbox');
		cy.url().should('contain', 'checkbox');

		cy.get('span.rct-checkbox path').should('exist').and('have.length', 10);
	});

	it('GX3-5646 | TC#01: Validar', () => {
		cy.get('html').should('exist');
	});
});
