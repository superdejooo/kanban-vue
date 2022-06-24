<template>
  <div class="column">
    <div class="column__header">
        <div>{{column.title}}</div>
        <div class="btn_delete" @click="destroyColumn(column.id)">X</div>
    </div>

    <div class="column__body">
    <draggable class="list-group" :list="column.cards" group="cards" @change="log">
        <Card v-for="card in column.cards" :key="card.id" :card="card" />
    </draggable>
    <Modal :parentColumnId='column.id' @closedModal="closedModal"/>
    <button class="btn" @click="openModal(column.id)">Add Card +</button>
    </div>
 </div>
</template>

<script>

import Card from './Card.vue'
import Modal from './Modal.vue'
import { destroyColumn } from '../../services/columnService.js'
import { moveCard } from '../../services/cardService.js'

import draggable from "vuedraggable";


export default {
  name: 'Column',
  components: {
    Card,
    Modal,
    draggable
  },
  props: {
    column: {
      required: true,
      type: Object
    }
  },
  methods: {
    openModal(id) {
      this.$modal.show(`${id}modal-add`)
    },
    closedModal(){
    },
    destroyColumn(id){
      let self = this
        destroyColumn(id).then((res) => {
          self.$emit('columnDestroy')
        })
    },
    log(evt) {
        if(evt.removed){
            return;
        }

        let params = {
            card_id: evt.moved ? evt.moved.element.id : evt.added.element.id,
            column_id: this.column.id,
            order: evt.moved ? evt.moved.newIndex : evt.added.newIndex
        }

        moveCard(params)

    }
  }
}
</script>

<style lang="scss">
.column{
  background-color: #F5F5F6;
  //border: 1px solid #243E36;
   width: 200px;
  min-width: 200px;
  height: calc(100vh - 80px);
//  flex: 1;

  margin: 0 0.25rem;

  &__header{
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    padding: .5rem 1rem;
    margin-bottom: .5rem;
    background-color: #01579b;
    color: #FFFFFF;
  }

  &__body {
    padding: 0 .5rem .5rem .5rem;
  }


  .modal {
    padding: 20px;

    &__header {
      float: right;
      text-align: center;
    }

    textarea,
    input {
      border: none;
      width: 100%;
      display: block;
    }
  }
}
</style>
