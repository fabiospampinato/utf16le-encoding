
/* MAIN */

const Browser = {

  /* API */

  encode: ( data: Uint8Array ): string => {

    let string = '';

    for ( let i = 0, l = data.length - 1; i < l; i += 2 ) { // Skipping a potential trailing odd byte

      const charCode = data[i] + ( data[i + 1] * 256 );
      const char = String.fromCharCode ( charCode );

      string += char;

    }

    return string;

  },

  decode: ( data: string ): Uint8Array => {

    const uint8 = new Uint8Array ( data.length * 2 );

    for ( let i = 0, l = data.length; i < l; i++ ) {

      const charCode = data.charCodeAt ( i );
      const hi = ( charCode >> 8 );
      const lo = ( charCode % 256 );

      uint8[i * 2] = lo;
      uint8[(i * 2) + 1] = hi;

    }

    return uint8;

  }

};


/* EXPORT */

export default Browser;
