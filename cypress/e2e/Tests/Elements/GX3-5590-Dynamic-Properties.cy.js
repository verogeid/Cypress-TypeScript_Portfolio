import { dynamicPropertiesPage } from '@pages/GX3-5590-Dynamic-Properties.Page.js';

describe('US GX3-5590 | ToolsQA | Elements | Dynamic Properties', () => {
	cy.on('uncaught:exception', (err, runnable) => {
		return false;
	});

	beforeEach('PRC: Abrir la url dynamic-properties de ToolsQA', () => {
		cy.visit('https://demoqa.com/dynamic-properties');
		cy.url().should('contain', 'dynamic-properties');
	});

	it('US # GX3-5590 | TC#01: Validar la existencia de los elementos', () => {
		cy.get('div > p').should('exist');
		cy.get('div > button.mt-4.btn.btn-primary').should('exist').and('have.length', 2);
	});

	it('US # GX3-5590 | TC#02: Validar el texto del tag paragraph', () => {
		dinamicPropertiesPage.get.txtElement().should('contain.text', 'This text has random Id').and('be.visible');
	});

	it('US # GX3-5590 | TC#03: Validar el cambio de estado del button "enableAfter"', () => {
		cy.get('div > button.mt-4.btn.btn-primary').eq(0).should('be.not.enabled');
		dynamicPropertiesPage.get.btnEnable().should('be.enabled');
	});

	it('US # GX3-5590 | TC#04: Validar el cambio de color del button "colorChange"', () => {
		cy.get('div > button.mt-4.btn.btn-primary').eq(1).should('be.visible');
		dynamicPropertiesPage.get.btnColor().should('be.enabled');
	});

	it('US # GX3-5590 | TC#04: Validar el cambio de visibilidad del button "visibleAfter"', () => {
		cy.get('div > button.mt-4.btn.btn-primary').eq(2).should('not.exist');
		dynamicPropertiesPage.get.btnVisible().should('exist').and('be.visible');
	});
});
