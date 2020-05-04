const config = {
  autoplay: 1000,
  rewind:   false,
  direction: 'ltr' //change to rtl in heb
}

new Glide(document.querySelector('.glide', config)).mount();


var about_btn = document.querySelector('#info_icon');
var about_modal = document.querySelector('#about_modal');

about_btn.addEventListener('click', function(){
  console.log('here');
})


// import Glide from './glidejs/glide'

// new Glide('.glide').mount()



// var glide = new Glide('.glide', config).mount();

// https://glidejs.com/docs/setup/


// var storyObj         = null;
// var current_page     = 0;
// var language         = null;
// var audioElement     = null;
// var audio_is_playing = false;

/*
General:
https://glidejs.com/docs/
*/

// var deferredPrompt = null;

////////////////////////////////////////////////////
//Handle the install button. 
////////////////////////////////////////////////////
// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent the mini-infobar from appearing on mobile
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI notify the user they can install the PWA  
//   show_install_button();
// });

// //////////////////////////////////////////////////////////
// function show_install_button(){
//   document.querySelector('#install_btn').hidden = false;
// }

// //////////////////////////////////////////////////////////
// //User pressed the intall Button.
// //////////////////////////////////////////////////////////
// function install_app(){  
//   // Show the install prompt
//   deferredPrompt.prompt();
    
//   // Wait for the user to respond to the prompt
//   deferredPrompt.userChoice.then((choiceResult) => {
//     if (choiceResult.outcome === 'accepted') {      
//       document.querySelector('#install_btn').hidden = true;
//     } else {
//       console.log('User dismissed the install prompt');
//     }
//   })
// }

// ////////////////////////////////////////////////////////
// //On load, check if the app was laucned as a standalone app.
// //If not, display the install button option.
// /////////////////////////////////////////////////////////
// window.addEventListener('load', () => {
//   if (navigator.standalone || matchMedia('(display-mode: standalone)').matches) {
//     console.log('Launched: Installed');
//   } else {    
//     show_install_button();
//   }
// });

//Config file defins the language of the app.
// fetch("./Json/config.json")
//   .then(function(res){
//     return (res.json());
//   })
//   .then(function(data) {
//     language = data.language;
    
//     //English is default.
//     //If Hebrew, set the app's direction to rtl.
//     if (language == "heb"){
//       document.getElementById('html_tag').dir = "rtl";
//     }
  
//     get_story_json(language);  
//   })

///////////////////////////////////////////
//Load the story's data (text, images, audio)
//from a JSON file.
/////////////////////////////////////////
// function get_story_json(language){
  
//   var json_name = null;
  
//   if (language == "en"){
//     json_name = "./Json/story_en.json";
//   } else if (language == "heb"){
//     json_name = "./Json/story_heb.json";
//   }
  
//   fetch(json_name)
//   .then(function(res){
//     return (res.json());
//   })
//   .then(function(data) {
//     storyObj = data;
    
//     // load_first_page_content();
//     // load_pages();    
//     // check_orientation();
//   })  
// }  
  
// //////////////////////////////////////////
// const openMenu = () => {
//     document.querySelector('#menu').open();
// };

// //////////////////////////////////////////
// const loadPage = (page) => {
//     document.querySelector('#menu').close();
//     document.querySelector('#myNavigator').bringPageTop(page, { animation: 'fade' });
//   };

//////////////////////////////////////////
//Init the contents of the first page. 
//Note: the first page of a story is loaded here, because 
//      there's always atleast one page.
//      The rest of the pages are loaded dynamically, since 
//      each story has a different number of pages.
/////////////////////////////////////////
// function load_first_page_content(){  
  
//   document.getElementById('image_page_0').src             = storyObj.story.pages[0].image_url;
//   document.getElementById('image_page_0').alt             = storyObj.story.pages[0].image_alt;
//   document.getElementById('story_text_page_0').innerHTML  = storyObj.story.pages[0].text;  
  
//   audioElement = new Audio(storyObj.story.pages[0].audio);
  
//   //If an audio file has been played all the way to the end, we 
//   //want to flip to the next page. 
//   audioElement.addEventListener('ended', function() {
//     document.querySelector('ons-carousel').next();    
//   });
  
// }

//////////////////////////////////////////////////
//When starting the app in landscape mode - hide the toolbar.
///////////////////////////////////////////////////
// function check_orientation(){
  
//   var orientation = screen.orientation;
  
//   //Portarit is default
//   if (orientation.type == "landscape-primary"){
//     document.querySelector('ons-toolbar').hide();
//   }
// }

///////////////////////////////////////////////////
//While app is running, check for oriantation changes,
//and hide/unhide the text and toolbar.
////////////////////////////////////////////////////
// window.addEventListener('orientationchange', (ev) => {

//   var orientation = screen.orientation;

//   if (orientation.type == "portrait-primary"){
//     document.querySelector('ons-toolbar').show();
//   } else if (orientation.type == "landscape-primary"){
//     document.querySelector('ons-toolbar').hide();    
//   }
  
// })

////////////////////////////////////////////////////
//Dynamically add story pages as carosel-items.
///////////////////////////////////////////////////
// function load_pages(){
  
//   var num_of_pages = storyObj.story.number_of_pages;
  
//   //Start from 1, since first page is already loaded.
//   for (var i=1;i<num_of_pages;i++){
    
//     var onsItem= document.createElement('ons-carousel-item');
    
//     var img_id   = 'image_page_' + i;
//     var text_id  = 'story_text_page_' + i;    
    
//     var str = '<div class="content_area"><div><img id="' + img_id + '""><div class="story_text" id="' + text_id + '"></div></div></div>';
        
//     onsItem.innerHTML = str;
//     document.getElementById('itemsCarousel').appendChild(onsItem);
        
//     document.getElementById(img_id).src             = storyObj.story.pages[i].image_url;
//     document.getElementById(img_id).alt             = storyObj.story.pages[i].image_alt;
//     document.getElementById(text_id).innerHTML      = storyObj.story.pages[i].text;    
//   }  
  
// }

//////////////////////////////////////////////////////////////
//When the user flips a page, we handle the audio.
//////////////////////////////////////////////////////////////
// document.querySelector('ons-carousel').addEventListener('postchange', function() {
  
//   //If audio of the previous page is still playing - pause it.
//   if (!audioElement.paused) {
//     audioElement.pause();
//   }
  
//   var item_index = document.querySelector('ons-carousel').getActiveIndex();
//   audioElement = new Audio(storyObj.story.pages[item_index].audio);
  
//   //If the audio was playing in the previous page, we assume
//   //the user wants to auto-play this page's audio as well.
//   if (audio_is_playing) {
//     audioElement.play();
//   }
// })

// //Handle tapping on the screen to start/stop audio play.
// var divGD = ons.GestureDetector(document.querySelector('ons-carousel'));

// divGD.on('tap', function(event) {
//   if (audioElement.paused) {
//     audioElement.play();
//     audio_is_playing = true;
//   } else {
//     audioElement.pause();
//     audio_is_playing = false;
//   }
// });


