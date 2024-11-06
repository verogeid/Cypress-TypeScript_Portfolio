class Selectable {
	constructor() {
		this.listButton = '#demo-tab-list';
		this.gridButton = '#demo-tab-grid';
		this.listItems = '#verticalListContainer li';
		this.gridItems = '#demo-tabpane-grid li';
	}

	selectRandomItem(itemsSelector) {
		return cy.get(itemsSelector).then($items => {
			const randomIndex = Math.floor(Math.random() * $items.length);
			cy.wrap($items[randomIndex]).click();
		});
	}

	selectRandomListItem() {
		return this.selectRandomItem(this.listItems);
	}

	selectRandomGridItem() {
		return this.selectRandomItem(this.gridItems);
	}

	deselectListItem() {
		return cy.get(this.listItems).filter('.active').first().click();
	}

	deselectGridItem() {
		return cy.get(this.gridItems).filter('.active').first().click();
	}

	openListTab() {
		return cy.get(this.listButton).click().should('have.class', 'active');
	}

	openGridTab() {
		return cy.get(this.gridButton).click().should('have.class', 'active');
	}
}

export const selectablePage = new Selectable();
