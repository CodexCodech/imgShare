Template.myGallery.helpers({ //helper for the html which has a timer of 15 seconds for new image
 allImages(){
 	var prevTime = new Date().getTime() - 15000;
 	var results = imagesdb.find({createdOn: {$gte: prevTime}}).count();
 	if (results > 0){
 		return imagesdb.find({}, {sort:{createdOn: -1,  ratings: -1}, limit: Session.get( "imageLimit")});
 	} else
 		return imagesdb.find({}, {sort:{ratings: -1,  createdOn: -1}, limit: Session.get( "imageLimit")});
 	// return imagesdb.find({}, {sort:{ratings: -1}});
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


// events for delete, edit, rating and confirm buttons.
Template.myGallery.events({
  'click .js-delete'(event, instance) {
	   // console.log("deleting...");
	   var myId	= this._id;
	   $("#delID").val(myId);
	   $("#confirmModal").modal("show");
	},

  'click .js-edit'(event, instance) {
   $("#editImageModal").modal("show");
   var myId = this._id;
   console.log("Let's Edit " +  myId);
   var eTitle = imagesdb.findOne({_id:myId}).title;
   var ePath = imagesdb.findOne({_id:myId}).path;
   var eDesc = imagesdb.findOne({_id:myId}).tesc;
   $("edID").val(myId);
   $("#edTitle").val(eTitle);
   $("#edPath").val(ePath);
   $("#edDesc").val(eDesc);
   $(".eholder").attr("src", ePath);

  },
  'click .js-confirm'(event,instance){
  	var myId =$("#delID").val();
  	$("#"+myId).fadeOut('slow',function(){
  		imagesdb.remove({_id:myId});
  		console.log(myId);
  	});
  },
   "click .rating"(event) {
        const value = $(event.target).val();
        var myId = this.picId;
        console.log(myId + " : " + value);
        imagesdb.update({_id: myId},
        		{$set:{
				"ratings":value
			}}
		);
    },
});
