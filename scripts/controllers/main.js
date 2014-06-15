'use strict';

var FOURSQUARE_API = 'https://api.foursquare.com/v2/venues/explore?client_id=FATNO4RHKTTK41J12SZAF3R0T5X2PGWU0QOVERAXYXZGXVQI%20&client_secret=WBSAE1XTWNGOXLZMETL5L4LQC2ZQHLXJMFO43WUFLRYDI20A%20&v=20130815&limit=8'

/**
 * @ngdoc function
 * @name app4angApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app4angApp
 */


var mainCtrl = function ($scope, $http) {
   	this.scope_ = $scope;
   	this.http_ = $http;
   	this.postcode = '';
   	//TODO: update based on results
   	$scope.suggestedLat = 51.5;
   	$scope.suggestedLng = 0.12;
  	$scope.map = {
	    center: {
	        latitude: $scope.suggestedLat,
	        longitude: $scope.suggestedLng
	    },
	    zoom: 8,
	    draggable: true,
	    pan: true
	};

};


mainCtrl.prototype.search = function() {
	var s = this.scope_;
	window.console.log(this.scope_);
	window.console.log(this.postcode);
    	this.http_({
	        method: "get",
	        url: FOURSQUARE_API,
	        params: {
	            //ll: "51.5,0.12",
	            near: this.postcode
	        },
        }).then(function(result) {
			s.items = result.data.response.groups[0].items;
			// var bounds = result.data.response.suggestedBounds;
			// s.suggestedLat = bounds.ne.lat;
			// s.suggestedLng = bounds.ne.lng;


		}, function(error) {
			window.console.log(error);
        } );
 
    };

angular.module('app4angApp')
  .controller('MainCtrl', mainCtrl);