
/* IMPORT */

import fc from 'fast-check';
import {describe} from 'fava';
import {Buffer} from 'node:buffer';
import U8 from 'uint8-encoding';
import UTF16leBrowser from '../dist/browser.js';
import UTF16leNode from '../dist/node.js';
import Fixtures from './fixtures.js';

/* HELPERS */

const evenize = uint8 => {
  return uint8.subarray ( 0, uint8.length - ( uint8.length % 2 ) );
};

/* MAIN */

describe ( 'UTF16le', () => {

  for ( const [UTF16le, name] of [[UTF16leBrowser, 'browser'], [UTF16leNode, 'node']] ) {

    describe ( name, it => {

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

  }

});
