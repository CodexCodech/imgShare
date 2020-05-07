import { Random } from 'meteor/random' 

Template.randomImg.helpers({
	randImg(){
		return imagesdb.findOne({});
	}
});