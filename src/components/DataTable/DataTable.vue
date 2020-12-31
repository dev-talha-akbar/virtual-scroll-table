<template>
  <div class="datatable">
    <div class="header">
      <div class="row" :style="`grid-template-columns: ${gridTemplate};`">
        <div class="col" v-for="col in cols" :key="col.label">
          <div>{{ col.label }}</div>
        </div>
      </div>
    </div>
    <recycle-scroller
      class="scroller"
      :items="rows"
      :item-size="30"
      key-field="email"
      v-slot="{ item: row }"
      page-mode
    >
      <div class="row" :style="`grid-template-columns: ${gridTemplate};`">
        <div class="col" v-for="col in cols" :key="col.label">
          <div>{{ row[col.key] }}</div>
        </div>
      </div>
    </recycle-scroller>
    <div class="summary">
      <div class="row" :style="`grid-template-columns: ${gridTemplate};`">
        <div class="col" v-for="col in cols" :key="col.label">
          <div>{{ summary[col.key] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import { calculateMinWidths, generateGridTemplate } from "./utils";

export default {
  components: {
    "recycle-scroller": RecycleScroller
  },
  props: {
    cols: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    summary: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      gridTemplate: `repeat(${this.cols.length}, 1fr)`
    };
  },
  watch: {
    rows() {
      this.calculateGridTemplate();
    },
    cols() {
      this.calculateGridTemplate();
    }
  },
  created() {
    this.calculateGridTemplate();
  },
  methods: {
    calculateGridTemplate() {
      const minWidths = calculateMinWidths(this.cols, this.rows, this.summary);
      const maxWidths = this.cols.map(col => col.maxWidth);

      this.gridTemplate = generateGridTemplate(minWidths, maxWidths);
    }
  }
};
</script>
<style lang="scss">
.vue-recycle-scroller__item-wrapper {
  overflow: initial !important;
}
.datatable {
  position: relative;
}
.header,
.summary {
  position: sticky;
  z-index: 1;
  right: 0;
  left: 0;
  background: #fff;
}
.header {
  top: 0;
}
.header .col,
.summary .col {
  font-weight: bold;
}
.summary {
  bottom: 0;
}
.summary .row {
  border-bottom: 0;
  border-top: 1px solid #ddd;
}
.row {
  height: 30px;
  display: grid;
  min-height: 0;
  border-bottom: 1px solid #ddd;
}

.col {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  min-width: 0;
  padding: 5px 2ch;
}
</style>
