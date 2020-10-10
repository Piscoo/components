<template>
  <!-- <Select @click.native="log">hello, this is another story for the same component</Select> -->
  <div>
    <div class="temp">
      <p>Base Size</p>
      <NormalSelect placeholder="请选择" :optionArr="testArr"></NormalSelect>
    </div>

    <div class="temp">
      <p>Small Size</p>
      <NormalSelect
        placeholder="请选择"
        size="small"
        :optionArr="testArr"
      ></NormalSelect>
    </div>

    <div class="temp">
      <p>Option Disabled</p>
      <NormalSelect placeholder="请选择" :optionArr="testArr2"></NormalSelect>
    </div>

    <div class="temp">
      <p>Select Disabled</p>
      <NormalSelect
        placeholder="请选择"
        size="small"
        :optionArr="testArr2"
        disabled
      ></NormalSelect>
    </div>

    <div class="temp">
      <p>Clearable</p>
      <NormalSelect
        placeholder="请选择"
        size="small"
        :optionArr="testArr2"
        clearable
      ></NormalSelect>
    </div>

    <div class="temp">
      <p>Filterable</p>
      <NormalSelect
        placeholder="请选择"
        size="small"
        :optionArr="testArr3"
        clearable
        filterable
      ></NormalSelect>
    </div>

    <div class="temp">
      <p>Multiple Select</p>
      <NormalSelect
        placeholder="请选择"
        :optionArr="testArr3"
        multiple
      ></NormalSelect>
    </div>
  </div>
</template>

<script>
// import Select from "@/Piscoo/select";
import NormalSelect from "./Normal.story.vue";

export default {
  name: "Another",
  components: {
    NormalSelect
  },
  data() {
    return {
      value: "",
      testArr: [
        {
          value: "1",
          label: "111"
        },
        {
          value: "2",
          label: "222"
        }
      ],
      testArr2: [
        {
          value: "3",
          label: "333"
        },
        {
          value: "4",
          label: "444"
        },
        {
          value: "5",
          label: "555",
          disabled: true
        },
        {
          value: "41",
          label: "4414"
        },
        {
          value: "42",
          label: "4424"
        },
        {
          value: "43",
          label: "4434"
        },
        {
          value: "44",
          label: "4444"
        },
        {
          value: "45",
          label: "4544"
        },
        {
          value: "46",
          label: "4464"
        },
        {
          value: "47",
          label: "4474"
        },
        {
          value: "48",
          label: "4844"
        },
        {
          value: "49",
          label: "4494"
        },
        {
          value: "40",
          label: "4404"
        }
      ],
      testArr3: [
        {
          value: "milk",
          label: "牛奶"
        },
        {
          value: "water",
          label: "纯净水"
        },
        {
          value: "rice",
          label: "米饭"
        },
        {
          value: "noddle",
          label: "面条"
        },
        {
          value: "beef",
          label: "牛肉"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.temp {
  margin: 40px;
  p {
    margin: 10px 0;
  }
}
</style>
