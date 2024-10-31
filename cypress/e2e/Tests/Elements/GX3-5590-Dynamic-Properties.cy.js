describe('US GX3-5590 | ToolsQA | Elements | Dynamic Properties', () => {
	cy.on('uncaught:exception', (err, runnable) => {
		return false;
	});

	beforeEach('PRC: Abrir la url dynamic-properties de ToolsQA', () => {
		cy.visit('https://demoqa.com/dynamic-properties');
		cy.url().should('contain', 'dynamic-properties');
	});

	it('US # GX3-5590 | TC#01: Validar la existencia de los elementos', () => {
		cy.get('html').should('exist');
	});
});
