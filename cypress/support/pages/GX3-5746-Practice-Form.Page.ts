class PracticeForm {
	/* Private PROPERTIES. Only can be access from class inner methods */
	private ppFirstName: string;
	private ppLastName: string;
	private ppUserEmail: string;
	private ppGender: string;
	private ppPhoneNumber: string;
	private ppBirthDate: string;
	private ppSubject: string;
	private ppFileName: string;
	private ppCurrentAddress: string;
	private ppState: string;
	private ppCity: string;

	constructor() {
		this.ppFirstName = '';
		this.ppLastName = '';
		this.ppUserEmail = '';
		this.ppGender = '';
		this.ppPhoneNumber = '';
		this.ppBirthDate = '';
		this.ppSubject = '';
		this.ppFileName = '';
		this.ppCurrentAddress = '';
		this.ppState = '';
		this.ppCity = '';
	}

	/* Class METHODS */
	set = {
		firstName(pstrName: string) {
			this.ppFirstName = pstrName;
		},
		birthDate(pstrBirthDate: string) {
			this.ppBirthDate = pstrBirthDate;
		}
	};

	private get = {
		inputFirstName: () => cy.get('input#firstName'),
		inputLastName: () => cy.get('input#lastName'),
		inputUserEmail: () => cy.get('input#userEmail'),
		optionsGenders: () => Cypress.$('label[for^="gender-radio-"]'),
		inputPhoneNumber: () => cy.get('input#userNumber'),

		inputDateOfBirth: () => cy.get('input#dateOfBirthInput'),
		inputDateOfBirthCy: () => Cypress.$('input[id="dateOfBirthInput"]'),
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

	public typeFirthName(pstrFirstName: string) {
		this.get.inputFirstName().as('firstName').should('exist').type(pstrFirstName);
		this.ppFirstName = pstrFirstName;
	}

	public typeLastName(pstrLastName: string) {
		this.get.inputLastName().as('lastName').should('exist').type(pstrLastName);
		this.ppLastName = pstrLastName;
	}

	public typeUserEmail(pstrUserEmail: string) {
		this.get.inputUserEmail().as('email').should('exist').type(pstrUserEmail);
		this.ppUserEmail = pstrUserEmail;
	}

	public selectGender() {
		const INT_RANDOM = Cypress._.random(0, 2);

		this.get.optionsGenders()[INT_RANDOM].click();

		this.ppGender = this.get.optionsGenders()[INT_RANDOM].innerText;
	}

	public typePhoneNumber(pstrPhoneNumber: string) {
		this.get.inputPhoneNumber().as('phoneNumber').should('exist').type(pstrPhoneNumber);

		this.ppPhoneNumber = pstrPhoneNumber;
	}

	private clickDateOfBirth() {
		this.get.inputDateOfBirth().click();
	}

	public selectRandomDate() {
		/* Años bisiestos:
			- los múltiplos de 4
			- salvo los múltiplos de 100
			- a excepción de los múltiplos de 1000
			(ej. el año 2000 fue bisiesto pese a ser múltiplo de 100)
			Seleccionamos primero el año, luego el mes y por último el día,
			para cercionarnos que febrero tiene el número correcto de días
		*/

		//this.clickDateOfBirth();
		//this.get.inputDateOfBirth().triggerHandler('click');
		this.get.inputDateOfBirth().as('birthDate').click();

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

		this.ppBirthDate = this.get.inputDateOfBirthCy().val();
	}

	public typeRandomSubjects(pstrChar: string) {
		this.get.inputSubject().as('subject').should('exist').type(pstrChar);

		this.get
			.selectSubjectOption()
			.should('exist')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_OPTION = Cypress._.random(0, $intElem - 1);

				this.get.selectSubjectOption().eq(INT_RANDOM_OPTION).click();
			});

		cy.get('@subject')
			.invoke('text')
			.then($the => {
				this.ppSubject = $the;
			});
	}

	public clickUploadPicture(pstrPath: string) {
		this.get.selectUploadFile().as('pictureName').should('exist').selectFile(pstrPath);

		cy.get('@pictureName')
			.invoke('text')
			.then($the => {
				this.ppFileName = $the;
			});
	}

	public typeCurrentAddress(pstrAddress: string) {
		this.get.inputCurrentAddress().as('currentAddress').should('exist').type(pstrAddress);

		this.ppCurrentAddress = pstrAddress;
	}

	public selectRandomState() {
		this.get.selectState().as('state').should('exist').click();

		this.get
			.selectStateOption()
			.should('exist')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_OPTION = Cypress._.random(0, $intElem - 1);
				this.get.selectStateOption().eq(INT_RANDOM_OPTION).click();
			});

		cy.get('@state')
			.invoke('text')
			.then($the => {
				this.ppState = $the;
			});
	}

	public selectRandomCity() {
		this.get.selectCity().as('city').should('exist').click();

		this.get
			.selectCityOption()
			.should('exist')
			.its('length')
			.then($intElem => {
				const INT_RANDOM_OPTION = Cypress._.random(0, $intElem - 1);

				this.get.selectCityOption().eq(INT_RANDOM_OPTION).click();
			});

		cy.get('@city')
			.invoke('text')
			.then($the => {
				this.ppCity = $the;
			});
	}

	public clickSubmit() {
		this.get.buttonSubmit().should('exist').click();
	}

	public validateResult() {
		this.get.resultTable().should('exist');

		this.get.resultName().should('exist').and('contain.text', `${this.ppFirstName} ${this.ppLastName}`);

		this.get.resultEmail().should('exist').and('have.text', this.ppUserEmail);
		this.get.resultGenders().should('exist').and('have.text', this.ppGender);
		this.get.resultMobile().should('exist').and('have.text', this.ppPhoneNumber);
		this.get.resultBirth().should('exist').and('have.text', this.ppBirthDate);
		this.get.resultSubjects().should('exist').and('have.text', this.ppSubject);
		this.get.resultHobbies().should('exist');
		this.get.resultPicture().should('exist').and('have.text', this.ppFileName);
		this.get.resultAddress().should('exist').and('have.text', this.ppCurrentAddress);
		this.get.resultStateCity().should('exist').and('have.text', `${this.ppState} ${this.ppCity}`);
	}
}

export const objPracticeForm = new PracticeForm();
