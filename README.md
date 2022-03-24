# UTF16le

UTF16-le encoding, a.k.a. UCS2 encoding, an encoding you probably should never use.

## Install

```sh
npm install --save utf16le-encoding
```

## Usage

```ts
import UTF16le from 'utf16le-encoding';

// Uint8Array encoding & decoding

{
  const raw = 'Hello 😃';
  const uint8 = new TextEncoder ().encode ( raw );
  console.log ( uint8 ); // => Uint8Array(10) [ 72, 101, 108, 108, 111,  32, 240, 159, 152, 131 ]

  const encoded = UTF16le.encode ( uint8 );
  console.log ( encoded ); // => '效汬⁯鿰莘'

  const decoded = UTF16le.decode ( encoded );
  console.log ( decoded ); // => // => Uint8Array(10) [ 72, 101, 108, 108, 111,  32, 240, 159, 152, 131 ]
}
```

## License

MIT © Fabio Spampinato
