<template>
  <div
    id="select"
    class="ap-select"
    :class="[
      size ? 'ap-select-' + size : 'ap-select-normal',
      menuVisible ? 'menuActive' : '',
      disabled ? 'disabled' : '',
      clearable && multSelectedList.length > 0 ? 'showClear' : '',
      multiple ? 'multiple' : ''
    ]"
    @click="toggleMenu"
  >
    <div class="mult-tag" v-if="multiple && multSelectedList.length > 0">
      <span
        v-for="(item, index) in multSelectedList"
        :key="index"
        class="selected-item"
        :class="[size ? 'selected-item-' + size : 'selected-item-normal']"
      >
        {{ item.label }}
        <img
          src="../assets/close.svg"
          alt=""
          class="delete-item"
          @click.stop="deleteMultItem(item, index)"
        />
      </span>
    </div>
    <div class="mult-tag" v-else-if="(multSelectedList.length = 0)">
      <span>请选择</span>
    </div>
    <input
      type="text"
      v-else
      :placeholder="placeholder || '请选择'"
      :readonly="!filterable"
      v-model="value"
    />
    <div class="down-arrow" :class="[menuVisible ? 'up' : '']"></div>
    <div class="clear-icon" v-if="clearable" @click.stop="clearItem"></div>
    <div
      class="dropdown-menu"
      :class="[menuVisible ? 'menuVisible' : '']"
      v-if="optionList && optionList.length > 0"
      @mouseleave="handleClose"
    >
      <ul>
        <li
          class="option-item"
          v-for="item in optionList"
          :key="item.value"
          :class="[
            item.disabled ? 'disabled' : '',
            value == item.label ? 'selected' : '',
            multSelectedList.includes(item) ? 'selected' : ''
          ]"
          :label="item.label"
          :value="item.value"
          @click.stop="chooseItem(item)"
        >
          {{ item.label || "Nope" }}
        </li>
      </ul>
    </div>
    <div
      class="dropdown-menu"
      :class="[menuVisible ? 'menuVisible' : '']"
      v-else
    >
      <ul>
        <li class="option-item option-none">Nope</li>
      </ul>
    </div>
    <!-- <slot></slot> -->
  </div>
</template>

<script>
import Select from "@/Piscoo/select";
import Vue from "vue";

export default {
  name: "Normal",
  components: {
    Select
  },
  data() {
    return {
      menuVisible: false,
      value: "",
      optionList: [],
      multSelectedList: []
    };
  },
  props: {
    size: String,
    placeholder: String,
    optionArr: Array,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    multiple: Boolean
  },
  created() {
    this.optionList = this.optionArr;
  },
  computed: {
    mutlItemSelected(label) {
      true, "selected";
      this.multSelectedList.includes(label) ? true : false;
    }
  },
  watch: {
    value() {
      const reg = new RegExp(this.value);
      this.optionList = this.optionArr.filter(item => reg.test(item.label));
    }
  },
  methods: {
    toggleMenu(e) {
      if (this.disabled && this.disabled != "false") return;
      this.optionList = this.optionArr;
      this.menuVisible = !this.menuVisible;
    },
    handleClose() {
      this.menuVisible = false;
    },
    chooseItem(e) {
      if (e.disabled) return;
      if (this.multiple) {
        if (this.multSelectedList.includes(e)) return;
        this.multSelectedList.push(e);
      } else {
        this.value = e.label;
        this.menuVisible = false;
      }
    },
    clearItem() {
      this.multSelectedList = [];
      if (this.value) {
        this.value = "";
        return;
      }
    },
    deleteMultItem(item, index) {
      this.multSelectedList.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
::-webkit-input-placeholder {
  color: #ccc;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: #ccc;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: #ccc;
}
:-ms-input-placeholder {
  color: #ccc;
}
.ap-select {
  width: 250px;
  font-size: 16px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  &:hover {
    border: 1px solid #ccc;
  }
  &.menuActive {
    border: 1px solid pink;
    &:hover {
      border: 1px solid pink;
    }
  }
  &.disabled {
    cursor: not-allowed;
    input {
      cursor: not-allowed;
    }
    &:hover {
      border: 1px solid #dcdfe6;
    }
  }
  &.showClear {
    &:hover {
      .down-arrow {
        opacity: 0;
      }
      .clear-icon {
        opacity: 1;
      }
    }
  }
  &.multiple {
    padding: 4px 0;
  }
  input {
    width: 100%;
    height: 100%;
    padding: 0 20px 0 8px;
    border-radius: 3px;
    color: #333;
    border: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  .down-arrow {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%) rotate(0);
    background: url("../assets/down.svg") center no-repeat;
    background-size: contain;
    transition: all 0.2s linear;
    &.up {
      transform: translateY(-50%) rotate(-180deg);
    }
  }
  .clear-icon {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    background: url("../assets/clear.svg") center no-repeat;
    background-size: contain;
    opacity: 0;
    transition: all 0.2s linear;
  }
  .dropdown-menu {
    width: 100%;
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 5px 0;
    z-index: 1001;
    transform: scale(0);
    transform-origin: center top;
    transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    &.menuVisible {
      transform: scale(1);
    }
    ul {
      max-height: 240px;
      overflow-y: scroll;
      &::before {
        content: " ";
        border-width: 1px;
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        background: #fff;
        border-color: transparent;
        box-sizing: border-box;
        border-style: solid;
        top: -5px;
        left: 30%;
        border-top-color: #e4e7ed;
        border-left-color: #e4e7ed;
        transform: rotate(45deg);
      }
    }
    .option-item {
      font-size: 16px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: #f5f7fa;
      }
      &.disabled {
        color: #c0c4cc;
        cursor: not-allowed;
        &:hover {
          background: #fff;
        }
      }
      &.selected {
        color: pink;
      }
    }
    .option-none {
      text-align: center;
      color: #aaa;
      cursor: not-allowed;
    }
  }
  .mult-tag {
    width: 100%;
    height: 100%;
    padding: 0 20px 0 8px;
    border-radius: 3px;
    color: #333;
    border: none;
    cursor: pointer;
    font-size: 14px;
    .selected-item {
      display: inline-block;
      height: 100%;
      padding: 0 25px 0 5px;
      margin: 3px 0 2px 6px;
      background-color: #f4f4f5;
      border: 1px solid #e9e9eb;
      color: #909399;
      box-sizing: border-box;
      position: relative;
      &.selected-item-normal {
        height: 32px;
        line-height: 30px;
      }
      &.selected-item-small {
        font-size: 12px;
        height: 22px;
        line-height: 20px;
      }
      .delete-item {
        width: 15px;
        height: 15px;
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        vertical-align: middle;
      }
    }
  }
}
.ap-select-small {
  height: max-content;
  min-height: 30px;
  input {
    height: 100%;
    min-height: 30px;
  }
}
.ap-select-normal {
  height: max-content;
  min-height: 40px;
  input {
    height: 100%;
    min-height: 40px;
  }
}
</style>
