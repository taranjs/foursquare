'use strict';

var API_PREFIX = 'https://api.foursquare.com/v2/';

var API_SECRET = 'client_id=FATNO4RHKTTK41J12SZAF3R0T5X2PGWU0QOVERAXYXZGXVQI%20&client_secret=WBSAE1XTWNGOXLZMETL5L4LQC2ZQHLXJMFO43WUFLRYDI20A%20&v=20130815';

var FOURSQUARE_EXPLORE = 'venues/explore?venuePhotos=1&sortByDistance=1&limit=50&';

var FOURSQUARE_MENUS = 'venues/__venue_id__/menu?'

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
   	// this.query = 'pizza';
   	//TODO: use postcode to geocode generator eg: https://developers.google.com/maps/documentation/geocoding/
   	// this.postcode = 'london';
   	$scope.loading = false;
   	$scope.infoWindowContent = '';
   	// Default map load location: london
   	$scope.suggestedLat = 51.5;
   	$scope.suggestedLng = 0.12;
  	$scope.marker = {
  		events: {
	      mouseover: function (marker, eventName, args) {
	      	$scope.infoWindowContent = marker.title;
	      	$scope.infoWindowContent = marker.title;
	      }
  		}
  	};
  	$scope.map = {
  		control: {},
	    center: {
	        latitude: $scope.suggestedLat,
	        longitude: $scope.suggestedLng
	    },
		options: {
	        panControl: true,
      	},
	    zoom: 15,
		draggable: true,
	    pan: true,
	};
	$scope.showMap = false;
	$scope.locate = function(venue) {
		if(!$scope.showMap) {
			$scope.showMap = true;
		}
		$scope.currentVenue = venue;
		$scope.map.control.refresh({
			latitude: venue.location.lat,
			longitude: venue.location.lng});
		$http({
	        method: 'get',
	        url: API_PREFIX + FOURSQUARE_MENUS.replace('__venue_id__', venue.id) + API_SECRET,
        }).then(function(result) {
        	window.console.log(result.data.response.menu);
        }, function(error) {
			window.console.log(error);
        });
	};
};

mainCtrl.filterRestaurants = function(items) {
	var filteredItems = [];
	var index = 0;
	while (filteredItems.length < 8) {
		var categories = items[index].venue.categories;
		if (categories) {
			for (var categoryIndex in categories) {
				if (categories[categoryIndex].name.toLowerCase().indexOf('restaurant') > -1) {
					filteredItems.push(items[index]);
					break;
				}
			}
		}
		index ++;
		if (!items[index]) {
			break;
		}
	}
	return filteredItems;

};
mainCtrl.prototype.search = function() {
	var s = this.scope_;
	s.loading = true;
    	this.http_({
	        method: 'get',
	        url: API_PREFIX + FOURSQUARE_EXPLORE + API_SECRET,
	        params: {
	            query: this.query,
	            near: this.postcode
	        },
        }).then(function(result) {
			s.items = mainCtrl.filterRestaurants(result.data.response.groups[0].items);
			s.loading = false;
		}, function(error) {
			s.loading = false;
			window.console.log(error);
        } );
 
    };

angular.module('app4angApp')
  .controller('MainCtrl', ['$scope', '$http', mainCtrl]);