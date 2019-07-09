(function (d3) {
 'use strict';

 const svg = d3.select('svg');

 const width = +svg.attr('width');
 const height = +svg.attr('height');

 // render chart function
 const render = data => {
   const title = '3 Pt Attempts Per Season';
   
   const xValue = d => d.season;
   const xAxisLabel = 'Season';
   
   const yValue = d => d.fgattempts; 
   const circleRadius = 10;
   const yAxisLabel = 'Shots Per Game';
   
   const y2Value = d => d.tpfgattempts;

   const margin = { top: 60, right: 40, bottom: 88, left: 150 };
   const innerWidth = width - margin.left - margin.right;
   const innerHeight = height - margin.top - margin.bottom;
   // instance scale linear
   const xScale = d3.scaleLinear()
     .domain(d3.extent(data, xValue)) 
     // calculates min & max via the domain() function. extent() searches the data array for min,max values to define the bounds of the graph
     .range([0, innerWidth])
     // defines the size of the graph to which domain is mapped: from 0 to the innerWidth variable (defined globally)
     .nice();
     console.log(xScale.domain())

   const yScale = d3.scaleLinear()
     .domain(d3.extent(data, yValue))
     .range([innerHeight, 0])
     .nice();
     console.log(yScale.domain())

   const y2Scale = d3.scaleLinear()
     .domain(d3.extent(data, y2Value))
     .range([innerHeight, 0])
     .nice();

   const g = svg.append('g')
     .attr('transform', `translate(${margin.left},${margin.top})`);
   
   const xAxis = d3.axisBottom(xScale)
     .tickSize(-innerHeight)
     .tickPadding(15);
   
   // determines tick values of y-axis through the provided argument to axisLeft
   const yAxis = d3.axisLeft(yScale)
     .tickSize(-innerWidth)
     .tickPadding(10);
   
   const yAxisG = g.append('g').call(yAxis);
   yAxisG.selectAll('.domain').remove();
   
   // yAxis label DOM apendage & attributes
   yAxisG.append('text')
       .attr('class', 'axis-label')
       .attr('y', -93)
       .attr('x', -innerHeight / 2)
       .attr('fill', 'black')
       .attr('transform', `rotate(-90)`)
       .attr('text-anchor', 'middle')
       .text(yAxisLabel);
   
   const xAxisG = g.append('g').call(xAxis)
     .attr('transform', `translate(0,${innerHeight})`);
   
   xAxisG.select('.domain').remove();
   // xAxis label DOM apendage & attributes
   xAxisG.append('text')
       .attr('class', 'axis-label')
       .attr('y', 75)
       .attr('x', innerWidth / 2)
       .attr('fill', 'black')
       .text(xAxisLabel);

   // DATA JOIN
   g.selectAll('circle').data(data)
     .enter().append('circle')
       .attr('cy', d => yScale(yValue(d.fgattempts)))
       .attr('cx', d => xScale(xValue(d)))
       .attr('r', circleRadius)
   // title
   g.append('text')
       .attr('class', 'title')
       .attr('y', -10)
       .text(title);
 };

 d3.csv('data.csv')
   .then(data => {
     console.log(data)
    // parse strings to numbers using parseFloat
     data.forEach(d => {
      d.fgattempts = +d.fgattempts;
      d.tpfgattempts = +d.tpfgattempts;
      d.season = +d.season;
       // d.mpg = +d.mpg;
       // d.cylinders = +d.cylinders;
       // d.displacement = +d.displacement;
       // d.horsepower = +d.horsepower;
       // d.weight = +d.weight;
       // d.acceleration = +d.acceleration;
       // d.year = +d.year;  
     });
     render(data);
   });

}(d3));
