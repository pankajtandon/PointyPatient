'use strict';

pointyApp.directive('pointyBarChart', [function () {


  var margin = {top: 20, right: 20, bottom: 80, left: 40};

	
  return {
    restrict: 'E',
    scope: {
      chartValues: '=value',
      width: '=',
      height: '='
    },
    
    link: function (scope, element, attrs) {       
    	
    	var width = 960;
    	var height = 500;
    	
        if (attrs.width){
      		width = attrs.width;
    	}       
    	if (attrs.height){
    			height = attrs.height;
    	}   
    	
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;
    	
    	var format = d3.format("^#d");

    	var x = d3.scale.ordinal()
    	    .rangeBands([0, width], .1);

    	var y = d3.scale.linear()
    	    .range([height, 0]);

    	var xAxis = d3.svg.axis()
    	    .scale(x)
    	    .orient("bottom");

    	var yAxis = d3.svg.axis()
    	    .scale(y)
    	    .orient("left")
    	    .tickFormat(format);
    	
    	var svg = d3.select(element[0]).append("svg")
        	.attr("width", width + margin.left + margin.right)
        	.attr("height", height + margin.top + margin.bottom)
        .append("g")
        	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");    	
           
    	scope.$watch('chartValues', function (newVal, oldVal) {  
    		
	        // clear the elements inside of the directive
	        svg.selectAll('*').remove();
	
	        // if 'chartValues' is undefined, exit
	        if (!newVal) {
	          return;
	        }
	
	        x.domain(newVal.map(function(d) { return  d.key ; }));
	        y.domain([0, d3.max(newVal, function(d) {return d.value; })]);
	
	        //Render the bars first
	        svg.selectAll(".bar")
	        .data(newVal)
	        .enter().append("rect")
		        .attr("class", "bar")
		        .attr("x", function(d) { return x(d.key); })
		        .attr("width", x.rangeBand())
		        .attr("y", function(d) { return y(d.value); })
		        .attr("height", function(d) { return height - y(d.value); });
	        
	        //Then the axes because they should 'overwrite' the bars
	        //X
	        svg.append("g")
	            .attr("class", "x axis")
	            .attr("transform", "translate(0, " + height + ")")
	            .call(xAxis);       
	        //Rotate the x-ticks
	        svg.selectAll(".x.axis")
	        .selectAll("text")
	        .attr("transform", function(d) {
	        		return "rotate(90) translate(" + ((this.getBBox().width/2) + 5 ) + "," + ((this.getBBox().height) -30)  + ")";
	        	});
	
	        //Y
	        svg.append("g")
	            .attr("class", "y axis")
	            .call(yAxis)
	          .append("text")
	            .attr("transform", "rotate(-90)")
	            .attr("y", 6)
	            .attr("dy", ".71em")
	            .style("text-anchor", "end")
	            .text("Number Of Visits");
      });
    }
  }
}]);
