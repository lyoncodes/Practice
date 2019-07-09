import {
 select,
 csv,
 scaleLinear,
 extent,
 axisLeft,
 axisBottom,
 max,
 format
} from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
 const title = '3 Pt Attempts Per Season';
 
 const xValue = d => d.season;
 const xAxisLabel = 'Season';
 
 const yValue = d => d.fgattempts;
 const circleRadius = 10;
 const yAxisLabel = '2 Pt Attempts';
 
 const margin = { top: 60, right: 40, bottom: 88, left: 150 };
 const innerWidth = width - margin.left - margin.right;
 const innerHeight = height - margin.top - margin.bottom;
 
 const xScale = scaleLinear()
   .domain(extent(data, xValue))
   .range([0, innerWidth])
   .nice();
 
 const yScale = scaleLinear()
   .domain([0, max(data, d => d.fgattempts)])
   .range([innerHeight, 0])
   .nice();
 
 const y2Scale = scaleLinear()
   .domain([0, ])

 const g = svg.append('g')
   .attr('transform', `translate(${margin.left},${margin.top})`);
 
 const xAxis = axisBottom(xScale)
   .tickSize(-innerHeight)
   .tickPadding(15);
 
 const yAxis = axisLeft(yScale)
   .tickSize(-innerWidth)
   .tickPadding(10);
 
 const yAxisG = g.append('g').call(yAxis);
 yAxisG.selectAll('.domain').remove();
 
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
 
 // X-Axis Label "Season"
 xAxisG.append('text')
     .attr('class', 'axis-label')
     .attr('y', 75)
     .attr('x', innerWidth / 2)
     .attr('fill', 'black')
     .text(xAxisLabel);
 
 g.selectAll('circle').data(data)
   .enter().append('circle')
     .attr('cy', d => yScale(yValue(d)))
     .attr('cx', d => xScale(xValue(d)))
     .attr('r', circleRadius);
 
 g.append('text')
     .attr('class', 'title')
     .attr('y', -10)
     .text(title);
};

csv('data.csv')
 .then(data => {
   data.forEach(d => {
     d.fgattempts = +d.fgattempts;
     d.season = d.season
     // d.displacement = +d.displacement;
     // d.horsepower = +d.horsepower;
     // d.weight = +d.weight;
     // d.acceleration = +d.acceleration;
     // d.year = +d.year;  
   });
   render(data);
 });