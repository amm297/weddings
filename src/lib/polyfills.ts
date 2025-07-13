// Polyfill for TextEncoderStream which is missing in Bun
if (typeof globalThis.TextEncoderStream === "undefined") {
  class TextEncoderStream extends TransformStream {
    constructor() {
      const textEncoder = new TextEncoder();
      super({
        transform(chunk, controller) {
          controller.enqueue(textEncoder.encode(chunk));
        },
      });
    }
  }

  globalThis.TextEncoderStream = TextEncoderStream as any;
}

export {};
