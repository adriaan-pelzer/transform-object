# transform-object-spec
## object transformation by specification

### USAGE

Install the module:

```
    npm install transform-object-spec
```

Require it:

```
    const txObj = require ( 'transform-object-spec' );
```

Specify the transformation in terms of the following three groups:

#### DROP

A list of attributes that has to be dropped

```
    const drop = [
        'dropThis',
        'dropThisToo'
    ];
```

#### ADD

An object of functions, keyed by attribute name, which, when applied to the entire object, returns the desired value for the attribute

```
    const add = {
        addThis: obj => 'a value to add',
        addThisToo: obj => `a dynamic value to add: ${obj.value}`
    };
```

#### MAP

An object of strings, keyed by attribute name, which will result in the attribute to be renamed to the specified string value

```
    const map = {
        wasThis: 'nowThis',
        wasThisToo: 'nowThisToo'
    };
```

#### TRANSFORM

```
    const txThis = txObj ( {
        drop: drop,
        add: add,
        map: map
    } );

    txThis ( {
        dropThis: 1,
        dropThisToo: 2,
        wasThis: 3,
        wasThisToo: 4,
        value: 5
    } );

    /** returns
    {
        value: 5,
        addThis: 'a value to add',
        addThisToo: 'a dynamic value to add: 5',
        nowThis: 3,
        nowThisToo: 4
    }
    **/
```
