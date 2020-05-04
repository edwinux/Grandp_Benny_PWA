// const config = {
//   autoplay: 1000,
//   rewind:   false,
//   direction: 'ltr' //change to rtl in heb
// }

// var glide = new Glide(document.querySelector('.glide', config)).mount();

var mySwiper = new Swiper ('.swiper-container');
mySwiper.appendSlide('<div class="swiper-slide">Slide 10"</div>')

mySwiper.on('tap', function () {
  console.log('tap');
});


var about_btn       = document.querySelector('#info_icon');
var about_modal     = document.querySelector('#about_modal');
var close_modal_btn = document.querySelector('#close_modal_btn');

about_btn.addEventListener('click', function(){
  about_modal.classList.add('is-active');
})

close_modal_btn.addEventListener('click', function(){
  about_modal.classList.remove('is-active');
})

var storyObj         = null;
// var current_page     = 0;
var language         = null;
// var audioElement     = null;
// var audio_is_playing = false;

/*
General:
https://glidejs.com/docs/
*/

// Config file defins the language of the app.
fetch("./json/config.json")
  .then(function(res){
    return (res.json());
  })
  .then(function(data) {
    language = data.language;
    
    //English is default.
    //If Hebrew, set the app's direction to rtl.
    // if (language == "heb"){
    //   document.getElementById('html_tag').dir = "rtl";
    // }
  
    get_story_json(language);  
  })

/////////////////////////////////////////
// Load the story's data (text, images, audio)
// from a JSON file.
///////////////////////////////////////
function get_story_json(language){
  
  var json_name = null;
  
  if (language == "en"){
    json_name = "./json/story_en.json";
  } else if (language == "heb"){
    json_name = "./json/story_heb.json";
  }
  
  fetch(json_name)
  .then(function(res){
    return (res.json());
  })
  .then(function(data) {
    storyObj = data;
    
    // load_first_page_content();
    load_pages();    
    // check_orientation();
  })  
}  
  

//////////////////////////////////////////
//Init the contents of the first page. 
//Note: the first page of a story is loaded here, because 
//      there's always atleast one page.
//      The rest of the pages are loaded dynamically, since 
//      each story has a different number of pages.
/////////////////////////////////////////
// function load_first_page_content(){  
  
//   document.getElementById('page0_image').src             = storyObj.story.pages[0].image_url;
//   document.getElementById('page0_image').alt             = storyObj.story.pages[0].image_alt;
//   document.getElementById('page0_text').innerHTML  = storyObj.story.pages[0].text;  
  
//   audioElement = new Audio(storyObj.story.pages[0].audio);
  
//   //If an audio file has been played all the way to the end, we 
//   //want to flip to the next page. 
//   audioElement.addEventListener('ended', function() {
//     console.log('here')
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
function load_pages(){
  
  var num_of_pages = storyObj.story.number_of_pages;
  var slides = [];

  var str = Slide 10"</div>';
  // mySwiper.appendSlide(slides);
    
  for (var i=0;i<num_of_pages;i++){

    var str = '<div class="swiper-slide">';
    str += 'img src="' + storyObj.story.pages[i].image_url +'" alt="' +  storyObj.story.pages[i].image_alt + '">';

    
    var img_id   = 'image_page_' + i;
    var text_id  = 'story_text_page_' + i;    
    
    var str = '<div class="content_area"><div><img id="' + img_id + '""><div class="story_text" id="' + text_id + '"></div></div></div>';
        
    onsItem.innerHTML = str;
    document.getElementById('itemsCarousel').appendChild(onsItem);
        
    document.getElementById(img_id).src             = storyObj.story.pages[i].image_url;
    document.getElementById(img_id).alt             = storyObj.story.pages[i].image_alt;
    document.getElementById(text_id).innerHTML      = storyObj.story.pages[i].text;    
  }  
  
}

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


