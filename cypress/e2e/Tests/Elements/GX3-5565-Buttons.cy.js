describe('US GX3-5565 | ToolsQA | Elements | Buttons', () => {
	cy.on('uncaught:exception', (err, runnable) => {
		return false;
	});

	beforeEach('PRC: Abrir la url buttons de ToolsQA', () => {
		cy.visit('https://demoqa.com/buttons');
		cy.url().should('contain', 'buttons');
	});

	it('US # GX3-5565 | TC#01: Validar existencia de los buttons', () => {
		cy.get('html');
	});
});
