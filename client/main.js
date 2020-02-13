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
   imagesdb.remove({_id:myId});
   console.log(myId);  
   // imagesdb.remove(this._id) 
});

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
  	}
});

