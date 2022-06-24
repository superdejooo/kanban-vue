<template>
  <div>
    <div id="wrapper">
      <Column v-for="column in columns.data" :column="column" @columnDestroy="updateColumns()"  @destroyCard="updateColumns()" @createdCard="updateColumns()"/>
      <Modal @closedModal="closedModal"/>
      <button class="btn"  @click="openModal()"> Add column + </button>
    </div>
  </div>
</template>

<script>
import { getColumns } from '../services/columnService.js';
import Column from './components/Column.vue'
import Modal from './components/Modal.vue'

export default {
    name: "app",
    components: {
      Column,
      Modal
    },
    data() {
      return {
          columns: [],
      };
    },
    created() {
      getColumns().then(res => {
          this.columns = res;
      });
    },
    methods: {
      openModal(id) {
        this.$modal.show('column-add')
      },
      closedModal(){
        getColumns().then(res => {
          this.columns = res;
          this.$forceUpdate();
        });
      },
      updateColumns(){
        getColumns().then(res => {
          this.columns = res;
          this.$forceUpdate();
        });
      }
    }
}
</script>

<style lang="scss">

body {
  background-color: #ffffff;
  margin: 0;
  padding: 0;
}

#wrapper {
  display: flex;
  width: 100%;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;

  &:before {
    content: "Simple Kanban board";
    text-align: left;
    padding: 0.75rem 1rem;
    color: #ffffff;
    font-weight: 700;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #002f6c;
  }
}



.btn {
  display: inline-flex;
  position: relative;
  border: none;
  vertical-align: middle;
  padding: .5rem 2rem;
  margin: 1.25rem auto 1rem auto;
  background-color: #01579b;
  color: #FFFFFF;
  height: 32px;
  border-radius: 3px;
  border: 1px solid #002f6c;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    color: #cccccc;
    cursor: default;
    pointer-events: none;
  }
}

.btn_delete {
  font-size: .5rem;
  border-radius: 3px;
  width: 16px;

  position: relative;
  border: none;
  padding: .25rem .25rem 0 .25rem;
  margin-top: 0.15rem;
  background-color: #002f6c;
  color: #FFFFFF;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    color: #cccccc;
    cursor: default;
    pointer-events: none;
  }
}

</style>
