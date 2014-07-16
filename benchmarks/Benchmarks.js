requirejs.config({

    baseUrl: 'benchmarks',
    
    deps: [
        
        'jquery',
        'chart'
        
    ],
    
    paths: {
    
        'jquery': '../lib/jquery/dist/jquery.min',
        
        'benchmark': '../lib/benchmark/benchmark',
        
        'mtrx': '../src/mtrx',
        
        'mathjs': '../lib/mathjs/dist/math.min',
    
        'chart': '../lib/chart/Chart.min'
    
    },
    
    shim: {
        
        'benchmark': {
            exports: 'Benchmark'
        },
        
        'mathjs': {
            exports: 'math'
        },
        
        'chart': {
            exports: 'Chart'
        }
        
    }

});

require([
    'construct',
    'transpose',
    'multiply',
    'multiplyScalar',
    'add',
    'clone'
], function(){
    
    var $ = require('jquery');
    var chart = require('chart');
    var ctx = $('#chart canvas')[0].getContext('2d');
    var table = $('#results table');
    
    var suites = Array.prototype.slice.call(arguments);
    
    var chartConfig = {
		labels: [],
		datasets: [
			{
				label: 'mtrx',
                fillColor: 'rgba(151,187,205,0.2)',
				strokeColor: 'rgba(151,187,205,1)',
				pointColor: 'rgba(151,187,205,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
				data: []
			},
			{
				label: 'mathjs',
                fillColor: 'rgba(215,44,44,0.2)',
				strokeColor: 'rgba(215,44,44,1)',
				pointColor: 'rgba(227,100,75,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(227,100,75,1)',
				data: []
			}
		]
	};
    
    suites.forEach(function(suite){
        chartConfig.labels.push(suite.name);
        
        chartConfig.datasets.forEach(function(dataset){
           dataset.data.push(0); 
        });
        
        table.append('<tr><td>'+suite.name+'</td><td></td><td></td><td></td></tr>');
    });
    
    var curRow = table.find('tr:nth-child(2)');
    
    var results = new chart(ctx).Radar(chartConfig, {
        responsive: false,
        scaleBeginAtZero: false,
        angleLineColor: 'rgba(255,255,255,0.5)',
        pointLabelFontColor : 'rgba(255,255,255,0.9)',
        pointLabelFontSize: 12,
        scaleLineColor: 'rgba(255,255,255,0.5)',
        scaleFontColor: 'rgba(255,255,255,0.8)',
        scaleFontSize: 10,
        tooltipFillColor: 'rgba(255,255,255,0.9)',
        tooltipFontColor: '#000',
        tooltipTitleFontColor: '#000',
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].pointColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });
        
    var i = 0;
    var run = function(){
    
        if(!suites.length) return;
    
        var suite = suites.shift();
        
        suite.on('start', function(){
            console.log('start');
        }).on('complete', function(){
        
            var benchmarks = Array.prototype.slice.call(this);

            var curCol = curRow.children('td:nth-child(2)');
        
            benchmarks.forEach(function(benchmark, j){
                var value = (benchmark.stats.mean*1000000).toFixed(2);
                results.datasets[j].points[i].value = value;
                curCol.text(value + ' us');
                curCol = curCol.next('td');
            });
            
            results.update();
            
            curRow = curRow.next('tr');
            i++;
            run();
        }).run({
            async: true
        });
    
    };
    
    run();
    
});