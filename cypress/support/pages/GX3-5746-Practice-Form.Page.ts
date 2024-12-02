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

		buttonSubmit: () => cy.get('#submit'),

		// 0:<tr><td>label</td>   1: <td>value</td><tr>
		resultTable: () => cy.get('.table-responsive'),

		resultName: () => this.get.resultTable().find('tbody tr td').eq(1),
		resultEmail: () => this.get.resultTable().find('tbody tr td').eq(3),
		resultGenders: () => this.get.resultTable().find('tbody tr td').eq(5),
		resultMobile: () => this.get.resultTable().find('tbody tr td').eq(7),
		resultBirth: () => this.get.resultTable().find('tbody tr td').eq(9),
		resultSubjects: () => this.get.resultTable().find('tbody tr td').eq(11),
		resultHobbies: () => this.get.resultTable().find('tbody tr td').eq(13),
		resultPicture: () => this.get.resultTable().find('tbody tr td').eq(15),
		resultAddress: () => this.get.resultTable().find('tbody tr td').eq(17),
		resultStateCity: () => this.get.resultTable().find('tbody tr td').eq(19)
	};

	typeFirthName(pstrFirstName: string) {
		this.get.inputFirstName().should('exist').type(pstrFirstName);
	}

	typeLastName(pstrLastName: string) {
		this.get.inputLastName().should('exist').type(pstrLastName);

		Cypress.env('studentName', `${toString(this.get.inputFirstName().invoke('text'))} ${toString(this.get.inputLastName().invoke('text'))}`);
	}

	typeUserEmail(pstrUserEmail: string) {
		this.get.inputUserEmail().should('exist').type(pstrUserEmail);

		Cypress.env('studentEmail', pstrUserEmail);
	}

	selectGender() {
		const INT_RANDOM = Cypress._.random(0, 2);

		this.get.optionsGenders().eq(INT_RANDOM).as('gender').should('exist').click();

		Cypress.env('studentGender', cy.get('@gender').its('text'));
	}

	typePhoneNumber(pstrPhoneNumber: string) {
		this.get.inputPhoneNumber().should('exist').type(pstrPhoneNumber);

		Cypress.env('studentPhone', pstrPhoneNumber);
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

		Cypress.env('studentBirthDate', this.get.inputDateOfBirth().its('text'));
	}

	typeRandomSubjects(pstrChar: string) {
		this.get.inputSubject().as('subject').should('exist').type(pstrChar);

		this.get
			.selectSubjectOption()
			.should('exist')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_OPTION = Cypress._.random(0, $intElem - 1);
				this.get.selectSubjectOption().eq(INT_RANDOM_OPTION).click();
			});

		Cypress.env('studentSubject', cy.get('@subject').its('text'));
	}

	clickUploadPicture(pstrPath: string) {
		this.get.selectUploadFile().as('pictureName').should('exist').selectFile(pstrPath);

		Cypress.env('studentPhoto', cy.get('@pictureName').its('text'));
	}

	typeCurrentAddress(pstrAddress: string) {
		this.get.inputCurrentAddress().should('exist').type(pstrAddress);

		Cypress.env('studentAddress', pstrAddress);
	}

	selectRandomState() {
		this.get.selectState().as('state').should('exist').click();

		this.get
			.selectStateOption()
			.should('exist')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_OPTION = Cypress._.random(0, $intElem - 1);
				this.get.selectStateOption().as('state').eq(INT_RANDOM_OPTION).click();
			});

		//Cypress.env('studentStateCity', cy.get('@state').its('text'));
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

	validateResult() {
		this.get.resultTable().should('exist');

		this.get.resultName().should('exist').and('be.equal', Cypress.env('studentName'));
	}
}

export const objPracticeForm = new PracticeForm();
