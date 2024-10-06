# Svelte Flex Slider

A flexible and responsive slider component for Svelte applications.

![Svelte Flex Slider Demo](./svelte-flex-slider.webp)

## Features

- Responsive design with customizable breakpoints
- Autoplay functionality with adjustable interval
- Loop option for continuous sliding
- Touch-friendly navigation
- Customizable number of visible cards
- Easy to integrate and style

## Installation

Install Svelte Flex Slider with npm:

```bash
npm install svelte-flex-slider
```

## Usage

Import and use the SvelteFlexSlider component in your Svelte file:

```svelte
<script>
import SvelteFlexSlider from 'svelte-flex-slider';

const cards = [
  '<div>Slide 1</div>',
  '<div>Slide 2</div>',
  '<div>Slide 3</div>'
];
</script>

<SvelteFlexSlider
  {cards}
  autoplay={true}
  interval={3000}
  loop={true}
  visibleCards={{ default: 1, 768: 2, 1024: 3 }}
/>
```

## Documentation

For full documentation and interactive examples, visit our [documentation site](https://svelte-flex-slider.nakxa.site/).

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| cards | array | [] | Array of card contents to be displayed in the slider. |
| autoplay | boolean | true | Whether the slider should autoplay. |
| interval | number | 3000 | Interval between slides in milliseconds when autoplay is enabled. |
| loop | boolean | true | Whether the slider should loop back to the beginning after reaching the end. |
| visibleCards | object | { default: 1 } | Number of visible cards at different breakpoints. |

## Examples

### Image Slider

```svelte
<SvelteFlexSlider
  cards={[
    '<div><img src="img1.jpg" alt="Slide 1"></div>',
    '<div><img src="img2.jpg" alt="Slide 2"></div>',
    '<div><img src="img3.jpg" alt="Slide 3"></div>'
  ]}
  autoplay={true}
  interval={3000}
  loop={true}
  visibleCards={{ default: 1 }}
/>
```

### Product Showcase

```svelte
<SvelteFlexSlider
  cards={[
    '<div class="product"><img src="product1.jpg" alt="Product 1"><h3>Product 1</h3><p>$19.99</p></div>',
    '<div class="product"><img src="product2.jpg" alt="Product 2"><h3>Product 2</h3><p>$24.99</p></div>',
    '<div class="product"><img src="product3.jpg" alt="Product 3"><h3>Product 3</h3><p>$29.99</p></div>'
  ]}
  autoplay={false}
  interval={3000}
  loop={true}
  visibleCards={{ default: 1, 520: 2, 800: 3 }}
/>
```

For more examples and interactive demos, visit our [documentation site](https://svelte-flex-slider.nakxa.site/).

## Styling

Svelte Flex Slider comes with minimal default styling. You can easily customize the appearance by adding your own CSS classes or inline styles to the card contents.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

If you encounter any problems or have any questions, please open an issue on the [GitHub repository](https://github.com/Nakxa/svelte-flex-slider-example).

## Acknowledgements

- Thanks to the Svelte community for their amazing tools and support.
- Icons provided by [Lucide](https://lucide.dev/).

---

Made with ❤️ by [Naresh Choudhary (nakxa)](https://github.com/Nakxa)
