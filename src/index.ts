import * as style from './index.scss';
import './window';

const Litepicker = window.Litepicker;

const startDate = new Date();
const endDate = new Date();

const subtractDays = (date, num) => {
  const d = new Date(date);
  d.setDate(d.getDate() - num);

  return d;
};

const thisMonth = (date) => {
  const d1 = new Date(date);
  d1.setDate(1);
  const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return [d1, d2];
};

const lastMonth = (date) => {
  const d1 = new Date(date);
  d1.setDate(1);
  d1.setMonth(date.getMonth() - 1);
  const d2 = new Date(date.getFullYear(), date.getMonth(), 0);

  return [d1, d2];
};

const defaultRanges = {
  Today: [startDate, endDate],
  Yesterday: [subtractDays(startDate, 1), subtractDays(startDate, 1)],
  'Last 7 Days': [subtractDays(startDate, 7), endDate],
  'Last 30 Days': [subtractDays(startDate, 30), endDate],
  'This Month': thisMonth(startDate),
  'Last Month': lastMonth(startDate),
};

Litepicker.prototype.enableModuleRanges = (self) => {
  if (self.options.singleMode) {
    console.warn('Litepicker: module ranges are disabled since singleMode is enabled.');
    return;
  }

  const defaultOptions = {
    position: 'left',
    ranges: {},
  };

  const opts = { ...defaultOptions, ...self.options.moduleRanges };

  if (!Object.keys(opts.ranges).length) {
    opts.ranges = { ...defaultRanges };
  }

  const block = document.createElement('div');
  block.className = style.containerPredefinedRanges;

  Object.keys(opts.ranges).forEach((itemKey) => {
    const values = opts.ranges[itemKey];

    const item = document.createElement('div');
    item.innerText = itemKey;
    item.dataset.start = values[0].getTime();
    item.dataset.end = values[1].getTime();
    item.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;

      if (el) {
        self.setDateRange(Number(el.dataset.start), Number(el.dataset.end));
        self.gotoDate(Number(el.dataset.start));
      }
    });

    block.appendChild(item);
  });

  const containerMain = self.picker.querySelector(`.${style.containerMain}`);

  if (['bottom', 'right'].includes(opts.position)) {
    containerMain.appendChild(block);
  } else {
    containerMain.prepend(block);
  }

  if (['top', 'bottom'].includes(opts.position)) {
    block.classList.add(style.flexRow);
    containerMain.classList.add(style.flexColumn);
  } else {
    containerMain.classList.remove(style.flexColumn);
  }
};
