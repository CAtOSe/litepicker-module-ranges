Litepicker module ranges
=========

![](/image.png?raw=true "Litepicker module ranges")

## Installation

**Installing a Litepicker module**

`npm i litepicker-module-ranges`

**Non-module environments**

`<script src="https://cdn.jsdelivr.net/npm/litepicker-module-ranges/dist/index.js"></script>`

## Usage

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker.

```
// first include the Litepicker
import Litepicker from 'litepicker';
// then include this library
import 'litepicker-module-ranges';
```

Now you can create Litepicker instance with this module.
```
<script>
var picker = new Litepicker({ 
  element: document.getElementById('litepicker'),
  moduleRanges: true,
  numberOfMonths: 2,
  numberOfColumns: 2,
  singleMode: false,
});
</script>
```

Specifying custom date ranges:
```
<script>
var picker = new Litepicker({ 
  element: document.getElementById('litepicker'),
  numberOfMonths: 2,
  numberOfColumns: 2,
  singleMode: false,
  moduleRanges: {
    ranges: {
      'New range': [new Date('2020-11-19'), new Date()] // first start date then end date.
    }
  },
});
</script>
```