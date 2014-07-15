define('mtrx', function(){

    function mtrx(data){
        this._data = data;
        this._rows = 0;
        this._cols = 0;
        if(Array.isArray(data) && data.length !== 0){
            if(Array.isArray(data[0])){
                this._rows = data.length;
            } else {
                this._rows = 1;
                this._data = [data];
            }
            this._cols = this._data[0].length;
        } else {
            this._data = [];   
        }
    }

    mtrx.ismtrx = function(a){
        return a instanceof mtrx;  
    };

    mtrx._isNumeric = function(x) {
        return !isNaN(x) && isFinite(x);
    };

    mtrx.prototype = {

        get: function(r,c){
            return this._data[r][c];
        },

        set: function(r,c,v){
            this._data[r][c] = v;
            return this;
        },
        
        validate: function(){
            return mtrx.validate(this);
        },
        
        clone: function(){
            return mtrx.clone(this);
        },
        
        multiplyScalar: function(x){
            return mtrx.multiplyScalar(this,x);
        },
        
        canMultiply: function(b){
            return mtrx.canMultiply(this,b);
        },
        
        multiply: function(b){
            return mtrx.multiply(this,b);
        },
        
        canAdd: function(b){
            return mtrx.canAdd(this,b);
        },
        
        add: function(b){
            return mtrx.add(this,b);
        },
        
        transpose: function(){
            return mtrx.transpose(this);
        },
        
        isSquare: function(){
            return mtrx.isSquare(this);
        },
        
        check: function(checkFunc){
            return mtrx.check(this,checkFunc);
        }, 
        
        isIdentity: function(){
            return mtrx.isIdentity(this);
        },
        
        isDiagonal: function(){
            return mtrx.isDiagonal(this);
        },
        
        isTriangularLower: function(){
            return mtrx.isTriangularLower(this);
        },
        
        isTriangularUpper: function(){
            return mtrx.isTriangularUpper(this);
        },
        
        isSymmetric: function(){
            return mtrx.isSymmetric(this);
        },
        
        isEmpty: function(){
            return mtrx.isEmpty(this);
        },
        
        isEqual: function(b){
            return mtrx.isEqual(this,b);
        }
        
    };

    mtrx.validate = function(a){
        for(var i = 0; i < a._rows; i++){
            if(!Array.isArray(a._data[i]) || a._data[i].length !== a._cols){
                return false;   
            }
            for(var j = 0; j < a._cols; j++){
                if(!mtrx._isNumeric(a._data[i][j])){
                    return false;   
                }
            }
        }
        return true;
    };

    mtrx.clone = function(a){
        var c = new Array(a._rows);
        for(var i = 0; i < a._rows; i++){
            c[i] = a._data[i].slice();   
        }
        return new mtrx(c);
    };

    mtrx.multiplyScalar = function(a,x){
        var c = mtrx.clone(a);
        for(var i = 0; i < a._rows; i++){
            for(var j = 0; j < a._rows; j++){
                c._data[i][j] *= x;   
            }
        }
        return c;
    };

    mtrx.canMultiply = function(a,b){
        return a._rows === b._cols;
    };

    mtrx.multiply = function(a,b){
        var c = new Array(a._rows);
        for(var i = 0; i < a._rows; i++){
            var row = new Array(b._cols);
            for(var j = 0; j < b._cols; j++){
                var sum = 0;
                for(var k = 0; k < a._cols; k++){
                    sum += a._data[i][k]*b._data[k][j];
                }
                row[j] = sum;
            }
            c[i] = row;
        }
        return new mtrx(c);
    };

    mtrx.canAdd = function(a,b) {
        return a._rows === b._rows && a._cols === b._cols;
    };

    mtrx.add = function(a,b){
        var c = mtrx.clone(a);
        for(var i = 0; i < a._rows; i++){
            for(var j = 0; j < a._cols; j++){
                c._data[i][j] += b._data[i][j];
            }
        }
        return c;
    };

    mtrx.transpose = function(a){
        var c = new Array(a._cols);
        for(var j = 0; j < a._cols; j++){
            c[j] = new Array(a._rows);
            for(var i = 0; i < a._rows; i++){
                c[j][i] = a._data[i][j];
            }
        }
        return new mtrx(c);
    };

    mtrx.isSquare = function(a){
        return a._rows === a._cols;  
    };

    mtrx.check = function(a,checkFunc){
        for(var i = 0; i < a._rows; i++){
            for(var j = 0; j < a._cols; j++){
                if(!checkFunc.call(a, i, j)){   
                    return false;
                }
            }
        }
        return true;
    };

    mtrx.isIdentity = function(a){
        return mtrx.isSquare(a) && mtrx.check(a,function(i,j){
            if(i !== j){
                return this._data[i][j] === 0;
            } else {
                return this._data[i][j] === 1;                                  
            }
        });
    };

    mtrx.isDiagonal = function(a){
        return mtrx.isSquare(a) && mtrx.check(a,function(i,j){
            if(i !== j){
                return this._data[i][j] === 0;
            } else {
                return this._data[i][j] !== 0;                                  
            }
        });
    };

    mtrx.isTriangularLower = function(a){
        return mtrx.isSquare(a) && mtrx.check(a,function(i,j){
            if(i < j){
                return this._data[i][j] === 0;
            } else {
                return this._data[i][j] !== 0;                                  
            }
        });
    };

    mtrx.isTriangularUpper = function(a){
        return mtrx.isSquare(a) && mtrx.check(a,function(i,j){
            if(i > j){
                return this._data[i][j] === 0;
            } else {
                return this._data[i][j] !== 0;                                  
            }
        });
    };

    mtrx.isSymmetric = function(a) {
        return mtrx.isSquare(a) && mtrx.isEqual(a,mtrx.transpose(a));   
    }

    mtrx.isEmpty = function(a){
        return a._rows === 0 && a._cols === 0;  
    };

    mtrx.isEqual = function(a,b){
        if(a === b){
            return true;
        }
        if(a._rows !== b._rows || a._cols !== b._cols){
            return false;   
        }
        for(var i = 0; i < a._rows; i++){
            for(var j = 0; j < a._cols; j++){
                if(a._data[i][j] != b._data[i][j]){
                    return false;   
                }
            }
        }
        return true;
    };
    
    return mtrx;
});
