Template.editimage.events({
	'click .js-addMe'(event,instance){
		var newTitle = $("#edTitle").val();
		var newPath = $("#edPath").val();
		var newDesc = $("#edDesc").val();
		var updateId = $("#edID").val();
		console.log(` updating ${updateId} Image with Title ${newTitle} and 
		path is ${newPath} and its description ${newDesc}`);
		imagesdb.update({_id: updateId},
			{$set:{
				"title":newTitle,
				"path":newPath,
				"desc":newDesc,

			}}
		);
	},
		'input #edPath'(event,instance){
  		$(".imgholder").attr("src",$("#edPath").val());
  	}
});