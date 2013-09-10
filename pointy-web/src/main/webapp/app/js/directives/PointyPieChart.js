'use strict';

pointyApp.directive('pointyPieChart', [function () {

	var color  = d3.scale.category20();	
	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.value; });
	
  return {
    restrict: 'E',
    scope: {
      chartValues: '=value',
      width: '=',
      height: '=',
      donutHoleAsPercentOfRadius: '='
    },
    
    link: function (scope, element, attrs) {
     
      var width = 960;
      var height = 500;
      var donutHoleAsPercentOfRadius = 0.0;
      if (attrs.width){
      		width = attrs.width;
      }       
      if (attrs.height){
    		height = attrs.height;
      }          
      if (attrs.donutHoleAsPercentOfRadius){
    	  donutHoleAsPercentOfRadius = attrs.donutHoleAsPercentOfRadius;
      }
      var  radius = Math.min(width, height) / 2;  
  	  var arc = d3.svg.arc()
  	  .outerRadius(radius - 10)
  	  .innerRadius(donutHoleAsPercentOfRadius * radius);
  	  
      // set up initial svg object
      var svg = d3.select(element[0])
        .append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
        	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
           
      scope.$watch('chartValues', function (newVal, oldVal) {

        // clear the elements inside of the directive
        svg.selectAll('*').remove();

        // if 'chartValues' is undefined, exit
        if (!newVal) {
          return;
        }

        var pie = d3.layout.pie()
                 .sort(null)
                 .value(function(d) { return d.value; });
        
        var g = svg.selectAll(".arc")
        .data(pie(newVal))
        .enter().append("g")
        .attr("class", "arc");

	    g.append("path")
	        .attr("d", arc)
	        .style("fill", function(d) { return color(d.data.key); });
	
	    g.append("text")
	        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	        .attr("dy", ".35em")
	        .style("text-anchor", "middle")
	        .text(function(d) { return d.data.key + "(" + d.data.value + ")"; });

      });
    }
  }
}]);
