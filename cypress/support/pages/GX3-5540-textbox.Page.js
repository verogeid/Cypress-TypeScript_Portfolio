class TextBoxPage {
	constructor() {
		this.fullNameInput = '#userName';
		this.emailInput = '#userEmail';
		this.currentAddressInput = '#currentAddress';
		this.permanentAddressInput = '#permanentAddress';
		this.submitButton = '#submit';
	}

	enterFullName(name) {
		cy.get(this.fullNameInput).type(name);
	}

	enterEmail(email) {
		cy.get(this.emailInput).type(email);
	}

	enterCurrentAddress(address) {
		cy.get(this.currentAddressInput).type(address);
	}

	enterPermanentAddress(address) {
		cy.get(this.permanentAddressInput).type(address);
	}

	submitForm() {
		cy.get(this.submitButton).click();
	}

	verifyOutput(name, email, currentAddress, permanentAddress) {
		cy.get('#name').should('contain.text', name);
		cy.get('#email').should('contain.text', email);
		cy.get('#currentAddress.mb-1').should('contain.text', currentAddress);
		cy.get('#permanentAddress.mb-1').should('contain.text', permanentAddress);
	}

	verifyNoOutput() {
		cy.get('#name').should('not.exist');
		cy.get('#email').should('not.exist');
		cy.get('#currentAddress.mb-1').should('not.exist');
		cy.get('#permanentAddress.mb-1').should('not.exist');
	}

	verifyEmailError() {
		cy.get(this.emailInput).should('have.class', 'field-error');
	}
}

export const textBoxPage = new TextBoxPage();
