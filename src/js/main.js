/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*jslint node: true */

'use strict';

var $ = require('browserify-zepto'),
    appJS = require('app-js');

var cordovaShell = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },

  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'cordovaShell.receivedEvent(...);'
  onDeviceReady: function() {
    cordovaShell.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);

    var mainAppEl = document.querySelector('.main-app');
    mainAppEl.setAttribute('style', 'display:block;');

    appJS.controller('sign-in', function (page) {
      $(page).find('.sign-in').on('click', function(e){
        e.preventDefault();

        var email = $(page).find('.email').val(),
            password = $(page).find('.password').val();

        if(email !== 'coffee@email.com' || password !== 'password'){
          console.log('Bad username password');
          $(page).find('.error-section').show();
          $(page).find('.error').text('Incorrect credentials, try again.');
        }else{
          return appJS.load('home');
        }
      });

      $(page).find('.clear').on('click', function(){
        $(page).find('.email').val('');
        $(page).find('.password').val('');
        $(page).find('.error').text('');
        $(page).find('.error-section').hide();
      });
    });

    try {
      console.log('restore');
      appJS.restore();
    } catch (err) {
      console.log('load home');
      appJS.load('sign-in');
    }

    setTimeout(function(){

    }, 5000);
  }
};

cordovaShell.initialize();