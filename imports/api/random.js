import { Random } from 'meteor/random' 

uniqueNumber = function(){
	const n = Math.floor(Random.fraction()*imagesdb.find().count());
	return n;
}

Template.randomImg.helpers({
	randImg(){
		console.log(uniqueNumber());
		return imagesdb.find().fetch()[uniqueNumber()];
	},
	 userField(){ // user field information
  	if(!(this.createdBy == undefined)){
  		return true;
  	}
  	else{
  		return false;
  	}
  }
});