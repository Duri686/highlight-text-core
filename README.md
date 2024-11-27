---

# highlight-text-core [vue-custom-highlight]

A Vue component utilizing the **CSS Custom Highlight API** for efficient and flexible text highlighting.

---

## **What is `CSS Custom Highlight API`?**

The [CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API) allows developers to apply custom styles to specific ranges of text in the DOM without modifying the underlying structure. It is particularly useful for advanced text interactions such as search highlighting, annotations, or content editing.

---

## **Features**

- 🚀 **Custom Debounce**: Optimized for performance with a lightweight debounce function, no third-party dependencies.
- 🛠 **Rabin-Karp Algorithm**: Efficient text search with hash caching, improving performance in high-frequency scenarios.
- 📜 **Dynamic Rendering**: Intelligent rendering queue management with adjustable render time to optimize large-scale highlighting.
- 🎨 **Flexible Customization**: Easily configure highlight styles, matching patterns, and case sensitivity via component props.
- 🌍 **Extendable API**: Built-in interfaces like `HighlightTask` for custom workflows and extensibility.

---

## **Documentation**

For detailed usage instructions and examples, check out the [documentation](./packages/vue-custom-highlight/README.md).

---

## **Online Demo**

Explore live demos to see `vue-custom-highlight` in action:

- [CodeSandbox Demo](https://codesandbox.io/p/github/Duri686/highlight-text-core/main?embed=1&import=true)
- [GitHub Pages Demo](https://github.com/Duri686/highlight-text-core)

---

## **Package Overview**

This project is a monorepo managed with `pnpm`, containing the following packages:

- **`vue-custom-highlight`**: Source code for the main Vue component and utilities.
- **`playground`**: Demo and test cases for showcasing and debugging.

---

## **Installation**

Install the package via your favorite package manager:

```bash
npm install vue-custom-highlight
# or
yarn add vue-custom-highlight
# or
pnpm add vue-custom-highlight
```

---

## **Usage**

```vue
<script setup lang="ts">
import VueCustomHighlight from 'vue-custom-highlight';

const text = 'Highlight this text!';
const highlightStyle = 'background-color: yellow;';
</script>

<template>
  <VueCustomHighlight
    :text="text"
    :highlightStyle="highlightStyle"
    ignoreCase
  >
    <p>Highlight this text!</p>
  </VueCustomHighlight>
</template>
```

---

## **Development**

Start the development server:

```bash
pnpm start
```

Visit [http://localhost:9001/](http://localhost:9001/) to preview and test the component.

---

## **Build**

To build the project:

```bash
pnpm build
```

This generates production-ready output in the `dist/` folder.

---

## **Contributing**

We welcome contributions! Here's how you can get involved:

1. Fork this repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature description'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## **License**

This project is licensed under the [MIT License](./LICENSE).

---

With this updated README, users can easily understand the purpose, features, and usage of `vue-custom-highlight`, while also having clear guidance for development and contributions.
