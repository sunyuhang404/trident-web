declare module '*.vue' {
  import { ComponentOptions } from 'vue';

  const component: ComponentOptions;
  export default component;
}

declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
