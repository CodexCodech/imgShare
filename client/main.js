import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor

import './main.html';
import '../lib/collection.js';

//Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
//  this.counter = new ReactiveVar(0);
//});

Session.set("imageLimit", 9);
lastScrollTop = 0;
$(window).scroll(function(event){
	// check if we are near the bottom of the page
	if ($(window).scrollTop() + $(window).height() > $(document).height()-100){
		// Where are we on the page?
		var scrollTop = $(this).scrollTop();
		// test if we are going down
		if (scrollTop > lastScrollTop){
			// yes we scrolling down
			Session.set("imageLimit", Session.get("imageLimit") + 3);
		} //end of if (newScrollTop)
		lastScrollTop = scrollTop;
	}// end of if (height check)
});

Template.myGallery.helpers({
 allImages(){
 	var prevTime = new Date().getTime() - 15000;
 	var results = imagesdb.find({createdOn: {$gte: prevTime}}).count();
 	if (results > 0){
 		return imagesdb.find({}, {sort:{createdOn: -1,  ratings: -1}, limit: Session.get( "imageLimit")});
 	} else
 		return imagesdb.find({}, {sort:{ratings: -1,  createdOn: -1}, limit: Session.get( "imageLimit")});
 	// return imagesdb.find({}, {sort:{ratings: -1}});
  },
  userField(){
  	if(!(this.createdBy == undefined)){
  		return true;
  	}
  	else{
  		return false;
  	}
  }
});



Template.myGallery.events({
  'click .js-delete'(event, instance) {
	   // console.log("deleting...");
	   var myId	= this._id;
	   $("#delID").val(myId);
	   $("#confirmModal").modal("show");
	    // $("#"+this._id).fadeOut('slow',function(){
	   //imagesdb.remove({_id:myId});
	   // console.log(myId);  
	   // imagesdb.remove(this._id) 
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
  		"createdBy": Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address
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

Template.editimage.events({
	'click .js-addMe'(event,instance){
		var newTitle = $("#edTitle").val();
		var newPath = $("#edPath").val();
		var newDesc = $("#edDesc").val();
		var updateId = $("#edID").val();
		console.log(newTitle);
		imagesdb.update({_id: updateId},
			{$set:{
				"title":newTitle,
				"path":newPath,
				"desc":newDesc,

			}}
		);
	},
		// 'input #edPath'(event,instance){
  		// $(".imgholder").attr("src",$("#edPath").val());
	//console.log("adding image...")
});


