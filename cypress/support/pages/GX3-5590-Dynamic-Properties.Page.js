class DynamicProperties {
	get = {
		txtElement: () => cy.get('div > p'),
		btnEnable: () => cy.get('div > button.mt-4.btn.btn-primary', { timeout: 5000 }).eq(0),
		btnColor: () => cy.get('div > button.mt-4.text-danger.btn.btn-primary', { timeout: 5000 }),
		btnVisible: () => cy.get('div > button.mt-4.btn.btn-primary', { timeout: 5000 }).eq(2)
	};
}

export const dynamicPropertiesPage = new DynamicProperties();
