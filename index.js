const R = require ( 'ramda' );

module.exports = R.curry ( ( spec, obj ) => R.merge (
    R.merge (
        R.omit ( R.concat ( spec.drop, R.keys ( spec.map ) ), obj ),
        R.fromPairs ( R.map ( pair => [
            pair[1],
            obj[pair[0]]
        ], R.toPairs ( spec.map ) ) )
    ),
    R.fromPairs ( R.map ( pair => [
        pair[0],
        pair[1] ( obj )
    ], R.toPairs ( spec.add ) ) )
) );

if ( ! module.parent ) {
    const deepEquals = require ( 'deep-equals' );
    const assert = require ( 'assert' );

    const drop = [
        'dropThis',
        'dropThisToo'
    ];

    const add = {
        addThis: obj => 'a value to add',
        addThisToo: obj => `a dynamic value to add: ${obj.value}`
    };

    const map = {
        wasThis: 'nowThis',
        wasThisToo: 'nowThisToo'
    };

    const result = module.exports ( {
        drop: drop,
        add: add,
        map: map
    }, {
        dropThis: 1,
        dropThisToo: 2,
        wasThis: 3,
        wasThisToo: 4,
        value: 5
    } );

    const expected = {
        value: 5,
        addThis: 'a value to add',
        addThisToo: 'a dynamic value to add: 5',
        nowThis: 3,
        nowThisToo: 4
    };

    try {
        assert ( deepEquals ( result, expected ) );
    } catch ( error ) {
        console.error ( 'ERROR:' );
        console.error ( 'OUTPUT:' );
        console.error ( result );
        console.error ( 'EXPECTED:' );
        console.error ( expected );
    }
}
