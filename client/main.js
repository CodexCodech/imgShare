import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
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

Template.myGallery.helpers({
 allImages(){
 	return imagesdb.find();
 }
});



Template.myGallery.events({
  'click .js-delete'(event, instance) {
   // console.log("deleting...");
   var myId	= this._id;
   $("#"+this._id).fadeOut('slow',function(){
   //imagesdb.remove({_id:myId});
   console.log(myId);  
   // imagesdb.remove(this._id) 
});

  },
  'click .js-edit'(event, instance) {
   $("#editImageModal").modal("show");
   var myId = this._id;
   console.log("Let's Edit " +  myId);
   var eTitle = imagesdb.findOne({_id:myId}).title;
   var ePath = imagesdb.findOne({_id:myId}).path;
   var eDesc = imagesdb.findOne({_id:myId}).desc;
   $("#edTitle").val(eTitle);
   $("#edPath").val(ePath);
   $("#edDesc").val(eDesc);
   $(".eholder").attr("src", ePath)

  }

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
	console.log("Saving Title:"+theTitle);
	var thePath =$("#Path").val();
	console.log("Saving Path:" +thePath);
	var theDesc =$("#Desc").val();
	console.log("Saving Description:" +theDesc);
	
		 imagesdb.insert({
  		"title": theTitle,
  		"path" : thePath,
  		"desc" : theDesc
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
		imagesdb.update({_id: updateId},
			{$set:{
				"title":newTitle,
				"path":newPath,
				"desc":newDesc
			}}
		);
	},
	//console.log("adding image...")
})


