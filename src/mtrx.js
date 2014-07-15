console.clear();

function Matrix(data){
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

Matrix.isMatrix = function(a){
    return a instanceof Matrix;  
};

Matrix._isNumeric = function(x) {
    return !isNaN(x) && isFinite(x);
};

Matrix.prototype = {

    get: function(r,c){
        return this._data[r][c];
    },

    set: function(r,c,v){
        this._data[r][c] = v;
        return this;
    },
    
    validate: function(){
        return Matrix.validate(this);
    },
    
    clone: function(){
        return Matrix.clone(this);
    },
    
    multiplyScalar: function(x){
        return Matrix.multiplyScalar(this,x);
    },
    
    canMultiply: function(b){
        return Matrix.canMultiply(this,b);
    },
    
    multiply: function(b){
        return Matrix.multiply(this,b);
    },
    
    canAdd: function(b){
        return Matrix.canAdd(this,b);
    },
    
    add: function(b){
        return Matrix.add(this,b);
    },
    
    transpose: function(){
        return Matrix.transpose(this);
    },
    
    isSquare: function(){
        return Matrix.isSquare(this);
    },
    
    check: function(checkFunc){
        return Matrix.check(this,checkFunc);
    }, 
    
    isIdentity: function(){
        return Matrix.isIdentity(this);
    },
    
    isDiagonal: function(){
        return Matrix.isDiagonal(this);
    },
    
    isTriangularLower: function(){
        return Matrix.isTriangularLower(this);
    },
    
    isTriangularUpper: function(){
        return Matrix.isTriangularUpper(this);
    },
    
    isSymmetric: function(){
        return Matrix.isSymmetric(this);
    },
    
    isEmpty: function(){
        return Matrix.isEmpty(this);
    },
    
    isEqual: function(b){
        return Matrix.isEqual(this,b);
    }
    
};

Matrix.validate = function(a){
    for(var i = 0; i < a._rows; i++){
        if(!Array.isArray(a._data[i]) || a._data[i].length !== a._cols){
            return false;   
        }
        for(var j = 0; j < a._cols; j++){
            if(!Matrix._isNumeric(a._data[i][j])){
                return false;   
            }
        }
    }
    return true;
};

Matrix.clone = function(a){
    var c = new Array(a._rows);
    for(var i = 0; i < a._rows; i++){
        c[i] = a._data[i].slice();   
    }
    return new Matrix(c);
};

Matrix.multiplyScalar = function(a,x){
    var c = Matrix.clone(a);
    for(var i = 0; i < a._rows; i++){
        for(var j = 0; j < a._rows; j++){
            c._data[i][j] *= x;   
        }
    }
    return c;
};

Matrix.canMultiply = function(a,b){
    return a._rows === b._cols;
};

Matrix.multiply = function(a,b){
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
    return new Matrix(c);
};

Matrix.canAdd = function(a,b) {
    return a._rows === b._rows && a._cols === b._cols;
};

Matrix.add = function(a,b){
    var c = Matrix.clone(a);
    for(var i = 0; i < a._rows; i++){
        for(var j = 0; j < a._cols; j++){
            c._data[i][j] += b._data[i][j];
        }
    }
    return c;
};

Matrix.transpose = function(a){
    var c = new Array(a._cols);
    for(var j = 0; j < a._cols; j++){
        c[j] = new Array(a._rows);
        for(var i = 0; i < a._rows; i++){
            c[j][i] = a._data[i][j];
        }
    }
    return new Matrix(c);
};

Matrix.isSquare = function(a){
    return a._rows === a._cols;  
};

Matrix.check = function(a,checkFunc){
    for(var i = 0; i < a._rows; i++){
        for(var j = 0; j < a._cols; j++){
            if(!checkFunc.call(a, i, j)){   
                return false;
            }
        }
    }
    return true;
};

Matrix.isIdentity = function(a){
    return Matrix.isSquare(a) && Matrix.check(a,function(i,j){
        if(i !== j){
            return this._data[i][j] === 0;
        } else {
            return this._data[i][j] === 1;                                  
        }
    });
};

Matrix.isDiagonal = function(a){
    return Matrix.isSquare(a) && Matrix.check(a,function(i,j){
        if(i !== j){
            return this._data[i][j] === 0;
        } else {
            return this._data[i][j] !== 0;                                  
        }
    });
};

Matrix.isTriangularLower = function(a){
    return Matrix.isSquare(a) && Matrix.check(a,function(i,j){
        if(i < j){
            return this._data[i][j] === 0;
        } else {
            return this._data[i][j] !== 0;                                  
        }
    });
};

Matrix.isTriangularUpper = function(a){
    return Matrix.isSquare(a) && Matrix.check(a,function(i,j){
        if(i > j){
            return this._data[i][j] === 0;
        } else {
            return this._data[i][j] !== 0;                                  
        }
    });
};

Matrix.isSymmetric = function(a) {
    return Matrix.isSquare(a) && Matrix.isEqual(a,Matrix.transpose(a));   
}

Matrix.isEmpty = function(a){
    return a._rows === 0 && a._cols === 0;  
};

Matrix.isEqual = function(a,b){
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