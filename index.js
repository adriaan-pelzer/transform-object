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
