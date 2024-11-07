class TextBoxPage {
	constructor() {
		this.fullNameInput = '#userName';
		this.emailInput = '#userEmail';
		this.currentAddressInput = '#currentAddress';
		this.permanentAddressInput = '#permanentAddress';
		this.submitButton = '#submit';
	}

	type(selector, value) {
		cy.root().find(selector).type(value);
	}

	verifyOutput(selector, value) {
		cy.root().find(selector).should('have.value', value);
	}

	verifyNoOutput(selector) {
		cy.root().find(selector).should('not.have.value');
	}

	verifyError(selector) {
		cy.root().find(selector).should('have.class', 'field-error');
	}

	clickButton() {
		cy.root().find(this.submitButton).click();
	}

	enterFullName(name) {
		this.type(this.fullNameInput, name);
	}

	enterEmail(email) {
		this.type(this.emailInput, email);
	}

	enterCurrentAddress(address) {
		this.type(this.currentAddressInput, address);
	}

	enterPermanentAddress(address) {
		this.type(this.permanentAddressInput, address);
	}

	submitForm() {
		this.clickButton();
	}

	verifyFormSubmission(name, email, currentAddress, permanentAddress) {
		this.verifyOutput(this.fullNameInput, name);
		this.verifyOutput(this.emailInput, email);
		this.verifyOutput(this.currentAddressInput, currentAddress);
		this.verifyOutput(this.permanentAddressInput, permanentAddress);
	}

	verifyNoOutputForm() {
		this.verifyNoOutput(this.fullNameInput);
		this.verifyNoOutput(this.emailInput);
		this.verifyNoOutput(this.currentAddressInput);
		this.verifyNoOutput(this.permanentAddressInput);
	}

	verifyEmailError() {
		this.verifyError(this.emailInput);
	}
}

export const textBoxPage = new TextBoxPage();
