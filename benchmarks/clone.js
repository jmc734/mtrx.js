define('clone', [
    'benchmark', 
    'mtrx', 
    'mathjs'
], function(benchmark, mtrx, mathjs){

    var suite = new benchmark.Suite('Clone');
        
        var array = [
            [0,1,2,3,4,5,6,7,8,9],
            [9,8,7,6,5,4,3,2,1,0],
            [0,1,2,3,4,5,6,7,8,9],
            [9,8,7,6,5,4,3,2,1,0],
            [0,1,2,3,4,5,6,7,8,9]
        ];
        
        var a1 = new mtrx(array);
        var b1 = mathjs.matrix(array);
        
        suite.add('mtrx', function(){
            mtrx.clone(a1);
        }).add('mathjs', function(){
            mathjs.clone(b1);
        });
        
        return suite;

});