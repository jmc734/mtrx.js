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

Matrix.prototype.validate = function(){
    for(var i = 0; i < this._rows; i++){
        if(!Array.isArray(this._data[i]) || this._data[i].length !== this._cols){
            return false;   
        }
        for(var j = 0; j < this._cols; j++){
            if(!this._isNumeric(this._data[i][j])){
                return false;   
            }
        }
    }
    return true;
};

Matrix.prototype._isNumeric = function(x) {
    return !isNaN(x) && isFinite(x);
};

Matrix.prototype.get = function(r,c){
    return this._data[r][c];
};

Matrix.prototype.set = function(r,c,v){
    this._data[r][c] = v;
    return this;
};

Matrix.prototype.clone = function(){
    var c = new Array(this._rows);
    for(var i = 0; i < this._rows; i++){
        c[i] = this._data[i].slice();   
    }
    return new Matrix(c);
};

Matrix.prototype.canMultiply = function(b){
    return b._rows === this._cols;
};

Matrix.prototype.multiplyScalar = function(x){
    var c = this.clone();
    for(var i = 0; i < this._rows; i++){
        for(var j = 0; j < this._rows; j++){
            c._data[i][j] *= x;   
        }
    }
    return c;
};

Matrix.prototype.multiply = function(b){
    var c = new Array(this._rows);
    for(var i = 0; i < this._rows; i++){
        var row = new Array(b._cols);
        for(var j = 0; j < b._cols; j++){
            var sum = 0;
            for(var k = 0; k < this._cols; k++){
                sum += this._data[i][k]*b._data[k][j];
            }
            row[j] = sum;
        }
        c[i] = row;
    }
    return new Matrix(c);
};

Matrix.prototype.canAdd = function(b) {
    return b._rows === this._rows && b._cols === this._cols;
};

Matrix.prototype.add = function(b){
    var c = this.clone();
    for(var i = 0; i < this._rows; i++){
        for(var j = 0; j < this._cols; j++){
            c._data[i][j] += b._data[i][j];
        }
    }
    return c;
};

Matrix.prototype.transpose = function(){
    var c = new Array(this._cols);
    for(var j = 0; j < this._cols; j++){
        c[j] = new Array(this._rows);
        for(var i = 0; i < this._rows; i++){
            c[j][i] = this._data[i][j];
        }
    }
    return new Matrix(c);
};

Matrix.prototype.isSquare = function(){
    return this._rows === this._cols;  
};

Matrix.prototype._check = function(check){
    for(var i = 0; i < this._rows; i++){
        for(var j = 0; j < this._cols; j++){
            if(!check.call(this, i, j)){   
                return false;
            }
        }
    }
    return true;
};

Matrix.prototype.isIdentity = function(){
    return this.isSquare() && this._check(function(i,j){
        if(i !== j){
            return this._data[i][j] === 0;
        } else {
            return this._data[i][j] === 1;                                  
        }
    });
};

Matrix.prototype.isDiagonal = function(){
    return this.isSquare() && this._check(function(i,j){
        if(i !== j){
            return this._data[i][j] === 0;
        } else {
            return this._data[i][j] !== 0;                                  
        }
    });
};

Matrix.prototype.isTriangularLower = function(){
    return this.isSquare() && this._check(function(i,j){
        if(i < j){
            return this._data[i][j] === 0;
        } else {
            return this._data[i][j] !== 0;                                  
        }
    });
};

Matrix.prototype.isTriangularUpper = function(){
    return this.isSquare() && this._check(function(i,j){
        if(i > j){
            return this._data[i][j] === 0;
        } else {
            return this._data[i][j] !== 0;                                  
        }
    });
};

Matrix.prototype.isSymmetric = function() {
    return this.isSquare() && this.isEqual(this.transpose());   
}

Matrix.prototype.isEmpty = function(){
    return this._rows === 0 && this._cols === 0;  
};

Matrix.prototype.isEqual = function(b){
    if(this === b){
        return true;
    }
    if(b._rows !== this._rows || b._cols !== this._cols){
        return false;   
    }
    for(var i = 0; i < this._rows; i++){
        for(var j = 0; j < this._cols; j++){
            if(b._data[i][j] != this._data[i][j]){
                return false;   
            }
        }
    }
    return true;
};

a = new Matrix([[1,2,3],[3,4,7],[5,6,9]]);
b = new Matrix([[1],[2],[3]]);
c = new Matrix([[1,2,3],[3,2,1]]);
d = new Matrix([[4,5,6],[6,5,4]]);
e = new Matrix([[1,0,0],[0,2,0],[0,0,1]]);
f = new Matrix([]);
console.log(e.isSymmetric());