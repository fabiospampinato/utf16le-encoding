
/* IMPORT */

const {Buffer} = require ( 'buffer' );
const fc = require ( 'fast-check' );
const {describe} = require ( 'fava' );
const U8 = require ( 'uint8-encoding' );
const {default: UTF16le} = require ( '../dist/node' );
const Fixtures = require ( './fixtures' );

/* HELPERS */

const evenize = uint8 => {
  return uint8.subarray ( 0, uint8.length - ( uint8.length % 2 ) );
};

/* MAIN */

describe ( 'UTF16le', it => {

  it ( 'returns an actual Uint8Array', t => {

    t.is ( UTF16le.decode ( 'foo' ).constructor, Uint8Array );

  });

  it ( 'works with Uint8Arrays', t => {

    const encoder = new TextEncoder ();

    for ( const fixture of Fixtures ) {

      const fixtureU8 = evenize ( encoder.encode ( fixture ) );

      const encoded = UTF16le.encode ( fixtureU8 );
      const decoded = UTF16le.decode ( encoded );

      t.deepEqual ( decoded, fixtureU8 );

    }

  });

  it ( 'works with fc-generated codepoints', t => {

    const assert = str => t.deepEqual ( UTF16le.decode ( UTF16le.encode ( evenize ( U8.encode ( str ) ) ) ), evenize ( U8.encode ( str ) ) );
    const property = fc.property ( fc.fullUnicode (), assert );

    fc.assert ( property, { numRuns: 1000000 } );

  });

  it ( 'works with fc-generated strings', t => {

    const assert = str => t.deepEqual ( UTF16le.decode ( UTF16le.encode ( evenize ( U8.encode ( str ) ) ) ), evenize ( U8.encode ( str ) ) );
    const property = fc.property ( fc.fullUnicodeString (), assert );

    fc.assert ( property, { numRuns: 1000000 } );

  });

  it ( 'works like Buffer', t => {

    const assert = str => t.is ( UTF16le.encode ( evenize ( U8.encode ( str ) ) ), Buffer.from ( evenize ( U8.encode ( str ) ) ).toString ( 'utf16le' ) );
    const property = fc.property ( fc.fullUnicodeString (), assert );

    fc.assert ( property, { numRuns: 1000000 } );

  });

});
