import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor


// ui templates
import './layout.html';
import './myGallery.html';
import './addimage.html';
import './editimage.html';



// api scripts
import '../../lib/collection.js';
import '../../lib/accounts-ui.js';
import '../api/infintescroll.js';
import '../api/mygallery.js';
import '../api/addimage.js';
import '../api/editimage.js';

