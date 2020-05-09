// Gradpa Benny PWA app
// ----------------------
// Author: Ran Levi
const version = 1.07; 
// Date: 25.04.2020

// This is a PWA built with Swiper JS and Bulma.io. 
// It is designed as a single common app that can be customized
// for different stories and langutes based on json files.

// Ver. 1.01 (26.4.2020):
// - Change images to different ratios according to orientation.
// - modified the code for smaller JSON sizes.

// Ver 1.02 (27.04.2020):
// - Add Version code in the About screen.
// - Add enlarge/reduce font size buttons
// - Add scrollbar on the text area.

// Ver 1.03 (27.04.2020)
// - Add Russian support.

// Ver 1.04 (27.04.2020)
// - Unify all the story jsons to one.
// - Place all the audio and images in folders,
// easier to create new books.

// Ver 1.05 (28.04.2020)
// - Added Galapagos Story

// Ver 1.06 (29.04.2020)
// - Added different manifest files for each story/language (comment out in index.html)

// Ver 1.07 (4.5.2020)
// Added nosleepJS to prevent screen lock during listening.

var about_btn        = document.querySelector('#info_icon');
var about_modal      = document.querySelector('#about_modal');
var close_modal_btn  = document.querySelector('#close_modal_btn');
var home_btn         = document.querySelector('#home_icon');
var text_smaller_btn =  document.querySelector('#text_smaller_icon');
var text_bigger_btn  =  document.querySelector('#text_bigger_icon');

var mySwiper         = null;
var storyObj         = null;
var language         = null;
var book_name        = null;
var audioElement     = null;
var audio_is_playing = false;

import { NoSleep } from 'nosleepJS.js';

var noSleep = new NoSleep();

//config.json holds the langunage
//selection parameter.
////////////////////////////
fetch("./json/config.json")
  .then(function(res){
    return (res.json());
  })
  .then(function(data) {
    book_name = data.book;
    language  = data.language;
    get_story_data(book_name, language);  
  })

//Get the story_xx.json, load its 
//contents, modify the app's ltr-rtl
//settings.
//////////////////////////////////
function get_story_data(book_name, language){
  
  if (language == "heb"){
    document.querySelector('#html_tag').lang="heb";
    document.querySelector('#html_tag').dir ="rtl";
    document.querySelector('#swiper_container').dir ="rtl";    
  }

  //We init the swiper element only after changing the
  //index.html file to the required direction, else
  //the carousel won't work.
  mySwiper = new Swiper('.swiper-container'); 
  init_tap_action();
  
  fetch("./json/stories.json")
  .then(function(res){
    return (res.json());
  })
  .then(function(data) {

    storyObj = data[book_name][language];
    load_pages(book_name,language);        
  })  
}

//Insert the story data into the carousel items.
////////////////////////////////////////////////
function load_pages(book_name,language){  

  document.querySelector('#title').innerHTML = storyObj.title;

  //check orientation.
  var orientation_is_vertical = (window.innerHeight > window.innerWidth);

  //load slides with proper images according to orinentation.
  // -file names are assumed to be - page4x3_x.jpg or page16x9_x.jpg
  // - Images folder should be ./Images/book_name/4by3/page4x3_x.jpg (or similar for 16by9 )
  for (var i=0;i<storyObj.num_of_pages;i++){
    if (orientation_is_vertical){    
      var img_src =  "./Images/" + book_name + "/" + language + "/4by3/page" + i +".jpg";
    } else {
      var img_src = "./Images/" + book_name + "/" + language + "/16by9/page" + i +".jpg";
    }
    
    var img_alt = "Page " + i + " Image";
    var text    = storyObj.texts['page'+i];

    var str = '<div class="content_area">';
    str += '<img src="' + img_src + '" alt="' + img_alt + '">';    
    str += '<div class="content is-medium" id="content_text"><div class="story_text">' + text + '</div></div></div>';    
    
    mySwiper.appendSlide('<div class="swiper-slide">' + str + '</div>');
  }

  document.querySelector('#about_title').innerHTML         = storyObj.about.title;
  document.querySelector('#about_description').innerHTML   = storyObj.about.description;
  document.querySelector('#about_credits_title').innerHTML = storyObj.about.credits_title;
  document.querySelector('#about_credits_text').innerHTML  = storyObj.about.credits_text;
  document.querySelector('#version').innerHTML             = version;

  //Init the audio element, and add a listener to detect
  //when the mp3 finished playing => move to next slide. 
  //Audio folder should be: ./Audio/book_name/language/audio_file.mp3 
  audioElement = new Audio("./Audio/" + book_name + "/" + language + "/page0.mp3"); 
  audioElement.addEventListener('ended', function(){     
    mySwiper.slideNext();
  });

  //When the user changed the slide, we pause the audio
  //(if playing), than load the new audio file for the new 
  //slide. 
  mySwiper.on('slideChange', function(){
    //If audio of the previous page is still playing - pause it.
      if (!audioElement.paused) {
        audioElement.pause();
      }
    
      audioElement = new Audio("./Audio/" + book_name + "/" + language + "/page" + mySwiper.activeIndex + ".mp3");  
      audioElement.addEventListener('ended', function(){     
        mySwiper.slideNext();
      });
    
    //If the audio was playing in the previous page, we assume
    //the user wants to auto-play this page's audio as well.
      if (audio_is_playing) {
        audioElement.play();
      }
    });  
}

