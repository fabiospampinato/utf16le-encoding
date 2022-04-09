
/* IMPORT */

import Buffer from 'node-buffer-encoding';

/* MAIN */

const Node = {

  /* API */

  encode: ( data: Uint8Array ): string => {

    return Buffer.encode ( data, 'utf16le' );

  },

  decode: ( data: string ): Uint8Array => {

    return Buffer.decode ( data, 'utf16le' );

  }

};

/* EXPORT */

export default Node;
