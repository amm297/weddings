// Polyfill for TextEncoderStream which is missing in Bun
if (typeof globalThis.TextEncoderStream === "undefined") {
  class TextEncoderStream {
    #encoder = new TextEncoder();
    #transformer = new TransformStream({
      transform: (chunk, controller) => {
        const encoded = this.#encoder.encode(chunk);
        controller.enqueue(encoded);
      },
    });

    get readable() {
      return this.#transformer.readable;
    }

    get writable() {
      return this.#transformer.writable;
    }
  }

  globalThis.TextEncoderStream = TextEncoderStream as any;
}

// Polyfill for TextDecoderStream which is missing in Bun
if (typeof globalThis.TextDecoderStream === "undefined") {
  class TextDecoderStream {
    #decoder = new TextDecoder();
    #transformer = new TransformStream({
      transform: (chunk, controller) => {
        const decoded = this.#decoder.decode(chunk, { stream: true });
        if (decoded) controller.enqueue(decoded);
      },
      flush: (controller) => {
        const decoded = this.#decoder.decode();
        if (decoded) controller.enqueue(decoded);
      },
    });

    get readable() {
      return this.#transformer.readable;
    }

    get writable() {
      return this.#transformer.writable;
    }
  }

  globalThis.TextDecoderStream = TextDecoderStream as any;
}

export {};
