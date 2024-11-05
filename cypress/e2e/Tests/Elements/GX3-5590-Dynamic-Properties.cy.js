import { dynamicPropertiesPage } from '@pages/GX3-5590-Dynamic-Properties.Page';

describe('US GX3-5590 | ToolsQA | Elements | Dynamic Properties', () => {
	cy.on('uncaught:exception', (err, runnable) => {
		return false;
	});

	beforeEach('PRC: Abrir la url dynamic-properties de ToolsQA', () => {
		cy.visit('https://demoqa.com/dynamic-properties');
		cy.url().should('contain', 'dynamic-properties');

		dynamicPropertiesPage.get.txtElement().should('exist');
		cy.get('[class="col-12 mt-4 col-md-6"] button.mt-4.btn.btn-primary').should('exist').and('have.length', 2); // visibleButton se crea y hace visible 5 segundos después
	});

	it('US # GX3-5590 | TC#01: Validar el texto del tag paragraph', () => {
		dynamicPropertiesPage.get.txtElement().should('contain.text', 'This text has random Id').and('be.visible');
	});

	it('US # GX3-5590 | TC#02: Validar el cambio de estado del button "enableAfter"', () => {
		dynamicPropertiesPage.get.firstLoad.btnEnable().should('be.not.enabled');
		dynamicPropertiesPage.get.lastLoad.btnEnable().should('be.enabled');
	});

	it('US # GX3-5590 | TC#03: Validar el cambio de color del button "colorChange"', () => {
		dynamicPropertiesPage.get.firstLoad.btnColor().should('be.visible');
		dynamicPropertiesPage.get.lastLoad.btnColor().should('have.class', 'text-danger');
	});

	it('US # GX3-5590 | TC#04: Validar el cambio de visibilidad del button "visibleAfter"', () => {
		dynamicPropertiesPage.get.firstLoad.btnVisible().should('not.exist');
		dynamicPropertiesPage.get.lastLoad.btnVisible().should('exist').and('be.visible');
	});
});
