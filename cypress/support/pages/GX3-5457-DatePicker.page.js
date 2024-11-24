class datePicker {
	get = {
		selectDateINput: () => cy.get('#datePickerMonthYearInput'),
		selectDateHeader: () => cy.get('.react-datepicker__header'),
		selectPreviousMonthBtn: () => cy.get('[aria-label="Previous Month"]'),
		selectNextMonthBtn: () => cy.get('[aria-label="Next Month"]'),
		selectMonth: () => cy.get('.react-datepicker__month-select'),
		selectYear: () => cy.get('.react-datepicker__year-select'),
		selectDate: () => cy.get('.react-datepicker__month'),
		currentDate: () => cy.get('.react-datepicker__day--today.react-datepicker__day--selected'),

		dateTimeInput: () => cy.get('#dateAndTimePickerInput'),
		datePreviousMonthBtn: () => cy.get('[aria-label="Previous Month"]'),
		dateNextMonthBtn: () => cy.get('[aria-label="Next Month"]'),
		dateMonth: () => cy.get('.react-datepicker__month-dropdown-container--scroll'),
		dateYear: () => cy.get('.react-datepicker__year-read-view--down-arrow'),
		datePickMonth: () => cy.get('.react-datepicker__month-dropdown'),
		datePickYear: () => cy.get('.react-datepicker__year-dropdown'),
		dateTime: () => cy.get('.react-datepicker__time'),
		increaseYear: () => cy.get('.react-datepicker__year-option').eq(0),
		decreaseYear: () => cy.get('.react-datepicker__year-option').eq(12)
	};

	enterSelectDate(type) {
		this.get.selectDateINput().type(type);
	}
	clickPreviousMonth() {
		this.get.selectPreviousMonthBtn().click();
	}
	clickNextMonth() {
		this.get.selectNextMonthBtn().click();
	}
	getMonth(month) {
		this.get.selectMonth().select(month);
	}
	getYear(year) {
		this.get.selectYear().select(year);
	}
	enterSelectDate(type) {
		this.get.selectDateINput().type(type);
	}
	clickPreviousMonth() {
		this.get.selectPreviousMonthBtn().click();
	}
	clickNextMonth() {
		this.get.selectNextMonthBtn().click();
	}
	getMonth(month) {
		this.get.selectMonth().select(month);
	}
	getYear(year) {
		this.get.selectYear().select(year);
	}
	getDate(day) {
		this.get.selectDate().contains(day).click();
	}
	enterDateTime(type) {
		this.get.dateTimeInput().type(type);
	}
	clickPreviousMonth2() {
		this.get.datePreviousMonthBtn().click();
	}
	clickNextMonth2() {
		this.get.dateNextMonthBtn().click();
	}
	getMonth2() {
		this.get.dateMonth().click();
	}
	getYear2() {
		this.get.dateYear().click();
	}
	selectTime(time) {
		this.get.dateTime().contains(time).click();
	}
	upcomingYear() {
		this.get.increaseYear().click();
	}
	previousYear() {
		this.get.decreaseYear().click();
	}
}

export const Datepicker = new datePicker();
