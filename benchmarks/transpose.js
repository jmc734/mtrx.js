define('transpose', [
    'benchmark', 
    'mtrx', 
    'mathjs'
], function(benchmark, mtrx, mathjs){

    var suite = new benchmark.Suite('Transpose');
        
    var array = [
        [0,1,2,3,4,5,6,7,8,9],
        [9,8,7,6,5,4,3,2,1,0],
        [0,1,2,3,4,5,6,7,8,9],
        [9,8,7,6,5,4,3,2,1,0],
        [0,1,2,3,4,5,6,7,8,9]
    ];
    
    var a = new mtrx(array);
    var b = mathjs.matrix(array);
    
    suite.add('matrx', function(){
        mtrx.transpose(a);
    }).add('mathjs', function(){
        mathjs.transpose(b);
    }); 
    
    return suite;

});