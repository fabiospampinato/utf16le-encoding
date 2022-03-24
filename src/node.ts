
/* MAIN */

const Node = {

  /* API */

  encode: ( data: Uint8Array ): string => {

    return Buffer.from ( data ).toString ( 'utf16le' );

  },

  decode: ( data: string ): Uint8Array => {

    const buffer = Buffer.from ( data, 'utf16le' );

    return new Uint8Array ( buffer.buffer, buffer.byteOffset, buffer.byteLength );

  }

};

/* EXPORT */

export default Node;
