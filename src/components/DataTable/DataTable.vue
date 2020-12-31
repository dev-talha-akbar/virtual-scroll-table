<template>
  <div class="datatable">
    <recycle-scroller
      class="scroller"
      :items="computedRows"
      :item-size="32"
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
    }
  },
  data() {
    return {
      gridTemplate: `repeat(${this.cols.length}, 1fr)`
    };
  },
  watch: {
    rows: () => {
      this.calculateGridTemplate();
    }
  },
  created() {
    this.calculateGridTemplate();
  },
  computed: {
    computedRows() {
      const headerRow = this.cols.reduce((headerRow, col) => {
        headerRow[col.key] = col.label;
        return headerRow;
      }, {});
      return [headerRow, ...this.rows];
    }
  },
  methods: {
    calculateGridTemplate() {
      this.gridTemplate = generateGridTemplate(
        calculateMinWidths(this.cols, this.computedRows)
      );
    }
  }
};
</script>
<style lang="scss">
.vue-recycle-scroller__item-wrapper {
  overflow: initial !important;
}
.row {
  height: 32px;
  display: grid;
  min-height: 0;
}
.col {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 5px;
}
</style>
