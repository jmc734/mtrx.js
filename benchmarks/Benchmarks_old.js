
Benchmarks = {

    Transpose: function(){
        var suite = new Benchmark.Suite('Transpose');
        
        var array = [
            [0,1,2,3,4,5,6,7,8,9],
            [9,8,7,6,5,4,3,2,1,0],
            [0,1,2,3,4,5,6,7,8,9],
            [9,8,7,6,5,4,3,2,1,0],
            [0,1,2,3,4,5,6,7,8,9]
        ];
        
        var a = new Matrix(array);
        var b = math.matrix(array);
        
        suite.add('MorphJS', function(){
            Matrix.transpose(a);
        }).add('MathJS', function(){
            math.transpose(b);
        }); 
        
        return suite;
    },
    
    MultiplyScalar: function(){
        var suite = new Benchmark.Suite('MultiplyScalar');
        
        var array = [
            [0,1,2,3,4,5,6,7,8,9],
            [9,8,7,6,5,4,3,2,1,0],
            [0,1,2,3,4,5,6,7,8,9],
            [9,8,7,6,5,4,3,2,1,0],
            [0,1,2,3,4,5,6,7,8,9]
        ];
        
        var a1 = new Matrix(array);
        var b1 = math.matrix(array);
        
        suite.add('MorphJS', function(){
            Matrix.multiplyScalar(a1,10);
        }).add('MathJS', function(){
            math.multiply(b1,10);
        });
        
        return suite;
    },
    
    Multiply: function(){
        var suite = new Benchmark.Suite('Multiply');
        
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
        
        var a1 = new Matrix(array1);
        var a2 = new Matrix(array2);
        var b1 = math.matrix(array1);
        var b2 = math.matrix(array2);
        
        suite.add('MorphJS', function(){
            Matrix.multiply(a1,a2);
        }).add('MathJS', function(){
            math.multiply(b1,b2);
        });
        
        return suite;
    },
    
    Add: function(){
        var suite = new Benchmark.Suite('Add');
        
        var array = [
            [0,1,2,3,4,5,6,7,8,9],
            [9,8,7,6,5,4,3,2,1,0],
            [0,1,2,3,4,5,6,7,8,9],
            [9,8,7,6,5,4,3,2,1,0],
            [0,1,2,3,4,5,6,7,8,9]
        ];
        
        var a1 = new Matrix(array);
        var b1 = math.matrix(array);
        
        suite.add('MorphJS', function(){
            Matrix.add(a1,a1);
        }).add('MathJS', function(){
            math.add(b1,b1);
        });
        
        return suite;
    },

    Clone: function(){
        var suite = new Benchmark.Suite('Clone');
        
        var array = [
            [0,1,2,3,4,5,6,7,8,9],
            [9,8,7,6,5,4,3,2,1,0],
            [0,1,2,3,4,5,6,7,8,9],
            [9,8,7,6,5,4,3,2,1,0],
            [0,1,2,3,4,5,6,7,8,9]
        ];
        
        var a1 = new Matrix(array);
        var b1 = math.matrix(array);
        
        suite.add('MorphJS', function(){
            Matrix.clone(a1);
        }).add('MathJS', function(){
            math.clone(b1);
        });
        
        return suite;
    }
    
};