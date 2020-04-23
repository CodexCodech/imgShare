Template.Addimage.events({
	'click .js-addImage'(event,instance){
		console.log("Opening Modal..");
	},
	'click .js-closeTab'(event,instance){
		console.log("closed..");
	},
	'click .js-savechanges'(event,instance){
	var theTitle =$("#Title").val();
	console.log("Saving Title:" +theTitle);
	var thePath =$("#Path").val();
	console.log("Saving Path:" +thePath);
	var theDesc =$("#Desc").val();
	console.log("Saving Description:" +theDesc);
	
		 imagesdb.insert({
  		"title": theTitle,
  		"path" : thePath,
  		"desc" : theDesc,
  		"createdOn": new Date().getTime(),
  		"createdBy": Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address,
  		"createdById": Meteor.userId()
  		});

	  	console.log("saving..");
	  	$("#addImageModal").modal("hide");
	  	$("#Title").val("");
	  	$("#Path").val("");
	  	$("#Desc").val("");
	  	$(".imgholder").attr("src","imgplaceholder.png");
  	},
  	'input #Path'(event,instance){
  		$(".imgholder").attr("src",$("#Path").val());
  		console.log($("#Path").val());
  		 	
	},
});
