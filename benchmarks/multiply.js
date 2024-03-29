define('multiply', [
    'benchmark', 
    'mtrx', 
    'mathjs'
], function(benchmark, mtrx, mathjs){

    var suite = new benchmark.Suite('Multiply');
        
    var array1 = [
        [0,1,2,3,4],
        [9,8,7,6,5],
        [0,1,2,3,4],
        [9,8,7,6,5],
        [0,1,2,3,4]
    ];
    
    var array2 = [
        [1,2],
        [5,6],
        [1,2],
        [5,6],
        [1,2]
    ];
    
    var a1 = new mtrx(array1);
    var a2 = new mtrx(array2);
    var b1 = mathjs.matrix(array1);
    var b2 = mathjs.matrix(array2);
    
    suite.add('mtrx', function(){
        mtrx.multiply(a1,a2);
    }).add('mathjs', function(){
        mathjs.multiply(b1,b2);
    });
    
    return suite;

});