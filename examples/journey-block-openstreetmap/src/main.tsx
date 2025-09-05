import r2wc from "@r2wc/react-to-web-component"

import { App } from './App.tsx'

const componentTag = 'address-map'

const CustomBlock = r2wc(App, {
  props: {
    value: 'string',
    errors: 'string',
    required: 'boolean',
    // the r2wc lib will parse the string value for us
    theme: 'json',
    args: 'json',
    setValue: 'function',
    subscribe: 'function'
  }
})

customElements.define(componentTag, CustomBlock);