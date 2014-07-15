define('multiply', [
    'benchmark', 
    'mtrx', 
    'mathjs'
], function(benchmark, mtrx, mathjs){

    var suite = new benchmark.Suite('Multiply');
        
    var array1 = [
        [0,1,2,3,4,5,6,7,8,9],
        [9,8,7,6,5,4,3,2,1,0],
        [0,1,2,3,4,5,6,7,8,9],
        [9,8,7,6,5,4,3,2,1,0],
        [0,1,2,3,4,5,6,7,8,9]
    ];
    
    var array2 = [
        [1,2,3,4],
        [5,6,7,8],
        [1,2,3,4],
        [5,6,7,8],
        [1,2,3,4],
        [5,6,7,8],
        [1,2,3,4],
        [5,6,7,8],
        [1,2,3,4],
        [5,6,7,8]
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