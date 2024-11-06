import { selectablePage } from '../../../support/pages/GX3-5376-Selectable.Page';

describe('GX3-5376 | TS: ToolsQA | Interactions | Selectable', () => {
	beforeEach(() => {
		cy.visit('https://demoqa.com/selectable');
		cy.url().should('contain', 'selectable');
	});

	it('GX3-5376 | TC1: Validar que la pestaña "List" se muestre por defecto', () => {
		selectablePage.openListTab();
		cy.get(selectablePage.listButton).should('have.class', 'active');
	});

	it('GX3-5376 | TC2: Validar que se pueda seleccionar un ítem aleatorio en la pestaña "List"', () => {
		selectablePage.openListTab();
		selectablePage.selectRandomListItem().should('have.class', 'active');
	});

	it('GX3-5376 | TC3: Validar que se pueda deseleccionar un ítem en la pestaña "List"', () => {
		selectablePage.openListTab();
		selectablePage.selectRandomListItem();
		selectablePage.deselectListItem().should('not.have.class', 'active');
	});

	it('GX3-5376 | TC4: Validar que se pueda seleccionar un ítem aleatorio en la pestaña "Grid"', () => {
		selectablePage.openGridTab();
		selectablePage.selectRandomGridItem().should('have.class', 'active');
	});

	it('GX3-5376 | TC5: Validar que se pueda deseleccionar un ítem en la pestaña "Grid"', () => {
		selectablePage.openGridTab();
		selectablePage.selectRandomGridItem();
		selectablePage.deselectGridItem().should('not.have.class', 'active');
	});
});
