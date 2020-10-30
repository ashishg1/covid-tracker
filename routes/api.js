var express = require('express');
var isConstant = require('constantinople')
var request = require('request');
var router = express.Router();

//outside scope of ctf  - this is a legitimate covid api and out of scope for testing
const baseUrl = "https://covid19.mathdro.id/api"

router.get('/countries', function(req, res){
	try {  
	  	const { data: { countries } } = request.get(
	  		{url: baseUrl + '/countries'},
	  		function(error, response, body){res.send(body);}
	  	);
   		return countries.map((country) => country.name);
  	}
  	catch (error) {
    	return error;
	 }
});

router.get('/countries-:country', function(req, res){
	try {

		if(isConstant(req.params.country)){
			const country = req.params.country   
		}
		else{
			var country = req.params.country
		}
	  	const { data: { countries } } = request.get(
	  		{url: baseUrl + '/countries/' + country},
	  		function(error, response, body){res.send(body);}
	  	);
   		return countries.map((country) => country.name);
  	}
  	catch (error) {
    	return error;
	 }
});

router.get('/daily', function(req, res){
	try {  
	  	const { data: { countries } } = request.get(
	  		{url: baseUrl + '/daily'},
	  		function(error, response, body){res.send(body);}
	  	);
   		return countries.map((country) => country.name);
  	}
  	catch (error) {
    	return error;
	 }
});

router.get('/', function(req, res){
	try {  
  		const { data } = request.get(
  		 	{url:baseUrl},
  		  	function(error, response, body){res.send(body);}
  		);
  		return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
	}
	catch (error) {
		return error;
 	}
});


module.exports = router;