Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL',
	extraSignupFields: [{
			fieldName: 'firstName',
			fieldLabel: 'First Name',
			inputType: 'text',
			visible: true,
			validate: function(value, errorFunction) {
				if (!value) {
					errorFunction("Please write your first name");
					return false;
				}
				else {
					return true;
				}
			}
		},
		{
			fieldName: 'lastName',
			fieldLabel: 'Last Name',
			inputType: 'text',
			visible: true,
		}]
}); 