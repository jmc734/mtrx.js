requirejs.config({

    baseUrl: 'benchmarks',
    
    deps: [
        
        'chart'
        
    ],
    
    paths: {
    
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
    'transpose',
    'multiply',
    'clone'
], function(){
    
    var chart = require('chart');
    var ctx = document.getElementById('chart').getContext('2d');
    
    var suites = Array.prototype.slice.call(arguments);
    
    
    
    var chartConfig = {
		labels: [],
		datasets: [
			{
				label: 'mtrx',
				fillColor: 'rgba(220,220,220,0.2)',
				strokeColor: 'rgba(220,220,220,1)',
				pointColor: 'rgba(220,220,220,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(220,220,220,1)',
				data: []
			},
			{
				label: 'mathjs',
				fillColor: 'rgba(151,187,205,0.2)',
				strokeColor: 'rgba(151,187,205,1)',
				pointColor: 'rgba(151,187,205,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(151,187,205,1)',
				data: []
			}
		]
	};
    
    suites.forEach(function(suite){
        chartConfig.labels.push(suite.name);
        
        chartConfig.datasets.forEach(function(dataset){
           dataset.data.push(0); 
        });
    });
    
    var results = new chart(ctx).Radar(chartConfig, {
        responsive: true
    });
        
    var i = 0;
    var update = function(){
        var benchmarks = Array.prototype.slice.call(this);
        
        benchmarks.forEach(function(benchmark, j){
            results.datasets[j].points[i].value = benchmark.stats.mean*1000000;
        });
        
        results.update();
    };
    var run = function(){
    
        if(!suites.length) return;
    
        var suite = suites.shift();
    
        suite.on('start', function(){
            console.log('start');
        }).on('cycle', update).on('complete', function(){
        
            update.call(this);
            
            i++;
            run();
        }).run({
            async: true
        });
    
    };
    
    run();
    
});