//Activate the modal message (the 'about' page)
////////////////////////////////////////////////
about_btn.addEventListener('click', function(){
  about_modal.classList.add('is-active');
})

//Close the modal message.
//////////////////////////////////////////////////////
close_modal_btn.addEventListener('click', function(){
  about_modal.classList.remove('is-active');
})

//Return to the first slide.
//////////////////////////////////////////////////////
home_btn.addEventListener('click', function(){
  mySwiper.slideTo(0);
  audioElement.pause();
})

//Enlarge text font
//////////////////////////////////////////////////////
text_bigger_btn.addEventListener('click', function(){  
  //Iterate on all the slides, replace the current
  //bulam.io modifier with the next largest.
  var elements =  document.querySelector('.swiper-wrapper').children; 

  for (var item of elements){
    var class_list = item.children[0].children[1].classList;

    if (class_list[1]==="is-small"){
      class_list.remove('is-small');
      class_list.add('is-medium');
    } else if (class_list[1]==="is-medium"){
      class_list.remove('is-medium');
      class_list.add('is-large');
    }
  }  
})

//Reduce text font
//////////////////////////////////////////////////////
  //Iterate on all the slides, replace the current
  //bulam.io modifier with the next smallest.
text_smaller_btn.addEventListener('click', function(){
  var elements =  document.querySelector('.swiper-wrapper').children; 

  for (var item of elements){
    var class_list = item.children[0].children[1].classList;
    if (class_list[1]==="is-medium"){
      class_list.remove('is-medium');
      class_list.add('is-small');
    } else if (class_list[1]==="is-large"){
      class_list.remove('is-large');
      class_list.add('is-medium');
    }
  }
})

//Handle tapping on the slides.
///////////////////////////
function init_tap_action(){ 
  mySwiper.on('tap', function (e) { 
    if (e.type!=='mouseup'){ //handle bug in chrmoe dev tools that creates an additional mouse event.

      if (audioElement.paused) {      
        audioElement.play();
        audio_is_playing = true;
        noSleep.enable();

      } else {
        audioElement.pause();
        audio_is_playing = false;
        noSleep.disable();
      }
    }    
  });
}

//When orientation changes, we replace all the slide images
//with images in the correct ratio.
///////////////////////////////////////////////////////////
window.addEventListener("orientationchange", function(){

  //Store the text size modifier for later.
  var text_size_modifier = document.querySelector('.content').classList[1];

  //Store the index, so we can return the user to it later.
  var index_of_current_slide = mySwiper.activeIndex;   

  mySwiper.removeAllSlides();

  //We flip the truth condition due to bug in reading.
  var orientation_is_vertical = !(window.innerHeight > window.innerWidth);

  //load slides with proper images according to the new ratio.  
  for (var i=0;i<storyObj.num_of_pages;i++){
    if (orientation_is_vertical){    
      var img_src =  "./Images/" + book_name + "/" + language + "/4by3/page" + i +".jpg";
    } else {
      var img_src = "./Images/" + book_name + "/" + language + "/16by9/page" + i +".jpg";
    }
    
    var img_alt = "Page " + i + " Image";
    var text    = storyObj.texts['page'+i];

    var str = '<div class="content_area">';
    str += '<img src="' + img_src + '" alt="' + img_alt + '">';    
    str += '<div class="content ' + text_size_modifier + '" id="content_text"><div class="story_text">' + text + '</div></div></div>';    
    
    mySwiper.appendSlide('<div class="swiper-slide">' + str + '</div>');
  }

  //Re-init the swiper, move to the last watched slide.
  mySwiper.update();
  mySwiper.slideTo(index_of_current_slide,10, false);  
  
})


