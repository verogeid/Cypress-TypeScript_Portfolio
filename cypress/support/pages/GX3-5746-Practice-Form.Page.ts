class PracticeForm {
	get = {
		inputFirstName: () => cy.get('input#firstName'),
		inputLastName: () => cy.get('input#lastName'),
		inputUserEmail: () => cy.get('input#userEmail'),
		optionsGenders: () => cy.get('input[name="gender"]').parent().find('label'),
		inputPhoneNumber: () => cy.get('input#userNumber'),

		inputDateOfBirth: () => cy.get('input#dateOfBirthInput'),
		selectDatePickerYear: () => cy.get('select.react-datepicker__year-select'),
		selectDatePickerMonth: () => cy.get('select.react-datepicker__month-select'),
		selectDatePickerDay: () => cy.get('.react-datepicker__day:not([class$="outside-month"])'),

		inputSubject: () => cy.get('input#subjectsInput'),
		selectSubjectOption: () => cy.get('.subjects-auto-complete__option'),

		selectUploadFile: () => cy.get('#uploadPicture'),

		inputCurrentAddress: () => cy.get('#currentAddress'),

		selectState: () => cy.get('#state'),
		selectStateOption: () => cy.get('[id^="react-select-3-option-"]'),

		selectCity: () => cy.get('#city'),
		selectCityOption: () => cy.get('[id^="react-select-4-option-"]'),

		buttonSubmit: () => cy.get('#submit')
	};

	typeFirthName(pstrFirstName: string) {
		this.get.inputFirstName().should('exist').type(pstrFirstName);
	}

	typeLastName(pstrLastName: string) {
		this.get.inputLastName().should('exist').type(pstrLastName);
	}

	typeUserEmail(pstrUserEmail: string) {
		this.get.inputUserEmail().should('exist').type(pstrUserEmail);
	}

	selectGender() {
		const INT_RANDOM = Cypress._.random(0, 2);

		this.get.optionsGenders().eq(INT_RANDOM).should('exist').click();
	}

	typePhoneNumber(pstrPhoneNumber: string) {
		this.get.inputPhoneNumber().should('exist').type(pstrPhoneNumber);
	}

	clickDateOfBirth() {
		this.get.inputDateOfBirth().should('exist').click();
	}

	selectRandomDate() {
		/* Años bisiestos:
			- los múltiplos de 4
			- salvo los múltiplos de 100
			- a excepción de los múltiplos de 1000
			(ej. el año 2000 fue bisiesto pese a ser múltiplo de 100)
			Seleccionamos primero el año, luego el mes y por último el día,
			para cercionarnos que febrero tiene el número correcto de días
		*/

		this.clickDateOfBirth();

		this.get
			.selectDatePickerYear()
			.find('option')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_YEAR = Cypress._.random(0, $intElem - 1);
				this.get.selectDatePickerYear().select(INT_RANDOM_YEAR);
			});

		const INT_RANDOM_MONTH = Cypress._.random(0, 11);
		this.get.selectDatePickerMonth().select(INT_RANDOM_MONTH);

		this.get
			.selectDatePickerDay()
			.its('length')
			.then($intElem => {
				const INT_RANDOM_DAY = Cypress._.random(0, $intElem - 1);
				this.get.selectDatePickerDay().eq(INT_RANDOM_DAY).click();
			});
	}

	typeRandomSubjects(pstrChar: string) {
		this.get.inputSubject().should('exist').type(pstrChar);

		this.get
			.selectSubjectOption()
			.should('exist')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_OPTION = Cypress._.random(0, $intElem - 1);
				this.get.selectSubjectOption().eq(INT_RANDOM_OPTION).click();
			});
	}

	clickUploadPicture(pstrPath: string) {
		this.get.selectUploadFile().should('exist').selectFile(pstrPath);
	}

	typeCurrentAddress(pstrAddress: string) {
		this.get.inputCurrentAddress().should('exist').type(pstrAddress);
	}

	selectRandomState() {
		this.get.selectState().should('exist').click();

		this.get
			.selectStateOption()
			.should('exist')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_OPTION = Cypress._.random(0, $intElem - 1);
				this.get.selectStateOption().eq(INT_RANDOM_OPTION).click();
			});
	}

	selectRandomCity() {
		this.get.selectCity().should('exist').click();

		this.get
			.selectCityOption()
			.should('exist')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_OPTION = Cypress._.random(0, $intElem - 1);
				this.get.selectCityOption().eq(INT_RANDOM_OPTION).click();
			});
	}

	clickSubmit() {
		this.get.buttonSubmit().should('exist').click();
	}
}

export const objPracticeForm = new PracticeForm();
