import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

BlazeLayout.setRoot('.container');

FlowRouter.route('/', {
  name: 'index',
  action(params, queryParams) {
  	BlazeLayout.render("pageLayout", {top: "pager", main: "randomImg"});
    console.log("home page");
  }
});

FlowRouter.route('/gallery', {
  name: 'gallery',
  action(params, queryParams) {
  	BlazeLayout.render("pageLayout", {top: "pager", main: "myGallery"});
    console.log("the gallery of pictures");
  }
});