class DynamicProperties {
	get = {
		txtElement: () => cy.get('[class="col-12 mt-4 col-md-6"] p'),
		btnEnable: () => cy.get('[class="col-12 mt-4 col-md-6"] button#enableAfter', { timeout: 5000 }),
		btnColor: () => cy.get('[class="col-12 mt-4 col-md-6"] button#colorChange', { timeout: 5000 }),
		btnVisible: () => cy.get('[class="col-12 mt-4 col-md-6"] button#visibleAfter', { timeout: 5000 })
	};
}

export const dynamicPropertiesPage = new DynamicProperties();
